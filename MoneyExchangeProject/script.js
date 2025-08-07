document.addEventListener("DOMContentLoaded", () => {
  const addNoteForm = document.getElementById("add-note-form");
  const noteValueInput = document.getElementById("note-value");
  const noteCountInput = document.getElementById("note-count");
  const noteStatus = document.getElementById("note-status");
  const customerForm = document.getElementById("customer-form");
  const billAmountInput = document.getElementById("bill-amount");
  const paidAmountInput = document.getElementById("paid-amount");
  const changeGiven = document.getElementById("change-given");
  const transactionLog = document.getElementById("transaction-log");
  const clearLogButton = document.getElementById("clear-log");

  let notes = JSON.parse(localStorage.getItem("drawer")) || {};
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  console.log(notes)
  console.log(transactions)
  function saveToStorage() {
    localStorage.setItem("drawer", JSON.stringify(notes));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  function renderNoteStatus() {
    noteStatus.innerHTML = "";
    let total = 0;
    const sorted = Object.keys(notes)
      .map(Number)
      .sort((a, b) => b - a);
    sorted.forEach((note) => {
      const count = notes[note];
      const subtotal = note * count;
      total += subtotal;
      const noteRow = document.createElement("div");
      noteRow.className = "note-row";
      noteRow.innerHTML = `
        <span class="note-info">₹${note} × ${count} = ₹${subtotal.toFixed(2)}</span>
        <div class="note-actions">
          <button class="increment" data-note="${note}">+</button>
          <button class="delete" data-note="${note}">×</button>
        </div>
      `;
      noteStatus.appendChild(noteRow);
    });
    const totalDisplay = document.createElement("p");
    totalDisplay.className = "total-display";
    totalDisplay.innerHTML = `<strong>Total Cash: ₹${total.toFixed(2)}</strong>`;
    noteStatus.appendChild(totalDisplay);

    document.querySelectorAll(".increment").forEach((btn) => {
      btn.addEventListener("click", () => {
        const note = parseFloat(btn.getAttribute("data-note"));
        incrementNote(note);
      });
    });

    document.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const note = parseFloat(btn.getAttribute("data-note"));
        deleteNote(note);
      });
    });
  }

  function incrementNote(note) {
    notes[note] += 1;
    saveToStorage();
    renderNoteStatus();
  }

  function deleteNote(note) {
    delete notes[note];
    saveToStorage();
    renderNoteStatus();
  }

  addNoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = parseFloat(noteValueInput.value);
    const count = parseInt(noteCountInput.value);
    if (!value || !count || value <= 0 || count <= 0) return;

    if (notes[value]) {
      notes[value] += count;
    } else {
      notes[value] = count;
    }
    saveToStorage();
    renderNoteStatus();
    addNoteForm.reset();
  });

  function findChangeRecursive(available, target, index = 0, current = {}) {
    if (target === 0) return { ...current };
    if (index >= available.length || target < 0) return null;

    const [note, count] = available[index];
    for (let i = Math.min(Math.floor(target / note), count); i >= 0; i--) {
      if (i > 0) current[note] = i;
      else delete current[note];
      console.log(current)
      const result = findChangeRecursive(
        available,
        parseFloat((target - note * i).toFixed(2)),
        index + 1,
        current
      );
      if (result) return result;
    }
    return null;
  }

  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bill = parseFloat(billAmountInput.value);
    const paid = parseFloat(paidAmountInput.value);
    const change = parseFloat((paid - bill).toFixed(2));

    if (!bill || !paid || paid < bill) {
      alert("Invalid payment details");
      return;
    }

    const available = Object.entries(notes)
      .map(([note, count]) => [parseFloat(note), count])
      .sort((a, b) => b[0] - a[0]);

    const changeCombo = findChangeRecursive(available, change);

    if (!changeCombo) {
      alert("Cannot return exact change with available notes.");
      return;
    }

    for (const note in changeCombo) {
      notes[note] -= changeCombo[note];
      if (notes[note] <= 0) delete notes[note];
    }

    const log = `Bill: ₹${bill}, Paid: ₹${paid}, Change: ₹${change} → ${Object.entries(changeCombo)
      .map(([n, c]) => `₹${n} × ${c}`)
      .join(", ")}`;
    transactions.push(log);

    // changeGiven.innerText = log;
    alert(log)
    renderTransactions();
    saveToStorage();
    renderNoteStatus();
    customerForm.reset();
  });

  function renderTransactions() {
    transactionLog.innerHTML = "";
    transactions.slice().reverse().forEach((t) => {
      const div = document.createElement("div");
      div.className = "transaction-entry";
      div.innerText = t;
      transactionLog.appendChild(div);
    });
  }

  clearLogButton.addEventListener("click", () => {
    if (confirm("Clear all transaction history?")) {
      transactions = [];
      saveToStorage();
      renderTransactions();
      
    }
  });
  renderNoteStatus();
  renderTransactions();
});