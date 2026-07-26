const openMenuButton = document.getElementById("openMenu");
const closeMenuButton = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cart = document.getElementById("cart");

const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");

const addCartButtons = document.querySelectorAll(".add-cart");

let cartProducts = [];

openMenuButton.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

closeMenuButton.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});

openCartButton.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCartButton.addEventListener("click", () => {
    cart.classList.remove("active");
});

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product = button.closest(".products__item");

        const productImage = product.querySelector(".products__image").src;

        const productName = product.querySelector(".products__title").textContent.trim();

        const productPriceText = product.querySelector(".products__price").textContent.trim();

        const productPrice = Number(
            productPriceText
                .replace("$", "")
                .replace(",", "")
        );

        const newProduct = {
            id: Date.now(),
            name: productName,
            price: productPrice,
            image: productImage
        };

        cartProducts.push(newProduct);

        updateCart();

        cart.classList.add("active");

        alert(`${productName} fue agregado al carrito`);

    });

});

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cartProducts.forEach((product) => {

        total += product.price;

        const cartProduct = document.createElement("div");

        cartProduct.classList.add("cart__item");

        cartProduct.innerHTML = `
            <img
                class="cart__image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart__info">

                <p class="cart__product-name">
                    ${product.name}
                </p>

                <p class="cart__product-price">
                    $${product.price.toLocaleString("es-MX")}
                </p>

            </div>

            <button
                class="cart__delete"
                type="button"
                data-id="${product.id}"
                aria-label="Eliminar producto"
            >

                <img
                    class="cart__delete-image"
                    src="img/borrar.png"
                    alt="Eliminar producto"
                >

            </button>
        `;

        cartItems.appendChild(cartProduct);

    });

    cartBadge.textContent = cartProducts.length;

    cartTotal.textContent = `$${total.toLocaleString("es-MX")}`;

    const deleteButtons = document.querySelectorAll(".cart__delete");

    deleteButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const productId = Number(
                button.dataset.id
            );

            cartProducts = cartProducts.filter(
                (product) => product.id !== productId
            );

            updateCart();

        });

    });

}

const menuLinks = document.querySelectorAll(".side-menu__link");

menuLinks.forEach((link) => {

    link.addEventListener("click", () => {

        sideMenu.classList.remove("active");

    });

});