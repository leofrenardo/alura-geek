import { conexionApi } from "./conectaAPI.js";
import { accionFormulario } from "./accionFormulario.js";

const lista = document.querySelector("[data-lista]");
const elFormulario = document.querySelector("[data-form]");


function crearProducto(nombre, precio, imagen, id) {
    const producto = document.createElement("div");
    producto.classList.add("card");
    producto.innerHTML = `
        <figure>
            <img class="producto-img" src="${imagen}" alt="${imagen}" />
            <figcaption class="card-container--info">${nombre}</figcaption>
        </figure>
        <div class="card-container--value">
            <p>$ ${precio}</p>
            <button class="delete-button" data-id="${id}">
                <img src="./assets/img/delete_icon.svg" alt="eliminar" />
            </button>
        </div>`;

    const deleteButton = producto.querySelector("[data-id]");
    deleteButton.addEventListener("click", () => {
        Swal.fire({
            title: '¿Está seguro de borrar este producto?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await conexionApi.borrarProducto(id);
                producto.remove();
                Swal.fire(
                    '¡Borrado!',
                    'El producto ha sido borrado.',
                    'success'
                );
            }
        });
    });

    lista.appendChild(producto);
    return producto;
}

const render = async () => {
    try {
        const listado = await conexionApi.listaDeProductos();
        lista.innerHTML = ''; // Limpiar la lista antes de renderizar
        listado.forEach(producto => {
            lista.appendChild(crearProducto(
                producto.nombre,
                producto.precio,
                producto.imagen,
                producto.id
            ));
        });
    } catch (error) {
        console.log(error);
    }
};

elFormulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre-producto]").value;
    const precio = document.querySelector("[data-precio-producto]").value;
    const imagen = document.querySelector("[data-imagen-producto]").value;

    try {
        await conexionApi.nuevoProducto(nombre, precio, imagen);
        render(); // Volver a renderizar la lista de productos
        Swal.fire(
            '¡Agregado!',
            'Tu producto ha sido agregado.',
            'success'
        );
        elFormulario.reset(); // se limpia el formulario después de agregar el producto
    } catch (err) {
        console.log(err);
    }
});

render();
accionFormulario();

export const mostrarProducto = { render };