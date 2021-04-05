const params = new URL(window.location.href);
let currentProductID = params.searchParams.get("id");
const productContainer = document.querySelector(".productContainer");
const title = document.querySelector(".title");
const itemPrice = document.querySelector(".price");
const productID = document.querySelector(".id");
const picture = document.querySelector(".main_pic");
let stock;
let currentStock = 0;

function productRender(parseData) {
    let pDetail = JSON.parse(parseData).data;
    app.state.product = pDetail;
    const colorContainer = document.querySelector(".colorContainer"),
        sizeContainer = document.querySelector(".sizeContainer"),
        noteContainer = document.querySelector(".noteContainer"),
        note = document.querySelector(".note"),
        place = document.querySelector(".place"),
        story = document.querySelector(".story"),
        subpic1 = document.querySelector(".subpic"),
        subpic2 = document.querySelector(".subpic2"),
        addInCartBtn = document.querySelector(".add_in_cart");

    picture.src = pDetail.main_image;
    picture.textContent = pDetail.main_image;
    title.textContent = pDetail.title;
    productID.textContent = pDetail.id;
    itemPrice.textContent = `TWD.${pDetail.price}`;
    let colorText = app.createElement("div", "color", "顏色");
    
    colorContainer.appendChild(colorText);
    for (let i = 0; i < pDetail.colors.length; i += 1) {
        let rect = app.createElement("button", "rect");        
        rect.style.backgroundColor = `#${pDetail.colors[i].code}`;
        rect.title = `${pDetail.colors[i].name}`;
        colorContainer.appendChild(rect);
    }
    let size = app.createElement("div", "size", "尺寸");
    sizeContainer.appendChild(size);
    for (let i = 0; i < pDetail.sizes.length; i++) {
        let sizeIcon = app.createElement("button", "size-icon", pDetail.sizes[i]);        
        sizeIcon.name = "size";
        sizeContainer.appendChild(sizeIcon);
    }
    note.textContent = pDetail.note;
    let texture = document.querySelector(".texture");
    texture.textContent = pDetail.texture;
    let splitDescription = pDetail.description.split("\r\n");
    for (let i = 0; i < splitDescription.length; i += 1) {
        let description = app.createElement("div", "texture", splitDescription[i]);        
        noteContainer.appendChild(description);
    }
    place.textContent = `產地：${pDetail.place}`;
    story.textContent = pDetail.story;
    subpic1.src = pDetail.images[0];
    subpic2.src = pDetail.images[1];
    stock = pDetail.variants;

    addInCartBtn.addEventListener("click", createUserOrder)
    selectItem();
    count();
    getStock();
}

function removeDefaultColor() {
    let selectColor = document.getElementsByClassName("rect");
    selectColor.forEach(i => {
        i.classList.remove("rectSelected");
    })
}

function removeDefaultSize() {
    let selectSizeIcon = document.getElementsByClassName("size-icon");
    selectSizeIcon.forEach(i => {
        i.classList.remove("sizeSelected");
    })
}

//rgb轉Hex
function rgbToHex(rgb) {
    let bg = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return ("#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3])).toUpperCase();
}

function selectItem() {
    let rects = document.getElementsByClassName("rect"),
        selectSize,
        hexColor = rgbToHex(rects[0].style.backgroundColor),
        hexColorText = rects[0].title;
    rects[0].classList.add("rectSelected");
    //選顏色
    for (let i = 0, max = rects.length; i < max; i++) {
        rects[i].addEventListener("click", event => {
            removeDefaultColor();
            event.target.classList.add("rectSelected");
            hexColor = rgbToHex(event.target.style.backgroundColor);
            hexColorText = event.target.title;
            currentStock = getStock();
            let noSize = outStock();
            let size = document.getElementsByClassName("size-icon");
            for (let i = 0, max = size.length; i < max; i++) {
                if (size[i].textContent === noSize) {
                    size[i].disabled = true;
                } else {
                    size[i].disabled = false;
                }
            }
        })
    }
    let sizeIcons = document.getElementsByClassName("size-icon");
    sizeIcons[0].classList.add("sizeSelected");
    selectSize = sizeIcons[0].textContent;
    for (let i = 0; i < sizeIcons.length; i++) {
        sizeIcons[i].addEventListener("click", event => {
            if (sizeIcons[i].disabled === true) {
                return;
            } else {
                removeDefaultSize();
                event.target.classList.add("sizeSelected");
                selectSize = event.target.textContent;
                currentStock = getStock();
            }
        })
    }
}

function getStock() {
    let selectSize = document.querySelector(".sizeSelected").textContent,
        hexColor = rgbToHex(document.querySelector(".rectSelected").style.backgroundColor),
        stockQuantity = stock.filter(item => {
            return (`#${item.color_code}` === hexColor && item.size === selectSize)
        })[0].stock;
    return stockQuantity
}

function outStock() {
    let hexColor = rgbToHex(document.querySelector(".rectSelected").style.backgroundColor);
    for (let i = 0; i < stock.length; i++) {
        if (hexColor === `#${stock[i].color_code}` && stock[i].stock === 0) {
            return stock[i].size;
        }
    }
}

function count() {
    let plus = document.querySelector(".plus"),
        subtract = document.querySelector(".subtract"),
        quantity = document.querySelector(".quantity"),
        countNumber = 1;
    plus.addEventListener("click", () => {
        //如果數量小於庫存,數量+1
        if (countNumber < currentStock) {
            countNumber += 1;
            quantity.textContent = countNumber;
            if (countNumber >= currentStock) {
                alert("這款只剩 " + currentStock + " 件喔！");
            }
        } else if (currentStock === 0) {
            quantity.textContent = 0;
            alert("沒有庫存囉！");
        }
    })
    subtract.addEventListener("click", () => {
        if (countNumber > 0) {
            countNumber -= 1;
            quantity.textContent = countNumber;
        }
    })
}

function createUserOrder() {
    let stockQuantity = getStock();
    const count = document.querySelector(".quantity"),
        hexColor = rgbToHex(document.querySelector(".rectSelected").style.backgroundColor),
        hexColorText = document.querySelector(".rectSelected").title,
        selectSize = document.querySelector(".sizeSelected").textContent,
        orderList = JSON.parse(localStorage.getItem("List")) || [],
        cartNum = document.querySelector(".cartNum");
    let id = productID.textContent, name = title.textContent, price = itemPrice.textContent,
        color = { "name": hexColorText, "code": hexColor },
        size = selectSize, qty = count.textContent, pic = picture.textContent, remain = stockQuantity,
        newOrder = { "id": id, "name": name, "price": price, "color": color, "size": size, "qty": qty, "pic": pic, "remain": remain }
    if (newOrder.qty === 0) {
        alert("請輸入數量");
    } else if (newOrder.qty > newOrder.remain) {
        alert("您選的數量大於可購買數量");
    } else {
        alert("商品已為您加入購物車");
    }
    if (orderList.length > 0) {
        for (let i = 0; i < orderList.length; i++) {
            if (orderList[i].id === newOrder.id && orderList[i].color.code === newOrder.color.code
                && orderList[i].size === newOrder.size) {
                orderList[i].qty = parseInt(orderList[i].qty, 10) + parseInt(newOrder.qty, 10);
                localStorage.setItem("List", JSON.stringify(orderList));
                return;
            }
        }
    }
    orderList.push(newOrder);
    localStorage.setItem("List", JSON.stringify(orderList));
    cartNum.textContent = orderList.length;
}

window.addEventListener("DOMContentLoaded", function () {
    app.getData(app.API_HOST + "/products/details?id=" + currentProductID, function (response) { productRender(response); });
})