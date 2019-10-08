let userPic = document.querySelector('.userPic');
let text = document.querySelector('.content');
const text2 = document.querySelector('.content2');
const member = document.querySelector('.btn_member01_normal');
let token;



// 呼叫FB"檢查登入狀態"函式
// This is called with the results from from FB.getLoginStatus().

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        userPic.style.display = `block`;
        createSendToken();
        sendToken();
        testAPI();
        console.log('login success');
        token = response.authResponse.accessToken;
        console.log(token);
    } else {
        // The person is not logged into your app or we are unable to tell.
        // alert('Please login your FaceBook!');
       
        text.textContent="歡迎光臨，請登入您的 FACEBOOK 帳號。";
        userPic.style.display='none';
    }
   
}

//如果FB狀態為登入，右上會員頭像擷取FB帳號圖片。
function memberIcon() {
    FB.api('/me?fields=id,name,email,picture.width(200).height(200)', function (response) {

        member.src = response.picture.data.url;

    });
}

function indexStatusChangeCallback(response) {

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.     
        memberIcon();} else{
            return
        }
    }


// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}


function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email,picture.width(200).height(200)', function (response) {
        console.log('Successful login for: ' + response.name);
        console.log(response);
        member.src = response.picture.data.url;
        userPic.src = response.picture.data.url;
        text.textContent = `歡迎光臨 ${response.name}`;
        text2.textContent = `您的E-MAIL是 ${response.email}`;
    });
}



// get FBtoken

   //創建API所需body
let parseToken;
let FBtoken;
function createSendToken() {
    FBtoken = {
        provider : "facebook",
        access_token : token
    }
    parseToken = JSON.stringify(FBtoken);    
}


// 將FBtoken送 sign in api
function sendToken() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${AppScoolHostAPI}/user/signin`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {           
            localStorage.setItem('userToken', xhr.responseText);
        };
    };
    xhr.send(parseToken);
}

// 登出FB
function logout() {
    FB.logout(function (response) {
        alert('已為您登出FB');
        window.location.assign('index.html');
    });
};