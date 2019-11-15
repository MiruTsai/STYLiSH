const AppScoolHostAPI = "https://api.appworks-school.tw/api/1.0";
const productAPI = "https://api.appworks-school.tw/api/1.0/products/";
const mask = document.querySelector(".mask");
let pagingQuery = "?paging="
let category;
let sourcePage = `${productAPI}${category}${pagingQuery}`;
let paging;
let tag = "";
let orderList = [];
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
    if (!userInput) {
        alert("請輸入欲搜尋商品！");
        return
    } else {
        if (event.keyCode === 13) {
            closeMask();
            productPage(productAPI + "search?keyword=" + userInput, function (response) {
                document.getElementById("p_container").innerHTML = null;
                render(response);
            });
        };
    }
}

//mobile searchbar keyboard
function moSearchKeyCode() {
    let userInput = document.querySelector(".moSearch").value;
    if (!userInput) {
        alert("請輸入欲搜尋商品！");
        return
    } else {
        if (event.keyCode === 13) {
            productPage(productAPI + "search?keyword=" + userInput, function (response) {
                closeMask();
                render(response);
            });
        }
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

