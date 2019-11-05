const userPic = document.querySelector(".userPic");
const text = document.querySelector(".content");
const text2 = document.querySelector(".content2");
const member = document.querySelector(".btn_member01_normal");
let token;

let fb={};

fb.load=function(){
	// Load the SDK asynchronously
	(function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "facebook-jssdk"));
fb.init=function(){
	FB.init({
		appId: "2888776061346906",
                cookie: true,
                xfbml: true,
                version: "v3.3"
	});
	FB.getLoginStatus(function(response){
		app.fb.loginStatusChange(response);
	});
};
}
window.fbAsyncInit=fb.init;


//創建API所需body
let parseToken;
let FBtoken;
function createSendToken() {
    FBtoken = {
        provider: "facebook",
        access_token: token
    }
    parseToken = JSON.stringify(FBtoken);
}

// 將FBtoken送 sign in api
function sendToken() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${AppScoolHostAPI}/user/signin`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            localStorage.setItem("userToken", xhr.responseText);
        };
    };
    xhr.send(parseToken);
}

function testAPI() {
    FB.api("/me?fields=id,name,email,picture.width(200).height(200)", function (response) {
        member.src = response.picture.data.url;
        userPic.src = response.picture.data.url;
        text.textContent = `歡迎光臨 ${response.name}`;
        text2.textContent = `您的E-MAIL是 ${response.email}`;
    });
}


// 呼叫FB"檢查登入狀態"函式
function statusChangeCallback(response) {
    if (response.status === "connected") {
        userPic.style.display = `block`;
        createSendToken();
        sendToken();
        testAPI();
        token = response.authResponse.accessToken;
    } else {
        text.textContent = "歡迎光臨，請登入您的 FACEBOOK 帳號。";
        userPic.style.display = "none";
    }
}

//如果FB狀態為登入，右上會員頭像擷取FB帳號圖片。
function memberIcon() {
    FB.api("/me?fields=id,name,email,picture.width(200).height(200)", function (response) {
        member.src = response.picture.data.url;
    });
}

function indexStatusChangeCallback(response) {
    if (response.status === "connected") {
        memberIcon();
    }
    else {
        return
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// 登出FB
function logout() {
    FB.logout(function (response) {
        alert("已為您登出FB");
        window.location.assign("index.html");
    });
}