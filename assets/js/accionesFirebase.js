export const db = firebase.firestore();
const contenedor_usuarios = document.querySelector(
	'.contenedor_usuarios .table_body'
);
export const guardarDatos_usuarioNuevo = (
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
			alertify.success('Usuario registrado correctamente');
		})
		.catch(function (error) {
			alertify.error('Error en el registro del usuario.');
		});
};

const onGetUsers = (callback) => db.collection('usuarios').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async (e) => {
	onGetUsers((querySnapshot) => {
		contenedor_usuarios.innerHTML = '';
		querySnapshot.forEach((doc) => {
			const usuario = doc.data();
			usuario.id = doc.id;

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
								Direccion Google Maps
							</a>
						</td>
						<td class=" campo_informacion">
							<p> ${usuario.Direcciones[0].DireccionTexto}</p>
						</td>
						<td class=" campo_informacion">
							<p> ${usuario.Direcciones[0].EntreCalle1}</p>
						</td>
						<td class=" campo_informacion">
							<p>${usuario.Direcciones[0].EntreCalle2}</p>
						</td>
						<td class=" campo_informacion">
							<p>
							${usuario.Direcciones[0].ReferenciasExtra}
							</p>
						</td>
						<td class="campo_informacion campo_iconos">
							
							<i data-id='${usuario.id}'  class="  icono_pulsable content_copy  material-icons"> content_copy </i>
							<i data-id='${usuario.id}'  class=" unavailable  add_shopping_cart  material-icons"> add_shopping_cart </i>
							<i data-id='${usuario.id}'  class=" icono_pulsable more_vert  material-icons"> more_vert </i>
						</td>
					
					</tr>

			`;
		});
	});
});
