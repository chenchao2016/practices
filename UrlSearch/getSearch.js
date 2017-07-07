/*将URL地址键值对字符串转换为对象*/
var url = '?key=value&es6=ecma2015'
var UrlSearch = function(url) {
    var url = url;
    var search = url.substring(url.indexOf('?')+1).split('&');
    var keys = {};
    for(var i in search){
        var separate = search[i].split('=');
        for(var j = 0; j < 2 ;j++){
            keys[separate[0]] = separate[1]
        }
    }
    return keys;
};

UrlSearch(url);