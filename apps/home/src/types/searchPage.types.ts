export type AllLocationDTO = {
    id: number;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

export interface ISearchStoreProps {
  brand: string;
}
