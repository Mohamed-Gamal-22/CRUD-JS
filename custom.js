let myName = document.getElementById('myName');
let myPrice = document.getElementById('myPrice');
let myCategory = document.getElementById('myCategory');
let myDescription = document.getElementById('myDescription');
let myBtn = document.getElementById("myButton");
let myIndex = 0;
let allProduct;
let searchButton = document.getElementById("searchInput");

if (localStorage.getItem("myProduct") != null) {
    allProduct = JSON.parse(localStorage.getItem("myProduct"));
    display();
} else {
    allProduct = [];
}

function addProduct() {

    if (validName() && validPrice()) {
        let product = {
            name: myName.value,
            price: myPrice.value,
            category: myCategory.value,
            description: myDescription.value
        };
        allProduct.push(product);
        localStorage.setItem('myProduct', JSON.stringify(allProduct));
        display();
        clearData();
    }

}

function display() {
    let temp = '';
    for (let i = 0; i < allProduct.length; i++) {
        temp += `
        <tr>
                    <td>${allProduct[i].name}</td>
                    <td>${allProduct[i].price}</td>
                    <td>${allProduct[i].category}</td>
                    <td>${allProduct[i].description}</td>
                    <td><button class="btn btn-warning" onclick="updateMe(${i})">update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteData(${i})">delete</button></td>
                </tr>
        `;
    }
    document.getElementById('tableBody').innerHTML = temp;
}

function clearData() {
    myName.value = '';
    myPrice.value = '';
    myCategory.value = '';
    myDescription.value = '';
}

function deleteData(index) {
    allProduct.splice(index, 1);
    localStorage.setItem("myProduct", JSON.stringify(allProduct));
    display();
}

function updateMe(index) {
    myIndex = index;
    myName.value = allProduct[index].name;
    myPrice.value = allProduct[index].price;
    myCategory.value = allProduct[index].category;
    myDescription.value = allProduct[index].description;
    myBtn.innerHTML = "Update Data";
}

function grandButton() {
    if (myBtn.innerHTML === "add product") addProduct();
    else editData();
}

function editData() {
    if (validName() && validPrice()) {
        allProduct[myIndex].name = myName.value;
        allProduct[myIndex].price = myPrice.value;
        allProduct[myIndex].category = myCategory.value;
        allProduct[myIndex].description = myDescription.value;
        myBtn.innerHTML = "add product";
        localStorage.setItem('myProduct', JSON.stringify(allProduct));
        display();
        clearData();
    }
}
/////////////////////////////////////////////

function search(word) {
    let temp = '';
    for (let i = 0; i < allProduct.length; i++) {
        if (allProduct[i]['name'].toLowerCase().includes(word.toLowerCase())) {
            temp += `
        <tr>
                    <td>${allProduct[i].name}</td>
                    <td>${allProduct[i].price}</td>
                    <td>${allProduct[i].category}</td>
                    <td>${allProduct[i].description}</td>
                    <td><button class="btn btn-warning" onclick="updateMe(${i})">update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteData(${i})">delete</button></td>
                </tr>
        `;
        }
    }
    document.getElementById('tableBody').innerHTML = temp;
}


function validName() {
    var regexName = /^[a-z]{3,10}[0-9]?$/;
    if (regexName.test(myName.value)) {
        document.getElementById("validNameAlert").style.display = "none";
        return true;
    }
    else {
        document.getElementById("validNameAlert").style.display = "block";
        return false;
    }
}

function validPrice() {
    var regexPrice = /^[0-9]{1,5}$/;
    if (regexPrice.test(myPrice.value)) {
        document.getElementById("validPriceAlert").style.display = "none";
        return true;
    }
    else {
        document.getElementById("validPriceAlert").style.display = "block";
        return false;
    }
}