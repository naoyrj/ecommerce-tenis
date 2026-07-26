const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cart = document.getElementById("cart");

const botonesCarrito = document.querySelectorAll(".add-cart");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");

let productosCarrito = [];

openMenu.addEventListener("click", function() {
    sideMenu.classList.add("active");
});

closeMenu.addEventListener("click", function() {
    sideMenu.classList.remove("active");
});

openCart.addEventListener("click", function() {
    cart.classList.add("active");
});

closeCart.addEventListener("click", function() {
    cart.classList.remove("active");
});

botonesCarrito.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.parentElement;

        const imagen = producto.querySelector("img").src;
        const nombre = producto.querySelector("h3").textContent;
        const precioTexto = producto.querySelector("p").textContent;

        const precio = Number(
            precioTexto.replace("$", "").replace(",", "")
        );

        const nuevoProducto = {
            imagen: imagen,
            nombre: nombre,
            precio: precio
        };

        productosCarrito.push(nuevoProducto);

        actualizarCarrito();

        cart.classList.add("active");

    });

});

function actualizarCarrito() {

    cartItems.innerHTML = "";

    productosCarrito.forEach(function(producto, index) {

        const productoCarrito = document.createElement("div");

        productoCarrito.classList.add("cart-product");

        productoCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            
            <div>
                <p>${producto.nombre}</p>
                <p>$${producto.precio.toLocaleString()}</p>
            </div>

            <button class="delete-product" data-index="${index}">
                Eliminar
            </button>
        `;

        cartItems.appendChild(productoCarrito);

    });

    cartBadge.textContent = productosCarrito.length;

    let total = 0;

    productosCarrito.forEach(function(producto) {
        total += producto.precio;
    });

    cartTotal.textContent = "$" + total.toLocaleString();

    const botonesEliminar = document.querySelectorAll(".delete-product");

    botonesEliminar.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const index = Number(boton.dataset.index);

            productosCarrito.splice(index, 1);

            actualizarCarrito();

        });

    });

}