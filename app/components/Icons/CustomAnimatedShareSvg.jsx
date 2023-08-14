const CustomAnimatedShareSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
      <path
        strokeDasharray={14}
        strokeDashoffset={14}
        d="M12 6a6 6 0 0 1 6 6v2.5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.2s"
          values="14;0"
        />
      </path>
      <path strokeDasharray={6} strokeDashoffset={6} d="m18 15 3-3m-3 3-3-3">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.2s"
          dur="0.2s"
          values="6;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedShareSvg;
