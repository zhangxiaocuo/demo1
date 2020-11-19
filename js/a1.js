

a();    //城市定位模块 --顶部
a1();   //顶部我的XX模块
a3();   //头部显示时间的设置
a4();   //实现搜索框的历史记录功能 + 搜索按钮的实现
a6();   //侧边栏的返回懂不功能
a9();   //渲染登录信息
a10();  //退出登录功能 == 删除那条本地存储



b1();   //加入购物功能
b2();   //点击商品得时候, 跳转到商品相详情页, 且存储数据到本地, 提供商品详情页得展示, 展示完毕清除数据


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

function a6() {
  var cc = document.querySelector('.cc');
  var html = document.documentElement;
  document.addEventListener('scroll', function (e) {
    if (window.pageYOffset >= 500) {
      cc.style.display = 'block';
    }
    if (window.pageYOffset < 500) {
      cc.style.display = 'none';
    }
  })
  cc.addEventListener('click', function (e) {
    var x = e.target;
    if (x.innerHTML === '顶部') {
      // html.scrollTop = 0;
      animate(html, {
        'scrollTop': 0,
      })
    }
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




function b1() {
  var box = document.querySelector('.list .box');
  var lis = document.querySelectorAll('.list>.box li');
  //1. 由于没有json数据, 我们循环没每个商品对象, 给加入购物车按钮添加编号
  for (var i = 0, len = lis.length; i < len; i++) {
    lis[i].children[3].code = i;
  }

  box.addEventListener('click', function (e) {
    var x = e.target;

    if (x.tagName === 'I') {
      var img = x.previousElementSibling.previousElementSibling.previousElementSibling.children[0];
      var title = x.previousElementSibling.previousElementSibling;
      var $my = x.previousElementSibling;
      console.log($my.innerHTML);
      //--------------把数据存入购物车俩种逻辑情况
      //1. 判断该商品在购物车中有没有, 没有就添加, 有就 num+1, 最后更新本地存储
      //2. 储存商品信息的 key == ss, 值需要二个信息, code + num

      //判断1, 本地是否存储有 ss 的数据, 有就说明存进去数组对象了(获取), 没有就新建一个数组对象
      if (localStorage.getItem('cc')) {
        var a1 = JSON.parse(localStorage.getItem('cc'));
        console.log(66);
      } else {
        var a1 = [];
      }

      //判断2 当前商品是否已经存在购物车(本地数据), 存在数量+1
      //判断思路, 看是否有相同的编号
      var hh = false;
      if (a1.length > 0) {
        a1.forEach(function (v, i) {
          if (v.code === x.code) {
            v.num++;
            hh = true;
            return false;
          }
        });
      }

      //判断3 当前商品不存在购物车中(本地数据), 添加一条数据
      //思考: 怎么知道商品存在呢, 怎么知道上面的代码执行了没呢, 执行了肯定就有重复, 不添加数据了
      //把商品信息存入购物车, 
      if (!hh) {   //hh==true, 说明上面的代码没有执行
        a1.push({ code: x.code, num: 1, img: img.src, title: title.innerHTML, $my:$my.innerHTML});
      }

      //更新本地数据
      localStorage.setItem('cc', JSON.stringify(a1));
    }
    //总结: 加入购物车功能, 经历3个判断, 设置好存储数据的数组, 最后更新到本地存储
  });
}

//用到了 b1 中循环设置的 code 属性, 不用了, 上面是绑定给加入购物车按钮的
function b2() {
  var list = document.querySelector('.list');
  var lis = document.querySelectorAll('.list>.box li');

  //手动设置一个商品编号
  for (var i = 0, len = lis.length; i < len; i++) {
    lis[i].children[0].children[0].code = i;   //正常不这么么写, 先确定哪个元素, 这样效率低

  }

  list.addEventListener('click', function (e) {
    //1. 获取图片的src + 商品介绍图的src + 商品编号
    //2. 由于我们没有数据库给的编号, 所以只能再次, 重 0 开始边遍历赋值一个商品编号, 达到同步效果
    var x = e.target;

    if (x.tagName === 'IMG') {
      console.log(x.code);
      //if语句判断我们要展示的大图是哪个, 然后匹配对应的小图片
      var obj = {};
      if (x.code === 0) {
        obj = {
          // imgD: imgD.src,
          img1: x.src,
          img2: 'http://127.0.0.1:5500/img/goods2.png',
          img3: 'http://127.0.0.1:5500/img/goods3.png',
          img4: 'http://127.0.0.1:5500/img/goods4.png',
          img5: 'http://127.0.0.1:5500/img/goods5.png',
          img6: 'http://127.0.0.1:5500/img/goods6.png',
          img7: 'http://127.0.0.1:5500/img/goods7.png'
        }
      }

      if (x.code === 1) {
        obj = {
          // imgD: imgD.src,
          img1: x.src,
          img2: 'http://127.0.0.1:5500/img/XXwebp (2).png',
          img3: 'http://127.0.0.1:5500/img/XXwebp (3).png',
          img4: 'http://127.0.0.1:5500/img/XXwebp (4).png',
          img5: 'http://127.0.0.1:5500/img/XXwebp (5).png',
          img6: 'http://127.0.0.1:5500/img/XXwebp (6).png',
          img7: 'http://127.0.0.1:5500/img/XXwebp (7).png'
        }
      } 

      if (x.code !==0 && x.code !==1) {
        obj = {
          // imgD: imgD.src,
          img1: x.src,
          img2: 'http://127.0.0.1:5500/img/XXwebp (10).png',
          img3: 'http://127.0.0.1:5500/img/XXwebp (11).png',
          img4: 'http://127.0.0.1:5500/img/XXwebp (12).png',
          img5: 'http://127.0.0.1:5500/img/XXwebp (13).png',
          img6: 'http://127.0.0.1:5500/img/XXwebp (14).png',
          img7: 'http://127.0.0.1:5500/img/XXwebp (15).png'
        }

        console.log(x.code);
      }

      // 获取当前商品的价格
      var span = x.parentNode.nextElementSibling.nextElementSibling;
      console.log(span.innerHTML);
      
      obj.img = x.src;
      obj.code = x.code;
      obj.money = span.innerHTML;
      obj.title = x.parentNode.nextElementSibling.innerHTML;

      //存储了当前商品的图片信息 + 商品编号 + 展示图
      localStorage.setItem('zhanshi', JSON.stringify(obj));
      
    }

  });
}



