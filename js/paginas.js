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

  /* Pinta un bloque. Si el HTML volcado ya es exactamente lo que se iba a
     pintar (lleva la misma firma), no lo repinta: así el navegador no
     vuelve a maquetar la página ni a pedir sus fotos al cargar. Si
     content.js ha cambiado y el HTML aún no se ha vuelto a volcar, la
     firma no coincide y se pinta como siempre.                            */
  function firma(t) {
    for (var h = 5381, i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  function pintar(n, html) {
    var f = firma(html);
    if (n.getAttribute("data-firma") === f) return n;
    n.innerHTML = html;
    n.setAttribute("data-firma", f);
    return n;
  }
  function set(sel, html) { var n = $(sel); return n ? pintar(n, html) : n; }

  var NUEVA = '<span class="visually-hidden"> (se abre en WhatsApp)</span>';
  var TT = T.tatuajes;

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
    if (t) pintar(cab, cabHTML(t, ruta[ruta.length - 1]));
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
  /* Las fotos de cada página van en su carrete (más abajo): enteras, con
     su proporción. Bajo cada una, quién la hizo: cada foto dice de quién
     es, y el nombre lleva a su Instagram.                                   */

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

  /* Un trabajo se ve si tiene foto, o si es un reel publicado, y no lo han
     dejado fuera con `publicar: false`.                                     */
  function publicada(o) {
    if (o.publicar === false) return false;
    return !!(o.img || (o.video && S.videos[o.video] && S.videos[o.video].publicar));
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

  /* Los trabajos de un estilo que se pueden ver, y el orden de los
     estilos: el de content.js, con los que aún no tienen ninguno al final.
     Salen todos (es la lista del estudio), pero una sección con su hueco
     entre dos llenas cortaría la página; al final, espera su primera foto
     sin estorbar. CON_OBRAS son los que tienen: la muestra, la tarjeta del
     inicio y la cuenta salen de ahí.                                        */
  function obrasDe(e) {
    return S.obras.filter(function (o) { return o.estilo === e.id && publicada(o); });
  }
  var CON_OBRAS = S.estilos.filter(function (e) { return obrasDe(e).length; });
  var ESTILOS = CON_OBRAS.concat(S.estilos.filter(function (e) { return !obrasDe(e).length; }));

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

  /* ============================================================================
     EL ESTUDIO · quiénes somos
     Su texto, en cuatro piezas que se leen de un tirón: el manifiesto en
     grande, las cifras, el local por dentro, sus puntos numerados y, al
     final, su frase en una banda negra con el botón de cita.
     ============================================================================ */

  var E = I.estudio;

  /* El manifiesto, palabra a palabra: cada una lleva su sitio en el texto
     (--i, de 0 a 1) para entintarse al leerla (manifiestoQueSeEntinta). Lo
     que va entre asteriscos en content.js es un <mark>: el bloque negro. */
  function manifiestoHTML(texto) {
    var trozos = String(texto).split("*");
    var total = String(texto).replace(/\*/g, "").split(/\s+/).filter(Boolean).length;
    var n = 0;
    function palabras(t) {
      return t.split(/(\s+)/).map(function (w) {
        if (!w) return "";
        if (/^\s+$/.test(w)) return " ";
        return '<span class="w" style="--i:' + (n++ / total).toFixed(3) + '">' + esc(w) + "</span>";
      }).join("");
    }
    return '<p class="manifiesto">' + trozos.map(function (t, k) {
      if (k % 2 === 0) return palabras(t);
      var dentro = palabras(t);
      return '<mark style="--fin:' + ((n - 1) / total).toFixed(3) + '">' + dentro + "</mark>";
    }).join("") + "</p>";
  }

  function cifrasHTML(lista) {
    var G = S.studio.google || {};
    var datos = { nota: G.nota, resenas: G.resenas };
    return '<ul class="cifras" role="list">' + lista.map(function (c) {
      return '<li class="cifra">' +
        '<p class="cifra__num"><span class="cifra__final">' + esc(N.rellenar(c.cifra, datos)) + "</span></p>" +
        '<p class="cifra__txt">' + esc(N.rellenar(c.texto, datos)) + "</p>" +
      "</li>";
    }).join("") + "</ul>";
  }

  /* Debajo de un punto, los estilos o los servicios de los que habla. */
  function enlacesPunto(cual) {
    var lista = cual === "estilos"
      ? ESTILOS.map(function (e) { return { href: N.hrefPagina("tatuajes") + "#" + e.id, texto: e.nombre }; })
      : cual === "servicios"
        ? S.servicios.filter(function (sv) { return sv.pagina !== "tatuajes"; })
            .map(function (sv) { return { href: N.hrefPagina(sv.pagina), texto: sv.menu }; })
        : [];
    if (!lista.length) return "";
    return '<ul class="punto__enlaces" role="list">' + lista.map(function (x) {
      return '<li><a class="chip" href="' + esc(x.href) + '">' + esc(x.texto) + "</a></li>";
    }).join("") + "</ul>";
  }

  /* La imagen de un punto, por el `id` de una foto (de un trabajo, de un
     piercing o del local) o la clave de un vídeo (su primer fotograma). Es
     de adorno: lo que cuenta el punto está en su texto.                    */
  var FOTOS_TODAS = S.obras.concat(S.estudio.fotos || [])
    .concat([].concat.apply([], S.servicios.map(function (sv) { return sv.fotos || []; })));
  function fotoPunto(id) {
    var f = FOTOS_TODAS.filter(function (x) { return x.id === id && x.img; })[0];
    if (f) {
      var delLocal = (S.estudio.fotos || []).indexOf(f) > -1;
      return N.imgHTML({ base: f.img, tipo: delLocal ? "estudio" : "obra", alt: "", ratio: f.ratio, foco: f.foco,
                         sizes: "(min-width: 60rem) 36vw, 92vw" });
    }
    var v = S.videos && S.videos[id];
    return v ? '<img src="assets/vid/' + esc(v.base) + '-poster.webp" alt="" width="600" height="' +
      Math.round(600 / v.ratio) + '" loading="lazy" decoding="async">' : "";
  }

  /* El cuadro de un punto: de una a cuatro fotos (se reparten el sitio) o
     el cartel negro de WhatsApp.                                          */
  function cuadroPunto(x) {
    if (x.tarjeta === "whatsapp") {
      return '<div class="marco marco--wasap en-negro">' + N.BOCADILLO +
        '<p class="marco__numero num">' + esc(S.studio.whatsappVisible) + "</p>" +
        '<p class="etiqueta marco__nota"><span class="corchetes">' + esc(S.studio.cita) + "</span></p></div>";
    }
    var fotos = (x.fotos || []).map(fotoPunto).filter(Boolean).slice(0, 4);
    return '<div class="marco marco--' + fotos.length + '">' + fotos.map(function (h) {
      return '<span class="marco__foto">' + h + "</span>";
    }).join("") + "</div>";
  }

  /* Los puntos: en escritorio, un cuadro fijo a la izquierda con la imagen
     del punto que se está leyendo y los textos a la derecha, uno por
     pantalla; al llegar cada uno al centro, su imagen barre la anterior
     (puntosQueCambian). En el móvil, cada punto lleva su imagen encima.   */
  function puntosHTML(lista) {
    var n = lista.length, dos = function (k) { return String(k).padStart(2, "0"); };
    return '<div class="puntos">' +
      '<div class="puntos__visor" aria-hidden="true">' +
        lista.map(function (x, i) {
          return '<div class="puntos__cuadro"' + (i === 0 ? " data-activa" : "") + ">" + cuadroPunto(x) + "</div>";
        }).join("") +
        '<p class="puntos__contador etiqueta"><span data-contador>' + dos(1) + "</span> / " + dos(n) + "</p>" +
      "</div>" +
      '<ol class="puntos__lista" role="list">' + lista.map(function (x, i) {
        return '<li class="punto">' +
          '<div class="punto__marco" aria-hidden="true">' + cuadroPunto(x) + "</div>" +
          '<p class="etiqueta punto__num">' + dos(i + 1) + " / " + dos(n) + "</p>" +
          '<h3 class="d2 punto__titulo">' + esc(x.titulo) + "</h3>" +
          '<p class="lead punto__texto">' + esc(x.texto) + "</p>" +
          (x.enlaces ? enlacesPunto(x.enlaces) : "") +
        "</li>";
      }).join("") + "</ol>" +
    "</div>";
  }

  /* La frase final, en la banda negra: cada palabra en su caja, para
     subir desde abajo una detrás de otra (cierreQueSube).                 */
  function cierreHTML(frases) {
    var n = 0;
    var grande = String(frases[0] || "").split(/\s+/).filter(Boolean).map(function (w) {
      return '<span class="palabra"><span style="--n:' + (n++) + '">' + esc(w) + "</span></span>";
    }).join(" ");
    return '<div class="estudio__cierre en-negro" data-cierre>' +
      '<p class="estudio__grande">' + grande + "</p>" +
      (frases[1] ? '<p class="lead estudio__segunda">' + esc(frases[1]) + "</p>" : "") +
      '<p class="estudio__accion" data-cta>' +
        botonWasap(I.cita, S.studio.botonWhatsapp.mensaje, "btn--macizo btn--grande") + "</p>" +
      '<p class="sm estudio__directo">' + esc(E.directo) + "</p>" +
    "</div>";
  }

  /* El local por dentro: el vídeo va junto al manifiesto; las fotos que no
     salen ya en los puntos, en un mosaico desigual debajo. Una foto que
     falta es un hueco con su proporción.                                   */
  var fotosEstudio = S.estudio.fotos || [];
  var enPuntos = [].concat.apply([], (E.puntos || []).map(function (x) { return x.fotos || []; }));
  var fotosMosaico = fotosEstudio.filter(function (f) { return enPuntos.indexOf(f.id) === -1; });
  /* Sin ninguna foto todavía, un solo hueco en vez de uno por foto. */
  var mosaicoFotos = conFoto(fotosMosaico).length ? fotosMosaico
    : conFoto(fotosEstudio).length ? []
    : fotosEstudio.slice(0, 1).map(function (f) { return { id: f.id, ratio: f.ratio, pendiente: true }; });
  if ($("[data-inicio-estudio]")) N.grupos.estudio = conFoto(fotosEstudio).map(function (f) {
    return { id: f.id, img: f.img, alt: f.alt, ratio: f.ratio, titulo: f.titulo, tipo: "estudio" };
  });
  set("[data-inicio-estudio]",
    '<div class="estudio__intro">' +
      (E.manifiesto ? manifiestoHTML(E.manifiesto) : "") +
      (N.videoHTML(S.estudio.video) ? '<div class="estudio__video">' + N.videoHTML(S.estudio.video) + "</div>" : "") +
    "</div>" +
    (E.cifras && E.cifras.length ? cifrasHTML(E.cifras) : "") +
    (E.puntos && E.puntos.length ? puntosHTML(E.puntos) : "") +
    (mosaicoFotos.length ? '<div class="mosaico">' +
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
    "</div>" : "") +
    (E.cierre ? cierreHTML([].concat(E.cierre)) : ""));

  /* El manifiesto se entinta al leerlo: las palabras están en gris (el más
     claro que aún se lee bien a este tamaño, 3,2:1) y pasan a negro según
     el texto sube por la pantalla, de la primera a la última, como si se
     fuera leyendo. Las frases marcadas se tapan con su bloque negro cuando
     les llega el turno. Solo se mide mientras está en pantalla. Sin
     JavaScript o con «reducir movimiento», todo en negro desde el principio. */
  (function manifiestoQueSeEntinta() {
    var el = $(".manifiesto");
    if (!el || N.quieto() || !("IntersectionObserver" in window)) return;
    var marcas = $$("mark", el);
    var total = $$(".w", el).length;
    var dentro = false, pidiendo = false;
    el.setAttribute("data-anim", "");
    function medir() {
      pidiendo = false;
      var r = el.getBoundingClientRect(), h = window.innerHeight;
      var empieza = h * 0.88, acaba = h * 0.42;
      var p = (empieza - r.top) / (r.height + empieza - acaba);
      p = Math.min(1, Math.max(0, p));
      /* Hasta 1,2: la última palabra también termina de entintarse. */
      el.style.setProperty("--p", (p * 1.2).toFixed(3));
      marcas.forEach(function (m) {
        var fin = parseFloat(m.style.getPropertyValue("--fin")) || 0;
        m.toggleAttribute("data-lleno", p * 1.2 >= fin + 0.12);
      });
    }
    function pedir() { if (!pidiendo) { pidiendo = true; requestAnimationFrame(medir); } }
    new IntersectionObserver(function (e) {
      dentro = e[0].isIntersecting;
      if (dentro) pedir();
    }, { rootMargin: "10% 0px" }).observe(el);
    window.addEventListener("scroll", function () { if (dentro) pedir(); }, { passive: true });
    window.addEventListener("resize", function () { if (dentro) pedir(); });
    medir();
  })();

  /* Las cifras cuentan desde cero al aparecer, una vez. La cifra de verdad
     está siempre en su sitio (y es lo que lee el lector de pantalla): el
     contador va encima, en una capa que se quita al terminar, así el ancho
     no cambia mientras cuenta.                                            */
  (function cifrasQueCuentan() {
    var lista = $(".cifras");
    if (!lista || N.quieto() || !("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      obs.disconnect();
      lista.setAttribute("data-contando", "");
      var cuentas = $$(".cifra__final", lista).map(function (f) {
        var t = f.textContent, m = /(\d+)(?:,(\d+))?/.exec(t);
        if (!m) return null;
        var decimales = m[2] ? m[2].length : 0;
        var valor = parseFloat(m[1] + (m[2] ? "." + m[2] : ""));
        var c = document.createElement("span");
        c.className = "cifra__contador";
        c.setAttribute("aria-hidden", "true");
        f.parentNode.appendChild(c);
        return { c: c, antes: t.slice(0, m.index), despues: t.slice(m.index + m[0].length), valor: valor, dec: decimales };
      }).filter(Boolean);
      var t0 = performance.now(), DURA = 1400;
      (function paso(ahora) {
        var x = Math.min(1, (ahora - t0) / DURA);
        var suave = 1 - Math.pow(1 - x, 3);
        cuentas.forEach(function (k) {
          var v = (k.valor * suave).toFixed(k.dec).replace(".", ",");
          k.c.textContent = k.antes + v + k.despues;
        });
        if (x < 1) requestAnimationFrame(paso);
        else {
          cuentas.forEach(function (k) { k.c.remove(); });
          lista.removeAttribute("data-contando");
        }
      })(t0);
    }, { threshold: 0.5 });
    obs.observe(lista);
  })();

  /* Los puntos, al leerlos. En escritorio, el punto que pasa por el centro
     de la pantalla pone su imagen en el cuadro fijo: la nueva barre a la
     anterior de abajo arriba, y la de antes se queda debajo hasta que la
     tapa (data-antes). Cada punto, además, entra al llegar: su imagen se
     abre (en el móvil) y el texto sube detrás, una vez.                    */
  (function puntosQueCambian() {
    var caja = $(".puntos");
    if (!caja || !("IntersectionObserver" in window)) return;
    var cuadros = $$(".puntos__cuadro", caja), items = $$(".punto", caja);
    var contador = $("[data-contador]", caja);
    var activo = 0, espera = null;
    function activar(i) {
      if (i === activo || !cuadros[i]) return;
      var viejo = cuadros[activo];
      cuadros.forEach(function (c) { c.removeAttribute("data-antes"); });
      viejo.removeAttribute("data-activa");
      viejo.setAttribute("data-antes", "");
      cuadros[i].setAttribute("data-activa", "");
      if (contador) contador.textContent = String(i + 1).padStart(2, "0");
      activo = i;
      clearTimeout(espera);
      espera = setTimeout(function () { viejo.removeAttribute("data-antes"); }, 900);
    }
    /* Las fotos de los cuadros que esperan están recortadas del todo y el
       navegador no las pide hasta que se destapan: la nueva entraría en
       gris. Se piden todas cuando la sección se acerca, no antes.          */
    var cerca = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      cerca.disconnect();
      $$(".puntos__visor img", caja).forEach(function (img) { img.loading = "eager"; });
    }, { rootMargin: "100% 0px" });
    cerca.observe(caja);
    var centro = new IntersectionObserver(function (e) {
      e.forEach(function (x) { if (x.isIntersecting) activar(items.indexOf(x.target)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach(function (it) { centro.observe(it); });
    if (N.quieto()) return;
    caja.setAttribute("data-anim", "");
    var entrada = new IntersectionObserver(function (e) {
      e.forEach(function (x) {
        if (!x.isIntersecting) return;
        x.target.setAttribute("data-visto", "");
        entrada.unobserve(x.target);
      });
    }, { rootMargin: "0px 0px -15% 0px" });
    items.forEach(function (it) { entrada.observe(it); });
  })();

  /* La frase final sube palabra a palabra cuando la banda llega a la
     pantalla, una vez.                                                    */
  (function cierreQueSube() {
    var el = $("[data-cierre]");
    if (!el || N.quieto() || !("IntersectionObserver" in window)) return;
    el.setAttribute("data-anim", "");
    var obs = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      el.setAttribute("data-visto", "");
      obs.disconnect();
    }, { threshold: 0.35 });
    obs.observe(el);
  })();

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
      document.documentElement.setAttribute("data-galeria-abierta", "");
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
      document.documentElement.removeAttribute("data-galeria-abierta");
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
      document.documentElement.removeAttribute("data-galeria-abierta");
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
    pintar(host, '<ol class="opiniones" role="list">' + lista.map(function (o, i) {
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
          '<span class="visually-hidden"> (se abre en Google Maps)</span></a></p>' : ""));
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
          '<dd><a class="num" href="' + esc(N.wasapURL(S.studio.botonWhatsapp.mensaje, S.studio.whatsapp)) +
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
        '<p class="lead scab__entradilla' + (SV.cuerpo ? " scab__lema" : "") + '">' + esc(SV.entradilla) + "</p>" +
        textoServicio(SV) +
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
    if (mediaNueva !== mediaPrevia && imgPrevia && imgNueva &&
        imgPrevia.getAttribute("srcset") === imgNueva.getAttribute("srcset")) {
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

    /* Fotos de la página (piercing, láser, micropigmentación). */
    /* Sin ninguna foto todavía, la sección no sale: el botón de «ver
       trabajos» de la cabecera tampoco.                                     */
    if (SV.pagina !== "tatuajes") {
      N.grupos[SV.pagina] = fotosSV;
      var tit = SV.fotosTitulo || T.servicio.fotos;
      var seccionFotos = set("[data-servicio-fotos]", fotosSV.length
        ? '<header class="cab"><p class="etiqueta corchetes">' + esc(tit.etiqueta) + "</p>" +
            '<h2 class="d2" id="t-fotos">' + esc(tit.titular) + "</h2></header>" +
          '<div class="carrete-marco">' + carreteHTML({
            id: SV.pagina, nombre: tit.etiqueta, obras: fotosSV, grupo: SV.pagina,
            fin: finHTML(SV.etiqueta, T.servicio.finTitular, T.servicio.finTexto,
                         botonWasap(SV.boton, SV.mensaje, "btn--macizo"))
          }) + "</div>"
        : "");
      if (seccionFotos) seccionFotos.hidden = !fotosSV.length;
    }

    set("[data-servicio-preguntas]", SV.preguntas && SV.preguntas.length
      ? '<header class="cab"><p class="etiqueta corchetes">' + esc(T.servicio.preguntas.etiqueta) + "</p>" +
          '<h2 class="d2" id="t-preguntas">' + esc(T.servicio.preguntas.titular) + "</h2></header>" +
        faqHTML(SV.preguntas) + guiaEnlace(SV)
      : "");
  }

  /* El texto de un servicio que se cuenta con más de una línea (el láser,
     con el de Origen Láser): sus párrafos, el remate y la firma, con el
     Instagram de quien firma.                                              */
  function textoServicio(sv) {
    if (!sv.cuerpo) return "";
    var quien = sv.firmaArtista ? N.artistaPor(sv.firmaArtista) : null;
    return (sv.cuerpo || []).map(function (t) { return '<p class="scab__parrafo">' + esc(t) + "</p>"; }).join("") +
      (sv.remate ? '<p class="scab__remate">' + esc(sv.remate) + "</p>" : "") +
      (sv.firma
        ? '<p class="scab__firma etiqueta">' + esc(sv.firma) +
            (quien && quien.instagram
              ? ' <a class="scab__insta" href="' + esc(N.instaURL(quien.instagram)) + '" rel="noopener">@' +
                  esc(quien.instagram) + '<span class="visually-hidden"> (Instagram)</span></a>'
              : "") + "</p>"
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

  /* Los artistas de un estilo, en el orden en que salen sus trabajos. */
  function artistasDe(obras) {
    var vistos = [];
    obras.forEach(function (o) { if (o.artista && vistos.indexOf(o.artista) === -1) vistos.push(o.artista); });
    return vistos.map(N.artistaPor).filter(Boolean);
  }

  /* «Ezel y Maou», «Ana, Ezel y Maou». */
  function yLista(partes) {
    return partes.length < 2 ? partes.join("") : partes.slice(0, -1).join(", ") + " y " + partes[partes.length - 1];
  }

  /* EL CARRETE: los trabajos de un estilo en fila, enteros, a la misma
     altura y cada uno con su proporción (no se recorta ninguno). Se pasan
     de lado con el dedo, el trackpad, arrastrando con el ratón o con las
     flechas, y la fila sale de la columna hasta el borde de la pantalla:
     lo que asoma a la derecha dice que hay más. Así cada estilo ocupa una
     pantalla, no una pared de miniaturas.
     Sin JavaScript es una fila con scroll lateral, sin mandos.
     Al final, un bloque negro con el paso a WhatsApp.                       */
  /* `c`: id y nombre de la fila, sus obras, el grupo del visor, el botón
     de arriba (`accion`), el bloque del final (`fin`, ya en HTML) y si se
     puede elegir artista (`filtro`).                                       */
  function carreteHTML(c) {
    var obras = c.obras, grupo = c.grupo;
    var artistas = c.filtro ? artistasDe(obras) : [];
    var items = obras.map(function (p, i) {
      /* Se revelan al llegar solo las que se ven al bajar hasta la fila;
         las de más a la derecha ya entran con el propio scroll lateral. */
      var revelar = i < 4 ? ' data-revelar data-revelar-orden="' + i + '"' : "";
      if (p.video) {
        var v = S.videos[p.video];
        return '<li class="carrete__item carrete__item--video" id="obra-' + esc(p.id) + '"' +
          ' data-artista="' + esc(p.artista || "") + '" style="--r:' + v.ratio + '">' +
          N.videoHTML(p.video) + pieFoto({ artista: p.artista, titulo: p.titulo }) + "</li>";
      }
      return '<li class="carrete__item" id="obra-' + esc(p.id) + '" data-artista="' + esc(p.artista || "") + '"' +
        ' style="--r:' + p.ratio + '">' +
        '<button class="rejilla__boton" type="button" data-abrir="' + esc(p.id) + '" data-grupo="' + esc(grupo) + '">' +
          '<span class="rejilla__lamina carrete__lamina"' + revelar + ">" +
            N.imgHTML({
              base: p.img, tipo: "obra", alt: p.alt, ratio: p.ratio, clase: "carrete__img",
              sizes: "(min-width: 60rem) 34rem, 80vw"
            }) +
          "</span>" +
        "</button>" + pieFoto(p) + "</li>";
    }).join("");

    var fin = '<li class="carrete__item carrete__fin en-negro" style="--r:0.62">' + c.fin + "</li>";

    /* Elegir artista: solo si en el estilo hay más de uno. */
    var filtro = artistas.length > 1
      ? '<div class="carrete__filtro" role="group" aria-label="' + esc(TT.filtrar + " " + c.nombre) + '">' +
          [{ slug: "", nombre: TT.todos, n: obras.length }].concat(artistas.map(function (a) {
            return { slug: a.slug, nombre: a.nombre, n: obras.filter(function (o) { return o.artista === a.slug; }).length };
          })).map(function (x, k) {
            return '<button class="carrete__chip" type="button" data-filtro="' + esc(x.slug) + '"' +
              ' aria-pressed="' + (k === 0) + '">' + esc(x.nombre) +
              ' <span class="carrete__chip-n num">' + x.n + "</span></button>";
          }).join("") +
        "</div>"
      : "";

    return '<div class="carrete" data-carrete="' + esc(c.id) + '" data-grupo="' + esc(grupo) + '">' +
      filtro + (c.accion || "") +
      '<ul class="carrete__pista" role="list" aria-label="' + esc(c.nombre) + '">' + items + fin + "</ul>" +
      '<div class="carrete__mandos">' +
        '<div class="carrete__barra" aria-hidden="true"><span class="carrete__avance"></span></div>' +
        '<p class="carrete__pos etiqueta num" aria-hidden="true">' +
          '<span data-carrete-pos>01</span> / <span data-carrete-total>' + String(obras.length).padStart(2, "0") + "</span></p>" +
        '<button class="carrete__flecha carrete__flecha--atras" type="button" data-paso="-1" aria-label="' + esc(TT.anteriores) + '">' +
          '<i class="flecha" aria-hidden="true"></i></button>' +
        '<button class="carrete__flecha" type="button" data-paso="1" aria-label="' + esc(TT.siguientes) + '">' +
          '<i class="flecha" aria-hidden="true"></i></button>' +
      "</div>" +
      '<p class="visually-hidden" aria-live="polite" data-carrete-aviso></p>' +
    "</div>";
  }

  /* El bloque negro del final de la fila. */
  function finHTML(etiqueta, titular, texto, boton) {
    return '<p class="etiqueta corchetes">' + esc(etiqueta) + "</p>" +
      '<p class="carrete__fin-titular">' + esc(titular) + "</p>" +
      '<p class="carrete__fin-texto">' + esc(texto) + "</p>" +
      '<p class="carrete__fin-accion" data-carrete-cita>' + boton + "</p>";
  }

  /* Lo que hace del carrete algo más que una fila con scroll: mandos,
     arrastre con ratón, avance, filtro por artista y el cursor que dice
     qué pasa si pulsas. Todo es mejora: sin esto, la fila se sigue pasando
     con el dedo o el trackpad y cada foto se abre igual.                   */
  $$("[data-carrete]").forEach(function (caja) {
    var pista = $(".carrete__pista", caja);
    var avance = $(".carrete__avance", caja);
    var pos = $("[data-carrete-pos]", caja);
    var total = $("[data-carrete-total]", caja);
    var aviso = $("[data-carrete-aviso]", caja);
    var flechas = $$("[data-paso]", caja);
    var grupo = caja.getAttribute("data-grupo");
    var estilo = N.estiloPor(caja.getAttribute("data-carrete"));
    var todas = N.grupos[grupo] || [];
    caja.setAttribute("data-listo", "");

    function visibles() {
      return $$(".carrete__item:not(.carrete__fin)", pista).filter(function (li) { return !li.hidden; });
    }
    var primeraPieza = $(".carrete__item", pista);
    function inicioDe(li) {
      /* Dónde empieza cada pieza dentro de la pista: la primera arranca
         alineada con la columna, y ese es el cero.                       */
      return li.offsetLeft - primeraPieza.offsetLeft;
    }

    /* La barra: el trozo negro es lo que se ve de la fila, y se mueve con
       ella. El contador, la primera pieza que asoma entera.              */
    var pidiendo = false;
    function pintar() {
      pidiendo = false;
      var sw = pista.scrollWidth, cw = pista.clientWidth, x = pista.scrollLeft;
      var parte = sw > 0 ? Math.min(1, cw / sw) : 1;
      avance.style.width = (parte * 100) + "%";
      avance.style.transform = "translateX(" + (sw > cw ? (x / (sw - cw)) * (1 / parte - 1) * 100 : 0) + "%)";
      var lis = visibles(), primera = 0;
      for (var i = 0; i < lis.length; i++) {
        if (inicioDe(lis[i]) + lis[i].offsetWidth * 0.5 > x) { primera = i; break; }
        primera = i;
      }
      pos.textContent = String(Math.min(primera + 1, lis.length)).padStart(2, "0");
      flechas[0].setAttribute("aria-disabled", String(x <= 2));
      flechas[1].setAttribute("aria-disabled", String(x >= sw - cw - 2));
    }
    function pedir() { if (!pidiendo) { pidiendo = true; requestAnimationFrame(pintar); cargarCerca(); } }
    pista.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    /* La primera medida, en el fotograma siguiente: medir siete filas
       mientras la página aún se está montando obligaría a maquetarla
       antes de tiempo, una vez por fila.                               */
    pedir();

    /* El navegador no adelanta las fotos «lazy» que esperan a la derecha
       de una fila con scroll: solo las pide al asomar, y asomarían en
       blanco. Mientras la fila está cerca de la pantalla, se piden las de
       la pantalla siguiente antes de llegar.                              */
    var cerca = false;
    function cargarCerca() {
      if (!cerca) return;
      var hasta = pista.scrollLeft + pista.clientWidth * 2.2;
      $$("img[loading='lazy']", pista).forEach(function (img) {
        if (img.closest(".carrete__item").offsetLeft < hasta) img.loading = "eager";
      });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        cerca = e[0].isIntersecting;
        cargarCerca();
      }, { rootMargin: "600px 0px" }).observe(pista);
    }

    /* Las flechas pasan una pantalla de piezas, y paran justo en el borde
       de una: nunca dejan una foto partida a la izquierda.               */
    flechas.forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("aria-disabled") === "true") return;
        var paso = Number(b.getAttribute("data-paso"));
        var x = pista.scrollLeft, ancho = pista.clientWidth * 0.8;
        var piezas = $$(".carrete__item", pista).filter(function (li) { return !li.hidden; });
        var destino = paso > 0 ? null : 0;
        piezas.forEach(function (li) {
          var a = inicioDe(li);
          if (paso > 0 && a > x + 4 && a <= x + ancho) destino = a;
          if (paso < 0 && a < x - 4 && a >= x - ancho - 1) destino = destino === 0 ? a : Math.min(destino, a);
        });
        if (destino === null) {   /* una pieza más ancha que el paso */
          var siguiente = piezas.filter(function (li) { return inicioDe(li) > x + 4; })[0];
          destino = siguiente ? inicioDe(siguiente) : pista.scrollWidth;
        }
        pista.scrollTo({ left: destino, behavior: N.quieto() ? "auto" : "smooth" });
      });
    });

    /* Con el teclado: las flechas del teclado van de una foto a la otra. */
    pista.addEventListener("keydown", function (ev) {
      if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
      var focos = $$(".carrete__item:not([hidden]) .rejilla__boton, .carrete__item:not([hidden]) .video__boton, .carrete__fin .btn", pista);
      var i = focos.indexOf(document.activeElement);
      if (i === -1) return;
      var j = i + (ev.key === "ArrowRight" ? 1 : -1);
      if (focos[j]) { ev.preventDefault(); focos[j].focus({ preventScroll: true }); traer(focos[j]); }
    });
    /* Lo que recibe el foco (con el tabulador o con las flechas) se ve
       entero: si asoma a medias por un borde, la fila lo trae a su sitio. */
    function traer(el) {
      var li = el.closest(".carrete__item");
      if (!li) return;
      var q = pista.getBoundingClientRect(), r = li.getBoundingClientRect(), margen = primeraPieza.offsetLeft;
      if (r.left >= q.left + margen - 1 && r.right <= q.right - margen + 1) return;
      pista.scrollTo({ left: inicioDe(li), behavior: N.quieto() ? "auto" : "smooth" });
    }
    /* Solo con el teclado: un clic del ratón también da el foco, y a mitad
       de un arrastre la fila no debe recolocarse sola.                    */
    pista.addEventListener("focusin", function (ev) {
      var teclado = true;
      try { teclado = ev.target.matches(":focus-visible"); } catch (e) {}
      if (teclado && !arrastre) traer(ev.target);
    });

    /* Rueda y trackpad. El navegador da cada gesto entero al primer sitio
       que puede moverse en su dirección: con un trackpad, un gesto casi
       vertical lleva siempre algo de lateral, se lo quedaba la fila y la
       página no bajaba. Aquí se mira la intención del gesto en sus primeros
       píxeles: si es lateral, la fila se mueve sola, como siempre; si es
       vertical, baja la página, y lo poco de lateral que traiga no cuenta.
       La rueda de un ratón (vertical pura) no se toca: el navegador la
       mueve con su propio suavizado.                                      */
    var gesto = null;
    pista.addEventListener("wheel", function (ev) {
      if (ev.ctrlKey) return;   /* pellizco del trackpad: es zoom */
      var k = ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? window.innerHeight : 1;
      var dx = ev.deltaX * k, dy = ev.deltaY * k;
      if (!gesto || ev.timeStamp - gesto.t > 200) gesto = { eje: "", sx: 0, sy: 0 };
      gesto.t = ev.timeStamp;
      gesto.sx += Math.abs(dx);
      gesto.sy += Math.abs(dy);
      if (!gesto.eje && gesto.sx + gesto.sy > 10) gesto.eje = gesto.sx > gesto.sy * 1.2 ? "x" : "y";
      if (gesto.eje === "x") return;
      if (gesto.eje === "y" && !dx) return;
      ev.preventDefault();
      if (!gesto.eje) pista.scrollLeft += dx;   /* aún sin decidir: cada uno lo suyo */
      window.scrollBy(0, dy);
    }, { passive: false });

    /* Arrastrar con el ratón, con su inercia al soltar. El dedo y el
       trackpad ya lo hacen solos; esto es solo para el ratón. Si se ha
       arrastrado, el clic que viene después no abre la foto.            */
    var arrastre = null, huboArrastre = false, inercia = 0;
    pista.addEventListener("pointerdown", function (ev) {
      if (ev.pointerType !== "mouse" || ev.button !== 0) return;
      if (ev.target.closest(".video__boton, a")) return;
      cancelAnimationFrame(inercia);
      arrastre = { x: ev.clientX, izq: pista.scrollLeft, t: performance.now(), v: 0, ultimoX: ev.clientX, movido: false };
      window.addEventListener("pointermove", mover);
      window.addEventListener("pointerup", soltar);
      window.addEventListener("pointercancel", soltar);
    });
    function mover(ev) {
      if (!arrastre) return;
      var dx = ev.clientX - arrastre.x;
      if (!arrastre.movido && Math.abs(dx) < 6) return;
      if (!arrastre.movido) { arrastre.movido = true; caja.setAttribute("data-arrastrando", ""); }
      var ahora = performance.now(), dt = Math.max(1, ahora - arrastre.t);
      arrastre.v = (ev.clientX - arrastre.ultimoX) / dt;
      arrastre.t = ahora; arrastre.ultimoX = ev.clientX;
      pista.scrollLeft = arrastre.izq - dx;
    }
    function soltar() {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
      if (!arrastre) return;
      var a = arrastre; arrastre = null;
      caja.removeAttribute("data-arrastrando");
      if (!a.movido) return;
      huboArrastre = true;
      setTimeout(function () { huboArrastre = false; }, 0);
      if (N.quieto()) return;
      var v = -a.v * 16;   /* px por fotograma */
      (function paso() {
        if (Math.abs(v) < 0.4) return;
        pista.scrollLeft += v;
        v *= 0.92;
        inercia = requestAnimationFrame(paso);
      })();
    }
    pista.addEventListener("click", function (ev) {
      if (huboArrastre) { ev.stopPropagation(); ev.preventDefault(); }
    }, true);
    pista.addEventListener("dragstart", function (ev) { ev.preventDefault(); });

    /* Elegir artista: se quedan sus trabajos, el visor pasa solo por los
       suyos y el bloque final pide cita con esa persona.                 */
    var chips = $$("[data-filtro]", caja);
    var cita = $("[data-carrete-cita]", caja);
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var slug = chip.getAttribute("data-filtro");
        if (chip.getAttribute("aria-pressed") === "true") return;
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        var lis = $$(".carrete__item:not(.carrete__fin)", pista);
        lis.forEach(function (li) { li.hidden = !!slug && li.getAttribute("data-artista") !== slug; });
        N.grupos[grupo] = todas.filter(function (o) { return !slug || o.artista === slug; });
        var a = slug ? N.artistaPor(slug) : null;
        var n = visibles().length;
        total.textContent = String(n).padStart(2, "0");
        if (cita) {
          cita.innerHTML = a
            ? botonWasap(N.rellenar(TT.botonArtista, { artista: a.nombre }),
                         N.rellenar(TT.mensajeArtista, { estilo: estilo.nombre.toLowerCase(), artista: a.nombre }),
                         "btn--macizo", ": " + estilo.nombre)
            : botonWasap(TT.botonEstilo, N.rellenar(TT.mensajeEstilo, { estilo: estilo.nombre.toLowerCase() }),
                         "btn--macizo", ": " + estilo.nombre);
        }
        aviso.textContent = (a ? a.nombre : TT.todos) + ": " + N.rellenar(TT.trabajos, { n: n });
        pista.scrollTo({ left: 0, behavior: "auto" });
        N.revelar();
        /* Las que quedan entran en fila, una detrás de otra. */
        if (!N.quieto() && pista.animate) {
          visibles().concat($$(".carrete__fin", pista)).slice(0, 6).forEach(function (li, i) {
            li.animate([{ opacity: 0, transform: "translateX(2.5rem)" }, { opacity: 1, transform: "none" }],
                       { duration: 520, delay: i * 55, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
          });
        }
        pintar();
      });
    });

    /* El cursor de la fila, solo con ratón: un bloque negro pequeño que
       dice «Ver» sobre una foto y «Arrastra» entre ellas. Es decorativo:
       el lector de pantalla no lo oye y el puntero de verdad sigue ahí.  */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var cursor = document.createElement("span");
      cursor.className = "carrete__cursor etiqueta";
      cursor.setAttribute("aria-hidden", "true");
      caja.appendChild(cursor);
      var cx = 0, cy = 0, tx = 0, ty = 0, moviendo = 0;
      function seguir() {
        cx += (tx - cx) * (N.quieto() ? 1 : 0.28);
        cy += (ty - cy) * (N.quieto() ? 1 : 0.28);
        cursor.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
        moviendo = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(seguir) : 0;
      }
      pista.addEventListener("pointermove", function (ev) {
        if (ev.pointerType !== "mouse") return;
        var r = caja.getBoundingClientRect();
        tx = ev.clientX - r.left; ty = ev.clientY - r.top;
        if (!cursor.hasAttribute("data-visible")) { cx = tx; cy = ty; }
        var sobre = ev.target.closest(".rejilla__boton");
        var control = ev.target.closest(".video__boton, a, .carrete__fin");
        cursor.textContent = arrastre && arrastre.movido ? TT.cursorArrastra : sobre ? TT.cursorVer : TT.cursorArrastra;
        cursor.toggleAttribute("data-visible", !control);
        if (!moviendo) moviendo = requestAnimationFrame(seguir);
      });
      pista.addEventListener("pointerleave", function () { cursor.removeAttribute("data-visible"); });
    }
  });

  /* ============================================================================
     TATUAJES: UNA CARPETA POR ESTILO
     Como los álbumes del móvil. Primero las carpetas, cada una con su
     portada y cuántas fotos tiene. Al entrar, todas sus fotos en cuadrícula,
     cuadradas y pegadas; al tocar una, el visor (visor.js), que deja pasar
     de una a otra deslizando. «‹ Estilos» vuelve a las carpetas.
     Cada carpeta tiene su dirección (tatuajes#anime) y el «atrás» del
     navegador vuelve a las carpetas. Sin JavaScript todo está en la página,
     una carpeta detrás de otra, y los enlaces son anclas.
     ============================================================================ */

  var GA = TT.galeria;

  function miniaturaHTML(p, grupo) {
    return '<li class="album__item" id="obra-' + esc(p.id) + '" data-artista="' + esc(p.artista || "") + '">' +
      '<button class="album__foto" type="button" data-abrir="' + esc(p.id) + '" data-grupo="' + esc(grupo) + '">' +
        N.imgHTML({ base: p.img, tipo: "obra", alt: p.alt, ratio: p.ratio, foco: p.foco, anchos: [380, 600],
                    sizes: "(min-width: 60rem) 15vw, (min-width: 36rem) 25vw, 34vw" }) +
      "</button></li>";
  }

  function citaEstilo(e, a, clase) {
    return a
      ? botonWasap(N.rellenar(TT.botonArtista, { artista: a.nombre }),
                   N.rellenar(TT.mensajeArtista, { estilo: e.nombre.toLowerCase(), artista: a.nombre }), clase, ": " + e.nombre)
      : botonWasap(TT.botonEstilo, N.rellenar(TT.mensajeEstilo, { estilo: e.nombre.toLowerCase() }), clase, ": " + e.nombre);
  }

  set("[data-galeria]", (function () {
    var carpetas = ESTILOS.map(function (e) {
      var obras = conFoto(obrasDe(e));
      var portada = (e.portada && obras.filter(function (o) { return o.id === e.portada; })[0]) || obras[0];
      var n = N.rellenar(GA.fotos, { n: obras.length });
      return '<li class="carpetas__item">' +
        '<a class="carpeta" href="#' + esc(e.id) + '" data-carpeta="' + esc(e.id) + '"' +
          ' aria-label="' + esc(N.rellenar(GA.abrir, { estilo: e.nombre, n: obras.length })) + '">' +
          '<span class="carpeta__portada">' +
            (portada
              ? N.imgHTML({ base: portada.img, tipo: "obra", alt: "", ratio: portada.ratio, foco: portada.foco,
                            anchos: [380, 600, 900], sizes: "(min-width: 60rem) 22vw, 45vw" })
              : "") +
          "</span>" +
          '<span class="carpeta__nombre">' + esc(e.nombre) + "</span>" +
          '<span class="carpeta__n etiqueta num">' + esc(n) + "</span>" +
        "</a></li>";
    }).join("");

    var albumes = ESTILOS.map(function (e) {
      var obras = conFoto(obrasDe(e));
      var grupo = "estilo:" + e.id;
      N.grupos[grupo] = obras;
      var artistas = artistasDe(obras);
      var n = N.rellenar(GA.fotos, { n: obras.length });
      var filtro = artistas.length > 1
        ? '<div class="album__filtro" role="group" aria-label="' + esc(TT.filtrar + " " + e.nombre) + '">' +
            [{ slug: "", nombre: TT.todos, n: obras.length }].concat(artistas.map(function (a) {
              return { slug: a.slug, nombre: a.nombre, n: obras.filter(function (o) { return o.artista === a.slug; }).length };
            })).map(function (x, k) {
              return '<button class="carrete__chip" type="button" data-filtro="' + esc(x.slug) + '" aria-pressed="' + (k === 0) + '">' +
                esc(x.nombre) + ' <span class="carrete__chip-n num">' + x.n + "</span></button>";
            }).join("") +
          "</div>"
        : "";
      return '<section class="album" id="' + esc(e.id) + '" aria-labelledby="t-' + esc(e.id) + '" data-album="' + esc(e.id) + '">' +
        '<div class="album__barra">' +
          '<a class="album__volver" href="#estilos" data-volver><i class="flecha" aria-hidden="true"></i><span>' + esc(GA.volver) + "</span></a>" +
          '<p class="album__corto" aria-hidden="true">' + esc(e.nombre) + "</p>" +
          '<p class="album__n etiqueta num" data-album-n>' + esc(n) + "</p>" +
        "</div>" +
        '<header class="album__cab">' +
          '<h2 class="d1 album__nombre" id="t-' + esc(e.id) + '" style="--letras:' + palabraMasLarga(e.nombre) + '">' + esc(e.nombre) + "</h2>" +
          '<div class="album__texto">' +
            (e.descripcion ? '<p class="album__desc">' + esc(e.descripcion) + "</p>" : "") +
            (artistas.length
              ? '<p class="estilo__artistas">' + esc(TT.por) + " " +
                  yLista(artistas.map(function (a) { return artistaHTML(a, "estilo__artista"); })) + "</p>"
              : "") +
          "</div>" +
          '<div class="album__acciones">' + filtro +
            '<p class="estilo__accion">' + citaEstilo(e, null, "") + "</p></div>" +
        "</header>" +
        (obras.length
          ? '<ul class="album__rejilla" role="list" aria-label="' + esc(e.nombre) + '">' +
              obras.map(function (p) { return miniaturaHTML(p, grupo); }).join("") + "</ul>" +
            '<p class="album__total etiqueta num" data-album-total>' + esc(n) + "</p>"
          : pendienteHTML(e.nombre, TT.pendiente)) +
        '<div class="album__fin en-negro">' +
          '<p class="etiqueta corchetes">' + esc(e.nombre) + "</p>" +
          '<p class="carrete__fin-titular">' + esc(TT.finTitular) + "</p>" +
          '<p class="carrete__fin-texto">' + esc(TT.finTexto) + "</p>" +
          '<p class="carrete__fin-accion" data-album-cita>' + citaEstilo(e, null, "btn--macizo") + "</p>" +
        "</div>" +
      "</section>";
    }).join("");

    return '<section class="carpetas" id="estilos" aria-labelledby="t-estilos">' +
        '<header class="cab carpetas__cab"><p class="etiqueta corchetes">' + esc(GA.etiqueta) + "</p>" +
          '<h2 class="d2" id="t-estilos">' + esc(GA.titular) + "</h2>" +
          (GA.entradilla ? '<p class="lead">' + esc(GA.entradilla) + "</p>" : "") + "</header>" +
        '<ul class="carpetas__lista" role="list">' + carpetas + "</ul>" +
      "</section>" + albumes;
  })());

  /* La galería en marcha: ir y volver de las carpetas, el título pequeño en
     la barra al bajar, y elegir artista dentro de una carpeta.            */
  (function galeria() {
    var gal = $("[data-galeria]");
    if (!gal) return;
    var carpetas = $(".carpetas", gal);
    var albumes = $$(".album", gal);
    var abierto = null;

    function albumDe(hash) {
      var id = decodeURIComponent(String(hash || "").replace(/^#/, ""));
      if (!id) return null;
      var m = /^obra-(.+)$/.exec(id);
      if (m) {
        var li = document.getElementById(id);
        var sec = li && li.closest(".album");
        return sec ? sec.id : null;
      }
      if (albumes.some(function (a) { return a.id === id; })) return id;
      /* Direcciones de listas viejas (#black-and-grey, #dotwork). */
      var e = S.estilos.filter(function (x) { return (x.antes || []).indexOf(id) > -1; })[0];
      return e && albumes.some(function (a) { return a.id === e.id; }) ? e.id : null;
    }

    /* El visor pregunta a qué dirección volver al cerrar: la de la carpeta. */
    N.hashBase = function () { return abierto ? "#" + abierto : ""; };

    /* Entrar y salir por el mismo camino: la carpeta entra desde la
       derecha y, al volver, las carpetas regresan desde la izquierda.     */
    function animar(el, desde) {
      if (N.quieto() || !el.animate) return;
      el.animate([{ opacity: 0, transform: "translateX(" + desde + ")" }, { opacity: 1, transform: "none" }],
                 { duration: 420, easing: "cubic-bezier(0.32, 0.72, 0, 1)" });
    }

    function mostrar(id, conAnimacion) {
      var antes = abierto;
      abierto = id;
      gal.setAttribute("data-vista", id ? "album" : "carpetas");
      albumes.forEach(function (a) { a.toggleAttribute("data-abierto", a.id === id); });
      var tope = gal.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
      if (id) {
        var sec = document.getElementById(id);
        if (antes !== id) {
          window.scrollTo(0, Math.max(0, tope));
          if (conAnimacion) {
            animar(sec, "8%");
            /* Las primeras fotos entran en cascada, como al abrir un álbum. */
            if (!N.quieto()) $$(".album__item", sec).slice(0, 18).forEach(function (li, i) {
              li.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "none" }],
                         { duration: 380, delay: 60 + i * 14, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
            });
          }
        }
      } else if (antes) {
        /* De vuelta, la carpeta de la que se venía, a la vista. */
        var c = $('[data-carpeta="' + CSS.escape(antes) + '"]', gal);
        window.scrollTo(0, Math.max(0, tope));
        if (c && c.getBoundingClientRect().bottom > innerHeight) c.scrollIntoView({ block: "center" });
        if (conAnimacion) animar(carpetas, "-8%");
        if (c) c.focus({ preventScroll: true });
      }
    }

    gal.addEventListener("click", function (ev) {
      var a = ev.target.closest("[data-carpeta]");
      if (a) {
        ev.preventDefault();
        var id = a.getAttribute("data-carpeta");
        history.pushState({ carpeta: id }, "", location.pathname + location.search + "#" + id);
        mostrar(id, true);
        var t = document.getElementById("t-" + id);
        if (t) { t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
        return;
      }
      if (ev.target.closest("[data-volver]")) {
        ev.preventDefault();
        /* Si se entró desde las carpetas, «atrás» deshace ese paso; si se
           llegó con un enlace directo, se va a las carpetas sin más.       */
        if (history.state && history.state.carpeta) history.back();
        else { history.replaceState(null, "", location.pathname + location.search + "#estilos"); mostrar(null, true); }
      }
    });

    window.addEventListener("popstate", function () {
      if (history.state && history.state.visor) return;
      mostrar(albumDe(location.hash), true);
    });
    window.addEventListener("hashchange", function () {
      var id = albumDe(location.hash);
      if (id !== abierto && !/^#obra-/.test(location.hash)) mostrar(id, false);
    });

    /* Al llegar: la carpeta de la dirección (o la de la foto enlazada). Una
       dirección vieja (#dotwork) se cambia por la de su carpeta.          */
    var pedida = decodeURIComponent(location.hash.slice(1));
    var inicial = albumDe(location.hash);
    if (inicial && pedida && !document.getElementById(pedida)) {
      history.replaceState(null, "", location.pathname + location.search + "#" + inicial);
    }
    mostrar(inicial, false);

    /* El título pequeño de la barra aparece cuando el grande se va arriba. */
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          var barra = x.target.closest(".album").querySelector(".album__barra");
          barra.toggleAttribute("data-compacta", !x.isIntersecting && x.boundingClientRect.top < 0);
        });
      }, { rootMargin: "-120px 0px 0px 0px" });
      $$(".album__nombre", gal).forEach(function (h) { obs.observe(h); });
    }

    /* Elegir artista: se quedan sus fotos, el visor pasa solo por ellas y
       el bloque final pide cita con esa persona.                          */
    albumes.forEach(function (sec) {
      var chips = $$("[data-filtro]", sec);
      if (!chips.length) return;
      var e = N.estiloPor(sec.id), grupo = "estilo:" + sec.id, todas = N.grupos[grupo];
      chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          if (chip.getAttribute("aria-pressed") === "true") return;
          var slug = chip.getAttribute("data-filtro");
          chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
          var lis = $$(".album__item", sec), vis = [];
          lis.forEach(function (li) {
            li.hidden = !!slug && li.getAttribute("data-artista") !== slug;
            if (!li.hidden) vis.push(li);
          });
          N.grupos[grupo] = todas.filter(function (o) { return !slug || o.artista === slug; });
          var a = slug ? N.artistaPor(slug) : null;
          var n = N.rellenar(GA.fotos, { n: vis.length });
          $("[data-album-total]", sec).textContent = n;
          $("[data-album-n]", sec).textContent = n;
          $("[data-album-cita]", sec).innerHTML = citaEstilo(e, a, "btn--macizo");
          if (!N.quieto()) vis.slice(0, 18).forEach(function (li, i) {
            li.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "none" }],
                       { duration: 340, delay: i * 14, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
          });
        });
      });
    });
  })();

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
     LEGAL · aviso legal, privacidad y cookies
     Las tres salen del mismo molde: un título, una entradilla y una lista de
     secciones. Los textos llevan huecos {titular}, {nif}… que se rellenan una
     vez en legal.datos. Un hueco vacío sale marcado y la página avisa de que
     es un borrador; con todo relleno, sale limpia.
     ============================================================================ */

  (function legal() {
    var host = $("[data-legal]");
    if (!host || !N.LEGAL) return;
    var LG = S.legal, P = N.LEGAL, X = LG.textos;

    function conHuecos(t) {
      return String(t).split(/(\{[a-z]+\})/).map(function (parte) {
        var m = /^\{([a-z]+)\}$/.exec(parte);
        if (!m) return esc(parte);
        var v = LG.datos[m[1]];
        return v ? esc(v) : '<mark class="hueco-legal">[' + esc(LG.huecos[m[1]] || m[1].toUpperCase()) + "]</mark>";
      }).join("");
    }

    var pendientes = N.legalPendiente();
    var otras = LG.paginas.filter(function (p) { return p.pagina !== P.pagina; });

    host.innerHTML =
      '<header class="legal__cab">' +
        '<p class="etiqueta corchetes">' + esc(P.etiqueta) + "</p>" +
        '<h1 class="d1 legal__h1" id="t-legal" style="--letras:' + palabraMasLarga(P.titular) + '">' + esc(P.titular) + "</h1>" +
        '<p class="lead">' + esc(P.entradilla) + "</p>" +
      "</header>" +
      (pendientes.length
        ? '<div class="legal__borrador en-negro" role="note"><p class="etiqueta corchetes">' + esc(X.borrador) + "</p>" +
            "<p>" + esc(X.borradorTexto) + "</p></div>"
        : "") +
      '<div class="legal__cuerpo">' + P.secciones.map(function (s, i) {
        return '<section class="legal__seccion" aria-labelledby="t-legal-' + (i + 1) + '">' +
          '<h2 class="d3 legal__titulo" id="t-legal-' + (i + 1) + '"><span class="legal__num num" aria-hidden="true">' +
            String(i + 1).padStart(2, "0") + "</span>" + esc(s.titulo) + "</h2>" +
          s.piezas.map(function (pz) {
            return typeof pz === "string"
              ? "<p>" + conHuecos(pz) + "</p>"
              : '<ul class="legal__lista">' + pz.lista.map(function (li) { return "<li>" + conHuecos(li) + "</li>"; }).join("") + "</ul>";
          }).join("") +
        "</section>";
      }).join("") + "</div>" +
      '<p class="legal__fecha etiqueta">' + conHuecos(X.actualizado) + "</p>" +
      '<nav class="legal__otras" aria-label="' + esc(X.otras) + '"><p class="etiqueta etiqueta--suave">' + esc(X.otras) + "</p><ul>" +
        otras.map(function (p) {
          return '<li><a class="enlace-flecha" href="' + esc(N.hrefPagina(p.pagina)) + '">' + esc(p.menu) +
            '<i class="flecha" aria-hidden="true"></i></a></li>';
        }).join("") + "</ul></nav>";
  })();

  /* ============================================================================
     INSTAGRAM · al final de todas las páginas
     El perfil del estudio en grande, que es lo que hay que recordar. Cada
     artista se enlaza desde sus fotos. La cuadrícula de trabajos es un guiño a la del
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
    host.innerHTML =
      '<div class="insta__texto">' +
        '<p class="etiqueta corchetes">' + esc(IG.etiqueta) + "</p>" +
        '<h2 class="insta__cuenta" id="t-insta">' +
          '<a href="' + esc(url) + '" rel="noopener">@' + esc(cuenta) +
            '<span class="visually-hidden"> (Instagram del estudio)</span></a></h2>' +
        '<p class="lead insta__entradilla">' + esc(IG.texto) + "</p>" +
        '<p class="insta__accion"><a class="btn btn--grande" href="' + esc(url) + '" rel="noopener">' +
          N.CAMARA + "<span>" + esc(IG.boton) + "</span></a></p>" +
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

  /* Las listas numeradas (el «paso a paso» de cada servicio y los puntos
     del estudio) entran fila a fila al llegar a ellas: el filete de cada
     fila se traza de izquierda a derecha, el número sube desde su línea
     base y el texto aparece detrás. Solo la primera vez. Sin JavaScript o
     con «reducir movimiento», están quietas y visibles: el estado de
     espera lo pone esto, no el CSS.                                       */
  (function pasosEnMovimiento() {
    var listas = $$(".pasos");
    if (!listas.length || N.quieto() || !("IntersectionObserver" in window)) return;
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
    listas.forEach(function (lista) {
      lista.setAttribute("data-pasos-anim", "");
      $$(".pasos__paso", lista).forEach(function (f) { obs.observe(f); });
    });
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
  N.ctas();
})();
