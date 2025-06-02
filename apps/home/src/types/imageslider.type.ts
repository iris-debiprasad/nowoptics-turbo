export type Props = {
    slideType: string
    name?: boolean
  }
  //TODO: need to review with ayush
  export interface ArrowDTO {
    onClick?: any
    btnType: string
  }
  export interface SliderItemDTO {
    name: string
    description: string
  }
  export interface ImageSliderItemDTO {
    name: string
    rating: number
    duration: string
    description: string
  }
  export interface MultiImgDTO {
    id: number
    name?: string
    items: Array<SliderItemDTO>
  }
  export interface IconSliderItemDTO {
    name: string
    description: string
  }
  