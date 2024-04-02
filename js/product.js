document.addEventListener("DOMContentLoaded", function () {
  const openPopupBtns = document.querySelectorAll(".open-popup-btn");
  const closePopupBtn = document.querySelector(".close-popup-btn");
  const popup = document.querySelector(".popup");
  const productOverlay = document.querySelector(".product-overlay");
  const readMoreBtn = document.querySelector(".read-more-btn");
  const productDescription = document.querySelector(".product-description");
  const productName = document.querySelector(".product-name");
  const productPrice = document.querySelector(".product-price");
  const productImage = document.querySelector(".product-image");

  const windSpeed = document.querySelector(".wind-speed");
  const windAccuracy = document.querySelector(".wind-accuracy");
  const tempAccuracy = document.querySelector(".temp-accuracy");
  const humidityRange = document.querySelector(".humidity-range");
  const power = document.querySelector(".power");
  const prodDesc = document.querySelector(".desc");

  const cartIcon = document.querySelector(".cart-icon");
  const cartItemsContainer = document.querySelector(".cart-items");
  const clearCartBtn = document.querySelector(".clear-cart-btn");

  // Define cart array to store products
  let cart = [];

  openPopupBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const productId = btn.closest(".product").getAttribute("data-product-id");
      const product = getProductDetails(productId);
      if (product) {
        productName.textContent = product.name;
        productPrice.textContent = product.price;
        prodDesc.textContent = product.detail;
        productDescription.textContent = product.description;
        productImage.src = product.image;
        windSpeed.textContent = product.speed;
        windAccuracy.textContent = product.accuracy;
        tempAccuracy.textContent = product.tAccuracy;
        humidityRange.textContent = product.humidity;
        power.textContent = product.power;

        popup.setAttribute("data-product-id", productId); // Store product ID in popup for later use
        popup.style.display = "block";
        productOverlay.style.display = "none";
        document.getElementById("home").style.display = "none";
        document.getElementById("w-product").style.display = "none";
        document.getElementById("client").style.display = "none";
        document.getElementById("wrold-enviroment").style.display = "none";
        document.getElementById("footer").style.display = "none";
      }
    });
  });
  readMoreBtn.addEventListener("click", function () {
    // Toggle the visibility of the product description
    if (productDescription.style.display === "none") {
      productDescription.style.display = "none"; // Hide the product description
      readMoreBtn.textContent = "Read More"; // Change the button text
    } else {
      productDescription.style.display = "block"; // Show the product description
      readMoreBtn.textContent = "Read Less"; // Change the button text
    }
  });
  closePopupBtn.addEventListener("click", function () {
    popup.style.display = "none";
    productOverlay.style.display = "none"; // Hide overlay
  });

  // Event listener for "Add to Cart" button inside the popup
  document
    .querySelector(".add-to-cart-btn")
    .addEventListener("click", function () {
      const productId = popup.getAttribute("data-product-id"); // Retrieve stored product ID from popup
      const product = getProductDetails(productId);
      addToCart(product);
      // optionally close the popup after adding to cart
      popup.style.display = "none";
      productOverlay.style.display = "none"; // Hide overlay
    });
  document.querySelector(".buy-now-btn").addEventListener("click", function () {
    const productId = popup.getAttribute("data-product-id"); // Retrieve stored product ID from popup
    const product = getProductDetails(productId);
    addToCart(product);
    // Show the cart overlay after adding to cart
    productOverlay.style.display = "none";
    // Optionally close the popup after adding to cart
    popup.style.display = "none";
  });
  // Function to add product to cart
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    updateCartCount(); // Update cart count after adding an item
    displayCartItems(); // Update cart items display
    displayCartTotal();
  }

  // Function to update the cart count in the header
  function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountSpan = document.querySelector(".cart-icon span");
    cartCountSpan.textContent = `(${cartCount})`;
  }

  // Function to display products in the cart
  function displayCartItems() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      const totalPrice = parseFloat(item.price.slice(1)) * item.quantity;
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>Price: ${totalPrice.toFixed(2)}</p>
        <div class="count-btn">
            <button class="decrement-btn" data-product-id="${
              item.id
            }">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increment-btn" data-product-id="${
              item.id
            }">+</button>
        </div>
        <button class="remove-item-btn">Remove</button>`;
      cartItemsContainer.appendChild(cartItem);
    });

    cartItemsContainer.querySelectorAll(".increment-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        const product = cart.find((item) => item.id === productId);
        product.quantity++;
        updateCartCount();
        displayCartTotal();
        displayCartItems();
      });
    });

    cartItemsContainer.querySelectorAll(".decrement-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        const product = cart.find((item) => item.id === productId);
        if (product.quantity > 1) {
          product.quantity--;
          updateCartCount();
          displayCartTotal();
          displayCartItems();
        }
      });
    });
  }

  // Function to display the total price of the cart
  function displayCartTotal() {
    const cartTotalElement = document.querySelector(".cart-total");
    const cartTotal = cart.reduce(
      (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
      0
    );
    cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
  }

  // Function to get product details dynamically
  function getProductDetails(productId) {
    // This is a placeholder function.implement the logic to fetch product details based on the productId.
    // this means  fetch product details from a database or an API.
    // Return the product details object if found, otherwise return null.
    if (productId === "1") {
      return {
        id: "1",
        name: "Anemometer",
        price: "$19.99",
        image: "img/anemometer.jpg",
        speed: "MPH: 0 to 60, KM/H: 0 TO 97, Knots: 0 to 52, M/S: 0 to 27",
        accuracy:
          "+/-2 mph below 10 mph, +/- 3 mph from 10 to 30 mph, +/- 3 mph from 10 to 30 mph",
        tAccuracy: "+/- 2 degrees Fahrenheit",
        humidity: "+/- 1%",
        power: "3 AAA alkaline batteries",
        detail: "more-details",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elitEa enimassumenda distinctio ipsam impedit obcaecati A laudantium itaque hic repudiandae ipsa dict",
      };
    } else if (productId === "2") {
      return {
        id: "2",
        name: "Barometer",
        price: "$10.99",
        image: "img/Barometers.jpg",
        speed: "MPH: 0 to 60, KM/H: 0 TO 97, Knots: 0 to 52, M/S: 0 to 27",
        accuracy:
          "+/-2 mph below 10 mph, +/- 3 mph from 10 to 30 mph, +/- 3 mph from 10 to 30 mph",
        tAccuracy: "+/- 2 degrees Fahrenheit",
        humidity: "+/- 1%",
        power: "3 AAA alkaline batteries",
        detail: "more-details",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elitEa enimassumenda distinctio ipsam impedit obcaecati A laudantium itaque hic repudiandae ipsa dict",
      };
    } else if (productId === "3") {
      return {
        id: "3",
        name: "Areaexpo",
        price: "$9.99",
        image: "img/areaexpo.jpg",
        speed: "MPH: 0 to 60, KM/H: 0 TO 97, Knots: 0 to 52, M/S: 0 to 27",
        accuracy:
          "+/-2 mph below 10 mph, +/- 3 mph from 10 to 30 mph, +/- 3 mph from 10 to 30 mph",
        tAccuracy: "+/- 2 degrees Fahrenheit",
        humidity: "+/- 1%",
        power: "3 AAA alkaline batteries",
        detail: "more-details",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elitEa enimassumenda distinctio ipsam impedit obcaecati A laudantium itaque hic repudiandae ipsa dict",
      };
    } else if (productId === "4") {
      return {
        id: "4",
        name: "Wind-Vanes",
        price: "$31`.99",
        image: "img/Wind-Vanes.jpg",
        speed: "MPH: 0 to 60, KM/H: 0 TO 97, Knots: 0 to 52, M/S: 0 to 27",
        accuracy:
          "+/-2 mph below 10 mph, +/- 3 mph from 10 to 30 mph, +/- 3 mph from 10 to 30 mph",
        tAccuracy: "+/- 2 degrees Fahrenheit",
        humidity: "+/- 1%",
        power: "3 AAA alkaline batteries",
        detail: "more-details",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elitEa enimassumenda distinctio ipsam impedit obcaecati A laudantium itaque hic repudiandae ipsa dict",
      };
    } else if (productId === "5") {
      return {
        id: "5",
        name: "Hygrometer",
        price: "$14.99",
        image: "img/Hygrometers.jpg",
        speed: "MPH: 0 to 60, KM/H: 0 TO 97, Knots: 0 to 52, M/S: 0 to 27",
        accuracy:
          "+/-2 mph below 10 mph, +/- 3 mph from 10 to 30 mph, +/- 3 mph from 10 to 30 mph",
        tAccuracy: "+/- 2 degrees Fahrenheit",
        humidity: "+/- 1%",
        power: "3 AAA alkaline batteries",
        detail: "more-details",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elitEa enimassumenda distinctio ipsam impedit obcaecati A laudantium itaque hic repudiandae ipsa dict",
      };
    } else if (productId === "6") {
      return {
        id: "6",
        name: "Thermometers",
        price: "$16.99",
        image: "img/Thermometers.jpg",
        speed: "MPH: 0 to 60, KM/H: 0 TO 97, Knots: 0 to 52, M/S: 0 to 27",
        accuracy:
          "+/-2 mph below 10 mph, +/- 3 mph from 10 to 30 mph, +/- 3 mph from 10 to 30 mph",
        tAccuracy: "+/- 2 degrees Fahrenheit",
        humidity: "+/- 1%",
        power: "3 AAA alkaline batteries",
        detail: "more-details",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elitEa enimassumenda distinctio ipsam impedit obcaecati A laudantium itaque hic repudiandae ipsa dict",
      };
    } else {
      return null; // Product not found
    }
  }

  // Event listener for the cart icon button
  cartIcon.addEventListener("click", function () {
    productOverlay.style.display = "flex"; // Show overlay

    if (popup.style.display === "block") {
      popup.style.display = "none"; // Hide the popup if it's currently displayed
    }
    productOverlay.style.display = "flex";
  });

  // Event listener for the "Close Cart" button
  document.querySelector(".close-cart").addEventListener("click", () => {
    productOverlay.style.display = "none";
  });

  // Event listener for the "Clear Cart" button
  clearCartBtn.addEventListener("click", () => {
    // Clear all items from the cart array
    cart = [];
    // Update the cart count and total
    updateCartCount();
    // Refresh the cart items display
    displayCartItems();
    displayCartTotal();
  });

  // Event listener for the "Remove" buttons in the cart
  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item-btn")) {
      // Get the index of the item to be removed
      const itemIndex = Array.from(cartItemsContainer.children).indexOf(
        event.target.parentElement
      );
      // Remove the item from the cart array
      cart.splice(itemIndex, 1);
      // Update the cart count and total
      updateCartCount();
      displayCartItems(); // Refresh the cart items display
      displayCartTotal(); // Recalculate and display the cart total
    }
  });
});
