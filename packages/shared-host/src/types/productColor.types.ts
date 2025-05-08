interface ProductColorProp {
  color: string;
  index: number;
  getActiveBorder: (index: number) => boolean;
  changeVariant: () => void;
  mouseEnter?: () => void;
  mouseLeave?: () => void
}

export default ProductColorProp;
