
let current = 0;
let $buttons = $('#buttons')
let len = $('#buttons>span').length
let timer;
$(images).css({
  'transform': 'translateX(-920px)'
})

makeFakeSlide();
eventBindings()
autoSlide();

function autoSlide() {
  timer = setInterval(()=>{
    goToSlide(current+1);
  }
    ,3000)
  $('#windows').on('mouseenter', ()=> {
    window.clearInterval(timer)
  })
  $('#windows').on('mouseleave', ()=> {
    timer = setInterval(()=>{
      goToSlide(current+1);
    }
      ,3000)
  })
}

$(prev).on('click', ()=>{
  goToSlide(current-1);
});
$(next).on('click', ()=> {
  goToSlide(current+1);
})

function eventBindings() {
  $buttons.on('click','span', (e)=>{
    let $button = $(e.currentTarget);
    $button.addClass('active').siblings('.active').removeClass('active');
    let index = $button.index();
    goToSlide(index);
  })
}
function makeFakeSlide() {
  let $imgs = $('#images>img');
  let first = $imgs.eq(0).clone(true);
  let last  =  $imgs.eq($imgs.length-1).clone(true);
  $(images).prepend(last);
  $(images).append(first);
}
function goToSlide(index) {
  if (index < 0) {
    index = 3
  }
  index = index % 4
  $('#buttons>span').eq(index).addClass('active').siblings('.active').removeClass('active')
  if (index===len-1 && current===0) {
    $(images).css({
      'transform': `translateX(0px)`
    }).one('transitionend', (e)=>{
      $(images).hide().offset()
      $(images).css({
        'transform': `translateX(${-920*(index+1)}px)`
      }).show();
    })
  } else if (index===0 && current===len-1) {
    console.log(1);
    $(images).css({
      'transform': `translateX(${-920*(len+1)}px)`
    }).one('transitionend', (e)=>{
      $(images).hide().offset()
      $(images).css({
        'transform': `translateX(-920px)`
      }).show();
    })

  }else {
    $(images).css({
      'transform': `translateX(${-920*(index+1)}px)`
    })
  }
  current = index;
}







