/* Bring the Peony into the illustrated collection using its hand-drawn SVG
   artwork. Every path retains its own shape through bud and unfolding stages. */
(function(){
  'use strict';
  window.renderGrowingPeony=function(){return renderIllustratedPeony();};
  window.playGrowingPeony=function(){
    var svg=document.getElementById('bloom'),light=document.getElementById('morningLight');
    // Tuck the heart into the surrounding cup: the former center sat low
    // and right, and its scale made it read as a separate foreground piece.
    var heart=svg.querySelector('.bloom-heart');
    if(heart && !heart.querySelector('.aligned-heart')){
      var aligned=document.createElementNS('http://www.w3.org/2000/svg','g');
      aligned.setAttribute('class','aligned-heart');
      aligned.setAttribute('transform','translate(14.4 26) scale(.88)');
      while(heart.firstChild)aligned.appendChild(heart.firstChild);
      heart.appendChild(aligned);
    }
    var note=document.querySelector('.letter'),identity=document.querySelector('.flower-text'),again=document.getElementById('again'),opener=document.querySelector('.opener');
    svg.setAttribute('aria-label','An illustrated blush peony growing and opening its layered petals in soft morning light');
    svg.style.transform='translateY(-4vh) scale(.82)';
    var tl=REDUCE_MOTION?null:anime.timeline({autoplay:false,easing:'easeInOutSine'});
    window.__peonyTl=tl;window.__flowerTl=tl;
    svg.querySelectorAll('.illustrated-stem path').forEach(function(path){
      if(REDUCE_MOTION){path.style.strokeDashoffset=0;return;}
      var length=path.getTotalLength();path.setAttribute('stroke-dasharray',length);path.style.strokeDashoffset=length;path.style.opacity=0;
      tl.add({targets:path,opacity:[0,1],duration:100},200);
      tl.add({targets:path,strokeDashoffset:[length,0],duration:2650},200);
    });
    svg.querySelectorAll('.illustrated-leaf, .petal-group').forEach(function(group,index){
      group.style.opacity=1;group.style.transform='none';
      if(REDUCE_MOTION)return;
      var leaf=group.classList.contains('illustrated-leaf');
      var origin=(group.style.transformOrigin||'203px 374px').match(/-?\d*\.?\d+/g);
      var ox=+(origin&&origin[0]||203),oy=+(origin&&origin[1]||374);
      var start=leaf?1250+index*230:3000+(index%7)*180;
      group.querySelectorAll('path').forEach(function(path){
        var open=path.getAttribute('d'),n=0;
        var seed=open.replace(/-?\d*\.?\d+/g,function(){return n++%2?oy:ox;});
        n=0;
        var folded=open.replace(/-?\d*\.?\d+/g,function(v){var isY=n++%2;return +( (isY?oy:ox)+(+v-(isY?oy:ox))*(leaf?(isY?.40:.12):(isY?.23:.28)) ).toFixed(3);});
        path.setAttribute('data-open',open);path.setAttribute('d',seed);
        tl.add({targets:path,d:[{value:folded,duration:1250},{value:folded,duration:400},{value:open,duration:leaf?1900:3400}]},start);
      });
      group.querySelectorAll('circle').forEach(function(dot){dot.style.opacity=0;tl.add({targets:dot,opacity:[0,.8],duration:1400},6500);});
    });
    svg.querySelectorAll('linearGradient stop').forEach(function(stop){
      var day=stop.getAttribute('stop-color');if(!/^#[\da-f]{6}$/i.test(day||''))return;
      // Reduce the former saturated photographic palette into dusty pigment.
      var value=parseInt(day.slice(1),16);var rgb=[16,8,0].map(function(s){return(value>>s)&255;});
      var gray=rgb[0]*.3+rgb[1]*.59+rgb[2]*.11;
      day='#'+rgb.map(function(v){return Math.round(v*.76+gray*.24).toString(16).padStart(2,'0');}).join('');
      if(REDUCE_MOTION){stop.setAttribute('stop-color',day);return;}
      tl.add({targets:stop,'stop-color':['#998591',day],duration:5700},1700);
    });
    if(REDUCE_MOTION){light.style.opacity=1;document.body.style.backgroundColor='#5d4d49';opener.style.color='#72595a';[note,identity,again].forEach(function(e){e.style.opacity=1;});showNote(true);return;}
    tl.add({targets:light,opacity:[0,1],duration:6700},500);
    tl.add({targets:document.body,backgroundColor:['#241e25','#5d4d49'],duration:6700},500);
    tl.add({targets:opener,color:['#d8c9c6','#72595a'],duration:5600},900);
    tl.add({targets:note,opacity:[0,1],translateY:[8,0],duration:950},9700);
    tl.add({targets:identity,opacity:[0,1],duration:650},10000);
    tl.add({targets:again,opacity:[0,.78],duration:400},10300);
    // Set before the timeline plays: see growing-botanicals.js for why.
    showNote(true);
    var frame=new URLSearchParams(location.search).get('frame');if(frame!==null)tl.seek(Math.max(0,+frame||0));else tl.play();
  };
}());
