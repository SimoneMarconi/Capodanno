async function handleAntipasto() {
  await fetch("/Antipasto");
  location.reload();
}

async function handlePrimo() {
  await fetch("/Primo");
  location.reload();
}

async function handleSecondo() {
  await fetch("/Secondo");
  location.reload();
}

async function handleDolce() {
  await fetch("/Dolce");
  location.reload();
}
