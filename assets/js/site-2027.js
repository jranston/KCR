/* Header logo: render the approved mark for a white navigation background without
   changing its typography, proportions or graphic styling. */
(()=>{
  const headerStyle=document.createElement('style');
  headerStyle.textContent=`
    .nav{min-height:104px!important;padding-block:8px!important;gap:20px!important;}
    .brand{width:320px!important;min-width:320px!important;height:88px!important;flex:0 0 320px!important;display:flex!important;align-items:center!important;overflow:visible!important;}
    .brand>img{display:none!important;}
    .brand-logo-canvas{display:block!important;width:320px!important;height:auto!important;max-height:88px!important;object-fit:contain!important;background:transparent!important;}
    .navlinks{flex:1 1 auto!important;min-width:0!important;display:flex;flex-wrap:nowrap!important;align-items:center!important;justify-content:flex-end!important;gap:3px!important;}
    .navlinks a{white-space:nowrap!important;padding:9px 10px!important;}
    @media(max-width:1320px) and (min-width:1181px){
      .brand{width:280px!important;min-width:280px!important;flex-basis:280px!important;}
      .brand-logo-canvas{width:280px!important;max-height:82px!important;}
      .nav{gap:12px!important;}
      .navlinks a{padding:9px 8px!important;font-size:15px!important;}
    }
    @media(max-width:1180px){
      .nav{min-height:94px!important;padding-block:6px!important;}
      .brand{width:285px!important;min-width:0!important;height:80px!important;flex:0 1 285px!important;}
      .brand-logo-canvas{width:285px!important;max-height:80px!important;}
      .navlinks{display:none!important;top:94px!important;}
      .navlinks.open{display:flex!important;}
    }
    @media(max-width:680px){
      .nav{min-height:84px!important;padding-block:5px!important;}
      .brand{width:min(250px,72vw)!important;height:72px!important;flex:0 1 auto!important;}
      .brand-logo-canvas{width:100%!important;max-height:72px!important;}
      .navlinks{top:84px!important;}
    }
  `;
  document.head.appendChild(headerStyle);
})();

document.addEventListener('DOMContentLoaded',()=>{
  /* Build the white-background version directly from the approved source artwork.
     The actual logo occupies x=85,y=148,w=833,h=388 in the source. Remove the navy
     field and recolour only the white lettering area to KCR navy. The bird, runner,
     ribbon, red title and gold rules remain unchanged. */
  document.querySelectorAll('.brand').forEach(brand=>{
    const old=brand.querySelector('img');
    if(!old)return;
    const source=new Image();
    source.onload=()=>{
      const sx=85,sy=148,sw=833,sh=388;
      const canvas=document.createElement('canvas');
      canvas.width=sw;canvas.height=sh;
      canvas.className='brand-logo-canvas';
      canvas.setAttribute('role','img');
      canvas.setAttribute('aria-label','Kingston City Marathon');
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      ctx.drawImage(source,sx,sy,sw,sh,0,0,sw,sh);
      const frame=ctx.getImageData(0,0,sw,sh),d=frame.data;
      for(let i=0;i<d.length;i+=4){
        const px=(i/4)%sw;
        const r=d[i],g=d[i+1],b=d[i+2];
        /* Remove the original #001830 field, including antialias variation. */
        if(r<24 && g<48 && b>28 && b<82 && b>g){
          const dist=Math.abs(r-0)+Math.abs(g-24)+Math.abs(b-48);
          if(dist<58){d[i+3]=0;continue;}
        }
        /* On the typography side only, change near-white lettering to KCR navy.
           This preserves the white contour treatment around the bird/runner artwork. */
        if(px<545 && r>218 && g>218 && b>218 && d[i+3]>20){
          d[i]=0;d[i+1]=27;d[i+2]=51;
        }
      }
      ctx.putImageData(frame,0,0);
      old.replaceWith(canvas);
    };
    source.src='/assets/images/KCM%202027%20Logo.png';
  });

  const t=document.querySelector('.menu-toggle'),n=document.querySelector('.navlinks');
  if(t&&n){
    t.setAttribute('aria-expanded','false');
    const setMenu=open=>{n.classList.toggle('open',open);t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close menu':'Open menu');};
    t.addEventListener('click',()=>setMenu(!n.classList.contains('open')));
    n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  document.querySelectorAll('a[href]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href||href.startsWith('#'))return;
    try{
      const url=new URL(href,window.location.href);
      if((url.protocol==='http:'||url.protocol==='https:')&&url.origin!==window.location.origin){
        a.target='_blank';
        const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
        rel.add('noopener');rel.add('noreferrer');
        a.setAttribute('rel',[...rel].join(' '));
      }
    }catch(e){}
  });

  const heroButtons=document.querySelector('.campaign-copy > .btns');
  if(heroButtons){
    const heroStyle=document.createElement('style');
    heroStyle.textContent=`
      @media (min-width:681px){
        .campaign-copy>.btns{display:flex!important;flex-flow:row nowrap!important;align-items:center!important;gap:10px!important;width:max-content!important;max-width:none!important;}
        .campaign-copy>.btns .btn{flex:0 0 auto!important;white-space:nowrap!important;padding:12px 16px!important;font-size:13px!important;gap:8px!important;}
      }
      @media (min-width:1181px){.campaign-copy>.btns .btn{padding:13px 18px!important;font-size:13.5px!important;}}
    `;
    document.head.appendChild(heroStyle);
  }

  const carousel=document.querySelector('[data-photo-carousel]');
  if(carousel){
    const track=carousel.querySelector('.photo-track'),slides=[...carousel.querySelectorAll('.photo-slide')],dots=[...carousel.querySelectorAll('.photo-dot')];
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let current=0,timer;
    const show=i=>{current=(i+slides.length)%slides.length;track.style.transform=`translateX(-${current*100}%)`;dots.forEach((d,j)=>{d.classList.toggle('active',j===current);d.setAttribute('aria-current',j===current?'true':'false')});};
    const stop=()=>clearInterval(timer);
    const autoplay=()=>{stop();if(!reduce)timer=setInterval(()=>show(current+1),5000);};
    carousel.querySelector('[data-prev]')?.addEventListener('click',()=>{show(current-1);autoplay()});
    carousel.querySelector('[data-next]')?.addEventListener('click',()=>{show(current+1);autoplay()});
    dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);autoplay()}));
    carousel.addEventListener('mouseenter',stop);carousel.addEventListener('mouseleave',autoplay);
    carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',autoplay);
    show(0);autoplay();
  }
});
