/* =============================================================================
   LOCO BLOW · VISOR
   Cualquier foto de la web a pantalla completa, entera (en la rejilla va
   recortada a 4:5), con teclado y gesto. Pasa por las fotos de su grupo:
   las de ese estilo en la página de tatuajes, las de esa página en las demás.

   Cada foto tiene una dirección: abrirla cambia la URL a #obra-bg-3, y esa
   URL la vuelve a abrir. El botón «Quiero algo así» manda esa misma
   dirección por WhatsApp: al estudio le llega qué pieza y de quién.

   Los grupos los deja paginas.js en LB.grupos, que se carga antes.
   ========================================================================== */

(function () {
  "use strict";

  var S = window.STUDIO, N = window.LB;
  if (!S || !N || !N.grupos) return;
  var $ = N.$, esc = N.esc;

  var dlg = $("[data-visor]");
  if (!dlg) return;
  var lamina = $("[data-visor-lamina]");
  var fichaT = $("[data-visor-titulo]");
  var fichaD = $("[data-visor-datos]");
  var quiero = $("[data-visor-quiero]");
  var pos = $("[data-visor-pos]");
  var btnPrev = $("[data-prev]");
  var btnNext = $("[data-next]");
  var V = S.textos.visor;

  var orden = [];
  var idx = -1;
  /* Lo que abrió el visor, para devolverle el foco al cerrarlo. */
  var origen = null;

  function grupoDe(id) {
    for (var g in N.grupos) {
      if (N.grupos[g].some(function (p) { return p.id === id; })) return g;
    }
    return null;
  }

  function pintar() {
    var p = orden[idx];
    if (!p) return;
    var a = p.artista ? N.artistaPor(p.artista) : null;
    var e = p.estilo ? N.estiloPor(p.estilo) : null;
    lamina.innerHTML = N.imgHTML({
      base: p.img, tipo: p.tipo || "obra", alt: p.alt, ratio: p.ratio, sizes: "92vw", eager: true
    });
    fichaT.textContent = p.titulo || "";
    fichaD.innerHTML =
      (a ? '<span class="etiqueta">' + esc(a.nombre) + "</span>" : "") +
      (e ? '<span class="etiqueta">' + esc(e.nombre) + "</span>" : "");
    pos.textContent = (idx + 1) + " / " + orden.length;
    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === orden.length - 1;

    /* La dirección que se manda es la pública (content.js), no la de este
       navegador: así funciona igual desde el móvil de quien la recibe.     */
    if (quiero) {
      var de = (a ? " de " + a.nombre : "") + (e ? " (" + e.nombre + ")" : "");
      quiero.href = N.wasapURL(N.rellenar(V.mensaje, {
        de: de, enlace: N.urlPagina(N.PAGINA) + "#obra-" + p.id
      }));
    }
    history.replaceState(null, "", location.pathname + location.search + "#obra-" + p.id);
  }

  function abrir(id, grupo) {
    grupo = grupo || grupoDe(id);
    if (!grupo) return;
    origen = document.activeElement;
    orden = N.grupos[grupo];
    idx = orden.findIndex(function (p) { return p.id === id; });
    if (idx === -1) return;
    pintar();
    if (!dlg.open) dlg.showModal();
  }

  function mover(paso) {
    var siguiente = idx + paso;
    if (siguiente < 0 || siguiente >= orden.length) return false;
    idx = siguiente;
    pintar();
    return true;
  }

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-abrir]");
    if (b) abrir(b.getAttribute("data-abrir"), b.getAttribute("data-grupo"));
  });

  /* Los botones cubren media escena cada uno, así que un deslizamiento acaba
     soltando el dedo encima de uno y el navegador dispara también su
     `click`: la pieza avanzaría dos veces. Esta bandera la levanta el gesto. */
  var huboArrastre = false;

  btnPrev.addEventListener("click", function () { if (!huboArrastre) mover(-1); });
  btnNext.addEventListener("click", function () { if (!huboArrastre) mover(1); });

  dlg.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowLeft") { ev.preventDefault(); mover(-1); }
    if (ev.key === "ArrowRight") { ev.preventDefault(); mover(1); }
    if (ev.key === "Home") { ev.preventDefault(); idx = 0; pintar(); }
    if (ev.key === "End") { ev.preventDefault(); idx = orden.length - 1; pintar(); }
  });

  dlg.addEventListener("close", function () {
    lamina.innerHTML = "";
    history.replaceState(null, "", location.pathname + location.search);
    var p = orden[idx];
    var vuelta = (origen && document.contains(origen) && origen !== document.body) ? origen :
      p && document.querySelector("#obra-" + CSS.escape(p.id) + " [data-abrir]");
    if (vuelta) vuelta.focus();
  });

  /* Clic en el fondo cierra. Se compara contra el propio dialog porque su
     área ocupa toda la pantalla.                                          */
  dlg.addEventListener("click", function (ev) { if (ev.target === dlg) dlg.close(); });

  /* --- gesto de arrastre ---------------------------------------------------- */
  /* Sigue el dedo 1:1, con resistencia en los extremos, y al soltar decide
     con la velocidad proyectada, no solo con la distancia: un gesto corto y
     rápido tiene que bastar.                                                */
  (function gesto() {
    var escena = $("[data-visor-escena]");
    if (!escena || !window.PointerEvent) return;

    var activo = false, id = null, x0 = 0, dx = 0, ancho = 1;
    var hist = [];

    function gomaElastica(sobra, dim) {
      return (sobra * dim * 0.55) / (dim + 0.55 * Math.abs(sobra));
    }

    escena.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      activo = true; id = e.pointerId;
      huboArrastre = false;
      x0 = e.clientX; dx = 0;
      ancho = escena.clientWidth || 1;
      hist = [{ x: e.clientX, t: performance.now() }];
      lamina.style.transition = "none";
      /* La captura NO se pide aquí: mientras hay captura el `click` va al
         elemento que captura, y los botones no lo recibirían nunca.       */
    });

    escena.addEventListener("pointermove", function (e) {
      if (!activo || e.pointerId !== id) return;
      dx = e.clientX - x0;
      if (Math.abs(dx) > 8 && !huboArrastre) {
        huboArrastre = true;
        try { escena.setPointerCapture(id); } catch (err) { /* el puntero ya se fue */ }
      }
      var tope = (dx > 0 && idx === 0) || (dx < 0 && idx === orden.length - 1);
      var d = tope ? gomaElastica(dx, ancho) : dx;
      hist.push({ x: e.clientX, t: performance.now() });
      if (hist.length > 6) hist.shift();
      lamina.style.transform = "translate3d(" + d + "px,0,0)";
    });

    function soltar(e) {
      if (!activo || e.pointerId !== id) return;
      activo = false;
      if (huboArrastre) {
        try { escena.releasePointerCapture(id); } catch (err) { /* ya liberado */ }
      }
      var ult = hist[hist.length - 1], pri = hist[0];
      var dt = Math.max(1, ult.t - pri.t);
      var v = (ult.x - pri.x) / dt * 1000;
      var proyectado = dx + (v / 1000) * 0.998 / (1 - 0.998);
      var salta = Math.abs(proyectado) > ancho * 0.28;
      var paso = salta ? (proyectado > 0 ? -1 : 1) : 0;
      var curva = "transform 260ms cubic-bezier(0.23, 1, 0.32, 1)";

      lamina.style.transition = N.quieto() ? "none" : curva;
      if (paso && mover(paso)) {
        lamina.style.transition = "none";
        lamina.style.transform = "translate3d(" + (paso > 0 ? ancho * 0.3 : -ancho * 0.3) + "px,0,0)";
        requestAnimationFrame(function () {
          lamina.style.transition = N.quieto() ? "none" : curva;
          lamina.style.transform = "translate3d(0,0,0)";
        });
      } else {
        lamina.style.transform = "translate3d(0,0,0)";
      }
      dx = 0;
      /* El click sintético llega justo después del pointerup. */
      setTimeout(function () { huboArrastre = false; }, 0);
    }

    escena.addEventListener("pointerup", soltar);
    escena.addEventListener("pointercancel", soltar);
  })();

  /* Si la URL trae una foto, se abre: al llegar con un enlace compartido y
     también si cambia el # sin recargar.                                   */
  function desdeURL() {
    var m = /^#obra-([\w-]+)$/.exec(location.hash);
    if (!m || dlg.open) return;
    var destino = document.getElementById("obra-" + m[1]);
    if (destino && grupoDe(m[1])) {
      destino.scrollIntoView({ block: "center" });
      abrir(m[1]);
    }
  }
  window.addEventListener("hashchange", desdeURL);
  desdeURL();
})();
