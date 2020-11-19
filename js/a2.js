a();    //城市定位模块 --顶部
a1();   //顶部我的XX模块
a3();   //头部显示时间的设置
a4();   //实现搜索框的历史记录功能 + 搜索按钮的实现
a6();   //侧边栏的返回懂不功能
a9();   //渲染登录信息
a10();  //退出登录功能 == 删除那条本地存储




c1();   //鼠标滑动缩略图, 跟随滚动的功能
c2();   //Tab栏切换功能
c3();   //小黑框的拖动, 以及显示
c4();   //配送至的滑过显示隐藏的地址框
c5();   //选择型号按钮, 排他思想
c6();   //购物车添加的商品数量只能为数字, 和加减操作模块
c7();   //点击加入购物车, 的一个提示信息
c8();   //接收商品列表的点击的商品信息, 展示对应的图片
//由于要用到上面传回详情页的图片的 code
var obj = c8();   //{c:.., t:..}
c9(obj);   //把商品列表的一些数据信息, 展示到详情页
c10(obj);  //把详情页的商品加入购物车的功能
c11();     //商品详细数据 + 评价 等等, 模块的 Tab切换






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




function c1() {
  var ul = document.querySelector('.main .a1 .box ul');
  var lis = ul.children;
  var box = ul.parentNode;
  //动态设置 UL 的宽度
  ul.style.width = lis.length * lis[0].offsetWidth + 'px';

  //鼠标拖动 ul的位置
  ul.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var x1 = e.clientX;   //获取鼠标相对视口位置
    // var xx = e.offserX;   //获取鼠标在事件源对象的坐标
    var xx = box.scrollLeft;

    ul.addEventListener('mousemove', move);
    function move(e) {
      //1. 得到鼠标按下期间移动的距离
      var x2 = e.clientX;
      var x3 = x2 - x1;
      // console.log(x3);

      //想了1个多小时的结果
      if (x3 < 0) {  //往左滑, 
        x3 = Math.abs(x3);
        box.scrollLeft = xx + x3;
      } else {
        box.scrollLeft = xx - x3;
      }   //俩个判断必须连在一起

      // console.log(x1);
    }
    ul.addEventListener('mouseup', function () {
      ul.removeEventListener('mousemove', move);
    });
  });

}

function c2() {
  var ul = document.querySelector('.main .a1 .box ul');
  var img = document.querySelector('.main .a1>.hh>img');

  ul.addEventListener('click', function (e) {
    var x = e.target;
    if (x.tagName === 'IMG') {
      img.src = x.src;
    }
  });
}

function c3() {
  var img = document.querySelector('.main .a1>.hh>img');
  var imgD = document.querySelector('.main .a1 .da img');
  var x = document.querySelector('.main .a1>.hh>.xiao');
  var da = document.querySelector('.main .a1 .da');
  var hh = document.querySelector('.main .a1>.hh');
  var a1 = hh.parentNode;
  var main = document.querySelector('.main');

  //1. 处理显示隐藏功能
  //2. da里面, 动态显示我们展示的图片
  //3. 鼠标移入确定蒙层盒子的位置 -- 跟随鼠标(动态获取鼠标位置设置盒子位置->鼠标移动事件 -- 设置移动范围)
  //4. 控制大图跟随小图移动

  //-----1
  hh.addEventListener('mouseenter', function () {
    x.style.display = 'block';
    da.style.display = 'block';
    //-----2
    imgD.src = img.src;
    //-----3
    hh.addEventListener('mousemove', function (e) {
      //3.1获取鼠标在, img父容器hh中的位置
      var x1 = a1.offsetLeft + main.offsetLeft;
      var y1 = a1.offsetTop + main.offsetTop;
      var x2 = e.pageX - x1;
      var y2 = e.pageY - y1;

      //小图移动的距离 (为了方便后面的计算)
      var c1 = x2 - x.offsetWidth / 2;
      var c2 = y2 - x.offsetHeight / 2;
      //小图最大移动距离
      var b1 = img.clientWidth - x.clientWidth;
      var b2 = img.clientHeight - x.clientHeight;
      //大图最大移动距离
      var b11 = da.clientWidth - imgD.clientWidth;
      var b22 = da.clientHeight - imgD.clientHeight;

      //3.2 控制蒙层盒子移动的范围 + 确定蒙层盒子最后的一个位置
      if (c1 <= 0) {
        c1 = 0;
      }
      if (c1 >= b1) {
        c1 = b1;
      }

      if (c2 <= 0) {
        c2 = 0;
      }
      if (c2 >= b2) {
        c2 = b2
      }

      x.style.left = c1 + 'px';
      x.style.top = c2 + 'px';

      //-----4
      //公式 == 大图位移/大图最大移动的距离 == 小图位移/小图最大移动的距离 (便于理解)
      //公式 == 大图位移 *小图最大移动的距离 == 小图位移 * 大图最大移动的距离 (便于计算)   
      var xx = b11 * c1 / b1;
      var yy = b22 * c2 / b2;

      imgD.style.left = xx + 'px';
      imgD.style.top = yy + 'px';
    });
  });
  hh.addEventListener('mouseleave', function () {
    x.style.display = 'none';
    da.style.display = 'none';
  });

}

function c4() {
  var a2 = document.querySelector('.main .a2');
  var c2 = document.querySelector('.main .a2 .c2');
  var c3 = document.querySelector('.main .a2 .c3');

  a2.addEventListener('mouseover', function (e) {
    var x = e.target;
    if (x.className === 'c33' || x.className === 'c3' || x.className === 'c333') {
      c3.style.display = 'block';
    }
  });
  a2.addEventListener('mouseout', function (e) {
    var x = e.target;
    if (x.className === 'c33' || x.className === 'c3' || x.className === 'c333') {
      c3.style.display = 'none';
    }
  });
}

function c5() {
  var c4 = document.querySelector('.main .a2 .c4');
  var is = document.querySelectorAll('.main .a2 .c4 i');
  c4.addEventListener('click', function (e) {
    var x = e.target;
    if (x.tagName === 'I') {
      for (var i = 0, len = is.length; i < len; i++) {
        is[i].style.borderColor = '#333333';
        if (is[i].innerHTML === x.innerHTML) {
          x.style.borderColor = '#e1251b';
        }
      }
    }
  });
}

function c6() {
  var ipt = document.querySelector('.main .a2 .c5 input');

  // 控制输入框在输入的时候只能输入数字
  ipt.addEventListener('input', function () {
    this.value = this.value.replace(/[^\d]/g, '');
    if (ipt.value >= 1000) {
      ipt.value = 1000
    }
  });

  //控制加减模块
  var btn2 = document.querySelector('.main .a2 .c5 .btn2');
  var btn3 = document.querySelector('.main .a2 .c5 .btn3');

  btn2.addEventListener('click', function () {
    //1. 获取输入框内容
    if (ipt.value < 1000) {
      ipt.value++;
    }
  });
  btn3.addEventListener('click', function () {

    if (ipt.value > 1) {
      ipt.value--;
      // ipt.value = 1;
    }
  });

}

function c7() {
  //正式项目需要判断一下是否真的添加到购物车啦
  var ipt = document.querySelector('.main .a2 .c5 input');
  var btn = document.querySelector('.main .a2 .c6 button')
  var i = document.querySelector('.main .a2 .c5 span i')
  var span = i.parentNode;


  btn.addEventListener('click', function () {
    i.innerHTML = ipt.value;
    span.style.display = 'block';
    setTimeout(function () {
      span.style.display = 'none';
    }, 1500);
  });

}

function c8() {
  var imgD = document.querySelector('.main .a1 .hh img');
  var imgXs = document.querySelectorAll('.main .a1 .box li img');
  var i = document.querySelector('.main .a2 .c1 i');


  //我们需要先判断是否存在, 商品详情的本地存储, 如果有就展示, 并删除, 没有就是其他入口过来的, 直接不管, 默认就可以了
  if (!localStorage.getItem('zhanshi')) {
    return false;
  }
  //读取要展示的商品数据
  var obj = JSON.parse(localStorage.getItem('zhanshi'));
  imgD.src = obj.img;
  // 动态显示商品的价格
  i.innerHTML = obj.money;
  //循环更改小图的展示
  var num = 0;
  var arr = [];
  for (var k in obj) {
    num++;
    arr.push(k)
  }
  num -= 4;
  // console.log(arr);
  for (var i = 0, len = num; i < len; i++) {
    imgXs[i].src = obj[arr[i]];
    // console.log([i]);
    // console.log(imgXs[i].src);
  }

  //渲染完成之后  决定是否清空本地的一个数据
  // localStorage.removeItem('zhanshi');
  // return obj.code;
  // console.log(obj.title);
  return {
    c: obj.code,
    t: obj.title
  }
}

//根据页面显示的商品, 来动态写入商品得标题
function c9(c) {
  var h3 = document.querySelector('.main .a2 h3');
  //通过code可以知道传过来得是哪张图片, 来展示页面相对应得数据
  // console.log(c);
  if (c.c === 0) {
    h3.innerHTML = '高端, 大气, 上档次, 好看, 耐穿, 帅气舒适的小白鞋';
  }
  if (c.c === 1) {
    h3.innerHTML = '42cm*29cm动漫海报8张 开学生宿舍墙纸神器 二次元周边高清壁纸墙纸壁画贴画游戏周边海报 黄漫老师埃罗芒 一套8张';
  }
  if (c.c !== 0 && c.c !== 1) {
    h3.innerHTML = '由于工作量太大, 该标题以及之后的标题都没写, 或者可以通过数据直接拿过来, 但是列表页的标题太短了不好看, 哈哈哈';
  }
}

function c10(c) {
  //1. 要获取商品的 code + 商品数量  (code已传入)
  //2 由于后面发生的原因, 需要我们自己传入更多的信息, (我们只传入code编号, 而没有与编号对应的 data数据给我们, 没办法啊)
  //3 要获取 --> img.url / code / num / $价格 / 标题
  // console.log(c);
  var ipt = document.querySelector('.main .a2 .c5 input');   //输入框的一个商品数量
  var btn = document.querySelector('.main .a2 .c6 button');   //提交按钮

  btn.addEventListener('click', function () {
    //获取用户的输入数量
    var num = parseInt(ipt.value);

    //判断1 购物车是否存在数据
    if (localStorage.getItem('cc')) {
      var a1 = JSON.parse(localStorage.getItem('cc'));
    } else {
      var a1 = [];
    }
    console.log(a1);

    //判断2 当前商品是否已经存在购物车了
    var hh = false;
    if (a1.length > 0) {
      a1.forEach(function (v, i) {
        if (v.code === c.c) {
          v.num += num;
          hh = true;
          return false;
        }
      });
    }

    //判断3 如果当前商品不存在购物车就添加一条商品信息
    //判断上面代码是否执行了, 如果要在上面判断是不合适的(只有再循环的过程才能知道结果)
    //如果第一条不存在, 我们不能直接添加(因为不知道后面的), 如果第二条存在, 那么第一条又进行的添加的操作

    //获取一些需要传入的属性
    var zhanshi = localStorage.getItem('zhanshi');
    console.log(JSON.parse(zhanshi).title);
    var imgSrc = JSON.parse(zhanshi).img;
    var imgTitle = JSON.parse(zhanshi).title;
    var $my = JSON.parse(zhanshi).money;
    if (!hh) {   //hh==true, 说明上面的代码没有执行
      a1.push({ code: c.c, num: num, img: imgSrc, title:imgTitle,$my});
    }

    //最后4 把跟新过的数据(数组), 放在本地存储(购物车)
    localStorage.setItem('cc', JSON.stringify(a1));
  });
}

function c11() {
  var ul = document.querySelector('.a3 .aa1>ul');
  var lis = ul.children;
  var bs = document.querySelectorAll('.a3 .aa1 .box>div')

  //最普通的一个切换方式
  ul.addEventListener('click', function(e) {
    var x = e.target;

    if(x.tagName === 'LI') {
      for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].num = i;
        lis[i].className = '';
      }
      x.className = 'bck';
      for (var n = 0, len = bs.length; n < len; n++) {
        bs[n].className = 'b'+ (i+1);
        bs[x.num].className = 'b'+ (x.num+1) + ' d1';
      }
    }

  });
}

