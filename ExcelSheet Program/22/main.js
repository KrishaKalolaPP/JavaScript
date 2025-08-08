let memoryStore = {}

function getInputValue() {
  return document.getElementById("userInput").value ;
}

function storeLocal() {
  localStorage.setItem("user", getInputValue());
}

function storeSession() {
  sessionStorage.setItem("user", getInputValue());
}

function storeCookie() {
  document.cookie = `user=${getInputValue()}; path=/; max-age=86400`;
}

function readAll() {
  const local = localStorage.getItem("user");
  const session = sessionStorage.getItem("user");

  const cookie = document.cookie.split("; ").find((row) => row.startsWith("user="))?.split("=")[1];
  document.getElementById("output").innerText = `
LocalStorage: ${local}
SessionStorage: ${session}
Cookies: ${cookie}`;
  // console.log(local)
  // console.log(session)
  // console.log(cookie)
  // console.log(idbRequest)
}
