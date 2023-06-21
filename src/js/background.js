if (!("paintWorklet" in CSS)) {
  // render canvas
  window.addEventListener("resize", repaint);

  var debounce = null;
  function repaint() {
    if (debounce) {
      clearTimeout(debounce);
      debounce = null;
    }
    debounce = setTimeout(() => {
      const canvas = document.querySelector(".bg-container canvas");
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      const ctx = canvas.getContext("2d");
      const mid = window.matchMedia(
        "only screen and (orientation: portrait) and (max-width: 1000px)"
      );
      const small = window.matchMedia(
        "only screen and (orientation: portrait) and (max-width: 700px)"
      );
      const boxSize = small ? 30 : mid ? 40 : 60;
      gradientee(ctx, {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        colorFrom: "#0b0",
        colorTo: "#00b",
        boxSize: boxSize,
        seed: 3200,
        deflectionLevel: 20,
        colorRandomness: 0,
      });
      debounce = null;
    }, 150);
  }

  repaint();
}
