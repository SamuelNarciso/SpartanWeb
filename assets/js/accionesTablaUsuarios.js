const contenedor_usuarios = document.querySelector(
	'.contenedor_usuarios tbody'
);

contenedor_usuarios.addEventListener('click', (e) => {
	// console.log(e.target.id);

	const tres_puntos = document.getElementById(`${e.target.id}`);
	if (tres_puntos) {
		console.log(tres_puntos.parentElement);
		tres_puntos.parentElement.innerHTML += `
		<div>
					<div class="titulo"><h1>Titulo</h1></div>
					<div class="contenido"><p>contenido jdsaljdsajdl</p></div>
				</div>
		`;
	}
});
