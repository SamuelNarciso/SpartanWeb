import {
	guardarDatos_usuarioNuevo,
	eliminar_usuario as eliminar_usuario_firebase,
} from './accionesFirebase.js';

export const verificarCampo_guardarDatos = async (texto_boton) => {
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
			texto_boton,
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

const mensajeEliminar = (id, nombre) => {
	swal({
		title: `Estas seguro que quieres eliminar a ${nombre}?`,
		text:
			'Una vez eliminado no podras recuperarlo, deberas registrarlo nuevamente.',
		icon: 'warning',
		buttons: [true, 'Si!, Quiero eliminarlo'],

		dangerMode: true,
	}).then((willDelete) => {
		if (willDelete) {
			swal(`Se ha borrado a ${nombre} de la base de datos`, {});
			eliminar_usuario_firebase(id);
			limpiarCampos_nuevoUsuario();
			document.getElementById('mas_opciones').innerHTML = '';
		} else {
			swal(`No se ha eliminado a ${nombre}.`);
			document.getElementById('mas_opciones').innerHTML = '';
		}
	});
};

export const eliminar_usuario = (id, nombre) => {
	mensajeEliminar(id, nombre);
};
