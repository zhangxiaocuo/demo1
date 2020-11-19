




a51();  //聚焦时边框颜色加深
a52();  //注册按钮, 把帐号信息存储到本地, 



function a51() {
  var box = document.querySelector('.box');
  var ds = document.querySelectorAll('.box div');

  box.addEventListener('click', function (e) {
    var x = e.target;
    if (x.tagName === 'INPUT') {
      for (var i = 0, len = ds.length; i < len; i++) {
        ds[i].style.borderColor = '#cccccc';
      }
      x.parentNode.style.borderColor = '#333333';
    }
  });
}

function a52() {
  var btn = document.querySelector('.box>a');
  var zh = null;
  var pass = null;

  btn.addEventListener('click', function () {
     //提交信息到本地存储
     zh = document.querySelector('.box .a2 input');
     pass = document.querySelector('.box .a3 input');

     //获取原来的账户信息
    if (localStorage.getItem('ps')) {
      var arr = JSON.parse(localStorage.getItem('ps'));
    }else{
      var arr = [];
    }

    //把本次的数据提交到这个数组里面
    if (zh.value !== '' && pass.value !== '') {

      arr.push({zh:zh.value, ps: pass.value});

      localStorage.setItem('ps', JSON.stringify(arr));
      zh.value = '';
      pass.value = '';
    }
  });
}