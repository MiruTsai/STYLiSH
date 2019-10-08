
const cartOrderList = document.querySelector('.cartOrderList');
const empty = document.createElement('div');
empty.className = "empty";
const APP_ID = 12348;
const APP_KEY = "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF";
let prime;


if (parseOrderList.length === 0 || parseOrderList === null) {
    cartOrderList.appendChild(empty);
    empty.textContent = "購物車空空的耶";
}


let mobileItemUnitPrice;
let webQuantity;
let itemUnitPrice;
let itemTotalPrice;
let mobileUnitPrice
let mobileTotalPrice;
let mobileQuantity


for (let i = 0; i < parseOrderList.length; i++) {
    let orderItem = document.createElement('div');
    orderItem.className = "orderItem";
    let mobileItemInfo = document.createElement('div');
    mobileItemInfo.className = "mobileItemInfo";
    let itemInfo = document.createElement('div');
    itemInfo.className = "itemInfo";
    let itemPic = document.createElement('img');
    itemPic.className = "itemPic";
    itemPic.src = parseOrderList[i].pic;
    let itemDetail = document.createElement('div');
    itemDetail.className = "itemDetail";
    let itemTitle = document.createElement('div');
    itemTitle.className = "itemTitle";
    itemTitle.textContent = parseOrderList[i].name;
    let itemID = document.createElement('div');
    itemID.className = "itemID";
    itemID.textContent = parseOrderList[i].id;
    let itemDescription = document.createElement('div');
    itemDescription.className = "itemDescription";
    let color = document.createElement('div');
    color.className = "color";
    let colorText = document.createElement('div');
    colorText.className = "colorText";
    colorText.textContent = "顏色";
    let centerLine1 = document.createElement('div');
    centerLine1.className = "centerLine";
    centerLine1.textContent = "|";
    let colorName = document.createElement('div');
    colorName.className = "colorName";
    colorName.textContent = parseOrderList[i].color.name;
    color.appendChild(colorText);
    color.appendChild(centerLine1);
    color.appendChild(colorName);
    let size = document.createElement('div');
    size.className = "size";
    let sizeText = document.createElement('div');
    sizeText.className = "sizeText";
    sizeText.textContent = "尺寸";
    let sizeName = document.createElement('div');
    sizeName.className = "sizeName";
    sizeName.textContent = parseOrderList[i].size;
    size.appendChild(sizeText);
    centerLine2 = document.createElement('div');
    centerLine2.className = "centerLine";
    centerLine2.textContent = "|";
    size.appendChild(centerLine2);
    size.appendChild(sizeName);

    itemDescription.appendChild(color);
    itemDescription.appendChild(size);
    itemDetail.appendChild(itemTitle);
    itemDetail.appendChild(itemID);
    itemDetail.appendChild(itemDescription);
    itemInfo.appendChild(itemPic);
    itemInfo.appendChild(itemDetail);

    let mobileRemove = document.createElement('img');
    mobileRemove.className = "mobileRemove";
    mobileRemove.src = "images/cart-remove.png";
    let mobileQty = document.createElement('div');
    mobileQty.className = "mobileQty";
    let mobileQtyText = document.createElement('div');
    mobileQtyText.className = "mobileQtyText";
    let qtyText = document.createElement('span');
    qtyText.className = "title";
    qtyText.textContent = "數量";
    webQuantity = document.createElement('input');
    webQuantity.className = "quantity";
    webQuantity.type = "number";
    webQuantity.min = 1;
    webQuantity.max = parseOrderList[i].remain;
    webQuantity.placeholder = parseOrderList[i].qty;

    mobileQuantity = document.createElement('input');
    mobileQuantity.className = "mobileQuantity";
    mobileQuantity.type = "number";
    mobileQuantity.min = 1;
    mobileQuantity.max = parseOrderList[i].remain;
    mobileQuantity.placeholder = parseOrderList[i].qty;
    mobileQtyText.appendChild(qtyText);
    mobileQtyText.appendChild(mobileQuantity);

    mobileUnitPrice = document.createElement('div');
    mobileUnitPrice.className = "mobileUnitPrice";
    let unitPrice = document.createElement('span');
    unitPrice.className = "title";
    unitPrice.textContent = "單價"
    itemUnitPrice = document.createElement('div');
    itemUnitPrice.className = "itemUnitPrice";
    itemUnitPrice.textContent = parseOrderList[i].price;

    mobileItemUnitPrice = document.createElement('div');
    mobileItemUnitPrice.className = "mobileItemUnitPrice";
    mobileItemUnitPrice.textContent = parseOrderList[i].price;

    mobileUnitPrice.appendChild(unitPrice);
    mobileUnitPrice.appendChild(mobileItemUnitPrice);
    let mobileTotal = document.createElement('div');
    mobileTotal.className = "mobileTotal";
    let mobileTotalText = document.createElement('span');
    mobileTotalText.className = "title";
    mobileTotalText.textContent = "小計";
    itemTotalPrice = document.createElement('div');
    itemTotalPrice.className = "itemTotalPrice";
    itemTotalPrice.textContent = `TWD.${Number(parseOrderList[i].price.slice(4)) * webQuantity.placeholder}`;

    mobileTotalPrice = document.createElement('div');
    mobileTotalPrice.className = "mobileTotalPrice";
    mobileTotalPrice.textContent = `TWD.${Number(parseOrderList[i].price.slice(4)) * mobileQuantity.placeholder}`;

    mobileTotal.appendChild(mobileTotalText);
    mobileTotal.appendChild(mobileTotalPrice);
    mobileQty.appendChild(mobileQtyText);
    mobileQty.appendChild(mobileUnitPrice);
    mobileQty.appendChild(mobileTotal);
    mobileItemInfo.appendChild(itemInfo);
    mobileItemInfo.appendChild(mobileRemove);

    let itemQty = document.createElement('div');
    itemQty.className = "itemQty";
    let remove = document.createElement('img');
    remove.className = "remove";
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

const counter = document.getElementsByClassName('quantity')
const mobileCounter = document.getElementsByClassName('mobileQuantity')
const billMoneyArea = document.querySelector('.billMoney');
const shippingMoneyArea = document.querySelector('.shippingMoney');
const totalMoneyArea = document.querySelector('.totalMoney');
const itemTotalPriceArea = document.getElementsByClassName('itemTotalPrice');
const unitPrice = document.getElementsByClassName('itemUnitPrice');
const shippingMoney = document.querySelector('.shippingMoney');
shippingMoney.textContent = 60;
const totalMoney = document.querySelector('.totalMoney');
const mobileTotalPriceArea = document.getElementsByClassName('mobileTotalPrice');
const mobileItemUnitPriceArea = document.getElementsByClassName('mobileItemUnitPrice');



//cart Text
const cartText = document.querySelector('.cartText')
cartText.textContent = `購物車(${parseOrderList.length})`

//web pay
function getItemTotalPrice() {
    for (let i = 0; i < counter.length; i++) {
        counter[i].addEventListener('click', (e) => {
            let totalPrice = e.target.value * parseInt(unitPrice[i].textContent.slice(4));
            itemTotalPriceArea[i].textContent = `TWD.${totalPrice}`;
            getOrderListPrice();
        })
    }
}
getItemTotalPrice();

function getOrderListPrice() {
    let total = 0;
    for (let i = 0; i < itemTotalPriceArea.length; i++) {
        total += parseInt(itemTotalPriceArea[i].textContent.slice(4));
    }
    billMoneyArea.textContent = total;
    totalMoney.textContent = total + parseInt(shippingMoney.textContent);
}
getOrderListPrice();

//mobile pay
function getMobileItemTotalPrice() {
    for (let i = 0; i < mobileCounter.length; i++) {
        mobileCounter[i].addEventListener('click', (e) => {
            let totalPrice = e.target.value * parseInt(mobileItemUnitPriceArea[i].textContent.slice(4));
            mobileTotalPriceArea[i].textContent = `TWD.${totalPrice}`;
            getMobileOrderListPrice();
        })
    }
}
getMobileItemTotalPrice();

function getMobileOrderListPrice() {
    let total = 0;
    for (let i = 0; i < mobileTotalPriceArea.length; i++) {
        total += parseInt(mobileTotalPriceArea[i].textContent.slice(4));
    }
    billMoneyArea.textContent = total;
    totalMoney.textContent = total + parseInt(shippingMoney.textContent);
}
getMobileOrderListPrice();

// delete feature
let deleteIcon = document.getElementsByClassName('remove');
let mobileDeleteIcon = document.getElementsByClassName('mobileRemove')

function deleteOrder() {
    for (let i = 0; i < deleteIcon.length; i++) {
        deleteIcon[i].addEventListener('click', () => {
            alert('已從購物車移除');
            parseOrderList.splice(i, 1);
            localStorage.setItem("List", JSON.stringify(parseOrderList));
            window.location.reload();
        })
    }
}
deleteOrder();

function mobileDeleteOrder() {
    for (let i = 0; i < mobileDeleteIcon.length; i++) {
        mobileDeleteIcon[i].addEventListener('click', () => {
            alert('已從購物車移除');
            parseOrderList.splice(i, 1);
            localStorage.setItem("List", JSON.stringify(parseOrderList));
            window.location.reload();
        })
    }
}
mobileDeleteOrder();

//TAP PAY


var fields = {
    number: {
        // css selector
        element: '#card-number',
        placeholder: '**** **** **** ****'
    },
    expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY'
    },
    ccv: {
        element: '#card-ccv',
        placeholder: '後三碼'
    }
}


TPDirect.card.setup({
    fields: fields,
    styles: {
        // Style all elements        
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.cvc': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
})

let submitButton = document.querySelector('.payButton');
let mobileSubmitButton = document.querySelector('.mobilePayButton');

TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        submitButton.removeAttribute('disabled');
        mobileSubmitButton.removeAttribute('disabled');
    } else {

        // Disable submit Button to get prime.
        submitButton.setAttribute('disabled', true);
        mobileSubmitButton.setAttribute('disabled', true);
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
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

// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

const userName = document.getElementById('userName');
const mobileNumber = document.getElementById('mobileNumber');
const email = document.getElementById('email');
const address = document.getElementById('address');
const radiobutton = document.getElementsByName('shippingTime');
const shippingCountry = document.querySelector('.shippingCountry');
const payment = document.querySelector('.paymentMethod');
let chooseTime;

for (let i = 0; i < radiobutton.length; i++) {
    if (radiobutton[i].checked === true) {
        chooseTime = radiobutton[i].value;
    }
}

function onSubmit() {

    if (!userName.value || !mobileNumber.value || !email.value || !address.value || chooseTime) {
        alert('請輸入您的完整聯絡資訊')
        return
    };

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('請輸入完整信用卡資料')
        return
    }

    // Get prime

    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            alert('請輸入完整信用卡資料')
            return
        }
        alert('get prime 成功，prime: ' + result.card.prime)
        prime = result.card.prime;
        // send prime to your server, to pay with Pay by Prime API .
        // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
        createOrder();
        ajax();
    })
}

let sendOrder;
function createOrder() {
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
    sendOrder = JSON.stringify(order);
}

//-----得到訂單編號，並導向thank you page。------//


//得到儲存在localstorage的FBtoken
const cartFBtoken = JSON.parse(localStorage.getItem('userToken'));

function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${AppScoolHostAPI}/order/checkout`);

    //如果有FBtoken(已登入FB)
    if (cartFBtoken) {

        xhr.setRequestHeader('Authorization', `Bearer ${cartFBtoken}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                localStorage.removeItem("List");
                localStorage.setItem('orderNumber', JSON.stringify(xhr.responseText));
                window.location.assign("thankyou.html");
            };
        };
        xhr.send(sendOrder);
    } else {
        //沒登入FB
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                localStorage.removeItem("List");
                localStorage.setItem('orderNumber', JSON.stringify(xhr.responseText));
                window.location.assign("thankyou.html");
            };
        };
        xhr.send(sendOrder);
    }

}
