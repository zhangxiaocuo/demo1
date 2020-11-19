

a();    //城市定位模块 --顶部
a1();   //顶部我的XX模块
a3();   //头部显示时间的设置
a4();   //实现搜索框的历史记录功能 + 搜索按钮的实现
a6();   //侧边栏的返回懂不功能
a9();   //渲染登录信息
a10();  //退出登录功能 == 删除那条本地存储


d1();   //点击批量操作 + 撤回的交互功能 + 全选功能
d2();   //用户控制商品数量的按钮, --------前面部分
d3();   //展示本次存储在购物车上的数据 + 删除功能
d4();   //先实现商品数量的加减(注意跟新本地数据), 然后根据这个数量的值来动态展示---总价格
d5();   //结算页面的显示隐藏 + 结算的价格计算 (单间结算 / 批量结算)




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




function d1() {
  var pl = document.querySelector('.main .cz .sp1');
  var ipt = document.querySelector('.main .cz input');
  var sp2 = document.querySelector('.main .cz .sp2');
  var sp3 = document.querySelector('.main .cz .sp3');
  var sp4 = document.querySelector('.main .cz .sp4');
  var sp5 = document.querySelector('.main .cz .sp5');
  var cz = document.querySelector('.main .cz');
  var box = document.querySelector('.main .box');
  var dx = null;

  //点击批量操作
  pl.addEventListener('click', function () {
    dx = document.querySelectorAll('.main .box li input');
    ipt.style.display = 'block';
    sp2.style.display = 'block';
    sp3.style.display = 'block';
    sp4.style.display = 'block';
    sp5.style.display = 'block';
    for (var i = 0, len = dx.length; i < len; i++) {
      dx[i].style.display = 'block';
    }
    pl.style.background = '#cccccc';
  });
  //点击撤回的操作
  sp3.addEventListener('click', function () {
    dx = document.querySelectorAll('.main .box li input');
    ipt.style.display = 'none';
    sp2.style.display = 'none';
    sp3.style.display = 'none';
    sp4.style.display = 'none';
    sp5.style.display = 'none';
    for (var i = 0, len = dx.length; i < len; i++) {
      dx[i].style.display = 'none';
    }
    pl.style.background = '#008c8c';
  });


  //全选要做的事
  cz.addEventListener('click', function (e) {
    var x = e.target;

    //全选要做的事
    if (x.className === 'sp2' || x.tagName === 'INPUT') {
      dx = document.querySelectorAll('.main .box li input');

      //关联全选按钮和提示信息的操作
      if (x.className === 'sp2') {
        if (ipt.checked) {
          ipt.checked = false;
        } else {
          ipt.checked = true;
        }
      }
      //全选控制单选的 checked 属性
      for (var i = 0, len = dx.length; i < len; i++) {
        dx[i].checked = ipt.checked;
      }
    }
  });

  //单选要做的事
  box.addEventListener('click', function (e) {
    var x = e.target;
    dx = document.querySelectorAll('.main .box li input');
    //1. 点击每个单选,
    if (x.tagName === 'INPUT') {
      if (x.checked) {
        for (var i = 0, len = dx.length; i < len; i++) {
          if (!dx[i].checked) {
            return false;
          }
        }
        ipt.checked = x.checked;
      } else {
        ipt.checked = false;
      }
    }
  });

}

function d2() {
  var jian = document.querySelectorAll('.main .box .sp2 .btn1');
  var jia = document.querySelectorAll('.main .box .sp2 .btn2');
  var ipt = document.querySelectorAll('.main .box .sp2 i');

  var ul = document.querySelector('.main .box ul');

  //按钮加减的功能 --> 然后操作购物车商品的 num
  ul.addEventListener('click', function (e) {
    var x = e.target;
    if (x.innerHTML === '+') {
      var a = x.previousElementSibling.previousElementSibling;
      if (parseInt(a.innerHTML) >= 1 && parseInt(a.innerHTML) < 1000) {
        a.innerHTML = parseInt(a.innerHTML) + 1;
      } else {
        return false;
      }
    }
    if (x.innerHTML === '-') {
      var a = x.previousElementSibling;
      if (parseInt(a.innerHTML) >= 2 && parseInt(a.innerHTML) <= 1000) {
        a.innerHTML = a.innerHTML - 1;
      } else {
        return false;
      }
    }

    //操作购物车商品的 num


  });



}

function d3() {
  var lis = null;
  var dele = document.querySelector('.main .cz .sp4');  //批量操作--删除
  var ul = document.querySelector('.main .box ul');  //购物车列表的父元素

  //1. 获取购物车数据
  if (localStorage.getItem('cc')) {
    var arr = JSON.parse(localStorage.getItem('cc'));

    //2. 来吧展示
    var str = ``;
    arr.forEach(function (v, i) {
      str += `<li>
    <img src=${v.img} alt="">
    <h3> ${v.title} </h3>
    
    <span class="sp1">
      价格: <i> ${v.$my * v.num}</i> 元
    </span>
    <span class="sp2">
      数量: <i>${v.num}</i>件
      <button class="btn1">-</button>
      <button class="btn2">+</button>
    </span>
    <span class="sp3" c="${v.code}">
      删除
    </span>
    <span class="sp4">
      购买
    </span>
    <input type="checkbox" style="display: none;">
  </li>`
    });
    ul.innerHTML = str;
  }

  //功能实现 --移除功能 -- 点击事件 (删除单个商品 + 全选删除)
  //1 删除单个的功能实现
  ul.addEventListener('click', function (e) {
    var x = e.target
    if (x.className === 'sp3') {
      //删除当前删除按钮的所在的 li元素
      ul.removeChild(x.parentNode);
      //更新购物车真实数据
      //1. 获取要删除的商品编号
      var c = x.getAttribute('c');
      //2. 循环数据数组, 找到该 code 所对应的对象, 删除掉
      arr.forEach(function (v, i) {
        if (v.code == c) {
          arr.splice(i, 1);
        }
      });
      //3. 跟新实际数据
      if (arr.length > 0) {
        localStorage.setItem('cc', JSON.stringify(arr));
      } else {
        localStorage.removeItem('cc');
        var str1 = '<span>快去选购商品吧!</span>';
        ul.innerHTML = str1;
      }
    }
  });


  // 全选删除的功能---注意(俩个数组找相同值, 需要循环嵌套)
  dele.addEventListener('click', function () {
    lis = document.querySelectorAll('.main .box li');  //所有的li元素

    lis.forEach(function (v, i) {
      if (lis[i].children[5].checked) {
        //1. 删除这些商品的页面元素
        ul.removeChild(lis[i]);
        //2. 删除这些商品的实际数据
        arr.forEach(function (v, i) {
          lis.forEach(function (v1, i1) {
            if (v.code == lis[i1].children[4].getAttribute('c')) {
              arr.splice(i, 1);
            }
          });
        });

      }
    });

    //跟新本地数据
    if (arr.length > 0) {
      localStorage.setItem('cc', JSON.stringify(arr));
    } else {
      localStorage.removeItem('cc');
      var str1 = '<span>快去选购商品吧!</span>';
      ul.innerHTML = str1;
    }
  });



}

function d4() {
  //操作加减, 首先就说明, 是最少有一件商品的
  var ul = document.querySelector('.main .box ul');
  var lis = ul.children;
  var num = 0;
  var ele = 0;
  // var $my = document.querySelector()
  var arr = JSON.parse(localStorage.getItem('cc'));
  console.log(arr);

  ul.addEventListener('click', function (e) {
    var x = e.target;
    if (x.innerHTML === '+') {
      num = parseInt(x.previousElementSibling.previousElementSibling.innerHTML);
      ele = parseInt(x.parentNode.nextElementSibling.getAttribute('c'));
      arr.forEach(function (v, i) {
        if (v.code === ele) {
          arr[i].num = num;
          x.parentNode.previousElementSibling.children[0].innerHTML = parseInt(v.$my) + parseInt(x.parentNode.previousElementSibling.children[0].innerHTML);
        }
      });
      //更新把现在的数据跟新到本地存储, 由于上面也有 UL 的点击事件, 写在外面会造成冲突
      localStorage.setItem('cc', JSON.stringify(arr));
    }

    if (x.innerHTML === '-') {
      num = parseInt(x.previousElementSibling.innerHTML);
      ele = parseInt(x.parentNode.nextElementSibling.getAttribute('c'));
      arr.forEach(function (v, i) {
        if (v.code === ele) {
          arr[i].num = num;   //用来修改数组 --> 更新本地数据的
          if (num > 1) {
            x.parentNode.previousElementSibling.children[0].innerHTML = parseInt(x.parentNode.previousElementSibling.children[0].innerHTML) - parseInt(v.$my);
          }
          if (num === 1) {
            x.parentNode.previousElementSibling.children[0].innerHTML = parseInt(v.$my);
          }
        }
      });
      //更新把现在的数据跟新到本地存储, 由于上面也有 UL 的点击事件, 写在外面会造成冲突
      localStorage.setItem('cc', JSON.stringify(arr));
    }
  });


}

function d5() {
  var sp5 = document.querySelector('.main .cz .sp5');   //购买选中按钮
  var box1 = document.querySelector('.main .box .box1');  //蒙层半透明盒子
  var goumai = document.querySelector('.main .box .jiage');  //购买结算的弹窗
  var xx = document.querySelector('.main .box .jiage .dele');  //关闭购买弹窗 按钮
  var ul = document.querySelector('.main .box ul');
  var lis = [];
  var a1 = document.querySelector('.main .box .jiage span i');   //要提示用户的总价格标签

  //批量购买功能
  sp5.addEventListener('click', function () {
    box1.style.display = 'block';
    goumai.style.display = 'block';

    //设置显示的消费总价格
    //获取当前选中的商品 --> 获取当前商品的总价格
    lis = ul.children;
    var num = 0;
    for (var i = 0, len = lis.length; i < len; i++) {
      if (lis[i].children[6].checked) {
        num += parseInt(lis[i].children[2].children[0].innerHTML);
      }
    }
    if (num === 0) {  //如果没有选中商品, 就不会弹出购买框
      box1.style.display = 'none';
      goumai.style.display = 'none';
    }
    a1.innerHTML = num;
  });

  //点击单个购买
  ul.addEventListener('click', function (e) {
    var x = e.target;
    if (x.className === 'sp4') {
      box1.style.display = 'block';
      goumai.style.display = 'block';

      //设置显示的消费总价格
      a1.innerHTML = x.parentNode.children[2].children[0].innerHTML;
    }
  });

  //关闭购买弹窗
  xx.addEventListener('click', function () {
    box1.style.display = 'none';
    goumai.style.display = 'none';
  });

}
