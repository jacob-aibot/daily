/* Orchid-only artwork and choreography. Geometry grows from attached buds;
   the light changes the SVG pigment as well as the surrounding canvas. */
(function(){
  'use strict';
  var previousRender=window.renderBotanicalHero,previousPlay=window.playBotanicalHero;
  var markup,uid;
  function curve(d,width,at,duration,color){
    markup.push('<path class="orchid-line" d="'+d+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" data-at="'+at+'" data-duration="'+duration+'"/>');
  }
  function shape(d,bud,fill,at,opening,details){
    var id='orchid-shape-'+uid++;
    markup.push('<path id="'+id+'" class="orchid-organ" d="'+d+'" data-open="'+d+'" data-bud="'+bud+'" data-at="'+at+'" data-opening="'+opening+'" fill="'+fill+'" stroke="#eed7c4" stroke-opacity=".23" stroke-width=".7"/>');
    if(details){
      markup.push('<clipPath id="clip-'+id+'"><use href="#'+id+'" xlink:href="#'+id+'"/></clipPath><g clip-path="url(#clip-'+id+')" class="orchid-detail" data-at="'+(opening+450)+'" opacity=".35">'+details+'</g>');
    }
  }
  var bud='M 0 18 C -23 12 -28 -8 -20 -30 C -15 -47 -3 -53 5 -51 C 24 -44 30 -23 24 -6 C 20 7 10 15 0 18 Z';
  function blossom(x,y,s,angle,at){
    markup.push('<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+s+')">');
    var forms=[
      'M 0 9 C -19 -7 -27 -42 -12 -79 C -5 -93 1 -101 7 -103 C 27 -83 34 -53 21 -27 C 16 -9 7 3 0 9 Z',
      'M 0 9 C 9 19 29 64 62 75 C 68 65 64 41 55 29 C 38 6 20 0 8 1 C 3 2 1 6 0 9 Z',
      'M 0 9 C -11 20 -32 62 -64 69 C -67 50 -58 29 -46 20 C -28 3 -13 0 -5 3 C -2 4 -1 7 0 9 Z',
      'M 0 9 C -24 19 -78 6 -87 -31 C -96 -62 -80 -83 -59 -78 C -28 -83 -15 -50 -10 -29 C -6 -11 -2 2 0 9 Z',
      'M 0 9 C 23 19 73 13 88 -17 C 105 -51 88 -74 68 -74 C 38 -81 18 -57 12 -33 C 7 -15 1 3 0 9 Z'
    ];
    forms.forEach(function(d,i){
      var veins='<path d="M 0 7 Q '+(i===3?-40:38)+' -3 '+(i===3?-78:82)+' -39 M 0 7 Q '+(i===3?-25:29)+' -19 '+(i===3?-59:66)+' -66 M 0 7 Q '+(i===3?-34:35)+' 10 '+(i===3?-70:73)+' -11" fill="none" stroke="#a36e86" stroke-width=".8"/>';
      shape(d,bud,i<3?'url(#orchidRecess)':'url(#orchidFace)',at,at+1700+i*155,i>2?veins:'');
    });
    // Rolled side lobes and pendant labellum give a Phalaenopsis its identity.
    var foldedLip=bud.replace(/-?\d*\.?\d+/g,function(v){return +v*.08;});
    shape('M 0 12 C -9 6 -30 3 -28 22 C -27 37 -11 32 -8 39 C -2 52 13 49 18 36 C 38 24 27 5 13 12 Z',foldedLip,'url(#orchidLip)',at+1300,at+2350);
    shape('M 0 12 C -11 12 -17 23 -9 31 C -5 27 -5 23 0 25 C 5 22 10 28 14 29 C 21 20 12 9 0 12 Z',foldedLip,'url(#orchidThroat)',at+1450,at+2600);
    markup.push('</g>');
  }
  function render(){
    uid=0;
    markup=['<defs><linearGradient id="orchidFace" x1="0" y1="0" x2=".85" y2="1"><stop class="orchid-pigment" stop-color="#c4b1b8" data-night="#c4b1b8" data-day="#f2ddc9"/><stop offset=".43" class="orchid-pigment" stop-color="#b99aa9" data-night="#b99aa9" data-day="#dfb5b6"/><stop offset="1" stop-color="#af7b94"/></linearGradient><linearGradient id="orchidRecess" x1="0" y1="0" x2="1" y2="1"><stop class="orchid-pigment" stop-color="#b29bab" data-night="#b29bab" data-day="#e7c9c1"/><stop offset="1" stop-color="#946b87"/></linearGradient><linearGradient id="orchidLip" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#deb0b3"/><stop offset=".4" stop-color="#a75c80"/><stop offset="1" stop-color="#653951"/></linearGradient><linearGradient id="orchidThroat"><stop stop-color="#f0d8a4"/><stop offset=".55" stop-color="#c39b67"/><stop offset="1" stop-color="#f5d9be"/></linearGradient><linearGradient id="orchidLeaf" x1="0" y1="0" x2=".7" y2="1"><stop class="orchid-pigment" stop-color="#697a6d" data-night="#697a6d" data-day="#a5af89"/><stop offset=".36" stop-color="#6f846a"/><stop offset="1" stop-color="#354f42"/></linearGradient></defs>'];
    curve('M 171 688 C 185 580 156 440 197 305 C 220 223 259 177 318 168',5.3,200,3100,'#788976');
    curve('M 179 434 C 151 403 124 376 96 366',2.8,1750,1400,'#788976');
    curve('M 192 324 C 231 336 262 321 287 310',2.6,2050,1450,'#788976');
    var leaves=[
      ['M 0 0 C -34 6 -120 -10 -129 -53 C -133 -72 -103 -78 -72 -57 C -37 -38 -18 -11 0 0 C 0 0 0 0 0 0 Z',171,641,0,1400],
      ['M 0 0 C 31 -4 128 -46 131 -90 C 130 -111 96 -99 69 -72 C 31 -36 12 -9 0 0 C 0 0 0 0 0 0 Z',172,624,0,1750],
      ['M 0 0 C -16 -17 -45 -80 -29 -127 C -17 -148 8 -107 7 -71 C 7 -38 1 -12 0 0 C 0 0 0 0 0 0 Z',171,628,-13,2050]
    ];
    leaves.forEach(function(l){markup.push('<g transform="translate('+l[1]+' '+l[2]+') rotate('+l[3]+')">');var narrow=l[0].replace(/-?\d*\.?\d+/g,function(v){return +v*.1;});shape(l[0],narrow,'url(#orchidLeaf)',l[4],l[4]+900,'<path d="M 0 0 Q -46 -26 -119 -60 M 0 0 Q 59 -38 119 -88 M 0 0 Q -17 -57 -26 -119" fill="none" stroke="#ccceb0" stroke-width=".9"/>');markup.push('</g>');});
    blossom(96,366,.78,-19,2800);
    blossom(287,310,.82,17,3150);
    blossom(208,250,1.06,-6,3450);
    // A final unopened bud preserves the natural progression along the spray.
    markup.push('<g transform="translate(318 168) rotate(39) scale(.38)">');shape(bud,bud,'url(#orchidFace)',3050,4200);markup.push('</g>');
    return markup.join('');
  }
  function play(){
    var svg=document.getElementById('bloom'),light=document.getElementById('morningLight'),opener=document.querySelector('.opener');
    var note=document.querySelector('.letter'),identity=document.querySelector('.flower-text'),again=document.getElementById('again');
    svg.setAttribute('aria-label','A blush orchid with fleshy sage leaves, growing buds and slowly opening in morning sunlight');
    svg.style.transform='translateY(-1.4vh) scale(.82)';
    var pigments=svg.querySelectorAll('.orchid-pigment');
    if(REDUCE_MOTION){pigments.forEach(function(el){el.setAttribute('stop-color',el.dataset.day);});light.style.opacity=1;document.body.style.backgroundColor='#5d4d49';opener.style.color='#72595a';[note,identity,again].forEach(function(el){el.style.opacity=1;});showNote(true);return;}
    var tl=anime.timeline({autoplay:false,easing:'easeInOutSine'});window.__flowerTl=tl;
    svg.querySelectorAll('.orchid-line').forEach(function(el){var len=el.getTotalLength();el.style.opacity=0;el.setAttribute('stroke-dasharray',len);el.setAttribute('stroke-dashoffset',len);tl.add({targets:el,opacity:[0,1],duration:80},+el.dataset.at);tl.add({targets:el,strokeDashoffset:[len,0],duration:+el.dataset.duration},+el.dataset.at);});
    svg.querySelectorAll('.orchid-organ').forEach(function(el){el.setAttribute('d',el.dataset.bud.replace(/-?\d*\.?\d+/g,'0'));tl.add({targets:el,d:el.dataset.bud,duration:1100},+el.dataset.at);tl.add({targets:el,d:el.dataset.open,duration:2700},+el.dataset.opening);});
    svg.querySelectorAll('.orchid-detail').forEach(function(el){el.setAttribute('opacity','0');tl.add({targets:el,opacity:[0,.35],duration:1900},+el.dataset.at);});
    pigments.forEach(function(el){tl.add({targets:el,'stop-color':[el.dataset.night,el.dataset.day],duration:5200},2500);});
    tl.add({targets:light,opacity:[0,1],duration:6900},500);
    tl.add({targets:document.body,backgroundColor:['#241e25','#5d4d49'],duration:6900},500);
    tl.add({targets:opener,color:['#d8c9c6','#72595a'],duration:5600},900);
    // Hold the completed blossom for a quiet beat before the personal note.
    tl.add({targets:note,opacity:[0,1],translateY:[8,0],duration:950},9700);
    tl.add({targets:identity,opacity:[0,1],duration:750},10000);
    tl.add({targets:again,opacity:[0,.78],duration:450},10400);
    // Set before the timeline plays: see growing-botanicals.js for why.
    showNote(true);
    var frame=new URLSearchParams(location.search).get('frame');if(frame!==null)tl.seek(Math.max(0,+frame||0));else tl.play();
  }
  window.renderBotanicalHero=function(hero){return hero.slug==='orchid'?render():previousRender(hero);};
  window.playBotanicalHero=function(hero){return hero.slug==='orchid'?play():previousPlay(hero);};
}());
