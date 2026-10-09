/* Header logo: explicitly override the legacy CSS content replacement with the approved logo. */
(()=>{
  const headerStyle=document.createElement('style');
  headerStyle.textContent=`
    .nav{min-height:104px!important;padding-block:8px!important;gap:20px!important;}
    .brand{width:320px!important;min-width:320px!important;height:88px!important;flex:0 0 320px!important;display:flex!important;align-items:center!important;overflow:visible!important;}
    .brand>img{content:url('/assets/images/kcr-logo-clean.png?v=20261008d')!important;display:block!important;width:320px!important;height:88px!important;max-width:320px!important;max-height:88px!important;object-fit:contain!important;object-position:left center!important;background:transparent!important;border:0!important;outline:0!important;box-shadow:none!important;}
    .navlinks{flex:1 1 auto!important;min-width:0!important;display:flex;flex-wrap:nowrap!important;align-items:center!important;justify-content:flex-end!important;gap:3px!important;}
    .navlinks a{white-space:nowrap!important;padding:9px 10px!important;}
    @media(max-width:1320px) and (min-width:1181px){
      .brand{width:280px!important;min-width:280px!important;flex-basis:280px!important;}
      .brand>img{width:280px!important;height:82px!important;max-width:280px!important;max-height:82px!important;}
      .nav{gap:12px!important;}
      .navlinks a{padding:9px 8px!important;font-size:15px!important;}
    }
    @media(max-width:1180px){
      .nav{min-height:94px!important;padding-block:6px!important;}
      .brand{width:285px!important;min-width:0!important;height:80px!important;flex:0 1 285px!important;}
      .brand>img{width:285px!important;height:80px!important;max-width:285px!important;max-height:80px!important;}
      .navlinks{display:none!important;top:94px!important;}
      .navlinks.open{display:flex!important;}
    }
    @media(max-width:680px){
      .nav{min-height:84px!important;padding-block:5px!important;}
      .brand{width:min(250px,72vw)!important;height:72px!important;flex:0 1 auto!important;}
      .brand>img{width:100%!important;height:72px!important;max-width:100%!important;max-height:72px!important;}
      .navlinks{top:84px!important;}
    }
  `;
  document.head.appendChild(headerStyle);
})();

/* Responsive campaign artwork: desktop keeps the dark copy-safe composition; tablet/mobile uses the dedicated full campaign composition. */
(()=>{
  const campaignStyle=document.createElement('style');
  campaignStyle.textContent=`
    .campaign-hero-bg{background-image:url('/assets/images/kcm-2027-hero-desktop.png')!important;background-position:center center!important;}
    .campaign-hero-bg::after{content:"";position:absolute;inset:0;display:block!important;pointer-events:none;z-index:1;background:linear-gradient(to bottom,#002542 0%,rgba(0,37,66,.96) 2.5%,rgba(0,37,66,.72) 7%,rgba(0,37,66,.28) 12%,rgba(0,37,66,0) 19%,rgba(0,37,66,0) 76%,rgba(0,37,66,.28) 84%,rgba(0,37,66,.72) 91%,rgba(0,37,66,.96) 97%,#002542 100%),linear-gradient(to right,#002542 0%,rgba(0,37,66,.96) 5%,rgba(0,37,66,.78) 13%,rgba(0,37,66,.42) 24%,rgba(0,37,66,.12) 34%,rgba(0,37,66,0) 43%);}
    /* At laptop/common desktop widths the artwork is contained inside the taller hero. Fade at the actual image boundaries, not the hero boundaries. */
    @media(min-width:901px) and (max-width:1600px){
      .campaign-hero-bg::after{background:linear-gradient(to bottom,#002542 0%,#002542 11%,rgba(0,37,66,.98) 14%,rgba(0,37,66,.78) 17%,rgba(0,37,66,.38) 20%,rgba(0,37,66,0) 25%,rgba(0,37,66,0) 75%,rgba(0,37,66,.38) 80%,rgba(0,37,66,.78) 83%,rgba(0,37,66,.98) 86%,#002542 89%,#002542 100%),linear-gradient(to right,#002542 0%,rgba(0,37,66,.98) 5%,rgba(0,37,66,.82) 13%,rgba(0,37,66,.46) 24%,rgba(0,37,66,.14) 34%,rgba(0,37,66,0) 44%);}
    }
    @media(max-width:900px){
      .campaign-hero-bg{background-image:url('/assets/images/kcm-2027-hero-mobile.png')!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:center center!important;background-color:#002542!important;}
      .campaign-hero-bg::after{display:none!important;}
    }
  `;
  document.head.appendChild(campaignStyle);
})();

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.brand img').forEach(img=>{
    img.src='/assets/images/kcr-logo-clean.png?v=20261008d';
    img.alt='Kingston City Marathon';
    img.removeAttribute('width');
    img.removeAttribute('height');
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
