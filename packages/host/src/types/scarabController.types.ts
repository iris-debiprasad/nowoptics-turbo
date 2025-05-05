export interface IScarab {
  ScarabQueue: any;
}

export interface IScarabOrder {
  orderId: string;
  items: IScarabItem[];
}

export interface IScarabItem {
  item: string | number;
  price: number;
  quantity: number;
}
