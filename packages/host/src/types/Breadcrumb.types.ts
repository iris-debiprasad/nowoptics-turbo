export type BreadcrumbLink = {
    label: string;
    href: string;
};
  
export type BreadcrumbProps = {
    links: BreadcrumbLink[];
};