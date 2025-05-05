import axios from "axios";

export const GetUserSate = (lat: any, lng: any) => {
  const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_SECRET;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${MAP_API_KEY}`;
  return axios.get(url);
};
