export async function submitPreorderForm({
  name,
  email,
  productInterest = "generel interesse",
  source = "unknown",
}) {
  const payload = new URLSearchParams({
    "form-name": "preorder-signup",
    name,
    email,
    productInterest,
    source,
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: payload.toString(),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke sende formular.");
  }
}
