/* Each organ has its own geometry and attachment point. Petals morph from
   folded shapes; stems extend along their paths. No painted-image reveals. */
(function () {
  'use strict';
  var parts, serial;
  var defs = '<defs>' +
    '<linearGradient id="leafFace" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b6bd77"/><stop offset=".42" stop-color="#72864d"/><stop offset="1" stop-color="#354b32"/></linearGradient>' +
    '<linearGradient id="roseFace" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffe1cc"/><stop offset=".38" stop-color="#ed9d9e"/><stop offset="1" stop-color="#a93d62"/></linearGradient>' +
    '<linearGradient id="creamFace" x1="0" y1="0" x2=".65" y2="1"><stop stop-color="#fff0de"/><stop offset=".6" stop-color="#efc3c4"/><stop offset="1" stop-color="#bb718c"/></linearGradient>' +
    '<linearGradient id="violetFace" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#e6d1f0"/><stop offset=".45" stop-color="#ab8cc5"/><stop offset="1" stop-color="#665084"/></linearGradient>' +
    '<linearGradient id="blueFace" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#e5d9ed"/><stop offset=".4" stop-color="#a7bfe1"/><stop offset="1" stop-color="#607dad"/></linearGradient>' +
    '<linearGradient id="cosmosFace" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#fde6ee"/><stop offset=".45" stop-color="#e7a0bf"/><stop offset="1" stop-color="#b0507e"/></linearGradient>' +
    '<linearGradient id="snowFace" x1="0" y1="0" x2=".75" y2="1"><stop stop-color="#fffaf4"/><stop offset=".55" stop-color="#eee5e6"/><stop offset="1" stop-color="#b4a7b6"/></linearGradient>' +
    '<linearGradient id="camelliaFace" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#ffe9ea"/><stop offset=".42" stop-color="#f0a7b4"/><stop offset="1" stop-color="#bd5a76"/></linearGradient>' +
    '<linearGradient id="crimsonFace" x1="0" y1="0" x2=".75" y2="1"><stop stop-color="#ffcfc8"/><stop offset=".4" stop-color="#d9485e"/><stop offset="1" stop-color="#7c1a36"/></linearGradient>' +
    '<linearGradient id="roseDeep" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#f2828f"/><stop offset=".5" stop-color="#b52c4c"/><stop offset="1" stop-color="#5e1129"/></linearGradient>' +
    '<linearGradient id="snowInner" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fffaf2"/><stop offset=".62" stop-color="#eef0df"/><stop offset="1" stop-color="#8fae6c"/></linearGradient>' +
    '<linearGradient id="glossyLeaf" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a3b37c"/><stop offset=".45" stop-color="#4f6c44"/><stop offset="1" stop-color="#22382b"/></linearGradient>' +
    '</defs>';
  function stem(d, width, at, duration, color) {
    parts.push('<path class="grow-stem" d="'+d+'" fill="none" stroke="'+(color||'#738350')+'" stroke-width="'+width+'" stroke-linecap="round" data-at="'+at+'" data-duration="'+(duration||2400)+'"/>');
  }
  function organ(d, x, y, angle, scale, fill, at, duration, fold, bare) {
    // Matching path commands make interpolation stable, including in Safari.
    var n=0;
    var closed=d.replace(/-?\d*\.?\d+/g,function(){return '0';});
    var folded=d.replace(/-?\d*\.?\d+/g,function(v){var horizontal=(n++%2===0);return +(Number(v)*(horizontal ? (fold||.12) : .62)).toFixed(3);});
    var organId='botanical-organ-'+serial;
    parts.push('<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+scale+')"><path id="'+organId+'" class="grow-organ" d="'+d+'" data-closed="'+closed+'" data-folded="'+folded+'" data-open="'+d+'" data-at="'+at+'" data-duration="'+(duration||2400)+'" fill="'+fill+'" stroke="#fff0dc" stroke-opacity=".2" stroke-width=".65" stroke-linejoin="round"/>');
    var isLeaf=(fill==='url(#leafFace)'||fill==='url(#glossyLeaf)');
    if(isLeaf && d!==slim && !bare){
      parts.push('<g opacity=".38">');
      stem('M 0 0 Q -3 -49 0 -103',.9,at+700,1700,'#d6d3a0');
      [-1,1].forEach(function(side){[28,47,65].forEach(function(h){stem('M 0 -'+h+' Q '+(side*11)+' -'+(h+9)+' '+(side*19)+' -'+(h+24),.55,at+1000,1400,'#c5ca91');});});
      parts.push('</g>');
    }
    if(!isLeaf && scale>.25 && !bare){
      parts.push('<clipPath id="'+organId+'-clip"><use href="#'+organId+'" xlink:href="#'+organId+'"/></clipPath><g clip-path="url(#'+organId+'-clip)" opacity=".19">');
      stem('M 0 0 Q -16 -29 -24 -72 M 0 0 Q 13 -37 24 -81 M 0 0 Q -1 -44 1 -97',.65,at+1400,1800,'#f2dbce');
      parts.push('</g>');
    }
    parts.push('</g>');
    serial++;
  }
  var leaf='M 0 0 C -18 -19 -37 -45 -30 -80 C -25 -98 -10 -115 1 -135 C 10 -111 35 -84 30 -56 C 26 -30 10 -10 0 0 Z';
  var slim='M 0 0 C -8 -35 -22 -67 -13 -104 C -9 -121 -3 -135 0 -150 C 13 -104 18 -58 0 0 Z';
  var broad='M 0 0 C -23 -17 -47 -33 -48 -65 C -49 -87 -25 -104 -7 -121 C 1 -113 9 -115 12 -104 C 24 -102 24 -92 34 -85 C 35 -75 46 -69 39 -55 C 38 -26 12 -8 0 0 Z';
  var petal='M 0 0 C -24 -9 -47 -33 -43 -65 C -42 -77 -35 -91 -25 -96 C -17 -103 -7 -98 0 -104 C 10 -98 20 -106 28 -96 C 47 -88 50 -59 37 -36 C 27 -17 11 -4 0 0 Z';
  function foliage(x,y,a,s,at,shape,fill) {
    organ(shape||leaf,x,y,a,s,fill||'url(#leafFace)',at,2300);
  }
  function bloomPetal(x,y,a,s,fill,at,d) { organ(d||petal,x,y,a,s,fill,at,2900); }
  function tulip(x,y,s,at,tilt) {
    parts.push('<g transform="translate('+x+' '+y+') rotate('+tilt+') scale('+s+')">');
    var rear='M 0 0 C -31 -18 -45 -76 -31 -126 C -14 -117 -9 -145 3 -148 C 19 -132 40 -135 39 -108 C 44 -57 27 -16 0 0 Z';
    bloomPetal(0,0,-26,.9,'url(#roseFace)',at,rear);
    bloomPetal(0,0,29,.88,'url(#roseFace)',at+180,rear);
    bloomPetal(0,0,1,.91,'url(#creamFace)',at+320,rear);
    for(var i=0;i<5;i++) stem('M '+(i*5-10)+' -12 Q '+(i*7-14)+' -40 '+(i*8-16)+' -64',2,at+1200+i*80,1700,'#a58b48');
    bloomPetal(0,0,-43,.83,'url(#roseFace)',at+540);
    bloomPetal(0,0,39,.86,'url(#roseFace)',at+760);
    bloomPetal(0,3,-3,.79,'url(#roseFace)',at+1000);
    parts.push('</g>');
  }
  function orchid(x,y,s,at,tilt) {
    parts.push('<g transform="translate('+x+' '+y+') rotate('+tilt+') scale('+s+')">');
    var sepal='M 0 0 C -15 -15 -24 -47 -12 -71 C -5 -84 2 -94 5 -101 C 21 -75 29 -36 0 0 Z';
    [-8,126,232].forEach(function(a,i){bloomPetal(0,0,a,.86,'url(#creamFace)',at+i*110,sepal);});
    bloomPetal(0,0,-76,1.02,'url(#creamFace)',at+320);
    bloomPetal(0,0,76,1.06,'url(#creamFace)',at+480);
    bloomPetal(0,2,179,.41,'#b95783',at+750,'M 0 0 C -23 -3 -42 -35 -30 -50 C -22 -53 -17 -34 -6 -35 C 2 -52 14 -49 19 -36 C 39 -41 45 -21 28 -10 C 15 3 7 -3 0 0 Z');
    bloomPetal(0,0,4,.2,'#e6c47b',at+980);
    parts.push('</g>');
  }
  function floret(x,y,s,at,shade,rotation) {
    parts.push('<g transform="translate('+x+' '+y+') rotate('+rotation+') scale('+s+')">');
    var p='M 0 0 C -14 -5 -23 -17 -19 -30 C -17 -37 -10 -38 -4 -34 C 4 -43 14 -38 18 -30 C 26 -17 14 -4 0 0 Z';
    [0,88,181,269].forEach(function(a,i){organ(p,0,0,a,1,shade,at+i*95,2200);});
    organ(p,0,0,12,.14,'#e7cc9c',at+500,1600);
    parts.push('</g>');
  }
  function peaBloom(x,y,size,at,angle,variant){
    parts.push('<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+size+')">');
    var standards=[
      'M 0 0 C -21 -3 -37 -17 -35 -39 C -35 -53 -16 -63 -3 -56 C 10 -66 32 -53 31 -36 C 33 -18 15 -5 0 0 Z',
      'M 0 0 C -19 -5 -31 -22 -27 -42 C -24 -53 -9 -57 0 -48 C 18 -57 37 -43 30 -26 C 25 -13 10 -3 0 0 Z',
      'M 0 0 C -28 -7 -41 -24 -31 -42 C -25 -53 -12 -48 -4 -44 C 8 -60 24 -58 28 -43 C 31 -23 13 -6 0 0 Z'
    ];
    bloomPetal(0,0,0,1,'url(#violetFace)',at,standards[(variant||0)%3]);
    bloomPetal(0,0,153,.7,'url(#violetFace)',at+200,'M 0 0 C -14 -4 -25 -26 -18 -43 C -12 -51 -4 -45 2 -47 C 18 -35 24 -21 15 -10 C 8 -4 3 -1 0 0 Z');
    bloomPetal(0,0,195,.56,'url(#creamFace)',at+340,'M 0 0 C -9 -16 -16 -36 -6 -49 C 1 -56 9 -46 10 -34 C 14 -16 8 -5 0 0 Z');
    parts.push('</g>');
  }
  function lavenderBell(x,y,s,angle,at,variant){
    var bells=[
      'M 0 0 C -5 -12 -4 -27 -13 -34 C -24 -34 -25 -48 -15 -50 C -12 -61 1 -60 4 -52 C 14 -58 25 -48 17 -40 C 9 -30 9 -12 0 0 Z',
      'M 0 0 C -4 -13 -7 -28 -15 -33 C -25 -37 -18 -47 -10 -46 C -15 -60 -1 -61 4 -49 C 18 -54 22 -40 12 -35 C 7 -27 6 -10 0 0 Z',
      'M 0 0 C -7 -15 -4 -31 -10 -39 C -18 -41 -18 -54 -6 -51 C 0 -66 13 -59 9 -49 C 22 -45 19 -34 9 -33 C 4 -20 5 -7 0 0 Z'
    ];
    bloomPetal(x,y,angle,s,'url(#violetFace)',at,bells[(variant||0)%3]);
  }
  /* ---- the winter set: cosmos, anemone, camellia, amaryllis, snowdrop, rose ----
     Same organs and the same grow-then-open timeline as the species above;
     only the anatomy differs. */
  // A cubic stem [x0,y0,x1,y1,x2,y2,x3,y3], plus the point and heading at t
  // along it, so leaves and heads attach to the drawn curve, not beside it.
  function curvePath(c){return 'M '+c[0]+' '+c[1]+' C '+c.slice(2).join(' ');}
  function onCurve(c,t){
    var u=1-t;
    var x=u*u*u*c[0]+3*u*u*t*c[2]+3*u*t*t*c[4]+t*t*t*c[6];
    var y=u*u*u*c[1]+3*u*u*t*c[3]+3*u*t*t*c[5]+t*t*t*c[7];
    var dx=3*u*u*(c[2]-c[0])+6*u*t*(c[4]-c[2])+3*t*t*(c[6]-c[4]);
    var dy=3*u*u*(c[3]-c[1])+6*u*t*(c[5]-c[3])+3*t*t*(c[7]-c[5]);
    return {x:+x.toFixed(2),y:+y.toFixed(2),a:+(Math.atan2(dx,-dy)*180/Math.PI).toFixed(2)};
  }
  var round='M 0 0 C -26 -8 -42 -38 -36 -66 C -31 -84 -14 -92 0 -92 C 14 -92 31 -84 36 -66 C 42 -38 26 -8 0 0 Z';
  var notched='M 0 0 C -10 -12 -22 -42 -23 -72 L -15 -77 L -8 -71 L 0 -79 L 8 -71 L 15 -77 L 23 -72 C 22 -42 10 -12 0 0 Z';
  var trumpet='M 0 0 C -31 -14 -44 -56 -31 -93 C -23 -109 -9 -117 0 -121 C 9 -117 23 -109 31 -93 C 44 -56 31 -14 0 0 Z';
  var pointed='M 0 0 C -20 -14 -30 -50 -19 -90 C -13 -104 -5 -112 0 -118 C 5 -112 13 -104 19 -90 C 30 -50 20 -14 0 0 Z';
  var discPath='M -13 0 C -13 -7 -7 -13 0 -13 C 7 -13 13 -7 13 0 C 13 7 7 13 0 13 C -7 13 -13 7 -13 0 Z';
  function disc(x,y,r,fill,at){organ(discPath,x,y,0,+(r/13).toFixed(3),fill,at,1500,.6,true);}
  // count petals fanned round one point, back to front.
  function ring(count,start,s,fill,at,step,shape,wobble){
    for(var i=0;i<count;i++){
      var w=wobble?[1,.93,1.05,.97,1.02][i%5]:1;
      bloomPetal(0,0,+(start+i*360/count).toFixed(2),+(s*w).toFixed(3),fill,at+i*step,shape);
    }
  }
  function head(x,y,angle,sx,sy){parts.push('<g transform="translate('+x+' '+y+') rotate('+angle+') scale('+sx+' '+sy+')">');}
  function stamens(count,r0,r1,width,color,tip,tipR,at){
    for(var i=0;i<count;i++){
      var a=(i*360/count+(i%2?7:-4))*Math.PI/180,len=r1*(i%3?1:.82);
      var x0=+(Math.sin(a)*r0).toFixed(2),y0=+(-Math.cos(a)*r0).toFixed(2);
      var x1=+(Math.sin(a)*len).toFixed(2),y1=+(-Math.cos(a)*len).toFixed(2);
      stem('M '+x0+' '+y0+' L '+x1+' '+y1,width,at+i*35,700,color);
      if(tip)disc(x1,y1,tipR,tip,at+500+i*35);
    }
  }

  function cosmos(){
    var stems=[
      [191,692,170,610,104,520,78,458],
      [192,692,176,560,132,420,116,312],
      [194,692,232,600,300,470,302,376],
      [190,692,206,540,236,380,226,222]
    ];
    stems.forEach(function(c,i){
      stem(curvePath(c),i===0?2.2:3,200+i*180,2900,'#7d9156');
      // threadlike, finely cut foliage: small slim pairs climbing each stem
      [.2,.38,.56].forEach(function(t,k){
        if(i===0&&k===2)return;
        var p=onCurve(c,t);
        foliage(p.x,p.y,p.a-48,+(.36-k*.06).toFixed(2),1300+i*160+k*180,slim);
        foliage(p.x,p.y,p.a+46,+(.33-k*.06).toFixed(2),1420+i*160+k*180,slim);
      });
    });
    // a bud still closed on the low stem
    var tip=onCurve(stems[0],1);
    head(tip.x,tip.y,tip.a,1,1);
    foliage(0,0,-38,.16,3600,slim);foliage(0,0,40,.16,3650,slim);
    bloomPetal(0,0,-12,.26,'url(#cosmosFace)',3900,round);
    bloomPetal(0,0,14,.24,'url(#cosmosFace)',4000,round);
    parts.push('</g>');
    [[116,312,-14,.8,3300,'url(#cosmosFace)'],[302,376,18,.68,3700,'url(#snowFace)'],[226,222,6,.92,3000,'url(#cosmosFace)']].forEach(function(h,i){
      head(h[0],h[1],h[2],1,.9);
      ring(8,i*11,h[3],h[5],h[4],70,notched,true);
      disc(0,0,13*h[3],'#d9a93f',h[4]+900);
      stamens(14,3*h[3],11*h[3],1.1,'#b98327','#f0cd6a',1.8*h[3],h[4]+1150);
      parts.push('</g>');
    });
  }

  function anemone(){
    var stems=[[190,692,170,580,120,470,106,362],[196,692,226,590,290,460,298,340],[194,692,186,560,214,400,202,262]];
    foliage(186,690,-68,.68,1200,broad);foliage(200,690,70,.64,1500,broad);foliage(192,688,-14,.5,1800,broad);
    stems.forEach(function(c,i){
      stem(curvePath(c),3.2,200+i*220,2800,'#6f8650');
      // the ruff of cut leaves an anemone wears partway up its stem
      var p=onCurve(c,.62);
      [-62,-24,22,60].forEach(function(o,k){foliage(p.x,p.y,p.a+o,+(.34-(k%2)*.05).toFixed(2),1700+i*200+k*90,slim);});
    });
    [[106,362,-16,.72,3500,.86],[298,340,14,.66,3900,.86],[202,262,4,.96,3000,.94]].forEach(function(h,i){
      head(h[0],h[1],h[2],1,h[5]);
      ring(6,i*20,h[3],'url(#snowFace)',h[4],90,round,true);
      ring(6,i*20+30,+(h[3]*.8).toFixed(3),'url(#snowFace)',h[4]+300,90,round,true);
      disc(0,0,17*h[3],'#2b2440',h[4]+1000);
      stamens(18,11*h[3],28*h[3],1.3,'#3b3352','#251d33',2.6*h[3],h[4]+1300);
      disc(0,0,9*h[3],'#1d1729',h[4]+1500);
      parts.push('</g>');
    });
  }

  function camellia(){
    var wood='#6b6347',glossy='url(#glossyLeaf)';
    var main=[182,692,198,600,168,470,196,316];
    var a=onCurve(main,.36),b=onCurve(main,.72);
    var side=[a.x,a.y,150,a.y-40,122,a.y-90,104,430];
    var twig=[b.x,b.y,230,b.y-40,264,b.y-90,286,262];
    stem(curvePath(main),6,200,2900,wood);
    stem(curvePath(side),4,1500,1900,wood);
    stem(curvePath(twig),3.4,2300,1500,wood);
    // glossy evergreen leaves, alternating along the wood
    [[main,.16,-58,.62,1300],[main,.28,56,.66,1500],[main,.5,58,.56,1900],[main,.62,-54,.52,2100],[side,.45,-62,.5,2300],[side,.75,54,.42,2700],[twig,.42,56,.44,2900],[twig,.72,-56,.38,3200]].forEach(function(l){
      var p=onCurve(l[0],l[1]);foliage(p.x,p.y,p.a+l[2],l[3],l[4],leaf,glossy);
    });
    function bloom(x,y,ang,s,at,sy){
      head(x,y,ang,1,sy);
      ring(7,4,s,'url(#camelliaFace)',at,80,round,true);
      ring(7,30,+(s*.74).toFixed(3),'url(#camelliaFace)',at+400,80,round,true);
      ring(5,12,+(s*.5).toFixed(3),'url(#camelliaFace)',at+800,90,round,true);
      disc(0,0,7*s,'#f0cf72',at+1300);
      stamens(22,4*s,19*s,1.4,'#e3bb5c','#f6dd90',2.2*s,at+1400);
      parts.push('</g>');
    }
    bloom(104,430,-14,.62,3600,.84);
    // a bud on the upper twig, still held in its green bracts
    var t=onCurve(twig,1);
    head(t.x,t.y,t.a,1,1);
    bloomPetal(0,0,-10,.3,'url(#camelliaFace)',3700,round);bloomPetal(0,0,12,.28,'url(#camelliaFace)',3850,round);
    foliage(0,4,-34,.2,3300,leaf,glossy);foliage(0,4,36,.2,3350,leaf,glossy);
    parts.push('</g>');
    bloom(196,316,3,1,3000,.92);
  }

  function amaryllis(){
    // strap leaves first, behind the flower stalk
    [[-30,1.35],[26,1.48],[-12,1.12],[44,1.06]].forEach(function(l,k){foliage(194+k*3,692,l[0],l[1],600+k*220,slim);});
    stem('M 196 692 C 190 590 204 470 198 372',8,200,2700,'#7a9150');
    var heads=[[108,330,-58,.74,3300],[288,334,60,.72,3600],[198,240,-4,.8,3000]];
    heads.forEach(function(h,i){stem('M 198 372 Q '+((198+h[0])/2)+' '+(h[1]+14)+' '+h[0]+' '+h[1],3,2300+i*150,1200,'#7a9150');});
    foliage(198,374,-22,.22,2400,slim);foliage(198,374,24,.2,2450,slim);
    heads.forEach(function(h){
      head(h[0],h[1],h[2],1,.8);
      ring(3,0,h[3],'url(#crimsonFace)',h[4],110,trumpet);
      ring(3,60,+(h[3]*.92).toFixed(3),'url(#crimsonFace)',h[4]+250,110,trumpet);
      ring(6,30,+(h[3]*.34).toFixed(3),'url(#snowInner)',h[4]+700,40,pointed);
      // stamens fall from the throat whichever way the flower faces
      parts.push('<g transform="rotate('+(-h[2])+')">');
      for(var k=0;k<6;k++){var dx=(k-2.5)*7;stem('M 0 0 Q '+(dx*.5)+' 20 '+dx+' 30 Q '+(dx*1.1)+' 34 '+(dx*1.2)+' 31',1.1,h[4]+1300+k*60,900,'#f1e4c4');disc(+(dx*1.2).toFixed(2),31,2.4,'#e8d29a',h[4]+1900+k*60);}
      parts.push('</g></g>');
    });
  }

  function snowdrop(){
    var tepal='M 0 0 C -12 4 -17 22 -11 40 C -7 50 -2 54 0 56 C 2 54 7 50 11 40 C 17 22 12 4 0 0 Z';
    var cup='M 0 0 C -9 3 -11 16 -9 28 C -7 33 -3 34 0 33 C 3 34 7 33 9 28 C 11 16 9 3 0 0 Z';
    // [top x, top y, which way it nods, size], back to front
    var plants=[[232,246,1,1.4],[150,282,-1,1.3],[300,350,-1,1.15],[96,372,1,1.1],[196,404,1,1.02]];
    plants.forEach(function(pl,i){
      var bx=Math.round(192+(pl[0]-196)*.2),tx=pl[0],ty=pl[1],dir=pl[2],s=pl[3],at=200+i*200;
      foliage(bx+(i%2?-4:4),692,(i-2)*9+(i%2?-8:8),+(.62+s*.22).toFixed(2),1000+i*150,slim);
      stem('M '+bx+' 692 C '+bx+' 560 '+tx+' '+(ty+120)+' '+tx+' '+ty,2.6,at,2600,'#7b9366');
      var px=tx+dir*26,py=ty+10;
      stem('M '+tx+' '+ty+' Q '+(tx+dir*16)+' '+(ty-18)+' '+px+' '+py,1.6,at+2200,700,'#7b9366');
      foliage(tx,ty+2,-dir*14,.16,at+2300,slim);
      parts.push('<g transform="translate('+px+' '+py+') rotate('+(-dir*10)+') scale('+s+')">');
      bloomPetal(0,6,0,.9,'url(#snowFace)',at+2800,tepal);
      bloomPetal(0,6,0,.62,'url(#snowInner)',at+3100,cup);
      bloomPetal(0,6,36,.96,'url(#snowFace)',at+3000,tepal);
      bloomPetal(0,6,-36,.96,'url(#snowFace)',at+3150,tepal);
      disc(0,3,4.6,'#8faa6a',at+2500);
      parts.push('</g>');
    });
  }

  function rose(){
    var green='#5f7548',glossy='url(#glossyLeaf)';
    var main=[192,692,208,590,176,470,198,330];
    var a=onCurve(main,.42),b=onCurve(main,.7);
    var side=[a.x,a.y,150,a.y-30,112,a.y-80,100,404];
    var twig=[b.x,b.y,236,b.y-30,272,b.y-80,290,246];
    stem(curvePath(main),5.5,200,2900,green);
    stem(curvePath(side),3.6,1600,1900,green);
    stem(curvePath(twig),3,2300,1500,green);
    var thorn='M -3 0 C -2 -3 0 -8 5 -12 C 3 -6 3 -3 4 0 Z';
    [[.2,1],[.33,-1],[.55,1],[.8,-1]].forEach(function(th,k){var p=onCurve(main,th[0]);organ(thorn,p.x,p.y,p.a+th[1]*70,1,'#7d6a49',1600+k*200,900,.5,true);});
    // compound leaves: three leaflets on a short stalk
    function roseLeaf(c,t,side,at){
      var p=onCurve(c,t),deg=p.a+side*62,r=deg*Math.PI/180;
      var ex=+(p.x+Math.sin(r)*44).toFixed(2),ey=+(p.y-Math.cos(r)*44).toFixed(2);
      var mx=+(p.x+Math.sin(r)*22).toFixed(2),my=+(p.y-Math.cos(r)*22).toFixed(2);
      stem('M '+p.x+' '+p.y+' L '+ex+' '+ey,1.4,at,600,green);
      foliage(mx,my,deg-52,.3,at+300,broad,glossy);
      foliage(mx,my,deg+52,.3,at+420,broad,glossy);
      foliage(ex,ey,deg,.36,at+540,broad,glossy);
    }
    roseLeaf(main,.18,-1,1300);roseLeaf(main,.3,1,1600);roseLeaf(main,.58,1,1900);roseLeaf(side,.5,-1,2600);roseLeaf(twig,.45,1,3000);
    function bloom(x,y,ang,s,at,sy){
      head(x,y,ang,1,sy);
      ring(5,10,s,'url(#crimsonFace)',at,90,petal,true);
      ring(5,46,+(s*.8).toFixed(3),'url(#crimsonFace)',at+350,90,petal,true);
      ring(5,22,+(s*.6).toFixed(3),'url(#roseDeep)',at+700,90,petal,true);
      ring(4,60,+(s*.42).toFixed(3),'url(#roseDeep)',at+1050,90,petal,true);
      // the tight heart, a spiral of petal edges
      parts.push('<g transform="scale('+s+')">');
      disc(0,0,12,'url(#roseDeep)',at+1300);
      stem('M 0 -4 C 7 -5 8 3 3 6 C -4 10 -11 3 -9 -4 C -7 -14 7 -17 13 -9 C 20 1 13 16 0 17 C -13 18 -22 7 -20 -6',1.8,at+1500,1500,'#5a0f26');
      parts.push('</g></g>');
    }
    bloom(100,404,-20,.62,3500,.62);
    var t=onCurve(twig,1);
    head(t.x,t.y,t.a,1,1);
    bloomPetal(0,0,-8,.3,'url(#crimsonFace)',3600,pointed);bloomPetal(0,0,10,.28,'url(#roseDeep)',3750,pointed);
    foliage(0,2,-40,.2,3300,slim);foliage(0,2,42,.2,3350,slim);foliage(0,2,0,.14,3400,slim);
    parts.push('</g>');
    bloom(198,322,4,.95,3000,.9);
  }

  var SPECIES={cosmos:cosmos,anemone:anemone,camellia:camellia,amaryllis:amaryllis,snowdrop:snowdrop,rose:rose};

  function singleTulip(){
    parts=[defs,'<defs><linearGradient id="dustyTulip" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="#e4c5ba"/><stop offset=".36" stop-color="#c79296"/><stop offset=".74" stop-color="#ad7483"/><stop offset="1" stop-color="#784b63"/></linearGradient><linearGradient id="tulipShadow"><stop stop-color="#b38891"/><stop offset="1" stop-color="#71465c"/></linearGradient><filter id="petalPaper" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="8" result="grain"/><feColorMatrix in="grain" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".08"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>'];
    stem('M 177 690 C 152 571 219 456 211 351',5.5,120,2180,'#778778');
    organ('M 0 0 C -26 -26 -71 -91 -68 -172 C -64 -156 -49 -150 -40 -124 C -24 -85 -4 -39 0 0 Z',177,605,0,1,'#78877a',1200,2500);
    organ('M 0 0 C 23 -39 71 -101 77 -161 C 89 -115 58 -52 29 -20 C 16 -6 6 -2 0 0 Z',190,539,0,1,'#687b6d',1630,2450);
    stem('M 177 605 Q 136 506 109 433',.7,2400,1750,'#a8b4a0');
    stem('M 190 539 Q 246 460 267 378',.7,2700,1850,'#a0b19b');
    parts.push('<g transform="translate(211 352) rotate(7)" filter="url(#petalPaper)">');
    // All six petals enclose the same bud before their faces curl outward.
    var bud='M 0 0 C -28 -10 -39 -52 -27 -89 C -23 -108 -8 -118 0 -122 C 12 -113 27 -105 31 -82 C 40 -40 22 -7 0 0 Z';
    var faces=[
      'M 0 0 C -32 -16 -65 -80 -55 -147 C -34 -141 -21 -153 -9 -156 C 12 -143 15 -127 18 -107 C 22 -62 19 -17 0 0 Z',
      'M 0 0 C -18 -30 -18 -97 8 -151 C 26 -143 38 -155 51 -147 C 65 -109 56 -74 39 -45 C 26 -20 10 -5 0 0 Z',
      'M 0 0 C -26 -30 -45 -108 -25 -167 C -10 -162 6 -170 19 -164 C 42 -122 38 -76 21 -46 C 10 -22 6 -5 0 0 Z',
      'M 0 0 C -40 -3 -91 -33 -103 -110 C -86 -115 -65 -100 -55 -100 C -37 -92 -26 -70 -19 -49 C -12 -27 -7 -10 0 0 Z',
      'M 0 0 C 13 -26 28 -76 54 -108 C 68 -108 82 -118 94 -111 C 100 -69 70 -28 39 -11 C 21 -1 9 1 0 0 Z',
      'M 0 0 C -37 -8 -59 -40 -52 -93 C -36 -109 -15 -99 -2 -104 C 16 -100 39 -112 50 -91 C 56 -43 33 -6 0 0 Z'
    ];
    faces.forEach(function(d,i){parts.push('<path class="tulip-petal" d="'+d+'" data-bud="'+bud+'" data-open="'+d+'" data-order="'+i+'" fill="url(#'+(i<3?'tulipShadow':'dustyTulip')+')" stroke="#e6cabc" stroke-opacity=".3" stroke-width=".65"/>');});
    parts.push('</g>');
    return parts.join('');
  }
  function playSingleTulip(){
    var svg=document.getElementById('bloom'),light=document.getElementById('morningLight');
    var label=document.querySelector('.opener'),note=document.querySelector('.letter'),identity=document.querySelector('.flower-text'),again=document.getElementById('again');
    document.body.style.background='#241e25';light.style.display='';label.style.color='#d8c9c6';
    svg.style.transform='translateY(-1.4vh) scale(.82)';
    svg.setAttribute('aria-label','A single dusty pink tulip growing from a stem into a bud and slowly opening');
    var petals=svg.querySelectorAll('.tulip-petal');
    if(REDUCE_MOTION){light.style.opacity=1;document.body.style.backgroundColor='#5d4d49';[note,identity,again].forEach(function(el){el.style.opacity=1;});showNote(true);return;}
    var tl=anime.timeline({autoplay:false,easing:'easeInOutSine'});window.__flowerTl=tl;
    svg.querySelectorAll('.grow-stem').forEach(function(el){var len=el.getTotalLength();el.style.opacity=0;el.setAttribute('stroke-dasharray',len);el.setAttribute('stroke-dashoffset',len);tl.add({targets:el,opacity:[0,1],duration:80},+el.dataset.at);tl.add({targets:el,strokeDashoffset:[len,0],duration:+el.dataset.duration},+el.dataset.at);});
    svg.querySelectorAll('.grow-organ').forEach(function(el){el.setAttribute('d',el.dataset.closed);tl.add({targets:el,d:[{value:el.dataset.folded,duration:950},{value:el.dataset.open,duration:1550}]},+el.dataset.at);});
    petals.forEach(function(el,i){el.setAttribute('d',el.dataset.bud.replace(/-?\d*\.?\d+/g,'0'));tl.add({targets:el,d:el.dataset.bud,duration:1300},2350);tl.add({targets:el,d:el.dataset.open,duration:3400},3900+i*115);});
    tl.add({targets:light,opacity:[0,1],duration:6500},500);
    tl.add({targets:document.body,backgroundColor:['#241e25','#5d4d49'],duration:6500},500);
    tl.add({targets:label,color:['#d8c9c6','#72595a'],duration:5400},900);
    tl.add({targets:note,opacity:[0,1],translateY:[8,0],duration:850},8500);
    tl.add({targets:identity,opacity:[0,1],duration:600},8750);
    tl.add({targets:again,opacity:[0,.78],duration:400},9050);
    // Set before the timeline plays, not after: .letter fades in over the
    // next second and its content was already sitting in the DOM the whole
    // time (the static markup, stale the moment the note last changed), so
    // calling this once the timeline finished used to fade in the wrong
    // line and then snap to the right one. Setting it now means what fades
    // in is already correct.
    showNote(true);
    var frame=new URLSearchParams(location.search).get('frame');if(frame!==null)tl.seek(Math.max(0,+frame||0));else tl.play();
  }
  window.renderBotanicalHero=function(hero){
    if(hero.slug==='tulip')return singleTulip();
    parts=[defs];serial=0;
    if(hero.slug==='tulip') {
      stem('M 176 690 C 151 570 183 421 210 277',7,200,3000);
      stem('M 174 582 C 117 506 89 431 80 356',5,850,2700);
      stem('M 167 618 C 225 553 280 454 299 385',4,1200,2700);
      foliage(166,619,-44,1.65,1300,slim);foliage(172,595,48,1.6,1700,slim);
      foliage(171,534,-35,1.28,2050,slim);foliage(195,396,36,1.05,2350,slim);
      tulip(211,287,1.02,3200,8);tulip(80,366,.68,3750,-20);tulip(299,394,.6,4100,22);
    } else if(hero.slug==='orchid') {
      stem('M 164 693 C 186 551 149 373 219 229 C 248 170 304 155 326 144',6,200,3400);
      foliage(165,664,-64,1.4,1200,broad);foliage(166,657,67,1.42,1550,broad);foliage(171,620,-26,1.02,1900,broad);
      stem('M 177 426 Q 131 362 99 345',3,1900,1300);stem('M 194 313 Q 254 311 281 286',3,2200,1500);
      orchid(99,342,.72,3000,-18);orchid(204,233,.88,3300,9);orchid(280,285,.69,3900,16);orchid(157,426,.65,4300,-8);
      bloomPetal(326,145,25,.22,'url(#roseFace)',3600);
    } else if(hero.slug==='hydrangea') {
      stem('M 185 691 C 218 590 159 514 186 400',7,200,2900);
      foliage(189,570,55,1.5,1450,broad);foliage(182,503,-69,1.4,1800,broad);foliage(187,438,29,1.05,2200,broad);
      // A staggered domed inflorescence, with smaller flowers around the rim.
      var rows=[[-2,3],[-1,5],[0,6],[1,5],[2,4]];
      rows.forEach(function(row,r){for(var c=0;c<row[1];c++){
        var x=195+(c-(row[1]-1)/2)*46+(r%2?7:-4),y=277+row[0]*42+(c%2?7:-3);
        var size=.66+((c+r)%3)*.09;
        floret(x,y,size,3000+r*260+c*125,(c+r)%3===0?'url(#violetFace)':'url(#blueFace)',c*21+r*13);
      }});
    } else if(hero.slug==='lavender') {
      var spikes=[[91,314,-18],[154,216,-8],[205,168,5],[267,252,17],[302,344,25]];
      spikes.forEach(function(p,i){
        // Evaluate the actual quadratic stem at each organ's height. Linear
        // interpolation drifts sideways from the curve, detaching blossoms.
        function stemX(y){
          var lo=0,hi=1,t;
          for(var step=0;step<30;step++){
            t=(lo+hi)/2;
            var cy=(1-t)*(1-t)*692+2*(1-t)*t*477+t*t*p[1];
            if(cy>y)lo=t;else hi=t;
          }
          t=(lo+hi)/2;
          return +( ((1-t)*(1-t)*191+2*(1-t)*t*(160+i*17)+t*t*p[0]) ).toFixed(3);
        }
        stem('M 191 692 Q '+(160+i*17)+' 477 '+p[0]+' '+p[1],3,200+i*200,3000);
        foliage(stemX(609-i*29),609-i*29,i%2?46:-46,.68,1400+i*180,slim);
        foliage(stemX(481-i*16),481-i*16,i%2?-39:37,.53,1900+i*160,slim);
        var levels=[[0,16,35,59,78,102,119],[0,21,37,57,83,104],[0,15,38,56,80,99,121],[0,23,43,61,87,106],[0,18,40,65,85,111]][i];
        levels.forEach(function(level,k){
          var yy=p[1]+level,xx=stemX(yy),size=[.41,.52,.46,.58,.49,.43,.36][(k+i)%7];
          lavenderBell(xx,yy,size,[-39,-57,-46,-66,-43][(k+i)%5],3200+i*210+(6-k)*170,k+i);
          var otherY=yy+[5,9,3,11][k%4];
          lavenderBell(stemX(otherY),otherY,size*[.82,1.09,.94][k%3],[41,61,48,69][(k+i)%4],3380+i*210+(6-k)*170,k+i+1);
        });
      });
    } else if(SPECIES[hero.slug]) {
      SPECIES[hero.slug]();
    } else {
      stem('M 48 214 C 100 133 213 139 336 189',8,200,2900,'#827354');
      [[86,179,-39],[154,156,7],[239,164,50]].forEach(function(p,i){
        parts.push('<g transform="translate('+p[0]+' '+p[1]+') rotate('+p[2]+')">');
        stem('M 0 0 Q 5 -63 0 -121',1.6,1100+i*180,2100,'#879678');
        for(var l=0;l<3;l++){foliage(0,-20-l*28,-52,.35-l*.035,1450+i*180+l*100);foliage(2,-30-l*28,53,.34-l*.03,1600+i*180+l*100);}
        foliage(0,-85,0,.31,1950+i*180);parts.push('</g>');
      });
      [[94,168,519],[180,154,637],[271,169,564]].forEach(function(p,i){
        stem('M '+p[0]+' '+p[1]+' Q '+(p[0]-22)+' '+(p[1]+140)+' '+(p[0]+10)+' '+p[2],2.5,1700+i*250,3000);
        var levels=[[.035,.12,.205,.31,.39,.49,.60,.70,.81,.92],[.025,.105,.18,.275,.37,.47,.58,.68,.775,.87,.96],[.04,.135,.23,.34,.435,.54,.64,.76,.865,.95]][i];
        for(var k=0;k<levels.length;k++){
          var t=levels[k],x=(1-t)*(1-t)*p[0]+2*(1-t)*t*(p[0]-22)+t*t*(p[0]+10);
          var y=(1-t)*(1-t)*p[1]+2*(1-t)*t*(p[1]+140)+t*t*p[2];
          var size=(.37-t*.22)*[1,.91,1.12,.95,1.04][(i+k)%5];
          var left=5+[2,5,0,3][k%4],right=6+[3,0,5][k%3];
          var curveAt=3200+i*240+k*155;
          stem('M '+x+' '+y+' Q '+(x-4)+' '+(y+3)+' '+(x-left)+' '+(y+7),1,curveAt-400,950,'#879678');
          stem('M '+x+' '+y+' Q '+(x+5)+' '+(y+6)+' '+(x+right)+' '+(y+11),1,curveAt-250,950,'#879678');
          peaBloom(x-left,y+7,size*1.8,curveAt,[-24,-43,-16,-35][k%4],k+i);
          peaBloom(x+right,y+11,size*1.65,curveAt+170,[29,47,18,38][(k+i)%4],k+i+1);
        }
      });
    }
    return parts.join('');
  };
  window.playBotanicalHero=function(hero){
    if(hero && hero.slug==='tulip'){playSingleTulip();return;}
    var svg=document.getElementById('bloom'),light=document.getElementById('morningLight'),opener=document.querySelector('.opener');
    var letter=document.querySelector('.letter'),identity=document.querySelector('.flower-text'),again=document.getElementById('again');
    var stems=svg.querySelectorAll('.grow-stem'),organs=svg.querySelectorAll('.grow-organ');
    if(REDUCE_MOTION){
      svg.style.transform='translateY(-1.4vh) scale(.82)';light.style.opacity=1;document.body.style.backgroundColor='#5d4d49';opener.style.color='#72595a';
      letter.style.opacity=1;identity.style.opacity=1;again.style.opacity=.78;showNote(true);return;
    }
    var tl=anime.timeline({autoplay:false,easing:'easeInOutSine'});window.__flowerTl=tl;
    stems.forEach(function(el){var length=el.getTotalLength();el.style.opacity=0;el.setAttribute('stroke-dasharray',length);el.setAttribute('stroke-dashoffset',length);tl.add({targets:el,opacity:[0,1],duration:100},+el.dataset.at);tl.add({targets:el,strokeDashoffset:[length,0],duration:+el.dataset.duration,easing:'easeInOutSine'},+el.dataset.at);});
    organs.forEach(function(el){el.setAttribute('d',el.dataset.closed);tl.add({targets:el,d:[{value:el.dataset.folded,duration:+el.dataset.duration*.30},{value:el.dataset.folded,duration:450},{value:el.dataset.open,duration:+el.dataset.duration*.70}],easing:'easeInOutSine'},+el.dataset.at);});
    tl.add({targets:light,opacity:[0,1],duration:6900},450);
    tl.add({targets:document.body,backgroundColor:['#241e25','#5d4d49'],duration:6900},350);
    tl.add({targets:opener,color:['#d8c9c6','#72595a'],duration:5600},750);
    tl.add({targets:svg,scale:[1.05,.82],translateY:['3.8vh','-1.4vh'],duration:1600},8500);
    tl.add({targets:letter,opacity:[0,1],translateY:[12,0],duration:1000},10100);
    tl.add({targets:identity,opacity:[0,1],translateY:[6,0],duration:700},10400);
    tl.add({targets:again,opacity:[0,.78],duration:400},10700);
    // See the comment in playSingleTulip above: set before playing, not after.
    showNote(true);
    var frame=new URLSearchParams(location.search).get('frame');
    if(frame!==null){tl.seek(Math.max(0,+frame||0));}else{tl.play();}
  };
}());
