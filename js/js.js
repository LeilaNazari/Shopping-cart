//variables
const products = document.querySelector("#products"),
  shoppingCartContent = document.querySelector("#CartContent tbody");

countNumber();
//eventListeners
eventListener();
function eventListener() {
  //access to product
  products.addEventListener("click", AccessProduct);

  //remove product from list
  shoppingCartContent.addEventListener("click", removeProduct);

  //show product in the local storage when page loaded
  document.addEventListener("DOMContentLoaded", showProductInLS);
}

//functions
//access to product
function AccessProduct(e) {
  e.preventDefault();
  //using deligation for access to selected product
  if (e.target.classList.contains("add-cart")) {
    //find product parent with parent element
    const product = e.target.parentElement.parentElement.parentElement;
    getProductInfo(product);
  }
}

//getting product info that user click on
function getProductInfo(pro) {
  //getting info
  productInfo = {
    id: pro.querySelectorAll("a")[3].getAttribute("data-code"),
    productName: pro.querySelector("h6").textContent,
    productPrice: pro.querySelector("h5").textContent,
    image: pro.querySelector("img").src,
  };
  addToCart(productInfo);
}
function addToCart(proInfo) {
  //create <Li> tag
  let row = document.createElement("tr");
  //build HTML Template
  row.innerHTML = `<td class="product_cart_item">
    <div class="product_cart_item_pic">
      <img src="${proInfo.image}" alt="" />
    </div>
    <div class="product_cart_item_text">
      <h6>${proInfo.productName}</h6>
      
    </div>
  </td>
  <td class="quantity_item">
    <div class="quantity">
      <div class="pro-qty-2">
        <input type="text" value="1" />
      </div>
    </div>
  </td>
  <td class="cart_price"><h5>${proInfo.productPrice}</h5></td>
  <td class="cart_close" data-code="${proInfo.id}"><i class="fa fa-close"></i></td>                          
 `;
  // countPrice(row);
  //add to cart
  shoppingCartContent.appendChild(row);

  countNumber();

  addToLocalStorage(proInfo);
  // countPrice(proInfo.productPrice);
}
function addToLocalStorage(product) {
  //get array of product from LS
  let products = getFromLocalStorage();

  //add the new product to array in local
  products.push(product);

  //set with LS
  localStorage.setItem("products", JSON.stringify(products));
}
function getFromLocalStorage() {
  let pro;

  //if product exist
  if (localStorage.getItem("products")) {
    pro = JSON.parse(localStorage.getItem("products"));
  } else {
    pro = [];
  }
  return pro;
}
//Count the number of products
function countNumber() {
  document
    .querySelector("#count-pro")
    .setAttribute("data-count", document.querySelectorAll("tbody tr").length);
  let count = parseInt(
    document.querySelector("#count-pro").getAttribute("data-count")
  );

  document.querySelector("#count-pro").textContent = count;
}

//Count the number of products
// function countPrice(price) {
//   let sum;
//   let mainPrice = document.querySelector(".price").innerHTML;
//   console.log(mainPrice);
//   console.log(price);
//   let p = parseInt(price);
//   let m = parseInt(mainPrice);
//   sum = p + m;
//   document.querySelector(".price").innerHTML = sum;
//   console.log(sum);

//   // document.querySelector("#count-pro").textContent = count;
// }

//remove product from list
function removeProduct(e) {
  let product, productId;
  if (e.target.classList.contains("fa-close")) {
    e.target.parentElement.parentElement.remove();
    product = e.target.parentElement.parentElement;

    productId = product
      .querySelectorAll("td[class=cart_close]")[0]
      .getAttribute("data-code");
  }
  countNumber();
  removeProductFromLS(productId);
}
// remove product from local storage
function removeProductFromLS(id) {
  let productLS = getFromLocalStorage();
  productLS.forEach(function (product, index) {
    if (product.id === id) {
      productLS.splice(index, 1);
    }
  });
  localStorage.setItem("products", JSON.stringify(productLS));
}

//show product in LS when page load

function showProductInLS() {
  let productLS = getFromLocalStorage();
  //add product into the cart
  productLS.forEach(function (proInfo) {
    //create <Li> tag
    let row = document.createElement("tr");
    //build HTML Template
    row.innerHTML = `<td class="product_cart_item">
    <div class="product_cart_item_pic">
      <img src="${proInfo.image}" alt="" />
    </div>
    <div class="product_cart_item_text">
      <h6>${proInfo.productName}</h6>
      
    </div>
  </td>
  <td class="quantity_item">
    <div class="quantity">
      <div class="pro-qty-2">
        <input type="text" value="1" />
      </div>
    </div>
  </td>
  <td class="cart_price"><h5>${proInfo.productPrice}</h5></td>
  <td class="cart_close" data-code="${proInfo.id}"><i class="fa fa-close"></i></td>
 `;

    shoppingCartContent.appendChild(row);
  });
  countNumber();
}
