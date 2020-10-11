import {
	verificarCampo_guardarDatos,
	limpiarCampos_nuevoUsuario,
} from './accionesNuevoUsuario.js';

const add_user_button = document.querySelector('#add_user');
const cerrar_registro_button = document.querySelector('#cerrar_registro');

const [boton_cancelar, boton_guardar] = document.querySelectorAll(
	'.campo_botones .boton'
);

const expandir_retraer_usuariosNuevos = () => {
	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
	limpiarCampos_nuevoUsuario();
	document.querySelector('#user_name').focus();
};

add_user_button.addEventListener('click', () => {
	expandir_retraer_usuariosNuevos();
});
cerrar_registro_button.addEventListener('click', () => {
	expandir_retraer_usuariosNuevos();
});

boton_guardar.addEventListener('click', () => {
	verificarCampo_guardarDatos();
});

boton_cancelar.addEventListener('click', () => {
	limpiarCampos_nuevoUsuario();
	expandir_retraer_usuariosNuevos();
});

const tresPuntos_masOpciones_usuario = document.querySelector('.table_body');
tresPuntos_masOpciones_usuario.addEventListener('click', (e) => {
	// console.log(e.target.dataset.id);
	// console.log(tresPuntos_masOpciones_usuario.childNodes);
	// tresPuntos_masOpciones_usuario.childNodes.forEach((elemento) => {
	// 	// console.log(elemento.id);
	// 	if (elemento.id) {
	// 		// console.log(elemento.classList);
	// 		if (elemento.classList.contains('casilla_gris')) {
	// 			elemento.classList.toggle('casilla_gris');
	// 			// elemento.classList.toggle('casilla_blanca');
	// 		}
	// 	}
	// });
	if (e.target.dataset.id) {
		const CampoUsuarioSeleccionado = document.getElementById(
			e.target.dataset.id
		);
		CampoUsuarioSeleccionado.classList.toggle('casilla_gris');
		CampoUsuarioSeleccionado.classList.toggle('casilla_blanca');
	}
});
