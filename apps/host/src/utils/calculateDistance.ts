import { LocationDTO, StoreAddressType } from "../types/SideBar.types";

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371; // Radius of the earth in kilometers

  const degToRad = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c * 0.6213712; // Distance in miles

  return Number(distance).toFixed(2);
}



export function findClosestCoordinate(
  target: LocationDTO | null,
  coordinates: StoreAddressType[]
): StoreAddressType | null {
  if (target) {
    let closestCoordinate: StoreAddressType | null = null;
    let closestDistance = Infinity;

    for (const coordinate of coordinates) {
      const distance = coordinate.Latitude && coordinate.Longitude ? calculateDistance(
        target.latitude,
        target.longitude,
        coordinate.Latitude,
        coordinate.Longitude
      ) : 0;
      const numericDistance = Number(distance); // Convert distance to a number

      if (numericDistance < closestDistance) {
        closestDistance = numericDistance;
        closestCoordinate = coordinate;
      }
    }

    return closestCoordinate ;
  } else {
    return coordinates[0];
  }
}