const AppScoolHostAPI = "https://api.appworks-school.tw/api/1.0";
const productAPI = "https://api.appworks-school.tw/api/1.0/products/";
const mask = document.querySelector(".mask");
const orderListCount = document.querySelector(".orderList");
let pagingQuery = "?paging=";
let category;
let sourcePage = productAPI + category + pagingQuery;
let tag = "";

//ajax 
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


function createElement(htmlTag, className, textContent) {
    let obj = document.createElement(htmlTag);
    obj.className = className;
    if (textContent) {
        obj.textContent = textContent;
    }
    return obj;
}
//open mobile searchbar
function openSearchBar() {
    mask.style.display = "block";
    document.querySelector(".moSearch").style.display = "inline-block";
    document.querySelector(".search_mo").style.display = "none";
    document.querySelector(".s_search_mo").style.display = "inline-block";
}

//close mobile searchbar
function closeMask() {
    document.getElementById("p_container").innerHTML = null;
    document.querySelector(".moSearch").style.display = "none";
    document.querySelector(".search_mo").style.display = "block";
    document.querySelector(".s_search_mo").style.display = "none";
    mask.style.display = "none";
}
mask.addEventListener("click", closeMask);

function search() {
    let userInput = document.querySelector(".searchBar").value;
    if (!userInput) {
        alert("請輸入欲搜尋商品！");
        return
    }
    document.getElementById("p_container").innerHTML = null;
    productPage(productAPI + "search?keyword=" + userInput, function (response) {
        render(response);
    });
}

//search bar keyboard
function searchKey() {
    let userInput = document.querySelector(".searchBar").value;
    if (event.keyCode === 13) {
        if (!userInput) {
            alert("請輸入欲搜尋商品！");
            return
        } else {
            productPage(productAPI + "search?keyword=" + userInput, function (response) {
                closeMask();
                document.getElementById("p_container").innerHTML = null;
                render(response);
            });
        }
    } else {
        return
    }
}

//mobile searchbar keyboard
function moSearchKeyCode() {
    let userInput = document.querySelector(".moSearch").value;
    if (event.keyCode === 13) {
        if (!userInput) {
            alert("請輸入欲搜尋商品！");
            return
        } else {
            productPage(productAPI + "search?keyword=" + userInput, function (response) {
                closeMask();
                render(response);
            });
        }
    } else {
        return
    }
}

//mobile searchbar
function moSearch() {
    let userInput = document.querySelector(".moSearch").value;
    if (!userInput) {
        alert("請輸入欲搜尋商品！");
        return
    } else {
        productPage(productAPI + "search?keyword=" + userInput, function (response) {
            closeMask();
            render(response);
        });
    }
}

//購物車商品數量，如果沒有資料留下來的話，塞給它空陣列
function getOrderListAmount() {
    let orderList = JSON.parse(localStorage.getItem("List")),
        cartNum = document.querySelector(".cartNum");
    if (!orderList) {
        cartNum.textContent = 0;
    } else {
        cartNum.textContent = orderList.length;
    }
}

function goIndex() {
    document.querySelector(".btn_logo").addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

function cartAction(target) {
    let action = document.querySelector(target);
    action.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn_shopping-cart01_add") || e.target.classList.contains("btn_shopping-mob") || e.target.classList.contains("cartNum")) {
            window.location.href = "cart.html";
        } else if (e.target.classList.contains("btn_member01_normal") || e.target.classList.contains("btn_member01_mob")) {
            window.location.href = "profile.html";
        }
    })
}

window.addEventListener("DOMContentLoaded", function () {
    goIndex();
    cartAction(".cartAct");
    cartAction(".mobile_user");
    getOrderListAmount();
})