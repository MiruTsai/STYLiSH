//render index
const indexContainer = document.getElementById("p_container");
let paging;
function render(parseData) {
    let products = JSON.parse(parseData);
    paging = products.next_paging;
    if (products.data.length === 0) {
        let noProduct = app.createElement("div", "noProduct", "沒有您搜尋的商品喔！");
        indexContainer.appendChild(noProduct);
    } else {
        for (let i = 0; i < products.data.length; i += 1) {
            let content = app.createElement("div", "p_content"),
                pic = app.createElement("div", "p_pic"),
                picsrc = app.createElement("img", "picSrc")
            picsrc.src = products.data[i].main_image;
            let id = app.createElement("a", "p_id")
            id.href = "product.html?id=" + products.data[i].id;
            let title = app.createElement("div", "p_title", products.data[i].title),
                price = app.createElement("div", "p_price", "TWD." + products.data[i].price),
                category = app.createElement("div", "p_category", products.data[i].category);
            category.style.display = "none";
            let color = app.createElement("div", "p_color");
            for (let j = 0; j < products.data[i].colors.length; j++) {
                let rect = app.createElement("div", "rect");
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
app.loading = false;
app.infiniteRoll = function() {
    let exportPage;
    if (paging) {
        exportPage = app.API_HOST + "/products/" + app.getParameter() + "?paging=" + paging
    } else {
        return
    }
    app.loading = true;
    app.getData(exportPage, function (response) { render(response); app.loading = false; })
}

window.addEventListener("scroll", function () {
    let footerTop = document.querySelector(".Rectangle-4").getBoundingClientRect().top;
    let yScroll = window.pageYOffset;
    if (footerTop - yScroll < 0 && !app.loading) {
        window.requestAnimationFrame(function () {
            app.infiniteRoll();
        });
    }
})


//campaigns
app.campaigns = function (cam) {
    let data = JSON.parse(cam).data;
    for (let i = 0; i < data.length; i++) {
        let campaign = app.createElement("div", "campaign"),
            bannerStory = app.createElement("div", "bannerPic");
        bannerStory.setAttribute("style", `background:url(${data[i].picture})`);
        let bannerTextContainer = document.createElement("div");
        let splitText = data[i].story.split("\r\n");
        for (let j = 0; j < splitText.length; j += 1) {
            let bannerText = app.createElement("div", "main-banner-text", splitText[j]);
            bannerTextContainer.appendChild(bannerText);
        }
        let camID = app.createElement("div", "camID", data[i].id);
        camID.style.display = "none";
        bannerStory.appendChild(bannerTextContainer);
        campaign.appendChild(bannerStory);
        campaign.appendChild(camID);
        document.getElementById("main-banner").appendChild(campaign);
    }
    let circleZone = app.createElement("div", "circleZone"),
        count = document.getElementsByClassName("camID");
    for (let i = 0; i < count.length; i++) {
        let circle = app.createElement("div", "circle");
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
    app.getData(app.API_HOST + "/products/" + app.getParameter(), function (response) { render(response); });
    app.getData(app.API_HOST + "/marketing/campaigns", function (response) {
    app.campaigns(response);
        slideShow();
    });
})