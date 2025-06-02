import * as React from 'react'

interface IZoomOutSVGProps {
  height?: number
  width?: number
}

const ZoomOutSVG = (props: IZoomOutSVGProps) => (
  <svg
    width={`${props.width ? props.width : 32}px`}
    height={`${props.height ? props.height : 32}px`}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <g>
        <rect x="7.09" y="11.021" width="11.219" height="2.707" />
      </g>
    </g>
    <g>
      <g>
        <circle fill="none" stroke="#0082ca" strokeWidth="3" strokeMiterlimit="10" cx="12.7" cy="12.375" r="9.125" />
      </g>
    </g>
    <g>
      <g>
        <rect
          x="21.885"
          y="18.8"
          transform="matrix(-0.7072 0.707 -0.707 -0.7072 59.9352 23.7394)"
          width="6.334"
          height="10.962"
        />
      </g>
    </g>
  </svg>
)

export default ZoomOutSVG
