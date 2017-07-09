var ajaxUtil = {
        ajax: function (options) {
            options = options || {};

            /*jsonp 跨域调用*/
            if (options.dataType === 'jsonp') {
                this.jsonp(options);
                return false;
            }

            options.type     = (options.type || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            options.data     = this.formateParams(options.data);
            options.async    = options.async || true;
            var xhr          = null;

            if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE 6 and older
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            /*接收请求*/
            xhr.onreadystatechange = function () {
                try {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            options.success && options.success(xhr.responseText, xhr.responseXML);
                        } else {
                            options.fail && options.fail(xhr.status);
                        }
                    } else {
                    }
                } catch (e) {
                    console.error("Caught Exception : " + e.description)
                }

            };

            /*open 链接 、send发送*/
            if (options.type === 'GET') {
                xhr.open(options.type, options.url + (options.data ? "?" : "") + options.data, options.async);
                xhr.send(null)
            } else if (options.type === 'POST') {
                xhr.open(options.type, options.url, options.async);

                xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
                xhr.send(options.data);
            }

        },

        jsonp        : function (options) {
            options = options || {};

            if (!options.url || !options.callback) {
                throw new Error('参数不合法');
            }

            if(typeof options.data === 'undefined'){
                options.data = {};
            }
            var callbackName = ('jsonp_' + Math.random()).replace('.', '');
            var nodeHead     = document.getElementsByTagName('head')[0];

            options.data[options.callback] = callbackName;
            var params                     = this.formateParams(options.data);
            var nodeScript                 = document.createElement('script');
            nodeHead.appendChild(nodeScript);

            /*本地回调*/
            window[callbackName] = function (json) {
                nodeHead.removeChild(nodeScript);
                clearTimeout(nodeScript.timer);
                window[callbackName] = null;

                options.success && options.success(json);
            };

            /*发送请求*/
            nodeScript.setAttribute('src', options.url + "?" + params);

            /*请求超时处理*/
            if (options.time) {
                nodeScript.timer = setTimeout(function () {
                    window[callbackName] = null;
                    nodeHead.removeChild(nodeScript);
                    options.fail && options.fail({message: 'request timeout'});
                }, options.time);
            }
        },
        formateParams: function (params) {
            var arr = [];
            for (var name in params) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
            }
            /*打版本*/
            arr.push("v=" + (new Date()).getTime());
            return arr.join('&');
        }
    }

    ajaxUtil.ajax({
        url     : "./http.php",
        type    : "GET",
        dataType: 'jsonp',
        /*后台接口返回函数名称*/
        callback: "jsoncallback",
        success : function (text, xml) {
            console.log(text);
        },
        fail    : function (status) {
            console.log(status);
        }
    })