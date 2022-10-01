const goToTopElement = document.getElementById("go-to-top");

goToTopElement.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.document.onscroll = () => {
  if (goToTopElement.classList.contains("visible") && window.scrollY < 50) {
    goToTopElement.classList.remove("visible");
  } else if (
    !goToTopElement.classList.contains("visible") &&
    window.scrollY > 50
  ) {
    goToTopElement.classList.add("visible");
  }
};
