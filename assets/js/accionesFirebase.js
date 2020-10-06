const db = firebase.firestore();

export const guardarDatos = (
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
			// console.log('Document written with ID: ', docRef.id);
		})
		.catch(function (error) {
			console.error('Error adding document: ', error);
		});
};
