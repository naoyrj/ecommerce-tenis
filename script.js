const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cart = document.getElementById("cart");

const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");

const addButtons = document.querySelectorAll(".add-cart");

let productsInCart = [];


// ABRIR MENÚ

openMenu.addEventListener("click", function () {

    sideMenu.classList.add("active");

});


// CERRAR MENÚ

closeMenu.addEventListener("click", function () {

    sideMenu.classList.remove("active");

});


// ABRIR CARRITO

openCart.addEventListener("click", function () {

    cart.classList.add("active");

});


// CERRAR CARRITO

closeCart.addEventListener("click", function () {

    cart.classList.remove("active");

});


// AGREGAR PRODUCTOS AL CARRITO

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product = button.parentElement;

        const productName =
            product.querySelector("h3").textContent;

        const productPrice =
            product.querySelector("p").textContent;

        const productImage =
            product.querySelector("img").src;

        const newProduct = {

            name: productName,

            price: productPrice,

            image: productImage

        };

        productsInCart.push(newProduct);

        updateCart();

    });

});


// ACTUALIZAR CARRITO

function updateCart() {

    cartItems.innerHTML = "";

    productsInCart.forEach(function (product, index) {

        const productElement =
            document.createElement("div");

        productElement.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <p>
                ${product.name}
            </p>

            <p>
                ${product.price}
            </p>

            <button
                class="delete-product"
                data-index="${index}"
            >
                Eliminar
            </button>

        `;

        cartItems.appendChild(productElement);

    });


    // ACTUALIZAR BADGE

    cartBadge.textContent =
        productsInCart.length;


    // CALCULAR TOTAL

    calculateTotal();


    // ACTIVAR BOTONES ELIMINAR

    const deleteButtons =
        document.querySelectorAll(".delete-product");


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                button.getAttribute("data-index");

            productsInCart.splice(index, 1);

            updateCart();

        });

    });

}


// CALCULAR TOTAL

function calculateTotal() {

    let total = 0;


    productsInCart.forEach(function (product) {

        const price =
            Number(
                product.price
                    .replace("$", "")
                    .replace(",", "")
            );

        total += price;

    });


    cartTotal.textContent =
        "$" + total.toLocaleString("en-US");

}