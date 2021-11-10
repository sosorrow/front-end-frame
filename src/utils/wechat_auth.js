const jsArray = [
	{
		id: 'oss_zepto_core',
		path: 'https://g.zhuahudong.com/js/zepto.min.js'
	},
	{
		id: 'wechat_core',
		path: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
	}, 
	{
		id: 'oss_common_js',
		path: 'https://g.zhuahudong.com/wechat/js/common.js'
	}, 
	{
		id: 'oss_wechat_js',
		path: 'https://g.zhuahudong.com/wechat/js/wechat.js'
	}];

let Wechat = {
	loaded: 0,
	openidKey: 'zhua_id_hlg',
	openid: null
};

Wechat.init = function(parameters) {
	let arr = jsArray.filter((o) => {
		if (!document.head.querySelector(`#${o.id}`)) {
			let script = document.createElement('script');
			script.onload = () => {
				Wechat.loaded++;
				if (Wechat.loaded === jsArray.length) Wechat.init(parameters);
			}
			script.type = 'text/javascript';
			script.id = o.id;
			script.src = o.path;
			document.head.appendChild(script);
			return false;
		}
		return true;
	})
	
	if (arr.length === jsArray.length) {
		Wechat.verify(() => {
			window.appid = window.title = window.desc = window.link = window.imgUrl = '';
			if (parameters) {
				window.appid = parameters.appid || '';
				window.title = parameters.title || '';
				window.desc = parameters.desc || '';
				window.link = parameters.link || '';
				window.imgUrl = parameters.imgUrl || '';
			}
			
			wechat.getjssdkauth().then((data) => {
				wechat.authstate();
			})
		});
	}
}

Wechat.verify = function(callback) {
	let openid = getCookie(Wechat.openidKey);
	if (openid && openid !== '') {
		Wechat.openid = openid;
		Wechat.autoInject();
	}
	else {
		callback && callback();
		setTimeout(Wechat.verify, 200);
	}
}

Wechat.autoInject = function() {
	let bs = $.ajaxSettings.beforeSend;
	$.ajaxSettings.beforeSend = (xhr, request) => {
		xhr.setRequestHeader('openid', Wechat.openid);
		bs && bs(xhr, request);
	}
}

export default Wechat