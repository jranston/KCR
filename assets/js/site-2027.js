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

  /* Use the approved revised Pirates versus Heroes artwork in the homepage theme section. */
  const themeImage=document.querySelector('.theme-photo-panel img');
  if(themeImage){
    themeImage.src='/assets/images/kcr-theme-2027-final-v2.png';
    themeImage.alt='Kingston City Marathon 2027 Pirates versus Heroes campaign featuring a diverse group of runners in Kingston';
  }

  /* Travel page: give the three official travel advisors the same branded-card treatment as the Kingston hotels. */
  const advisorGrid=document.querySelector('#packages .grid.grid-3');
  if(advisorGrid){
    const advisorStyle=document.createElement('style');
    advisorStyle.textContent=`
      .advisor-card{display:flex;flex-direction:column;align-items:center;text-align:center;min-height:300px}
      .advisor-logo{height:105px;width:100%;display:flex;align-items:center;justify-content:center;margin-bottom:14px;padding:6px 12px}
      .advisor-wordmark{height:92px;width:100%;display:flex;align-items:center;justify-content:center;font-family:Montserrat,sans-serif;line-height:1}
      .advisor-card h3{margin-top:0}.advisor-card p{flex:1}.advisor-card .advisor-link{margin-top:12px}
      .go-wordmark{font-size:28px;font-weight:900;font-style:italic;letter-spacing:-.04em;color:#0878bd}.go-wordmark strong{color:#ef3d33}.go-wordmark small{display:block;font-size:11px;font-style:normal;letter-spacing:.12em;color:#16324a;margin-top:7px}
      .trafalgar-wordmark{font-family:Georgia,serif;font-size:38px;font-weight:700;font-style:italic;color:#c72026;text-shadow:0 1px 0 #7d1015}.trafalgar-wordmark small{display:block;font-family:Montserrat,sans-serif;font-size:10px;font-style:normal;letter-spacing:.2em;color:#333;margin-top:8px}
      .lfp-wordmark{flex-direction:column;color:#123b72}.lfp-wordmark .lfp{font-size:42px;font-weight:900;letter-spacing:-.05em}.lfp-wordmark .lfp-name{font-size:12px;font-weight:800;letter-spacing:.08em;margin-top:6px}.lfp-wordmark .lfp-tag{font-size:9px;font-weight:600;letter-spacing:.08em;color:#d67b20;margin-top:5px}
    `;
    document.head.appendChild(advisorStyle);
    advisorGrid.innerHTML=`
      <div class="card advisor-card">
        <div class="advisor-logo"><div class="advisor-wordmark go-wordmark" role="img" aria-label="GO! Jamaica Travel"><div><strong>GO!</strong> JAMAICA TRAVEL<small>TRAVEL COMPANY LIMITED</small></div></div></div>
        <h3>GO! Jamaica Travel</h3>
        <p>Kingston-based travel agency offering vacation packages, hotels, flights, tours, transfers and destination management services.</p>
        <a class="btn btn-primary advisor-link" href="https://gojamaicatravel.travel/" target="_blank" rel="noopener noreferrer">Visit Travel Advisor Website ↗</a>
      </div>
      <div class="card advisor-card">
        <div class="advisor-logo"><div class="advisor-wordmark trafalgar-wordmark" role="img" aria-label="Trafalgar Travel"><div>Trafalgar<small>TRAVEL LIMITED</small></div></div></div>
        <h3>Trafalgar Travel</h3>
        <p>Full-service Jamaican travel management company assisting with flights, hotels, car rentals, cruises, group travel and destination management.</p>
        <a class="btn btn-primary advisor-link" href="https://www.trafalgartmc.com/" target="_blank" rel="noopener noreferrer">Visit Travel Advisor Website ↗</a>
      </div>
      <div class="card advisor-card">
        <div class="advisor-logo"><div class="advisor-wordmark lfp-wordmark" role="img" aria-label="Leisure for Pleasure Holidays and Tours"><div class="lfp">LFP</div><div class="lfp-name">LEISURE FOR PLEASURE</div><div class="lfp-tag">HOLIDAYS &amp; TOURS</div></div></div>
        <h3>Leisure for Pleasure</h3>
        <p>Jamaican travel and destination management company offering hotel stays, vacation packages, island tours, transfers and customized experiences.</p>
        <a class="btn btn-primary advisor-link" href="https://leisureja.com/" target="_blank" rel="noopener noreferrer">Visit Travel Advisor Website ↗</a>
      </div>`;
  }

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
