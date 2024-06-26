export async function listaDeProductos() {
    const conexion = await fetch("https://my-json-server.typicode.com/leofrenardo/dbjson/productos");
    const conexionConvertida = await conexion.json(); // Esperar la conversión a JSON
    return conexionConvertida;
}


const nuevoProducto = async (nombre, precio, imagen) => {
    try {
        const res = await fetch("https://my-json-server.typicode.com/leofrenardo/dbjson/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, precio, imagen }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const borrarProducto = async (id) => {
    try {
        const res = await fetch(`https://my-json-server.typicode.com/leofrenardo/dbjson/productos/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (err) {
        console.log(err);
    }
};

export const conexionApi = {
    listaDeProductos,
    nuevoProducto,
    borrarProducto,
};