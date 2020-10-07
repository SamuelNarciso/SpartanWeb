const db = firebase.firestore();
const contenedor_usuarios = document.querySelector(
	'.contenedor_usuarios tbody'
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
			// console.log('Document written with ID: ', docRef.id);1
		})
		.catch(function (error) {
			// console.error('Error adding document: ', error);
			alertify.error('Error en el registro del usuario.');
		});
};

const onGetUsers = (callback) => db.collection('usuarios').onSnapshot(callback);

// window.addEventListener('DOMContentLoaded', async (e) => {
window.addEventListener('DOMContentLoaded', async (e) => {
	onGetUsers((querySnapshot) => {
		contenedor_usuarios.innerHTML = '';
		querySnapshot.forEach((doc) => {
			const usuario = doc.data();
			usuario.id = doc.id;
			console.log(usuario.Direcciones[0].UbicacionGoogleMaps);

			// ComentariosExtra: "Gusta de salir despeinado y sin playera."
			// Direcciones:
			// 0: {DireccionTexto: "Revolucion #37"
			// ,  EntreCalle1: "Av. ferrocarril",
			//    UbicacionPrincipal: true, EntreCalle2: "Avenida Santa ines",
			//    ReferenciasExtra: "Saguan negro, se ve para adentro, tiene un grafiti en su pared, es la segunda casa", …}
			//
			//
			// Nombre: "Samuel Narciso"
			// NumeroTelefonico: "7352581611"
			// compras: []
			// id: "7352581611"
			// sexo: "hombre"

			contenedor_usuarios.innerHTML += `
			<tr class="contenedor_informacion_usuario">
						<td class="sexo campo_informacion ${
							usuario.sexo == 'hombre'
								? 'casilla_azul'
								: usuario.sexo == 'mujer'
								? 'casilla_rosa'
								: 'casilla_gris'
						}">
							<i class="material-icons"> face </i>
						</td>

						<td class="nombre campo_informacion">
							<p>${usuario.Nombre}</p>
						</td>
						<td class="numeroTel campo_informacion">
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
						<td class="direccion campo_informacion">
							<p> ${usuario.Direcciones[0].DireccionTexto}</p>
						</td>
						<td class="entrecalle1 campo_informacion">
							<p> ${usuario.Direcciones[0].EntreCalle1}</p>
						</td>
						<td class="entrecalle2 campo_informacion">
							<p>${usuario.Direcciones[0].EntreCalle2}</p>
						</td>
						<td class="referencias campo_informacion">
							<p>
							${usuario.Direcciones[0].ReferenciasExtra}
							</p>
						</td>
						<td class="campo_informacion campo_iconos">
							
							<i data-id='${usuario.id}' class=" content_copy  material-icons"> content_copy </i>
							<i data-id='${usuario.id}' class=" add_shopping_cart  material-icons"> add_shopping_cart </i>
							<i data-id='${usuario.id}' class=" more_vert  material-icons"> more_vert </i>
						</td>
					</tr>

			`;
		});
	});
});
