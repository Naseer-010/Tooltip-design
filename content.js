function showTooltip(event) {
  const selection = window.getSelection().toString();
  if (selection && isValidUrl(selection)) {
    const existingTooltip = document.getElementById("phishshield-tooltip");
    if (existingTooltip) {
      document.body.removeChild(existingTooltip);
    }

    const tooltip = document.createElement("div");
    tooltip.id = "phishshield-tooltip";
    tooltip.innerHTML = "Analyze with PhishShield";
    tooltip.style.position = "absolute";
    tooltip.style.top = `${event.pageY - 30}px`;
    tooltip.style.left = `${event.pageX}px`;
    document.body.appendChild(tooltip);

    tooltip.addEventListener("click", () => {
      window.open(`https://your-django-website.com/?url=${encodeURIComponent(selection)}`, "_blank");
      document.body.removeChild(tooltip);
    });
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

document.addEventListener("mouseup", showTooltip);

document.addEventListener("mousedown", (event) => {
  const tooltip = document.getElementById("phishshield-tooltip");
  if (tooltip && !tooltip.contains(event.target)) {
    document.body.removeChild(tooltip);
  }
});