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
      gradientee(ctx, {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        colorFrom: "#0b0",
        colorTo: "#00b",
        boxSize: 60,
        seed: 3200,
        deflectionLevel: 20,
        colorRandomness: 0,
      });
      debounce = null;
    }, 150);
  }

  repaint();
}
