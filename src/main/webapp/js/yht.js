// var HOST = "https://sdk.yunhetong.com/sdk/";
// var HOST = "https://sdklink.yunhetong.com/sdk/";
// var HOST = "https://testsdk.yunhetong.com/sdk/";
var HOST = "http://localhost:8080/sdk/";
// var HOST = "http://192.168.10.56:9999/sdk/";
var token="";

var addUser=function () {
    var data='?';
    data+='appId='+$("*[name='appId']").val();
    data+='&appUserId='+$("*[name='appUserId']").val();
    data+='&cellNum=' +$("*[name='cellNum']").val();
    data+='&userType='+$("*[name='userType']").val();
    data+='&userName='+$("*[name='userName']").val();
    data+='&certifyType='+$("*[name='certifyType']").val();
    data+='&certifyNumber='+$("*[name='certifyNumber']").val();
    data+='&createSignature='+$("*[name='createSignature']").val();
    data+='&password='+$("*[name='password']").val();
    $.ajax({
        type: 'POST',
        url: HOST+'userInfo/addUser'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  添加用户结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });};
var getToken=function () {
    var data='?';
    data+='appId='+$("*[name='appIdToken']").val();
    data+='&appUserId='+$("*[name='appUserIdToken']").val();
    data+='&password=' +$("*[name='passwordToken']").val();

    $.ajax({
        type: 'POST',
        url: HOST+'token/getToken'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  获取 '+$("*[name='appUserIdToken']").val()+'的 token结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
            $("*[name='token']").val(data.value.token.toString());
            token=data.value.token.toString();
        },
        error:function(){
            alert("error!!!!")
        }
    });
};
var checkToken=function () {
    var data='?token='+$("*[name='token']").val();
    token=$("*[name='token']").val();
    $.ajax({
        type: 'GET',
        url: HOST+'token/checkToken'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  检验token结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
};
var modifyCellNum=function () {
    var data='?token='+token+'&cellNum='+$("*[name='newCellNum']").val();
    $.ajax({
        type: 'POST',
        url: HOST+'userInfo/modifyCellNum'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  修改手机号结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
};
var modifyUserName=function () {
    var data='?token='+token;
    data+='&userName='+$("*[name='newUserName']").val();
    data+='&createSignature='+$("*[name='newCreateSignature']").val();
    $.ajax({
        type: 'POST',
        url: HOST+'userInfo/modifyUserName'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  修改用户名结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!")
        }
    });
};

var templateContract=function () {
    var data='?token='+token;
    data+='&title='+$("*[name='title']").val();
    data+='&defContractNo='+$("*[name='defContractNo']").val();
    data+='&templateId=' +$("*[name='templateId']").val();
    data+='&useCer='+$("*[name='useCer']").val();
    data+='&param='+$("*[name='param']").val();

    $.ajax({
        type: 'POST',
        url: HOST+'contract/templateContract'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  生成合同结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};
var fileContract=function(){
    var data=new FormData();//'?token='+token;
    data.append('token',token);
    data.append('title',$("*[name='title']").val());
    data.append('defContractNo',$("*[name='defContractNo']").val());
    data.append('useCer',$("*[name='useCer']").val());
    data.append('file',$("*[name='file']")[0].files[0]);
    $.ajax({
        type: 'POST',
        url: HOST+'contract/fileContract',
        data: data,
        processData:false,
        contentType:false,
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  生成合同结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};

var addPartner=function () {
    var data = {
        "contractId" : $("*[name='contractId']").val(),
        "partners" : $("*[name='partners']").val()
    };

    $.ajax({
        type: 'POST',
        url: HOST+'contract/addPartner?token='+token,
        cache : false,
        dataType: 'json',
        data: data,
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  添加合同参与者结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};

var autoSignContract=function () {
    var data='?token='+token;
    data+='&contractId='+$("*[name='contractId']").val();
    data+='&signer='+$("*[name='signer']").val();

    $.ajax({
        type: 'POST',
        url: HOST+'contract/signContract'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  合同自动签署结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};

var ignContract=function () {
    var data='?token='+token;
    $.ajax({
        type: 'POST',
        url: HOST+'contract/signContract'+data,
        cache : false,
        dataType: 'json',
        data:{'contractId':+$("*[name='contractId']").val()},
        success:function(data){
            var info=JSON.stringify(data);
        },
        error:function(){
            alert("error!!!!");
        }
    });
};


var invalid=function () {
    var data='?token='+token;
    data+='&contractId='+$("*[name='contractId']").val();
    $.ajax({
        type: 'POST',
        url: HOST+'contract/invalid'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  合同作废结果：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};
var contractList=function () {
    var data='?token='+token;
    data+='&pageNum='+$("*[name='pageNum']").val();
    data+='&pageSize='+$("*[name='pageSize']").val();
    $.ajax({
        type: 'GET',
        url: HOST+'contract/list'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  合同列表信息：';
            $("*[name='info']").val(info+JSON.stringify(data));
        },
        error:function(){
            alert("error!!!!");
        }
    });
};
var contractDetail=function () {
    var data='?token='+token;
    data+='&contractId='+$("*[name='contractId']").val();

    $.ajax({
        type: 'GET',
        url: HOST+'contract/detail'+data,
        cache : false,
        dataType: 'json',
        data:{},
        success:function(data){
            var info=$("*[name='info']").val()+'\r\n  合同签署状态信息：';
            $("*[name='info']").val(info+JSON.stringify(data));
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

var queryContract=function () {
    //http://sdklink.yunhetong.com/sdk/viewsopen/contract_view_p.html?contractId=1708091046170350&token=TGT-13700-EPFyTllBQ1umwDOIP27MJ14embd7JYA9vDgarvxj54Erw1dgEp-cas01.example.org
    var data='?token='+token;
    data+="&contractId="+$("*[name='contractId']").val();
    window.open(HOST+"viewsopen/contract_view_p.html"+data)
}



//引用的旧版本的js，完成功能调用
var tokenUnableListener = function(obj){ //当token不合法时，SDK会回调此方法
    if(token!=""){
        // getToken(); //重新获取一个token，这样可以避免再次去拿！
        YHT.setToken(token);//重新设置token
        //YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
    }else{
        alert("先获取token！啊");
    }
}

var initTest=function () {
    YHT.init($("*[name='appId']").val(), tokenUnableListener);//必须初始化YHT
}

var signContract=function () {
            YHT.setToken(token);
            var contractId=$("*[name='contractId']").val();
            var backUrl='https://www.baidu.com';
            var noticeParams='123456';
            YHT.queryContract(
                function successFun(url){
                    window.open(url);
                },
                function failFun(data){
                    alert(data);
                },
                contractId,
                backUrl,
                noticeParams
            );

};
//