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

async function handleUpdate(target) {
  const div = document.getElementById(`${target}Div`);
  const form = document.createElement("form");
  const formInput = document.createElement("input");
  const submit = document.createElement("button");
  submit.type = "button";
  submit.textContent = "Invia";
  submit.onclick = async () => {
    const amount = parseInt(formInput.value);
    if (isNaN(amount)) {
      alert("Devi inserire un numero valido");
      return;
    }
    try {
      const response = await fetch(`/${target}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });
      if (response.ok) {
        alert("Operazione effettuata con successo");
      }
      location.reload();
    } catch {
      alert("Qualcosa è andato storto");
    }
  };
  formInput.name = "Importo";
  form.appendChild(formInput);
  form.appendChild(submit);
  form.method = "POST";
  form.action = `/${target}`;
  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
  div.appendChild(form);
}
