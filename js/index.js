//render index
function render(parseData) {
    let products = JSON.parse(parseData);
    paging = products.paging;
    for (let i = 0; i < products.data.length; i += 1) {
        let content = document.createElement("div");
        content.className = "p_content";
        let pic = document.createElement("div");
        pic.className = "p_pic";
        let picsrc = document.createElement("img");
        picsrc.src = `${products.data[i].main_image}`;  
        let id = document.createElement("a");
        id.className = "p_id";
        id.href = `product.html?id=${products.data[i].id}`;
        let title = document.createElement("div");
        title.className = "p_title";
        let price = document.createElement("div");
        price.className = "p_price";
        let category = document.createElement("div");
        category.className = "p_category";
        category.style.display = "none";
        category.innerText = `${products.data[i].category}`;
        let color = document.createElement("div");
        color.className = "p_color";
        for (let j = 0; j < products.data[i].colors.length; j += 1) {
            let rect = document.createElement("div");
            rect.className = "rect";
            rect.style.backgroundColor = `#${products.data[i].colors[j].code}`;
            color.appendChild(rect);
        }
        title.innerText = `${products.data[i].title}`;
        price.innerText = `TWD.${products.data[i].price}`
        pic.appendChild(picsrc);
        id.appendChild(pic);                
        id.appendChild(category);
        id.appendChild(color);
        id.appendChild(title);
        id.appendChild(price);
        content.appendChild(id);
        document.getElementById("p_container").appendChild(content);
    }
}

//infiniteRoll
let loading = false;
function infiniteRoll() {
    let exportPage;
    if (paging) {
        exportPage = `${productAPI}${category}${pagingQuery}${paging}`
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

productPage(`${productAPI}${category}`, function (response) { render(response); })

//campaigns
let bannerText;

function campaigns(cam) {
    let data = JSON.parse(cam).data;
    for (let i = 0; i < data.length; i++) {
        let campaign = document.createElement("div");
        campaign.className = ("campaign");
        let bannerStory = document.createElement("div");
        bannerStory.setAttribute("style", `background:url(https://api.appworks-school.tw${data[i].picture})`);
        bannerStory.className = "bannerPic";
        let bannerTextContainer = document.createElement("div")
        let splitText = data[i].story.split("\r\n");
        for (let j = 0; j < splitText.length; j += 1) {
            let bannerText = document.createElement("div");
            bannerText.className = "main-banner-text";
            bannerText.innerText = `${splitText[j]}`;
            bannerTextContainer.appendChild(bannerText);
        }
        let camID = document.createElement("div");
        camID.className = "camID";
        camID.innerText = `${data[i].id}`;
        camID.style.display = "none";
        bannerStory.appendChild(bannerTextContainer);
        campaign.appendChild(bannerStory);
        campaign.appendChild(camID);
        document.getElementById("main-banner").appendChild(campaign);
    }
    let circleZone = document.createElement("div");
    circleZone.className="circleZone"; 
    let count = document.getElementsByClassName("camID");
    for (let i = 0; i < count.length; i += 1) {
    let circle = document.createElement("div");
    circle.className = "circle";
    circleZone.appendChild(circle);
}
document.getElementById("main-banner").appendChild(circleZone);
}
//slideShow
let slideIndex = 0;
function slideShow() {
    let slide = document.getElementsByClassName("campaign");
    let chooseCircle = document.getElementsByClassName("circle");
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
        chooseCircle[i].removeAttribute("id");
    }
    slideIndex++;
    if (slideIndex > slide.length) { slideIndex = 1 }
    slide[slideIndex - 1].style.display = "block";
    chooseCircle[slideIndex - 1].id = "choosen";
    setTimeout(slideShow, 10000);
}
productPage(`${AppScoolHostAPI}/marketing/campaigns`, function (response) { 
    campaigns(response); 
    slideShow(); 
});