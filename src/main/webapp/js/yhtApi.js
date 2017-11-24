"use strict";
var YHT = (function(){
    var ishttps = "https:" == document.location.protocol ? true: false;
    var HOST;
    function Token(){
        var o = {};
        o.gDate = function(){
            return sessionStorage.getItem("yhtDate");
        };
        o.sToken = function(tokenStr){
            sessionStorage.setItem("yhtToken", tokenStr);
            this.refresh();
        };
        o.gToken = function(){
            return sessionStorage.getItem("yhtToken");
        };
        o.isValid = function(){
            var date = o.gDate();
            var token = o.gToken();
            if (date == null || token == null || (new Date().getTime() - date) >= (30 * 60 * 1000)){
                return false;
            }
            return true;
        };
        o.refresh = function(){
            sessionStorage.setItem("yhtDate", new Date().getTime());
        };
        return o;
    }

    function ReqObj(method, params){
        var o = {};
        o.method = method;
        o.params = params;
        return o;
    }

    function doAjax(url,  ro, sFun, eFun,backURLMark,noticeParamsMark){
        var xmlhttp;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET",HOST + "token/checkToken?token=" + mToken.gToken()+backURLMark+noticeParamsMark,false);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var datajosn=xmlhttp.responseText;
                var data=JSON.parse(datajosn);
                if(data.code == 400){
                    initMonitor(ro);
                }else{
                    sFun(data);
                }
            }else if (xmlhttp.readyState==4 && xmlhttp.status != 200){
                eFun(xmlhttp.status);
            }
        };
        xmlhttp.send();
    }

    function initMonitor(ro){
        if(mAuthListener == null){
            throw new Error("YHT.init 方法未设置");
            return;
        }else{
            mAuthListener(ro);
        }
    }

    var hzy = {};
    var mAuthListener = null;
    var mAppId = null;
    var mToken = new Token();
    hzy.init = function(appid, listener){
        if(listener == null){
            throw new Error("token 回调方法为空");
            return;
        }
        mAuthListener = listener;
        if(appid == null){
            throw new Error("appid 为空");
            return;
        }
        mAppId = appid;
    };
    hzy.initHttps = function (host) {
        HOST = host;
    }

    hzy.setToken = function(token){
        if(token == null || token == undefined){
            return;
        }
        mToken.sToken(token);
    };
    hzy.querySign = function(successFun, failFun, backURL, noticeParams) {
        throw new Error("此接口已停用");
    };
    hzy.queryContract = function(successFun, failFun, contractId, backURL, noticeParams) {
        var ro = new ReqObj(this.queryContract, [successFun, failFun, contractId, backURL, noticeParams]);
        if(contractId == null || contractId == undefined || contractId == ''){
            var data="合同id为空";
            failFun(data);
            return;
        }
        if(!mToken.isValid()){
            initMonitor(ro);
            return;
        }
        if(backURL == null || backURL == undefined || backURL == ''){
            var backURLMark =""
        }else{
            var backURL = backURL.replace(/&/g,',');
            var backURLMark ="&backURL="+backURL;
        }
        if(noticeParams == null || noticeParams == undefined || noticeParams == ''){
            var noticeParamsMark = "";
        }else{
            var noticeParamsMark = "&noticeParams="+noticeParams;
        }
        doAjax("", ro, function sFun(data){
            if(data.code==200){
                successFun(HOST + "viewsopen/contract_view_p.html?token="+ mToken.gToken()+"&contractId="+contractId);
            }else{
                failFun(data.message);
            }
        },  function eFun(data){
            failFun(data);
        },backURLMark,noticeParamsMark);
    };
    hzy.signContract = function(successFun, failFun, contractId, backURL, noticeParams) {
        var ro = new ReqObj(this.signContract, [successFun, failFun, contractId, backURL, noticeParams]);
        if(contractId == null || contractId == undefined || contractId == ''){
            var data="合同id为空";
            failFun(data);
            return;
        }
        if(!mToken.isValid()){
            initMonitor(ro);
            return;
        }
        if(backURL == null || backURL == undefined || backURL == ''){
            var backURLMark =""
        }else{
            var backURL = backURL.replace(/&/g,',');
            var backURLMark ="&backURL="+backURL;
        }
        if(noticeParams == null || noticeParams == undefined || noticeParams == ''){
            var noticeParamsMark = "";
        }else{
            var noticeParamsMark = "&noticeParams="+noticeParams;
        }
        doAjax("", ro, function sFun(data){
            if(data.code==200){
                successFun(HOST + "viewsopen/contract_drag.html?token="+ mToken.gToken()+"&contractId="+contractId);
            }else{
                failFun(data.message);
            }
        },  function eFun(data){
            failFun(data);
        },backURLMark,noticeParamsMark);
    };
    hzy.querySignContract = function(successFun, failFun, contractId, backURL, noticeParams) {
        var ro = new ReqObj(this.querySignContract, [successFun, failFun, contractId, backURL, noticeParams]);
        if(contractId == null || contractId == undefined || contractId == ''){
            var data="合同id为空";
            failFun(data);
            return;
        }
        if(!mToken.isValid()){
            initMonitor(ro);
            return;
        }
        if(backURL == null || backURL == undefined || backURL == ''){
            var backURLMark =""
        }else{
            var backURL = backURL.replace(/&/g,',');
            var backURLMark ="&backURL="+backURL;
        }
        if(noticeParams == null || noticeParams == undefined || noticeParams == ''){
            var noticeParamsMark = "";
        }else{
            var noticeParamsMark = "&noticeParams="+noticeParams;
        }
        doAjax("", ro, function sFun(data){
            if(data.code==200){
                successFun(HOST + "viewsopen/contract_view_nb.html?token="+ mToken.gToken()+"&viewnb=1&contractId="+contractId);
            }else{
                failFun(data.message);
            }
        },  function eFun(data){
            failFun(data);
        },backURLMark,noticeParamsMark);
    };
    hzy.do = function(obj){
        if(obj)obj.method.apply(this, obj.params);
    };
    return hzy;
})();