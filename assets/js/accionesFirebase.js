export const db = firebase.firestore();
const contenedor_usuarios = document.querySelector(
	'.contenedor_usuarios .table_body'
);
export const guardarDatos_usuarioNuevo = (
	texto_boton,
	nombre,
	telefono,
	direccion,
	ubicacion,
	entreCalle1,
	entreCalle2,
	referenciasDeCallesExtra,
	comentariosExtra,
	sexo
) => {
	db.collection('usuarios')
		.doc(telefono)
		.set({
			Nombre: nombre,
			NumeroTelefonico: telefono,
			Direcciones: [
				{
					DireccionTexto: direccion,
					EntreCalle1: entreCalle1,
					EntreCalle2: entreCalle2,
					ReferenciasExtra: referenciasDeCallesExtra,
					UbicacionGoogleMaps: ubicacion,
					UbicacionPrincipal: true,
				},
			],
			ComentariosExtra: comentariosExtra,
			sexo: sexo,
			compras: [],
		})
		.then(function (docRef) {
			switch (texto_boton) {
				case 'Guardar':
					alertify.success('Usuario registrado correctamente');
					break;
				case 'Actualizar':
					alertify.success('Usuario actualizado correctamente');
					break;
				default:
					alertify.success('Operacion realizada correctamente');
					break;
			}
		})
		.catch(function (error) {
			alertify.error('Error en el registro del usuario.');
		});
};

export const onGetUsers = (callback) =>
	db.collection('usuarios').onSnapshot(callback);

export const bloques_usuarios_HTML = (usuario) => {
	contenedor_usuarios.innerHTML += `
			<tr id='${usuario.id}' class="contenedor_informacion_usuario casilla_blanca">
						<td class="sexo campo_informacion ${
							usuario.sexo == 'hombre'
								? 'casilla_azul'
								: usuario.sexo == 'mujer'
								? 'casilla_rosa'
								: 'casilla_gris'
						}">
							<i class="material-icons"> face </i>
						</td>

						<td class=" campo_informacion">
							<p>${usuario.Nombre}</p>
						</td>
						<td class=" campo_informacion">
							<p>${usuario.NumeroTelefonico}</p>
						</td>
						<td class="ubicacion campo_informacion">
							<a
								href="${usuario.Direcciones[0].UbicacionGoogleMaps}"
								class="ubicacion_link"
								target="_blank"
							>
								Ubicacion Google Maps
							</a>
						</td>
						<td class=" campo_informacion">
							<p> ${usuario.Direcciones[0].DireccionTexto}</p>
						</td>
						<td class="  campo_informacion ipad">
							<p> ${usuario.Direcciones[0].EntreCalle1}</p>
						</td>
						<td class=" campo_informacion ipad ">
							<p>${usuario.Direcciones[0].EntreCalle2}</p>
						</td>
						<td class=" campo_informacion celular">
							<p>
							${usuario.Direcciones[0].ReferenciasExtra}
							</p>
						</td>
						<td class="campo_informacion campo_iconos">
							
							<i data-id='${usuario.id}'  data-nombre='${
		usuario.Nombre
	}' class=" unavailable  content_copy  material-icons"> content_copy </i>
							<i data-id='${usuario.id}'  data-nombre='${
		usuario.Nombre
	}' class="  unavailable  add_shopping_cart  material-icons"> add_shopping_cart </i>
							<i data-id='${usuario.id}'  data-nombre='${
		usuario.Nombre
	}' class="  icono_pulsable more_vert  material-icons"> more_vert </i>
						</td>
					
					</tr>

			`;
};

window.addEventListener('DOMContentLoaded', async (e) => {
	onGetUsers((querySnapshot) => {
		contenedor_usuarios.innerHTML = '';
		querySnapshot.forEach((doc) => {
			let usuario = doc.data();
			usuario.id = doc.id;
			bloques_usuarios_HTML(usuario);
		});
	});
});

export const eliminar_usuario = (id_usuario) => {
	db.collection('usuarios')
		.doc(id_usuario)
		.delete()
		.then(function () {
			alertify.warning('Se ha eliminado el usuario');
			// console.log('Document successfully deleted!');
		})
		.catch(function (error) {
			alertify.warning('Algo fallo al intentar eliminar a este usuario.');
			// console.error('Error removing document: ', error);
		});
};

export const busqueda_unico_usuario = (
	id_usuario_selecciondo,
	[
		nombre,
		telefono,
		direccion,
		ubicacion,
		entreCalle1,
		entreCalle2,
		referenciasDeCallesExtra,
		comentariosExtra,
	]
) => {
	// console.log(id_usuario_selecciondo);

	db.collection('usuarios')
		.where('NumeroTelefonico', '==', `${id_usuario_selecciondo}`)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				nombre.value = doc.data().Nombre;
				telefono.value = doc.data().NumeroTelefonico;
				direccion.value = doc.data().Direcciones[0].DireccionTexto;
				ubicacion.value = doc.data().Direcciones[0].UbicacionGoogleMaps;
				entreCalle1.value = doc.data().Direcciones[0].EntreCalle1;
				entreCalle2.value = doc.data().Direcciones[0].EntreCalle2;
				referenciasDeCallesExtra.value = doc.data().Direcciones[0].ReferenciasExtra;
				comentariosExtra.value = doc.data().ComentariosExtra;

				doc.data().sexo == 'hombre'
					? (document.getElementById('masculino').checked = 1)
					: (document.getElementById('femenino').checked = 1);
			});
		});
};
