const switchVarName = "makingui-mode";

const initializeSwitch = () => {
  const switches = document.getElementsByClassName("switch");
  if (switches.length === 0) {
    return;
  }
  const mediaLight = window.matchMedia("(prefers-color-scheme: light)");
  const pref = window.localStorage.getItem(switchVarName);
  const mode = pref ? pref : mediaLight.matches ? "light" : "dark";
  document.body.classList.add(mode);

  const sw = switches[0];
  const toggle = (isManual, noAnimation = false) => {
    const oldValue = sw.classList.contains("on");
    if (sw.classList.contains("init") && !noAnimation) {
      sw.classList.remove("init");
    } else if (noAnimation) {
      sw.classList.add("init");
    }
    if (oldValue) {
      sw.classList.remove("on");
      sw.classList.add("off");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      sw.classList.remove("off");
      sw.classList.add("on");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
    if (noAnimation) {
      sw.classList.remove("init");
    }
    if (isManual) {
      window.localStorage.setItem(switchVarName, oldValue ? "light" : "dark");
    }
  };

  if ((!pref && mediaLight.matches) || (pref && pref === "light")) {
    sw.classList.remove("on");
    sw.classList.add("off");
  }
  sw.onclick = () => toggle(true);
  mediaLight.addEventListener("change", () => {
    if (window.localStorage.getItem(switchVarName)) {
      return;
    }
    toggle(false, true);
  });
};

initializeSwitch();
