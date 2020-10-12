import {
	verificarCampo_guardarDatos,
	limpiarCampos_nuevoUsuario,
} from './accionesNuevoUsuario.js';

import {db} from './accionesFirebase.js'; //TODO: Eliminar esta linea, estoy haciendo las pruebas de consulta para recuperar los datos completos de un usuario.

const add_user_button = document.querySelector('#add_user');
const cerrar_registro_button = document.querySelector('#cerrar_registro');
const google_maps_link = document.querySelector('#google_maps_link');
const mas_opciones_panel = document.getElementById('mas_opciones');

// Relaciones para nuevo usuario.
const historial_compras = document.querySelector('#historial_compras');
const historial_ubicaciones = document.querySelector('#historial_ubicaciones');
const boton_cancel_elimina = document.querySelector('#nuevo_usuario_Eliminar');
const boton_cancelar = document.querySelector('#nuevo_usuario_Cancelar');
const boton_copiar = document.querySelector('#nuevo_usuario_CopiarDatos');
const boton_guardar = document.querySelector('#nuevo_usuario_Guardar');
// FIN Relaciones para nuevo usuario.

const expandir_retraer_usuariosNuevos = () => {

	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
	limpiarCampos_nuevoUsuario();
	document.querySelector('#user_name').focus();
	boton_cancel_elimina.value = 'Cancelar';
	if (!boton_cancelar.classList.contains('oculto')) {
		boton_cancelar.classList.add('oculto');
	}
	if (!boton_copiar.classList.contains('oculto')) {
		boton_copiar.classList.add('oculto');
	}
	if (!historial_compras.classList.contains('oculto')) {
		historial_compras.classList.add('oculto');
	}
	if (!historial_ubicaciones.classList.contains('oculto')) {
		historial_ubicaciones.classList.add('oculto');
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

// TODO: Metodo a mover
const eliminarUsuario = (id) => {
	db.collection('usuarios')
		.doc(id)
		.delete()
		.then(function () {
			console.log('Document successfully deleted!');
		})
		.catch(function (error) {
			console.error('Error removing document: ', error);
		});
};

boton_cancel_elimina.addEventListener('click', () => {
	if (boton_cancel_elimina.value == 'Eliminar') {
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

		eliminarUsuario(telefono.value);
	} else if (boton_cancel_elimina.value == 'Cancelar') {
		limpiarCampos_nuevoUsuario();
		expandir_retraer_usuariosNuevos();
	}
});

google_maps_link.addEventListener('click', () => {
	window.open('https://www.google.com.mx/maps', '_blank');
});

const tresPuntos_masOpciones_usuario = document.querySelector('.table_body');
tresPuntos_masOpciones_usuario.addEventListener('click', (e) => {
	if (e.target.dataset.id) {
		const CampoUsuarioSeleccionado = document.getElementById(
			e.target.dataset.id
		);
		console.log(CampoUsuarioSeleccionado.id);

		mas_opciones_panel.innerHTML = `
		<th  class="mini">Usuario: ${CampoUsuarioSeleccionado.id}</th>
		<th data-id="${CampoUsuarioSeleccionado.id}" class="color_azul hover_link">Datos completos</th>
		<th data-id="${CampoUsuarioSeleccionado.id}" class="color_rojo hover_link">Eliminar usuario</th>
		<th data-id="${CampoUsuarioSeleccionado.id}" class="oculto unavailable">Historial de compras</th>
		<th data-id="${CampoUsuarioSeleccionado.id}" class="oculto unavailable">Nueva compra</th>`;

		setTimeout(() => {
			mas_opciones_panel.innerHTML = '';
		}, 30000);
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
		//TODO: DESDE AQUI SON MERAS PRUEBAS Y DEBO BORRAR
		// console.log	('NumeroTelefonico', '==', `${id_usuario_selecciondo}`);
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

		db.collection('usuarios')
			.where('NumeroTelefonico', '==', `${id_usuario_selecciondo}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// console.log(` ID :: ${doc.id} => Mas datos: ${doc.data()}`);
					// console.log(doc.data());

					nombre.value = doc.data().Nombre;
					telefono.value = doc.data().NumeroTelefonico;
					direccion.value = doc.data().Direcciones[0].DireccionTexto;
					ubicacion.value = doc.data().Direcciones[0].UbicacionGoogleMaps;
					entreCalle1.value = doc.data().Direcciones[0].EntreCalle1;
					entreCalle2.value = doc.data().Direcciones[0].EntreCalle2;
					referenciasDeCallesExtra.value = doc.data().Direcciones[0].ReferenciasExtra;
					comentariosExtra.value = doc.data().ComentariosExtra;

					if (doc.data().sexo == 'hombre') {
						const sexo = (document.getElementById('masculino').checked = 1);
					} else if (doc.data().sexo == 'mujer') {
						const sexo = (document.getElementById('femenino').checked = 1);
					}
				});
			});

		const campos_nuevo_usuario = document.querySelectorAll(
			'.camposRegistro .campo'
		);
		// console.log(campo);
		// telefono.readOnly = true;
	} else if (e.target.textContent == 'Eliminar usuario') {
		const id_usuario_selecciondo = e.target.dataset.id;
		eliminarUsuario(id_usuario_selecciondo);
	}
});
