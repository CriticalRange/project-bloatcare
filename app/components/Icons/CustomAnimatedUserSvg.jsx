import * as React from "react";
const CustomAnimatedUserSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeDasharray={28}
      strokeDashoffset={28}
      strokeLinecap="round"
      strokeWidth={2}
    >
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="28;0"
        />
      </path>
      <path d="M12 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.5s"
          dur="0.4s"
          values="28;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedUserSvg;
