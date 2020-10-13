import {
	verificarCampo_guardarDatos,
	limpiarCampos_nuevoUsuario,
	eliminar_usuario,
} from './accionesNuevoUsuario.js';

import {
	db,
	busqueda_unico_usuario,
	bloques_usuarios_HTML,
	onGetUsers,
} from './accionesFirebase.js';

import {mas_opciones_usuario_seleccionado} from './accionesTablaUsuarios.js';

const add_user_button = document.querySelector('#add_user');
const cerrar_registro_button = document.querySelector('#cerrar_registro');
const google_maps_link = document.querySelector('#google_maps_link');
const mas_opciones_panel = document.getElementById('mas_opciones');
const tresPuntos_masOpciones_usuario = document.querySelector('.table_body');

const campo_buscar_usuario = document.querySelector('#buscar_usuario');

// Relaciones para nuevo usuario.
const [
	boton_cancel_elimina,
	boton_cancelar,
	boton_copiar,
	boton_guardar,
] = document.querySelectorAll('.campo_botones .boton');
// FIN Relaciones para nuevo usuario.

const agregar_clase_a_elemento = (
	nombreElemento,
	claseDebeTener,
	claseAgregar
) => {
	if (!nombreElemento.classList.contains(claseDebeTener)) {
		nombreElemento.classList.add(claseAgregar);
	}
};

const expandir_retraer_usuariosNuevos = () => {
	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
	limpiarCampos_nuevoUsuario();
	document.querySelector('#user_name').focus();
	boton_cancel_elimina.value = 'Cancelar';
	boton_guardar.value = 'Guardar';
	agregar_clase_a_elemento(boton_cancelar, 'oculto', 'oculto');
	agregar_clase_a_elemento(boton_copiar, 'oculto', 'oculto');
	agregar_clase_a_elemento(historial_compras, 'oculto', 'oculto');
	agregar_clase_a_elemento(historial_ubicaciones, 'oculto', 'oculto');
};

add_user_button.addEventListener('click', () => {
	expandir_retraer_usuariosNuevos();
});
cerrar_registro_button.addEventListener('click', () => {
	expandir_retraer_usuariosNuevos();
});

boton_cancelar.addEventListener('click', () => {
	limpiarCampos_nuevoUsuario();
	expandir_retraer_usuariosNuevos();
});

boton_guardar.addEventListener('click', () => {
	verificarCampo_guardarDatos();
});

boton_cancel_elimina.addEventListener('click', () => {
	if (boton_cancel_elimina.value == 'Eliminar') {
		const user_cellphone = document.querySelector('#user_cellphone').value;
		const user_name = document.querySelector('#user_name').value;
		eliminar_usuario(user_cellphone, user_name);
		expandir_retraer_usuariosNuevos();
	} else if (boton_cancel_elimina.value == 'Cancelar') {
		limpiarCampos_nuevoUsuario();
		expandir_retraer_usuariosNuevos();
	}
});

google_maps_link.addEventListener('click', () => {
	window.open('https://www.google.com.mx/maps', '_blank');
});

tresPuntos_masOpciones_usuario.addEventListener('click', (e) => {
	if (e.target.dataset.id && e.target.classList.contains('more_vert')) {
		mas_opciones_usuario_seleccionado(
			mas_opciones_panel,
			e.target.dataset.nombre,
			e.target.dataset.id
		);
	}
});

mas_opciones_panel.addEventListener('click', (e) => {
	// console.log(e.target.dataset.id);

	if (e.target.textContent == 'Datos completos') {
		expandir_retraer_usuariosNuevos();
		const id_usuario_selecciondo = e.target.dataset.id;
		boton_cancel_elimina.value = 'Eliminar';
		boton_guardar.value = 'Actualizar';
		boton_cancelar.classList.remove('oculto');
		// boton_copiar.classList.remove('oculto');
		// historial_compras.classList.remove('oculto');
		// historial_ubicaciones.classList.remove('oculto');
		const campos_datos_usuario = document.querySelectorAll(
			'.camposRegistro .campo'
		);
		busqueda_unico_usuario(id_usuario_selecciondo, campos_datos_usuario);
	} else if (e.target.textContent == 'Eliminar usuario') {
		eliminar_usuario(e.target.dataset.id, e.target.dataset.nombre);
	}
});

campo_buscar_usuario.addEventListener('keyup', () => {
	console.log(campo_buscar_usuario.value);
	if (campo_buscar_usuario.value) {
		if (!isNaN(campo_buscar_usuario.value)) {
			document.querySelector('.contenedor_usuarios .table_body').innerHTML = '';

			db.collection('usuarios')
				.orderBy('NumeroTelefonico')
				.startAt(campo_buscar_usuario.value)
				.endAt(campo_buscar_usuario.value + '~')
				.get()
				.then(function (querySnapshot) {
					querySnapshot.forEach(function (doc) {
						// console.log(doc.id, ' => ', doc.data());
						// console.log(doc.data());
						bloques_usuarios_HTML(doc.data());
					});
				})
				.catch(function (error) {
					console.log('Error getting documents: ', error);
				});
		} else {
			document.querySelector('.contenedor_usuarios .table_body').innerHTML = '';

			db.collection('usuarios')
				.orderBy('Nombre')
				.startAt(campo_buscar_usuario.value)
				.endAt(campo_buscar_usuario.value + '~')
				.get()
				.then(function (querySnapshot) {
					querySnapshot.forEach(function (doc) {
						// console.log(doc.id, ' => ', doc.data());
						bloques_usuarios_HTML(doc.data());
						// console.log(doc.data());
					});
				})
				.catch(function (error) {
					console.log('Error getting documents: ', error);
				});
		}
	} else {
		console.log('vacio!!!!!!!!!!');

		onGetUsers((querySnapshot) => {
			document.querySelector('.contenedor_usuarios .table_body').innerHTML = '';
			querySnapshot.forEach((doc) => {
				bloques_usuarios_HTML(doc.data());
			});
		});
	}

	console.log(
		'----------------------------------------------------------------------------------------------------------------------------- \n\n\n'
	);
});
