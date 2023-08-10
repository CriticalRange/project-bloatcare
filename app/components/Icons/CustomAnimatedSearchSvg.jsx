const CustomAnimatedSearchSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
      <path strokeDasharray={16} strokeDashoffset={16} d="M10.5 13.5 3 21">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.2s"
          values="16;0"
        />
      </path>
      <path
        strokeDasharray={40}
        strokeDashoffset={40}
        d="M10.757 13.243a6 6 0 1 1 8.485-8.486 6 6 0 0 1-8.485 8.486Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="40;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedSearchSvg;
