export interface FooterDTO {
    id: string,
    heading: string,
    menuStatus: boolean,
    menus: Array<{ id: number, value: string,anchor?:string }>
}

export interface FooterSubmenuItem {
  id: number;
  title: string;
  link: string;
}

export interface FooterLinkDTO {
  id: number;
  title: string;
  menus: FooterSubmenuItem[];
  link?: string; 
}
