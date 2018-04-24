$imgs = $('div>img');   // Imgs-Array
let length  = $imgs.length;
let index = 0; // 图片的索引从 0 开始
let timer;

init();  //  初始化图片状态
runSlide();  // 开始轮播
listenToUser();  // 滑入停止轮播 滑出继续



//  工具函数
function runSlide() {
  timer = setInterval(()=> {
    makeLeave(getImg(index)).one('transitionend', (e)=> {
      makeEnter($(e.currentTarget));
    });
    makeCurrent(getImg(index+1));
    index++;  
  },2000)
}

function listenToUser() {
  $('.images').on('mouseenter', (e)=> {
    window.clearInterval(timer);
  })
  $('.images').on('mouseleave', ()=> {
    runSlide();
  })
}

function getImg(index) {
  let n = getIndex(index);
  return $imgs.eq(n);
}
function init() {
  $imgs.eq(0).addClass('current').siblings().addClass('enter');
}
function makeCurrent($node){
  return $node.removeClass('enter').addClass('current');
}
function makeLeave($node){
  return $node.removeClass('current').addClass('leave');
}
function makeEnter($node){
  return $node.removeClass('leave').addClass('enter');
}
function getIndex(index) {
    return index % length;
}





/**** 方法2 **********/

/*
let n = 1
setInterval(()=> 
  $(`div>img:nth-child(${getN(n)})`).removeClass('current').addClass('leave').one('transitionend', (e)=> {
     $(e.currentTarget).removeClass('leave').addClass('enter');
  })
  $(`div>img:nth-child(${getN(n+1)})`).removeClass('enter').addClass('current');
  n++;
}, 3000)

function getN(n) {
  n = n % length;
  if (n===0) {
    return length;
  }

  return n;
}
*/

