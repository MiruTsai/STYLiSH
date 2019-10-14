const AppScoolHostAPI = "https://api.appworks-school.tw/api/1.0";
const productAPI = "https://api.appworks-school.tw/api/1.0/products/";
let pagingQuery = "?paging="
let category;
let sourcePage = `${productAPI}${category}${pagingQuery}`;
let paging;
let tag = "";
let orderList = [];
let parseOrderList = JSON.parse(localStorage.getItem("List"));
let orderListCount = document.querySelector(".orderList");

//product category 
function productPage(src, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", src);
    xhr.send();
}

let originalURL = window.location.href;
let params = new URL(originalURL);
tag = params.searchParams.get("tag")
if (tag === null) {
    category = "all";
} else {
    category = tag;
}

function search() {
    let userinput = document.querySelector(".searchBar").value;
    document.getElementById("p_container").innerHTML = null;
    productPage(productAPI + "search?keyword=" + userinput, function (response) {
        render(response);
    });
}

//search bar keyboard
function searchKey() {
    let userinput = document.querySelector(".searchBar").value;
    document.getElementById("p_container").innerHTML = null;
    if (event.keyCode === 13) {
        productPage(productAPI + "search?keyword=" + userinput, function (response) {
            render(response);
        })
    };
}

//mobile searchbar keyboard
function moSearchKey() {
    let userinput = document.querySelector(".moSearch").value;
    document.getElementById("p_container").innerHTML = null;
    if (event.keyCode === 13) {
        productPage(productAPI + "search?keyword=" + userinput, function (response) {
            render(response);
        })
    };
}

//open mobile searchbar
function openSearchBar() {
    document.querySelector(".moSearch").style.display = "inline-block";
    document.querySelector(".search_mo").style.display = "none";
    document.querySelector(".s_search_mo").style.display = "inline-block";
}

//mobile searchbar output
function moSearch() {
    let userinput = document.querySelector(".moSearch").value;
    document.getElementById("p_container").innerHTML = null;
    productPage(productAPI + "search?keyword=" + userinput, function (response) {
        render(response);
    })
}

//購物車商品數量
let cartNum = document.querySelector(".cartNum");
//如果沒有資料留下來的話，塞給它空陣列
function getLocalStorage() {
    if (localStorage.getItem("List") === null) {
        orderList = [];
        cartNum.textContent = 0;
    } else {
        //讀取使用者購買物品數量，因為localStorage已經將JSON資料轉成編碼，所以轉回來JSON
        orderList = JSON.parse(localStorage.getItem("List"));
        cartNum.textContent = orderList.length;
    }
};

getLocalStorage();

function goCart() {
    window.location.href = "cart.html";
};

function goIndex() {
    window.location.href = "index.html";
};

function goProfile() {
    window.location.href = "profile.html";
};

