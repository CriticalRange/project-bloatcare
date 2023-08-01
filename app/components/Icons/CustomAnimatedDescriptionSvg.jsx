const CustomAnimatedDescriptionSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}>
      <path strokeDasharray={15} strokeDashoffset={15} d="M4 5h13">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.2s"
          values="15;0"
        />
      </path>
      <path strokeDasharray={12} strokeDashoffset={12} d="M4 10h10">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.2s"
          dur="0.2s"
          values="12;0"
        />
      </path>
      <path strokeDasharray={18} strokeDashoffset={18} d="M4 15h16">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.4s"
          dur="0.2s"
          values="18;0"
        />
      </path>
      <path strokeDasharray={15} strokeDashoffset={15} d="M4 20h13">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="15;0"
        />
      </path>
    </g>
  </svg>
);
export default CustomAnimatedDescriptionSvg;
