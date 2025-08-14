document.getElementById("loadBtn").addEventListener("click", async () => {
  console.log("Loading module...");
  
  const math = await import("./math.js"); 

  console.log("Module loaded!");

  const result = math.add(10, 20);
  alert(`10 + 20 = ${result}`);
});
