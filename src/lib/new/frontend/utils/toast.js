export const toast = ({ text }) => {
  return Toastify({
    text,
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#059fdb",
    },
  }).showToast();
};
