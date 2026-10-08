/* Apply the approved header artwork immediately. The base stylesheet still contains the
   legacy logo as a CSS content image, so this override must run before DOMContentLoaded. */
(()=>{
  const headerStyle=document.createElement('style');
  headerStyle.textContent=`
    .nav{min-height:100px!important;padding-block:8px!important;gap:16px!important;}
    .brand{min-width:285px!important;width:285px!important;height:84px!important;display:flex!important;align-items:center!important;overflow:visible!important;flex:0 0 285px!important;}
    .brand img{content:url('/assets/images/KCM%202027%20Logo.png')!important;width:285px!important;height:84px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:left center!important;display:block!important;background:transparent!important;border:0!important;box-shadow:none!important;image-rendering:auto!important;}
    .navlinks{flex:1 1 auto!important;min-width:0!important;gap:3px!important;}
    .navlinks a{white-space:nowrap!important;padding:9px 10px!important;}
    @media (max-width:1180px){
      .nav{min-height:94px!important;padding-block:7px!important;}
      .brand{min-width:260px!important;width:260px!important;height:78px!important;flex-basis:260px!important;}
      .brand img{width:260px!important;height:78px!important;}
      .navlinks{top:94px!important;}
    }
    @media (max-width:680px){
      .nav{min-height:84px!important;padding-block:5px!important;}
      .brand{min-width:0!important;width:min(245px,70vw)!important;height:72px!important;flex:0 1 auto!important;}
      .brand img{width:100%!important;height:72px!important;}
      .navlinks{top:84px!important;}
    }
  `;
  document.head.appendChild(headerStyle);
})();

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.brand img').forEach(img=>img.alt='Kingston City Marathon');

  const t=document.querySelector('.menu-toggle'),n=document.querySelector('.navlinks');
  if(t&&n){
    t.setAttribute('aria-expanded','false');
    const setMenu=open=>{n.classList.toggle('open',open);t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close menu':'Open menu');};
    t.addEventListener('click',()=>setMenu(!n.classList.contains('open')));
    n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  /* Keep visitors on KCR when following third-party website links. Internal links,
     mailto:, tel:, hashes and other non-http(s) schemes are left unchanged. */
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

  /* Homepage hero CTA row: the base hero copy is intentionally narrow for the artwork,
     so allow the CTA row itself to use the extra horizontal space on desktop/tablet. */
  const heroButtons=document.querySelector('.campaign-copy > .btns');
  if(heroButtons){
    const heroStyle=document.createElement('style');
    heroStyle.textContent=`
      @media (min-width:681px){
        .campaign-copy>.btns{
          display:flex!important;
          flex-flow:row nowrap!important;
          align-items:center!important;
          gap:10px!important;
          width:max-content!important;
          max-width:none!important;
        }
        .campaign-copy>.btns .btn{
          flex:0 0 auto!important;
          white-space:nowrap!important;
          padding:12px 16px!important;
          font-size:13px!important;
          gap:8px!important;
        }
      }
      @media (min-width:1181px){
        .campaign-copy>.btns .btn{
          padding:13px 18px!important;
          font-size:13.5px!important;
        }
      }
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
