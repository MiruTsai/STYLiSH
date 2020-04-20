//render index
const indexContainer = document.getElementById("p_container");
let paging;
function render(parseData) {
    let products = JSON.parse(parseData);
    paging = products.next_paging;
    if (products.data.length === 0) {
        let noProduct = createElement("div", "noProduct", "沒有您搜尋的商品喔！");
        indexContainer.appendChild(noProduct);
    } else {
        for (let i = 0; i < products.data.length; i += 1) {
            let content = createElement("div", "p_content"),
                pic = createElement("div", "p_pic"),
                picsrc = createElement("img", "picSrc")
            picsrc.src = products.data[i].main_image;
            let id = createElement("a", "p_id")
            id.href = "product.html?id=" + products.data[i].id;
            let title = createElement("div", "p_title", products.data[i].title),
                price = createElement("div", "p_price", "TWD." + products.data[i].price),
                category = createElement("div", "p_category", products.data[i].category);
            category.style.display = "none";
            let color = createElement("div", "p_color");
            for (let j = 0; j < products.data[i].colors.length; j++) {
                let rect = createElement("div", "rect");
                rect.style.backgroundColor = "#" + products.data[i].colors[j].code;
                color.appendChild(rect);
            }
            pic.appendChild(picsrc);
            id.appendChild(pic);
            id.appendChild(category);
            id.appendChild(color);
            id.appendChild(title);
            id.appendChild(price);
            content.appendChild(id);
            indexContainer.appendChild(content);
        }
    }
}

//infiniteRoll
let loading = false;
function infiniteRoll() {
    let exportPage;
    if (paging) {
        exportPage = productAPI + category + pagingQuery + paging
    } else {
        return
    }
    loading = true;
    productPage(exportPage, function (response) { render(response); loading = false; })
}

window.addEventListener("scroll", function () {
    let footerTop = document.querySelector(".Rectangle-4").getBoundingClientRect().top;
    let yScroll = window.pageYOffset;
    if (footerTop - yScroll < 0 && !loading) {
        window.requestAnimationFrame(function () {
            infiniteRoll();
        });
    }
})


//campaigns
function campaigns(cam) {
    let data = JSON.parse(cam).data;
    for (let i = 0; i < data.length; i++) {
        let campaign = createElement("div", "campaign"),
            bannerStory = document.createElement("div", "bannerPic");
        bannerStory.setAttribute("style", `background:url(https://api.appworks-school.tw${data[i].picture})`);
        let bannerTextContainer = document.createElement("div");
        let splitText = data[i].story.split("\r\n");
        for (let j = 0; j < splitText.length; j += 1) {
            let bannerText = createElement("div", "main-banner-text", splitText[j]);
            bannerTextContainer.appendChild(bannerText);
        }
        let camID = createElement("div", "camID", data[i].id);
        camID.style.display = "none";
        bannerStory.appendChild(bannerTextContainer);
        campaign.appendChild(bannerStory);
        campaign.appendChild(camID);
        document.getElementById("main-banner").appendChild(campaign);
    }
    let circleZone = createElement("div", "circleZone"),
        count = document.getElementsByClassName("camID");
    for (let i = 0; i < count.length; i++) {
        let circle = createElement("div", "circle");
        circle.name = i;
        circleZone.appendChild(circle);
    }
    document.getElementById("main-banner").appendChild(circleZone);
}
//slideShow
const slide = document.getElementsByClassName("campaign");
const chooseCircle = document.getElementsByClassName("circle");
let slideIndex = 0;

function resetSlide() {
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
        chooseCircle[i].className = "circle";
    }
}

function slideShow() {
    resetSlide();
    slideIndex++;
    if (slideIndex > slide.length) { slideIndex = 1 }
    slide[slideIndex - 1].style.display = "block";
    chooseCircle[slideIndex - 1].className = "circle choosen";
    for (let j = 0; j < chooseCircle.length; j++) {
        chooseCircle[j].addEventListener("click", (e) => {
            resetSlide();
            slide[e.target.name].style.display = "block";
            chooseCircle[e.target.name].className = "circle choosen";
        })
    }
    setTimeout(slideShow, 10000);
}

window.addEventListener("DOMContentLoaded",function(){
    productPage(productAPI + category, function (response) { render(response); });
    productPage(AppScoolHostAPI + "/marketing/campaigns", function (response) {
        campaigns(response);
        slideShow();
    });
})