const cartOrderList = document.querySelector(".cartOrderList");
const APP_ID = 12348;
const APP_KEY = "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF";
const userName = document.getElementById("userName");
const mobileNumber = document.getElementById("mobileNumber");
const address = document.getElementById("address");
const email = document.getElementById("email");
const shippingCountry = document.querySelector(".shippingCountry");
const submitButton = document.querySelector(".payButton");
const mobileSubmitButton = document.querySelector(".mobilePayButton");
let prime;
let parseOrderList = JSON.parse(localStorage.getItem("List"));
let mobileItemUnitPrice;
let webQuantity;
let itemUnitPrice;
let itemTotalPrice;
let mobileUnitPrice;
let mobileTotalPrice;
let mobileQuantity;


function createEmptyDescription() {
    const empty = document.createElement("div");
    empty.className = "empty";
    cartOrderList.appendChild(empty);
    empty.textContent = "購物車空空的耶";
}

function renderCartOrderList() {
    if (parseOrderList === null) {
        createEmptyDescription();
    } else {
        for (let i = 0; i < parseOrderList.length; i++) {
            let orderItem = createElement("div", "orderItem"),
                mobileItemInfo = createElement("div", "mobileItemInfo"),
                itemInfo = createElement("div", "itemInfo"),
                itemPic = createElement("img", "itemPic");
            itemPic.src = parseOrderList[i].pic;
            let detail = createElement("div", "itemDetail"),
                title = createElement("div", "itemTitle", parseOrderList[i].name),
                itemID = createElement("div", "itemID", parseOrderList[i].id),
                description = createElement("div", "description"),
                color = createElement("div", "color"),
                colorText = createElement("div", "colorText", "顏色"),
                centerLine1 = createElement("div", "centerLine", "|"),
                colorName = createElement("div", "colorName", parseOrderList[i].color.name);
            color.appendChild(colorText);
            color.appendChild(centerLine1);
            color.appendChild(colorName);
            let size = createElement("div", "size"),
                sizeText = createElement("div", "sizeText", "尺寸"),
                sizeName = createElement("div", "sizeName", parseOrderList[i].size),
                centerLine2 = createElement("div", "centerLine", "|");
            size.appendChild(sizeText);
            size.appendChild(centerLine2);
            size.appendChild(sizeName);
            description.appendChild(color);
            description.appendChild(size);
            detail.appendChild(title);
            detail.appendChild(itemID);
            detail.appendChild(description);
            itemInfo.appendChild(itemPic);
            itemInfo.appendChild(detail);
            let mobileRemove = createElement("img", "mobileRemove");
            mobileRemove.src = "images/cart-remove.png";
            let mobileQty = createElement("div", "mobileQty"),
                mobileQtyText = createElement("div", "mobileQtyText"),
                qtyText = createElement("span", "title", "數量"),
                webQuantity = createElement("input", "quantity");
            webQuantity.addEventListener("change", function (e) { getItemTotalPrice(e); getOrderListPrice(); })
            webQuantity.type = "number";
            webQuantity.min = 1;
            webQuantity.max = parseOrderList[i].remain;
            webQuantity.defaultValue = parseOrderList[i].qty;
            mobileQuantity = createElement("input", "mobileQuantity");
            mobileQuantity.addEventListener("change", function (e) { getMobileItemTotalPrice(e); getMobileOrderListPrice(); })
            mobileQuantity.type = "number";
            mobileQuantity.min = 1;
            mobileQuantity.max = parseOrderList[i].remain;
            mobileQuantity.defaultValue = parseOrderList[i].qty;
            mobileQtyText.appendChild(qtyText);
            mobileQtyText.appendChild(mobileQuantity);
            let mobileUnitPrice = createElement("div", "mobileUnitPrice"),
                unitPrice = createElement("span", "title", "單價"),
                itemUnitPrice = createElement("div", "itemUnitPrice", parseOrderList[i].price),
                mobileItemUnitPrice = createElement("div", "mobileItemUnitPrice", parseOrderList[i].price);
            mobileUnitPrice.appendChild(unitPrice);
            mobileUnitPrice.appendChild(mobileItemUnitPrice);
            let mobileTotal = createElement("div", "mobileTotal"),
                mobileTotalText = createElement("span", "title", "小計");
            itemTotalPrice = createElement("div", "itemTotalPrice", `TWD.${Number(parseOrderList[i].price.slice(4)) * webQuantity.defaultValue}`);
            mobileTotalPrice = createElement("div", "mobileTotalPrice", `TWD.${Number(parseOrderList[i].price.slice(4)) * mobileQuantity.defaultValue}`);
            mobileTotal.appendChild(mobileTotalText);
            mobileTotal.appendChild(mobileTotalPrice);
            mobileQty.appendChild(mobileQtyText);
            mobileQty.appendChild(mobileUnitPrice);
            mobileQty.appendChild(mobileTotal);
            mobileItemInfo.appendChild(itemInfo);
            mobileItemInfo.appendChild(mobileRemove);
            let itemQty = createElement("div", "itemQty"),
                remove = createElement("img", "remove");
            remove.src = "images/cart-remove.png";
            itemQty.appendChild(webQuantity);
            itemQty.appendChild(itemUnitPrice);
            itemQty.appendChild(itemTotalPrice);
            itemQty.appendChild(remove);
            orderItem.appendChild(mobileItemInfo);
            orderItem.appendChild(mobileQty);
            orderItem.appendChild(itemQty);
            cartOrderList.appendChild(orderItem);
        }
    }
}
const counter = document.getElementsByClassName("quantity");
const mobileCounter = document.getElementsByClassName("mobileQuantity");
const billMoneyArea = document.querySelector(".billMoney");
const shippingMoneyArea = document.querySelector(".shippingMoney");
const itemTotalPriceArea = document.getElementsByClassName("itemTotalPrice");
const unitPrice = document.getElementsByClassName("itemUnitPrice");
const shippingMoney = document.querySelector(".shippingMoney");
shippingMoney.textContent = 60;
const mobileTotalPriceArea = document.getElementsByClassName("mobileTotalPrice");
const mobileItemUnitPriceArea = document.getElementsByClassName("mobileItemUnitPrice");

function getOrderListPrice() {
    const totalMoney = document.querySelector(".totalMoney");
    let total = 0;
    for (let i = 0; i < itemTotalPriceArea.length; i++) {
        total += parseInt(itemTotalPriceArea[i].textContent.slice(4));
    }
    billMoneyArea.textContent = total;
    if (total > 1000) {
        shippingMoney.textContent = 0;
    } else {
        shippingMoney.textContent = 60;
    }
    totalMoney.textContent = total + parseInt(shippingMoney.textContent);
}

function getMobileOrderListPrice() {
    const totalMoney = document.querySelector(".totalMoney");
    let total = 0;
    for (let i = 0; i < mobileTotalPriceArea.length; i++) {
        total += parseInt(mobileTotalPriceArea[i].textContent.slice(4));
    }
    billMoneyArea.textContent = total;
    if (total > 1000) {
        shippingMoney.textContent = 0
    } else {
        shippingMoney.textContent = 60;
    }
    totalMoney.textContent = total + parseInt(shippingMoney.textContent);
}

function getItemTotalPrice(e) {
    let unitPrice = parseInt(e.target.nextSibling.textContent.slice(4)),
        totalPriceArea = e.target.nextSibling.nextSibling,
        totalPrice = e.target.value * unitPrice;
    totalPriceArea.textContent = "TWD. " + totalPrice;
}

function getMobileItemTotalPrice(e) {
    let target = e.target.parentNode,
        unitPrice = parseInt(target.nextSibling.lastChild.textContent.slice(4)),
        totalPriceArea = target.nextSibling.nextSibling.lastChild,
        totalPrice = e.target.value * unitPrice;
    totalPriceArea.textContent = "TWD. " + totalPrice;
}

function addDeleteOrderFX(target) {
    let deleteIcon = document.getElementsByClassName(target);
    if (!deleteIcon) {
        return
    }
    for (let i = 0; i < deleteIcon.length; i++) {
        deleteIcon[i].addEventListener("click", function (e) {
            let parent = e.target.parentNode.parentNode,
                grandParent = parent.parentNode;
            alert("已從購物車移除");
            parseOrderList.splice(i, 1);
            localStorage.setItem("List", JSON.stringify(parseOrderList));
            grandParent.removeChild(parent);
            getOrderListPrice();
            getMobileOrderListPrice();
            getOrderListAmount();
        })
    }
}

//TAP PAY
let fields = {
    number: {
        // css selector
        element: "#card-number",
        placeholder: "**** **** **** ****"
    },
    expirationDate: {
        // DOM object
        element: document.getElementById("card-expiration-date"),
        placeholder: "MM / YY"
    },
    ccv: {
        element: "#card-ccv",
        placeholder: "後三碼"
    }
}

TPDirect.card.setup({
    fields: fields,
    styles: {
        // Style all elements        
        "input": {
            "color": "gray"
        },
        // Styling ccv field
        "input.cvc": {
            // "font-size": "16px"
        },
        // Styling expiration-date field
        "input.expiration-date": {
            // "font-size": "16px"
        },
        // Styling card-number field
        "input.card-number": {
            // "font-size": "16px"
        },
        // style focus state
        ":focus": {
            // "color": "black"
        },
        // style valid state
        ".valid": {
            "color": "green"
        },
        // style invalid state
        ".invalid": {
            "color": "red"
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        "@media screen and (max-width: 400px)": {
            "input": {
                "color": "orange"
            }
        }
    }
})

TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        submitButton.removeAttribute("disabled");
        mobileSubmitButton.removeAttribute("disabled");
    } else {
        // Disable submit Button to get prime.
        submitButton.setAttribute("disabled", true);
        mobileSubmitButton.setAttribute("disabled", true);
    }
    // cardTypes = ["mastercard", "visa", "jcb", "amex", "unknown"]
    if (update.cardType === "visa") {
        // Handle card type visa.
    }
    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }
    if (update.status.cvc === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }
})

function getShipTime() {
    const radiobutton = document.getElementsByName("shippingTime");
    let chooseTime;
    for (let i = 0; i < radiobutton.length; i++) {
        if (radiobutton[i].checked === true) {
            chooseTime = radiobutton[i].value;
        }
    }
    return chooseTime
}

function createOrder() {
    const payment = document.querySelector(".paymentMethod"),
        totalMoney = document.querySelector(".totalMoney"),
        prime = localStorage.getItem('prime');
    let chooseTime = getShipTime();
    let order = {
        "prime": prime,
        "order": {
            "shipping": shippingCountry.value,
            "payment": payment.value,
            "subtotal": billMoneyArea.textContent,
            "freight": shippingMoney.textContent,
            "total": totalMoney.textContent,
            "recipient": {
                "name": userName.value,
                "phone": mobileNumber.value,
                "email": email.value,
                "address": address.value,
                "time": chooseTime
            },
            "list": parseOrderList
        }
    }
    return JSON.stringify(order);
}

function onSubmit() {    
    let chooseTime = getShipTime();
    if (!userName.value || !mobileNumber.value || !email.value || !address.value || !chooseTime) {        
        alert("請輸入您的完整聯絡資訊");
        return
    };
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()
    if (tappayStatus.canGetPrime === false) {
        alert("請輸入完整信用卡資料")
        return
    }
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            alert("請輸入完整信用卡資料");
            return
        }        
        localStorage.setItem("prime", result.card.prime)        
        pushOrderToBackend();
    })
}

//-----得到訂單編號，並導向thank you page。------//
function pushOrderToBackend() {
    const FBtoken = JSON.parse(localStorage.getItem("userToken"));
    let order = createOrder();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${AppScoolHostAPI}/order/checkout`);
    //如果已登入FB
    if (FBtoken) {
        xhr.setRequestHeader("Authorization", "Bearer " + FBtoken);
    }
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            localStorage.removeItem("List");
            localStorage.setItem("orderNumber", JSON.stringify(xhr.responseText));
            window.location.assign("thankyou.html");
        };
    };
    xhr.send(order);
}

window.addEventListener("DOMContentLoaded", function () {
    TPDirect.setupSDK(APP_ID, APP_KEY, "sandbox");
    renderCartOrderList();
    getOrderListPrice();
    addDeleteOrderFX("mobileRemove");
    addDeleteOrderFX("remove");
})