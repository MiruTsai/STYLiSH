// let originalURL = window.location.href;
// let params = new URL(originalURL);
let id = params.searchParams.get("id");
const productContainer = document.querySelector(".productContainer");
let stock;
let noneStock;
let itemPrice;
let cartButton;
let stockQuantity;

function productRender(parseData) {
    let pDetail = JSON.parse(parseData);
    const picture = document.querySelector(".main_pic");
    const title = document.querySelector(".title");
    const productID = document.querySelector(".id");
    const itemPrice = document.querySelector(".price");
    const colorContainer = document.querySelector(".colorContainer");
    const sizeContainer = document.querySelector(".sizeContainer");
    const noteContainer = document.querySelector(".noteContainer");
    const note = document.querySelector(".note");
    const place = document.querySelector(".place");
    const story = document.querySelector(".story");
    const subpic1 = document.querySelector(".subpic");
    const subpic2 = document.querySelector(".subpic2");
    picture.src = pDetail.data.main_image;
    picture.textContent = pDetail.data.main_image;
    title.textContent = pDetail.data.title;
    productID.textContent = pDetail.data.id;
    itemPrice.textContent = `TWD.${pDetail.data.price}`;
    let colorText = document.createElement("div");
    colorText.className = "color";
    colorText.textContent = "顏色";
    colorContainer.appendChild(colorText);
    for (let i = 0; i < pDetail.data.colors.length; i += 1) {
        let rect = document.createElement("button");
        rect.className = "rect";
        rect.style.backgroundColor = `#${pDetail.data.colors[i].code}`;
        rect.title = `${pDetail.data.colors[i].name}`;
        colorContainer.appendChild(rect);
    }
    let size = document.createElement("div");
    size.textContent = "尺寸";
    size.className = "size";
    sizeContainer.appendChild(size);
    for (let i = 0; i < pDetail.data.sizes.length; i++) {
        let sizeIcon = document.createElement("button");
        sizeIcon.className = "size-icon";
        sizeIcon.name = "size"
        sizeIcon.textContent = pDetail.data.sizes[i];
        sizeContainer.appendChild(sizeIcon);
    }
    note.textContent = pDetail.data.note;
    let texture = document.querySelector(".texture");
    texture.textContent = pDetail.data.texture;
    let splitDescription = pDetail.data.description.split("\r\n");
    for (let i = 0; i < splitDescription.length; i += 1) {
        let description = document.createElement("div");
        description.textContent = splitDescription[i];
        description.className = "texture";
        noteContainer.appendChild(description);
    }
    place.textContent = `產地：${pDetail.data.place}`;
    story.textContent = pDetail.data.story
    subpic1.src = pDetail.data.images[0]
    subpic2.src = pDetail.data.images[1]
    selectItem();
    count();
    userOrder();
    //stock
    stock = pDetail.data.variants;
    getStock();
}

productPage(productAPI + "details?id=" + id, function (response) { productRender(response); });

// select size & color
let hexColor;
let hexColorText;
let userColor;
let selectSize;
let userSize;
let userItem;
let index = 0;

function removeDefaultColor() {
    let selectColor = Array.from(document.getElementsByClassName("rect"));
    selectColor.forEach(i => {
        i.classList.remove("rectSelect");
    })
}

function removeDefaultSize() {
    let selectSizeIcon = Array.from(document.getElementsByClassName("size-icon"));
    selectSizeIcon.forEach(i => {
        i.classList.remove("sizeSelect");
    })
}

//rgb轉Hex
function rgbToHex(rgb) {
    var bg = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return ("#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3])).toUpperCase();
}

function selectItem() {
    let rects = document.getElementsByClassName("rect");
    //顏色預設值
    rects[index].classList.add("rectSelect");
    hexColor = rgbToHex(rects[index].style.backgroundColor);
    hexColorText = rects[index].title;
    //選顏色
    for (let i = 0; i < rects.length; i++) {
        rects[i].addEventListener("click", event => {
            removeDefaultColor();
            removeDefaultSize();
            event.target.classList.add("rectSelect");
            hexColor = rgbToHex(event.target.style.backgroundColor);
            hexColorText = event.target.title;
            getStock();
            let noSize = outStock();
            let size = document.getElementsByClassName("size-icon");
            for (let i = 0; i < size.length; i++) {
                if (size[i].textContent === noSize) {
                    size[i].disabled = true;
                } else {
                    size[i].disabled = false;
                }
            }
        })
    }
    let sizeIcons = document.getElementsByClassName("size-icon");
    sizeIcons[index].classList.add("sizeSelect");
    selectSize = sizeIcons[index].textContent;
    for (let i = 0; i < sizeIcons.length; i++) {
        sizeIcons[i].addEventListener("click", event => {
            if (sizeIcons[i].disabled === true) {
                return;
            } else {
                removeDefaultSize();
                event.target.classList.add("sizeSelect");
                selectSize = event.target.textContent;
                getStock();
            }
        })
    }
}

// counter
function getStock() {
    stockQuantity = stock.filter(remain => {
        return (`#${remain.color_code}` === hexColor && remain.size === selectSize)
    })[0].stock;
}

function outStock() {
    for (let i = 0; i < stock.length; i++) {
        if (hexColor === `#${stock[i].color_code}` && stock[i].stock === 0) {
            return stock[i].size;
        }
    }
}

let countNumber = 1;
function count() {
    let plus = document.querySelector(".plus");
    let subtract = document.querySelector(".subtract");
    let quantity = document.querySelector(".quantity");
    plus.addEventListener("click", () => {
        getStock();
        //如果數量小於庫存,數量+1
        if (countNumber < stockQuantity) {
            countNumber += 1;
            quantity.textContent = countNumber;
            if (countNumber >= stockQuantity) {
                alert("這款只剩 " + stockQuantity + " 件喔！");
            }
        } else if (stockQuantity === 0) {
            quantity.textContent = 0;
            alert("沒有庫存囉！")
        }
    })
    subtract.addEventListener("click", () => {
        if (countNumber > 0) {
            countNumber -= 1;
            quantity.textContent = countNumber;
        }
    })
}

//Order List 
class Order {
    constructor(id, name, price, color, size, qty, pic, remain) {
        this.id = id,
            this.name = name,
            this.price = price,
            this.color = color,
            this.size = size,
            this.qty = qty,
            this.pic = pic,
            this.remain = remain
    }
}

function userOrder() {
    let cartButton = document.querySelector(".add_in_cart");
    cartButton.addEventListener("click", () => {
        id = productID.textContent;
        name = title.textContent;
        price = itemPrice.textContent;
        color = {
            "name": hexColorText,
            "code": hexColor
        }
        size = selectSize;
        qty = countNumber;
        pic = picture.textContent;
        remain = stockQuantity;
        let newOrder = new Order(id, name, price, color, size, qty, pic, remain);
        if (newOrder.qty === 0) {
            alert("請輸入數量");
        } else if (newOrder.qty > newOrder.remain) {
            alert("您選的數量大於可購買數量");
        } else {
            alert("商品已為您加入購物車");
        }
        for (let i = 0; i < orderList.length; i++) {
            if (orderList[i].id === newOrder.id && orderList[i].color.code === newOrder.color.code
                && orderList[i].size === newOrder.size) {
                //比到相同的，把數量相加後結束函式
                orderList[i].qty += newOrder.qty;
                return;
            }
        }
        //比到不同的，加入清單
        orderList.push(newOrder);
        localStorage.setItem("List", JSON.stringify(orderList));
        let cartNum = document.querySelector(".cartNum");
        cartNum.textContent = orderList.length;
    })
}
