let fb = {
    load: function () {
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, "script", "facebook-jssdk"));
    },
    init: function () {
        FB.init({
            appId: "2888776061346906",
            cookie: true,
            xfbml: true,
            version: "v6.0"
        });
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    },
    logOut: function () {
        FB.logout(function () {
            alert("已為您登出FB");
            window.location.assign("index.html");
        });
    }
};

window.fbAsyncInit = fb.init;
window.addEventListener("DOMContentLoaded", fb.load);

function createSendToken() {
    let token = localStorage.getItem("FBtoken"),
        FBtoken = {
            provider: "facebook",
            access_token: token
        };
    return JSON.stringify(FBtoken);
}

function userSignIn() {
    let xhr = new XMLHttpRequest(),
        FBtoken = createSendToken();
    xhr.open("POST", AppScoolHostAPI + "/user/signin");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            localStorage.setItem("userToken", xhr.responseText);
        }
    };
    xhr.send(FBtoken);
}

function getUserInfo() {
    const member = document.querySelector(".btn_member01_normal");
    FB.api("/me?fields=id,name,email,picture.width(200).height(200)", function (response) {
        member.src = response.picture.data.url;
        if (window.location.pathname === "/STYLiSH/profile.html") {
            const userPic = document.querySelector(".userPic"),
                text = document.querySelector(".content"),
                text2 = document.querySelector(".content2");
            userPic.src = response.picture.data.url;
            text.textContent = `歡迎光臨 ${response.name}`;
            text2.textContent = `您的E-MAIL是 ${response.email}`;
        }
    });
}

// 呼叫FB"檢查登入狀態"函式
function statusChangeCallback(response) {
    if (response.status === "connected") {
        createSendToken();
        userSignIn();
        getUserInfo();
        localStorage.setItem("FBtoken", response.authResponse.accessToken);
    } else {
        if (window.location.pathname === "/STYLiSH/profile.html") {
            const userPic = document.querySelector(".userPic"),
                FBlogOutBtn = document.querySelector(".FBlogout"),
                text = document.querySelector(".content");
            userPic.style.display = "none";
            FBlogOutBtn.style.display = "none";
            text.textContent = "歡迎光臨，請登入您的 FACEBOOK 帳號。";
        }
    }
}