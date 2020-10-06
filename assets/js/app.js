import {guardarDatos} from './accionesFirebase.js';

const add_user_button = document.querySelector('#add_user');
const cerrar_registro_button = document.querySelector('#cerrar_registro');

const [boton_eliminar, boton_guardar] = document.querySelectorAll(
	'.campo_botones .boton'
);

const expandir_retraer_usuariosNuevos = () => {
	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
};

const verificarCampo_guardarDatos = async () => {
	const sexo = document.querySelector('#femenino').checked
		? 'mujer'
		: document.querySelector('#masculino').checked
		? 'hombre'
		: null;

	const [
		nombre,
		telefono,
		direccion,
		ubicacion,
		entreCalle1,
		entreCalle2,
		referenciasDeCallesExtra,
		comentariosExtra,
	] = document.querySelectorAll('.camposRegistro .campo');

	if (!nombre.value && !telefono.value && !sexo) {
		alertify.error(
			'No se puede guardar este usuario, necesita los campos nombre, telefono y sexo'
		);
	} else {
		if (!nombre.value) {
			alertify.error('falta colocar el nombre ');
		}
		if (!telefono.value) {
			alertify.error('falta colocar el telefono');
		}
		if (!sexo) {
			alertify.error('falta colocar el sexo');
		}
	}
	if (nombre.value && telefono.value && sexo) {
		await guardarDatos(
			nombre.value,
			telefono.value,
			direccion.value,
			ubicacion.value,
			entreCalle1.value,
			entreCalle2.value,
			referenciasDeCallesExtra.value,
			comentariosExtra.value,
			sexo
		);
	}
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

boton_eliminar.addEventListener('click', () => {
	swal({
		title: 'Cancelar registro!',
		text: 'Seguro que quieres cancelar el registro?',
		icon: 'warning',
		buttons: {cancel: 'Cancelar', confirm: true},
	});
});
