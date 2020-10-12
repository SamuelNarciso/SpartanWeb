import {
	verificarCampo_guardarDatos,
	limpiarCampos_nuevoUsuario,
} from './accionesNuevoUsuario.js';

const add_user_button = document.querySelector('#add_user');
const cerrar_registro_button = document.querySelector('#cerrar_registro');
const google_maps_link = document.querySelector('#google_maps_link');
const mas_opciones_panel = document.getElementById('mas_opciones');

// Relaciones para nuevo usuario.
const historial_compras = document.querySelector('#historial_compras');
const historial_ubicaciones = document.querySelector('#historial_ubicaciones');
const boton_cancel_elimina = document.querySelector('#nuevo_usuario_Eliminar');
const boton_editar = document.querySelector('#nuevo_usuario_Editar');
const boton_copiar = document.querySelector('#nuevo_usuario_CopiarDatos');
const boton_guardar = document.querySelector('#nuevo_usuario_Guardar');
// FIN Relaciones para nuevo usuario.

const expandir_retraer_usuariosNuevos = () => {
	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
	limpiarCampos_nuevoUsuario();
	document.querySelector('#user_name').focus();
	boton_cancel_elimina.value = 'Cancelar';
	if (!boton_editar.classList.contains('oculto')) {
		boton_editar.classList.add('oculto');
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

boton_cancel_elimina.addEventListener('click', () => {
	limpiarCampos_nuevoUsuario();
	expandir_retraer_usuariosNuevos();
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
	if (e.target.textContent == 'Datos completos') {
		expandir_retraer_usuariosNuevos();

		boton_cancel_elimina.value = 'Eliminar';
		boton_editar.classList.remove('oculto');
		// boton_copiar.classList.remove('oculto');
		// historial_compras.classList.remove('oculto');
		// historial_ubicaciones.classList.remove('oculto');

		const campos_nuevo_usuario = document.querySelectorAll(
			'.camposRegistro .campo'
		);
		campos_nuevo_usuario.forEach((campo) => {
			console.log(campo);
			campo.readOnly = true;
		});
	}
});
