/**
 * Created by chenchao on 2016/9/1.
 */
var cookieUtil = {
    /*cookie名称；cookie值；cookie过期时间，按照天数计算；cookie文档路径；cookie文档域名；是否只通过https传输*/
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' +
            encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ';expires=' + expires.toGMTString();
        }
        if (path) {
            cookieText += ';path=' + path;
        }
        if (domain) {
            cookieText += ';domain=' + domain;
        }
        if (secure) {
            cookieText += ';secure';
        }
        document.cookie = cookieText;
    },
    get: function (name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue;
    },

    unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), domain, path)
    }
}
function setCookieDate(day) {
    /*按照国际时间标准 UTC*/
    var date = null;
    if (typeof day == 'number' && day > 0) {
        date = new Date();
        date.setDate(date.getDate() + day);
    } else {
        throw new Error('日期格式错误!')
    }
    return date;
}

cookieUtil.set('email','126.com',setCookieDate(7));
