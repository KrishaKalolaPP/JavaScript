let memoryStore = {}; // in-memory object

function getInputValue() {
  return document.getElementById("userInput").value || "Krisha";
}

// Local Storage
function storeLocal() {
  localStorage.setItem("user", getInputValue());
}

// Session Storage
function storeSession() {
  sessionStorage.setItem("user", getInputValue());
}

// Cookies
function storeCookie() {
  document.cookie = `user=${getInputValue()}; path=/; max-age=86400`;
}

// IndexedDB
function storeIndexedDB() {
  const request = indexedDB.open("StorageDemoDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("users", { keyPath: "id" });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    store.put({ id: 1, name: getInputValue() });

    tx.oncomplete = () => {
      console.log("Stored in IndexedDB");
    };
  };
}


function storeCache() {
  const user = getInputValue();
  caches.open("user-cache").then((cache) => {
    cache.put("/user-data", new Response(JSON.stringify({ name: user })));
  });
}


function storeMemory() {
  memoryStore.user = getInputValue();
}

function readAll() {
  const local = localStorage.getItem("user");
  const session = sessionStorage.getItem("user");

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];

  let indexed = "Not loaded";
  const idbRequest = indexedDB.open("StorageDemoDB", 1);

  idbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const getReq = store.get(1);

    getReq.onsuccess = () => {
      indexed = getReq.result?.name || "No data";
      caches.match("/user-data").then((res) =>
        res?.json().then((cached) => {
          document.getElementById("output").innerText = `
LocalStorage: ${local}
SessionStorage: ${session}
Cookies: ${cookie}
IndexedDB: ${indexed}
Cache API: ${cached?.name || "Not found"}
Memory (JS): ${memoryStore.user || "Not set"}
          `;
        })
      );
    };
  };
}
