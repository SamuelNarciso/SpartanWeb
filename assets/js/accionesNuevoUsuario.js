import {guardarDatos_usuarioNuevo} from './accionesFirebase.js';

export const verificarCampo_guardarDatos = async () => {
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

	if (!nombre.value || !telefono.value || !sexo) {
		alertify.error('Los campos Nombre, Telefono y Sexo son obligatorios');
	}
	if (nombre.value && telefono.value && sexo) {
		await guardarDatos_usuarioNuevo(
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

export const limpiarCampos_nuevoUsuario = () => {
	document.querySelector('#femenino').checked = 0;
	document.querySelector('#masculino').checked = 0;
	const campos_inputs = document.querySelectorAll('.camposRegistro .campo');

	campos_inputs.forEach((campo) => {
		campo.value = '';
	});

	
};
