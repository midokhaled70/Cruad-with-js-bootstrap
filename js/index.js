var productNameInput = document.getElementById("productNameInput")
var productPriceInput = document.getElementById("productPriceInput")
var productCategoryInput = document.getElementById("productCategoryInput")
var productDescInput = document.getElementById("productDescInput")

var products;

if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"))
    displayProducts();
} else {
    products = []
}

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }

    products.push(product)
    displayProducts();
    clearForm()

    localStorage.setItem("products", JSON.stringify(products))
}

function displayProducts() {
    var trs = ""

    for (var i = 0; i < products.length; i++) {
        trs += ` <tr>
        <td>${i}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].desc}</td>
        <td>
          <button onclick="editProduct(${i})" class="btn btn-outline-warning">Update</button>
        </td>
        <td>
          <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>`
    }
    document.getElementById("tBody").innerHTML = trs
}

function clearForm() {
    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productDescInput.value = ""
}

function deleteProduct(index) {
    products.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(products))
    displayProducts()
}

var currentIndex; 

function editProduct(index) {
    currentIndex = index; 
    var product = products[index];

   
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productCategoryInput.value = product.category;
    productDescInput.value = product.desc;

    document.querySelector("button[onclick='addProduct()']").innerText = "Update Product";
    document.querySelector("button[onclick='addProduct()']").setAttribute("onclick", "updateProduct()");
}

function updateProduct() {
  
    products[currentIndex] = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    };

 
    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

    document.querySelector("button[onclick='updateProduct()']").innerText = "Add Product";
    document.querySelector("button[onclick='updateProduct()']").setAttribute("onclick", "addProduct()");

    clearForm();
}
