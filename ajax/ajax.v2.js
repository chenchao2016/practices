var ajax = {};
ajax.x = function () {
	if (typeof XMLHttpRequest !== 'undefined') {
		return new XMLHttpRequest();
	}
	var versions = [
	"MSXML2.XmlHttp.6.0",
	"MSXML2.XmlHttp.5.0",
	"MSXML2.XmlHttp.4.0",
	"MSXML2.XmlHttp.3.0",
	"MSXML2.XmlHttp.2.0",
	"Microsoft.XmlHttp"
	];

	var xhr;
	for (var i = 0; i < versions.length; i++) {
		try {
			xhr = new ActiveXObject(versions[i]);
			break;
		} catch (e) {
		}
	}
	return xhr;
};

ajax.send = function (url, method, data, success,fail,async) {
	if (async === undefined) {
		async = true;
	}
	var x = ajax.x();
	x.open(method, url, async);
	x.onreadystatechange = function () {
		if (x.readyState == 4) {
			var status = x.status;
			if (status >= 200 && status < 300) {
				success && success(x.responseText,x.responseXML)
			} else {
				fail && fail(status);
			}
			
		}
	};
	if (method == 'POST') {
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	x.send(data)
};

ajax.get = function (url, data, callback, fail, async) {
	var query = [];
	for (var key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajax.send(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, success, fail, async)
};

ajax.post = function (url, data, callback, fail, async) {
	var query = [];
	for (var key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajax.send(url,'POST', query.join('&'), success, fail, async)
};

//使用方法
//GET
ajax.get('/test.php', {foo: 'bar'}, function(response,xml) {
	//success
},
function(status){
	//fail
});

//POST
ajax.post('/test.php', {foo: 'bar'}, function(response,xml) {
	//succcess

},function(status){
	//fail
	
});
