const CustomAnimatedRemoveSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeDasharray={22}
      strokeDashoffset={22}
      strokeLinecap="round"
      strokeWidth={2}
    >
      <path d="M19 5 5 19">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.3s"
          dur="0.3s"
          values="22;0"
        />
      </path>
      <path d="m5 5 14 14">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="22;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedRemoveSvg;
