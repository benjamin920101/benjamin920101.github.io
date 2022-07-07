var tmwebUPD =
{
	ajaxUPD_onSuccessCallback : function(resultData, statusType)
	{
		if (resultData.message != undefined && resultData.message != '')
		{
			alert("回傳訊息(ajaxUPD):resultData.message:" + resultData.message);
		}
	},	
	ajaxUPD_onErrorCallback: function(req, statusType, e)
	{
		alert("系統拋出(ajaxUPD) Exception:" + '-' + statusType + '-' + req.responseText + '-' + e);
	},
	ajaxUPD: function(form, event)
	{
		var command = "doUpdateCompatView";
		var dataType = "json";
		var onSuccess = this.ajaxUPD_onSuccessCallback;
		var onError = this.ajaxUPD_onErrorCallback ;
		var url = "../UPDController.do?command=" + command + "&event=" + event;		
		$.ajax(
		{
			url: url,
			dataType : dataType,
			type: "GET",
			async: true,
			success: function(resultData, statusType)
			{
				eval(onSuccess)(resultData, statusType);
				resultData = null;
				statusType = null;
				CollectGarbage();
			},
			error: function(req, statusType, e)
			{
				eval(onError)(req, statusType, e);
				resultData = null;
				statusType = null;
				e = null;
				CollectGarbage();
			}
		});
	},
	dummy: function()
	{}
};

var tmwebUPD2 =
{
	ajaxUPD_onSuccessCallback : function(resultData, statusType)
	{
		if (resultData.message != undefined && resultData.message != '')
		{
			alert("回傳訊息(ajaxUPD):resultData.message:" + resultData.message);
		}
	},	
	ajaxUPD_onErrorCallback: function(req, statusType, e)
	{
		alert("系統拋出(ajaxUPD) Exception:" + '-' + statusType + '-' + req.responseText + '-' + e);
	},
	ajaxUPD: function(form, event)
	{
		var command = "doUpdateCompatView";
		var dataType = "json";
		var onSuccess = this.ajaxUPD_onSuccessCallback;
		var onError = this.ajaxUPD_onErrorCallback ;
		var url = "./UPDController.do?command=" + command + "&event=" + event;		
		$.ajax(
		{
			url: url,
			dataType : dataType,
			type: "GET",
			async: true,
			success: function(resultData, statusType)
			{
				eval(onSuccess)(resultData, statusType);
				resultData = null;
				statusType = null;
				CollectGarbage();
			},
			error: function(req, statusType, e)
			{
				eval(onError)(req, statusType, e);
				resultData = null;
				statusType = null;
				e = null;
				CollectGarbage();
			}
		});
	},
	dummy: function()
	{}
};

var tmweb2 =
{
	ajaxHB_onSuccessCallback : function(resultData, statusType)
	{
		if (resultData.message != undefined && resultData.message != '')
		{
			$("#showMsg").html(resultData.message);	//測試用
		}
		
		if (resultData.redirect != undefined && resultData.redirect != '')
		{
			if (resultData.target != undefined && resultData.target != '')
			{
				eval( "window.parent." + resultData.target + ".location.replace(resultData.redirect)");
			}
			else
				window.location.replace(resultData.redirect);
		}
		if (resultData.script != undefined && resultData.script != ''){
			resultData.script+="window.parent.hbFrame.HBFinish = 'Y';";
			eval(resultData.script);
		}else{
			eval("window.parent.hbFrame.HBFinish = 'Y';");
		}
		
	},
			
	ajaxHB_onErrorCallback: function(req, statusType, e)
	{
		eval("window.parent.hbFrame.HBFinish = 'Y';");
	},

	ajaxHB: function()
	{

		var event = "";
		var command = "doHB";
		var dataType = "json";
		var onSuccess = this.ajaxHB_onSuccessCallback;
		var onError = this.ajaxHB_onErrorCallback ;
		var url = "../HBController.do?command=" + command + "&event=" + event;		

		$.ajax(
		{
			url: url,
			dataType : dataType,
			type: "GET",
			async: true,
			
			success: function(resultData, statusType)
			{
				eval(onSuccess)(resultData, statusType);
				resultData = null;
				statusType = null;
			},
			
			error: function(req, statusType, e)
			{
				eval(onError)(req, statusType, e);
				resultData = null;
				statusType = null;
				e = null;
			}
		});
	

	},
	dummy: function()
	{
	}


};

var tmweb = 
{
	ajaxStateFlow: function(form, event)
	{
		top.codeFrame.tmweb3.ajaxStateFlow(form, event);		
	}
}

var formid;
var eventstr;
var tmwebErrorTimes =0;

var tmweb3 = 
{

	onSuccessCallback : function(resultData, statusType)
	{
		if (resultData.alertmessage != undefined && resultData.alertmessage != '')
		{
			top.showMsg(resultData.message);
			return;
			
		}
		if (resultData.message != undefined && resultData.message != '')
		{
			top.showMsg(resultData.message);
			window.setTimeout(function()
					{
						if (resultData.redirect != undefined && resultData.redirect != '')
						{
							if (resultData.target != undefined && resultData.target != '')
							{
								eval( "window.parent." + resultData.target + ".location.replace(resultData.redirect)");
							}
							else
								window.location.replace(resultData.redirect);
						}
						if (resultData.script != undefined && resultData.script != '')			
							eval(resultData.script);
			},5000);
			return;
		}

		if (resultData.redirect != undefined && resultData.redirect != '')
		{
			if (resultData.target != undefined && resultData.target != '')
			{
				eval( "window.parent." + resultData.target + ".location.replace(resultData.redirect)");
			}
			else
				window.location.replace(resultData.redirect);
		}
	
		if (resultData.script != undefined && resultData.script != '')			
			eval(resultData.script);

		tmwebErrorTimes = 0;
		eventstr=null;
		formid =null;
		
	},
			
	onErrorCallback: function(req, statusType, e)
	{

		  if(tmwebErrorTimes < 3 ){
			  tmwebErrorTimes++;
			  this.ajaxStateFlow(formid, eventstr);
		  }else{
			  tmwebErrorTimes = 0;
			  var time = new Date();
			  var hours = time.getHours();
			  var minutes = time.getMinutes();
			  var seconds = time.getSeconds();
			  var milliseconds = time.getMilliseconds()
			  var clock = hours;
			  clock += ((minutes < 10) ? ":0" : ":") + minutes;
			  clock += ((seconds < 10) ? ":0" : ":") + seconds+"."+milliseconds;
			 
			  if(null != e && null != req){
				  alert(clock+" ;系統拋出(StateFlow) Exception:" + '-' + statusType + '-status=' + req.status + '-readyState=' + req.readyState + '-responseText=' + req.responseText + '-' + +e.name+":"+e.message+"-"+e.description);	
			  }else if( null != e ){
				  alert(clock+" ;系統拋出(StateFlow) Exception:" + '-' + statusType + '-status='  +e.name+":"+e.message+"-"+e.description);
			  }else if( null != req ){
				  alert(clock+" ;系統拋出(StateFlow) Exception:" + '-' + statusType + '-status=' + req.status + '-readyState=' + req.readyState + '-responseText=' + req.responseText );	
			  }else{
				  alert(clock+" ;系統拋出(StateFlow) Exception:" + '-' + statusType );	
			  }

			  if(confirm("是否回到登入首頁？")){
				eval( "window.parent.mainFrameset.rows = '173,*,0,0,0';");
				eval( "top.location.href('http://10.0.1.1/TMWeb/portal/index.jsp');");
			}
					  
		  }
		  
	},

	
    /*  
	 * function: Ajax呼叫StateFlowController
	 * params:
	 *			form: 欲傳送資料所處表單Object
	 * 			option: command(預設為'execute', 正常情況下無須修改), 
	 					event(預設為'', 按鈕動作), 
	 					dataType(預設為'json'), 
	 					onSuccess(成功時處理函式), 
	 					onError(錯誤時處理函式)
	 * return: none
	 */
	ajaxStateFlow: function(form, event)
	{
        eventstr = event;
		formid = form;
		
		var command = "execute" ;	
		var url = "../StateFlowController.do?command=" + command + "&event=" + event;
		var xmlObj = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		try{

			try{
				xmlObj.open("GET", url+"&"+($(form).serialize()), false);	//GET method, Sync
			}catch(e){
				this.onErrorCallback(xmlObj, "error0", e);
			}
	
			try{
				xmlObj.send("");
			}catch(e){
				this.onErrorCallback(xmlObj, "error1", e);
			}
			
			if(xmlObj.readyState==4)
			{
	
				if (xmlObj.status == 200)
				{
					try{
						var res = xmlObj.responseText;
						var result = eval("(" + res + ")");
						this.onSuccessCallback(result, "success");
						result = null;
					}catch(e){
						this.onErrorCallback(xmlObj, "error2", e);
					}
				}
				else 
				{
					this.onErrorCallback(xmlObj, "error3", null);
				}
			}
			else
			{
				this.onErrorCallback(xmlObj, "error4", null);
			}
			xmlObj = null;

		}catch(e){
		      this.onErrorCallback(xmlObj, "error5", e);
		}
	},

	ajaxStateFlowByPost: function(form, event)
	{
        eventstr = event;
		formid = form;
		rtnValue = false;
		
		var command = "execute" ;	
		var url = "../StateFlowController.do?command=" + command + "&event=" + event;
		var xmlObj = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		try{

			try{

				xmlObj.open("POST", url, false);	//POST method, Sync
				xmlObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}catch(e){
				this.onErrorCallback(xmlObj, "error0", e);
			}
	
			try{
				xmlObj.send($(form).serialize());
				
			}catch(e){
				this.onErrorCallback(xmlObj, "error1", e);
			}
			
			if(xmlObj.readyState==4)
			{
	
				if (xmlObj.status == 200)
				{
					try{
						var res = xmlObj.responseText;
						var result = eval("(" + res + ")");
						this.onSuccessCallback(result, "success");
						result = null;
						rtnValue = true;
						
					}catch(e){
						this.onErrorCallback(xmlObj, "error2", e);
					}
				}
				else 
				{
					this.onErrorCallback(xmlObj, "error3", null);
				}
			}
			else
			{
				this.onErrorCallback(xmlObj, "error4", null);
			}
			xmlObj = null;

		}catch(e){
		      this.onErrorCallback(xmlObj, "error5", e);
		}
		
		return rtnValue;
	},

	
	dummy: function()
	{
	}
        
};

/************************************************************************************************/

var MoexJson = new (function()
{
    var useHasOwn = !!{}.hasOwnProperty;
    
    var isDate = function(v){
			return v && typeof v.getFullYear == 'function';
		};
		
		var isArray = function(v){
			return v && typeof v.length == 'number' && typeof v.splice == 'function';
		};

    var pad = function(n) {
        return n < 10 ? "0" + n : n;
    };

    var m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };

    var encodeString = function(s){
        if (/["\\\x00-\x1f]/.test(s)) {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = m[b];
                if(c){
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return '"' + s + '"';
    };

    var encodeArray = function(o){
        var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : EaimJson.encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
    };

    this.encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };

    this.encode = function(o){
        if(typeof o == "undefined" || o === null){
            return "null";
        }else if(isArray(o)){
            return encodeArray(o);
        }else if(isDate(o)){
            return EaimJson.encodeDate(o);
        }else if(typeof o == "string"){
            return encodeString(o);
        }else if(typeof o == "number"){
            return isFinite(o) ? String(o) : "null";
        }else if(typeof o == "boolean"){
            return String(o);
        }else {
            var a = ["{"], b, i, v;
            for (i in o) {
                if(!useHasOwn || o.hasOwnProperty(i)) {
                    v = o[i];
                    switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if(b){
                            a.push(',');
                        }
                        a.push(this.encode(i), ":",
                                v === null ? "null" : this.encode(v));
                        b = true;
                    }
                }
            }
            a.push("}");
            return a.join("");
        }
    };

    this.decode = function(json){
        return eval("(" + json + ')');
    };
})();

/**     
 * 校驗所有輸入域是否含有特殊符號     
 * 所要過濾的符號寫入正規表示式中     
 * 要轉義的字符包括：1.  標點點號 .;:!?
 *                  2.  括號   []()
 *                  3.  大括號 {}
 *                  4.  加號   +
 *                  5.  星號   *
 *                  6.  百分比 % 
 *                  7.  斜槓   \/
 *                  8.  豎線   |
 *                  9.  尖號   ^&
 *                  10. 錢幣   $€
 *                  11. 井號   #@ 
 * 試例：     
 * if(checkAllTextValid(document.forms[0]))     
 *  alert("表單中所有文本框通過校驗！");     
 */

function checkAllTextValid() {
    //記錄含引號的欄位數量      
    var resultTag = 0;
    $("input").each(
    function () {
        var value;
        if ($(this).attr('type') == 'text' || $(this).attr('type') == 'password') {
            value = $(this).attr("value");
            re = /^[a-zA-Z0-9\.\-]+$/;
            if (value!= "" && !re.test(value)) {
                resultTag++;
            }
        }
    });
    //如果含引號的欄位數量 ＝0，則通過
    if (resultTag == 0) return true;
    else {
        alert("輸入欄位中不能含有[]'\")(*(|<>{}$等特殊字元，請重新輸入！");
        return false;
    }
}
