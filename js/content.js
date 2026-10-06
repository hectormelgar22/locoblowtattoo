/* =============================================================================
   LOCO BLOW · CONTENIDO
   Todo lo que se lee en la web sale de aquí. Para cambiar un texto, un dato,
   un estilo o una foto no hace falta tocar ningún HTML.

   DESPUÉS DE EDITAR ESTE ARCHIVO:   python tools/sync-contenido.py
   (copia el texto dentro de cada HTML para que se vea sin JavaScript y lo
   lean Google y las previsualizaciones de WhatsApp).

   Dos reglas al editar:
   · Las comas y las comillas importan. Si la web se queda en blanco, casi
     seguro falta una coma o sobra una. El navegador lo dice en la consola (F12).
   · Los `id` y los `slug` son direcciones: cambiar «dotwork» por otra
     cosa rompe los enlaces ya compartidos. El texto visible se cambia sin
     miedo.

   Lo que lleva  // PROVISIONAL  es un dato que el estudio aún no ha
   confirmado. Lo que lleva  // FUENTE  sale de algo que el propio estudio ha
   publicado o mandado (el post fijado del 10/09/2026, sus destacados, el
   logotipo o los mensajes del 24/09/2026).

   La web tiene seis páginas: el inicio, una por servicio y la de cuidados.

   Índice:
     1. studio      nombre, dirección, WhatsApp, Instagram, cita, edad
     2. textos      lo que no es de un servicio: inicio, visor, preguntas
     3. servicios   tatuajes, piercing, láser y micropigmentación capilar:
                    cada uno es una página y un enlace de la barra
     4. estilos     los estilos de tatuaje (la página de tatuajes va por aquí)
     5. obras       los trabajos de tatuaje (fotos y reels), con su estilo y su artista
     6. artistas    quién firma cada foto
     7. estudio     las fotos del local
     8. videos      los reels
     9. preguntas   las preguntas generales (las de cada servicio van con él)
    9b. opiniones   reseñas de Google, en el inicio
    10. pie         enlaces legales y créditos
    11. cuidados    la guía de curación (su propia página: cuidados)

   NADA DE PRECIOS. El estudio no quiere precios en la web (24/09/2026).
   ========================================================================== */

window.STUDIO = {

  /* --- 1. EL ESTUDIO ------------------------------------------------------- */
  studio: {
    nombre: "Loco Blow",
    nombreCompleto: "Loco Blow Tattoo",
    fundado: 2015,                                   // FUENTE: «SINCE 2015» del logotipo
    descripcion: "Estudio de tatuaje, eliminación de tatuajes con láser, piercing y micropigmentación capilar en A Coruña desde 2015. Estudio privado: solo con cita previa por WhatsApp.",
    // Dominio definitivo. Sale en los datos para Google, en las tarjetas de
    // compartir y en el enlace que se manda al pedir «algo así» desde una
    // foto. Mientras no haya uno, va un dominio de ejemplo que no existe a
    // propósito: mejor eso que apuntar a uno que quizá sea de otro.
    // PROVISIONAL: pendiente de confirmar (¿tienen dominio?)
    web: "https://hectormelgar22.github.io/locoblowtattoo",

    // FUENTE: su ficha de Google Maps («Loco Blow Tattoo Coruña»,
    // 24/09/2026). La ficha añade «bajo 27»: PROVISIONAL, pendiente de que el
    // estudio diga si hace falta para encontrar la puerta.
    direccion: {
      calle: "Rúa Voluntariado, 3",
      cp: "15003",
      ciudad: "A Coruña",
      provincia: "A Coruña",
      pais: "ES",
      lat: 43.3706446, lng: -8.4004003,
      // Lo que ayuda a encontrar la puerta. PROVISIONAL: pendiente de confirmar
      indicaciones: ""
    },

    // Su ficha de Google: la que abre «Cómo llegar» y «Leer las reseñas».
    // FUENTE: Google Maps, 24/09/2026. La nota y el número de reseñas se
    // copian a mano: conviene ponerlos al día de vez en cuando.
    google: {
      nombre: "Loco Blow Tattoo Coruña",
      ficha: "https://maps.google.com/?cid=1856912985306354920",
      // El mapa que se carga al pulsar sobre el nuestro (sin clave de API).
      mapa: "https://www.google.com/maps/embed?origin=mfe&pb=!1m12!1m8!1m3!1d2900.3!2d-8.4004003!3d43.3706446!3m2!1i1024!2i768!4f13.1!2m1!1sLoco+Blow+Tattoo+Coru%C3%B1a!6i17!3m1!1ses!5m1!1ses",
      nota: "5,0",
      resenas: 566
    },

    // WhatsApp oficial: la entrada al estudio para todo.
    // FUENTE: post fijado del 10/09/2026. Solo dígitos, con el prefijo del
    // país y sin espacios ni «+».
    whatsapp: "34684107197",
    whatsappVisible: "684 107 197",

    instagram: "locoblowtattoo",                     // FUENTE: perfil

    // Desde el 10/09/2026 no hay horario de apertura ni recepción: el
    // estudio es privado y trabaja solo con cita.  FUENTE: post fijado.
    cita: "Solo con cita previa",

    // El botón flotante de WhatsApp. En la página de cada servicio abre el
    // chat con el mensaje de ese servicio; aquí, el del inicio.
    // FUENTE: el estudio lo pide así (24/09/2026).
    botonWhatsapp: {
      activo: true,
      etiqueta: "WhatsApp",
      titulo: "pedir cita o preguntar",
      mensaje: "Hola, os escribo desde la web. "
    },

    // Franja de edad al pie de la pantalla. Se recuerda la respuesta
    // `recordarDias` días.  PROVISIONAL: pendiente de confirmar vuestra
    // política con menores (edad mínima, autorización, piercing).
    edad: {
      etiqueta: "+18",
      titulo: "¿Tienes 18 años o más?",
      texto: "En esta web hay tatuajes y se pide cita. Si eres menor, para tatuarte hace falta el consentimiento de tu madre, tu padre o tu tutor, y que te acompañe.",
      confirmar: "Sí, tengo 18",
      rechazar: "No",
      tituloMenor: "Puedes escribirnos igual.",
      textoMenor: "Siendo menor, para tatuarte o hacerte un piercing necesitas el consentimiento por escrito de tu madre, tu padre o tu tutor, y que venga contigo a la cita.",
      mensajeMenor: "Hola, os escribo desde la web. Soy menor de edad y quiero información.",
      recordarDias: 180
    }
  },

  /* --- 2. TEXTOS ----------------------------------------------------------- */
  textos: {
    // Lo que sale en la pestaña, en Google y al compartir el enlace del
    // inicio. Cada servicio lleva el suyo en su `meta`.
    meta: {
      // Google enseña unos 60 caracteres de título y 155 de descripción: lo
      // que pase de ahí sale cortado con «…».
      titulo: "Loco Blow Tattoo · Tatuaje, láser y piercing en A Coruña",
      descripcion: "Estudio de tatuaje en A Coruña desde 2015, con trabajos por estilos. También láser, piercing y micropigmentación capilar. Cita previa por WhatsApp.",
      compartir: "Tatuaje, láser, piercing y micropigmentación capilar en A Coruña desde 2015. Cita previa por WhatsApp."
    },

    inicio: {
      // El titular principal de la página. No se ve (en su sitio está el
      // cartel), pero es lo que leen Google y los lectores de pantalla.
      titulo: "Loco Blow Tattoo: tatuaje, eliminación de tatuajes con láser, piercing y micropigmentación capilar en A Coruña",
      // FUENTE: el texto de inicio del estudio (30/09/2026).
      entradilla: "Tatuaje, piercing, láser y micropigmentación capilar en A Coruña. Trabajamos solo con cita previa.",
      cita: "Pedir cita por WhatsApp",
      verTatuajes: "Ver tatuajes",
      nota: "Escríbenos y te contesta un compañero del estudio.",

      // Quiénes somos: el texto de inicio que mandó el estudio (30/09/2026),
      // repartido en cuatro piezas para que se lea de un tirón.
      // · `manifiesto`: su primer párrafo, en grande. Lo que va entre
      //   asteriscos (*así*) se tapa con un bloque negro al leerlo.
      // · `cifras`: lo que se ve de un vistazo. {nota} y {resenas} salen de
      //   la ficha de Google (studio.google).
      // · `puntos`: el resto de su texto, un punto por párrafo, cada uno con
      //   su imagen: `fotos` (de una a cuatro, por su `id`: de un trabajo,
      //   de un piercing, del local o la clave de un vídeo, que pone su
      //   primer fotograma) o `tarjeta: "whatsapp"`, un cartel negro con el
      //   número. `enlaces` pone debajo los estilos o los servicios de los
      //   que habla. Las fotos del local que no salen aquí salen, debajo,
      //   en el mosaico.
      // · `cierre`: su última frase, en la banda negra con el botón de cita.
      estudio: {
        etiqueta: "El estudio",
        titular: "Desde 2015 en A Coruña.",
        manifiesto: "Somos un estudio en el centro de A Coruña con *más de diez años de trayectoria*. En este tiempo hemos crecido sin perder lo que nos define: un espacio *profesional y cercano*, donde cada trabajo se hace con calma y con cuidado. *Varios primeros premios* en convenciones de tatuaje avalan la experiencia de nuestro equipo.",
        // PROVISIONAL: las cifras y los titulares de cada punto los ha puesto
        // la web a partir del texto del estudio; pendiente de que lo revise.
        cifras: [
          { cifra: "+10", texto: "años de trayectoria en el centro de A Coruña" },
          { cifra: "{nota}", texto: "de media en Google, con {resenas} reseñas" },
          { cifra: "4", texto: "especialidades en un mismo estudio" },
          // FUENTE: el estudio (06/10/2026): «hemos ganado varios primeros
          // premios», y nada más.
          { cifra: "1.os", texto: "premios: hemos ganado varios en convenciones de tatuaje" }
        ],
        puntos: [
          // Ajustado a las cuatro categorías oficiales (05/10/2026).
          { titulo: "Cuatro estilos",
            texto: "Trabajamos realismo y microrrealismo, anime, tradicional, fine line y puntillismo, adaptando cada diseño a tu idea y a ti.",
            fotos: ["ezel-3", "fernando-4", "haroz-7", "lineal-92"],
            enlaces: "estilos" },
          { titulo: "Todo en un mismo sitio",
            texto: "En el mismo espacio encontrarás también piercing, eliminación de tatuajes con láser y micropigmentación capilar.",
            fotos: ["haroz-8", "pi-2", "laser"],
            enlaces: "servicios" },
          { titulo: "Calidad, higiene y trato",
            texto: "Cuidamos la calidad, la higiene y el trato: queremos que, desde el primer mensaje hasta que sales por la puerta, sepas qué vamos a hacer y te sientas a gusto durante todo el proceso.",
            fotos: ["estudio-1"] },
          { titulo: "Todo por WhatsApp",
            texto: "Todas las consultas, presupuestos y citas se gestionan directamente a través de WhatsApp, para centralizar la atención y poder llevar un mejor seguimiento de cada cliente.",
            tarjeta: "whatsapp" }
        ],
        cierre: ["Tu idea empieza aquí.", "Nosotros nos encargamos de darle forma."],
        directo: "Si ya has venido y sabes con qué artista quieres trabajar, puedes escribirle directamente. Si no tienes su número, pídenoslo."
      },

      // Una muestra de trabajos: la primera foto de cada estilo, luego la
      // segunda… hasta `cuantas`. Se abren en el visor.
      trabajos: {
        etiqueta: "Trabajos",
        titular: "Hecho aquí.",
        entradilla: "Una muestra de cada estilo. Toca una para verla entera y, si te gusta, nos la mandas tal cual.",
        verTodos: "Ver todos los tatuajes",
        // La foto abierta sobre la muestra: su botón para verla a pantalla
        // completa (el cerrar y el «quiero algo así» son los del visor).
        completa: "Pantalla completa",
        cuantas: 8
      },

      // El índice que lleva a las cuatro páginas.
      servicios: {
        etiqueta: "Lo que hacemos",
        titular: "Cuatro oficios, un estudio.",
        entradilla: "Entra en cada uno: qué es, cómo se hace y fotos de trabajos hechos aquí.",
        // Lo que dice la tarjeta de tatuajes debajo del corchete.
        cuentaTatuajes: "{estilos} estilos · {trabajos} trabajos",
        // Debajo de las tarjetas, el camino a la guía de cuidados.
        cuidados: "¿Ya te lo has hecho? Cómo cuidarlo mientras cura:"
      },

      // Las opiniones de Google, antes de las preguntas.
      opiniones: {
        etiqueta: "Opiniones",
        titular: "Lo que cuentan.",
        entradilla: "{nota} de media en {n} reseñas de Google. Estas son cuatro, con la foto que subieron.",
        leer: "Leer la reseña en Google",
        tatuadoPor: "Tatuaje de {artista}",
        todas: "Leer las {n} reseñas",
        estrellas: "{n} de 5 estrellas"
      },

      preguntas: {
        etiqueta: "Preguntas",
        titular: "Antes de escribir.",
        entradilla: "Lo que más nos preguntáis. Si lo tuyo no está, pregúntalo por WhatsApp."
      },

      contacto: {
        etiqueta: "Dónde estamos",
        // El titular es la dirección: en cartel, como el resto.
        // PROVISIONAL: sigue a la dirección confirmada (¿«Rúa do Voluntariado»?)
        titular: "Voluntariado, 3.",
        texto: "Aquí se entra con cita. Escríbenos por WhatsApp y un compañero te contesta y organiza tu cita.",
        comoLlegar: "Cómo llegar",
        instagram: "Instagram",
        resenas: "{n} reseñas en Google",
        leerResenas: "Leer las reseñas",
        mapa: {
          alt: "Mapa del centro de A Coruña, con el estudio marcado en el medio, en la Rúa Voluntariado, 3.",
          abrir: "Mover el mapa",
          nota: "Se carga el mapa de Google aquí mismo.",
          titulo: "Mapa de Google con el estudio Loco Blow"
        }
      }
    },

    // Lo que comparten las páginas de servicio.
    servicio: {
      pasos:     { etiqueta: "Cómo es",   titular: "Paso a paso." },
      fotos:     { etiqueta: "Trabajos",  titular: "Hechos en el estudio." },
      preguntas: { etiqueta: "Preguntas", titular: "Antes de escribir." },
      verFotos: "Ver trabajos",
      // El bloque negro al final de la fila de fotos de cada servicio.
      // PROVISIONAL: pendiente de que el estudio revise el texto.
      finTitular: "¿Te animas?",
      finTexto: "Escríbenos y te contamos cómo sería en tu caso.",
      // Lo que se ve donde irán las fotos, mientras no lleguen.
      pendiente: "Las fotos llegan con los originales del estudio"
    },

    tatuajes: {
      verEstilos: "Ver estilos",
      // Con qué se abre WhatsApp desde el botón de cada estilo. {estilo} se
      // cambia por su nombre.
      mensajeEstilo: "Hola, os escribo desde la web. Quiero un tatuaje de estilo {estilo}: te cuento la idea, la zona y el tamaño aproximado.",
      botonEstilo: "Quiero este estilo",
      // Lo que dice un estilo que aún no tiene fotos.
      pendiente: "Pronto, trabajos de este estilo aquí. Si es lo que buscas, escríbenos y te enseñamos más.",
      // El carrete de cada estilo: las fotos en fila, enteras, que se pasan
      // de lado. {n} se cambia por el número de trabajos.
      // PROVISIONAL: pendiente de que el estudio revise el texto.
      trabajos: "{n} trabajos",
      por: "Por",
      todos: "Todos",
      filtrar: "Ver los trabajos de",
      anteriores: "Trabajos anteriores",
      siguientes: "Más trabajos",
      // Lo que dice el cursor sobre las fotos (solo con ratón).
      cursorVer: "Ver",
      cursorArrastra: "Arrastra",
      // La última pieza del carrete: el paso a WhatsApp después de verlo.
      // Con un artista elegido, el mensaje dice con quién: {artista}.
      finTitular: "¿Es tu estilo?",
      finTexto: "Cuéntanos la idea, la zona y el tamaño, y te decimos quién y cuándo.",
      mensajeArtista: "Hola, os escribo desde la web. Quiero un tatuaje de estilo {estilo} con {artista}: te cuento la idea, la zona y el tamaño aproximado.",
      botonArtista: "Quiero cita con {artista}",
      // La galería: cada estilo es una carpeta, como los álbumes del móvil.
      // Primero las carpetas; al entrar, todas sus fotos.
      // PROVISIONAL: pendiente de que el estudio revise el texto.
      galeria: {
        etiqueta: "Estilos",
        titular: "Elige carpeta.",
        entradilla: "Cada estilo, con todos sus trabajos. Entra, toca una foto y pasa de una a otra.",
        fotos: "{n} fotos",
        volver: "Estilos",
        abrir: "Abrir {estilo}: {n} fotos"
      }
    },

    // El visor a pantalla completa de las fotos.
    visor: {
      etiqueta: "Trabajo a pantalla completa",
      cerrar: "Cerrar",
      anterior: "Trabajo anterior",
      siguiente: "Trabajo siguiente",
      pista: "Desliza para pasar de foto y hacia abajo para cerrar. Con teclado, las flechas.",
      // La tira de miniaturas de abajo: para saltar a cualquier foto.
      miniaturas: "Todas las fotos",
      // El botón que manda esa misma foto por WhatsApp: así el estudio sabe
      // qué pieza y de quién. {de} se cambia por « de Haroz (Realismo black & grey)» y
      // {enlace}, por la dirección de la foto.
      quiero: "Quiero algo así",
      mensaje: "Hola, os escribo desde la web. Me gusta este trabajo{de}: {enlace}"
    },

    // La página de error (404.html): la que sale en una dirección que no
    // existe, por un enlace viejo o mal copiado. Lleva a las páginas de
    // verdad en vez de dejar a nadie en un callejón.
    noEncontrada: {
      etiqueta: "Error 404",
      titular: "404.",
      entradilla: "Esta página no existe o ha cambiado de sitio. Lo que buscabas seguramente está en una de estas:",
      volver: "Ir al inicio",
      meta: {
        titulo: "Página no encontrada · Loco Blow Tattoo",
        descripcion: "Esta página no existe. Loco Blow Tattoo: tatuaje, láser, piercing y micropigmentación capilar en A Coruña."
      }
    },

    // La banda de Instagram, al final de todas las páginas: el perfil del
    // estudio en grande. Cada artista se enlaza desde sus fotos.
    // PROVISIONAL: pendiente de que el estudio revise el texto.
    instagram: {
      etiqueta: "Instagram",
      texto: "Lo último del estudio sale antes allí: trabajos recién terminados y reels del proceso.",
      boton: "Seguir en Instagram",
      // Los trabajos de la cuadrícula (los `id` de la lista 5, solo fotos).
      // Mejor distintos de los que salen en la muestra del inicio.
      fotos: ["haroz-26", "ezel-4", "lineal-23", "fernando-5", "maou-8", "lineal-37"]
    }
  },

  /* --- 3. SERVICIOS -------------------------------------------------------- */
  // Cada servicio es una página y un enlace de la barra, en este orden.
  // FUENTE: el estudio pide las cuatro pestañas así (24/09/2026).
  //
  // `pagina`   el archivo (sin .html): tatuajes → tatuajes.html
  // `menu`     lo que dice la barra
  // `etiqueta` la palabra entre corchetes: [TATTOO]
  // `titular`  el titular grande de su página; va con punto, como «Blow.»
  // `pasos`    «cómo es», en pocas líneas. Si no hay, no sale.
  // `puntos`   lo que hay que saber. Un punto con `valor: null` no sale en la
  //            web: así se deja escrito lo que falta sin enseñarlo.
  // `fotos`    las fotos de su página (tatuajes las toma de `obras`).
  // `mensaje`  el texto con el que se abre WhatsApp desde esa página.
  servicios: [
    {
      id: "tatuaje", pagina: "tatuajes", menu: "Tatuajes",
      // El reel de su tarjeta en el inicio (se mueve al pasar por encima).
      portada: "payasa",
      etiqueta: "Tattoo", nombre: "Tatuajes",
      titular: "Tatuajes.",
      entradilla: "Por estilos. Entra en el tuyo: cada foto lleva el nombre de quien la hizo, y si una te gusta, nos la mandas tal cual por WhatsApp.",
      resumen: "Por estilos, con el nombre del artista en cada foto.",
      puntos: [
        { dato: "Cita", valor: "Previa, por WhatsApp o con tu artista" },
        // PROVISIONAL: pendiente de confirmar cómo pedís la idea
        { dato: "Presupuesto", valor: "Con una foto de la idea y de la zona" }
      ],
      mensaje: "Hola, os escribo desde la web. Quiero tatuarme: te cuento la idea, la zona y el tamaño aproximado.",
      boton: "Pedir cita para tatuarme",
      meta: {
        titulo: "Tatuajes en A Coruña por estilos · Loco Blow Tattoo",
        descripcion: "Realismo y microrrealismo, anime, tradicional, fine line y puntillismo: los trabajos del estudio por estilos, con su artista. Cita previa por WhatsApp."
      },
      preguntas: [
        {
          // PROVISIONAL: pendiente de confirmar cómo dais presupuesto
          pregunta: "¿Cuánto cuesta un tatuaje?",
          respuesta: "Depende del tamaño, la zona y el detalle. Mándanos por WhatsApp una foto de la idea y de la zona, con el tamaño aproximado, y te damos presupuesto."
        },
        {
          // FUENTE: post fijado del 10/09/2026
          pregunta: "¿Puedo escribir directamente a mi artista?",
          respuesta: "Sí. Si ya has venido y tienes su número, escríbele. Si no lo tienes, pídenoslo por el WhatsApp del estudio y te lo pasamos."
        },
        {
          // PROVISIONAL: pendiente de confirmar vuestra política con menores
          pregunta: "¿Tatuáis a menores de edad?",
          respuesta: "Solo con el consentimiento por escrito de su madre, su padre o su tutor legal, y con esa persona presente en la cita."
        },
        {
          pregunta: "¿Duele?",
          respuesta: "Algo, sí: depende sobre todo de la zona. Donde hay más carne (el brazo, el muslo, el gemelo) se lleva bien; cerca del hueso (costillas, pies, codo) se nota más. Si es tu primer tatuaje, dilo y lo tenemos en cuenta."
        },
        {
          // PROVISIONAL: pendiente de confirmar cómo trabajáis los diseños
          pregunta: "¿Tengo que traer el diseño hecho?",
          respuesta: "No. Tráenos la idea y fotos de referencia de lo que te gusta: el artista la dibuja y la adapta a tu zona y a su estilo. Si ya tienes un diseño, también vale."
        },
        {
          // PROVISIONAL: pendiente de confirmar
          pregunta: "¿Tapáis tatuajes antiguos?",
          respuesta: "Sí. Mándanos una foto del tatuaje y de lo que te gustaría encima y te decimos qué se puede hacer. Si el antiguo es muy oscuro, a veces conviene aclararlo antes con unas sesiones de láser, que también hacemos aquí."
        },
        {
          // PROVISIONAL: pendiente de que el estudio lo revise
          pregunta: "¿Cómo tengo que venir a la sesión?",
          respuesta: "Habiendo comido y descansado, sin haber bebido alcohol el día antes y con ropa cómoda que deje la zona a mano. Si la piel de la zona está quemada por el sol o irritada, avísanos antes."
        }
      ]
    },
    {
      id: "piercing", pagina: "piercing", menu: "Piercing",
      // FUENTE: el estudio (06/10/2026): los botones de WhatsApp de piercing
      // y láser van a este número, no al general.
      whatsapp: "34655578432",
      etiqueta: "Piercing", nombre: "Piercing",
      titular: "Piercing.",
      // PROVISIONAL: pendiente de que el estudio revise todo el texto del
      // piercing (quién lo hace, material, joyas, curación).
      entradilla: "Perforación con material estéril de un solo uso y una joya de inicio pensada para cada zona. Dinos cuál tienes en mente y te contamos cómo es.",
      resumen: "Con material estéril de un solo uso y la joya adecuada a cada zona.",
      pasos: [
        { titulo: "Nos escribes", texto: "Dinos la zona y, si la tienes, una foto del piercing o de la joya que te gusta." },
        { titulo: "Preparación", texto: "En la cita se mira la zona, eliges la joya y se marca el punto exacto antes de perforar." },
        { titulo: "Perforación", texto: "Con aguja estéril de un solo uso. Es rápido: lo que más tiempo lleva es prepararlo bien." },
        { titulo: "Cuidados", texto: "Te explicamos cómo limpiarlo y qué evitar mientras cura, que depende de la zona." }
      ],
      puntos: [
        { dato: "Cita", valor: "Previa, por WhatsApp" },
        { dato: "Quién", valor: null },             // PROVISIONAL: pendiente de confirmar
        { dato: "Curación", valor: "Semanas en el lóbulo, meses en el cartílago" }
      ],
      // FUENTE: fotos oficiales del estudio (05/10/2026). Sin artista: el
      // estudio no dice quién los hace. Las que enseñan la cara salen
      // porque ya están en su Instagram; pendiente de que el estudio
      // confirme que el permiso de cada persona cubre también la web.
      // La primera es la de la cabecera de la página.
      fotos: [
        { id: "pi-2", artista: "", titulo: "Nostril doble",
          alt: "Nostril doble: dos bolitas juntas en el lateral de la nariz, en blanco y negro.",
          img: "pi-2", ratio: 0.5629 },
        { id: "pi-10", artista: "", titulo: "Industrial",
          alt: "Industrial: una barra recta que cruza la parte de arriba de la oreja, en blanco y negro.",
          img: "pi-10", ratio: 0.5954 },
        { id: "pi-4", artista: "", titulo: "Smiley",
          alt: "Smiley: una bolita que asoma sobre los dientes de arriba al sonreír, en blanco y negro.",
          img: "pi-4", ratio: 0.7692 },
        { id: "pi-1", artista: "", titulo: "",
          alt: "Nueve piercings en un mosaico: labio, cejas, orejas, septum y nariz.",
          img: "pi-1", ratio: 0.562 },
        { id: "pi-8", artista: "", titulo: "Ceja y nariz",
          alt: "Chica con flequillo, con una barra en la ceja, un aro en la nariz y una estrella pequeña bajo el ojo, en blanco y negro.",
          img: "pi-8", ratio: 0.5782 },
        { id: "pi-3", artista: "", titulo: "Ombligo",
          alt: "Piercing de ombligo con una barra curva de bola, sobre unos vaqueros.",
          img: "pi-3", ratio: 0.8 },
        { id: "pi-5", artista: "", titulo: "Labret vertical",
          alt: "Labret vertical: una barra que sale por el borde del labio de abajo y por debajo de él, en blanco y negro.",
          img: "pi-5", ratio: 0.7574 },
        { id: "pi-6", artista: "", titulo: "Cejas",
          alt: "Un piercing en cada ceja, visto de lado, de tres cuartos y de frente.",
          img: "pi-6", ratio: 0.562 },
        { id: "pi-11", artista: "", titulo: "Lóbulo doble",
          alt: "Dos bolitas en el lóbulo, una encima de otra, de perfil, en blanco y negro.",
          img: "pi-11", ratio: 0.5742 },
        { id: "pi-9", artista: "", titulo: "Ceja horizontal",
          alt: "Ceja horizontal: dos bolitas a lo largo de la ceja, en blanco y negro.",
          img: "pi-9", ratio: 0.5748 },
        { id: "pi-7", artista: "", titulo: "Lóbulo",
          alt: "Una bolita en el lóbulo, de perfil, en blanco y negro.",
          img: "pi-7", ratio: 0.6061 }
      ],
      mensaje: "Hola, os escribo desde la web. Quiero hacerme un piercing en: ",
      boton: "Pedir cita para un piercing",
      meta: {
        titulo: "Piercing en A Coruña · Loco Blow Tattoo",
        descripcion: "Piercing con cita previa en A Coruña: material estéril de un solo uso, joya de inicio adecuada a cada zona y cuidados explicados. Pide cita por WhatsApp."
      },
      preguntas: [
        {
          // PROVISIONAL: pendiente de confirmar vuestra política con menores
          pregunta: "¿Puedo hacerme un piercing si soy menor?",
          respuesta: "Solo con el consentimiento por escrito de tu madre, tu padre o tu tutor, y con esa persona presente en la cita."
        },
        {
          // PROVISIONAL: pendiente de confirmar
          pregunta: "¿Cuánto tarda en curar?",
          respuesta: "Depende de la zona. Un lóbulo suele curar en unas semanas; un cartílago puede llevar varios meses. En la cita te decimos lo del tuyo."
        },
        {
          pregunta: "¿Duele?",
          respuesta: "Es un pinchazo de un segundo. Lo que más se nota son los días siguientes, sobre todo en el cartílago, que queda sensible mientras cura."
        },
        {
          // PROVISIONAL: pendiente de confirmar la técnica
          pregunta: "¿Lo hacéis con pistola?",
          respuesta: "No: con aguja estéril de un solo uso. La aguja corta limpio y cura mejor; la pistola aprieta el tejido y no se puede esterilizar igual."
        },
        {
          // PROVISIONAL: pendiente de confirmar el material de las joyas
          pregunta: "¿Qué joya me ponéis?",
          respuesta: "Una joya de inicio de material apto para un piercing recién hecho, algo más larga de lo normal para dejar sitio a la hinchazón. La eliges en la cita según la zona."
        },
        {
          pregunta: "¿Cuándo puedo cambiar la joya?",
          respuesta: "Cuando esté curado del todo, no antes. El primer cambio, mejor en el estudio: a veces hay que acortar la barra cuando baja la hinchazón."
        },
        {
          pregunta: "¿Y si se me pone rojo o se inflama?",
          respuesta: "Los primeros días es normal. Si va a más, escríbenos con una foto. Si tienes fiebre o sale pus, ve al médico y no te quites la joya por tu cuenta. En la guía de cuidados tienes lo que es normal y lo que no."
        }
      ]
    },
    {
      id: "laser", pagina: "laser", menu: "Láser",
      // FUENTE: el estudio (06/10/2026), el mismo número que piercing.
      whatsapp: "34655578432",
      etiqueta: "Láser", nombre: "Eliminación de tatuajes con láser",
      titular: "Láser.",
      // FUENTE: el texto de Origen Láser (05/10/2026), tal cual, en la
      // cabecera. Sin el emoji del final: en la web saldría a color, y la web
      // es en blanco y negro. `cuerpo`, `remate` y `firma` solo los tiene
      // un servicio que se cuenta con más de una línea.
      entradilla: "Origen Láser, el principio del fin de tu tatuaje.",
      cuerpo: [
        "Riki, profesional al frente de Origen Láser desde 2020 y fundador de Loco Blow, cuenta con amplia experiencia y numerosos tratamientos realizados, tanto de eliminaciones completas como parciales para facilitar futuros cover-up.",
        "Trabaja con una Ink Hunter Master Nd:YAG Q-Switched, adaptando cada tratamiento a las características de cada piel y tatuaje."
      ],
      remate: "No lo pienses más, ese tribal de los 90 o el nombre de tu ex tienen los días contados.",
      firma: "Origen Láser.",
      firmaArtista: "riki",
      resumen: "Para quitar un tatuaje entero o aclararlo y taparlo con otro.",
      // PROVISIONAL: pendiente de que Riki revise los pasos
      pasos: [
        { titulo: "Valoración", texto: "Se mira el tatuaje: la tinta, los colores, los años que tiene y tu piel. Con eso se calcula cuántas sesiones hacen falta." },
        { titulo: "Sesión", texto: "El láser rompe la tinta en partículas muy pequeñas, que el cuerpo va eliminando solo. Cada sesión dura poco." },
        { titulo: "Descanso", texto: "Entre una sesión y otra pasan varias semanas: la piel se recupera y el cuerpo hace su parte." },
        { titulo: "Quitar o aclarar", texto: "Si lo que quieres es taparlo con otro tatuaje, a veces bastan unas pocas sesiones para aclararlo." }
      ],
      puntos: [
        // Quién y con qué equipo ya lo dice el texto de arriba.
        { dato: "Primera visita", valor: "Para valorar el tatuaje" },        // PROVISIONAL: pendiente de confirmar
        { dato: "Sesiones", valor: "Varias, con semanas de descanso entre una y otra" } // PROVISIONAL: pendiente de confirmar
      ],
      video: "laser",
      // Los antes y después, con el número de sesiones que dice la propia
      // foto. FUENTE: el estudio (05/10/2026), con la marca de Origen Láser.
      // PROVISIONAL: pendiente de que confirmen el permiso de cada persona.
      fotosTitulo: { etiqueta: "Antes y después", titular: "Sesión a sesión." },
      fotos: [
        { id: "laser-3", artista: "riki", titulo: "Original, 3 y 6 sesiones",
          alt: "Una luna con colgantes en el antebrazo y otro tatuaje pequeño en la muñeca: el original, a las 3 sesiones y a las 6, ya sin tinta.",
          img: "laser-3", ratio: 1.0 },
        { id: "laser-8", artista: "riki", titulo: "9 sesiones",
          alt: "Dos tatuajes antiguos en el brazo, un símbolo y una daga con calavera, antes y después de 9 sesiones.",
          img: "laser-8", ratio: 1.0 },
        { id: "laser-12", artista: "riki", titulo: "8 sesiones y cover-up",
          alt: "Un perro en la muñeca, aclarado con 8 sesiones y tapado después con un osito de peluche.",
          img: "laser-12", ratio: 1.0 },
        { id: "laser-9", artista: "riki", titulo: "8 sesiones",
          alt: "Letras árabes en el antebrazo, antes y después de 8 sesiones.",
          img: "laser-9", ratio: 1.0 },
        { id: "laser-4", artista: "riki", titulo: "4 sesiones",
          alt: "Un lobo pequeño en el dedo, antes y después de 4 sesiones.",
          img: "laser-4", ratio: 1.0 },
        { id: "laser-13", artista: "riki", titulo: "6 sesiones",
          alt: "Una línea de letras a lo largo de la columna, antes y después de 6 sesiones.",
          img: "laser-13", ratio: 1.0028 },
        { id: "laser-10", artista: "riki", titulo: "8 sesiones",
          alt: "Una estrella negra en el tobillo, antes y después de 8 sesiones.",
          img: "laser-10", ratio: 1.0 },
        { id: "laser-15", artista: "riki", titulo: "19 sesiones",
          alt: "Una cabeza de perro en línea en la pierna, antes y después de 19 sesiones.",
          img: "laser-15", ratio: 1.0009 },
        { id: "laser-5", artista: "riki", titulo: "6 sesiones",
          alt: "Una rama de flores de cerezo en la cadera, antes y después de 6 sesiones.",
          img: "laser-5", ratio: 1.0 },
        { id: "laser-11", artista: "riki", titulo: "11 sesiones",
          alt: "Unas iniciales en la cadera, antes y después de 11 sesiones.",
          img: "laser-11", ratio: 1.0 },
        { id: "laser-6", artista: "riki", titulo: "8 sesiones",
          alt: "La palabra «TRECE» en la muñeca, antes y después de 8 sesiones.",
          img: "laser-6", ratio: 1.0 },
        { id: "laser-14", artista: "riki", titulo: "10 sesiones",
          alt: "Unas coordenadas en el brazo, antes y después de 10 sesiones.",
          img: "laser-14", ratio: 1.0 },
        { id: "laser-7", artista: "riki", titulo: "4 sesiones",
          alt: "Un tatuaje pequeño en la espalda, junto al tirante, antes y después de 4 sesiones.",
          img: "laser-7", ratio: 1.0 }
      ],
      mensaje: "Hola, os escribo desde la web. Quiero información para quitar (o aclarar) un tatuaje con láser.",
      boton: "Preguntar por el láser",
      meta: {
        titulo: "Eliminación de tatuajes con láser en A Coruña · Loco Blow Tattoo",
        descripcion: "Quitar un tatuaje con láser en A Coruña, entero o aclarado para taparlo con otro. Primero valoramos la tinta y la piel. Infórmate por WhatsApp."
      },
      preguntas: [
        {
          // PROVISIONAL: pendiente de confirmar con el estudio
          pregunta: "¿Cuántas sesiones hacen falta para quitar un tatuaje?",
          respuesta: "Depende de la tinta, de los colores, de lo profundo que esté y de tu piel. En la primera visita se valora el tatuaje y se te dice cuántas sesiones calculamos y cada cuánto."
        },
        {
          // PROVISIONAL: pendiente de confirmar con el estudio
          pregunta: "¿Se quitan todos los colores?",
          respuesta: "El negro es el que mejor responde. Algunos colores cuestan más y hay tintas que no se van del todo: en la valoración te decimos qué esperar con el tuyo."
        },
        {
          // PROVISIONAL: pendiente de confirmar con el estudio
          pregunta: "¿Duele?",
          respuesta: "Molesta, más o menos según la zona. Se trabaja rápido y cada sesión dura poco."
        },
        {
          // PROVISIONAL: pendiente de que Riki confirme el tiempo entre sesiones
          pregunta: "¿Cada cuánto son las sesiones?",
          respuesta: "Se deja pasar varias semanas entre una y otra, normalmente entre seis y ocho: la piel tiene que curar y el cuerpo necesita ese tiempo para eliminar la tinta que ha roto el láser."
        },
        {
          // PROVISIONAL: pendiente de que Riki lo revise
          pregunta: "¿Deja cicatriz?",
          respuesta: "Bien hecho y bien cuidado, no suele dejarla. Lo que más ayuda es no arrancar las costras, no reventar las ampollas y no dar el sol a la zona mientras cura."
        },
        {
          pregunta: "¿Puedo tatuarme encima después?",
          respuesta: "Sí, es de lo más habitual: se aclara el tatuaje con unas sesiones y luego se tapa con otro. Aquí se hacen las dos cosas, así que lo planteamos juntos desde la primera visita."
        },
        {
          // PROVISIONAL: pendiente de que Riki lo revise
          pregunta: "¿Puedo hacerlo si estoy morena o en verano?",
          respuesta: "Mejor con la piel sin broncear: sobre una piel morena reciente hay más riesgo de que queden manchas. Si es verano, se puede, pero la zona tiene que ir tapada del sol entre sesiones."
        }
      ]
    },
    {
      id: "micropigmentacion", pagina: "micropigmentacion-capilar", menu: "Micropigmentación",
      etiqueta: "Micropigmentación", nombre: "Micropigmentación capilar",
      titular: "Micropigmentación capilar.",
      // FUENTE: Haroz, 24/09/2026 («micropigmentación capilar, que es lo que
      // tengo yo»).  PROVISIONAL: pendiente de que Haroz revise el texto.
      entradilla: "Pigmento en el cuero cabelludo, punto a punto, para que parezca pelo rapado donde falta. Sirve para disimular calvas y entradas, dar densidad al pelo fino o tapar cicatrices.",
      resumen: "Para disimular calvas y entradas, dar densidad o tapar cicatrices.",
      // PROVISIONAL: pendiente de que Haroz revise los pasos
      pasos: [
        { titulo: "Valoración", texto: "Se mira la zona, el tono de tu pelo y de tu piel, y se dibuja la línea que te va a quedar natural." },
        { titulo: "Sesiones", texto: "Se hace en varias sesiones, con unos días entre una y otra, para ir construyendo la densidad poco a poco." },
        { titulo: "Cuidados", texto: "Los primeros días hay que cuidar la zona. Te damos las pautas para que el pigmento asiente bien." },
        { titulo: "Repaso", texto: "Con los años el pigmento se aclara un poco. Un repaso lo deja como el primer día." }
      ],
      puntos: [
        { dato: "Quién", valor: "Haroz" },                                   // FUENTE: Haroz, 24/09/2026 · PROVISIONAL
        { dato: "Cita", valor: "Previa, con una valoración antes" },          // PROVISIONAL: pendiente de confirmar
        { dato: "Sesiones", valor: "Varias, con días de descanso entre una y otra" } // PROVISIONAL: pendiente de confirmar
      ],
      fotos: [
        // Un antes y después solo con permiso por escrito de la persona.
        // { id: "micro-1", artista: "haroz", titulo: "Entradas, tras 3 sesiones", alt: "…", img: "micro-1", ratio: 0.8 },
      ],
      mensaje: "Hola, os escribo desde la web. Quiero información sobre la micropigmentación capilar.",
      boton: "Pedir una valoración",
      meta: {
        titulo: "Micropigmentación capilar en A Coruña · Loco Blow Tattoo",
        descripcion: "Micropigmentación capilar en A Coruña para disimular calvas y entradas, dar densidad al pelo o tapar cicatrices. Valoración previa y cita por WhatsApp."
      },
      preguntas: [
        {
          // PROVISIONAL: pendiente de que Haroz lo revise
          pregunta: "¿Se nota que es pigmento?",
          respuesta: "Bien hecha, parece pelo rapado. Por eso se trabaja con puntos muy pequeños y un tono elegido para tu piel."
        },
        {
          // PROVISIONAL: pendiente de que Haroz lo revise
          pregunta: "¿Cuánto dura?",
          respuesta: "Años. Con el tiempo el pigmento se aclara y se hace un repaso para devolverle el tono."
        },
        {
          // PROVISIONAL: pendiente de que Haroz lo revise
          pregunta: "¿Sirve si tengo el pelo largo?",
          respuesta: "Sí: da densidad en las zonas donde se transparenta el cuero cabelludo, aunque no lleves el pelo rapado."
        },
        {
          // PROVISIONAL: pendiente de que Haroz lo revise
          pregunta: "¿Cuántas sesiones hacen falta?",
          respuesta: "Normalmente dos o tres, con unos días entre una y otra: la densidad se va construyendo poco a poco para que quede natural. En la valoración te decimos las que necesita tu caso."
        },
        {
          pregunta: "¿Duele?",
          respuesta: "Molesta poco: el pigmento va muy superficial, mucho menos profundo que un tatuaje. La mayoría lo describe como un picor o un rascado."
        },
        {
          // PROVISIONAL: pendiente de que Haroz lo revise
          pregunta: "¿Sirve también para mujeres?",
          respuesta: "Sí. En mujeres se usa sobre todo para dar densidad donde el pelo clarea, en la raya o en la coronilla, sin raparse."
        },
        {
          pregunta: "¿Y si no me gusta, se puede quitar?",
          respuesta: "Se puede aclarar o quitar con láser, que también hacemos en el estudio. Por eso se empieza con una valoración y se va construyendo por sesiones: se ajusta antes de llegar al final."
        }
      ]
    }
  ],

  /* --- 4. ESTILOS ---------------------------------------------------------- */
  // La página de tatuajes va por estilos, no por tatuadores: una sección por
  // estilo, en este orden, con sus mejores fotos.
  // FUENTE: las cuatro categorías oficiales del estudio, con sus fotos y
  // su tatuador (05/10/2026). Los estilos de antes (color, dotwork, otros
  // estilos) ya no salen: sus trabajos quedan con `publicar: false`.
  //
  // `id` es la dirección de la sección: <dominio>/tatuajes#dotwork
  // `antes` son direcciones de listas anteriores (la de la biografía de
  // Instagram) que llevan aquí: enlaces ya compartidos no se rompen.
  //
  // Un estilo sin ningún trabajo todavía sale igual, con su hueco y su
  // botón de WhatsApp, pero al final de la página: en cuanto tenga su
  // primera foto, ocupa su sitio en este orden.
  estilos: [
    { id: "realismo",    nombre: "Realismo y microrrealismo", antes: ["black-and-grey", "microrealismo", "microrrealismo"],
      descripcion: "Retratos, animales y figuras en negro y grises, con la sombra trabajada hasta que parecen una foto. Y en pequeño, el mismo detalle en unos centímetros." },
    { id: "anime",       nombre: "Anime",
      descripcion: "Personajes de anime y manga fieles al original: a todo color o en negro y grises, del antebrazo a la manga entera." },
    { id: "tradicional", nombre: "Tradicional",
      descripcion: "Línea negra gruesa, color plano y motivos de siempre: barcos, caballos, retratos y flores, hechos para durar." },
    { id: "fine-line",   nombre: "Fine line y puntillismo", antes: ["puntillismo", "dotwork", "fineline", "lineales"],
      descripcion: "Línea fina y sombra hecha a puntos: piezas pequeñas y delicadas, flores, personajes y letras, y piezas grandes en puntillismo." }
  ],

  /* --- 5. OBRAS · los trabajos de tatuaje -------------------------------- */
  // En el orden en que se ven. Cada uno es una foto (`img`) o un reel
  // (`video`, la clave de la lista 8), y lleva su estilo y quién lo hizo
  // (`artista`, de la lista 6; vacío si no se sabe).
  // En la rejilla van de tres en tres: se alternan fotos y reels, y las
  // piezas que se parecen van juntas.
  //
  // Cuando llegue una foto (tools/originales/tatuajes/<estilo>/):
  //   1. tools/fetch-images.py la convierte y dice su proporción.
  //   2. Aquí, una línea: `estilo`, `artista`, un `titulo` corto (si no se
  //      sabe qué es, mejor vacío), un `alt` que describa lo que se ve de
  //      verdad (lo oye quien usa lector de pantalla), `img` con el nombre
  //      base y `ratio`. `foco` (opcional) mueve el recorte de la miniatura:
  //      "50% 20%" la sube. A pantalla completa la foto se ve entera.
  //   3. python tools/sync-contenido.py
  //
  // Una foto se comparte con su dirección: <dominio>/tatuajes#obra-bg-1.
  // Por eso el `id` no cambia aunque la foto cambie de estilo.
  //
  // FUENTE: las de las cuatro categorías son las oficiales del estudio
  // (05/10/2026). Las de antes (fotos y reels sacados de Instagram el 24 y
  // 25/09/2026) quedan al final con `publicar: false`.
  //
  // `publicar: false` deja un trabajo fuera de la web sin borrarlo.
  // PROVISIONAL: el estilo de cada pieza lo ha puesto la web por su técnica
  // (30/09/2026); pendiente de que el estudio lo revise.
  obras: [
    // --- Realismo y microrrealismo (oficial, 05/10/2026): Haroz. Las piezas
    // grandes y las pequeñas, alternadas, para que se vean las dos cosas.
    { id: "haroz-2", estilo: "realismo", artista: "haroz", titulo: "Dalí",
      alt: "Retrato de Salvador Dalí con su bigote, en negro y grises en el hombro.",
      img: "haroz-2", ratio: 0.8127 },
    { id: "haroz-19", estilo: "realismo", artista: "haroz", titulo: "Bulldog francés",
      alt: "Bulldog francés pequeño, en microrrealismo en el antebrazo.",
      img: "haroz-19", ratio: 0.8025 },
    { id: "haroz-7", estilo: "realismo", artista: "haroz", titulo: "Tigre",
      alt: "Tigre rugiendo entre hojas, en realismo en negro y grises en el antebrazo.",
      img: "haroz-7", ratio: 0.8387 },
    { id: "haroz-10", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Chica maquillada de payaso que guiña un ojo y saca la lengua, en negro y grises en el antebrazo.",
      img: "haroz-10", ratio: 0.8013 },
    { id: "haroz-36", estilo: "realismo", artista: "haroz", titulo: "Teckel",
      alt: "Teckel con la lengua fuera, pequeño, en microrrealismo.",
      img: "haroz-36", ratio: 0.7667 },
    { id: "haroz-8", estilo: "realismo", artista: "haroz", titulo: "Virgen",
      alt: "Virgen rezando, con el manto sobre la cabeza y un rosario entre las manos, en negro y grises en el brazo.",
      img: "haroz-8", ratio: 0.7561 },
    // Los primeros premios (06/10/2026): las fotos con el premio en la mano,
    // junto a las de realismo. En la segunda fila, no de portada.
    { id: "haroz-30", estilo: "realismo", artista: "haroz", titulo: "Primer premio",
      alt: "Haroz y su cliente en una convención de tatuaje, con el trofeo del primer premio.",
      img: "haroz-30", ratio: 0.5625 },
    { id: "haroz-32", estilo: "realismo", artista: "haroz", titulo: "Primer premio",
      alt: "Haroz con su cliente, sentado y con la placa del primer premio, entre el público de una convención de tatuaje.",
      img: "haroz-32", ratio: 1.0025 },
    { id: "haroz-9", estilo: "realismo", artista: "haroz", titulo: "Retrato",
      alt: "Retrato realista de un hombre mayor en negro y grises en el antebrazo, con las arrugas marcadas a sombra.",
      img: "haroz-9", ratio: 0.7716 },
    { id: "haroz-22", estilo: "realismo", artista: "haroz", titulo: "Pastor alemán",
      alt: "Pastor alemán con la lengua fuera, en realismo en negro y grises en el antebrazo.",
      img: "haroz-22", ratio: 0.8812 },
    { id: "haroz-26", estilo: "realismo", artista: "haroz", titulo: "Juego de tronos",
      alt: "Tyrion, de Juego de tronos, en negro y grises en el brazo, con otro rostro encima.",
      img: "haroz-26", ratio: 0.75 },
    { id: "haroz-38", estilo: "realismo", artista: "haroz", titulo: "Gato esfinge",
      alt: "Gato esfinge de ojos verdes, pequeño, en microrrealismo en el antebrazo.",
      img: "haroz-38", ratio: 0.7614 },
    { id: "haroz-12", estilo: "realismo", artista: "haroz", titulo: "Lobo y rosas",
      alt: "Lobo en negro y grises entre rosas rojas, en el hombro.",
      img: "haroz-12", ratio: 0.8013 },
    { id: "haroz-21", estilo: "realismo", artista: "haroz", titulo: "Seat 600",
      alt: "Un Seat 600 con su matrícula antigua, en negro y grises en la pierna.",
      img: "haroz-21", ratio: 0.9169 },
    { id: "haroz-5", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Mujer con maquillaje de payaso que fuma con la mano en la boca, en negro y grises en el gemelo.",
      img: "haroz-5", ratio: 0.811 },
    { id: "haroz-15", estilo: "realismo", artista: "haroz", titulo: "Pitbull",
      alt: "Cabeza de pitbull, pequeña, en microrrealismo en el antebrazo.",
      img: "haroz-15", ratio: 0.8263 },
    { id: "haroz-3", estilo: "realismo", artista: "haroz", titulo: "Pennywise",
      alt: "Pennywise, el payaso de «It», sonriendo, en negro y grises en el antebrazo.",
      img: "haroz-3", ratio: 0.7861 },
    { id: "haroz-20", estilo: "realismo", artista: "haroz", titulo: "León",
      alt: "León entre flores, en negro y grises en el antebrazo.",
      img: "haroz-20", ratio: 0.7512 },
    { id: "haroz-17", estilo: "realismo", artista: "haroz", titulo: "Galgo",
      alt: "Cabeza de galgo, pequeña, en microrrealismo en el antebrazo.",
      img: "haroz-17", ratio: 0.8121 },
    { id: "haroz-23", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Rostro de mujer con corona y un niño ángel, en negro y grises en el antebrazo.",
      img: "haroz-23", ratio: 0.7069 },
    { id: "haroz-6", estilo: "realismo", artista: "haroz", titulo: "Lobo",
      alt: "Lobo enseñando los dientes, en realismo en negro y grises en el antebrazo.",
      img: "haroz-6", ratio: 0.804 },
    { id: "haroz-13", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Rostro de anciano que sale de un árbol, en negro y grises en el antebrazo.",
      img: "haroz-13", ratio: 0.8045 },
    { id: "haroz-35", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Perro pequeño de pelo largo, sonriendo, en microrrealismo en la pierna.",
      img: "haroz-35", ratio: 0.7599 },
    { id: "haroz-31", estilo: "realismo", artista: "haroz", titulo: "Brazo entero",
      alt: "Brazo entero en negro y grises: un rostro de mujer partido con el de un tigre y, debajo, un león.",
      img: "haroz-31", ratio: 0.7117 },
    { id: "haroz-4", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Mujer de ojos azules con sombrero, en realismo en el gemelo.",
      img: "haroz-4", ratio: 0.8013 },
    { id: "haroz-27", estilo: "realismo", artista: "haroz", titulo: "Retrato",
      alt: "Retrato realista de un hombre sonriendo, en negro y grises en el muslo.",
      img: "haroz-27", ratio: 0.75 },
    // El resto de realismo que mandó el estudio (06/10/2026).
    { id: "haroz-1", estilo: "realismo", artista: "haroz", titulo: "Gato",
      alt: "Cara de gato de ojos grandes, en realismo en negro y grises en el antebrazo.",
      img: "haroz-1", ratio: 1.0152 },
    { id: "haroz-11", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Una figura con un halo de luz, en negro y grises a lo largo del antebrazo.",
      img: "haroz-11", ratio: 0.7667 },
    { id: "haroz-14", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Una calavera con sombrero y chaqueta, en negro y grises en el brazo.",
      img: "haroz-14", ratio: 0.75 },
    { id: "haroz-16", estilo: "realismo", artista: "haroz", titulo: "Galgo",
      alt: "Cabeza de galgo pequeña, en microrrealismo en la pierna.",
      img: "haroz-16", ratio: 0.9568 },
    { id: "haroz-18", estilo: "realismo", artista: "haroz", titulo: "Chihuahua",
      alt: "Un chihuahua pequeño, en microrrealismo en el antebrazo.",
      img: "haroz-18", ratio: 0.8168 },
    { id: "haroz-24", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Un perro con su nombre en letras grandes encima, en negro y grises en el antebrazo.",
      img: "haroz-24", ratio: 0.7494 },
    { id: "haroz-25", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Manos rezando con un rosario y una rosa, en negro y grises en el antebrazo.",
      img: "haroz-25", ratio: 0.75 },
    { id: "haroz-28", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Rostros que se entrelazan, en negro y grises en el antebrazo.",
      img: "haroz-28", ratio: 0.8 },
    { id: "haroz-29", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "Retrato de un hombre con cuernos de diablo que saca la lengua, en negro y grises en el muslo.",
      img: "haroz-29", ratio: 0.75 },
    { id: "haroz-33", estilo: "realismo", artista: "haroz", titulo: "Retrato",
      alt: "Retrato de un hombre de pelo rizado con otro rostro debajo, en negro y grises en el muslo.",
      img: "haroz-33", ratio: 0.8078 },
    { id: "haroz-34", estilo: "realismo", artista: "haroz", titulo: "",
      alt: "El mismo perro pequeño de pelo largo, visto de frente, en microrrealismo.",
      img: "haroz-34", ratio: 0.7633 },
    { id: "haroz-37", estilo: "realismo", artista: "haroz", titulo: "Gato esfinge",
      alt: "El gato esfinge visto en el brazo entero, con la mano al fondo.",
      img: "haroz-37", ratio: 0.8363 },

    // --- Anime (oficial, 05/10/2026): Ezel a color y Maou en negro y grises,
    // uno y uno, para que se vean los dos registros.
    { id: "ezel-1", estilo: "anime", artista: "ezel", titulo: "Rengoku",
      alt: "Rengoku, de Kimetsu no Yaiba, a color en el antebrazo, con su frase en japonés y la parte de abajo en negro y grises.",
      img: "ezel-1", ratio: 0.75 },
    { id: "maou-3", estilo: "anime", artista: "maou", titulo: "Attack on Titan",
      alt: "Mikasa y Eren, de Attack on Titan, en negro y grises en el antebrazo, separados por un trazo de luz.",
      img: "maou-3", ratio: 0.755 },
    { id: "ezel-4", estilo: "anime", artista: "ezel", titulo: "Shenron",
      alt: "Shenron, el dragón de Dragon Ball, en verde con los ojos rojos y las bolas de dragón alrededor, a color en la pierna.",
      img: "ezel-4", ratio: 0.75 },
    { id: "maou-4", estilo: "anime", artista: "maou", titulo: "Ulquiorra",
      alt: "Ulquiorra, de Bleach, en viñetas de manga en negro y grises en el antebrazo, con su frase «What… is a heart».",
      img: "maou-4", ratio: 0.8175 },
    { id: "ezel-8", estilo: "anime", artista: "ezel", titulo: "Luffy, Gear 4",
      alt: "Luffy en su Gear 4, de One Piece, a color en el gemelo, con humo morado detrás.",
      img: "ezel-8", ratio: 0.75 },
    { id: "maou-8", estilo: "anime", artista: "maou", titulo: "Zoro",
      alt: "Zoro, de One Piece, empuñando su katana, en negro y grises del hombro al codo.",
      img: "maou-8", ratio: 0.8413 },
    { id: "ezel-2", estilo: "anime", artista: "ezel", titulo: "Crocodile",
      alt: "Crocodile, de One Piece, con su cicatriz y el garfio dorado, en negro y grises con toques de color en el antebrazo.",
      img: "ezel-2", ratio: 0.75 },
    { id: "maou-7", estilo: "anime", artista: "maou", titulo: "",
      alt: "Franja horizontal con una mirada de anime de ojos rasgados, en negro y grises con un tono rojizo, en el brazo.",
      img: "maou-7", ratio: 0.8892 },
    { id: "ezel-3", estilo: "anime", artista: "ezel", titulo: "Manga de One Piece",
      alt: "Brazo entero a color con personajes de One Piece: Shanks arriba, con su pelo rojo, y los demás hasta la muñeca.",
      img: "ezel-3", ratio: 0.6937 },
    { id: "maou-2", estilo: "anime", artista: "maou", titulo: "",
      alt: "Personaje de anime sonriente bajo una corona, en negro y grises en el antebrazo, entre rayos.",
      img: "maou-2", ratio: 0.8387 },
    { id: "ezel-5", estilo: "anime", artista: "ezel", titulo: "",
      alt: "Chica pelirroja de ojos azules con una luna en la cabeza, un cangrejo y olas, a color en el gemelo.",
      img: "ezel-5", ratio: 0.75 },
    { id: "maou-5", estilo: "anime", artista: "maou", titulo: "",
      alt: "Guerrero de anime con casco y gesto decidido, en negro y grises en el antebrazo, entre trazos de energía.",
      img: "maou-5", ratio: 0.7738 },
    { id: "ezel-6", estilo: "anime", artista: "ezel", titulo: "Gabumon",
      alt: "Gabumon, de Digimon, y su digivice, a color sobre una mancha roja y naranja, en la pierna.",
      img: "ezel-6", ratio: 0.75 },
    { id: "maou-1", estilo: "anime", artista: "maou", titulo: "",
      alt: "Dos personajes de anime en negro y grises en el antebrazo: uno con el ceño fruncido arriba y otro con cinta en la frente abajo.",
      img: "maou-1", ratio: 0.7588 },
    { id: "ezel-7", estilo: "anime", artista: "ezel", titulo: "Deadpool",
      alt: "Deadpool en pequeño junto a otro personaje, dentro de un corazón y con las palabras «kiss me», a color en la pierna.",
      img: "ezel-7", ratio: 0.75 },
    { id: "maou-6", estilo: "anime", artista: "maou", titulo: "",
      alt: "Bestia de anime con colmillos, envuelta en energía, en negro y grises con un tono rojizo en el antebrazo.",
      img: "maou-6", ratio: 0.7738 },
    { id: "maou-9", estilo: "anime", artista: "maou", titulo: "",
      alt: "Bestia japonesa entre nubes y olas, en negro y grises en el antebrazo.",
      img: "maou-9", ratio: 0.8163 },

    // --- Tradicional (oficial, 05/10/2026): Fernando. Primero lo de aquí.
    { id: "fernando-8", estilo: "tradicional", artista: "fer", titulo: "Barco pesquero",
      alt: "Barco pesquero con su matrícula de A Coruña, el sol detrás y una flor delante, en tradicional a color en la pierna.",
      img: "fernando-8", ratio: 0.7617 },
    { id: "fernando-2", estilo: "tradicional", artista: "fer", titulo: "Retrato",
      alt: "Retrato de un hombre con traje y corbata en tradicional, dentro de un óvalo con el mar, un ancla y flores rojas, en el antebrazo.",
      img: "fernando-2", ratio: 0.8041 },
    { id: "fernando-5", estilo: "tradicional", artista: "fer", titulo: "Caballito de mar",
      alt: "Caballito de mar en rojo y negro, con burbujas, en tradicional en el antebrazo.",
      img: "fernando-5", ratio: 0.9367 },
    { id: "fernando-6", estilo: "tradicional", artista: "fer", titulo: "",
      alt: "Anciana con pañuelo, mantón y bastón que lleva un fardo en la cabeza, en tradicional en negro en el antebrazo.",
      img: "fernando-6", ratio: 0.7829 },
    { id: "fernando-4", estilo: "tradicional", artista: "fer", titulo: "Caballo y herradura",
      alt: "Cabeza de caballo dentro de una herradura, con flores rojas, en tradicional a color en el brazo.",
      img: "fernando-4", ratio: 0.8886 },
    { id: "fernando-3", estilo: "tradicional", artista: "fer", titulo: "Sol y máscara",
      alt: "Un sol con cara sobre una máscara sonriente, en tradicional en negro en el brazo.",
      img: "fernando-3", ratio: 0.7934 },
    { id: "fernando-1", estilo: "tradicional", artista: "fer", titulo: "",
      alt: "Cabeza de mujer sobre las olas, con flores en el pelo y dos mariposas, en tradicional a color en el brazo.",
      img: "fernando-1", ratio: 0.8024 },
    { id: "fernando-7", estilo: "tradicional", artista: "fer", titulo: "",
      alt: "Figura con máscara, tocado de plumas y traje de colores que toca un cuerno, en tradicional a color en la pierna.",
      img: "fernando-7", ratio: 0.7617 },

    // --- Fine line y puntillismo (oficial, 05/10/2026): Haroz, en su cuenta
    // de lineales. Línea fina y punteado alternados, grande y pequeño.
    { id: "lineal-22", estilo: "fine-line", artista: "haroz-lineales", titulo: "Leopardo",
      alt: "Cabeza de leopardo rugiendo en puntillismo en el pecho, junto a una rosa y una rama de olivo.",
      img: "lineal-22", ratio: 0.7618 },
    { id: "lineal-6", estilo: "fine-line", artista: "haroz-lineales", titulo: "Retrato en línea",
      alt: "Tres figuras abrazadas dibujadas solo con línea fina, sin sombra, en el muslo.",
      img: "lineal-6", ratio: 0.7628 },
    { id: "lineal-23", estilo: "fine-line", artista: "haroz-lineales", titulo: "Torre de Hércules",
      alt: "La Torre de Hércules en puntillismo, pequeña, en el antebrazo.",
      img: "lineal-23", ratio: 0.7796 },
    { id: "lineal-3", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mariposa",
      alt: "Mariposa con las alas abiertas en línea fina y sombra punteada, en el brazo.",
      img: "lineal-3", ratio: 0.8221 },
    { id: "lineal-79", estilo: "fine-line", artista: "haroz-lineales", titulo: "Flor en línea",
      alt: "Una flor de pétalos largos en línea fina que baja del hombro por la espalda.",
      img: "lineal-79", ratio: 0.7528 },
    { id: "lineal-92", estilo: "fine-line", artista: "haroz-lineales", titulo: "Pesadilla antes de Navidad",
      alt: "Jack y Sally sobre la colina en espiral, recortados contra la luna, en puntillismo en el brazo.",
      img: "lineal-92", ratio: 0.75 },
    { id: "lineal-13", estilo: "fine-line", artista: "haroz-lineales", titulo: "Corazón y flores",
      alt: "Corazón anatómico del que salen flores, en línea fina y punteado en el antebrazo.",
      img: "lineal-13", ratio: 0.7852 },
    { id: "lineal-37", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mickey",
      alt: "Mickey Mouse en puntillismo, de cuerpo entero, en el antebrazo.",
      img: "lineal-37", ratio: 0.8225 },
    { id: "lineal-90", estilo: "fine-line", artista: "haroz-lineales", titulo: "Skyline",
      alt: "La silueta de una ciudad, con sus cúpulas y torres, en línea fina alrededor del brazo.",
      img: "lineal-90", ratio: 0.7677 },
    { id: "lineal-83", estilo: "fine-line", artista: "haroz-lineales", titulo: "Casco espartano",
      alt: "Casco espartano en puntillismo, con todo el volumen hecho a puntos, en el antebrazo.",
      img: "lineal-83", ratio: 0.9256 },
    { id: "lineal-75", estilo: "fine-line", artista: "haroz-lineales", titulo: "Girasol",
      alt: "Girasol en línea fina y sombra suave en el brazo.",
      img: "lineal-75", ratio: 0.7647 },
    { id: "lineal-62", estilo: "fine-line", artista: "haroz-lineales", titulo: "Winnie the Pooh",
      alt: "Winnie the Pooh e Ígor abrazados, en puntillismo en el antebrazo.",
      img: "lineal-62", ratio: 0.8381 },
    { id: "lineal-11", estilo: "fine-line", artista: "haroz-lineales", titulo: "Vieira",
      alt: "Una concha de vieira en línea fina y punteado en el brazo.",
      img: "lineal-11", ratio: 0.7955 },
    { id: "lineal-68", estilo: "fine-line", artista: "haroz-lineales", titulo: "Trifuerza",
      alt: "La Trifuerza de Zelda con sus alas, en puntillismo en la pierna.",
      img: "lineal-68", ratio: 0.7716 },
    { id: "lineal-5", estilo: "fine-line", artista: "haroz-lineales", titulo: "Montaña",
      alt: "Montañas, un bosque y un camino dentro de un triángulo, en línea fina y punteado en el brazo.",
      img: "lineal-5", ratio: 0.7133 },
    { id: "lineal-19", estilo: "fine-line", artista: "haroz-lineales", titulo: "Los amantes",
      alt: "«Los amantes» de Magritte, dos figuras besándose con la cabeza tapada, en puntillismo en el antebrazo.",
      img: "lineal-19", ratio: 0.7484 },
    { id: "lineal-54", estilo: "fine-line", artista: "haroz-lineales", titulo: "Flor de loto",
      alt: "Flor de loto ornamental con puntos y adornos en línea fina, en la pierna.",
      img: "lineal-54", ratio: 0.7746 },
    { id: "lineal-69", estilo: "fine-line", artista: "haroz-lineales", titulo: "Goku",
      alt: "Goku de niño sobre su nube, de Dragon Ball, en puntillismo en el antebrazo.",
      img: "lineal-69", ratio: 0.7826 },
    { id: "lineal-16", estilo: "fine-line", artista: "haroz-lineales", titulo: "Globo",
      alt: "Un globo aerostático en línea fina y punteado en el antebrazo.",
      img: "lineal-16", ratio: 0.7552 },
    { id: "lineal-91", estilo: "fine-line", artista: "haroz-lineales", titulo: "Aku Aku",
      alt: "La máscara Aku Aku de Crash Bandicoot, con sus plumas, en puntillismo en la pierna.",
      img: "lineal-91", ratio: 0.7428 },
    { id: "lineal-24", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrinas",
      alt: "Dos golondrinas en vuelo, en línea fina y punteado en el antebrazo.",
      img: "lineal-24", ratio: 0.7945 },
    { id: "lineal-63", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mafalda",
      alt: "Mafalda gritando con un periódico en las manos, en línea fina y negro en el brazo.",
      img: "lineal-63", ratio: 0.7731 },
    { id: "lineal-116", estilo: "fine-line", artista: "haroz-lineales", titulo: "Memento mori",
      alt: "«Memento mori» en letra caligráfica grande a lo largo del antebrazo.",
      img: "lineal-116", ratio: 0.7633 },
    { id: "lineal-53", estilo: "fine-line", artista: "haroz-lineales", titulo: "La señora Potts y Chip",
      alt: "La señora Potts y Chip, de La bella y la bestia, uno en cada antebrazo de dos personas, en línea fina.",
      img: "lineal-53", ratio: 0.7667 },
    // Todos los demás lineales (06/10/2026): «nos buscan mucho por ahí,
    // incluso las palabras». Los nombres de clientes no van en el `alt`.
    { id: "lineal-1", estilo: "fine-line", artista: "haroz-lineales", titulo: "Pájaros",
      alt: "Tres pájaros pequeños en vuelo, en línea fina en la pierna.",
      img: "lineal-1", ratio: 0.7903 },
    { id: "lineal-2", estilo: "fine-line", artista: "haroz-lineales", titulo: "Vive",
      alt: "La palabra «VIVE» en letra fina junto a un pajarito, en el tobillo.",
      img: "lineal-2", ratio: 0.7337 },
    { id: "lineal-4", estilo: "fine-line", artista: "haroz-lineales", titulo: "Blue",
      alt: "La palabra «BLUE» en letras rojas, de arriba abajo, en el antebrazo.",
      img: "lineal-4", ratio: 0.7726 },
    { id: "lineal-7", estilo: "fine-line", artista: "haroz-lineales", titulo: "Always",
      alt: "La frase «After all this time? Always.» en letra de máquina en el brazo.",
      img: "lineal-7", ratio: 0.7781 },
    { id: "lineal-8", estilo: "fine-line", artista: "haroz-lineales", titulo: "Red Hot Chili Peppers",
      alt: "El logo de Red Hot Chili Peppers, la estrella roja con el nombre alrededor, en el gemelo.",
      img: "lineal-8", ratio: 0.7919 },
    { id: "lineal-9", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Un nombre pequeño en letra cursiva fina en la cadera.",
      img: "lineal-9", ratio: 0.8651 },
    { id: "lineal-10", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una letra «L» pequeña en el pie.",
      img: "lineal-10", ratio: 0.7575 },
    { id: "lineal-12", estilo: "fine-line", artista: "haroz-lineales", titulo: "Abrazo",
      alt: "Una pareja abrazada dibujada solo con línea fina, en el antebrazo.",
      img: "lineal-12", ratio: 0.7274 },
    { id: "lineal-14", estilo: "fine-line", artista: "haroz-lineales", titulo: "Muchísimo",
      alt: "La palabra «muchísimo» en letra cursiva fina en el antebrazo.",
      img: "lineal-14", ratio: 0.7781 },
    { id: "lineal-15", estilo: "fine-line", artista: "haroz-lineales", titulo: "Constelación",
      alt: "Una constelación de puntos unidos por líneas finas, en el antebrazo.",
      img: "lineal-15", ratio: 0.7919 },
    { id: "lineal-17", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mariposas",
      alt: "Dos mariposas pequeñas en línea fina y sombra, en el antebrazo.",
      img: "lineal-17", ratio: 0.9781 },
    { id: "lineal-18", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Dos figuras besándose con la cabeza tapada, en puntillismo pequeño en el antebrazo.",
      img: "lineal-18", ratio: 0.7591 },
    { id: "lineal-20", estilo: "fine-line", artista: "haroz-lineales", titulo: "Luna",
      alt: "Un rostro dentro de una luna creciente, en puntillismo en la pierna.",
      img: "lineal-20", ratio: 0.9213 },
    { id: "lineal-21", estilo: "fine-line", artista: "haroz-lineales", titulo: "Planetas",
      alt: "Planetas en fila, de mayor a menor, hechos a puntos en el antebrazo.",
      img: "lineal-21", ratio: 0.8072 },
    { id: "lineal-25", estilo: "fine-line", artista: "haroz-lineales", titulo: "Eunoia",
      alt: "La palabra «Eunoia» en letra fina en el antebrazo.",
      img: "lineal-25", ratio: 0.7893 },
    { id: "lineal-26", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrina",
      alt: "Una golondrina en vuelo en puntillismo, en el brazo.",
      img: "lineal-26", ratio: 0.6824 },
    { id: "lineal-27", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrina",
      alt: "La misma golondrina en puntillismo, vista de lado.",
      img: "lineal-27", ratio: 0.7481 },
    { id: "lineal-28", estilo: "fine-line", artista: "haroz-lineales", titulo: "Tijeras",
      alt: "Unas tijeras en línea fina en el antebrazo.",
      img: "lineal-28", ratio: 0.9437 },
    { id: "lineal-29", estilo: "fine-line", artista: "haroz-lineales", titulo: "Serpiente",
      alt: "Una serpiente en línea fina y punteado a lo largo del antebrazo.",
      img: "lineal-29", ratio: 0.8689 },
    { id: "lineal-30", estilo: "fine-line", artista: "haroz-lineales", titulo: "Goku",
      alt: "Goku de niño con gafas rojas, pequeño y a color, en el brazo.",
      img: "lineal-30", ratio: 0.7877 },
    { id: "lineal-31", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Un nombre en letra caligráfica grande en el brazo.",
      img: "lineal-31", ratio: 0.7872 },
    { id: "lineal-32", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Un nombre en mayúsculas finas en la muñeca.",
      img: "lineal-32", ratio: 0.7494 },
    { id: "lineal-33", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra escrita a mano, pequeña, en el brazo.",
      img: "lineal-33", ratio: 0.7908 },
    { id: "lineal-34", estilo: "fine-line", artista: "haroz-lineales", titulo: "Pescador",
      alt: "Un hombre con sombrero sentado en una roca, pescando, en línea fina en el brazo.",
      img: "lineal-34", ratio: 0.7877 },
    { id: "lineal-35", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mariposa",
      alt: "Una mariposa pequeña en el hombro.",
      img: "lineal-35", ratio: 0.7741 },
    { id: "lineal-36", estilo: "fine-line", artista: "haroz-lineales", titulo: "A juego",
      alt: "Dos muñecas, cada una con un tatuaje mínimo a juego.",
      img: "lineal-36", ratio: 0.7571 },
    { id: "lineal-38", estilo: "fine-line", artista: "haroz-lineales", titulo: "Montaña",
      alt: "Montañas y pinos dentro de un círculo, en línea fina y punteado en el antebrazo.",
      img: "lineal-38", ratio: 0.6693 },
    { id: "lineal-39", estilo: "fine-line", artista: "haroz-lineales", titulo: "Jirafa y globo",
      alt: "Una jirafa en puntillismo y, encima, un globo aerostático, en el antebrazo.",
      img: "lineal-39", ratio: 0.7767 },
    { id: "lineal-40", estilo: "fine-line", artista: "haroz-lineales", titulo: "1975",
      alt: "El año «1975» en números finos en el antebrazo.",
      img: "lineal-40", ratio: 0.7141 },
    { id: "lineal-41", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una letra pequeña en la muñeca.",
      img: "lineal-41", ratio: 0.796 },
    { id: "lineal-42", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrina",
      alt: "Una golondrina pequeña y una cara sonriente en el brazo.",
      img: "lineal-42", ratio: 0.7955 },
    { id: "lineal-43", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrinas",
      alt: "Dos golondrinas frente a frente, en línea fina y punteado en el antebrazo.",
      img: "lineal-43", ratio: 0.8255 },
    { id: "lineal-44", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrinas",
      alt: "Dos golondrinas pequeñas y una letra en el brazo.",
      img: "lineal-44", ratio: 0.7638 },
    { id: "lineal-45", estilo: "fine-line", artista: "haroz-lineales", titulo: "Rosa",
      alt: "Una rosa de tallo largo en línea fina en el antebrazo.",
      img: "lineal-45", ratio: 0.7806 },
    { id: "lineal-46", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una niña con gafas, pequeña y con un toque de color, copiada del sello japonés que se ve al lado.",
      img: "lineal-46", ratio: 0.9444 },
    { id: "lineal-47", estilo: "fine-line", artista: "haroz-lineales", titulo: "Huella",
      alt: "La huella de una pata con el nombre de la mascota debajo, en el antebrazo.",
      img: "lineal-47", ratio: 0.8094 },
    { id: "lineal-48", estilo: "fine-line", artista: "haroz-lineales", titulo: "Deixar fondo ronsel",
      alt: "La frase en gallego «deixar fondo ronsel» en letra de máquina en el antebrazo.",
      img: "lineal-48", ratio: 0.8089 },
    { id: "lineal-49", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una letra «M» pequeña en la muñeca.",
      img: "lineal-49", ratio: 0.8215 },
    { id: "lineal-50", estilo: "fine-line", artista: "haroz-lineales", titulo: "Árbol",
      alt: "Un árbol en línea fina con la frase «This one.» encima, en el antebrazo.",
      img: "lineal-50", ratio: 0.811 },
    { id: "lineal-51", estilo: "fine-line", artista: "haroz-lineales", titulo: "Chip",
      alt: "Chip, la taza de La bella y la bestia, en línea fina en el antebrazo.",
      img: "lineal-51", ratio: 0.7481 },
    { id: "lineal-52", estilo: "fine-line", artista: "haroz-lineales", titulo: "La señora Potts",
      alt: "La señora Potts, la tetera de La bella y la bestia, en línea fina en el brazo.",
      img: "lineal-52", ratio: 0.7706 },
    { id: "lineal-55", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Dos figuras pequeñas en negro, como una viñeta de cómic, en el antebrazo.",
      img: "lineal-55", ratio: 0.7682 },
    { id: "lineal-56", estilo: "fine-line", artista: "haroz-lineales", titulo: "Charlot",
      alt: "Charlot, con su bombín y su bigote, pequeño y en negro, en el brazo.",
      img: "lineal-56", ratio: 0.7655 },
    { id: "lineal-57", estilo: "fine-line", artista: "haroz-lineales", titulo: "Luna",
      alt: "Una luna creciente mínima en el hombro.",
      img: "lineal-57", ratio: 0.8061 },
    { id: "lineal-58", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una frase corta en letra fina a lo largo del antebrazo.",
      img: "lineal-58", ratio: 0.9074 },
    { id: "lineal-59", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra fina en la muñeca y un número pequeño al lado.",
      img: "lineal-59", ratio: 0.9385 },
    { id: "lineal-60", estilo: "fine-line", artista: "haroz-lineales", titulo: "Oliver",
      alt: "Oliver, de «Oliver y Benji», con el balón, en puntillismo en el antebrazo, con el logo de Jordan debajo.",
      img: "lineal-60", ratio: 0.9298 },
    { id: "lineal-61", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Un nombre en letras pequeñas en el antebrazo.",
      img: "lineal-61", ratio: 0.816 },
    { id: "lineal-64", estilo: "fine-line", artista: "haroz-lineales", titulo: "Sellos",
      alt: "Sellos de correos de viaje, a color, uno junto a otro por todo el antebrazo.",
      img: "lineal-64", ratio: 0.7575 },
    { id: "lineal-65", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una frase en letra cursiva fina a lo largo del antebrazo.",
      img: "lineal-65", ratio: 0.7836 },
    { id: "lineal-66", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra fina en el antebrazo.",
      img: "lineal-66", ratio: 0.7599 },
    { id: "lineal-67", estilo: "fine-line", artista: "haroz-lineales", titulo: "Bulbasaur",
      alt: "Bulbasaur, de Pokémon, en línea fina y punteado en la pierna.",
      img: "lineal-67", ratio: 0.7811 },
    { id: "lineal-70", estilo: "fine-line", artista: "haroz-lineales", titulo: "Margarita",
      alt: "Una margarita en línea fina en el brazo.",
      img: "lineal-70", ratio: 0.7604 },
    { id: "lineal-71", estilo: "fine-line", artista: "haroz-lineales", titulo: "Lua",
      alt: "La palabra «LUA» en mayúsculas finas en el brazo.",
      img: "lineal-71", ratio: 0.9208 },
    { id: "lineal-72", estilo: "fine-line", artista: "haroz-lineales", titulo: "Llave",
      alt: "Una llave en línea fina en el antebrazo.",
      img: "lineal-72", ratio: 0.6715 },
    { id: "lineal-73", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra cursiva fina en el brazo.",
      img: "lineal-73", ratio: 0.8089 },
    { id: "lineal-74", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letras separadas y una florecita, en el brazo.",
      img: "lineal-74", ratio: 0.8099 },
    { id: "lineal-76", estilo: "fine-line", artista: "haroz-lineales", titulo: "224",
      alt: "El número «224» en el dedo.",
      img: "lineal-76", ratio: 0.8024 },
    { id: "lineal-77", estilo: "fine-line", artista: "haroz-lineales", titulo: "Gato",
      alt: "Un gato con pañuelo y ojos de corazón, en línea fina con toques de color, en el brazo.",
      img: "lineal-77", ratio: 0.8255 },
    { id: "lineal-78", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mario",
      alt: "Mario, de Super Mario, a color en la pierna.",
      img: "lineal-78", ratio: 0.7862 },
    { id: "lineal-80", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra fina en el brazo.",
      img: "lineal-80", ratio: 0.8428 },
    { id: "lineal-81", estilo: "fine-line", artista: "haroz-lineales", titulo: "Retrato en línea",
      alt: "Retrato de un niño con gorra, en línea fina en el antebrazo.",
      img: "lineal-81", ratio: 0.8329 },
    { id: "lineal-82", estilo: "fine-line", artista: "haroz-lineales", titulo: "Weakness",
      alt: "Una mariposa en línea fina y la palabra «Weakness» en la muñeca.",
      img: "lineal-82", ratio: 0.7689 },
    { id: "lineal-84", estilo: "fine-line", artista: "haroz-lineales", titulo: "Corazón",
      alt: "Un corazón anatómico pequeño, en punteado, en el brazo.",
      img: "lineal-84", ratio: 0.7556 },
    { id: "lineal-85", estilo: "fine-line", artista: "haroz-lineales", titulo: "Mariposa",
      alt: "Una mariposa en línea fina en la parte de atrás del brazo.",
      img: "lineal-85", ratio: 0.7682 },
    { id: "lineal-86", estilo: "fine-line", artista: "haroz-lineales", titulo: "A mi manera",
      alt: "Un sol pequeño y la frase «A mi manera y me encanta», en el brazo.",
      img: "lineal-86", ratio: 0.7032 },
    { id: "lineal-87", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra fina en la espalda.",
      img: "lineal-87", ratio: 0.8061 },
    { id: "lineal-88", estilo: "fine-line", artista: "haroz-lineales", titulo: "Osito",
      alt: "Un osito de peluche con capa y espada, en puntillismo en el antebrazo.",
      img: "lineal-88", ratio: 0.7575 },
    { id: "lineal-89", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una frase en letra cursiva fina a lo largo del antebrazo.",
      img: "lineal-89", ratio: 0.8003 },
    { id: "lineal-93", estilo: "fine-line", artista: "haroz-lineales", titulo: "This too shall pass",
      alt: "La frase «this too shall pass» en letra fina en el antebrazo.",
      img: "lineal-93", ratio: 0.7826 },
    { id: "lineal-94", estilo: "fine-line", artista: "haroz-lineales", titulo: "Coordenadas",
      alt: "Unas coordenadas en números finos en la muñeca.",
      img: "lineal-94", ratio: 1.0984 },
    { id: "lineal-95", estilo: "fine-line", artista: "haroz-lineales", titulo: "Rama",
      alt: "Una rama con hojas naranjas y unas iniciales, en el antebrazo.",
      img: "lineal-95", ratio: 0.7696 },
    { id: "lineal-96", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Un niño abrigado con gorro y bufanda, en línea fina y punteado en el antebrazo.",
      img: "lineal-96", ratio: 0.7731 },
    { id: "lineal-97", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra caligráfica grande a lo largo del antebrazo.",
      img: "lineal-97", ratio: 0.7556 },
    { id: "lineal-98", estilo: "fine-line", artista: "haroz-lineales", titulo: "Vieira",
      alt: "Una vieira pequeña en el tobillo.",
      img: "lineal-98", ratio: 0.7445 },
    { id: "lineal-99", estilo: "fine-line", artista: "haroz-lineales", titulo: "Corazón",
      alt: "Un corazón anatómico en línea fina con una letra dentro, en el brazo.",
      img: "lineal-99", ratio: 0.7614 },
    { id: "lineal-100", estilo: "fine-line", artista: "haroz-lineales", titulo: "Globo",
      alt: "Un globo aerostático con lunas, en línea fina y punteado en el hombro.",
      img: "lineal-100", ratio: 0.8013 },
    { id: "lineal-101", estilo: "fine-line", artista: "haroz-lineales", titulo: "Margarita",
      alt: "Una margarita a color, un hilo rojo y un diamante en línea fina, en el brazo.",
      img: "lineal-101", ratio: 0.8803 },
    { id: "lineal-102", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una frase en dos líneas, en letra fina, en el antebrazo.",
      img: "lineal-102", ratio: 0.7571 },
    { id: "lineal-103", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una palabra en letra fina y dos corazones negros pequeños, en el antebrazo.",
      img: "lineal-103", ratio: 0.7667 },
    { id: "lineal-104", estilo: "fine-line", artista: "haroz-lineales", titulo: "Vieira",
      alt: "Una vieira en línea fina y punteado en el brazo.",
      img: "lineal-104", ratio: 0.7652 },
    { id: "lineal-105", estilo: "fine-line", artista: "haroz-lineales", titulo: "Golondrinas",
      alt: "Golondrinas en vuelo en puntillismo, bajo la frase «Veni vidi vici», en el brazo.",
      img: "lineal-105", ratio: 0.7556 },
    { id: "lineal-106", estilo: "fine-line", artista: "haroz-lineales", titulo: "Osito",
      alt: "Un osito sentado dentro de un aro, en puntillismo en el antebrazo.",
      img: "lineal-106", ratio: 0.8045 },
    { id: "lineal-107", estilo: "fine-line", artista: "haroz-lineales", titulo: "Cacao",
      alt: "Una mazorca de cacao abierta, en línea fina y punteado, en el costado.",
      img: "lineal-107", ratio: 0.7706 },
    { id: "lineal-108", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Una frase en letra caligráfica y una huella pequeña, en el antebrazo.",
      img: "lineal-108", ratio: 0.7711 },
    { id: "lineal-109", estilo: "fine-line", artista: "haroz-lineales", titulo: "Momento",
      alt: "La palabra «MOMENTO» en mayúsculas pequeñas en el pie.",
      img: "lineal-109", ratio: 0.7575 },
    { id: "lineal-110", estilo: "fine-line", artista: "haroz-lineales", titulo: "Amor: el mar, tú y yo",
      alt: "La frase «Amor: el mar, tú y yo.» en letra de máquina en el brazo.",
      img: "lineal-110", ratio: 0.8369 },
    { id: "lineal-111", estilo: "fine-line", artista: "haroz-lineales", titulo: "Gato",
      alt: "Un gato de dibujos saludando, en línea fina, con una frase encima, en el brazo.",
      img: "lineal-111", ratio: 0.7628 },
    { id: "lineal-112", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Tres personajes de anime en pequeño, en línea fina y negro, en el brazo.",
      img: "lineal-112", ratio: 0.7575 },
    { id: "lineal-113", estilo: "fine-line", artista: "haroz-lineales", titulo: "Familia",
      alt: "La palabra «Familia» en letra caligráfica grande a lo largo de la pierna.",
      img: "lineal-113", ratio: 0.7561 },
    { id: "lineal-114", estilo: "fine-line", artista: "haroz-lineales", titulo: "Ratoncito",
      alt: "Un ratoncito en línea fina, pequeño, en la pierna.",
      img: "lineal-114", ratio: 0.7618 },
    { id: "lineal-115", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Un nombre en letra caligráfica grande a lo largo del antebrazo.",
      img: "lineal-115", ratio: 0.7556 },
    { id: "lineal-117", estilo: "fine-line", artista: "haroz-lineales", titulo: "Jerry",
      alt: "Jerry, de Tom y Jerry, pequeño en línea fina en el brazo.",
      img: "lineal-117", ratio: 0.7614 },
    { id: "lineal-118", estilo: "fine-line", artista: "haroz-lineales", titulo: "",
      alt: "Unos trazos finos, como un pájaro en vuelo, en el antebrazo.",
      img: "lineal-118", ratio: 0.7633 },
    { id: "lineal-119", estilo: "fine-line", artista: "haroz-lineales", titulo: "Resiliencia",
      alt: "La palabra «Resiliencia» en letra caligráfica a lo largo del antebrazo.",
      img: "lineal-119", ratio: 0.7791 },

    // --- Realismo de antes (sacado de Instagram): lo sustituyen las oficiales.
    { id: "bg-1", publicar: false, estilo: "realismo", artista: "haroz", titulo: "Tengu",
      alt: "Máscara de tengu en negro y grises en el antebrazo, de nariz larga y ceño fruncido, rodeada de plumas.",
      img: "bg-1", ratio: 0.8102 },
    { id: "v-retrato", publicar: false, estilo: "realismo", artista: "haroz", video: "retrato" },
    { id: "bg-4", publicar: false, estilo: "realismo", artista: "raul", titulo: "Samurái",
      alt: "Samurái con armadura y katana en negro y grises en el antebrazo, con una pagoda y el sol detrás.",
      img: "bg-4", ratio: 0.9907 },
    { id: "v-payasa", publicar: false, estilo: "realismo", artista: "", video: "payasa" },
    { id: "bg-2", publicar: false, estilo: "realismo", artista: "raul", titulo: "Torre de Hércules",
      alt: "La Torre de Hércules en negro y grises, con los tentáculos de un pulpo enroscados alrededor de la torre.",
      img: "bg-2", ratio: 0.7997 },
    { id: "v-perro", publicar: false, estilo: "realismo", artista: "", video: "perro" },
    { id: "bg-3", publicar: false, estilo: "realismo", artista: "haroz", titulo: "Gato esfinge",
      alt: "Retrato realista de un gato esfinge en el antebrazo, en negro y grises, con los ojos en verde claro.",
      img: "bg-3", ratio: 0.7602 },
    { id: "v-tortuga", publicar: false, estilo: "realismo", artista: "", video: "tortuga" },

    // --- Fine line
    { id: "fl-1", publicar: false, estilo: "fine-line", artista: "tbh", titulo: "Peonías",
      alt: "Peonías y flores pequeñas con hojas en línea fina y sombra suave, a lo largo del muslo.",
      img: "fl-1", ratio: 0.7876 },
    { id: "an-2", publicar: false, estilo: "fine-line", artista: "", titulo: "Nicky, la aprendiz de bruja",
      alt: "Nicky, la aprendiz de bruja, volando en su escoba con el gato Jiji, en línea fina y punteado en el brazo.",
      img: "an-2", ratio: 0.751 },

    // --- Color. El tradicional a color, ya en su categoría.
    { id: "tr-1", publicar: false, estilo: "color", artista: "fer", titulo: "",
      alt: "Cara sonriente con un gorro de estrellas y lunas, en tradicional a color: línea negra gruesa, rojo, naranja y turquesa.",
      img: "tr-1", ratio: 0.7519 },
    { id: "v-garfield", publicar: false, estilo: "color", artista: "pepi", video: "garfield" },
    { id: "an-4", publicar: false, estilo: "color", artista: "pepi", titulo: "Garfield",
      alt: "Garfield a color con un ramo de margaritas, pequeño, en el antebrazo.",
      img: "an-4", ratio: 0.7894 },

    // --- Dotwork: de la pieza más sombreada a la más ligera
    { id: "fl-2", publicar: false, estilo: "dotwork", artista: "tbh", titulo: "Ciervo volante",
      alt: "Escarabajo ciervo volante con las alas abiertas, en línea fina y punteado, en la pierna.",
      img: "fl-2", ratio: 0.8489 },
    { id: "v-anubis", publicar: false, estilo: "dotwork", artista: "fer", video: "anubis" },
    { id: "an-7", publicar: false, estilo: "dotwork", artista: "haroz", titulo: "Bulbasaur",
      alt: "Bulbasaur, de Pokémon, en línea fina y punteado en negro, en el gemelo.",
      img: "an-7", ratio: 0.7905 },
    { id: "an-6", publicar: false, estilo: "dotwork", artista: "", titulo: "Totoro",
      alt: "Totoro y los dos pequeños de la película de Ghibli, en fila, en línea fina y punteado en el muslo.",
      img: "an-6", ratio: 0.7514 },

    // --- Anime de antes (sacado de Instagram): lo sustituyen las oficiales.
    { id: "an-1", publicar: false, estilo: "anime", artista: "maou", titulo: "Luffy",
      alt: "Luffy, de One Piece, gritando con los puños apretados, en negro y rojo en el brazo, con el cartel de «Wanted» abajo.",
      img: "an-1", ratio: 0.79 },
    { id: "v-aot", publicar: false, estilo: "anime", artista: "pepi", video: "aot" },
    { id: "an-3", publicar: false, estilo: "anime", artista: "maou", titulo: "",
      alt: "Manga de anime en negro y grises en el antebrazo: un chico de pelo de punta que sonríe entre rayos y sombras.",
      img: "an-3", ratio: 0.7986 },
    { id: "an-5", publicar: false, estilo: "anime", artista: "maou", titulo: "",
      alt: "Personajes de anime en negro y grises en el antebrazo: una chica que asoma entre nubes y, debajo, otro personaje con gafas.",
      img: "an-5", ratio: 0.7959 },
    { id: "v-perfilado", publicar: false, estilo: "anime", artista: "pepi", video: "perfilado" },

    // --- Otros estilos: blackwork. El tradicional en negro, ya en su categoría.
    { id: "bw-1", publicar: false, estilo: "otros-estilos", artista: "maou", titulo: "Dragón japonés",
      alt: "Dragón japonés en negro macizo en el antebrazo, entre remolinos de viento y agua.",
      img: "bw-1", ratio: 0.7916 },
    { id: "tr-2", publicar: false, estilo: "otros-estilos", artista: "fer", titulo: "",
      alt: "Mujer con velo y una flor en el pecho, en tradicional en negro, en el muslo.",
      img: "tr-2", ratio: 0.7602 },
    { id: "bw-2", publicar: false, estilo: "otros-estilos", artista: "maou", titulo: "Parca",
      alt: "Parca en negro y grises en el brazo: una calavera encapuchada que sostiene un reloj de arena.",
      img: "bw-2", ratio: 0.7959 }
  ],

  /* --- 6. ARTISTAS --------------------------------------------------------- */
  // Solo para el pie de cada foto: la web no se ordena por tatuadores.
  // `instagram` (el usuario, sin arroba) convierte el nombre en enlace.
  //
  // PROVISIONAL: pendiente de confirmar. Los cinco nombres salen de los
  // destacados de Instagram (RIKI, GABY, HAROZ, RAÚL, FER).
  artistas: [
    { slug: "gaby",  nombre: "Gaby",  instagram: "" },
    // FUENTE: el estudio nombra sus fotos con el Instagram de cada uno
    // (24/09/2026).
    { slug: "haroz", nombre: "Haroz", instagram: "haroz.tattoo" },
    // FUENTE: el estudio (05/10/2026): su fine line y puntillismo va en una
    // cuenta aparte.
    { slug: "haroz-lineales", nombre: "Haroz", instagram: "haroz.tattoo.lineales" },
    { slug: "raul",  nombre: "Raúl",  instagram: "raulalvareztattoo" },
    // FUENTE: el estudio, con sus fotos oficiales (05/10/2026).
    { slug: "fer",   nombre: "Fernando", instagram: "fernandovoyeur" },
    { slug: "maou",  nombre: "Maou",  instagram: "maou_tattoo" },
    { slug: "ezel",  nombre: "Ezel",  instagram: "ezel_tattoo.studio" },
    // FUENTE: firma sus fotos y reels como «Pepi Marcos, artista».
    { slug: "pepi",  nombre: "Pepi Marcos", instagram: "pepi_marcoss" },
    // FUENTE: el estudio (05/10/2026): fundador de Loco Blow y al frente de
    // Origen Láser (@origenlasertatuajes) desde 2020.
    { slug: "riki",  nombre: "Riki",  instagram: "origenlasertatuajes" },
    // FUENTE: sus fotos llegan con su Instagram y la marca del estudio
    // (25/09/2026).  PROVISIONAL: pendiente de cómo se llama y quiere salir.
    { slug: "tbh",   nombre: "TBH",   instagram: "tbhtattoo" }
  ],

  /* --- 7. EL ESTUDIO · fotos del local ------------------------------------- */
  // Salen en el inicio, junto al vídeo del estudio. Para añadir una foto
  // (tools/originales/estudio/): otra línea con su `img` y su `ratio`.
  // PROVISIONAL: sacada de Instagram; pendiente de fotos del local.
  estudio: {
    video: "estudio",
    fotos: [
      { id: "estudio-1", titulo: "Maou, trabajando",
        alt: "Maou tatuando, con gafas, barba y guantes negros, bajo la lámpara del puesto.",
        img: "estudio-1", ratio: 0.7954 }
    ]
  },

  /* --- 8. VÍDEOS ----------------------------------------------------------- */
  // Los reels del estudio, recortados por tools/videos.py. Van sin sonido y en
  // bucle, y no se descargan hasta que se llega a ellos.
  // `publicar: false` lo deja fuera de la web sin borrarlo.
  // Un vídeo con `estilo` sale el primero en la sección de ese estilo.
  // PROVISIONAL: pendiente del permiso del estudio para usar sus reels.
  videos: {
    laser: {
      base: "laser", ratio: 0.8, rotulo: "Láser",
      alt: "Vídeo sin sonido: eliminación de un tatuaje con láser en el estudio. El cabezal sobre la piel, la camilla y el tatuaje en tratamiento.",
      publicar: true
    },
    estudio: {
      base: "estudio", ratio: 0.8, rotulo: "El estudio",
      alt: "Vídeo sin sonido: el estudio por dentro. La entrada con sofá junto al ventanal, la sala de trabajo y los puestos.",
      publicar: true
    },
    // Los reels de trabajos: se colocan en la lista 5 (obras), con su estilo
    // y su artista. `rotulo` es lo que dice la etiqueta del vídeo.
    perro: {
      base: "perro", ratio: 0.8, rotulo: "Perro",
      alt: "Vídeo sin sonido: retrato de un perro en realismo de negro y grises en el muslo, con el pelo trabajado trazo a trazo.",
      publicar: true
    },
    retrato: {
      base: "retrato", ratio: 0.8, rotulo: "Retrato",
      alt: "Vídeo sin sonido: retrato realista de un hombre mayor en negro y grises en el antebrazo, con las arrugas marcadas a sombra.",
      publicar: true
    },
    payasa: {
      base: "payasa", ratio: 0.8, rotulo: "Retrato",
      alt: "Vídeo sin sonido: retrato de una chica maquillada de payaso, sacando la lengua, en negro y grises en el antebrazo; primero entero y luego la cara de cerca.",
      publicar: true
    },
    tortuga: {
      base: "tortuga", ratio: 0.8, rotulo: "Tortuga",
      alt: "Vídeo sin sonido: tortuga marina en negro y grises en el gemelo, mientras la pierna gira.",
      publicar: true
    },
    aot: {
      base: "aot", ratio: 0.8, rotulo: "Attack on Titan",
      alt: "Vídeo sin sonido: hombro con un titán de Attack on Titan y el rostro de Eren debajo, en negro con toques de color, ya terminado.",
      publicar: true
    },
    garfield: {
      base: "garfield", ratio: 0.8, rotulo: "Garfield",
      alt: "Vídeo sin sonido: Garfield con un ramo de margaritas y una niña con vestido, a color, en el antebrazo.",
      publicar: true
    },
    perfilado: {
      base: "perfilado", ratio: 0.8, rotulo: "En proceso",
      alt: "Vídeo sin sonido: manos con guantes rosas perfilando una pieza de Attack on Titan sobre el calco en el brazo.",
      publicar: true
    },
    anubis: {
      base: "anubis", ratio: 0.8, rotulo: "Anubis",
      alt: "Vídeo sin sonido: Anubis en línea negra y punteado en el antebrazo, mientras una mano con guante negro limpia la tinta.",
      publicar: true
    }
  },

  /* --- 9b. OPINIONES ------------------------------------------------------- */
  // Reseñas de su ficha de Google, con la foto que subió quien la escribió.
  // FUENTE: Google Maps, 24/09/2026 (el enlace de cada una la abre).
  // Reglas al añadir una:
  //   · un trozo corto, entre comillas, sin cambiar lo que dice (solo
  //     erratas y signos);
  //   · NADA de precios: algunas reseñas los llevan en Google y aquí no;
  //   · nombre y la inicial del apellido, no el nombre completo;
  //   · ni caras de clientes ni fotos de menores;
  //   · `fecha`, aproximada: Google dice «hace un mes».
  // `img`: la foto pasada por tools/fetch-images.py (tools/originales/resenas/).
  opiniones: [
    { nombre: "Vanessa C.", fecha: "Septiembre de 2026", nota: 5, artista: "haroz",
      texto: "Venía con miedo, porque un realismo es muy complicado… pero lo bordó.",
      enlace: "https://maps.app.goo.gl/C7BUSqK3RbjFU2AU7",
      img: "resena-1", ratio: 0.75, alt: "Retrato de una perrita sonriendo, en negro y grises, en el muslo." },
    { nombre: "Thalía T.", fecha: "Agosto de 2026", nota: 5, artista: "haroz",
      texto: "Me desplazo hasta A Coruña si quiero hacerme un tatuaje. Haroz es mi tatuador de confianza.",
      enlace: "https://maps.app.goo.gl/76RUGTCFGFQLa9Br5",
      img: "resena-2", ratio: 0.75, alt: "Una concha de vieira pequeña en línea fina, en el antebrazo." },
    { nombre: "Ismael B.", fecha: "2025", nota: 5, artista: "haroz",
      texto: "Me dio diferentes opciones, de relleno y diseño, receptivo a cualquier cosa que quisiera y de trato cercano.",
      enlace: "https://maps.app.goo.gl/k1CRmcRderZcnCbx5",
      img: "resena-3", ratio: 0.75, alt: "Una equis grande con una máscara de gas dentro, en negro y grises, sobre la rodilla." },
    { nombre: "caosgubu", fecha: "Marzo de 2026", nota: 5, artista: "haroz",
      texto: "Gente maja, agradable y profesional… lo que quería y aún mejor.",
      enlace: "https://maps.app.goo.gl/EuA3Vb4G2Xg8pfEg8",
      img: "resena-4", ratio: 0.6667, alt: "Retrato realista de un perro de hocico canoso, en negro y grises." }
  ],

  /* --- 9. PREGUNTAS GENERALES ---------------------------------------------- */
  // Las del inicio. Cada servicio lleva además las suyas en su página.
  preguntas: [
    {
      // FUENTE: post fijado del 10/09/2026
      pregunta: "¿Cómo pido cita?",
      respuesta: "Por WhatsApp, al 684 107 197. Te contesta un compañero del estudio y os organizáis la cita, sea para un tatuaje, un piercing, el láser o la micropigmentación."
    },
    {
      // FUENTE: post fijado del 10/09/2026
      pregunta: "¿Puedo pasarme por el estudio sin avisar?",
      respuesta: "No. Desde septiembre de 2026 somos un estudio privado: ya no hay recepción abierta al público y todo va con cita previa."
    },
    {
      // FUENTE: post fijado del 10/09/2026
      pregunta: "¿Puedo escribir directamente a mi artista?",
      respuesta: "Sí. Si ya has venido y tienes su número, escríbele. Si no lo tienes, pídenoslo por el WhatsApp del estudio y te lo pasamos."
    },
    {
      // PROVISIONAL: pendiente de confirmar vuestra política con menores
      pregunta: "¿Atendéis a menores de edad?",
      respuesta: "Para tatuarse o hacerse un piercing hace falta el consentimiento por escrito de la madre, el padre o el tutor legal, y que esa persona venga a la cita."
    }
  ],

  /* --- 11. CUIDADOS · la guía de curación --------------------------------- */
  // Su propia página (cuidados.html): una guía por servicio, con lo que hay
  // que hacer en cada momento, lo que es normal y cuándo escribir. Cada guía
  // tiene su dirección, para mandarla por WhatsApp después de la cita:
  // <dominio>/cuidados#tatuaje, #piercing, #laser o #micropigmentacion.
  //
  // `servicio`  el `id` del servicio (lista 3): de ahí salen su dirección y
  //             el enlace a su página.
  // `articulo`  cómo se dice en una frase: «me hice {articulo}».
  // `cura`      cuánto tarda, en una línea.
  // `fases`     qué hacer, por momentos: `cuando` es la etiqueta y `que`,
  //             la lista.
  // `normal`    lo que asusta y no pasa nada: lo que más se pregunta.
  // `avisar`    cuándo escribirnos y cuándo ir al médico.
  //
  // PROVISIONAL: pendiente de confirmar. Son pautas generales; cada guía
  // tiene que revisarla quien hace ese servicio (Riki el láser, Haroz la
  // micropigmentación) y cambiar lo que en el estudio se haga distinto:
  // el film, la crema, los días.
  cuidados: {
    pagina: "cuidados", menu: "Cuidados",
    // Cómo se nombra en el pie y desde la página de cada servicio.
    enlace: "Guía de cuidados",
    // En una línea, para las listas de páginas (la del error 404).
    resumen: "Cómo se cura cada servicio: qué hacer, qué es normal y cuándo escribirnos.",
    etiqueta: "Después de la sesión",
    titular: "Cuidados.",
    entradilla: "Cómo se cura un tatuaje, un piercing, el láser y la micropigmentación capilar: qué hacer cada día, qué es normal y cuándo escribirnos. Guárdala en el móvil.",
    nota: "Es una guía general. Si en el estudio te dimos otra pauta para tu caso, sigue esa.",
    puntos: [
      { dato: "Dudas", valor: "Por WhatsApp, con una foto de la zona" },
      { dato: "Al médico", valor: "Si hay fiebre, pus o una rojez que va a más" }
    ],
    boton: "Preguntar una duda",
    mensaje: "Hola, os escribo desde la web. Tengo una duda sobre la curación: ",
    // Lo que dice cada guía. {nombre} y {articulo} se cambian por los suyos.
    textos: {
      cura: "Cuánto tarda",
      fases: "Qué hacer",
      normal: "Es normal",
      avisar: "Escríbenos o ve al médico",
      duda: "Tengo una duda",
      mensajeDuda: "Hola, os escribo desde la web. Me hice {articulo} con vosotros y tengo una duda con la curación. Os mando una foto: ",
      servicio: "Ver {nombre}",
      // El enlace que sale al final de las preguntas de cada servicio.
      enServicio: "Cómo se cura: la guía de cuidados"
    },
    // Las preguntas del final de la página: lo que se pregunta por WhatsApp
    // en los días de después.
    // PROVISIONAL: pendiente de que el estudio las revise.
    preguntas: [
      {
        pregunta: "¿Qué crema me pongo?",
        respuesta: "La que te digamos en el estudio. Si no te dijimos ninguna, una específica para tatuajes o una hidratante sin perfume, siempre en capa fina. En el piercing, ninguna: solo suero fisiológico."
      },
      {
        pregunta: "¿Cuándo puedo ir a la playa o a la piscina?",
        respuesta: "Cuando esté curado del todo: en un tatuaje, a partir de unas tres o cuatro semanas; en un piercing, cuando pasen las primeras semanas y ya no esté sensible. Y después, con crema solar."
      },
      {
        pregunta: "¿Puedo hacer deporte?",
        respuesta: "Los primeros días, nada que te haga sudar mucho ni que roce o golpee la zona. Después, deporte suave y con la zona limpia. El gimnasio compartido, mejor cuando ya no haya herida."
      },
      {
        pregunta: "Se me ha caído una costra antes de tiempo, ¿qué hago?",
        respuesta: "No arranques más: lávala con cuidado, sécala a toquecitos y sigue con la crema. Si al curar se ve una zona más clara, escríbenos con una foto: se repasa."
      },
      {
        // PROVISIONAL: pendiente de confirmar cuándo y cómo dais los repasos
        pregunta: "¿Cuándo me puedo hacer el repaso?",
        respuesta: "Cuando esté curado del todo, a partir de un mes más o menos. Escríbenos con una foto y te decimos si hace falta y cuándo."
      }
    ],
    meta: {
      titulo: "Cómo curar un tatuaje, piercing o láser · Loco Blow Tattoo",
      descripcion: "Cómo curar un tatuaje, un piercing, el láser o la micropigmentación capilar: qué hacer cada día, qué es normal y cuándo ir al médico."
    },
    guias: [
      {
        servicio: "tatuaje", nombre: "Tatuaje", articulo: "un tatuaje",
        cura: "De 2 a 4 semanas por fuera. Por dentro, la piel termina en unos 3 meses.",
        fases: [
          { cuando: "Al salir", que: [
            "Deja el film o el apósito el tiempo que te digamos en el estudio: depende del que te pongamos.",
            "Antes de tocar el tatuaje, lávate las manos. Siempre, hasta que cure."
          ] },
          { cuando: "Los primeros días", que: [
            "Lávalo dos o tres veces al día con agua tibia y jabón neutro, con la mano, sin esponja.",
            "Sécalo a toquecitos con papel de cocina limpio. La toalla del baño, no.",
            "Una capa fina de crema: que brille un poco, no que quede blanco.",
            "Ropa holgada encima. Nada que roce ni apriete."
          ] },
          { cuando: "Mientras se pela", que: [
            "Pica y se pela como una quemadura de sol: no rasques ni arranques las pieles.",
            "Sigue con la crema, dos o tres veces al día.",
            "Nada de piscina, mar, sauna, bañera ni rayos UVA. Duchas cortas, sí.",
            "Nada de sol: tápalo con ropa."
          ] },
          { cuando: "Ya curado", que: [
            "Crema solar de protección 50 cada vez que le dé el sol: es lo que más alarga la vida del tatuaje.",
            "Hidrátalo de vez en cuando. En la piel cuidada se ve mejor."
          ] }
        ],
        normal: [
          "Que suelte un poco de tinta y de líquido transparente los primeros días.",
          "Que esté rojo e hinchado alrededor dos o tres días.",
          "Que pique y se pele entre la primera y la tercera semana.",
          "Que se vea apagado o lechoso al terminar de pelarse. En unas semanas recupera el contraste."
        ],
        avisar: [
          "Escríbenos con una foto si tienes dudas o si ves una zona donde se ha ido la tinta: se repasa.",
          "Ve al médico si tienes fiebre, si sale pus o huele mal, o si la rojez y el calor se extienden y van a más pasado el tercer día."
        ]
      },
      {
        servicio: "piercing", nombre: "Piercing", articulo: "un piercing",
        cura: "El lóbulo, de 6 a 8 semanas. El cartílago, de 6 a 12 meses.",
        fases: [
          { cuando: "Cada día", que: [
            "Lávate las manos antes de tocarlo. Mejor aún, no lo toques.",
            "Límpialo dos veces al día con suero fisiológico: empapa una gasa, ablanda las costritas y retíralas sin arrastrar.",
            "Sécalo a toquecitos con una gasa o papel limpio.",
            "No gires ni muevas la joya: no ayuda a curar y mete suciedad dentro."
          ] },
          { cuando: "Las primeras semanas", que: [
            "Nada de piscina, mar, sauna ni bañera.",
            "Cuidado con el pelo, la ropa, los auriculares y el casco: los enganchones son lo que más retrasa la curación.",
            "Si es en la oreja, duerme del otro lado.",
            "Ni alcohol, ni agua oxigenada, ni pomadas: resecan e irritan."
          ] },
          // PROVISIONAL: pendiente de confirmar si hacéis piercings en la boca.
          { cuando: "En la boca", que: [
            "Enjuágate con agua fría o con un colutorio sin alcohol después de comer.",
            "Los primeros días, comida blanda y fría. Evita el picante, el alcohol y el tabaco."
          ] },
          { cuando: "Hasta que cure", que: [
            "No cambies la joya por tu cuenta.",
            "Cuando baja la hinchazón, a veces hay que poner una barra más corta: eso, en el estudio."
          ] }
        ],
        normal: [
          "Algo de rojez, hinchazón y molestia los primeros días.",
          "Un líquido blanquecino que forma costritas alrededor de la joya: es linfa, no pus.",
          "Que se irrite con un golpe y se calme a los pocos días."
        ],
        avisar: [
          "Escríbenos si sale un bulto junto al agujero, si la joya se queda corta o se hunde, o si tras un golpe no se calma.",
          "Ve al médico si tienes fiebre, si sale pus espeso verde o gris, o si la rojez y el calor se extienden.",
          "Si crees que está infectado, no te quites la joya tú: el agujero podría cerrarse con la infección dentro."
        ]
      },
      {
        servicio: "laser", nombre: "Láser", articulo: "una sesión de láser",
        cura: "La piel, en 1 o 2 semanas. Entre una sesión y la siguiente, las semanas que te digamos.",
        fases: [
          { cuando: "Justo después", que: [
            "La zona se pone blanca unos minutos y luego roja e hinchada, como una quemadura leve.",
            "Frío para calmarla: una bolsa de frío envuelta en un paño, a ratos. Nunca el hielo directo sobre la piel."
          ] },
          { cuando: "Los primeros días", que: [
            "Lava la zona con agua tibia y jabón neutro, y sécala a toquecitos.",
            "Una capa fina de la crema que te digamos. Tápala con una gasa si roza con la ropa.",
            "Si salen ampollas, no las revientes: protégelas y deja que se sequen solas.",
            "Nada de piscina, mar, sauna ni deporte fuerte hasta que la piel esté cerrada."
          ] },
          { cuando: "Hasta la siguiente sesión", que: [
            "No rasques ni arranques las costras.",
            "Nada de sol en la zona: tápala con ropa y, con la piel ya curada, crema solar de protección 50.",
            "El cuerpo va eliminando la tinta entre una sesión y otra: por eso hay que esperar."
          ] }
        ],
        normal: [
          "Rojez, hinchazón y calor uno o dos días.",
          "Ampollas pequeñas o costras finas la primera semana.",
          "Que al principio se vea igual y se vaya aclarando en las semanas siguientes.",
          "Que la piel quede más clara o más oscura durante un tiempo."
        ],
        avisar: [
          "Escríbenos si las ampollas son grandes o si la piel no se ha cerrado en dos semanas.",
          "Ve al médico si tienes fiebre, si sale pus o si la rojez y el dolor van a más en vez de a menos."
        ]
      },
      {
        servicio: "micropigmentacion", nombre: "Micropigmentación capilar", articulo: "la micropigmentación",
        cura: "La piel, en una semana. El color se asienta en un mes.",
        fases: [
          { cuando: "Los primeros 4 días", que: [
            "No te mojes la cabeza ni la laves.",
            "Nada de deporte ni de nada que te haga sudar.",
            "No te rapes ni te afeites la zona.",
            "Duerme boca arriba, con la funda de la almohada limpia."
          ] },
          { cuando: "Desde el quinto día", que: [
            "Ya puedes lavarte la cabeza con agua tibia y un champú suave, sin frotar.",
            "Puedes volver a raparte, con cuidado y con la máquina limpia.",
            "Deporte suave. El que te haga sudar mucho, mejor a partir de la semana."
          ] },
          { cuando: "El primer mes", que: [
            "Nada de sol directo en la cabeza: gorra o sombrero.",
            "Nada de piscina, mar, sauna ni vapor.",
            "Ningún producto en la zona que no te hayamos dicho."
          ] },
          { cuando: "Siempre", que: [
            "Crema solar de protección 50 en la cabeza cuando le dé el sol: el sol es lo que más aclara el pigmento.",
            "Hidrata el cuero cabelludo: la piel seca apaga el color."
          ] }
        ],
        normal: [
          "Una rojez leve el primer día o los dos primeros.",
          "Que los puntos se vean más oscuros o más grandes al principio: en unos días se asientan.",
          "Que se aclaren después de la primera sesión: por eso se hace en varias."
        ],
        avisar: [
          "Escríbenos con una foto si tienes dudas con el tono o la línea: se ajusta en la siguiente sesión.",
          "Ve al médico si tienes fiebre, si sale pus o si hay una rojez que se extiende."
        ]
      }
    ]
  },

  /* --- 10. PIE ------------------------------------------------------------- */
  pie: {
    creditos: "© 2026 Loco Blow Tattoo · A Coruña",
    // PROVISIONAL: las páginas legales se hacen con el nombre fiscal y el NIF
    // del estudio (fase 5).
    enlaces: [
      { texto: "Aviso legal", href: "#" },
      { texto: "Privacidad", href: "#" }
    ]
  }
};
