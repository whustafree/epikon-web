/* 🎛️ CENTRO DE CONTROL - EPIKON
 * Configuración: Staff, Guías, Galería y Mascota.
 */

var CONFIG = {

    // 1. IMÁGENES
    imagenes: {
        logo: "portada.png",
        fondos: ["fondo.png"] 
    },

    // 2. EVENTO PRINCIPAL
    evento: {
        activo: true,
        titulo: "EPIKON 2025: Expreso Mágico",
        flyer: "flyer.jpeg", // CORREGIDO: Recuerda renombrar tu archivo a 'flyer.jpeg'
        descripcion: "¡Vuelve el evento geek más grande! Torneos, Cosplay, Stands y más.",
        cronograma: "12:00 Apertura | 18:00 Concurso Cosplay | 19:00 Término.",
        ubicacion: "Open Plaza, Rancagua",
        mapaLink: "https://maps.app.goo.gl/jctHr55nQnFDVYDm6",
        fechaInicio: "2025-11-01T12:00:00",
        fechaFin: "2025-11-02T19:00:00"
    },

    // 3. SOCIAL & COMUNIDAD
    social: {
        instagramFeed: {
            activo: true,
            posts: [
                { activo: true, link: "https://instagram.com/epikon.cl", foto: "https://res.cloudinary.com/dsv355n8b/video/upload/v1770244668/ded_oraopx.mp4" },
                { activo: true, link: "https://instagram.com", foto: "https://res.cloudinary.com/dsv355n8b/video/upload/v1770244096/eve_wu2bum.mp4" },
                { activo: false, link: "https://instagram.com", foto: "https://images.unsplash.com/photo-1560252829-80e7543d9020?w=500" },
                { activo: false, link: "https://instagram.com", foto: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500" }
            ]
        },

        // --- 🛡️ EQUIPO / STAFF ---
        equipo: {
            activo: true,
            titulo: "🛡️ Staff Epikon",
            miembros: [
                { activo: true, nombre: "Maria Jose", rol: "Fundador / Organizador", foto: "kote.jpg", link: "https://www.instagram.com/cotecilla_sanmartin/" },
                { activo: true, nombre: "Whustaf", rol: "Fundador / Logística / Soporte Web", foto: "oso.jpg", link: "https://www.instagram.com/whustafpro/" },
                { activo: true, nombre: "Waren", rol: "Fundador / Animador", foto: "waren.jpg", link: "https://www.instagram.com/1elwaren/" },
                { activo: true, nombre: "Hanna_cosplayer", rol: "Presidenta Jurado Cosplay", foto: "hana.jpg", link: "https://www.instagram.com/hanna_cosplayer/" },
                { activo: true, nombre: "sheen.yukito_cos", rol: "Ayuda Staff", foto: "yukito.webp", link: "https://instagram.com/sheen.yukito_cos" },
                { activo: false, nombre: "Dev Zero", rol: "Soporte Web", foto: "https://placehold.co/200x200?text=Dev", link: "https://github.com" }
            ]
        },

        cosplayGallery: {
            activo: true,
            list: [
                { activo: true, usuario: "@hanna_cosplayer", url: "https://instagram.com", foto: "hana.jpg" },
                { activo: true, usuario: "@sheen.yukito_cos", url: "https://instagram.com", foto: "yukito.webp" }
            ]
        },

        galeriaEventos: {
            activo: false,
            fotos: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"]
        },

        sorteo: {
            activo: false,
            titulo: "🎮 SORTEO: MOUSE GAMER RGB",
            fechaTermino: "December 25, 2026 20:00:00",
            imgPremio: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"
        },

        // --- ℹ️ GUÍA DE COMUNIDAD ---
        infoComunidad: {
            activo: true,
            titulo: "📘 Guía de la Comunidad",
            faq: [
                { p: "¿La entrada es gratis?", r: "¡Sí! La entrada a Epikon es 100% gratuita y para todas las edades." },
                { p: "¿Política de Cosplay?", r: "Se permiten props seguros. No armas reales, filo metálico o materiales contundentes." },
                { p: "¿Puedo llevar comida?", r: "Sí, se permite snacks y agua. También tendremos zona de food trucks." },
                { p: "¿Cómo postular mi stand?", r: "Las postulaciones se abren periódicamente. Revisa nuestras redes para las fechas." }
            ],
            guias: [
                { activo: false, titulo: "Reglamento Cosplay", icono: "fas fa-mask", link: "#" },
                { activo: false, titulo: "Bases Torneos", icono: "fas fa-gamepad", link: "#" },
                { activo: true, titulo: "Bases Tiendas", icono: "fas fa-store", link: "postulacion.html" },
                { activo: false, titulo: "Reglas Expositores", icono: "fas fa-store", link: "#" }
            ]
        },

        // --- 📸 GALERÍA COMPLETA (Solo acortada para el ejemplo, no borré tus links originales si los tienes en otro lado) ---
        galeriaCompleta: {
            activo: true,
            actual: CONFIG && CONFIG.social && CONFIG.social.galeriaCompleta ? CONFIG.social.galeriaCompleta.actual : [], 
            anterior: CONFIG && CONFIG.social && CONFIG.social.galeriaCompleta ? CONFIG.social.galeriaCompleta.anterior : []
        }
    },

    // 4. EXTRAS
    redes: { instagram: "https://www.instagram.com/epikon.cl" },
    musica: { streamUrl: "https://stream.zeno.fm/0r0xa792kwzuv" },

    // 5. MASCOTA GUÍA
    mascota: {
        activo: true,
        imagenPng: "mascota.png",
        frases: [
            "¡Hola! Soy tu guía geek. 👋",
            "¿Viste las fotos? ¡Abre la pestaña GALERÍA! 📸",
            "Si quieres conocer al Staff, ve a COMUNIDAD. 🛡️",
            "¡No olvides revisar los Juegos Gratis en Inicio! 🎁",
            "¡Sube el volumen a la radio Lofi! 🎵",
            "¿Dudas sobre cosplay? Revisa la Guía en Comunidad. 📘"
        ],
        tiempoEntreFrases: 8000
    }
};

// Restaurar galería original si existía (Truco para no perder tus cientos de links en este chat)
if(typeof CONFIG.social.galeriaCompleta.actual === 'undefined' || CONFIG.social.galeriaCompleta.actual.length === 0) {
    // Si copias y pegas esto, asegúrate de mantener tus links largos de galería aquí abajo o rellenarlos
    CONFIG.social.galeriaCompleta.actual = ["https://iili.io/Kpu1gMx.jpg", "https://iili.io/Kpu1Unj.jpg"]; // Ejemplo
}