import * as React from 'react'

interface IZoomInSVGProps {
  height?: number
  width?: number
}

const ZoomInSVG = (props: IZoomInSVGProps) => (
  <svg
    width={`${props.width ? props.width : 32}px`}
    height={`${props.height ? props.height : 32}px`}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <g>
        <polygon
          points="18.309,11.021 14.053,11.021 14.053,6.765 11.346,6.765 11.346,11.021 7.09,11.021 7.09,13.728 
			11.346,13.728 11.346,17.984 14.053,17.984 14.053,13.728 18.309,13.728 		"
        />
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
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.8316 24.8259)"
          width="6.334"
          height="10.962"
        />
      </g>
    </g>
  </svg>
)

export default ZoomInSVG
