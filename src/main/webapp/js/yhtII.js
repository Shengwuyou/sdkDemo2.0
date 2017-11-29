//全局参数
var token;
var HOST ;
var appId ;
var appUserId ;
var password ;
var templateId;
var contractId;
var clip ;

var reqUrl = new Array();
reqUrl[0] =  "https://sdk.yunhetong.com/sdk/";
reqUrl[1] =  "https://sdklink.yunhetong.com/sdk/";
reqUrl[2] =  "https://testsdk.yunhetong.com/sdk/";
reqUrl[3] =  "http://192.168.10.56:9999/sdk/";
reqUrl[4] =  "http://localhost:8080/sdk/";

var butStu = 0;
//获取当前的URL
function getURL() {
    HOST = $(".req_url").val();
    if(HOST ==reqUrl[0]){appId = "2017052214544700003";password = "shengwuyou123"; appUserId = "newTest" ; templateId ="55084" }
    else if(HOST == reqUrl[1]){appId = "2017060609093200000";password = "shengwuyou123"; appUserId = "newTest" ; templateId ="18797"  }
    else if(HOST == reqUrl[2]){appId = "2017061512352100003";password = "shengwuyou123"; appUserId = "11" ; templateId ="447403"  }
    else{appId = "2017051115423500000";password = "gLtQ4WusuGK"; appUserId = "1"  ; templateId ="72363"  }

    if(butStu ==1){addUserView();}
    else{getTokenView(); }

}

$(function () {
    //使用复制功能需要初始化的参数
    clip = new ZeroClipboard($(".token_action_2"));
    //初始化下拉框
    initSelect($(".req_url"),4,0,true,reqUrl);

    appId = "2017052214544700003";
    appUserId = "newTest";
    password = "shengwuyou123";
    templateId ="55084";

    //初始化访问地址
    HOST = $(".req_url").val();
});
//初始化下拉框：selcalss：那个class需要添加下拉框  num ：添加到哪里  start 从哪里开始  flag，是否 使用特定数据展示下拉框，arrs 特定数据的数组
function initSelect(selClass,num,start,flag,arrs) {
    var str="";
    if(flag){
        for(var i=start;i<=num;i++){
            str+="<option>"+arrs[i]+"</option>";
        }
    }else{
        for(var i=start;i<=num;i++){
            str+="<option>"+i+"</option>";
        }
    }
    $(selClass).append(str);
}
function checkToken() {
    token = $(".token_info").val()
    if(token ==null || token==""){
        var info=$(".responseMessage").val()+'\r\n\r\n 检查token的结果：';
        $(".responseMessage").val(info+"token 不能为空！");
        return false;
    }
    $.ajax({
        type: 'GET',
        url: HOST+'token/checkToken?token='+token,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n 校验token ：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
}
function copyToken() {
    clip.on("complete", function (client) {
        alert("ok!");
    });
    var info=$(".responseMessage").val()+'\r\n\r\n  复制token成功！';
    $(".responseMessage").val(info);
}
function upsetButColor(selectId) {
    $(".left_menu_but").css("background","linear-gradient(to bottom , #9d9797 , #454546)");
    $(selectId).css("background","linear-gradient(to bottom , #fb77ba , #3e86f1)");

}

function addUserView() {
    upsetButColor($("#but_1"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 添加用户 </td></tr> " +
        "<tr><td>appId:</td> <td><input class='inp' name='appId' > </td></tr> " +
        "<tr><td>appUserId:</td> <td><input class='inp' name='appUserId' ></td></tr> " +
        "<tr><td>cellNum:</td> <td><input class='inp' name='cellNum'></td></tr> " +
        "<tr><td>userType:</td> <td><select class='sel' name='userType'></select></td></tr> " +
        "<tr><td>userName:</td> <td><input class='inp' name='userName'></td></tr> " +
        "<tr><td>certifyType:</td> <td><select class='sel' name='certifyType'></select></td></tr> " +
        "<tr><td>certifyNumber:</td> <td> <input class='inp' name='certifyNumber'> </td></tr> " +
        "<tr><td>createSignature:</td> <td> <select class='sel' name='createSignature'></select> </td></tr> " +
        "<tr><td>password:</td> <td> <input class='inp' name='password' > </td></tr> " +
        "<tr><td><div class='quite_css'><div class='quite' onclick='addUser()'> <span class='quite_name'> CLICK </span></div></div>  </td></tr> " +
        "</table>";
    $(".content").append(str);

    $("*[name='appId']").val(appId);
    $("*[name='password']").val(password);

    var userT = new Array("个人","企业","平台管理员");
    initSelect($("*[name='userType']"),2,0,true,userT);

    initSelect($("*[name='certifyType']"),6,1,false,null);

    var createS = new Array("手动创建签名","自动创建签名");
    initSelect($("*[name='createSignature']"),1,0,true,createS);
}
function addUser() {
    appId = $("*[name='appId']").val();
    appUserId = $("*[name='appUserId']").val();
    password = $("*[name='password']").val();

    var userT =$("*[name='userType']").val();
    if(userT == "个人"){userT = 1 ;}
    else if( userT == "企业" ){ userT = 2 ; }
    else{userT = 4 ; }

    var createS =$("*[name='createSignature']").val();
    if(createS == "手动创建签名"){createS = 0 ;}
    else{createS = 1 ; }

    var datas = {
        "appId" : appId,
        "appUserId" : appUserId,
        "cellNum" : $("*[name='cellNum']").val(),
        "userType" : userT ,
        "userName" : $("*[name='userName']").val(),
        "certifyType" : $("*[name='certifyType']").val(),
        "certifyNumber" : $("*[name='certifyNumber']").val(),
        "createSignature" : createS,
        "password" : password
    };
    $.ajax({
        type: 'POST',
        url: HOST+'userInfo/addUser',
        cache : false,
        dataType: 'json',
        data: datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  添加用户字段：';
            $(".responseMessage").val(info+JSON.stringify(datas));
            info=$(".responseMessage").val()+'\r\n  添加用户结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
}

function getTokenView() {
    upsetButColor($("#but_2"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 获取token </td></tr> " +
        "<tr><td>appId:</td> <td><input class='inp' name='appId' > </td></tr> " +
        "<tr><td>appUserId:</td> <td><input class='inp' name='appUserId' ></td></tr> " +
        "<tr><td>password:</td> <td> <input class='inp' name='password' > </td></tr> " +
        "<tr><td><div class='quite_css'><div class='quite' onclick='getToken(true)'> <span class='quite_name'> CLICK </span></div></div>  </td></tr> " +
        "</table>";
    $(".content").append(str);

    $("*[name='appId']").val(appId);
    $("*[name='appUserId']").val(appUserId);
    $("*[name='password']").val(password);
}
function getToken(flag) {
    //能成功获取token就保存数据
    if(flag){
        appId = $("*[name='appId']").val();
        appUserId = $("*[name='appUserId']").val();
        password = $("*[name='password']").val();
    }


    var datas = {
        "appId" : appId,
        "appUserId" : appUserId,
        "password" : password
    };
    $.ajax({
        type: 'POST',
        url: HOST+'token/getToken',
        cache : false,
        dataType: 'json',
        data: datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  获取token参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));

            info=$(".responseMessage").val()+'\r\n  获取token结果：';
            $(".responseMessage").val(info+JSON.stringify(data));

            if(data.subCode.toString() == 200){
                token = data.value.token.toString();
                $(".token_info").val(token);
                //初始化签署的js
                initSign();
            }
        },
        error:function(){
            alert("error!!!!")
        }
    });
}

function modifyUserInfoView() {
    upsetButColor($("#but_3"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 修改用户信息 </td></tr> " +
        "<tr><td>cellNum:</td> <td><input class='inp' name='cellNum'></td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='modifyCellNum()'> <span class='quite_name_2'>修改手机号</span></div></div></div> </td></tr> " +
        "<tr><td>userName:</td> <td><input class='inp' name='userName'></td></tr> " +
        "<tr><td>createSignature:</td> <td> <select class='sel' name='createSignature'></select> </td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='modifyUserName()'> <span class='quite_name_2'>修改用户名</span></div></div> </div> </td></tr> " +
        "</table>";
    $(".content").append(str);

    var createS = new Array("手动创建签名","自动创建签名");
    initSelect($("*[name='createSignature']"),1,0,true,createS);
}
function modifyCellNum() {
    var flag = checkToken();
    if(flag==false){alert("先获取token"); return;}

    var datas = {
        "cellNum" :  $("*[name='cellNum']").val()
    };

    $.ajax({
        type: 'POST',
        url: HOST+'userInfo/modifyCellNum?token='+token,
        cache : false,
        dataType: 'json',
        data:datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));

            info=$(".responseMessage").val()+'\r\n  修改手机号结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
}
function modifyUserName() {
    var flag = checkToken();
    if(flag==false){alert("先获取token"); return;}

    var createS =$("*[name='createSignature']").val();
    if(createS == "手动创建签名"){createS = 0 ;}
    else{createS = 1 ; }

    var datas = {
        "userName" :  $("*[name='userName']").val(),
        "createSignature" :  createS
    };

    $.ajax({
        type: 'POST',
        url: HOST+'userInfo/modifyUserName?token='+token,
        cache : false,
        dataType: 'json',
        data:datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));

            info=$(".responseMessage").val()+'\r\n  修改用户名结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
}

function templateContractView() {
    upsetButColor($("#but_4"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 模板创建合同 </td></tr> " +
        "<tr><td>title:</td> <td><input class='inp' name='title'> </td></tr> " +
        "<tr><td>defContractNo:</td> <td><input class='inp' name='defContractNo' ></td></tr> " +
        "<tr><td>templateId:</td> <td><input class='inp' name='templateId'></td></tr> " +
        "<tr><td>useCer:</td> <td><select class='sel' name='useCer'></select></td></tr> " +
        "<tr><td>param:</td> <td><textarea class='tArea' name='param'></textarea></td></tr> " +
        "<tr><td><div class='quite_css'><div class='quite' onclick='templateContract()'> <span class='quite_name'> CLICK </span></div></div>  </td></tr> " +
        "</table>";
    $(".content").append(str);

    initSelect($("*[name='useCer']"),1,0,false,null);

    $("*[name='title']").val("《模板创建"+new Date().getTime()+"》");
    $("*[name='defContractNo']").val(new Date().getTime());
    $("*[name='templateId']").val(templateId);
}
function templateContract() {
    var flag = checkToken();
    if(flag==false){ return;}

    var datas={
        "title":$("*[name='title']").val() ,
        "defContractNo":$("*[name='defContractNo']").val() ,
        "templateId":$("*[name='templateId']").val() ,
        "useCer": $("*[name='useCer']").val(),
        "param":$("*[name='param']").val()
    };

    var info=$(".responseMessage").val()+'\r\n\n 合同正在生成......\r\n  参数：';
    $(".responseMessage").val(info+JSON.stringify(datas));

    $.ajax({
        type: 'POST',
        url: HOST+'contract/templateContract?token='+token,
        cache : false,
        dataType: 'json',
        data:datas,
        success:function(data){
            info=$(".responseMessage").val()+'\r\n  模板id创建合同结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
            contractId = data.value.contractId.toString();
            templateId = $("*[name='templateId']").val();
        },
        error:function(){
            alert("error!!!!");
        }
    });
}

function fileContractView() {
    upsetButColor($("#but_5"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 上传文件建合同 </td></tr> " +
        "<tr><td>title:</td> <td><input class='inp' name='title' > </td></tr> " +
        "<tr><td>defContractNo:</td> <td><input class='inp' name='defContractNo' ></td></tr> " +
        "<tr><td>file上传:</td> <td><input class='inp' name='file' type='file'></td></tr> " +
        "<tr><td>useCer:</td> <td><select class='sel' name='useCer'></select></td></tr> " +
        "<tr><td><div class='quite_css'><div class='quite' onclick='fileContract()'> <span class='quite_name'> CLICK </span></div></div>  </td></tr> " +
        "</table>";
    $(".content").append(str);

    initSelect($("*[name='useCer']"),1,0,false,null);

    $("*[name='title']").val("《上传文件创建"+new Date().getTime()+"》");
    $("*[name='defContractNo']").val(new Date().getTime());
}
function fileContract() {
    var flag = checkToken();
    if(flag==false){return;}

    var datas=new FormData();//'?token='+token;
    datas.append('token',token);
    datas.append('title',$("*[name='title']").val());
    datas.append('defContractNo',$("*[name='defContractNo']").val());
    datas.append('useCer',$("*[name='useCer']").val());
    datas.append('file',$("*[name='file']")[0].files[0]);

    var info=$(".responseMessage").val()+'\r\n\n 合同正在生成......';
    $(".responseMessage").val(info);

    $.ajax({
        type: 'POST',
        url: HOST+'contract/fileContract',
        data: datas,
        processData:false,
        contentType:false,
        success:function(data){
            info=$(".responseMessage").val()+'\r\n  上传文件创建合同结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
            contractId = data.value.contractId.toString();
        },
        error:function(){
            alert("error!!!!");
        }
    });

}

function addPartnerView() {
    upsetButColor($("#but_6"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 添加参与者 </td></tr> " +
        "<tr><td>contractId:</td> <td><input class='inp' name='contractId' > </td></tr> " +
        "<tr><td>partners:</td> <td><textarea class='tArea' name='partners'></textarea></td></tr> " +
        "<tr><td><div class='quite_css'><div class='quite' onclick='addPartner()'> <span class='quite_name'> CLICK </span></div></div>  </td></tr> " +
        "</table>";
    $(".content").append(str);

    $("*[name='contractId']").val(contractId);
}
function addPartner() {
    var datas = {
        "contractId" : $("*[name='contractId']").val(),
        "partners" : $("*[name='partners']").val()
    };

    $.ajax({
        type: 'POST',
        url: HOST+'contract/addPartner?token='+token,
        cache : false,
        dataType: 'json',
        data: datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));

            info=$(".responseMessage").val()+'\r\n  添加参与者结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
}

function contractManagerView() {
    upsetButColor($("#but_7"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 合同管理 </td></tr> " +
        "<tr><td>contractId:</td> <td><input class='inp' name='contractId'></td></tr> " +
        "<tr><td>signer:</td> <td><textarea class='tArea' name='signer'></textarea></td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='autoSignContract()'> <span class='quite_name_2'> 自动签署 </span></div></div></div> </td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='signContract()'> <span class='quite_name_2'> 页面签署 </span></div></div></div> </td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='invalid()'> <span class='quite_name_2'> 合同作废 </span></div></div></div> </td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='contractDetail()'> <span class='quite_name_2'> 合同状态 </span></div></div></div> </td></tr> " +
        "<tr><td><div class='quite_css_1' ><div class='quite_css_2'><div class='quite_2' onclick='contractDownload()'> <span class='quite_name_2'> 合同下载 </span></div></div></div> </td></tr> " +
        "</table>";
    $(".content").append(str);

    $("*[name='contractId']").val(contractId);
}
var autoSignContract=function () {
    contractId = $("*[name='contractId']").val();
    var datas = {
        "contractId" : contractId,
        "signer":  $("*[name='signer']").val()
    };

    $.ajax({
        type: 'POST',
        url: HOST+'contract/signContract?token='+token,
        cache : false,
        dataType: 'json',
        data: datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));
            info=$(".responseMessage").val()+'\r\n  合同自动签署结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};
var invalid=function () {
    contractId = $("*[name='contractId']").val();
    var datas = {
        "contractId" : contractId
    };
    $.ajax({
        type: 'POST',
        url: HOST+'contract/invalid?token='+token,
        cache : false,
        dataType: 'json',
        data: datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));
            info=$(".responseMessage").val()+'\r\n  合同作废结果：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};
var contractDetail=function () {
    contractId = $("*[name='contractId']").val();
    var datas = {
        "contractId" : contractId
    };

    $.ajax({
        type: 'GET',
        url: HOST+'contract/detail?token='+token,
        cache : false,
        dataType: 'json',
        data: datas,
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));
            info=$(".responseMessage").val()+'\r\n  合同签署状态信息：';
            $(".responseMessage").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};
var contractDownload=function () {
    var data='?token='+token;
    data+='&contractId='+$("*[name='contractId']").val();
    window.open(HOST+'contract/download'+data);
};

var loaclSignContract = function () {
    window.open(HOST + "views/contract_view.html?token="+ token+"&contractId="+contractId);
};
var signContract= function(){
    if(HOST == "http://localhost:8080/sdk/"||HOST == "http://192.168.10.56:9999/sdk/"){
        loaclSignContract();
        return;
    }
    YHT.setToken($(".token_info").val());
    //var backUrl='https://www.baidu.com';
    YHT.queryContract(
        function successFun(url){window.open(url);},
        function failFun(data){alert(data);},
        $("*[name='contractId']").val(),
        null,
        '123456'
    );
};
//引用的旧版本的js，完成功能调用
var tokenUnableListener = function(){ //当token不合法时，SDK会回调此方法
    if(token!=""){
        getToken(false); //重新获取一个token，这样可以避免再次去拿！
        YHT.setToken(token);//重新设置token
    }else{
        alert("先获取token！啊");
    }
};
var initSign=function () {
    //初始化云合同的js访问地址！
    YHT.initHttps(HOST);
    if(appId ==null||appId==""){
        alert("appId没有初始化！");
    }else{
        YHT.init(appId, tokenUnableListener);//必须初始化YHT
    }
};

function contractListView() {
    upsetButColor($("#but_8"));
    //先清空
    $(".content").html("");
    //再添加上一个table
    var str = "";
    str+= "<table><tr><td class='tabT'  colspan='2'> 获取token </td></tr> " +
        "<tr><td>pageNum:</td> <td><input class='inp' name='pageNum' > </td></tr> " +
        "<tr><td>pageSize:</td> <td><input class='inp' name='pageSize' ></td></tr> " +
        "<tr><td><div class='quite_css'><div class='quite' onclick='contractList()'> <span class='quite_name'> CLICK </span></div></div>  </td></tr> " +
        "</table>";
    $(".content").append(str);
};
var contractList=function () {
    var datas = {
        "pageNum" : $("*[name='pageNum']").val(),
        "pageSize" : $("*[name='pageSize']").val()
    };

    $.ajax({
        type: 'GET',
        url: HOST+'contract/list?token='+token,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$(".responseMessage").val()+'\r\n\r\n  参数：';
            $(".responseMessage").val(info+JSON.stringify(datas));

            info=$(".responseMessage").val()+'\r\n  合同列表信息：';
            $(".responseMessage").val(info+JSON.stringify(data));

        },
        error:function(){
            alert("error!!!!");
        }
    });
};






