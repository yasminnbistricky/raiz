/* Raiz. Sem framework, sem rastreador. */
(function () {
  "use strict";

  var hdr = document.getElementById("hdr");
  var hero = document.querySelector(".hero");
  var float = document.querySelector(".float");

  /* a barra ja nasce solida no CSS. .solid agora so acrescenta sombra ao sair do topo. */
  function onScroll() {
    if (hdr) hdr.classList.toggle("solid", window.scrollY > 6);
    if (float) float.classList.toggle("show", window.scrollY > (hero ? hero.offsetHeight * 0.75 : 200));
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* leve profundidade no hero */
  var hbg = document.querySelector(".hero-bg");
  if (hbg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;
    addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, innerHeight);
        hbg.style.transform = "scale(1.04) translateY(" + y * 0.16 + "px)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* revela ao rolar */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* uma pergunta aberta por vez */
  document.querySelectorAll(".q summary").forEach(function (s) {
    s.addEventListener("click", function () {
      var me = s.parentElement;
      document.querySelectorAll(".q[open]").forEach(function (o) { if (o !== me) o.open = false; });
    });
  });

  /* enquanto nao houver endpoint de lista, o formulario cai no email */
  var gf = document.getElementById("guideform");
  if (gf) {
    gf.addEventListener("submit", function (ev) {
      if (gf.getAttribute("action") !== "#") return;
      ev.preventDefault();
      var mail = gf.querySelector("input").value;
      location.href = "mailto:yasminnbistricky@gmail.com"
        + "?subject=" + encodeURIComponent("Guide: where to go in Brazil beyond the obvious")
        + "&body=" + encodeURIComponent("My email: " + mail);
    });
  }
})();
