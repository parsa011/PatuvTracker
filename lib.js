const APP_ID = "asdfasdfasdf";
var p = document.querySelector('p');
p.addEventListener('click', function () {
   var error = new Error();
   error.name = "Mostafa";
   error.message = "khaleeeeee";
   throw error;
});

window.onerror = function (msg, url, lineNo, columnNo, error) {
   var userinfo;
   var message;
   var string = msg.toLowerCase();
   var substring = "script error";
   if (string.indexOf(substring) > -1) {
      alert('Script Error: See Browser Console for Detail');
   } else {
      message = [
         'Message: ' + msg,
         'URL: ' + url,
         'Line: ' + lineNo,
         'Column: ' + columnNo,
         'Error object: ' + JSON.stringify(error)
      ].join(' - ');
   }
   var callBackFunc = "userInfoCallBack"
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         userinfo = JSON.parse(this.responseText.slice(callBackFunc.length + 1, this.responseText.length - 1));
         var data = new FormData();
         data.append('app_id',APP_ID);
         data.append('Message',msg);
         data.append('fileurl',url);
         data.append('line',lineNo);
         data.append('Column',columnNo);
         data.append('url',window.location.href);
         data.append('userIp',userinfo.geoplugin_request);
         data.append('userCountryName',userinfo.geoplugin_countryName);
         data.append('userLatitude',userinfo.geoplugin_latitude);
         data.append('userLongitude',userinfo.geoplugin_longitude);
         data.append('userTimezone',userinfo.geoplugin_timezone);
         data.append('userAppCodeName',navigator.appCodeName);
         data.append('userAppName',navigator.appName);
         data.append('userAppVersion',navigator.appVersion);
         data.append('userPlatform',navigator.platform);
         data.append('userAgent',navigator.userAgent);
         var req = fetch('https://localhost:44372/Home/Index',{
            method: 'POST',
            body: data
          });
          console.log(req);
      }
   };
   xhttp.open("GET", "http://www.geoplugin.net/json.gp?jsoncallback=" + callBackFunc, true);
   xhttp.send();
   return false;
};