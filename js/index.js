

a();    //城市定位模块 --顶部
a1();   //顶部我的XX模块
a2();   //中间轮播图插件的使用
a3();   //头部显示时间的设置
a4();   //实现搜索框的历史记录功能 + 搜索按钮的实现
a5();   //请求天气预报接口
a6();   //侧边栏的返回懂不功能
a7();   //倒计时操作, 正在秒杀
a8();   //图片无缝滚动
a9();   //读取当前登录账号, 把账号名渲染在页面
a10();  //退出登录功能 == 删除那条本地存储




function a() {
  var a = document.querySelector('.top>.w>.a');
  var h3 = document.querySelector('.top .a h3');
  var ul = document.querySelector('.top .a ul');

  // 鼠标滑入
  a.addEventListener('mouseenter', function () {
    ul.style.display = 'block';
    h3.style.borderColor = '#cccccc';
    h3.style.borderBottom = 'solid #ffffff 1px'
    a.style.background = '#ffffff';
  });
  //鼠标滑出
  a.addEventListener('mouseleave', function () {
    ul.style.display = 'none';
    h3.style.borderColor = '#e3e4e5';
    h3.style.borderBottom = 'none'
    a.style.background = '';
  });

  //城市切换功能
  ul.addEventListener('click', function (e) {
    var x = e.target;
    if (x.tagName === 'LI') {
      h3.innerHTML = x.innerHTML;
      localStorage.setItem('city', x.innerHTML);   //设置当前浏览器用户所在的一个城市 == ctty, value
    }
  });

  //进入页面就渲染你这个用户设置的一个位置, 实现根据本地数据渲染页面
  if (localStorage.getItem('city')) {
    h3.innerHTML = localStorage.getItem('city');
  }
}

function a1() {
  // 获取元素
  var wd = document.querySelector('.top .b .wdxx');
  var lixx = document.querySelector('.top .b .wdxx .lixx');
  // 鼠标移入
  wd.addEventListener('mouseenter', function () {
    lixx.style.display = 'block';
  });
  //鼠标移出
  wd.addEventListener('mouseleave', function () {
    lixx.style.display = 'none';
  });
}

function a2() {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,    //点击分页器控制图片切换
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

function a3() {
  var time = document.querySelector('header>.w>.time');

  //获取当前时间
  var date = new Date();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dates = date.getDate();
  var day = date.getDay();
  var days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  month = month < 10 ? "0" + month : month;
  dates = dates < 10 ? "0" + dates : dates;

  time.innerHTML = `<span>
  ${year}年${month}月${dates}日 ${days[day]}
  </span>`;
}

function a4() {
  var ipt = document.querySelector('header .ipt input');
  var ul = document.querySelector('header .ipt ul');
  var btn = document.querySelector('header .ipt>button');

  ipt.addEventListener('focus', function () {
    ul.style.display = 'block';

    //判断1 如果有数据就展示数据
    if (localStorage.getItem('ss')) {
      var hh = localStorage.getItem('ss').split(',');
      hh.forEach(function (v, i) {
        if (v === '') {
          hh.splice(i, i)
        }
      });
      // console.log(hh.length);
      if (hh.length >= 5) {
        hh.splice(5);
      }
      // console.log(hh);
      var str = '';
      hh.forEach(function (v, i) {
        str += ` <li>
        <b>${v}</b> <i>删除</i>
      </li>`;
      });
      ul.children[1].innerHTML = str;
      //更新本地数据
      localStorage.setItem('ss', hh);
    } else {
      ul.children[1].innerHTML = `<p>您没有浏览记录, 或已清空</p>`;
    }
  });

  // 储存失去焦点的数据记录, 更新本地数据
  ipt.addEventListener('blur', function () {
    //储存提交过的数据, 点击搜索就提交一次 (且只保留5条记录)
    // console.log(localStorage.getItem('ss'));
    var ssArr = [];
    if (ipt.value) {
      ssArr.push(ipt.value);
    } else {
      return false;
    }
    var hh = ssArr.concat(localStorage.getItem('ss'));
    localStorage.setItem('ss', hh);
    ipt.value = '';
  });

  ipt.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
      ipt.blur();
      ul.style.display = 'none';
    }
  });

  //删除历史记录的操作, 切记还要删除本地数据
  ul.addEventListener('click', function (e) {
    var x = e.target;
    if (x.innerHTML === '删除') {

      //1. 删除当前的li
      ul.children[1].removeChild(x.parentNode);
      //2. 删除当前li 的本地数据
      //获取当前li 的索引
      var hh = localStorage.getItem('ss').split(",");
      hh.forEach(function (v, i) {
        if (v === x.previousElementSibling.innerHTML) {
          if (i === 0) {
            hh.shift();
          }
          hh.splice(i, i);
        }
      });

      if (hh.length === 0) {
        ul.children[1].innerHTML = `<p>您没有浏览记录, 或已清空</p>`;
        localStorage.removeItem('ss');
        return false;
      }
      //把删除后的数据, 更新到本存储
      localStorage.setItem('ss', hh);
    }

    if (x.innerHTML === '清空记录') {
      localStorage.removeItem('ss');
      ul.style.display = 'none';
    }

  });

  //出现了, 失去焦点就关闭 ul的情况, 所以改变思路, 鼠标移出在隐藏
  ul.addEventListener('mouseleave', function () {
    ul.style.display = 'none';
  });
  btn.addEventListener('click', function () {
    ul.style.display = 'none';
  });
}

function a5() {
  var is = document.querySelectorAll('.main .right .r1 i');
  var cc = localStorage.getItem('city');
  // console.log(is);
  jsonp({
    url: 'https://query.asilu.com/weather/baidu',
    data: {
      city: cc,
    },
    jsonp: 'callback',// 根据接口的回调函数名来输入
    jsonpCallback: 'mycb',// 可以自定义, 全局函数的名字, 随便写啥都行
    success: function (json) {
      console.log(json);
      var date0 = json.weather[1].date;
      var week0 = json.weather[1].weather;
      is[0].innerHTML = date0 + ' <br> ' + week0 + ' <br> ';
      // 不写该功能了, 通过判断天气字符串, 来插入对应的图片, 简单
      // switch (wea0) {
      //   case '多云转晴':

      //     break;
      // }

      var date1 = json.weather[2].date;
      var week1 = json.weather[2].weather;
      is[1].innerHTML = date1 + ' <br> ' + week1 + ' <br> ';

      var date2 = json.weather[3].date;
      var week2 = json.weather[3].weather;
      is[2].innerHTML = date2 + ' <br> ' + week2 + ' <br> ';

      // console.log(date0 + week0);
      // json.s.forEach(function (item) {
      //   list.innerHTML += '<li>' + item + '</li>';
      // });
    }
  });
}

function a6() {
  var cc = document.querySelector('.cc');
  var html = document.documentElement;
  document.addEventListener('scroll', function(e) {
    if (window.pageYOffset >= 500) {
      cc.style.display = 'block';
    }
    if (window.pageYOffset < 500) {
      cc.style.display = 'none';
    }
  })
  cc.addEventListener('click', function(e) {
    var x = e.target;
    if (x.innerHTML ==='顶部') {
      // html.scrollTop = 0;
      animate(html, {
        'scrollTop': 0,
      })
    }
  });
}

function a7() {
  //获取我们的倒计时要显示的位置
  var i = document.querySelector('.x1 .l1>i');

  //1 获取一个指定的时间
  countDown('2020-12-13 15:01:00')
  var hh = setInterval(function() {
    countDown('2020-12-13 15:01:00')
  },1000)

  // 获取倒计时的封装
  function countDown(time){
    var nowTime = +new Date();  //当前时间戳
    var inputTime = +new Date(time);  //指定日期的时间戳
    var times = (inputTime-nowTime) / 1000;  //当前时间到指定时间的秒数

    var d = parseInt(times / 60 / 60 / 24);  //表示剩余的天数
    d = d < 10 ? "0" + d : d;
    var h = parseInt(times / 60 / 60 % 24);  //总秒数 / 60 (==总分钟数) / 60 (==总小时数) % 24 
    h = h < 10 ? "0" + h : h;
    var m = parseInt(times / 60 % 60);  //对应的分钟
    m = m < 10 ? "0" + m : m;
    var s = parseInt(times % 60);   //对应的秒
    s = s < 10 ? "0" + s : s;

    i.innerHTML = d + " 天 " + h + " 时 " + m + " 分 " + s + " 秒"; 
    if (d+h+m+s <= 0) {
      i.innerHTML = '秒杀开始啦';
      clearInterval(hh);
    }
  }
 
}

function a8() {
  var a = document.querySelector('.x1>.l2>.a');
  var l2 = a.parentNode;
  var time;

  time = setInterval(function() {
    l2.scrollLeft++
    l2.scrollLeft++
    // console.log(l2.scrollLeft);
  },20);
  l2.addEventListener('scroll', function() {
    if (l2.scrollLeft >= 1200) {
      l2.scrollLeft = 0;
    }
  });

  a.addEventListener('mouseenter', function() {
    clearInterval(time);
  });
  a.addEventListener('mouseleave', function() {
    time = setInterval(function() {
      l2.scrollLeft++
      l2.scrollLeft++
      // console.log(l2.scrollLeft);
    },20);
  });
}

function a9() {
  var li1 = document.querySelector('.top .w .b .li1');

  if (localStorage.getItem('zh')) {
    li1.innerHTML = `<a href="javascript:;" style="color: #e1251b;">
    ${localStorage.getItem('zh')}
    </a>`
  }
 
}

function a10() {
  var tc = document.querySelector('.top .w .b .wdxx .lixx .s7');
  
  tc.addEventListener('click', function() {
    localStorage.removeItem('zh');
    //并且刷新页面
    location.reload();
  });
}








