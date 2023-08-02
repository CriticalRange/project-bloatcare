const CustomAnimatedArrowRightSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path strokeDasharray={14} strokeDashoffset={14} d="M5 12h13.5">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="14;0"
        />
      </path>
      <path strokeDasharray={8} strokeDashoffset={8} d="m19 12-5 5m5-5-5-5">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.3s"
          dur="0.2s"
          values="8;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedArrowRightSvg;
