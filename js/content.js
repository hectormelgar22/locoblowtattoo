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
   · Los `id` y los `slug` son direcciones: cambiar «black-and-grey» por otra
     cosa rompe los enlaces ya compartidos. El texto visible se cambia sin
     miedo.

   Lo que lleva  // PROVISIONAL  es un dato que el estudio aún no ha
   confirmado. Lo que lleva  // FUENTE  sale de algo que el propio estudio ha
   publicado o mandado (el post fijado del 10/09/2026, sus destacados, el
   logotipo o los mensajes del 24/09/2026).

   La web tiene cinco páginas: el inicio y una por servicio.

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
      titulo: "Loco Blow Tattoo · Tatuaje, láser, piercing y micropigmentación en A Coruña",
      descripcion: "Estudio de tatuaje en A Coruña desde 2015, con los trabajos por estilos. También eliminación de tatuajes con láser, piercing y micropigmentación capilar. Solo con cita previa por WhatsApp.",
      compartir: "Tatuaje, láser, piercing y micropigmentación capilar en A Coruña desde 2015. Cita previa por WhatsApp."
    },

    inicio: {
      // El titular principal de la página. No se ve (en su sitio está el
      // cartel), pero es lo que leen Google y los lectores de pantalla.
      titulo: "Loco Blow Tattoo: tatuaje, eliminación de tatuajes con láser, piercing y micropigmentación capilar en A Coruña",
      entradilla: "Estudio privado de tatuaje, láser, piercing y micropigmentación capilar en A Coruña. Trabajamos solo con cita previa.",
      cita: "Pedir cita por WhatsApp",
      verTatuajes: "Ver tatuajes",
      nota: "Escríbenos y te contesta un compañero del estudio.",

      // Quiénes somos, con las fotos y el vídeo del local.
      // PROVISIONAL: texto de presentación pendiente de que el estudio lo
      // revise o mande el suyo.
      estudio: {
        etiqueta: "El estudio",
        titular: "Desde 2015 en A Coruña.",
        entradilla: "Loco Blow abrió en 2015. Hoy somos un estudio privado de tatuaje, láser, piercing y micropigmentación capilar: sin recepción abierta al público y con todo el trabajo por cita previa.",
        directo: "Si ya has venido y sabes con qué artista quieres trabajar, puedes escribirle directamente. Si no tienes su número, pídenoslo."
      },

      // Una muestra de trabajos: la primera foto de cada estilo, luego la
      // segunda… hasta `cuantas`. Se abren en el visor.
      trabajos: {
        etiqueta: "Trabajos",
        titular: "Hecho aquí.",
        entradilla: "Una muestra de cada estilo. Toca una para verla entera y, si te gusta, nos la mandas tal cual.",
        verTodos: "Ver todos los tatuajes",
        cuantas: 8
      },

      // El índice que lleva a las cuatro páginas.
      servicios: {
        etiqueta: "Lo que hacemos",
        titular: "Cuatro oficios, un estudio.",
        entradilla: "Entra en cada uno: qué es, cómo se hace y fotos de trabajos hechos aquí.",
        // Lo que dice la tarjeta de tatuajes debajo del corchete.
        cuentaTatuajes: "{estilos} estilos · {trabajos} trabajos"
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
      // Lo que se ve donde irán las fotos, mientras no lleguen.
      pendiente: "Las fotos llegan con los originales del estudio"
    },

    tatuajes: {
      verEstilos: "Ver estilos",
      // Con qué se abre WhatsApp desde el botón de cada estilo. {estilo} se
      // cambia por su nombre.
      mensajeEstilo: "Hola, os escribo desde la web. Quiero un tatuaje de estilo {estilo}: te cuento la idea, la zona y el tamaño aproximado.",
      botonEstilo: "Quiero este estilo",
      pendiente: "Las fotos de este estilo llegan con los originales del estudio"
    },

    // El visor a pantalla completa de las fotos.
    visor: {
      etiqueta: "Trabajo a pantalla completa",
      cerrar: "Cerrar",
      anterior: "Trabajo anterior",
      siguiente: "Trabajo siguiente",
      pista: "Desliza o toca a los lados de la foto para pasar. Con teclado, las flechas.",
      // El botón que manda esa misma foto por WhatsApp: así el estudio sabe
      // qué pieza y de quién. {de} se cambia por « de Gaby (Black & grey)» y
      // {enlace}, por la dirección de la foto.
      quiero: "Quiero algo así",
      mensaje: "Hola, os escribo desde la web. Me gusta este trabajo{de}: {enlace}"
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
        descripcion: "Black & grey, anime, blackwork, tradicional y más: los trabajos del estudio por estilos, con el artista de cada uno. Cita previa por WhatsApp."
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
        }
      ]
    },
    {
      id: "piercing", pagina: "piercing", menu: "Piercing",
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
      fotos: [
        // Cuando lleguen (tools/originales/piercing/):
        // { id: "piercing-1", artista: "", titulo: "Helix", alt: "Lo que se ve de verdad en la foto", img: "piercing-1", ratio: 0.8 },
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
        }
      ]
    },
    {
      id: "laser", pagina: "laser", menu: "Láser",
      etiqueta: "Láser", nombre: "Eliminación de tatuajes con láser",
      titular: "Láser.",
      // PROVISIONAL: pendiente de que el estudio confirme el enfoque
      // (eliminación completa y aclarado para tapar).
      entradilla: "Quitamos tatuajes con láser en A Coruña: entero, o lo justo para aclararlo y taparlo con uno nuevo. Primero se valora la tinta y la piel, y a partir de ahí se plantean las sesiones.",
      resumen: "Para quitar un tatuaje entero o aclararlo y taparlo con otro.",
      // PROVISIONAL: pendiente de que Riki revise los pasos
      pasos: [
        { titulo: "Valoración", texto: "Se mira el tatuaje: la tinta, los colores, los años que tiene y tu piel. Con eso se calcula cuántas sesiones hacen falta." },
        { titulo: "Sesión", texto: "El láser rompe la tinta en partículas muy pequeñas, que el cuerpo va eliminando solo. Cada sesión dura poco." },
        { titulo: "Descanso", texto: "Entre una sesión y otra pasan varias semanas: la piel se recupera y el cuerpo hace su parte." },
        { titulo: "Quitar o aclarar", texto: "Si lo que quieres es taparlo con otro tatuaje, a veces bastan unas pocas sesiones para aclararlo." }
      ],
      puntos: [
        { dato: "Quién", valor: "Riki, en el estudio desde 2015" },          // FUENTE: destacado · PROVISIONAL
        { dato: "Primera visita", valor: "Para valorar el tatuaje" },        // PROVISIONAL: pendiente de confirmar
        { dato: "Sesiones", valor: "Varias, con semanas de descanso entre una y otra" } // PROVISIONAL: pendiente de confirmar
      ],
      video: "laser",
      fotos: [
        // Un antes y después solo con permiso por escrito de la persona.
        // { id: "laser-1", artista: "riki", titulo: "Tras 4 sesiones", alt: "…", img: "laser-1", ratio: 0.8 },
      ],
      mensaje: "Hola, os escribo desde la web. Quiero información para quitar (o aclarar) un tatuaje con láser.",
      boton: "Preguntar por el láser",
      meta: {
        titulo: "Eliminación de tatuajes con láser en A Coruña · Loco Blow Tattoo",
        descripcion: "Quitar un tatuaje con láser en A Coruña, entero o aclarado para taparlo con otro. Valoración de la tinta y la piel antes de empezar. Pide información por WhatsApp."
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
        }
      ]
    }
  ],

  /* --- 4. ESTILOS ---------------------------------------------------------- */
  // La página de tatuajes va por estilos, no por tatuadores: una sección por
  // estilo, en este orden, con sus 5 a 10 mejores fotos.
  // FUENTE: el estudio lo pide así (24/09/2026): «black and grey», «anime»…
  // hasta seis. PROVISIONAL: pendiente de la lista definitiva de los seis;
  // los cuatro últimos salen de la biografía de Instagram.
  //
  // `id` es la dirección de la sección: <dominio>/tatuajes#anime
  //
  // Un estilo sin ningún trabajo no sale (ni su sección, ni en la barra, ni
  // en el inicio): aparece solo en cuanto tenga el primero.
  estilos: [
    { id: "black-and-grey", nombre: "Black & grey",
      descripcion: "Realismo en negro y grises: retratos, animales y figuras, con la sombra trabajada a mano." },
    { id: "anime",          nombre: "Anime",
      descripcion: "Personajes de anime, manga y dibujos animados, en negro o a color, fieles al trazo del original." },
    { id: "fine-line",      nombre: "Fine line",
      descripcion: "Línea fina y detalle pequeño: letras, flores y símbolos." },
    { id: "blackwork",      nombre: "Blackwork",
      descripcion: "Negro macizo y sombra: piezas grandes de inspiración japonesa, calaveras y ornamento." },
    { id: "tradicional",    nombre: "Tradicional",
      descripcion: "Línea gruesa y color plano, de la escuela de siempre." },
    { id: "acuarela",       nombre: "Acuarela",
      descripcion: "Color que se funde como en el papel, con o sin línea." }
  ],

  /* --- 5. OBRAS · los trabajos de tatuaje -------------------------------- */
  // Entre 5 y 10 por estilo, en el orden en que se ven. Cada uno es una foto
  // (`img`) o un reel (`video`, la clave de la lista 8), y lleva su estilo y
  // quién lo hizo (`artista`, de la lista 6; vacío si no se sabe).
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
  // Una foto se comparte con su dirección: <dominio>/tatuajes#obra-bg-1
  //
  // PROVISIONAL: las fotos y los reels los pasó el estudio sacados de
  // Instagram (24/09/2026). Se cambian por los originales cuando lleguen.
  obras: [
    // --- Black & grey
    { id: "bg-1", estilo: "black-and-grey", artista: "haroz", titulo: "Tengu",
      alt: "Máscara de tengu en negro y grises en el antebrazo, de nariz larga y ceño fruncido, rodeada de plumas.",
      img: "bg-1", ratio: 0.8102 },
    { id: "v-retrato", estilo: "black-and-grey", artista: "haroz", video: "retrato" },
    { id: "bg-2", estilo: "black-and-grey", artista: "raul", titulo: "Torre de Hércules",
      alt: "La Torre de Hércules en negro y grises, con los tentáculos de un pulpo enroscados alrededor de la torre.",
      img: "bg-2", ratio: 0.7997 },
    { id: "v-payasa", estilo: "black-and-grey", artista: "", video: "payasa" },
    { id: "bg-3", estilo: "black-and-grey", artista: "haroz", titulo: "Gato esfinge",
      alt: "Retrato realista de un gato esfinge en el antebrazo, en negro y grises, con los ojos en verde claro.",
      img: "bg-3", ratio: 0.7602 },
    { id: "v-tortuga", estilo: "black-and-grey", artista: "", video: "tortuga" },
    { id: "v-perro", estilo: "black-and-grey", artista: "", video: "perro" },

    // --- Anime
    { id: "an-1", estilo: "anime", artista: "maou", titulo: "Luffy",
      alt: "Luffy, de One Piece, gritando con los puños apretados, en negro y rojo en el brazo, con el cartel de «Wanted» abajo.",
      img: "an-1", ratio: 0.79 },
    { id: "v-aot", estilo: "anime", artista: "pepi", video: "aot" },
    { id: "an-2", estilo: "anime", artista: "", titulo: "Nicky, la aprendiz de bruja",
      alt: "Nicky, la aprendiz de bruja, volando en su escoba con el gato Jiji, en línea fina y punteado en el brazo.",
      img: "an-2", ratio: 0.751 },
    { id: "an-3", estilo: "anime", artista: "maou", titulo: "",
      alt: "Manga de anime en negro y grises en el antebrazo: un chico de pelo de punta que sonríe entre rayos y sombras.",
      img: "an-3", ratio: 0.7986 },
    { id: "v-garfield", estilo: "anime", artista: "pepi", video: "garfield" },
    { id: "an-5", estilo: "anime", artista: "maou", titulo: "",
      alt: "Personajes de anime en negro y grises en el antebrazo: una chica que asoma entre nubes y, debajo, otro personaje con gafas.",
      img: "an-5", ratio: 0.7959 },
    { id: "an-6", estilo: "anime", artista: "", titulo: "Totoro",
      alt: "Totoro y los dos pequeños de la película de Ghibli, en fila, en línea fina y punteado en el muslo.",
      img: "an-6", ratio: 0.7514 },
    { id: "v-perfilado", estilo: "anime", artista: "pepi", video: "perfilado" },
    { id: "an-4", estilo: "anime", artista: "pepi", titulo: "Garfield",
      alt: "Garfield a color con un ramo de margaritas, pequeño, en el antebrazo.",
      img: "an-4", ratio: 0.7894 },

    // --- Blackwork
    { id: "bw-1", estilo: "blackwork", artista: "maou", titulo: "Dragón japonés",
      alt: "Dragón japonés en negro macizo en el antebrazo, entre remolinos de viento y agua.",
      img: "bw-1", ratio: 0.7916 },
    { id: "bw-2", estilo: "blackwork", artista: "maou", titulo: "Parca",
      alt: "Parca en negro y grises en el brazo: una calavera encapuchada que sostiene un reloj de arena.",
      img: "bw-2", ratio: 0.7959 },

    // --- Tradicional
    { id: "tr-1", estilo: "tradicional", artista: "fer", titulo: "",
      alt: "Cara sonriente con un gorro de estrellas y lunas, en tradicional a color: línea negra gruesa, rojo, naranja y turquesa.",
      img: "tr-1", ratio: 0.7519 },
    { id: "tr-2", estilo: "tradicional", artista: "fer", titulo: "",
      alt: "Mujer con velo y una flor en el pecho, en tradicional en negro, en el muslo.",
      img: "tr-2", ratio: 0.7602 }
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
    { slug: "raul",  nombre: "Raúl",  instagram: "raulalvareztattoo" },
    // PROVISIONAL: se da por hecho que @fernandovoyeur es Fer.
    { slug: "fer",   nombre: "Fer",   instagram: "fernandovoyeur" },
    // PROVISIONAL: nombre sacado de su Instagram; pendiente de cómo quiere salir.
    { slug: "maou",  nombre: "Maou",  instagram: "maou_tattoo" },
    // FUENTE: firma sus fotos y reels como «Pepi Marcos, artista».
    { slug: "pepi",  nombre: "Pepi Marcos", instagram: "pepi_marcoss" },
    // FUENTE: su destacado dice «Láser en Loco Blow desde 2015» y enlaza
    // @origenlasertatuajes.
    { slug: "riki",  nombre: "Riki",  instagram: "origenlasertatuajes" }
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
