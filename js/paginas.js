/* =============================================================================
   LOCO BLOW · LAS PÁGINAS
   Rellena los bloques de cada página desde el objeto STUDIO: el inicio, la
   cabecera de cada servicio, sus pasos, sus fotos y sus preguntas, y los
   estilos de la página de tatuajes. Todo el texto visible sale de
   js/content.js; aquí no hay copy escrito a mano.

   Cada bloque reemplaza el contenido de su contenedor (innerHTML), nunca lo
   añade: por eso tools/sync-contenido.py puede volcarlo al HTML las veces que
   haga falta y el resultado es siempre el mismo. Un bloque que no está en
   la página se salta.
   ========================================================================== */

(function () {
  "use strict";

  var S = window.STUDIO, N = window.LB;
  if (!S || !N) return;
  var $ = N.$, $$ = N.$$, esc = N.esc, T = S.textos, SV = N.SERVICIO;

  function set(sel, html) { var n = $(sel); if (n) n.innerHTML = html; return n; }

  var NUEVA = '<span class="visually-hidden"> (se abre en WhatsApp)</span>';

  /* Enlace de WhatsApp con su mensaje. `macizo` solo para el botón que pide
     cita en cada pantalla: en toda la web hay uno a la vista.               */
  function botonWasap(texto, mensaje, clase, oculto) {
    return '<a class="btn ' + (clase || "") + '" href="' + esc(N.wasapURL(mensaje)) +
      '" target="_blank" rel="noopener">' + N.BOCADILLO + "<span>" + esc(texto) +
      (oculto ? '<span class="visually-hidden">' + esc(oculto) + "</span>" : "") + "</span>" + NUEVA + "</a>";
  }

  function flecha(texto, href, clase) {
    return '<a class="btn ' + (clase || "") + '" href="' + esc(href) + '">' + esc(texto) +
      '<i class="flecha" aria-hidden="true"></i></a>';
  }

  /* Cabecera de sección: corchete con lo que es, titular que dice algo y
     entradilla. El id del titular es el que nombra la sección.             */
  function cabHTML(t, id, nivel) {
    var h = nivel || "h2";
    return '<p class="etiqueta corchetes">' + esc(t.etiqueta) + "</p>" +
      "<" + h + ' class="d2" id="t-' + esc(id) + '">' + esc(t.titular) + "</" + h + ">" +
      (t.entradilla ? '<p class="lead">' + esc(t.entradilla) + "</p>" : "");
  }
  $$("[data-cab]").forEach(function (cab) {
    var ruta = cab.getAttribute("data-cab").split(".");
    var t = ruta.reduce(function (o, k) { return o && o[k]; }, T);
    if (t) cab.innerHTML = cabHTML(t, ruta[ruta.length - 1]);
  });

  /* Lista de «dato: valor». Un punto sin valor en content.js no se pinta. */
  function datosHTML(puntos, clase) {
    var p = (puntos || []).filter(function (x) { return x.valor !== null && x.valor !== ""; });
    if (!p.length) return "";
    return '<dl class="datos ' + (clase || "") + '">' + p.map(function (x) {
      return '<div><dt class="etiqueta etiqueta--suave">' + esc(x.dato) + "</dt><dd>" + esc(x.valor) + "</dd></div>";
    }).join("") + "</dl>";
  }

  /* --- fotos --------------------------------------------------------------------- */
  /* La rejilla de una página: fotos a 4:5, como la rejilla de Instagram, que
     es donde esta gente mira tatuajes. A pantalla completa (visor.js) se
     ven enteras. Bajo cada una, quién la hizo: la web no se ordena por
     artistas, pero cada foto dice de quién es.                              */

  /* El nombre de un artista: enlace a su Instagram si lo tiene. El lector
     de pantalla oye adónde lleva; el nombre visible va primero, para quien
     navega por voz.                                                        */
  function artistaHTML(a, clase) {
    return a.instagram
      ? '<a class="' + clase + '" href="' + esc(N.instaURL(a.instagram)) + '" rel="noopener">' + esc(a.nombre) +
          '<span class="visually-hidden"> (Instagram)</span></a>'
      : '<span class="' + clase + '">' + esc(a.nombre) + "</span>";
  }

  function pieFoto(p) {
    var a = p.artista ? N.artistaPor(p.artista) : null;
    var quien = a ? artistaHTML(a, "etiqueta rejilla__artista") : "";
    if (!quien && !p.titulo) return "";
    return '<p class="rejilla__pie">' + quien +
      (p.titulo ? '<span class="rejilla__titulo">' + esc(p.titulo) + "</span>" : "") + "</p>";
  }

  /* Un trabajo se ve si tiene foto, o si es un reel publicado. */
  function publicada(o) {
    return !!(o.img || (o.video && S.videos[o.video] && S.videos[o.video].publicar));
  }

  /* Fotos y reels mezclados, en el orden de content.js. `grupo` dice con qué
     fotos pasa el visor (los reels se ven en su sitio): las de ese estilo o
     las de esa página.                                                      */
  function rejillaHTML(piezas, grupo) {
    return '<ul class="rejilla" role="list">' + piezas.filter(publicada).map(function (p, i) {
      if (p.video) {
        return '<li class="rejilla__item rejilla__item--video" id="obra-' + esc(p.id) + '">' +
          N.videoHTML(p.video) + pieFoto({ artista: p.artista, titulo: p.titulo }) + "</li>";
      }
      return '<li class="rejilla__item" id="obra-' + esc(p.id) + '">' +
        '<button class="rejilla__boton" type="button" data-abrir="' + esc(p.id) + '" data-grupo="' + esc(grupo) + '">' +
          '<span class="rejilla__lamina" data-revelar data-revelar-orden="' + (i % 3) + '">' +
            N.imgHTML({
              base: p.img, tipo: "obra", alt: p.alt, ratio: p.ratio, foco: p.foco,
              sizes: "(min-width: 60rem) 22vw, (min-width: 21.25rem) 46vw, 92vw"
            }) +
          "</span>" +
        "</button>" + pieFoto(p) + "</li>";
    }).join("") + "</ul>";
  }

  /* Mientras no haya ninguna foto, un solo hueco ancho, no una fila de
     marcos vacíos: dice lo que va a haber sin llenar la página de huecos.   */
  function pendienteHTML(que, texto) {
    return '<div class="hueco hueco--ancho">' +
      '<span class="hueco__texto">' +
        '<span class="etiqueta">' + esc(que) + "</span>" +
        '<span class="xs hueco__que">' + esc(texto) + "</span>" +
      "</span></div>";
  }

  function conFoto(lista) { return (lista || []).filter(function (p) { return p.img; }); }

  /* Los trabajos de un estilo que se pueden ver, y los estilos que salen:
     los que tienen alguno. Un estilo vacío no enseña una sección hueca;
     aparece solo con su primer trabajo. Mientras no haya ningún trabajo
     en ningún estilo, salen todos con su hueco.                            */
  function obrasDe(e) {
    return S.obras.filter(function (o) { return o.estilo === e.id && publicada(o); });
  }
  var ESTILOS = S.estilos.filter(function (e) { return obrasDe(e).length; });
  if (!ESTILOS.length) ESTILOS = S.estilos;

  /* Para el visor: todas las fotos que se pueden abrir en esta página, por
     grupo. visor.js las lee de aquí.                                        */
  N.grupos = {};

  /* --- preguntas ------------------------------------------------------------------ */
  /* <details>/<summary> nativo: teclado, foco y estado abierto vienen gratis,
     y sigue funcionando entero sin JavaScript. Una sola abierta a la vez lo
     da `name`, también sin JavaScript.                                      */

  function faqHTML(lista) {
    return '<div class="faq">' + lista.map(function (q, i) {
      return '<details class="faq__item" name="faq"' + (i === 0 ? " open" : "") + ">" +
        '<summary class="faq__pregunta">' +
          '<span class="etiqueta faq__num num">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="faq__texto">' + esc(q.pregunta) + "</span>" +
          '<span class="faq__marca" aria-hidden="true"></span>' +
        "</summary>" +
        '<div class="faq__interior"><div class="faq__respuesta">' +
          '<div class="faq__cuerpo"><p class="body">' + esc(q.respuesta) + "</p></div>" +
        "</div></div>" +
      "</details>";
    }).join("") + "</div>";
  }

  /* ============================================================================
     INICIO
     ============================================================================ */

  var I = T.inicio;
  set("[data-inicio-h1]", esc(I.titulo));
  set("[data-inicio-entradilla]", esc(I.entradilla));
  set("[data-inicio-acciones]",
    botonWasap(I.cita, S.studio.botonWhatsapp.mensaje, "btn--macizo btn--grande") +
    flecha(I.verTatuajes, N.hrefPagina("tatuajes"), "btn--grande") +
    '<p class="xs t2 portada__nota">' + esc(I.nota) + "</p>");

  /* El estudio por dentro: el vídeo y las fotos del local, en un mosaico
     desigual. Una foto que falta es un hueco con su proporción.             */
  var fotosEstudio = S.estudio.fotos || [];
  /* Sin ninguna foto todavía, un solo hueco en vez de uno por foto. */
  var mosaicoFotos = conFoto(fotosEstudio).length ? fotosEstudio
    : fotosEstudio.slice(0, 1).map(function (f) { return { id: f.id, ratio: f.ratio, pendiente: true }; });
  if ($("[data-inicio-estudio]")) N.grupos.estudio = conFoto(fotosEstudio).map(function (f) {
    return { id: f.id, img: f.img, alt: f.alt, ratio: f.ratio, titulo: f.titulo, tipo: "estudio" };
  });
  set("[data-inicio-estudio]",
    '<div class="mosaico">' +
      (N.videoHTML(S.estudio.video) ? '<div class="mosaico__video">' + N.videoHTML(S.estudio.video) + "</div>" : "") +
      mosaicoFotos.map(function (f, i) {
        return '<div class="mosaico__foto mosaico__foto--' + (i + 1) + '" id="obra-' + esc(f.id) + '">' +
          (f.img
            ? '<button class="rejilla__boton" type="button" data-abrir="' + esc(f.id) + '" data-grupo="estudio">' +
                '<span class="rejilla__lamina" data-revelar data-revelar-orden="' + i + '">' +
                  N.imgHTML({ base: f.img, tipo: "estudio", alt: f.alt, ratio: f.ratio, foco: f.foco,
                              sizes: "(min-width: 60rem) 24vw, 46vw" }) +
                "</span></button>"
            : N.huecoHTML({ ratio: f.ratio, que: f.pendiente ? "Fotos del estudio" : "Foto del estudio",
                            detalle: f.pendiente ? T.servicio.pendiente : "" })) +
          "</div>";
      }).join("") +
    "</div>" +
    '<p class="body t2 mosaico__nota">' + esc(I.estudio.directo) + "</p>");

  /* La muestra: la primera foto de cada estilo, luego la segunda de cada
     uno…, para que se vean todos los estilos antes de repetir. Rejilla de
     dos columnas en el móvil y de cuatro en escritorio. Cada foto se abre
     encima de las demás, aquí mismo (abajo, galeriaQueSeAbre).             */
  (function muestra() {
    if (!$("[data-inicio-trabajos]")) return;
    var M = I.trabajos;
    var filas = ESTILOS.map(function (e) { return conFoto(obrasDe(e)); });
    var elegidas = [];
    for (var i = 0; elegidas.length < M.cuantas; i++) {
      var alguna = false;
      filas.forEach(function (f) {
        if (f[i] && elegidas.length < M.cuantas) { elegidas.push(f[i]); alguna = true; }
      });
      if (!alguna) break;
    }
    N.grupos.muestra = elegidas;
    var host = set("[data-inicio-trabajos]", elegidas.length
      ? '<ul class="muestra" role="list">' + elegidas.map(function (p, i) {
          var a = p.artista ? N.artistaPor(p.artista) : null;
          var e = N.estiloPor(p.estilo);
          return '<li class="muestra__item" id="obra-' + esc(p.id) + '">' +
            '<button class="rejilla__boton" type="button" data-desplegar="' + esc(p.id) + '" aria-expanded="false">' +
              '<span class="rejilla__lamina" data-revelar data-revelar-orden="' + (i % 4) + '">' +
                N.imgHTML({ base: p.img, tipo: "obra", alt: p.alt, ratio: p.ratio, foco: p.foco,
                            sizes: "(min-width: 60rem) 22vw, 62vw" }) +
              "</span></button>" +
            '<p class="rejilla__pie">' +
              (a ? artistaHTML(a, "etiqueta rejilla__artista") : "") +
              (e ? '<span class="rejilla__titulo">' + esc(e.nombre) + "</span>" : "") +
            "</p></li>";
        }).join("") + "</ul>" +
        '<p class="muestra__accion">' + flecha(M.verTodos, N.hrefPagina("tatuajes"), "btn--grande") + "</p>"
      : "");
    var seccion = host && host.closest("section");
    if (seccion) seccion.hidden = !elegidas.length;
  })();

  /* La foto que se abre sobre la muestra. Adaptado de «Opening a
     photograph» (Raul, en bencho.dev): al pulsar una foto, crece desde su
     hueco hasta verse entera en el centro, con su pie en negro, y las demás
     se quedan detrás, fundidas con el gris. Al cerrarla vuelve encogiendo a
     su sitio. La foto grande no se estira: sale del recorte exacto de la
     miniatura (su 4:5 y su foco) y se va abriendo hasta la proporción real
     de la foto, con un solo transform y un clip-path.
     Mientras está abierta, lo de detrás es inerte: Escape, «Cerrar», un clic
     fuera o sobre la propia foto la devuelven. «Pantalla completa» abre el
     visor de siempre. Con «reducir movimiento», aparece y se va sin viajar. */
  (function galeriaQueSeAbre() {
    var host = $("[data-inicio-trabajos]");
    var lista = host && $(".muestra", host);
    if (!lista) return;
    var seccion = host.closest("section");
    var fotos = N.grupos.muestra || [];
    var V = T.visor, M = I.trabajos;
    /* Abrir, con la curva de los cajones (arranca decidida y se posa
       despacio); cerrar, con la de salida, más corta.                     */
    var ABRIR = "cubic-bezier(0.32, 0.72, 0, 1)", CURVA = "cubic-bezier(0.23, 1, 0.32, 1)";
    var panel = null, abierta = null, anim = null;
    /* El cierre que está en viaje: si se abre otra antes de que acabe, se
       termina en el acto (su miniatura vuelve) y se empieza la nueva.      */
    var cierrePendiente = null, abiertaDesde = 0;

    /* Ninguna animación se queda pegada al panel: la de cierre termina en
       su sitio de partida (fill) y, si no se quitara, la siguiente foto
       saldría con la posición y el recorte de la anterior.                */
    function soltarAnimaciones() {
      if (!panel) return;
      panel.getAnimations({ subtree: true }).forEach(function (x) { x.cancel(); });
      anim = null;
    }

    function porId(id) { return fotos.filter(function (f) { return f.id === id; })[0]; }
    function altoBarra() { var n = $("[data-nav]"); return n ? n.getBoundingClientRect().height : 0; }

    /* Se crea al abrir la primera: así no se cuela en el HTML volcado. */
    function crearPanel() {
      panel = document.createElement("figure");
      panel.className = "muestra__abierta";
      panel.id = "muestra-abierta";
      panel.tabIndex = -1;
      panel.hidden = true;
      host.appendChild(panel);
      panel.addEventListener("click", function (e) {
        if (e.target.closest("[data-cerrar]")) cerrar(true);
        /* Tocar la foto también la devuelve, pero no justo al abrirla: el
           segundo toque de un doble clic caería encima y la cerraría.      */
        else if (e.target.closest(".muestra__foto") && performance.now() - abiertaDesde > 400) cerrar(true);
      });
    }

    function pieHTML(p) {
      var a = p.artista ? N.artistaPor(p.artista) : null;
      var e = p.estilo ? N.estiloPor(p.estilo) : null;
      var de = (a ? " de " + a.nombre : "") + (e ? " (" + e.nombre + ")" : "");
      var que = [e && e.nombre, p.titulo].filter(Boolean).join(" · ");
      return '<figcaption class="muestra__pie en-negro">' +
        '<div class="muestra__cabeza">' +
          '<p class="muestra__ficha">' +
            (a ? artistaHTML(a, "etiqueta muestra__artista") : "") +
            (que ? '<span class="muestra__que">' + esc(que) + "</span>" : "") +
          "</p>" +
          '<button class="btn btn--quiet muestra__cerrar" type="button" data-cerrar>' + esc(V.cerrar) + "</button>" +
        "</div>" +
        '<p class="muestra__acciones">' +
          botonWasap(V.quiero, N.rellenar(V.mensaje, { de: de, enlace: N.urlPagina("inicio") + "#obra-" + p.id }), "btn--macizo") +
          '<button class="btn" type="button" data-abrir="' + esc(p.id) + '" data-grupo="muestra">' + esc(M.completa) + "</button>" +
        "</p>" +
      "</figcaption>";
    }

    /* Dónde y a qué tamaño va la foto abierta: centrada sobre la rejilla y
       en la parte de pantalla que queda bajo la barra, con la foto entera y
       su pie. En coordenadas de la pantalla.                               */
    function destino(p) {
      var rg = lista.getBoundingClientRect();
      var arriba = altoBarra() + 16, abajo = window.innerHeight - 16;
      var altoLibre = abajo - arriba;
      var anchoMax = Math.min(rg.width, 44 * 16);
      var foto = $(".muestra__foto", panel), pie = $(".muestra__pie", panel);
      /* El pie mide distinto según el ancho que le toque (al estrecharse,
         sus botones bajan a otra fila y crece): se ajusta hasta que foto y
         pie caben juntos en el hueco. Tres o cuatro vueltas bastan.        */
      var ancho = anchoMax, altoPie = 0;
      for (var i = 0; i < 6; i++) {
        panel.style.width = ancho + "px";
        altoPie = pie.getBoundingClientRect().height;
        var cabe = Math.min(anchoMax, (altoLibre - altoPie) * p.ratio);
        if (Math.abs(cabe - ancho) < 1 && ancho / p.ratio + altoPie <= altoLibre + 0.5) break;
        ancho = Math.max(120, cabe);
      }
      panel.style.width = ancho + "px";
      altoPie = pie.getBoundingClientRect().height;
      var altoFoto = ancho / p.ratio;
      var alto = altoFoto + altoPie;
      return {
        izq: rg.left + (rg.width - ancho) / 2,
        arr: arriba + Math.max(0, (altoLibre - alto) / 2),
        ancho: ancho, altoFoto: altoFoto, altoPie: altoPie
      };
    }

    /* El punto de partida: la miniatura. La foto grande, escalada por igual,
       recortada a lo que enseña la miniatura (el mismo encuadre que su
       object-fit: cover con su foco).                                       */
    function desde(p, d, miniatura) {
      var r = miniatura.getBoundingClientRect();
      var foco = String(p.foco || "50% 50%").split(/\s+/).map(function (v) { return parseFloat(v) / 100; });
      var fx = isNaN(foco[0]) ? 0.5 : foco[0], fy = isNaN(foco[1]) ? 0.5 : foco[1];
      var s, t = 0, der = 0, b = d.altoPie, izq = 0;
      if (d.ancho / d.altoFoto < r.width / r.height) {
        s = r.width / d.ancho;
        var sobraAlto = d.altoFoto - r.height / s;
        t = sobraAlto * fy; b += sobraAlto * (1 - fy);
      } else {
        s = r.height / d.altoFoto;
        var sobraAncho = d.ancho - r.width / s;
        izq = sobraAncho * fx; der = sobraAncho * (1 - fx);
      }
      return {
        transform: "translate(" + (r.left - d.izq - s * izq) + "px," + (r.top - d.arr - s * t) + "px) scale(" + s + ")",
        clipPath: "inset(" + t + "px " + der + "px " + b + "px " + izq + "px)"
      };
    }

    function colocar(d) {
      var rh = host.getBoundingClientRect();
      panel.style.left = (d.izq - rh.left) + "px";
      panel.style.top = (d.arr - rh.top) + "px";
    }

    function abrir(id, boton) {
      var p = porId(id);
      if (!p || abierta) return;
      if (!panel) crearPanel();
      if (cierrePendiente) cierrePendiente();
      soltarAnimaciones();
      var miniatura = $(".rejilla__lamina", boton);
      var previa = $("img", miniatura);
      panel.innerHTML =
        '<div class="muestra__foto" style="aspect-ratio:' + p.ratio + '">' +
          '<img class="muestra__previa" src="' + esc(previa ? previa.currentSrc || previa.src : "") + '" alt="">' +
          N.imgHTML({ base: p.img, tipo: "obra", alt: p.alt, ratio: p.ratio, eager: true, clase: "muestra__grande",
                      sizes: "(min-width: 60rem) 44rem, 92vw" }) +
        "</div>" + pieHTML(p);
      var grande = $(".muestra__grande", panel);
      grande.addEventListener("load", function () { grande.setAttribute("data-lista", ""); });
      if (grande.complete && grande.naturalWidth) grande.setAttribute("data-lista", "");

      panel.hidden = false;
      panel.style.pointerEvents = "";
      panel.style.visibility = "hidden";
      var d = destino(p);
      colocar(d);
      panel.style.visibility = "";
      abierta = { id: id, boton: boton, miniatura: miniatura, p: p };
      abiertaDesde = performance.now();

      host.setAttribute("data-abierta", "");
      if (seccion) seccion.setAttribute("data-muestra-abierta", "");
      boton.setAttribute("aria-expanded", "true");
      miniatura.style.visibility = "hidden";
      lista.inert = true;
      var accion = $(".muestra__accion", host);
      if (accion) accion.inert = true;

      if (N.quieto()) {
        anim = panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: "ease" });
      } else {
        anim = panel.animate([desde(p, d, miniatura), { transform: "none", clipPath: "inset(0px 0px 0px 0px)" }],
                             { duration: 600, easing: ABRIR });
        $(".muestra__pie", panel).animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }],
                                          { duration: 600, easing: "ease" });
      }
      panel.focus({ preventScroll: true });
    }

    function cerrar(conFoco) {
      if (!abierta) return;
      var a = abierta;
      abierta = null;
      host.removeAttribute("data-abierta");
      if (seccion) seccion.removeAttribute("data-muestra-abierta");
      a.boton.setAttribute("aria-expanded", "false");
      lista.inert = false;
      var accion = $(".muestra__accion", host);
      if (accion) accion.inert = false;
      function fin() {
        cierrePendiente = null;
        soltarAnimaciones();
        panel.hidden = true;
        panel.innerHTML = "";
        a.miniatura.style.visibility = "";
      }
      cierrePendiente = fin;
      /* Mientras vuelve no se puede tocar: el toque tiene que llegar a la
         miniatura que haya debajo, por si se quiere abrir otra ya.         */
      panel.style.pointerEvents = "none";
      /* Si aún iba de camino, vuelve desde donde está: la misma animación,
         al revés, sin saltar al final.                                     */
      if (anim && anim.playState === "running" && !N.quieto()) {
        panel.getAnimations({ subtree: true }).forEach(function (x) { x.reverse(); });
        anim.onfinish = fin;
        if (conFoco) a.boton.focus({ preventScroll: true });
        return;
      }
      soltarAnimaciones();
      if (N.quieto()) {
        anim = panel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: "ease" });
      } else {
        var r = panel.getBoundingClientRect(), fp = $(".muestra__foto", panel).getBoundingClientRect();
        var d = { izq: r.left, arr: r.top, ancho: r.width, altoFoto: fp.height, altoPie: r.height - fp.height };
        anim = panel.animate([{ transform: "none", clipPath: "inset(0px 0px 0px 0px)" }, desde(a.p, d, a.miniatura)],
                             { duration: 420, easing: CURVA, fill: "forwards" });
      }
      anim.onfinish = fin;
      if (conFoco) a.boton.focus({ preventScroll: true });
    }

    lista.addEventListener("click", function (e) {
      var b = e.target.closest("[data-desplegar]");
      if (b) abrir(b.getAttribute("data-desplegar"), b);
    });
    document.addEventListener("click", function (e) {
      if (abierta && panel && !panel.contains(e.target) && !e.target.closest("[data-desplegar]") &&
          !e.target.closest("[data-visor]")) cerrar(false);
    });
    document.addEventListener("keydown", function (e) {
      var visor = $("[data-visor]");
      if (e.key === "Escape" && abierta && !(visor && visor.open)) cerrar(true);
    });
    /* Si cambia el ancho de la pantalla, la foto se cierra sin viaje: su
       sitio y su tamaño ya no valdrían.                                     */
    var anchoAntes = window.innerWidth;
    window.addEventListener("resize", function () {
      if (!abierta || window.innerWidth === anchoAntes) return;
      anchoAntes = window.innerWidth;
      soltarAnimaciones();
      var a = abierta; abierta = null;
      host.removeAttribute("data-abierta");
      if (seccion) seccion.removeAttribute("data-muestra-abierta");
      a.boton.setAttribute("aria-expanded", "false");
      lista.inert = false;
      var accion = $(".muestra__accion", host);
      if (accion) accion.inert = false;
      panel.hidden = true; panel.innerHTML = "";
      a.miniatura.style.visibility = "";
    });
  })();

  /* Los cuatro oficios, como carteles: la tarjeta de tatuajes, grande, con un
     reel; la del láser, con el suyo; las que aún no tienen foto, en negro,
     con la palabra. Toda la tarjeta lleva a su página (el enlace se estira
     con ::after); los estilos de la de tatuajes van cada uno a su sección.
     El reel está quieto (su primer fotograma) y se mueve al pasar por
     encima con el ratón: en el móvil no gasta datos ni se mueve solo.       */
  function mediaOficio(s) {
    var clave = s.portada || s.video;
    var v = clave && S.videos[clave];
    if (v && v.publicar) return { video: v };
    var foto = s.pagina === "tatuajes" ? conFoto(S.obras)[0] : conFoto(s.fotos)[0];
    return foto ? { foto: foto } : null;
  }

  function mediaHTML(m) {
    if (m.video) {
      var base = "assets/vid/" + m.video.base;
      return '<div class="oficio__media" aria-hidden="true">' +
        '<img src="' + base + '-poster.webp" alt="" width="600" height="' + Math.round(600 / m.video.ratio) +
          '" loading="lazy" decoding="async">' +
        '<video muted loop playsinline preload="none" tabindex="-1">' +
          '<source data-src="' + base + '.webm" type="video/webm">' +
          '<source data-src="' + base + '.mp4" type="video/mp4">' +
        "</video></div>";
    }
    return '<div class="oficio__media" aria-hidden="true">' +
      N.imgHTML({ base: m.foto.img, tipo: "obra", alt: "", ratio: m.foto.ratio, foco: m.foto.foco,
                  sizes: "(min-width: 60rem) 55vw, 92vw" }) + "</div>";
  }

  set("[data-inicio-servicios]",
    '<ul class="oficios" role="list">' + S.servicios.map(function (s) {
      var m = mediaOficio(s);
      var tatuajes = s.pagina === "tatuajes";
      var trabajos = S.obras.filter(publicada).length;
      var dato = tatuajes && trabajos
        ? N.rellenar(I.servicios.cuentaTatuajes, { estilos: ESTILOS.length, trabajos: trabajos })
        : "";
      var estilos = tatuajes
        ? '<ul class="oficio__estilos" role="list">' + ESTILOS.map(function (e) {
            return '<li><a class="chip" href="' + esc(N.hrefPagina(s.pagina)) + "#" + esc(e.id) + '">' +
              esc(e.nombre) + "</a></li>";
          }).join("") + "</ul>"
        : "";
      return '<li class="oficio oficio--' + esc(s.id) + (m ? " oficio--con-media" : " oficio--sin-media") + '">' +
        (m ? mediaHTML(m) : "") +
        '<div class="oficio__cuerpo">' +
          '<p class="oficio__dato etiqueta"><span class="corchetes">' + esc(s.etiqueta) + "</span>" +
            (dato ? '<span class="oficio__cuenta">' + esc(dato) + "</span>" : "") + "</p>" +
          '<h3 class="oficio__nombre" style="--letras:' + palabraMasLarga(s.titular) + '">' +
            '<a class="oficio__enlace" href="' + esc(N.hrefPagina(s.pagina)) + '"><span>' + esc(s.titular) + "</span></a></h3>" +
          '<p class="oficio__resumen"><span>' + esc(s.resumen) + "</span></p>" +
          estilos +
        "</div>" +
        '<span class="oficio__ir" aria-hidden="true"><i class="flecha"></i></span>' +
      "</li>";
    }).join("") + "</ul>" +
    (S.cuidados
      ? '<p class="oficios__cuidados"><span class="t2">' + esc(I.servicios.cuidados) + "</span> " +
          '<a class="enlace-flecha" href="' + esc(N.hrefPagina(S.cuidados.pagina)) + '">' + esc(S.cuidados.enlace) +
          '<i class="flecha" aria-hidden="true"></i></a></p>'
      : ""));

  /* Los reels de los oficios. Con ratón suenan al pasar por encima; en el
     móvil, donde no hay «encima», suenan solos mientras la tarjeta está a la
     vista y se paran al salir. Nunca con movimiento reducido ni con ahorro
     de datos: entonces se queda el primer fotograma.                      */
  (function reelsDeLosOficios() {
    var fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    var ahorro = navigator.connection && navigator.connection.saveData;
    function cargar(v) {
      if (v.getAttribute("data-cargado")) return;
      $$("source[data-src]", v).forEach(function (x) { x.src = x.getAttribute("data-src"); });
      v.load();
      v.setAttribute("data-cargado", "1");
    }
    function sonar(o, v) {
      if (N.quieto() || ahorro) return;
      cargar(v);
      v.play().then(function () { o.setAttribute("data-sonando", ""); }).catch(function () {});
    }
    function parar(o, v) { v.pause(); o.removeAttribute("data-sonando"); }

    var tarjetas = $$(".oficio").filter(function (o) { return $("video", o); });
    tarjetas.forEach(function (o) {
      var v = $("video", o);
      o.addEventListener("pointerenter", function () { if (fino.matches) sonar(o, v); });
      o.addEventListener("pointerleave", function () { if (fino.matches) parar(o, v); });
      o.addEventListener("focusin", function () { sonar(o, v); });
      o.addEventListener("focusout", function () { if (!o.contains(document.activeElement)) parar(o, v); });
    });

    if (!("IntersectionObserver" in window) || !tarjetas.length) return;
    var vista = new IntersectionObserver(function (entradas) {
      if (fino.matches) return;
      entradas.forEach(function (e) {
        var v = $("video", e.target);
        if (e.isIntersecting) sonar(e.target, v); else parar(e.target, v);
      });
    }, { threshold: 0.55 });
    tarjetas.forEach(function (o) { vista.observe(o); });
  })();

  /* Opiniones: reseñas de Google con la foto que subió quien la escribió.
     Cada una alterna lado: la foto a un lado, la cita grande al otro. El
     nombre va en su bloque negro montado sobre la foto, y no se mueve con
     ella: al girar la foto, el nombre queda delante (el efecto, abajo).    */
  (function opiniones() {
    var host = $("[data-inicio-opiniones]");
    if (!host) return;
    var O = I.opiniones, G = S.studio.google;
    var lista = S.opiniones || [];
    var lead = $('[data-cab="inicio.opiniones"] .lead');
    if (lead && G) lead.textContent = N.rellenar(O.entradilla, { nota: G.nota, n: G.resenas });
    var seccion = host.closest("section");
    if (seccion) seccion.hidden = !lista.length;
    host.innerHTML = '<ol class="opiniones" role="list">' + lista.map(function (o, i) {
      var a = o.artista ? N.artistaPor(o.artista) : null;
      var estrellas = "";
      for (var k = 0; k < 5; k++) estrellas += "<i" + (k < o.nota ? "" : ' class="apagada"') + "></i>";
      return '<li class="opinion">' +
        '<div class="opinion__foto">' +
          '<div class="opinion__marco">' +
            N.imgHTML({ base: o.img, tipo: "obra", alt: o.alt, ratio: o.ratio, clase: "opinion__img",
                        sizes: "(min-width: 60rem) 28rem, 80vw" }) +
          "</div>" +
          '<p class="opinion__quien etiqueta" id="op-' + i + '">' + esc(o.nombre) + "</p>" +
        "</div>" +
        '<div class="opinion__texto">' +
          '<p class="estrellas" role="img" aria-label="' + esc(N.rellenar(O.estrellas, { n: o.nota })) + '">' +
            estrellas + "</p>" +
          '<blockquote class="opinion__cita" cite="' + esc(o.enlace) + '" aria-describedby="op-' + i + '">' +
            "<p>«" + esc(o.texto) + "»</p></blockquote>" +
          '<p class="opinion__meta etiqueta etiqueta--suave">' +
            (a ? O.tatuadoPor.split("{artista}").map(esc).join(artistaHTML(a, "opinion__artista")) + " · " : "") +
            esc(o.fecha) + "</p>" +
          '<a class="opinion__enlace" href="' + esc(o.enlace) + '" target="_blank" rel="noopener">' +
            esc(O.leer) + '<i class="flecha" aria-hidden="true"></i>' +
            '<span class="visually-hidden"> (se abre en Google Maps)</span></a>' +
        "</div>" +
      "</li>";
    }).join("") + "</ol>" +
    (G ? '<p class="opiniones__todas"><a class="btn btn--grande" href="' + esc(G.ficha) + '" target="_blank" rel="noopener">' +
          esc(N.rellenar(O.todas, { n: G.resenas })) + '<i class="flecha" aria-hidden="true"></i>' +
          '<span class="visually-hidden"> (se abre en Google Maps)</span></a></p>' : "");
  })();

  /* El giro de las opiniones, adaptado de «Smooth Scrolling Image Effects»
     (Codrops, versión de DivineBlow en CodePen): cada foto entra inclinada
     en 3D, se pone plana al pasar por el centro de la pantalla y sale
     inclinada hacia el otro lado, mientras la imagen se desliza dentro de su
     marco. Del original se queda el gesto; no el scroll suavizado de toda la
     página, que secuestra la rueda, rompe la barra fija, las anclas y la
     búsqueda del navegador. Aquí se mide con el scroll de siempre, solo
     mientras la sección está en pantalla, con 30° en vez de 60° y sin
     nada de azar: cada foto gira siempre igual. Con «reducir movimiento»,
     quieto.                                                                */
  (function giroOpiniones() {
    var els = $$(".opinion");
    if (!els.length || N.quieto() || !("IntersectionObserver" in window)) return;
    var MAX = 30, SUAVE = 0.1;
    var EJES = [[0.35, -0.2], [-0.3, 0.25], [0.25, 0.3], [-0.2, -0.3]];
    var items = els.map(function (el, i) {
      return { el: el, marco: $(".opinion__marco", el), img: $(".opinion__img", el),
               ry: EJES[i % 4][0], rz: EJES[i % 4][1], giro: 0, desliz: 0, dentro: false };
    });
    var vivos = 0, pidiendo = false;

    function objetivo(it) {
      var r = it.el.getBoundingClientRect(), h = window.innerHeight;
      var t = Math.min(1, Math.max(0, (h - r.top) / (h + r.height)));
      var sobra = (it.img.offsetHeight - it.marco.offsetHeight) / 2;
      return { giro: MAX * (1 - 2 * t), desliz: sobra * (2 * t - 1) };
    }
    function pintar(it) {
      it.marco.style.transform = "rotate3d(1," + it.ry + "," + it.rz + "," + it.giro.toFixed(2) + "deg)";
      it.img.style.transform = "translate3d(0," + it.desliz.toFixed(1) + "px,0)";
    }
    /* Primero se miden todas y luego se pintan todas: medir después de
       pintar obligaría al navegador a recalcular la página cada vez.       */
    function fotograma() {
      pidiendo = false;
      var dentro = items.filter(function (it) { return it.dentro; });
      var metas = dentro.map(objetivo);
      var queda = false;
      dentro.forEach(function (it, i) {
        it.giro += (metas[i].giro - it.giro) * SUAVE;
        it.desliz += (metas[i].desliz - it.desliz) * SUAVE;
        if (Math.abs(metas[i].giro - it.giro) > 0.05) queda = true;
      });
      dentro.forEach(pintar);
      if (queda) pedir();
    }
    function pedir() { if (!pidiendo) { pidiendo = true; requestAnimationFrame(fotograma); } }

    var obs = new IntersectionObserver(function (entradas) {
      var nuevos = [];
      entradas.forEach(function (e) {
        var it = items[els.indexOf(e.target)];
        if (e.isIntersecting && !it.dentro) nuevos.push(it);
        it.dentro = e.isIntersecting;
      });
      /* Al entrar, sin arrastre: donde le toca estar ya. */
      var metas = nuevos.map(objetivo);
      nuevos.forEach(function (it, i) { it.giro = metas[i].giro; it.desliz = metas[i].desliz; });
      nuevos.forEach(pintar);
      vivos = items.filter(function (it) { return it.dentro; }).length;
      if (vivos) pedir();
    }, { rootMargin: "100px 0px" });
    items.forEach(function (it) { obs.observe(it.el); });
    window.addEventListener("scroll", function () { if (vivos) pedir(); }, { passive: true });
    window.addEventListener("resize", function () { if (vivos) pedir(); });
    N.mqQuieto.addEventListener("change", function () {
      if (!N.quieto()) return;
      obs.disconnect(); vivos = 0;
      items.forEach(function (it) { it.marco.style.transform = ""; it.img.style.transform = ""; });
    });
  })();

  set("[data-faq-general]", faqHTML(S.preguntas));

  /* Dónde estamos: el mapa a la izquierda y, a la derecha, en orden de
     lectura, lo que hay que saber, la nota de Google, los datos y los dos
     botones. El mapa es una imagen en la paleta de la web (tools/make-mapa.py):
     sale al momento y no avisa a nadie. «Mover el mapa» carga el de Google
     aquí mismo; sin JavaScript, abre su ficha.                             */
  var d = S.studio.direccion, C = I.contacto, G = S.studio.google;
  var GOOGLE = '<span class="visually-hidden"> (se abre en Google Maps)</span>';
  set("[data-inicio-contacto]",
    '<div class="mapa" data-mapa>' +
      '<img class="mapa__img" src="assets/img/mapa-900.webp" srcset="assets/img/mapa-900.webp 900w, ' +
        'assets/img/mapa-1400.webp 1400w" sizes="(min-width: 60rem) 55vw, 100vw" width="1400" height="1000" ' +
        'alt="' + esc(C.mapa.alt) + '" loading="lazy" decoding="async">' +
      '<span class="mapa__marca" aria-hidden="true"><span class="mapa__rotulo etiqueta">' +
        esc(S.studio.nombre) + "</span></span>" +
      (G
        ? '<a class="btn mapa__abrir" href="' + esc(G.ficha) + '" target="_blank" rel="noopener" data-mapa-abrir>' +
            esc(C.mapa.abrir) +
            '<span class="visually-hidden">. ' + esc(C.mapa.nota) + "</span></a>"
        : "") +
      '<p class="mapa__credito">© <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap</a></p>' +
    "</div>" +
    '<div class="contacto__info">' +
      '<p class="lead contacto__texto">' + esc(C.texto) + "</p>" +
      (G
        ? '<a class="nota" href="' + esc(G.ficha) + '" target="_blank" rel="noopener">' +
            '<span class="nota__cifra num">' + esc(G.nota) + "</span>" +
            '<span class="nota__texto">' +
              '<span class="etiqueta">' + esc(N.rellenar(C.resenas, { n: G.resenas })) + "</span>" +
              '<span class="nota__leer">' + esc(C.leerResenas) + '<i class="flecha" aria-hidden="true"></i></span>' +
            "</span>" + GOOGLE + "</a>"
        : "") +
      '<dl class="contacto__lista">' +
        '<div><dt class="etiqueta etiqueta--suave">Dirección</dt>' +
          "<dd>" + esc(d.calle) + "<br>" + esc(N.lineaCiudad(d)) +
            (d.indicaciones ? '<br><span class="t2">' + esc(d.indicaciones) + "</span>" : "") + "</dd></div>" +
        '<div><dt class="etiqueta etiqueta--suave">Cita</dt>' +
          "<dd>" + esc(S.studio.cita) + "</dd></div>" +
        '<div><dt class="etiqueta etiqueta--suave">WhatsApp</dt>' +
          '<dd><a class="num" href="' + esc(N.wasapURL(S.studio.botonWhatsapp.mensaje)) +
            '" target="_blank" rel="noopener">' + esc(S.studio.whatsappVisible) + NUEVA + "</a></dd></div>" +
        (S.studio.instagram
          ? '<div><dt class="etiqueta etiqueta--suave">' + esc(C.instagram) + "</dt>" +
              '<dd><a href="https://www.instagram.com/' + esc(S.studio.instagram) + '/" rel="noopener">@' +
                esc(S.studio.instagram) + "</a></dd></div>"
          : "") +
      "</dl>" +
      '<p class="contacto__acciones" data-cta>' +
        botonWasap(I.cita, S.studio.botonWhatsapp.mensaje, "btn--macizo btn--grande") +
        '<a class="btn btn--grande" href="' + esc(N.mapaURL()) + '" target="_blank" rel="noopener">' +
          esc(C.comoLlegar) + '<i class="flecha" aria-hidden="true"></i>' + GOOGLE + "</a>" +
      "</p>" +
    "</div>");

  (function mapaInteractivo() {
    var mapa = $("[data-mapa]");
    var boton = mapa && $("[data-mapa-abrir]", mapa);
    if (!boton || !G || !G.mapa) return;
    boton.addEventListener("click", function (e) {
      e.preventDefault();
      var f = document.createElement("iframe");
      f.className = "mapa__iframe";
      f.src = G.mapa;
      f.title = C.mapa.titulo;
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.setAttribute("allowfullscreen", "");
      mapa.appendChild(f);
      mapa.setAttribute("data-interactivo", "");
      boton.remove();
      f.focus();
    });
  })();

  /* ============================================================================
     PÁGINA DE UN SERVICIO (y la de tatuajes, que es un servicio más)
     ============================================================================ */

  /* El titular va al tamaño del cartel, con tope por la palabra más larga:
     «Micropigmentación» mide el doble que «Láser», y a ese tamaño partiría. */
  function palabraMasLarga(t) {
    return Math.max.apply(null, String(t).split(/\s+/).map(function (w) { return w.length; }));
  }

  if (SV) {
    var fotosSV = SV.pagina === "tatuajes" ? [] : conFoto(SV.fotos);
    var video = SV.video ? N.videoHTML(SV.video, true) : "";
    /* A la cabecera va el vídeo del servicio o, si no tiene, su primera
       foto. Sin ninguna de las dos, la cabecera es solo texto.              */
    var media = video || (fotosSV[0]
      ? N.imgHTML({ base: fotosSV[0].img, tipo: "obra", alt: fotosSV[0].alt, ratio: fotosSV[0].ratio,
                    foco: fotosSV[0].foco, sizes: "(min-width: 60rem) 30vw, 92vw", eager: true })
      : "");
    /* El segundo botón baja a lo que hay que ver: los estilos en la página
       de tatuajes, las fotos en las demás. Sin fotos todavía, no sale.      */
    var bajar = SV.pagina === "tatuajes"
      ? flecha(T.tatuajes.verEstilos, "#estilos", "btn--grande")
      : fotosSV.length ? flecha(T.servicio.verFotos, "#trabajos", "btn--grande") : "";

    /* La foto de la cabecera ya viene en el HTML volcado, y el navegador la
       está bajando: es la imagen grande de la primera pantalla. Al repintar
       la cabecera se conserva ese mismo <img>; uno nuevo cancelaría la
       descarga y la empezaría otra vez.                                     */
    var mediaPrevia = $("[data-servicio-cab] .scab__media");
    var cab = set("[data-servicio-cab]",
      '<div class="scab__titular">' +
        '<p class="etiqueta"><span class="corchetes">' + esc(SV.etiqueta) + "</span></p>" +
        '<h1 class="scab__h1" id="t-servicio" style="--letras:' + palabraMasLarga(SV.titular) + '">' +
          esc(SV.titular) + "</h1>" +
      "</div>" +
      '<div class="scab__texto">' +
        '<p class="lead scab__entradilla">' + esc(SV.entradilla) + "</p>" +
        '<div class="scab__acciones" data-cta-principal data-cta>' +
          botonWasap(SV.boton, SV.mensaje, "btn--macizo btn--grande") +
          bajar +
        "</div>" +
        datosHTML(SV.puntos, "scab__datos") +
      "</div>" +
      (media ? '<div class="scab__media">' + media + "</div>" : ""));
    if (cab) cab.classList.toggle("scab--sin-media", !media);
    var mediaNueva = $("[data-servicio-cab] .scab__media");
    var imgPrevia = mediaPrevia && $("img", mediaPrevia), imgNueva = mediaNueva && $("img", mediaNueva);
    if (imgPrevia && imgNueva && imgPrevia.getAttribute("srcset") === imgNueva.getAttribute("srcset")) {
      mediaNueva.replaceWith(mediaPrevia);
    }

    set("[data-servicio-pasos]", SV.pasos && SV.pasos.length
      ? '<header class="cab"><p class="etiqueta corchetes">' + esc(T.servicio.pasos.etiqueta) + "</p>" +
          '<h2 class="d2" id="t-pasos">' + esc(T.servicio.pasos.titular) + "</h2></header>" +
        '<ol class="pasos" role="list">' + SV.pasos.map(function (p, i) {
          return '<li class="pasos__paso">' +
            '<span class="pasos__num num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
            '<h3 class="d3 pasos__titulo">' + esc(p.titulo) + "</h3>" +
            '<p class="pasos__texto">' + esc(p.texto) + "</p>" +
          "</li>";
        }).join("") + "</ol>"
      : "");
    var bandaPasos = $("[data-servicio-pasos]");
    if (bandaPasos) bandaPasos.hidden = !(SV.pasos && SV.pasos.length);

    /* Los pasos entran uno detrás de otro al llegar a ellos: el filete de
       cada fila se traza de izquierda a derecha, el número sube desde su
       línea base y el texto aparece detrás. Solo la primera vez. Sin
       JavaScript o con «reducir movimiento», están quietos y visibles: el
       estado de espera lo pone esto, no el CSS.                            */
    (function pasosEnMovimiento() {
      var lista = $(".pasos");
      if (!lista || N.quieto() || !("IntersectionObserver" in window)) return;
      lista.setAttribute("data-pasos-anim", "");
      var obs = new IntersectionObserver(function (entradas) {
        var orden = 0;
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          /* Las que entran a la vez, escalonadas: 110 ms entre una y otra. */
          e.target.style.setProperty("--retardo", (orden++ * 110) + "ms");
          e.target.setAttribute("data-visto", "");
          obs.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -10% 0px" });
      $$(".pasos__paso", lista).forEach(function (f) { obs.observe(f); });
    })();

    /* Fotos de la página (piercing, láser, micropigmentación). */
    /* Sin ninguna foto todavía, la sección no sale: el botón de «ver
       trabajos» de la cabecera tampoco.                                     */
    if (SV.pagina !== "tatuajes") {
      N.grupos[SV.pagina] = fotosSV;
      var seccionFotos = set("[data-servicio-fotos]", fotosSV.length
        ? '<header class="cab"><p class="etiqueta corchetes">' + esc(T.servicio.fotos.etiqueta) + "</p>" +
            '<h2 class="d2" id="t-fotos">' + esc(T.servicio.fotos.titular) + "</h2></header>" +
          rejillaHTML(fotosSV, SV.pagina)
        : "");
      if (seccionFotos) seccionFotos.hidden = !fotosSV.length;
    }

    set("[data-servicio-preguntas]", SV.preguntas && SV.preguntas.length
      ? '<header class="cab"><p class="etiqueta corchetes">' + esc(T.servicio.preguntas.etiqueta) + "</p>" +
          '<h2 class="d2" id="t-preguntas">' + esc(T.servicio.preguntas.titular) + "</h2></header>" +
        faqHTML(SV.preguntas) + guiaEnlace(SV)
      : "");
  }

  /* El enlace de un servicio a su guía de cuidados, si la tiene. */
  function guiaEnlace(sv) {
    var CU = S.cuidados;
    var g = CU && CU.guias.filter(function (x) { return x.servicio === sv.id; })[0];
    if (!g) return "";
    return '<p class="guia-enlace">' +
      flecha(CU.textos.enServicio, N.hrefPagina(CU.pagina) + "#" + g.servicio, "btn--grande") + "</p>";
  }

  /* ============================================================================
     TATUAJES: POR ESTILOS
     Una sección por estilo, en el orden de content.js, con su barra para
     saltar de uno a otro. Todo son anclas: funciona sin JavaScript y cada
     estilo tiene su dirección (tatuajes#anime).
     ============================================================================ */

  var TT = T.tatuajes;

  set("[data-estilos-nav]",
    '<ul class="estilos-nav__lista" role="list">' + ESTILOS.map(function (e) {
      var n = obrasDe(e).length;
      return '<li><a class="estilos-nav__link" href="#' + esc(e.id) + '">' + esc(e.nombre) +
        (n ? ' <span class="estilos-nav__n num">' + n + "</span>" : "") + "</a></li>";
    }).join("") + "</ul>");

  set("[data-estilos]", ESTILOS.map(function (e) {
    var obras = obrasDe(e);
    N.grupos["estilo:" + e.id] = conFoto(obras);
    var n = obras.length;
    return '<section class="estilo" id="' + esc(e.id) + '" aria-labelledby="t-' + esc(e.id) + '">' +
      '<header class="estilo__cab">' +
        '<h2 class="d2 estilo__nombre" id="t-' + esc(e.id) + '">' + esc(e.nombre) + "</h2>" +
        (e.descripcion ? '<p class="estilo__desc">' + esc(e.descripcion) + "</p>" : "") +
        '<p class="estilo__accion">' +
          botonWasap(TT.botonEstilo, N.rellenar(TT.mensajeEstilo, { estilo: e.nombre.toLowerCase() }),
                     "", ": " + e.nombre) + "</p>" +
      "</header>" +
      '<div class="estilo__obras">' +
        (n ? rejillaHTML(obras, "estilo:" + e.id) : pendienteHTML(e.nombre, TT.pendiente)) +
      "</div>" +
    "</section>";
  }).join(""));

  /* La barra de estilos (y la de las guías de cuidados) marca con
     corchetes el que estás viendo: el último cuya cabeza ha pasado ya la
     mitad de la pantalla. Por encima del primero, ninguno. Se mide al
     hacer scroll, una vez por fotograma.                                   */
  function espia() {
    var links = $$(".estilos-nav__link");
    var secciones = $$(".estilo, .guia");
    var barra = $(".estilos-nav__lista");
    if (!links.length || !secciones.length) return;
    var actual = null, pendiente = false;

    function medir() {
      pendiente = false;
      var corte = window.innerHeight * 0.5, id = null;
      secciones.forEach(function (s) { if (s.getBoundingClientRect().top < corte) id = s.id; });
      if (id === actual) return;
      actual = id;
      links.forEach(function (a) {
        if (a.getAttribute("href") !== "#" + id) { a.removeAttribute("aria-current"); return; }
        a.setAttribute("aria-current", "true");
        /* En el móvil la barra se desliza de lado: el estilo actual se trae
           a la vista sin mover la página.                                  */
        if (barra && barra.scrollWidth > barra.clientWidth) {
          var x = a.offsetLeft - (barra.clientWidth - a.offsetWidth) / 2;
          barra.scrollTo({ left: x, behavior: N.quieto() ? "auto" : "smooth" });
        }
      });
    }
    window.addEventListener("scroll", function () {
      if (!pendiente) { pendiente = true; requestAnimationFrame(medir); }
    }, { passive: true });
    medir();
  }

  /* ============================================================================
     INSTAGRAM · al final de todas las páginas
     El perfil del estudio en grande, que es lo que hay que recordar, y el
     de cada artista debajo. La cuadrícula de trabajos es un guiño a la del
     perfil: lleva al mismo sitio que el titular, así que para el teclado y
     el lector de pantalla no existe (no repite el enlace).
     ============================================================================ */

  (function instagram() {
    var host = $("[data-instagram]");
    if (!host) return;
    var IG = T.instagram, cuenta = S.studio.instagram;
    host.hidden = !cuenta;
    if (!cuenta) return;
    var url = N.instaURL(cuenta);
    var fotos = (IG.fotos || []).map(function (id) {
      return S.obras.filter(function (o) { return o.id === id && o.img; })[0];
    }).filter(Boolean);
    var equipo = S.artistas.filter(function (a) { return a.instagram; });
    host.innerHTML =
      '<div class="insta__texto">' +
        '<p class="etiqueta corchetes">' + esc(IG.etiqueta) + "</p>" +
        '<h2 class="insta__cuenta" id="t-insta">' +
          '<a href="' + esc(url) + '" rel="noopener">@' + esc(cuenta) +
            '<span class="visually-hidden"> (Instagram del estudio)</span></a></h2>' +
        '<p class="lead insta__entradilla">' + esc(IG.texto) + "</p>" +
        '<p class="insta__accion"><a class="btn btn--grande" href="' + esc(url) + '" rel="noopener">' +
          N.CAMARA + "<span>" + esc(IG.boton) + "</span></a></p>" +
        (equipo.length
          ? '<div class="insta__equipo">' +
              '<h3 class="etiqueta etiqueta--suave">' + esc(IG.equipo) + "</h3>" +
              '<ul class="insta__artistas" role="list">' + equipo.map(function (a) {
                return '<li><a class="insta__artista" href="' + esc(N.instaURL(a.instagram)) + '" rel="noopener">' +
                  '<span class="insta__nombre">' + esc(a.nombre) + "</span>" +
                  '<span class="insta__usuario">@' + esc(a.instagram) + "</span>" +
                  '<i class="flecha" aria-hidden="true"></i></a></li>';
              }).join("") + "</ul>" +
            "</div>"
          : "") +
      "</div>" +
      (fotos.length
        ? '<a class="insta__rejilla" href="' + esc(url) + '" rel="noopener" tabindex="-1" aria-hidden="true">' +
            fotos.map(function (f) {
              return '<span class="insta__foto">' +
                N.imgHTML({ base: f.img, tipo: "obra", alt: "", ratio: f.ratio, foco: f.foco,
                            sizes: "(min-width: 60rem) 14vw, 31vw" }) + "</span>";
            }).join("") + "</a>"
        : "");
  })();

  /* ============================================================================
     CUIDADOS · la guía de curación
     Una guía por servicio, con su barra para saltar de una a otra (la misma
     que la de los estilos) y su dirección: cuidados#piercing se manda por
     WhatsApp después de la cita y abre justo la que toca.
     ============================================================================ */

  var CU = N.CUIDADOS;
  if (CU) {
    var CT = CU.textos;
    var servicioDe = function (g) { return S.servicios.filter(function (x) { return x.id === g.servicio; })[0]; };

    set("[data-cuidados-cab]",
      '<div class="scab__titular">' +
        '<p class="etiqueta"><span class="corchetes">' + esc(CU.etiqueta) + "</span></p>" +
        '<h1 class="scab__h1" id="t-cuidados" style="--letras:' + palabraMasLarga(CU.titular) + '">' +
          esc(CU.titular) + "</h1>" +
      "</div>" +
      '<div class="scab__texto">' +
        '<p class="lead scab__entradilla">' + esc(CU.entradilla) + "</p>" +
        '<div class="scab__acciones" data-cta-principal data-cta>' +
          botonWasap(CU.boton, CU.mensaje, "btn--macizo btn--grande") +
        "</div>" +
        datosHTML(CU.puntos, "scab__datos") +
        '<p class="xs t2 guias__nota">' + esc(CU.nota) + "</p>" +
      "</div>");

    set("[data-cuidados-nav]",
      '<ul class="estilos-nav__lista" role="list">' + CU.guias.map(function (g) {
        return '<li><a class="estilos-nav__link" href="#' + esc(g.servicio) + '">' + esc(g.nombre) + "</a></li>";
      }).join("") + "</ul>");

    var lista = function (xs, clase) {
      return '<ul class="' + clase + '" role="list">' + xs.map(function (x) {
        return "<li>" + esc(x) + "</li>";
      }).join("") + "</ul>";
    };

    set("[data-cuidados]", CU.guias.map(function (g) {
      var sv = servicioDe(g);
      var id = esc(g.servicio);
      return '<section class="guia" id="' + id + '" aria-labelledby="t-g-' + id + '">' +
        '<header class="guia__cab">' +
          (sv ? '<p class="etiqueta"><span class="corchetes">' + esc(sv.etiqueta) + "</span></p>" : "") +
          '<h2 class="d2 guia__nombre" id="t-g-' + id + '" style="--letras:' + palabraMasLarga(g.nombre + ".") + '">' +
            esc(g.nombre) + ".</h2>" +
          datosHTML([{ dato: CT.cura, valor: g.cura }], "guia__datos") +
          '<p class="guia__acciones">' +
            botonWasap(CT.duda, N.rellenar(CT.mensajeDuda, { articulo: g.articulo }), "", ": " + g.nombre) +
            (sv ? flecha(N.rellenar(CT.servicio, { nombre: sv.menu.toLowerCase() }), N.hrefPagina(sv.pagina), "btn--quiet") : "") +
          "</p>" +
        "</header>" +
        '<div class="guia__cuerpo">' +
          '<h3 class="etiqueta guia__sub">' + esc(CT.fases) + "</h3>" +
          '<ol class="fases" role="list">' + g.fases.map(function (f, i) {
            return '<li class="fase">' +
              '<span class="fase__num num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span>" +
              '<h4 class="d4 fase__cuando">' + esc(f.cuando) + "</h4>" +
              lista(f.que, "fase__que") +
            "</li>";
          }).join("") + "</ol>" +
          '<div class="guia__dos">' +
            '<div class="guia__normal">' +
              '<h3 class="etiqueta">' + esc(CT.normal) + "</h3>" + lista(g.normal, "guia__lista") +
            "</div>" +
            '<div class="guia__avisar en-negro">' +
              '<h3 class="etiqueta">' + esc(CT.avisar) + "</h3>" + lista(g.avisar, "guia__lista") +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
    }).join(""));
  }

  /* ============================================================================
     404 · la página que no existe
     El número en cartel, como el titular de un servicio, y debajo las
     páginas de verdad, una por fila y enteras pulsables: quien llega por un
     enlace roto sigue en un toque.
     ============================================================================ */

  (function noEncontrada() {
    var host = $("[data-error]");
    if (!host) return;
    var E = T.noEncontrada;
    var paginas = S.servicios.map(function (s) { return { href: s.pagina, nombre: s.nombre, resumen: s.resumen }; });
    if (S.cuidados) paginas.push({ href: S.cuidados.pagina, nombre: S.cuidados.enlace, resumen: S.cuidados.resumen });
    host.innerHTML =
      '<div class="scab__titular">' +
        '<p class="etiqueta"><span class="corchetes">' + esc(E.etiqueta) + "</span></p>" +
        '<h1 class="scab__h1" id="t-error" style="--letras:' + palabraMasLarga(E.titular) + '">' + esc(E.titular) + "</h1>" +
      "</div>" +
      '<div class="scab__texto">' +
        '<p class="lead scab__entradilla">' + esc(E.entradilla) + "</p>" +
        '<div class="scab__acciones" data-cta-principal data-cta>' +
          botonWasap(I.cita, S.studio.botonWhatsapp.mensaje, "btn--macizo btn--grande") +
          flecha(E.volver, N.hrefPagina("inicio"), "btn--grande") +
        "</div>" +
      "</div>" +
      '<ul class="error__paginas" role="list">' + paginas.map(function (p) {
        return '<li><a class="error__pagina" href="' + esc(N.hrefPagina(p.href)) + '">' +
          '<span class="error__nombre">' + esc(p.nombre) + "</span>" +
          '<span class="error__resumen">' + esc(p.resumen) + "</span>" +
          '<i class="flecha" aria-hidden="true"></i></a></li>';
      }).join("") + "</ul>";
  })();

  /* La barra de estilos o de guías, cuando ya están pintadas las dos. */
  espia();

  /* Las preguntas de la guía de cuidados, al final: las de los días de
     después. Mismo acordeón que las de cada servicio.                      */
  if (CU) set("[data-cuidados-preguntas]", CU.preguntas && CU.preguntas.length
    ? '<header class="cab"><p class="etiqueta corchetes">' + esc(T.servicio.preguntas.etiqueta) + "</p>" +
        '<h2 class="d2" id="t-preguntas">' + esc(T.servicio.preguntas.titular) + "</h2></header>" +
      faqHTML(CU.preguntas)
    : "");

  /* --- preguntas: abrir y cerrar con calma --------------------------------------- */
  /* La respuesta se despliega (320 ms) y se recoge (240 ms), y el texto entra
     con un fundido corto. Se puede interrumpir: si pulsas a medio camino, sale
     desde donde está, no desde el principio. Una sola abierta por grupo, como
     hace `name` sin JavaScript; pero `name` cerraría la otra de golpe, así que
     al primer toque se quita y el grupo lo lleva esto, animando las dos.
     Con «reducir movimiento», se abre y se cierra sin más.                  */

  (function acordeones() {
    var items = $$(".faq__item");
    if (!items.length || !Element.prototype.animate) return;
    var CURVA = "cubic-bezier(0.23, 1, 0.32, 1)";

    function mover(d, abrir) {
      var caja = $(".faq__interior", d), cuerpo = $(".faq__cuerpo", d);
      var desde = d.open ? caja.getBoundingClientRect().height : 0;
      if (d._anim) { d._anim.cancel(); d._anim = null; }
      d._abierta = abrir;
      d.toggleAttribute("data-cerrando", !abrir);
      if (abrir) d.open = true;
      if (N.quieto()) { if (!abrir) d.open = false; d.removeAttribute("data-cerrando"); return; }
      var hasta = abrir ? caja.scrollHeight : 0;
      var dura = abrir ? 320 : 240;
      d._anim = caja.animate([{ height: desde + "px" }, { height: hasta + "px" }], { duration: dura, easing: CURVA });
      if (cuerpo) {
        cuerpo.animate(abrir
          ? [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }]
          : [{ opacity: 1 }, { opacity: 0 }],
          { duration: abrir ? 280 : 160, easing: CURVA, fill: abrir ? "none" : "forwards" });
      }
      d._anim.onfinish = function () {
        d._anim = null;
        if (!abrir) {
          d.open = false;
          d.removeAttribute("data-cerrando");
          if (cuerpo) cuerpo.getAnimations().forEach(function (a) { a.cancel(); });
        }
      };
    }

    items.forEach(function (d) {
      d._grupo = d.getAttribute("name") || "";
      d._abierta = d.open;
      $("summary", d).addEventListener("click", function (e) {
        e.preventDefault();
        items.forEach(function (x) { x.removeAttribute("name"); });
        var abrir = !d._abierta;
        if (abrir && d._grupo) {
          items.forEach(function (x) { if (x !== d && x._grupo === d._grupo && x._abierta) mover(x, false); });
        }
        mover(d, abrir);
      });
    });
  })();

  /* --- visor: sus textos ------------------------------------------------------------ */

  var V = T.visor;
  $$("[data-visor-texto]").forEach(function (n) {
    var k = n.getAttribute("data-visor-texto");
    if (V[k]) n.textContent = V[k];
  });
  $$("[data-visor-etiqueta]").forEach(function (n) {
    var k = n.getAttribute("data-visor-etiqueta");
    if (V[k]) n.setAttribute("aria-label", V[k]);
  });

  /* Lo recién inyectado necesita su propio pase de revelado y de vídeo. */
  N.revelar();
  N.videos();
})();
