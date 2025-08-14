const containerDiv = document.createElement("div");
containerDiv.id = "myDiv"; 
document.body.appendChild(containerDiv); 
const colors = ["red", "green", "blue"];
const texts = ["This is Red", "This is Green", "This is Blue"];
for (let i = 0; i < 3; i++) {
      const para = document.createElement("p");
      para.textContent = texts[i];
      para.style.color = colors[i];
      containerDiv.appendChild(para);
}
