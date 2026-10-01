document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('.menu-toggle'),n=document.querySelector('.navlinks');
  if(t&&n){
    t.setAttribute('aria-expanded','false');
    const setMenu=open=>{n.classList.toggle('open',open);t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close menu':'Open menu');};
    t.addEventListener('click',()=>setMenu(!n.classList.contains('open')));
    n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
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
