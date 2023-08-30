const CustomAnimatedExternalLinkSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path strokeDasharray={42} strokeDashoffset={42} d="M11 5H5v14h14v-6">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="42;0"
        />
      </path>
      <path strokeDasharray={12} strokeDashoffset={12} d="m13 11 7-7">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.3s"
          values="12;0"
        />
      </path>
      <path strokeDasharray={8} strokeDashoffset={8} d="M21 3h-6m6 0v6">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.9s"
          dur="0.2s"
          values="8;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedExternalLinkSvg;
