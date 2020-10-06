const db = firebase.firestore();
const add_user_button = document.querySelector('#add_user');
const RegistroUsuario_ventana = document.querySelector('.RegistroUsuario');

const cerrar_registro_button = document.querySelector('#cerrar_registro');

const nuevo_usuario_Eliminar = document.querySelector(
	'#nuevo_usuario_Eliminar'
);
const nuevo_usuario_Copiar = document.querySelector('#nuevo_usuario_Copiar');
const nuevo_usuario_Editar = document.querySelector('#nuevo_usuario_Editar');
const nuevo_usuario_Guardar = document.querySelector('#nuevo_usuario_Guardar');

add_user_button.addEventListener('click', () => {
	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
});

cerrar_registro_button.addEventListener('click', () => {
	const RegistroUsuario = document.querySelector('.RegistroUsuario');
	RegistroUsuario.classList.toggle('expand');
});

nuevo_usuario_Guardar.addEventListener('click', () => {
    const campos = document.querySelectorAll('.camposRegistro .campo');
    const [nombre,telefono,direccion,ubicacion,entreCalle1,entreCalle2,comentariosExtra] = campos;
    console.log(nombre.value);
    
});
