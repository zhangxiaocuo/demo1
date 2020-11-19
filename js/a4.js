


a41();  //Tab切换功能
a42();  //





function a41() {
  var x1 = document.querySelector('.box .b1 .x1');
  var x2 = document.querySelector('.box .b1 .x2');
  var x3 = document.querySelector('.box .b1 .x3');

  x1.addEventListener('click', function (e) {
    var x = e.target;
    for (var i = 0, len = x1.children.length; i < len; i++) {
      x1.children[i].code = i;
      x1.children[i].className = '';
    }
    if (x.tagName === 'SPAN') {
      x.className = 'sele'
    }

    if (x.code == 0) {
      x2.style.display = 'block';
      x3.style.display = 'none';
    }
    if (x.code == 1) {
      x3.style.display = 'block';
      x2.style.display = 'none';
    }
  });
}

function a42() {
  btn = document.querySelector('.box .b1 .x3 .a3');
  var zh = null;
  var ps = null;

  btn.addEventListener('click', function () {
    zh = document.querySelector('.box .b1 .x3 .a1 input');
    ps = document.querySelector('.box .b1 .x3 .a2 input');

    //获取服务端数据
    var arr = JSON.parse(localStorage.getItem('ps'));
    console.log(arr);


    if (zh.value && ps.value) {   //判断输入框是否有内容
      //判断是否存在输入的帐号
      var num = 0;
      arr.forEach(function (v, i) {
        if (v.zh === zh.value && v.ps === ps.value) {
          console.log('恭喜你登录成功');
          //1 登录成功了该干啥: 跳转页面 -- 
          // window.open('../index.html','_self',);
          alert('恭喜你登录成功');
          //2 传入本地一个, 当前登录的用户信息, 告诉cookie 你大爷我上线了,
          localStorage.setItem('zh', v.zh);
          return false;
        }
        if (v.zh === zh.value && v.ps !== ps.value) {
          alert('密码输入有误');
          return false;
        }
        if (v.zh !== zh.value) {  //通过 num++判断执行的次数 --> 得知是不是所有帐号都不匹配
          num++;
        }
      });
      if (num === arr.length) {
        alert('不存在该账号');
      }
    } else{
      alert('请输入帐号和密码');
    }

  });
}