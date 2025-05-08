export type CenterDTO = {
  id: number;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  showIcon?: boolean;
};

export type Props = {
  centers: CenterDTO[];
  isPPC?: boolean;
  selectedStore?: any;
};
