/* 🎛️ CENTRO DE CONTROL - EPIKON
 * Configuración Actualizada: Staff, Guías, Galería y Mascota.
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
        titulo: "EPIKON 2025: Expreso Magico",
        flyer: "flayer.jpg",
        descripcion: "¡Vuelve el evento geek más grande! Torneos, Cosplay, Stands y más.",
        cronograma: "12:00 Apertura | 18:00 Concurso Cosplay | 19:00 Termino.",
        ubicacion: "Open PLaza, Rancagua",
        mapaLink: "https://maps.app.goo.gl/jctHr55nQnFDVYDm6",
        fechaInicio: "2025-11-1T12:00:00",
        fechaFin: "2025-11-2T19:00:00"
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
                { activo: true, nombre: "Maria jose", rol: "Fundador / Organizador", foto: "kote.jpg", link: "https://www.instagram.com/cotecilla_sanmartin/" },
                { activo: true, nombre: "Whustaf", rol: "Fundador / Logistica / Soporte Web", foto: "oso.jpg", link: "https://www.instagram.com/whustafpro/" },
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

        // Desactivado porque usamos la nueva pestaña de Galería
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

        // --- 📸 GALERÍA COMPLETA ---
        galeriaCompleta: {
            activo: true,
            actual: [
                "https://iili.io/Kpu1gMx.jpg", "https://iili.io/Kpu1Unj.jpg", "https://iili.io/Kpu1kue.jpg", "https://iili.io/Kpu1N87.jpg", "https://iili.io/Kpu1jF2.jpg", "https://iili.io/Kpu1X6l.jpg", "https://iili.io/Kpu1WG4.jpg", "https://iili.io/Kpu1Vnf.jpg", "https://iili.io/Kpu1GZG.jpg", "https://iili.io/Kpu11un.jpg", "https://iili.io/Kpu1lyX.jpg", "https://iili.io/Kpu1cvt.jpg", "https://iili.io/Kpu1aaI.jpg", "https://iili.io/Kpu1Y3N.jpg", "https://iili.io/Kpu1RGR.jpg", "https://iili.io/Kpu1ACv.jpg", "https://iili.io/Kpu1TZJ.jpg", "https://iili.io/Kpu1oyF.jpg", "https://iili.io/Kpu1nv1.jpg", "https://iili.io/Kpu1B3B.jpg", "https://iili.io/Kpu1FCx.jpg", "https://iili.io/Kpu1dhb.jpg", "https://iili.io/Kpu1JTu.jpg", "https://iili.io/Kpu0pY7.jpg", "https://iili.io/Kpu0m2S.jpg", "https://iili.io/Kpu04kX.jpg", "https://iili.io/Kpu0g2I.jpg", "https://iili.io/Kpu0SrN.jpg", "https://iili.io/Kpu0jmg.jpg", "https://iili.io/Kpu0MrB.jpg", "https://iili.io/Kpu0EqQ.jpg", "https://iili.io/Kpu0lXj.jpg", "https://iili.io/Kpu0czb.jpg", "https://iili.io/Kpu0579.jpg", "https://iili.io/Kpu0Rd7.jpg", "https://iili.io/Kpu0ugS.jpg", "https://iili.io/Kpu0T12.jpg", "https://iili.io/Kpu0nzG.jpg", "https://iili.io/Kpu0Bbs.jpg", "https://iili.io/Kpu0qen.jpg", "https://iili.io/Kpu0f5X.jpg", "https://iili.io/Kpu0KJt.jpg", "https://iili.io/Kpu03gI.jpg", "https://iili.io/Kpu020N.jpg", "https://iili.io/Kpu0HsR.jpg", "https://iili.io/KpulyzJ.jpg", "https://iili.io/Kpulmba.jpg", "https://iili.io/KpulbOg.jpg", "https://iili.io/KpulD5F.jpg", "https://iili.io/KpulQUP.jpg", "https://iili.io/KpulL0B.jpg", "https://iili.io/KpulsfV.jpg", "https://iili.io/KpulPiQ.jpg"
            ],
            anterior: [
                "https://iili.io/KrKkTl4.jpg","https://iili.io/KrKkIff.jpg","https://iili.io/KrKkxiG.jpg","https://iili.io/KrKknxn.jpg",
                "https://iili.io/KrKkBDX.jpg","https://iili.io/KrKkqNt.jpg","https://iili.io/KrKkKHN.jpg","https://iili.io/KrKk2lR.jpg",
                "https://iili.io/KrKkdKv.jpg","https://iili.io/KrKkHiJ.jpg","https://iili.io/KrKk9Va.jpg","https://iili.io/KrKemDF.jpg",
                "https://iili.io/KrKebN1.jpg","https://iili.io/KrKeDAP.jpg","https://iili.io/KrKeLcQ.jpg","https://iili.io/KrKePPj.jpg",
                "https://iili.io/KrKe6Mb.jpg","https://iili.io/KrKe4ou.jpg","https://iili.io/KrKegte.jpg","https://iili.io/KrKeSA7.jpg",
                "https://iili.io/KrKe89S.jpg","https://iili.io/KrKekS2.jpg","https://iili.io/KrKeecl.jpg","https://iili.io/KrKewPf.jpg"
            ]
        }

    }, // Fin de social

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
