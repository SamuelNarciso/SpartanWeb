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
