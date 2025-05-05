import React, { useEffect, useState } from "react";
import axios from "axios";

const useAxiosLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let requestInterceptor: number;
    let responseInterceptor: number;

    const showLoader = () => {
      setLoading(true);
    };

    const hideLoader = () => {
      setLoading(false);
    };

    const setupInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((config) => {
        showLoader();
        return config;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          hideLoader();
          return response;
        },
        (error) => {
          hideLoader();
          return Promise.reject(error);
        }
      );
    };

    const removeInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    setupInterceptors();

    return () => {
      removeInterceptors();
    };
  }, []);

  return loading;
};

export default useAxiosLoader;
