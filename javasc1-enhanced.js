const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "air.png",
      },
      {
        code: "darkblue",
        img: "air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "jordan.png",
      },
      {
        code: "green",
        img: "jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "blazer.png",
      },
      {
        code: "green",
        img: "blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "crater.png",
      },
      {
        code: "lightgray",
        img: "crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "hippie.png",
      },
      {
        code: "black",
        img: "hippie2.png",
      },
    ],
  },
];

let chosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Change the chosen product
    chosenProduct = products[index];

    // Change texts of currentProduct
    currentProductTitle.textContent = chosenProduct.title;
    currentProductPrice.textContent = "$" + chosenProduct.price;
    currentProductImg.src = chosenProduct.colors[0].img;

    // Assign new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = chosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = chosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Search functionality
const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");

searchIcon.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    searchProducts(searchTerm);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      searchProducts(searchTerm);
    }
  }
});

function searchProducts(term) {
  const foundProduct = products.find(product => 
    product.title.toLowerCase().includes(term)
  );
  
  if (foundProduct) {
    const index = products.findIndex(p => p.id === foundProduct.id);
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    chosenProduct = foundProduct;
    
    // Update product details
    currentProductTitle.textContent = chosenProduct.title;
    currentProductPrice.textContent = "$" + chosenProduct.price;
    currentProductImg.src = chosenProduct.colors[0].img;
    
    // Update colors
    currentProductColors.forEach((color, index) => {
      if (chosenProduct.colors[index]) {
        color.style.backgroundColor = chosenProduct.colors[index].code;
      }
    });
    
    // Scroll to product section
    document.getElementById("product").scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Product not found!");
  }
}

// Newsletter subscription
const newsletterButton = document.querySelector(".fButton");
const newsletterInput = document.querySelector(".fInput");

newsletterButton.addEventListener("click", () => {
  const email = newsletterInput.value;
  if (email && email.includes("@")) {
    alert("Thank you for subscribing!");
    newsletterInput.value = "";
  } else {
    alert("Please enter a valid email address.");
  }
});

// Payment form validation
const payButton = document.querySelector(".payButton");
const payInputs = document.querySelectorAll(".payInput");

payButton.addEventListener("click", (e) => {
  e.preventDefault();
  
  let isValid = true;
  payInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderBottom = "1px solid red";
    } else {
      input.style.borderBottom = "1px solid gray";
    }
  });
  
  if (isValid) {
    alert("Order placed successfully! Thank you for your purchase.");
    payment.style.display = "none";
    payInputs.forEach(input => input.value = "");
  } else {
    alert("Please fill in all required fields.");
  }
});

// Auto-slide functionality
let currentSlide = 0;
const autoSlideInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % products.length;
  wrapper.style.transform = `translateX(${-100 * currentSlide}vw)`;
  
  // Update product details
  chosenProduct = products[currentSlide];
  currentProductTitle.textContent = chosenProduct.title;
  currentProductPrice.textContent = "$" + chosenProduct.price;
  currentProductImg.src = chosenProduct.colors[0].img;
  
  currentProductColors.forEach((color, index) => {
    if (chosenProduct.colors[index]) {
      color.style.backgroundColor = chosenProduct.colors[index].code;
    }
  });
}, 5000);

// Stop auto-slide on user interaction
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
  });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
