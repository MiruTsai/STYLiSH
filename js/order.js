let number = JSON.parse(localStorage.getItem('orderNumber'));
let orderNumber = JSON.parse(number).data.number;
let myButton = document.getElementsByTagName('button');
const order = document.querySelector('.order');
      order.textContent = orderNumber;

function backToIndex() {
    window.location.href = "index.html";
    localStorage.clear();
}