// let originalURL = window.location.href;
// let params = new URL(originalURL);
let id = params.searchParams.get("id")

let stock;
let noneStock;
let title;
let itemPrice;
let productID;
let picture;
let cartButton;
let stockQuantity;

function productRender(parseData) {

    let pDetail = JSON.parse(parseData);
    let productContainer = document.createElement("div");
    productContainer.className = "productContainer";
    picture = document.createElement("img");
    picture.className = "main_pic";
    picture.src = pDetail.data.main_image;
    picture.textContent = pDetail.data.main_image;
    let info = document.createElement("div");
    info.className = "info";
    title = document.createElement("div");
    title.className = "title";
    title.textContent = pDetail.data.title;
    productID = document.createElement("div");
    productID.className = "id";
    productID.textContent = pDetail.data.id;
    itemPrice = document.createElement("div");
    itemPrice.className = "price";
    itemPrice.textContent = `TWD.${pDetail.data.price}`;
    let shorLine = document.createElement("div");
    shorLine.className = "shortLine";
    let colorContainer = document.createElement("div");
    colorContainer.className = "colorContainer";
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

    let sizeContainer = document.createElement("div");
    let size = document.createElement("div");
    size.textContent = "尺寸";
    size.className = "size";
    sizeContainer.className = "sizeContainer";
    sizeContainer.appendChild(size);
    for (let i = 0; i < pDetail.data.sizes.length; i++) {
        let sizeIcon = document.createElement("button");
        sizeIcon.className = "size-icon";
        sizeIcon.name = "size"
        sizeIcon.textContent = pDetail.data.sizes[i];
        sizeContainer.appendChild(sizeIcon);
    }

    let countName = document.createElement("div");
    countName.className = "count";
    countName.textContent = "數量";
    let countContainer = document.createElement("div");
    countContainer.className = "countContainer";

    let plus = document.createElement("button");
    plus.className = "plus";
    plus.textContent = "+";
    let quantity = document.createElement("div");
    quantity.className = "quantity";
    quantity.textContent = 1;
    let subtract = document.createElement("button");
    subtract.className = "subtract";
    subtract.textContent = "-";
    let counter = document.createElement("div");
    counter.className = "counter";
    counter.appendChild(plus);
    counter.appendChild(quantity);
    counter.appendChild(subtract);
    countContainer.appendChild(countName);
    countContainer.appendChild(counter);

    cartButton = document.createElement("button");
    cartButton.className = "add_in_cart";
    cartButton.textContent = "加入購物車";
    let noteContainer = document.createElement("div");
    let note = document.createElement("div");
    note.textContent = pDetail.data.note;
    note.className = "note"
    noteContainer.appendChild(note);
    let texture = document.createElement("div");
    texture.className = "texture"
    texture.textContent = pDetail.data.texture;
    noteContainer.appendChild(texture);
    let splitDescription = pDetail.data.description.split("\r\n");
    for (let i = 0; i < splitDescription.length; i += 1) {
        let description = document.createElement("div");
        description.textContent = splitDescription[i];
        description.className = "texture";
        noteContainer.appendChild(description);
    }

    let place = document.createElement("div");
    place.className = "place"
    place.textContent = `產地：${pDetail.data.place}`;
    noteContainer.appendChild(place);
    info.appendChild(title);
    info.appendChild(productID);
    info.appendChild(itemPrice);
    info.appendChild(shorLine);
    info.appendChild(colorContainer);
    info.appendChild(sizeContainer);
    info.appendChild(countContainer);
    info.appendChild(cartButton);
    info.appendChild(noteContainer);
    productContainer.appendChild(picture);
    productContainer.appendChild(info);
    let detail = document.createElement("div");
    detail.className = "detail";
    let explain = document.createElement("div");
    explain.textContent = "細部說明";
    explain.className = "explain";
    let longLine = document.createElement("div");
    longLine.className = "longLine";
    detail.appendChild(explain);
    detail.appendChild(longLine);
    let storyboard = document.createElement("div");
    let story = document.createElement("div");
    story.className = "story";
    story.textContent = pDetail.data.story
    let subpic1 = document.createElement("img");
    subpic1.className = "subpic";
    subpic1.src = pDetail.data.images[0]
    let subpic2 = document.createElement("img");
    subpic2.className = "subpic";
    subpic2.src = pDetail.data.images[1]
    storyboard.appendChild(story);
    storyboard.appendChild(subpic1);
    storyboard.appendChild(story);
    storyboard.appendChild(subpic2);
    document.querySelector(".productPage").appendChild(productContainer);
    document.querySelector(".productPage").appendChild(detail);
    document.querySelector(".productPage").appendChild(storyboard);

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
    let selectSize = Array.from(document.getElementsByClassName("size-icon"));
    selectSize.forEach(i => {
        i.classList.remove("sizeSelect");
    })
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
            //先一次全部取消
            removeDefaultColor();
            removeDefaultSize();

            //再加在被選擇的上面
            event.target.classList.add("rectSelect");

            //記錄選中的顏色
            hexColor = rgbToHex(event.target.style.backgroundColor);
            hexColorText = event.target.title;

            //得到庫存
            getStock();

            //判斷誰有庫存   
            let noSize = outStock();
            let size = document.getElementsByClassName("size-icon");
            for (let i = 0; i < size.length; i++) {
                if (size[i].textContent === noSize) {
                    //沒庫存
                    size[i].disabled = true;
                } else {
                    //有庫存
                    size[i].disabled = false;
                }
            }
        })
    }
    let sizeIcons = document.getElementsByClassName("size-icon");
    //尺寸預設值
    sizeIcons[index].classList.add("sizeSelect");
    selectSize = sizeIcons[index].textContent;
    //選尺寸
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
        }
        )
    }
}

//rgb轉Hex
function rgbToHex(rgb) {
    var bg = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return ("#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3])).toUpperCase();
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
