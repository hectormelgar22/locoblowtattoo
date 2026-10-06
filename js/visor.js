/* =============================================================================
   LOCO BLOW · VISOR
   Cualquier foto de la web a pantalla completa, entera, como en la app de
   Fotos del móvil:
     · la foto crece desde su miniatura y, al cerrar, vuelve a ella;
     · se pasa de una a otra deslizando (el dedo, el trackpad o arrastrando
       con el ratón), de una en una, con su inercia;
     · abajo, la tira con todas las de la serie para saltar a cualquiera;
     · se cierra arrastrando la foto hacia abajo, con Escape o con «Cerrar»,
       y el botón «atrás» del móvil también la cierra.
   Pasa por las fotos de su grupo: las de esa carpeta en tatuajes, las de
   esa página en las demás. Los grupos los deja paginas.js en LB.grupos.

   Cada foto tiene su dirección (#obra-bg-3): abrirla la pone en la URL y
   esa URL la vuelve a abrir. «Quiero algo así» manda esa misma dirección
   por WhatsApp: al estudio le llega qué pieza y de quién.
   ========================================================================== */

(function () {
  "use strict";

  var S = window.STUDIO, N = window.LB;
  if (!S || !N || !N.grupos) return;
  var $ = N.$, $$ = N.$$, esc = N.esc, V = S.textos.visor;

  var dlg = $("[data-visor]");
  if (!dlg) return;

  /* El visor se construye aquí: así es el mismo en todas las páginas. */
  dlg.innerHTML =
    '<div class="visor__fondo" data-visor-fondo></div>' +
    '<div class="visor__caja">' +
      '<div class="visor__barra visor__cromo">' +
        '<form method="dialog"><button class="btn visor__cerrar" type="submit" data-visor-cerrar>' + esc(V.cerrar) + "</button></form>" +
        '<p class="etiqueta visor__pos" data-visor-pos></p>' +
      "</div>" +
      '<div class="visor__escena" data-visor-escena>' +
        /* La fila se puede recorrer con el teclado (sus flechas), así que
           también recibe el foco.                                        */
        '<div class="visor__pista" data-visor-pista tabindex="0" role="group" aria-label="' + esc(V.etiqueta) + '"></div>' +
        '<button class="visor__nav visor__nav--atras" type="button" data-prev aria-label="' + esc(V.anterior) + '"><i aria-hidden="true"></i></button>' +
        '<button class="visor__nav" type="button" data-next aria-label="' + esc(V.siguiente) + '"><i aria-hidden="true"></i></button>' +
      "</div>" +
      '<div class="visor__ficha visor__cromo">' +
        '<div class="visor__info">' +
          '<p class="visor__titulo" data-visor-titulo></p>' +
          '<div class="visor__datos" data-visor-datos></div>' +
          '<p class="visor__pista-texto">' + esc(V.pista) + "</p>" +
        "</div>" +
        '<a class="btn btn--macizo" data-visor-quiero href="#" target="_blank" rel="noopener">' + N.BOCADILLO +
          "<span>" + esc(V.quiero) + '</span><span class="visually-hidden"> (se abre en WhatsApp)</span></a>' +
      "</div>" +
      /* La tira repite lo que ya hacen las flechas: para el lector de
         pantalla y el teclado no existe (no son 119 paradas más).          */
      '<div class="visor__tira visor__cromo" data-visor-tira aria-hidden="true"></div>' +
    "</div>";

  var fondo = $("[data-visor-fondo]", dlg);
  var escena = $("[data-visor-escena]", dlg);
  var pista = $("[data-visor-pista]", dlg);
  var tira = $("[data-visor-tira]", dlg);
  var pos = $("[data-visor-pos]", dlg);
  var fichaT = $("[data-visor-titulo]", dlg);
  var fichaD = $("[data-visor-datos]", dlg);
  var quiero = $("[data-visor-quiero]", dlg);
  var btnPrev = $("[data-prev]", dlg);
  var btnNext = $("[data-next]", dlg);
  var cromos = $$(".visor__cromo", dlg);

  var orden = [], idx = -1, origen = null, ocupado = false;

  /* Un muelle sin rebote (amortiguación 1, respuesta 0,38 s), escrito como
     curva para la Web Animations API. Donde el navegador no sabe hacer
     curvas a trozos, una Bézier que se le parece.                         */
  var CURVA = (function () {
    try { if (!CSS.supports("animation-timing-function", "linear(0, 1)")) throw 0; }
    catch (e) { return "cubic-bezier(0.32, 0.72, 0, 1)"; }
    var w = 2 * Math.PI / 0.38, dur = 0.6, p = [];
    for (var k = 0; k <= 40; k++) {
      var t = dur * k / 40;
      p.push(k === 40 ? "1" : (1 - (1 + w * t) * Math.exp(-w * t)).toFixed(4));
    }
    return "linear(" + p.join(", ") + ")";
  })();
  var DURA = 600;

  function grupoDe(id) {
    for (var g in N.grupos) {
      if (N.grupos[g].some(function (p) { return p.id === id; })) return g;
    }
    return null;
  }

  /* --- la serie ------------------------------------------------------------------ */

  function montar() {
    pista.innerHTML = orden.map(function (p, i) {
      return '<div class="visor__diapo" data-i="' + i + '"></div>';
    }).join("");
    tira.innerHTML = orden.map(function (p, i) {
      return '<button class="visor__mini" type="button" tabindex="-1" data-ir="' + i + '">' +
        N.imgHTML({ base: p.img, tipo: p.tipo || "obra", alt: "", ratio: p.ratio, anchos: [380], sizes: "64px" }) +
        "</button>";
    }).join("");
  }

  function cargar(i) {
    var d = pista.children[i], p = orden[i];
    if (!d || !p || d.firstChild) return;
    d.innerHTML = N.imgHTML({
      base: p.img, tipo: p.tipo || "obra", alt: p.alt, ratio: p.ratio, sizes: "100vw", eager: true, clase: "visor__img"
    });
  }

  function anchoDiapo() { return pista.clientWidth || 1; }

  function pintar() {
    var p = orden[idx];
    if (!p) return;
    for (var k = idx - 2; k <= idx + 2; k++) cargar(k);
    var a = p.artista ? N.artistaPor(p.artista) : null;
    var e = p.estilo ? N.estiloPor(p.estilo) : null;
    fichaT.textContent = p.titulo || "";
    fichaD.innerHTML =
      (a ? '<span class="etiqueta">' + esc(a.nombre) + "</span>" : "") +
      (e ? '<span class="etiqueta">' + esc(e.nombre) + "</span>" : "");
    pos.textContent = (idx + 1) + " / " + orden.length;
    btnPrev.setAttribute("aria-disabled", String(idx === 0));
    btnNext.setAttribute("aria-disabled", String(idx === orden.length - 1));
    $$("[data-visor-lamina]", pista).forEach(function (d) { d.removeAttribute("data-visor-lamina"); });
    var actual = pista.children[idx];
    if (actual) actual.setAttribute("data-visor-lamina", "");

    /* La tira: la de ahora, más ancha y en el centro. */
    $$(".visor__mini", tira).forEach(function (b, i) { b.toggleAttribute("data-actual", i === idx); });
    var mini = tira.children[idx];
    if (mini) {
      tira.scrollTo({
        left: mini.offsetLeft - (tira.clientWidth - mini.offsetWidth) / 2,
        behavior: N.quieto() || !dlg.open ? "auto" : "smooth"
      });
    }

    /* La dirección que se manda es la pública (content.js), no la de este
       navegador: así funciona igual desde el móvil de quien la recibe.     */
    var de = (a ? " de " + a.nombre : "") + (e ? " (" + e.nombre + ")" : "");
    quiero.href = N.wasapURL(N.rellenar(V.mensaje, {
      de: de, enlace: N.urlPagina(N.PAGINA) + "#obra-" + p.id
    }));
    history.replaceState(history.state, "", location.pathname + location.search + "#obra-" + p.id);
  }

  /* Ir a una foto: la pista se desliza hasta ella. Lejos, sin animación:
     cruzar cuarenta fotos a toda velocidad marea.                         */
  function ir(i, suave) {
    i = Math.max(0, Math.min(orden.length - 1, i));
    var lejos = Math.abs(i - idx) > 2;
    pista.scrollTo({ left: i * anchoDiapo(), behavior: suave && !lejos && !N.quieto() ? "smooth" : "auto" });
    if (i !== idx) { idx = i; pintar(); }
  }

  /* El deslizamiento lo hace el propio navegador (scroll con imán): aquí
     solo se mira en qué foto ha quedado.                                   */
  var midiendo = false;
  pista.addEventListener("scroll", function () {
    if (midiendo || !dlg.open) return;
    midiendo = true;
    requestAnimationFrame(function () {
      midiendo = false;
      var i = Math.round(pista.scrollLeft / anchoDiapo());
      if (i !== idx && orden[i]) { idx = i; pintar(); }
    });
  }, { passive: true });

  /* Al girar el móvil o cambiar la ventana, la foto de ahora sigue en su sitio. */
  window.addEventListener("resize", function () {
    if (dlg.open) pista.scrollLeft = idx * anchoDiapo();
  });

  tira.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-ir]");
    if (b) ir(Number(b.getAttribute("data-ir")), true);
  });
  btnPrev.addEventListener("click", function () { ir(idx - 1, true); });
  btnNext.addEventListener("click", function () { ir(idx + 1, true); });

  dlg.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowLeft") { ev.preventDefault(); ir(idx - 1, true); }
    if (ev.key === "ArrowRight") { ev.preventDefault(); ir(idx + 1, true); }
    if (ev.key === "Home") { ev.preventDefault(); ir(0); }
    if (ev.key === "End") { ev.preventDefault(); ir(orden.length - 1); }
  });

  /* --- abrir y cerrar ---------------------------------------------------------------- */

  /* La miniatura de una foto en la página, si está a la vista. */
  function miniaturaDe(p) {
    var b = (origen && origen.isConnected && origen.getAttribute("data-abrir") === p.id && origen.offsetParent) ? origen
      : $$('[data-abrir="' + CSS.escape(p.id) + '"]').filter(function (x) { return x.offsetParent; })[0];
    var img = b && $("img", b);
    return img || null;
  }

  /* Dónde queda la foto entera dentro de la escena (como object-fit:
     contain), sin esperar a que cargue: la proporción ya se sabe.          */
  function marcoFinal(p) {
    var r = escena.getBoundingClientRect(), pad = 10;
    var w = r.width - pad * 2, h = r.height, ratio = p.ratio || 0.8;
    var fw = Math.min(w, h * ratio), fh = fw / ratio;
    return { left: r.left + (r.width - fw) / 2, top: r.top + (h - fh) / 2, width: fw, height: fh };
  }

  /* Un vuelo entre un marco y otro: la foto de la miniatura (recortada en
     cuadrado) se convierte en la foto entera, o al revés. Un solo transform
     y un clip-path: nada de estirar la imagen.                             */
  function vuelo(src, entera, recorte, abriendo) {
    var capa = document.createElement("div");
    capa.className = "visor__vuelo";
    capa.style.cssText = "left:" + entera.left + "px;top:" + entera.top + "px;width:" + entera.width + "px;height:" + entera.height + "px";
    capa.innerHTML = '<img alt="" src="' + esc(src) + '">';
    dlg.appendChild(capa);
    var s = Math.max(recorte.width / entera.width, recorte.height / entera.height);
    var dx = (recorte.left + recorte.width / 2) - (entera.left + entera.width / 2);
    var dy = (recorte.top + recorte.height / 2) - (entera.top + entera.height / 2);
    var cx = Math.max(0, (entera.width - recorte.width / s) / 2), cy = Math.max(0, (entera.height - recorte.height / s) / 2);
    var mini = { transform: "translate(" + dx + "px," + dy + "px) scale(" + s + ")", clipPath: "inset(" + cy + "px " + cx + "px)" };
    var grande = { transform: "translate(0,0) scale(1)", clipPath: "inset(0px 0px)" };
    var anim = capa.animate(abriendo ? [mini, grande] : [grande, mini], { duration: DURA, easing: CURVA, fill: "forwards" });
    return { capa: capa, anim: anim };
  }

  function fundir(el, de, a) {
    return el.animate([{ opacity: de }, { opacity: a }], { duration: DURA * 0.55, easing: "ease-out", fill: "forwards" });
  }

  function abrir(id, grupo, boton, conHistoria) {
    grupo = grupo || grupoDe(id);
    if (!grupo || ocupado) return;
    var lista = N.grupos[grupo];
    var i = lista.findIndex(function (p) { return p.id === id; });
    if (i === -1) return;
    origen = boton || document.activeElement;
    orden = lista;
    idx = -1;
    montar();
    if (conHistoria) history.pushState({ visor: 1 }, "", location.pathname + location.search + "#obra-" + id);
    dlg.showModal();
    document.documentElement.setAttribute("data-visor-abierto", "");
    pista.scrollLeft = i * anchoDiapo();
    idx = i;
    pintar();

    var p = orden[idx];
    var mini = miniaturaDe(p);
    var img = $("img", pista.children[idx]);
    if (N.quieto() || !mini || !dlg.animate) {
      if (dlg.animate) fundir(dlg, 0, 1).onfinish = function () { this.cancel(); };
      return;
    }
    /* Mientras vuela, la foto de verdad espera escondida y va cargando. */
    ocupado = true;
    img.style.visibility = "hidden";
    cromos.forEach(function (c) { fundir(c, 0, 1); });
    var f = fundir(fondo, 0, 1);
    var v = vuelo(mini.currentSrc || mini.src, marcoFinal(p), mini.getBoundingClientRect(), true);
    v.anim.onfinish = function () {
      var listo = function () {
        img.style.visibility = "";
        v.capa.remove();
        f.cancel();
        cromos.forEach(function (c) { c.getAnimations().forEach(function (a) { a.cancel(); }); });
        ocupado = false;
      };
      if (img.complete) listo();
      else { img.addEventListener("load", listo, { once: true }); img.addEventListener("error", listo, { once: true }); }
    };
  }

  /* Cerrar con su vuelta: la foto (donde esté, también a medio arrastrar)
     encoge hasta su miniatura. Si la miniatura no está en la página, se
     funde. `desdeHistoria`: el «atrás» del navegador ya quitó la entrada. */
  function cerrar(desdeHistoria) {
    if (!dlg.open || ocupado) return;
    if (!desdeHistoria && history.state && history.state.visor) { history.back(); return; }
    var p = orden[idx];
    var img = $("img", pista.children[idx]);
    var mini = p && miniaturaDe(p);
    function fin() {
      dlg.close();
      ocupado = false;
    }
    if (N.quieto() || !p || !img || !dlg.animate) { fin(); return; }
    ocupado = true;
    /* La miniatura, a la vista detrás del visor (sin que se note), para
       que la foto vuelva a su sitio.                                       */
    if (mini) mini.scrollIntoView({ block: "nearest", inline: "nearest" });
    var dest = mini && mini.getBoundingClientRect();
    var enPantalla = dest && dest.bottom > 0 && dest.top < innerHeight && dest.width > 0;
    var ahora = img.getBoundingClientRect();
    cromos.forEach(function (c) { fundir(c, getComputedStyle(c).opacity, 0); });
    fundir(fondo, getComputedStyle(fondo).opacity, 0);
    if (!enPantalla) {
      img.animate([{ opacity: 1, transform: getComputedStyle(img).transform === "none" ? "scale(1)" : getComputedStyle(img).transform },
                   { opacity: 0, transform: "scale(0.9)" }], { duration: 260, easing: "ease-in", fill: "forwards" }).onfinish = fin;
      return;
    }
    var v = vuelo(img.currentSrc || img.src, ahora, dest, false);
    img.style.visibility = "hidden";
    v.anim.onfinish = function () { fin(); v.capa.remove(); };
  }

  dlg.addEventListener("cancel", function (ev) { ev.preventDefault(); cerrar(); });   /* Escape */
  $("form", dlg).addEventListener("submit", function (ev) { ev.preventDefault(); cerrar(); });
  window.addEventListener("popstate", function () {
    if (dlg.open && !(history.state && history.state.visor)) cerrar(true);
  });

  dlg.addEventListener("close", function () {
    document.documentElement.removeAttribute("data-visor-abierto");
    dlg.removeAttribute("data-limpio");
    $$(".visor__vuelo", dlg).forEach(function (c) { c.remove(); });
    [fondo].concat(cromos).forEach(function (el) { el.getAnimations().forEach(function (a) { a.cancel(); }); });
    pista.innerHTML = "";
    tira.innerHTML = "";
    /* La dirección vuelve a la de la carpeta abierta, si la hay. */
    var base = N.hashBase ? N.hashBase() : "";
    history.replaceState(history.state, "", location.pathname + location.search + base);
    /* El foco vuelve a la miniatura de la foto que se estaba viendo (la
       misma a la que ha vuelto la foto); si no está, a lo que abrió el visor. */
    var p = orden[idx];
    var suya = p && $$('[data-abrir="' + CSS.escape(p.id) + '"]').filter(function (x) { return x.offsetParent; })[0];
    var vuelta = suya || ((origen && origen.isConnected && origen !== document.body) ? origen : null);
    if (vuelta) vuelta.focus({ preventScroll: true });
    idx = -1;
  });

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-abrir]");
    if (b) abrir(b.getAttribute("data-abrir"), b.getAttribute("data-grupo"), b, true);
  });

  /* --- gestos ------------------------------------------------------------------------- */
  /* Con el dedo, el lado lo mueve el navegador (pan-x); lo vertical llega
     aquí: hacia abajo, la foto sigue al dedo, encoge y el fondo se aclara;
     al soltar, la velocidad decide si se cierra o vuelve. Con el ratón,
     además, se arrastra de lado. Un toque sin arrastre esconde y enseña
     los mandos, como en el móvil.                                          */
  (function gestos() {
    if (!window.PointerEvent) return;
    var g = null;

    function proyectar(v) { return (v / 1000) * 0.998 / (1 - 0.998); }   /* px/s → px, como Apple */

    escena.addEventListener("pointerdown", function (e) {
      if (ocupado || (e.pointerType === "mouse" && e.button !== 0)) return;
      if (e.target.closest(".visor__nav")) return;
      g = { id: e.pointerId, x0: e.clientX, y0: e.clientY, modo: "", izq: pista.scrollLeft,
            hist: [{ x: e.clientX, y: e.clientY, t: e.timeStamp }], img: $("img", pista.children[idx]) };
    });

    escena.addEventListener("pointermove", function (e) {
      if (!g || e.pointerId !== g.id) return;
      var dx = e.clientX - g.x0, dy = e.clientY - g.y0;
      if (!g.modo) {
        if (dy > 10 && dy > Math.abs(dx) * 1.2) g.modo = "cerrar";
        else if (e.pointerType === "mouse" && Math.abs(dx) > 10) g.modo = "pasar";
        else return;
        try { escena.setPointerCapture(g.id); } catch (err) { /* ya no está */ }
        if (g.modo === "pasar") dlg.setAttribute("data-arrastrando", "");
      }
      g.hist.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
      if (g.hist.length > 6) g.hist.shift();
      if (g.modo === "pasar") { pista.scrollLeft = g.izq - dx; return; }
      /* Cerrar: 1:1 con el dedo, encogiendo hasta un 65 %. */
      var h = escena.clientHeight || 1, k = Math.min(1, Math.max(0, dy) / h);
      if (g.img) g.img.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + (1 - k * 0.35) + ")";
      var o = String(1 - Math.min(1, k * 1.6) * 0.92);
      fondo.style.opacity = o;
      cromos.forEach(function (c) { c.style.opacity = String(Math.max(0, 1 - k * 4)); });
    });

    function soltar(e) {
      if (!g || e.pointerId !== g.id) return;
      var gg = g; g = null;
      try { escena.releasePointerCapture(gg.id); } catch (err) { /* ya liberado */ }
      var a = gg.hist[0], b = gg.hist[gg.hist.length - 1], dt = Math.max(1, b.t - a.t);
      var vx = (b.x - a.x) / dt * 1000, vy = (b.y - a.y) / dt * 1000;
      if (!gg.modo) {
        /* Un toque: fuera mandos o vuelven (solo en la foto, no en los botones). */
        if (e.type === "pointerup" && Math.abs(b.x - gg.x0) < 6 && Math.abs(b.y - gg.y0) < 6 && e.target.closest(".visor__diapo")) {
          dlg.toggleAttribute("data-limpio");
        }
        return;
      }
      if (gg.modo === "pasar") {
        dlg.removeAttribute("data-arrastrando");
        var w = anchoDiapo(), base = Math.round(gg.izq / w);
        var destino = Math.round((pista.scrollLeft - proyectar(vx)) / w);
        destino = Math.max(base - 1, Math.min(base + 1, destino));   /* de una en una */
        ir(destino, true);
        return;
      }
      var dy = b.y - gg.y0;
      if (dy + proyectar(vy) * 0.25 > (escena.clientHeight || 1) * 0.18) { cerrar(); return; }
      /* Vuelve a su sitio: desde donde está, sin saltos. */
      if (gg.img) {
        var desde = gg.img.style.transform;
        gg.img.style.transform = "";
        if (gg.img.animate && !N.quieto()) gg.img.animate([{ transform: desde }, { transform: "none" }], { duration: 420, easing: CURVA });
      }
      [fondo].concat(cromos).forEach(function (el) {
        var de = el.style.opacity; el.style.opacity = "";
        if (el.animate && de !== "") el.animate([{ opacity: de }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
      });
    }
    escena.addEventListener("pointerup", soltar);
    escena.addEventListener("pointercancel", function (e) {
      /* El navegador se queda el gesto (el dedo va de lado): nada que deshacer. */
      if (g && g.modo === "cerrar") soltar(e); else g = null;
    });
    escena.addEventListener("dragstart", function (e) { e.preventDefault(); });
  })();

  /* Antes de cerrar del todo, lo que quedó del arrastre se limpia. */
  dlg.addEventListener("close", function () {
    fondo.style.opacity = "";
    cromos.forEach(function (c) { c.style.opacity = ""; });
  });

  /* Si la URL trae una foto, se abre: al llegar con un enlace compartido y
     también si cambia el # sin recargar.                                   */
  function desdeURL() {
    var m = /^#obra-([\w-]+)$/.exec(location.hash);
    if (!m || dlg.open) return;
    var destino = document.getElementById("obra-" + m[1]);
    if (destino && grupoDe(m[1])) {
      destino.scrollIntoView({ block: "center" });
      abrir(m[1], null, $("[data-abrir]", destino), false);
    }
  }
  window.addEventListener("hashchange", desdeURL);
  desdeURL();

  N.visor = { abrir: abrir, cerrar: cerrar };
})();
