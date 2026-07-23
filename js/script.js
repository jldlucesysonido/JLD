console.log('Proyecto listo');
const valoresIniciales = {
	heroTitulo: 'Iluminamos tus eventos',
	heroTexto: 'Monteria - Cordoba',
	servicio1: 'Sonido Profesional', servicio2: 'Iluminación LED', servicio3: 'DJ',
	carrusel: [
		{ imagen: 'img/93876382_3056940817699020_6756817574832373760_n.jpg', alt: 'Iluminación para eventos' },
		{ imagen: 'img/66823062_2464669876926120_4584997224794030080_n.jpg', alt: 'Sonido profesional para eventos' },
		{ imagen: 'img/475120499_1197725205403515_3396313588055869856_n.jpg', alt: 'DJ en vivo para eventos' }
	]
};
let contenido = structuredClone(valoresIniciales);
const diapositivas = document.querySelectorAll('.diapositiva');
const indicadores = document.querySelectorAll('.indicador');
const anterior = document.querySelector('.anterior');
const siguiente = document.querySelector('.siguiente');
let indiceActual = 0;
let temporizador;

function aplicarContenido() {
	document.querySelectorAll('[data-contenido]').forEach(elemento => { elemento.textContent = contenido[elemento.dataset.contenido]; });
	diapositivas.forEach((diapositiva, posicion) => { diapositiva.src = contenido.carrusel[posicion].imagen; diapositiva.alt = contenido.carrusel[posicion].alt; });
	document.querySelectorAll('[data-media-servicio]').forEach(contenedor => {
		const media = contenido.serviciosMedia?.[contenedor.dataset.mediaServicio] || {};
		contenedor.replaceChildren();
		if (media.imagen) { const imagen = document.createElement('img'); imagen.src = media.imagen; imagen.alt = media.alt || 'Imagen del servicio'; imagen.loading = 'lazy'; contenedor.append(imagen); }
		if (media.video) { const video = document.createElement('video'); video.src = media.video; video.controls = true; video.preload = 'metadata'; video.setAttribute('aria-label', 'Video del servicio'); contenedor.append(video); }
	});
}

aplicarContenido();

function mostrarDiapositiva(indice) {
	indiceActual = (indice + diapositivas.length) % diapositivas.length;
	diapositivas.forEach((diapositiva, posicion) => diapositiva.classList.toggle('activa', posicion === indiceActual));
	indicadores.forEach((indicador, posicion) => indicador.classList.toggle('activo', posicion === indiceActual));
}

function iniciarCarrusel() {
	clearInterval(temporizador);
	temporizador = setInterval(() => mostrarDiapositiva(indiceActual + 1), 3000);
}

anterior.addEventListener('click', () => { mostrarDiapositiva(indiceActual - 1); iniciarCarrusel(); });
siguiente.addEventListener('click', () => { mostrarDiapositiva(indiceActual + 1); iniciarCarrusel(); });
indicadores.forEach((indicador, posicion) => indicador.addEventListener('click', () => { mostrarDiapositiva(posicion); iniciarCarrusel(); }));
iniciarCarrusel();