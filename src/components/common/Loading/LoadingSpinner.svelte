<script>
  export let height = 80;
  export let width = 80;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  style="margin:auto;display:block;"
  {width}
  {height}
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
>
  <path
    d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
    fill="#ff5a5c"
    stroke="none"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      dur="0.7s"
      repeatCount="indefinite"
      keyTimes="0;1"
      values="0 50 51;360 50 51"
    ></animateTransform>
  </path>
</svg>
