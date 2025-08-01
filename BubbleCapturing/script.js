  function logEvent(phase, elementId) {
      console.log(`${phase} phase → ${elementId}`);
    }

    const grandparent = document.getElementById("grandparent");
    const parent = document.getElementById("parent");
    const child = document.getElementById("child");

    // Capturing phase (from document down to the target)
    grandparent.addEventListener("click", () => logEvent("Capturing", "Grandparent"), true);
    parent.addEventListener("click", () => logEvent("Capturing", "Parent"), true);
    child.addEventListener("click", () => logEvent("Capturing", "Child"), true);

    // Bubbling phase (from target back up to document)
    grandparent.addEventListener("click", () => logEvent("Bubbling", "Grandparent"));
    parent.addEventListener("click", () => logEvent("Bubbling", "Parent"));
    child.addEventListener("click", () => logEvent("Bubbling", "Child"));