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

  function pieFoto(p) {
    var a = p.artista ? N.artistaPor(p.artista) : null;
    var quien = a
      ? (a.instagram
          ? '<a class="etiqueta rejilla__artista" href="https://www.instagram.com/' + esc(a.instagram) +
              '/" rel="noopener">' + esc(a.nombre) + "</a>"
          : '<span class="etiqueta rejilla__artista">' + esc(a.nombre) + "</span>")
      : "";
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
     uno…, para que se vean todos los estilos antes de repetir. En el móvil
     se desliza de lado, como las historias de Instagram; en escritorio es
     una rejilla de cuatro. Se abren en el visor, aquí mismo.               */
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
            '<button class="rejilla__boton" type="button" data-abrir="' + esc(p.id) + '" data-grupo="muestra">' +
              '<span class="rejilla__lamina" data-revelar data-revelar-orden="' + (i % 4) + '">' +
                N.imgHTML({ base: p.img, tipo: "obra", alt: p.alt, ratio: p.ratio, foco: p.foco,
                            sizes: "(min-width: 60rem) 22vw, 62vw" }) +
              "</span></button>" +
            '<p class="rejilla__pie">' +
              (a ? '<span class="etiqueta rejilla__artista">' + esc(a.nombre) + "</span>" : "") +
              (e ? '<span class="rejilla__titulo">' + esc(e.nombre) + "</span>" : "") +
            "</p></li>";
        }).join("") + "</ul>" +
        '<p class="muestra__accion">' + flecha(M.verTodos, N.hrefPagina("tatuajes"), "btn--grande") + "</p>"
      : "");
    var seccion = host && host.closest("section");
    if (seccion) seccion.hidden = !elegidas.length;
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
    }).join("") + "</ul>");

  (function reelsDeLosOficios() {
    var fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    $$(".oficio").forEach(function (o) {
      var v = $("video", o);
      if (!v) return;
      function mover() {
        if (!fino.matches || N.quieto()) return;
        if (!v.getAttribute("data-cargado")) {
          $$("source[data-src]", v).forEach(function (x) { x.src = x.getAttribute("data-src"); });
          v.load();
          v.setAttribute("data-cargado", "1");
        }
        v.play().then(function () { o.setAttribute("data-sonando", ""); }).catch(function () {});
      }
      function parar() { v.pause(); o.removeAttribute("data-sonando"); }
      o.addEventListener("pointerenter", mover);
      o.addEventListener("pointerleave", parar);
      o.addEventListener("focusin", mover);
      o.addEventListener("focusout", parar);
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
        faqHTML(SV.preguntas)
      : "");
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

  /* La barra de estilos marca con corchetes el que estás viendo: el último
     cuya cabeza ha pasado ya la mitad de la pantalla. Por encima del
     primero, ninguno. Se mide al hacer scroll, una vez por fotograma.     */
  (function espia() {
    var links = $$(".estilos-nav__link");
    var secciones = $$(".estilo");
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
  })();

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
