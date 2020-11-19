// jsonp封装
function isObject(obj){
  if (Object.prototype.toString.call(obj) === '[object Object]'){
      return true;
  }
  return false;
}

function jsonp(options) {
  // 把options.success变成全局函数
  window[options.jsonpCallback] = options.success;

  // 格式化参数
  var data = '';
  if (typeof options.data === 'string') {
    data = options.data;
  }
  if (isObject(options.data)) {
    for (var key in options.data) {
      data += key + '=' + options.data[key] + '&';
    }
    data = data.substring(0, data.length - 1);
  }

  // 创建 script 标签
  var oScript = document.createElement('script');
  // 把数据地址、参数、回调函数拼接赋值给src
  oScript.src = options.url + '?' + data + '&' + options.jsonp + '=' + options.jsonpCallback;
  // 添加到body中
  document.body.appendChild(oScript);
  // 数据加载完成后删除script标签
  oScript.onload = function () {
    document.body.removeChild(oScript);
  }
}


// jsonp 调用
// jsonp({
//   url: 'http://suggestion.baidu.com/su',
//   data: 'wd=' + search.value,
//   jsonp: 'cb',// 根据接口的回调函数名来输入
//   jsonpCallback: 'mycb',// 可以自定义, 全局函数的名字, 随便写啥都行
//   success: function (json) {
//     list.innerHTML = '';
//     json.s.forEach(function (item) {
//       list.innerHTML += '<li>' + item + '</li>';
//     });
//   }
// });


//---------------------------------------------------
//运动函数
function animate(dom, attr_obj, callback) {

  for (var attr in attr_obj) {
    // 获取当前值和目标值
    if (attr === 'opacity') {
      var current = parseInt(getComputedStyle(dom, null)[attr] * 100);
      var target = attr_obj[attr] * 100;
    } else if (attr.indexOf('scroll') !== -1) {
      var current = dom[attr];
      var target = attr_obj[attr];
    } else {
      var current = parseInt(getComputedStyle(dom, null)[attr]);
      var target = attr_obj[attr];
    }
    attr_obj[attr] = {
      'current': current,
      'target': target
    }
  }

  clearInterval(dom.timer);
  dom.timer = setInterval(function () {
    for (var attr in attr_obj) {
      var current = attr_obj[attr].current;
      var target = attr_obj[attr].target;
      // 不断变化的速度
      var speed = (target - current) / 10;
      // 小数计算有误差，容易造成数据丢失 => 取整
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      // 判断到达目的地：剩余运动量 <= 每次的运动量
      if (Math.abs(target - current) <= Math.abs(speed)) {
        if (attr === 'opacity') {
          dom.style[attr] = target / 100;
        } else if (attr.indexOf('scroll') !== -1) {
          dom[attr] = target;
        } else {
          dom.style[attr] = target + 'px';
        }
        // 从attr_obj对象中删除已完成运动的属性
        delete attr_obj[attr];

        // 如果对象中还有其他属性，此时不应该终止计时器
        for (var key in attr_obj) {
          // 有其他属性未完成动画
          return;
        }

        // console.log( '运动结束' );
        clearInterval(dom.timer);//终止计时器

        typeof callback === 'function' ? callback() : '';
      } else {

        attr_obj[attr].current += speed;
        if (attr === 'opacity') {
          dom.style[attr] = attr_obj[attr].current / 100;
        } else if (attr.indexOf('scroll') !== -1) {
          dom[attr] = attr_obj[attr].current;
        } else {
          dom.style[attr] = attr_obj[attr].current + 'px';
        }
      }
    }
  }, 20);
}





//-------------------------------------------------
//设置 cookie
function setCookie(options){
  if (!options.key || !options.val) {
      throw new Error('设置失败，缺少必要参数！');
  }
  options.days = options.days || 0;
  options.domain = options.domain || '';
  options.path = options.path || '';
  if (options.days === 0) {
      document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path;
  } else {
      var d = new Date();
      d.setDate(d.getDate()+options.days);
      document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path + '; expires=' + d;
  }
}


//获取 cookie
function getCookie(key){
  var arr1 = document.cookie.split('; ');
  for (var i = 0, len = arr1.length; i < len; i++){
      var arr2 = arr1[i].split('=');
      if (arr2[0] === key) {
          return unescape(arr2[1]);
      }
  }
  return null;
}


//删除 cookie, == 设置过期
function removeCookie(key){
  setCookie({
      key: key,
      val: '1234',  //随便写, 反正要删的
      days: -5
  });
}
