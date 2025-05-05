import { useState, useEffect } from 'react';

const useLocationPermission = (): boolean => {
  const [isLocationAllowed, setIsLocationAllowed] = useState<boolean>(false);

  useEffect(() => {
    const checkLocationPermission = async () => {
      if ('geolocation' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          if (result.state === 'granted') {
            setIsLocationAllowed(true);
          } else {
            setIsLocationAllowed(false);
          }
        } catch (error) {
          setIsLocationAllowed(false);
        }
      } else {
        setIsLocationAllowed(false);
      }
    };

    checkLocationPermission();
  }, []);

  return isLocationAllowed;
};

export default useLocationPermission;
