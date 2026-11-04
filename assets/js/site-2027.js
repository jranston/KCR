/* Header logo: explicitly override the legacy CSS content replacement with the approved logo. */
(()=>{
  const headerStyle=document.createElement('style');
  headerStyle.textContent=`
    .nav{min-height:104px!important;padding-block:8px!important;gap:20px!important;}
    .brand{width:320px!important;min-width:320px!important;height:88px!important;flex:0 0 320px!important;display:flex!important;align-items:center!important;overflow:visible!important;}
    .brand>img{content:url('/assets/images/kcr-logo-clean.png?v=20261008d')!important;display:block!important;width:320px!important;height:88px!important;max-width:320px!important;max-height:88px!important;object-fit:contain!important;object-position:left center!important;background:transparent!important;border:0!important;outline:0!important;box-shadow:none!important;}
    .navlinks{flex:1 1 auto!important;min-width:0!important;display:flex;flex-wrap:nowrap!important;align-items:center!important;justify-content:flex-end!important;gap:3px!important;}
    .navlinks a{white-space:nowrap!important;padding:9px 10px!important;}
    .kcr-social-links{display:flex!important;align-items:center!important;gap:10px!important;margin-top:14px!important}.kcr-social-links a{width:38px!important;height:38px!important;border-radius:50%!important;display:grid!important;place-items:center!important;border:1px solid rgba(255,255,255,.3)!important;color:#fff!important;transition:background .18s ease,border-color .18s ease,transform .18s ease}.kcr-social-links a:hover,.kcr-social-links a:focus-visible{background:#f3b61f!important;border-color:#f3b61f!important;color:#001b33!important;transform:translateY(-2px)}.kcr-social-links svg{width:19px!important;height:19px!important;display:block!important;fill:currentColor!important}
    @media(max-width:1320px) and (min-width:1181px){.brand{width:280px!important;min-width:280px!important;flex-basis:280px!important}.brand>img{width:280px!important;height:82px!important;max-width:280px!important;max-height:82px!important}.nav{gap:12px!important}.navlinks a{padding:9px 7px!important;font-size:14px!important}}
    @media(max-width:1180px){.nav{min-height:94px!important;padding-block:6px!important}.brand{width:285px!important;min-width:0!important;height:80px!important;flex:0 1 285px!important}.brand>img{width:285px!important;height:80px!important;max-width:285px!important;max-height:80px!important}.navlinks{display:none!important;top:94px!important}.navlinks.open{display:flex!important}}
    @media(max-width:680px){.nav{min-height:84px!important;padding-block:5px!important}.brand{width:min(250px,72vw)!important;height:72px!important;flex:0 1 auto!important}.brand>img{width:100%!important;height:72px!important;max-width:100%!important;max-height:72px!important}.navlinks{top:84px!important}}
  `;
  document.head.appendChild(headerStyle);
})();

/* Responsive campaign artwork: desktop keeps the dark copy-safe composition; tablet/mobile uses the dedicated full campaign composition. */
(()=>{
  const campaignStyle=document.createElement('style');
  campaignStyle.textContent=`
    .campaign-hero-bg{background-image:url('/assets/images/kcm-2027-hero-desktop.png')!important;background-position:center center!important;}
    .campaign-hero-bg::after{content:"";position:absolute;inset:0;display:block!important;pointer-events:none;z-index:1;background:linear-gradient(to bottom,#002542 0%,rgba(0,37,66,.96) 2.5%,rgba(0,37,66,.72) 7%,rgba(0,37,66,.28) 12%,rgba(0,37,66,0) 19%,rgba(0,37,66,0) 76%,rgba(0,37,66,.28) 84%,rgba(0,37,66,.72) 91%,rgba(0,37,66,.96) 97%,#002542 100%),linear-gradient(to right,#002542 0%,rgba(0,37,66,.96) 5%,rgba(0,37,66,.78) 13%,rgba(0,37,66,.42) 24%,rgba(0,37,66,.12) 34%,rgba(0,37,66,0) 43%);}
    @media(min-width:901px) and (max-width:1600px){.campaign-hero-bg::after{background:linear-gradient(to bottom,#002542 0%,#002542 11%,rgba(0,37,66,.98) 14%,rgba(0,37,66,.78) 17%,rgba(0,37,66,.38) 20%,rgba(0,37,66,0) 25%,rgba(0,37,66,0) 75%,rgba(0,37,66,.38) 80%,rgba(0,37,66,.78) 83%,rgba(0,37,66,.98) 86%,#002542 89%,#002542 100%),linear-gradient(to right,#002542 0%,rgba(0,37,66,.98) 5%,rgba(0,37,66,.82) 13%,rgba(0,37,66,.46) 24%,rgba(0,37,66,.14) 34%,rgba(0,37,66,0) 44%);}}
    @media(max-width:900px){.campaign-hero-bg{background-image:url('/assets/images/kcm-2027-hero-mobile.png')!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:center center!important;background-color:#002542!important}.campaign-hero-bg::after{display:none!important}}
  `;
  document.head.appendChild(campaignStyle);
})();

const ensureSiteChrome=()=>{
  document.querySelectorAll('.navlinks').forEach(nav=>{
    if(!nav.querySelector('a[href="/volunteer/"]')){
      const contact=nav.querySelector('a[href="/contact/"]')?.closest('li');
      const li=document.createElement('li');
      li.setAttribute('data-kcr-volunteer-nav','true');
      li.innerHTML='<a href="/volunteer/">Volunteer</a>';
      if(contact)nav.insertBefore(li,contact);else nav.appendChild(li);
    }
  });
  document.querySelectorAll('.footer').forEach(footer=>{
    const columns=[...footer.querySelectorAll('.footer-top > div')];
    const quick=columns.find(col=>/quick links|explore/i.test(col.querySelector('h4')?.textContent||''));
    if(quick){
      const heading=quick.querySelector('h4');
      if(heading&&/explore/i.test(heading.textContent||''))heading.textContent='Quick Links';
      const p=quick.querySelector('p')||quick.appendChild(document.createElement('p'));
      if(!p.querySelector('a[href="/travel/"]'))p.insertAdjacentHTML('beforeend','<br><a href="/travel/">Travel</a>');
      if(!p.querySelector('a[href="/volunteer/"]'))p.insertAdjacentHTML('beforeend','<br><a href="/volunteer/">Volunteer</a>');
    }
    if(!footer.querySelector('.kcr-social-links')){
      const contact=columns.find(col=>/contact/i.test(col.querySelector('h4')?.textContent||''))||columns[0];
      if(contact){
        const social=document.createElement('div');
        social.className='kcr-social-links';
        social.setAttribute('aria-label','Kingston City Marathon social media');
        social.innerHTML='<a href="https://www.facebook.com/KingstonCityRun/" target="_blank" rel="noopener noreferrer" aria-label="Kingston City Run on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .28-1.68 1.75-1.68H17V2.45c-.3-.04-1.35-.13-2.57-.13-2.55 0-4.3 1.56-4.3 4.42V9.5H7.25V13h2.88v9h3.37Z"/></svg></a><a href="https://www.instagram.com/kingstoncitymarathon" target="_blank" rel="noopener noreferrer" aria-label="Kingston City Marathon on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.18 2A3.02 3.02 0 0 0 4 7.02v9.96A3.02 3.02 0 0 0 7.02 20h9.96A3.02 3.02 0 0 0 20 16.98V7.02A3.02 3.02 0 0 0 16.98 4H7.02ZM17.5 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></a>';
        contact.appendChild(social);
      }
    }
  });
};

/* Apply the shared navigation/footer additions immediately when possible and again after load. */
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureSiteChrome,{once:true});else ensureSiteChrome();
window.addEventListener('load',ensureSiteChrome,{once:true});
setTimeout(ensureSiteChrome,250);

document.addEventListener('DOMContentLoaded',()=>{
  ensureSiteChrome();
  document.querySelectorAll('.brand img').forEach(img=>{img.src='/assets/images/kcr-logo-clean.png?v=20261008d';img.alt='Kingston City Marathon';img.removeAttribute('width');img.removeAttribute('height')});

  const themeImage=document.querySelector('.theme-photo-panel img');
  if(themeImage){themeImage.src='/assets/images/kcr-theme-2027-final-v2.png';themeImage.alt='Kingston City Marathon 2027 Pirates versus Heroes campaign featuring a diverse group of runners in Kingston'}

  /* Travel advisor content is authored in travel/index.html so campaign offers and dates are not overwritten at runtime. */

  /* Travel page: turn the spectator copy into a more inviting race-day feature using an existing 2026 gallery image. */
  const spectatorSection=document.querySelector('#spectators');
  if(spectatorSection){
    const spectatorCard=spectatorSection.querySelector('.card');
    if(spectatorCard){
      const spectatorStyle=document.createElement('style');
      spectatorStyle.textContent=`
        #spectators .section-head{max-width:760px;margin-bottom:28px}
        .spectator-feature{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);padding:0!important;overflow:hidden;border:0!important;box-shadow:0 18px 50px rgba(0,27,51,.12)}
        .spectator-photo{position:relative;min-height:430px;background:#001b33;overflow:hidden}
        .spectator-photo img{width:100%;height:100%;position:absolute;inset:0;display:block;object-fit:cover;object-position:center}
        .spectator-photo::after{content:"";position:absolute;inset:auto 0 0;height:42%;background:linear-gradient(to top,rgba(0,27,51,.72),transparent);pointer-events:none}
        .spectator-photo-label{position:absolute;left:24px;bottom:22px;z-index:1;color:#fff;font-family:Montserrat,sans-serif;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        .spectator-content{padding:38px 40px;display:flex;flex-direction:column;justify-content:center}
        .spectator-lead{font-size:18px;line-height:1.65;color:#16324a;margin:0 0 24px}
        .spectator-tips{display:grid;gap:14px;margin:0}
        .spectator-tip{display:grid;grid-template-columns:38px 1fr;gap:13px;align-items:start;padding-top:14px;border-top:1px solid #e3e8ec}
        .spectator-tip:first-child{border-top:0;padding-top:0}
        .spectator-tip-icon{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#f3b61f;color:#001b33;font-weight:900;font-size:18px}
        .spectator-tip strong{display:block;font-family:Montserrat,sans-serif;color:#001b33;margin-bottom:3px}.spectator-tip p{margin:0;color:#52616d;line-height:1.55}
        @media(max-width:820px){.spectator-feature{grid-template-columns:1fr}.spectator-photo{min-height:340px}.spectator-content{padding:30px 26px}}
        @media(max-width:520px){.spectator-photo{min-height:270px}.spectator-content{padding:26px 20px}.spectator-lead{font-size:16px}}
      `;
      document.head.appendChild(spectatorStyle);
      spectatorCard.classList.add('spectator-feature');
      spectatorCard.innerHTML=`
        <div class="spectator-photo"><img src="/assets/images/gallery/homepage-2026-01.jpg" alt="Kingston City Run race-day energy" loading="lazy" decoding="async"><div class="spectator-photo-label">Bring the energy · Kingston City Run</div></div>
        <div class="spectator-content">
          <p class="spectator-lead">You don't have to be running to be part of race day. Follow your runner around the course, bring the energy and help make every kilometre memorable.</p>
          <div class="spectator-tips">
            <div class="spectator-tip"><div class="spectator-tip-icon">1</div><div><strong>Plan your viewing points</strong><p>Know your runner's expected pace and choose where you want to see them along the course and at the finish.</p></div></div>
            <div class="spectator-tip"><div class="spectator-tip-icon">2</div><div><strong>Make some noise</strong><p>Create a sign your runner can spot easily and cheer loudly as runners make their way through Kingston.</p></div></div>
            <div class="spectator-tip"><div class="spectator-tip-icon">3</div><div><strong>Meet them at the finish</strong><p>Time your final move so you're there to celebrate when your marathoner or half marathoner crosses the finish line.</p></div></div>
          </div>
        </div>`;
    }
  }

  const t=document.querySelector('.menu-toggle'),n=document.querySelector('.navlinks');
  if(t&&n){t.setAttribute('aria-expanded','false');const setMenu=open=>{n.classList.toggle('open',open);t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close menu':'Open menu')};t.addEventListener('click',()=>setMenu(!n.classList.contains('open')));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)))}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href||href.startsWith('#'))return;try{const url=new URL(href,window.location.href);if((url.protocol==='http:'||url.protocol==='https:')&&url.origin!==window.location.origin){a.target='_blank';const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));rel.add('noopener');rel.add('noreferrer');a.setAttribute('rel',[...rel].join(' '))}}catch(e){}});

  const heroButtons=document.querySelector('.campaign-copy > .btns');
  if(heroButtons){const heroStyle=document.createElement('style');heroStyle.textContent=`@media (min-width:681px){.campaign-copy>.btns{display:flex!important;flex-flow:row nowrap!important;align-items:center!important;gap:10px!important;width:max-content!important;max-width:none!important}.campaign-copy>.btns .btn{flex:0 0 auto!important;white-space:nowrap!important;padding:12px 16px!important;font-size:13px!important;gap:8px!important}}@media (min-width:1181px){.campaign-copy>.btns .btn{padding:13px 18px!important;font-size:13.5px!important}}`;document.head.appendChild(heroStyle)}

  const carousel=document.querySelector('[data-photo-carousel]');
  if(carousel){const track=carousel.querySelector('.photo-track'),slides=[...carousel.querySelectorAll('.photo-slide')],dots=[...carousel.querySelectorAll('.photo-dot')];const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let current=0,timer;const show=i=>{current=(i+slides.length)%slides.length;track.style.transform=`translateX(-${current*100}%)`;dots.forEach((d,j)=>{d.classList.toggle('active',j===current);d.setAttribute('aria-current',j===current?'true':'false')})};const stop=()=>clearInterval(timer);const autoplay=()=>{stop();if(!reduce)timer=setInterval(()=>show(current+1),5000)};carousel.querySelector('[data-prev]')?.addEventListener('click',()=>{show(current-1);autoplay()});carousel.querySelector('[data-next]')?.addEventListener('click',()=>{show(current+1);autoplay()});dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);autoplay()}));carousel.addEventListener('mouseenter',stop);carousel.addEventListener('mouseleave',autoplay);carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',autoplay);show(0);autoplay()}
});