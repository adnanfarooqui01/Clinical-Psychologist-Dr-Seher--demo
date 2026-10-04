const CLINIC_WHATSAPP = "971557440689";
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const appointmentForm = document.querySelector("#appointment-form");
const dateInput = appointmentForm.elements.date;

document.querySelector("#current-year").textContent = new Date().getFullYear();

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().slice(0, 10);

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(appointmentForm);
  const details = [
    "Hello, I would like to ask about an appointment.",
    `Name: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Preferred date: ${formData.get("date") || "Flexible"}`,
    formData.get("message") ? `Note: ${formData.get("message")}` : ""
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
});