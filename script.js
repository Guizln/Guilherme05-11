// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Menu mobile
const nav = document.getElementById("nav");
document.getElementById("menuToggle").addEventListener("click", () => {
  nav.classList.toggle("aberto");
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => nav.classList.remove("aberto"))
);

// Tema claro/escuro (salvo no navegador)
const botaoTema = document.getElementById("themeToggle");

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  botaoTema.textContent = tema === "dark" ? "☀️" : "🌙";
}

let temaSalvo = null;
try { temaSalvo = localStorage.getItem("tema"); } catch (e) {}
aplicarTema(
  temaSalvo ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
);

botaoTema.addEventListener("click", () => {
  const novo =
    document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  aplicarTema(novo);
  try { localStorage.setItem("tema", novo); } catch (e) {}
});

// Contador de cliques
let cliques = 0;
document.getElementById("btnContador").addEventListener("click", () => {
  cliques++;
  document.getElementById("cliques").textContent = cliques;
});

// Validação do formulário
const form = document.getElementById("formContato");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  feedback.className = "feedback";

  if (!nome || !email || !mensagem) {
    feedback.textContent = "Preencha todos os campos.";
    feedback.classList.add("erro");
    return;
  }
  if (!emailValido) {
    feedback.textContent = "Digite um e-mail válido.";
    feedback.classList.add("erro");
    return;
  }

  // Aqui você pode enviar os dados para um servidor (fetch/API)
  feedback.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada.`;
  feedback.classList.add("ok");
  form.reset();
});
