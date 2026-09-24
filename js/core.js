/* =============================================================================
   LOCO BLOW · NÚCLEO
   Lo que comparten las cinco páginas: imágenes responsive y huecos de foto,
   barra, pie, cabecera y datos estructurados de cada página, verificación de
   edad, botón de WhatsApp, vídeos y revelado.
   Se carga con `defer`, así que el DOM ya existe cuando corre.

   Cada página dice cuál es en <body data-pagina="…">: «inicio» o el
   `pagina` de su servicio en content.js («tatuajes», «laser»…).
   ========================================================================== */

(function () {
  "use strict";

  var S = window.STUDIO;
  if (!S) { console.error("Loco Blow: falta js/content.js"); return; }

  var PAGINA = document.body.getAttribute("data-pagina") || "inicio";
  /* El servicio de esta página, o null en el inicio. */
  var SERVICIO = S.servicios.filter(function (s) { return s.pagina === PAGINA; })[0] || null;
  /* El dominio sale de content.js, no de location.origin: si saliera de ahí,
     tools/sync-contenido.py congelaría en el código fuente la dirección del
     servidor local con el que se volcó la página.                          */
  var BASE = String(S.studio.web).replace(/\/+$/, "");

  /* --- utilidades ---------------------------------------------------------- */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Una sola fuente de verdad para "el usuario no quiere movimiento". Se
     consulta en vivo, no una vez al cargar: se puede cambiar sin recargar.   */
  var mqQuieto = window.matchMedia("(prefers-reduced-motion: reduce)");
  function quieto() { return mqQuieto.matches; }

  /* Mismos anchos que genera tools/fetch-images.py. Si cambian allí, cambian
     aquí: es la única duplicación del proyecto y está anotada a propósito.   */
  var ANCHOS = {
    obra:    [1500, 900, 720, 600, 380],
    estudio: [1400, 900, 560]
  };

  /* Devuelve el <img> completo. `ratio` evita el salto de layout: la caja
     reserva su altura antes de que la imagen llegue.                         */
  function imgHTML(o) {
    var anchos = ANCHOS[o.tipo] || ANCHOS.obra;
    var srcset = anchos.map(function (w) {
      return "assets/img/" + o.base + "-" + w + ".webp " + w + "w";
    }).join(", ");
    var menor = anchos[anchos.length - 1];
    var alto = o.ratio ? Math.round(1000 / o.ratio) : null;
    return '<img src="assets/img/' + o.base + "-" + menor + '.webp"' +
      ' srcset="' + srcset + '"' +
      ' sizes="' + (o.sizes || "100vw") + '"' +
      ' alt="' + esc(o.alt) + '"' +
      (alto ? ' width="1000" height="' + alto + '"' : "") +
      ' loading="' + (o.eager ? "eager" : "lazy") + '"' +
      ' decoding="' + (o.eager ? "sync" : "async") + '"' +
      (o.prioridad ? ' fetchpriority="high"' : "") +
      (o.foco ? ' style="object-position:' + esc(o.foco) + '"' : "") +
      (o.clase ? ' class="' + o.clase + '"' : "") + ">";
  }

  /* Hueco diseñado: lo que se ve mientras la foto original no ha llegado.
     Tiene la proporción de la foto que ocupará, así que al llegar no se
     mueve nada. No lleva texto alternativo porque no hay imagen: lo que dice
     se lee como texto normal.                                                */
  function huecoHTML(o) {
    return '<div class="hueco" style="--ratio:' + (o.ratio || 0.8) + '">' +
      '<span class="hueco__texto">' +
        '<span class="etiqueta">' + esc(o.que || "Foto") + "</span>" +
        (o.detalle ? '<span class="xs hueco__que">' + esc(o.detalle) + "</span>" : "") +
      "</span></div>";
  }

  /* Foto si la hay, hueco si no. Así content.js puede ir llenándose por
     partes y la página nunca enseña una imagen rota.                        */
  function fotoHTML(o) { return o.base ? imgHTML(o) : huecoHTML(o); }

  function artistaPor(slug) {
    for (var i = 0; i < S.artistas.length; i++) {
      if (S.artistas[i].slug === slug) return S.artistas[i];
    }
    return null;
  }
  function estiloPor(id) {
    for (var i = 0; i < S.estilos.length; i++) if (S.estilos[i].id === id) return S.estilos[i];
    return null;
  }

  /* Dirección de una página: «inicio» es la raíz. Sin .html: Vercel sirve
     /laser desde laser.html (cleanUrls), y en local lo hace
     tools/servidor.py igual.                                                */
  function hrefPagina(p) { return p === "inicio" ? "./" : p; }
  function urlPagina(p) { return BASE + "/" + (p === "inicio" ? "" : p); }

  /* «{estilo}» → su valor. Para los textos con hueco de content.js. */
  function rellenar(plantilla, datos) {
    return String(plantilla).replace(/\{(\w+)\}/g, function (m, k) {
      return datos[k] != null ? datos[k] : "";
    });
  }

  /* Enlace de WhatsApp con el mensaje ya escrito. Cuanto más concreto el
     mensaje, menos «hola» sueltos que contestar.                             */
  function wasapURL(mensaje) {
    return "https://wa.me/" + S.studio.whatsapp +
      (mensaje ? "?text=" + encodeURIComponent(mensaje) : "");
  }

  /* El dibujo del logotipo vive una sola vez en la página, como <symbol>, y
     aquí se usa. La proporción se lee del propio símbolo: si mañana llega el
     SVG original con otra proporción, no hay que tocar nada más.            */
  function marcaHTML(clase, etiqueta) {
    var sim = document.getElementById("marca-lb");
    var vb = sim ? sim.getAttribute("viewBox") : "0 0 198.82 120.39";
    return '<svg class="marca ' + (clase || "") + '" viewBox="' + vb + '"' +
      (etiqueta ? ' role="img" aria-label="' + esc(etiqueta) + '"' : ' aria-hidden="true"') +
      ' focusable="false"><use href="#marca-lb"></use></svg>';
  }

  var BOCADILLO =
    '<svg class="marca-wasap" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
      '<path d="M3 21V4h18v13H7.5L3 21Z" stroke="currentColor" stroke-width="1.6" ' +
        'stroke-linejoin="round"/>' +
      '<path d="M9 8.2c0 3.1 2.7 5.8 5.8 5.8l1-1.6-2-1.1-.9.9a5.6 5.6 0 0 1-2.1-2.1l.9-.9' +
        '-1.1-2L9 8.2Z" fill="currentColor"/>' +
    "</svg>";

  /* --- barra ---------------------------------------------------------------- */
  /* Un enlace por servicio, en el orden de content.js. La página en la que
     estás va entre corchetes (aria-current="page"): es el tic del estudio y
     no depende del color.                                                    */

  function montarNav() {
    var host = $("[data-nav]");
    if (!host) return;

    function enlace(pagina, texto, clase) {
      return "<li" + (clase ? ' class="' + clase + '"' : "") + '><a class="nav__link" href="' +
        esc(hrefPagina(pagina)) + '"' + (pagina === PAGINA ? ' aria-current="page"' : "") + ">" +
        esc(texto) + "</a></li>";
    }
    /* «Inicio» solo en el cajón del móvil: en escritorio lo es el logotipo,
       y en el cajón no todo el mundo sabe que el logotipo lleva al inicio. */
    var enlaces = enlace("inicio", "Inicio", "nav__solo-cajon") +
      S.servicios.map(function (s) { return enlace(s.pagina, s.menu); }).join("");

    var wasap = SERVICIO ? SERVICIO.mensaje : S.studio.botonWhatsapp.mensaje;

    host.innerHTML =
      '<a class="nav__marca" href="./">' + marcaHTML("", S.studio.nombreCompleto + ", inicio") + "</a>" +
      '<button class="nav__abrir" type="button" aria-expanded="false" aria-controls="nav-menu">' +
        '<span class="nav__abrir-txt">Menú</span>' +
        '<span class="nav__abrir-barras" aria-hidden="true"><i></i><i></i></span>' +
      "</button>" +
      '<div class="nav__velo" data-velo aria-hidden="true"></div>' +
      '<nav id="nav-menu" class="nav__menu" aria-label="Páginas">' +
        '<ul class="nav__lista" role="list">' + enlaces + "</ul>" +
        '<p class="nav__cita"><a class="btn" href="' + esc(wasapURL(wasap)) +
          '" target="_blank" rel="noopener">' + BOCADILLO + "<span>" + esc(S.studio.botonWhatsapp.etiqueta) +
          '</span><span class="visually-hidden"> (se abre en una pestaña nueva)</span></a></p>' +
      "</nav>";

    var boton = $(".nav__abrir", host);
    var menu = $(".nav__menu", host);
    var velo = $(".nav__velo", host);
    var rotulo = $(".nav__abrir-txt", boton);

    /* Con el cajón abierto, lo que hay detrás deja de existir para el teclado
       y para el lector de pantalla. La barra queda fuera porque el header no
       está dentro de .page: por eso el botón de cerrar sigue alcanzable.    */
    function detras(apagado) {
      $$(".page, .wasap, body > footer").forEach(function (n) {
        if (apagado) n.setAttribute("inert", "");
        else n.removeAttribute("inert");
      });
    }
    function pintarBoton(abierto) {
      boton.setAttribute("aria-expanded", String(abierto));
      /* El rótulo dice lo que va a pasar al pulsarlo. */
      if (rotulo) rotulo.textContent = abierto ? "Cerrar" : "Menú";
    }
    function cerrar(devolverFoco) {
      if (boton.getAttribute("aria-expanded") !== "true") return;
      pintarBoton(false);
      document.documentElement.removeAttribute("data-menu");
      detras(false);
      if (devolverFoco) boton.focus();
    }
    function abrir() {
      pintarBoton(true);
      document.documentElement.setAttribute("data-menu", "");
      detras(true);
      var primero = $("a", menu);
      if (primero) primero.focus();
    }
    boton.addEventListener("click", function () {
      if (boton.getAttribute("aria-expanded") === "true") cerrar(true); else abrir();
    });
    if (velo) velo.addEventListener("click", function () { cerrar(true); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) cerrar(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(true); });
    window.matchMedia("(min-width: 60rem)").addEventListener("change", function () { cerrar(false); });

    /* Borde de scroll: la barra se separa del contenido solo cuando hay
       contenido debajo, en vez de llevar un filete permanente.               */
    var centinela = $(".nav__centinela");
    if (!centinela) {
      centinela = document.createElement("div");
      centinela.setAttribute("aria-hidden", "true");
      centinela.className = "nav__centinela";
      host.parentNode.insertBefore(centinela, host);
    }
    new IntersectionObserver(function (entradas) {
      host.toggleAttribute("data-flotando", !entradas[0].isIntersecting);
    }).observe(centinela);
  }

  /* --- pie ------------------------------------------------------------------ */

  /* «15001 A Coruña», o solo «A Coruña» mientras no haya código postal. */
  function lineaCiudad(d) { return [d.cp, d.ciudad].filter(Boolean).join(" "); }

  function mapaURL() {
    var d = S.studio.direccion;
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent([S.studio.nombreCompleto, d.calle, lineaCiudad(d)].join(", "));
  }

  function montarPie() {
    var host = $("[data-pie]");
    if (!host) return;
    var d = S.studio.direccion;
    var mapa = mapaURL();

    var legales = S.pie.enlaces.map(function (e) {
      return '<li><a href="' + esc(e.href) + '">' + esc(e.texto) + "</a></li>";
    }).join("");
    var paginas = S.servicios.map(function (s) {
      return '<a href="' + esc(hrefPagina(s.pagina)) + '">' + esc(s.nombre) + "</a>";
    }).join("<br>");

    host.innerHTML =
      '<div class="pie__marca">' + marcaHTML("", S.studio.nombreCompleto) + "</div>" +
      '<div class="pie__cuerpo">' +
        '<div class="pie__bloque">' +
          '<p class="etiqueta etiqueta--suave">Servicios</p>' +
          '<p class="pie__dir sm">' + paginas + "</p>" +
        "</div>" +
        '<div class="pie__bloque">' +
          '<p class="etiqueta etiqueta--suave">Estudio</p>' +
          '<address class="pie__dir sm">' +
            esc(d.calle) + "<br>" + esc(lineaCiudad(d)) + "<br>" +
            '<a href="' + esc(mapa) + '" rel="noopener">' + esc(S.textos.inicio.contacto.comoLlegar) + "</a>" +
          "</address>" +
        "</div>" +
        '<div class="pie__bloque">' +
          '<p class="etiqueta etiqueta--suave">Cita</p>' +
          '<p class="pie__dir sm">' + esc(S.studio.cita) + "<br>" +
            '<a href="' + esc(wasapURL(S.studio.botonWhatsapp.mensaje)) + '" rel="noopener" class="num">' +
              "WhatsApp " + esc(S.studio.whatsappVisible) + "</a>" +
          "</p>" +
        "</div>" +
        '<div class="pie__bloque">' +
          '<p class="etiqueta etiqueta--suave">Redes</p>' +
          '<p class="pie__dir sm">' +
            (S.studio.instagram
              ? '<a href="https://www.instagram.com/' + esc(S.studio.instagram) + '/" rel="noopener">' +
                "Instagram @" + esc(S.studio.instagram) + "</a>"
              : "") +
          "</p>" +
        "</div>" +
      "</div>" +
      '<div class="pie__base xs t3">' +
        "<p>" + esc(S.pie.creditos) + "</p>" +
        '<ul class="pie__legales" role="list">' + legales + "</ul>" +
      "</div>";
  }

  /* --- datos estructurados ------------------------------------------------- */
  /* El inicio lleva el estudio (TattooParlor) con sus cuatro servicios. La
     página de cada servicio lleva ese servicio, con el estudio como quien lo
     da: es lo que Google enseña a quien busca «quitar tatuaje láser A
     Coruña». Sin horario de apertura: desde el 10/09/2026 el estudio es
     privado y trabaja solo con cita, así que publicar unas horas sería
     decirle a la gente que se presente.                                      */

  function datosEstudio() {
    var d = S.studio.direccion;
    return {
      "@type": "TattooParlor",
      "@id": BASE + "/#estudio",
      name: S.studio.nombreCompleto,
      description: S.studio.descripcion,
      url: BASE + "/",
      telephone: "+" + S.studio.whatsapp,
      image: BASE + "/assets/img/og.png",
      foundingDate: String(S.studio.fundado),
      address: {
        "@type": "PostalAddress",
        streetAddress: d.calle,
        postalCode: d.cp || undefined,          /* sin dato, mejor que vacío */
        addressLocality: d.ciudad,
        addressRegion: d.provincia,
        addressCountry: d.pais
      },
      geo: d.lat ? { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng } : undefined,
      sameAs: S.studio.instagram ? ["https://www.instagram.com/" + S.studio.instagram + "/"] : []
    };
  }

  function montarSchema() {
    var datos;
    if (SERVICIO) {
      datos = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: SERVICIO.nombre,
        description: SERVICIO.entradilla,
        url: urlPagina(SERVICIO.pagina),
        areaServed: S.studio.direccion.ciudad,
        provider: datosEstudio()
      };
    } else {
      datos = datosEstudio();
      datos["@context"] = "https://schema.org";
      datos.makesOffer = S.servicios.map(function (s) {
        return { "@type": "Offer", itemOffered: {
          "@type": "Service", name: s.nombre, description: s.resumen, url: urlPagina(s.pagina) } };
      });
    }
    /* Esta función añade, no reemplaza: en una página ya volcada por
       tools/sync-contenido.py el bloque viene en el HTML.                   */
    var previo = $('script[type="application/ld+json"]');
    var s = previo || document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(datos);
    if (!previo) document.head.appendChild(s);
  }

  /* --- verificación de edad ------------------------------------------------ */
  /* Franja inferior, no pantalla completa: no tapa el contenido, no retrasa
     el primer pintado y no penaliza el rebote del tráfico de Instagram.
     Tatuar a menores en España exige el consentimiento y la presencia del
     tutor legal: la franja lo recuerda y deja escribir igualmente.          */

  var CLAVE_EDAD = "locoblow:edad";

  function edadGuardada() {
    try {
      var v = JSON.parse(localStorage.getItem(CLAVE_EDAD) || "null");
      if (!v || !v.hasta || Date.now() > v.hasta) return null;
      return v.ok;
    } catch (e) { return null; }
  }
  function guardarEdad(ok) {
    try {
      localStorage.setItem(CLAVE_EDAD, JSON.stringify({
        ok: ok, hasta: Date.now() + S.studio.edad.recordarDias * 864e5
      }));
    } catch (e) { /* navegación privada: no pasa nada, se vuelve a preguntar */ }
  }

  function montarEdad() {
    var cfg = S.studio.edad;
    if (!cfg || edadGuardada() !== null) return;

    var caja = document.createElement("aside");
    caja.className = "edad en-negro";
    caja.setAttribute("role", "region");
    caja.setAttribute("aria-labelledby", "edad-t");

    caja.innerHTML =
      '<div class="edad__caja">' +
        '<p class="etiqueta corchetes">' + esc(cfg.etiqueta) + "</p>" +
        '<h2 class="d4" id="edad-t">' + esc(cfg.titulo) + "</h2>" +
        '<p class="sm edad__texto">' + esc(cfg.texto) + "</p>" +
        '<div class="edad__botones">' +
          '<button class="btn btn--macizo" type="button" data-si>' + esc(cfg.confirmar) + "</button>" +
          '<button class="btn" type="button" data-no>' + esc(cfg.rechazar) + "</button>" +
        "</div>" +
      "</div>";

    document.body.appendChild(caja);
    var antes = document.activeElement;

    /* Entra durante el primer layout; lo único que espera al momento de
       calma es el `data-visible`, que solo mueve un transform.             */
    var revelar = function () {
      if (caja.hasAttribute("data-visible") || !caja.isConnected) return;
      caja.setAttribute("data-visible", "");
      document.documentElement.setAttribute("data-edad", "");
    };
    /* No sale en la primera pantalla: taparía el botón de pedir cita, que es
       lo primero que hay que ver. Aparece cuando ese botón se va de la
       pantalla, que es cuando alguien ya ha decidido quedarse a mirar.     */
    var acciones = $("[data-cta-principal]");
    if (acciones && "IntersectionObserver" in window) {
      var espera = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) return;
        espera.disconnect();
        revelar();
      });
      espera.observe(acciones);
    } else if ("requestIdleCallback" in window) {
      requestIdleCallback(revelar, { timeout: 2200 });
    } else {
      setTimeout(revelar, 900);
    }

    function cerrar() {
      caja.removeAttribute("data-visible");
      document.documentElement.removeAttribute("data-edad");
      var fin = function () { caja.remove(); };
      if (quieto()) fin();
      else caja.addEventListener("transitionend", fin, { once: true });
      if (antes && antes.focus) antes.focus();
    }

    $("[data-si]", caja).addEventListener("click", function () { guardarEdad(true); cerrar(); });

    $("[data-no]", caja).addEventListener("click", function () {
      guardarEdad(false);
      var cuerpo = $(".edad__caja", caja);
      cuerpo.innerHTML =
        '<p class="etiqueta corchetes">' + esc(cfg.etiqueta) + "</p>" +
        '<h2 class="d4" id="edad-t">' + esc(cfg.tituloMenor) + "</h2>" +
        '<p class="sm edad__texto">' + esc(cfg.textoMenor) + "</p>" +
        '<div class="edad__botones">' +
          '<a class="btn btn--macizo" href="' + esc(wasapURL(cfg.mensajeMenor)) +
            '" target="_blank" rel="noopener">Escribir por WhatsApp</a>' +
          '<button class="btn" type="button" data-cerrar>Entendido</button>' +
        "</div>";
      $("[data-cerrar]", caja).addEventListener("click", cerrar);
      $("[data-cerrar]", caja).focus();
    });
  }

  /* --- botón flotante de WhatsApp ------------------------------------------ */

  function montarWhatsapp() {
    var cfg = S.studio.botonWhatsapp;
    if (!cfg || !cfg.activo || !S.studio.whatsapp) return;
    /* Va antes de la salida de abajo: en una página ya volcada el botón
       existe, pero el pie necesita la marca para apartar sus enlaces.      */
    document.documentElement.setAttribute("data-wasap-activo", "");

    /* En la página de un servicio, el chat se abre con el mensaje de ese
       servicio: al estudio le llega ya dicho de qué se trata.               */
    var mensaje = SERVICIO ? SERVICIO.mensaje : cfg.mensaje;
    var a = $("[data-wasap]");
    if (a) a.href = wasapURL(mensaje);
    if (!a) {
      a = document.createElement("a");
      a.className = "wasap";
      a.setAttribute("data-wasap", "");
      a.href = wasapURL(mensaje);
      a.target = "_blank";
      a.rel = "noopener";
      /* El nombre accesible empieza por el texto visible: quien navega por
         voz dice «WhatsApp» y el navegador encuentra este enlace.           */
      a.setAttribute("aria-label", cfg.etiqueta + ": " + cfg.titulo + " (se abre en una pestaña nueva)");
      a.innerHTML = BOCADILLO + '<span class="wasap__texto">' + esc(cfg.etiqueta) + "</span>";
      document.body.appendChild(a);
    }

    /* Mientras se ve el botón de cita de la cabecera, el flotante no sale:
       dos bloques negros pidiendo lo mismo a la vez se restan fuerza. Aparece
       cuando ese botón se va de la pantalla.                                */
    /* Por eso nace escondido (CSS) y solo se enseña con la marca
       data-cta-fuera: sin ella, en el primer pintado aparecería un instante
       encima de la cabecera antes de que esto llegara a ocultarlo.         */
    var ctas = $$("[data-cta]");
    if (ctas.length && "IntersectionObserver" in window) {
      var aLaVista = [];
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          var i = aLaVista.indexOf(e.target);
          if (e.isIntersecting && i === -1) aLaVista.push(e.target);
          if (!e.isIntersecting && i !== -1) aLaVista.splice(i, 1);
        });
        document.documentElement.toggleAttribute("data-cta-fuera", !aLaVista.length);
      });
      ctas.forEach(function (c) { obs.observe(c); });
    } else {
      document.documentElement.setAttribute("data-cta-fuera", "");
    }

    /* Sobre el pie negro el botón se invierte: si no, sería negro sobre negro. */
    var pie = $("[data-pie]");
    if (pie && "IntersectionObserver" in window) {
      /* El margen negativo es la altura a la que flota el botón: se invierte
         cuando el pie llega a él, no cuando asoma por el borde.             */
      new IntersectionObserver(function (e) {
        document.documentElement.toggleAttribute("data-pie-visible", e[0].isIntersecting);
      }, { rootMargin: "0px 0px -76px 0px" }).observe(pie);
    }
  }

  /* --- vídeos ---------------------------------------------------------------- */
  /* Los reels del estudio, en bucle y sin sonido. El HTML trae el póster y la
     proporción; el archivo de vídeo no se pide hasta que el marco se acerca
     a la pantalla, y se para cuando sale. Con «reducir movimiento» no arranca
     solo: se queda el póster y el botón dice «Reproducir».                  */

  /* El marco de un vídeo de content.js (sección 8). Sin `src` ni póster: los
     pone montarVideos cuando el marco se acerca. Si el vídeo no se publica,
     no devuelve nada y la sección se arregla sin él.                        */
  /* `cabecera`: el vídeo es lo primero que se ve de la página. Su póster va
     entonces en el HTML y el navegador lo pide al leerlo, sin esperar al
     script: es la imagen grande de la primera pantalla.                     */
  function videoHTML(clave, cabecera) {
    var v = S.videos && S.videos[clave];
    if (!v || !v.publicar) return "";
    var base = "assets/vid/" + v.base;
    return '<figure class="video" data-video style="--ratio:' + v.ratio + '">' +
      '<video muted loop playsinline preload="none" width="600" height="' + Math.round(600 / v.ratio) + '"' +
        (cabecera ? ' poster="' : ' data-poster="') + base + '-poster.webp" aria-label="' + esc(v.alt) + '">' +
        '<source data-src="' + base + '.webm" type="video/webm">' +
        '<source data-src="' + base + '.mp4" type="video/mp4">' +
      "</video>" +
      '<figcaption class="video__pie">' +
        '<span class="video__rotulo etiqueta"><span class="corchetes">' + esc(v.rotulo) + "</span></span>" +
        '<button class="video__boton" type="button" aria-pressed="false" aria-label="Reproducir el vídeo">' +
          '<i aria-hidden="true"></i></button>' +
      "</figcaption></figure>";
  }

  /* Se puede llamar las veces que haga falta: cada marco se enlaza una sola
     vez. Los módulos lo llaman después de pintar vídeos nuevos.             */
  var videosListos = typeof WeakSet === "function" ? new WeakSet() : null;

  function montarVideos() {
    var marcos = $$("[data-video]").filter(function (m) {
      return !videosListos || !videosListos.has(m);
    });
    if (!marcos.length) return;

    marcos.forEach(function (m) {
      if (videosListos) videosListos.add(m);
      var v = $("video", m);
      var b = $(".video__boton", m);
      if (!v) return;
      v.muted = true;   /* el bucle automático solo se permite sin sonido */
      var quiereParado = quieto();
      /* El póster también espera: cuatro imágenes que nadie ha pedido
         competirían con lo primero que se ve.                              */
      function poster() {
        var p = v.getAttribute("data-poster");
        if (p && !v.getAttribute("poster")) v.setAttribute("poster", p);
      }
      function pintar() {
        var sonando = !v.paused;
        if (!b) return;
        b.setAttribute("aria-pressed", String(sonando));
        b.setAttribute("aria-label", sonando ? "Pausar el vídeo" : "Reproducir el vídeo");
      }
      function cargar() {
        if (v.getAttribute("data-cargado")) return;
        $$("source[data-src]", v).forEach(function (s) { s.src = s.getAttribute("data-src"); });
        v.load();
        v.setAttribute("data-cargado", "1");
      }
      if (b) {
        b.addEventListener("click", function () {
          poster();
          cargar();
          if (v.paused) { quiereParado = false; v.play().catch(function () {}); }
          else { quiereParado = true; v.pause(); }
        });
      }
      v.addEventListener("play", pintar);
      v.addEventListener("pause", pintar);
      pintar();

      if (!("IntersectionObserver" in window)) { poster(); return; }
      /* Con un margen amplio llega el póster, para que el marco nunca se vea
         vacío al entrar; el vídeo, solo cuando ya está casi en pantalla.    */
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) poster();
      }, { rootMargin: "600px 0px" }).observe(m);
      new IntersectionObserver(function (e) {
        var dentro = e[0].isIntersecting;
        if (dentro) {
          /* Si está parado (por «reducir movimiento» o porque lo pausaron),
             no se baja nada hasta que lo pidan con el botón.                */
          if (!quiereParado) { cargar(); v.play().catch(function () {}); }
        } else if (!v.paused) {
          v.pause();
        }
      }, { rootMargin: "200px 0px" }).observe(m);
    });
  }

  /* --- revelado --------------------------------------------------------------- */
  /* El único movimiento con autor: cada foto se abre desde el centro, como un
     corchete que se separa. Sin parallax ni scrolljacking, y el contenido es
     visible por defecto: si el JavaScript falla, todo se ve igual.          */

  var observadorRevelado = null;

  function montarRevelado() {
    if (quieto() || !("IntersectionObserver" in window)) return;

    if (!observadorRevelado) {
      observadorRevelado = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          var n = e.target;
          /* Escalonado corto entre hermanos: 45 ms, nunca más de 180. */
          var i = Number(n.getAttribute("data-revelar-orden") || 0);
          n.style.transitionDelay = Math.min(i * 45, 180) + "ms";
          n.setAttribute("data-revelar", "hecho");
          observadorRevelado.unobserve(n);
        });
      /* Umbral 0: el estado de espera recorta la pieza con clip-path y el
         observador mide ya recortado; con un umbral mayor que 0 no se
         alcanzaría nunca y la pieza se quedaría escondida.                 */
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    }

    var alto = window.innerHeight || 800;
    $$("[data-revelar]:not([data-revelar='espera']):not([data-revelar='hecho'])")
      .forEach(function (n) {
        /* Lo que ya está en pantalla al cargar no se oculta para volver a
           mostrarlo: con el contenido volcado en el HTML eso sería un
           parpadeo, no un revelado.                                        */
        if (n.getBoundingClientRect().top < alto) {
          n.setAttribute("data-revelar", "hecho");
          return;
        }
        n.setAttribute("data-revelar", "espera");
        observadorRevelado.observe(n);
      });
  }

  /* --- cabecera ------------------------------------------------------------------ */
  /* Título, descripción y tarjeta de compartir de cada página: los del
     inicio salen de textos.meta y los de un servicio, de su `meta`.
     tools/sync-contenido.py los deja escritos en el HTML, que es lo que leen
     Google y la vista previa de WhatsApp.                                    */

  function montarCabecera() {
    var t = SERVICIO ? SERVICIO.meta : S.textos.meta;
    var url = urlPagina(PAGINA);
    document.title = t.titulo;
    function meta(atributo, nombre, valor) {
      var n = $("meta[" + atributo + '="' + nombre + '"]');
      if (!n) { n = document.createElement("meta"); n.setAttribute(atributo, nombre); document.head.appendChild(n); }
      n.setAttribute("content", valor);
    }
    meta("name", "description", t.descripcion);
    meta("property", "og:title", t.titulo);
    meta("property", "og:description", t.compartir || t.descripcion);
    meta("property", "og:url", url);
    meta("property", "og:image", BASE + "/assets/img/og.png");
    meta("property", "og:site_name", S.studio.nombreCompleto);
    var c = $('link[rel="canonical"]');
    if (c) c.setAttribute("href", url);
  }

  /* --- arranque ---------------------------------------------------------------- */

  montarCabecera();
  montarNav();
  montarPie();
  montarSchema();
  montarWhatsapp();
  montarVideos();
  montarRevelado();
  montarEdad();

  /* Se expone lo mínimo para los módulos de cada sección. */
  window.LB = {
    $: $, $$: $$, esc: esc, quieto: quieto, mqQuieto: mqQuieto,
    imgHTML: imgHTML, huecoHTML: huecoHTML, fotoHTML: fotoHTML,
    PAGINA: PAGINA, SERVICIO: SERVICIO,
    artistaPor: artistaPor, estiloPor: estiloPor, rellenar: rellenar,
    hrefPagina: hrefPagina, urlPagina: urlPagina,
    wasapURL: wasapURL, marcaHTML: marcaHTML, mapaURL: mapaURL, BOCADILLO: BOCADILLO,
    videoHTML: videoHTML, lineaCiudad: lineaCiudad,
    /* Los módulos los llaman después de inyectar piezas nuevas. */
    revelar: montarRevelado,
    videos: montarVideos
  };
})();
