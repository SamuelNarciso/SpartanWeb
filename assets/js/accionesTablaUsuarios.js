export const mas_opciones_usuario_seleccionado = (
	mas_opciones_panel,
	NombreUsuarioSeleccionado,
	IdUsuarioSeleccionado
) => {
	mas_opciones_panel.innerHTML = `
<th  class="mini">Usuario: ${NombreUsuarioSeleccionado}</th>
<th data-nombre="${NombreUsuarioSeleccionado}" data-id="${IdUsuarioSeleccionado}" class="color_azul hover_link">Datos completos</th>
<th data-nombre="${NombreUsuarioSeleccionado}" data-id="${IdUsuarioSeleccionado}" class="color_rojo hover_link">Eliminar usuario</th>
<th data-nombre="${NombreUsuarioSeleccionado}" data-id="${IdUsuarioSeleccionado}" class="oculto unavailable">Historial de compras</th>
<th data-nombre="${NombreUsuarioSeleccionado}" data-id="${IdUsuarioSeleccionado}" class="oculto unavailable">Nueva compra</th>`;

	setTimeout(() => {
		mas_opciones_panel.innerHTML = '';
	}, 30000);
};
