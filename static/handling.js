async function handleAntipasto() {
  await handleUpdate("Antipasto");
}

async function handlePrimo() {
  await handleUpdate("Primo");
}

async function handleSecondo() {
  await handleUpdate("Secondo");
}

async function handleDolce() {
  await handleUpdate("Dolce");
}

async function handleBere() {
  await handleUpdate("Bere");
}

async function handleBotti() {
  await handleUpdate("Botti");
}

async function resetAntipasto() {
  await handleReset("Antipasto");
}

async function resetPrimo() {
  await handleReset("Primo");
}

async function resetSecondo() {
  await handleReset("Secondo");
}

async function resetDolce() {
  await handleReset("Dolce");
}

async function resetBere() {
  await handleReset("Bere");
}

async function resetBotti() {
  await handleReset("Botti");
}

async function handleUpdate(target) {
  const div = document.getElementById(`${target}Div`);
  const form = document.createElement("form");
  const formInput = document.createElement("input");
  const submit = document.createElement("button");
  submit.style.color = "white";
  submit.style.backgroundColor = "#0041cf";
  submit.style.borderRadius = "20%";
  submit.type = "button";
  submit.textContent = "Invia";
  submit.onclick = async () => {
    makeRequest(target, getAmount(formInput.value));
  };
  formInput.name = "Importo";
  form.appendChild(formInput);
  form.appendChild(submit);
  form.method = "POST";
  form.action = `/${target}`;
  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      makeRequest(target, getAmount(formInput.value));
    }
  });
  div.appendChild(form);
}

function getAmount(rowAmount) {
  if (rowAmount.includes(",")) {
    rowAmount = rowAmount.replace(",", ".");
  }
  amount = parseFloat(rowAmount);
  if (isNaN(amount)) {
    alert("Devi inserire un numero valido");
    return;
  }
  return amount;
}

async function makeRequest(target, amount) {
  try {
    const response = await fetch(`/${target}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount, action: "add" }),
    });
    if (response.ok) {
      alert("Operazione effettuata con successo");
    }
    location.reload();
  } catch {
    alert("Qualcosa è andato storto");
  }
}

async function handleReset(target) {
  try {
    const response = await fetch(`/${target}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 0, action: "reset" }),
    });
    if (response.ok) {
      alert("Reset avvenuto con successo");
    }
    location.reload();
  } catch {
    alert("Qualcosa è andato storto");
  }
}
