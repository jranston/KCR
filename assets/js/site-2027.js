document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('.menu-toggle'), n=document.querySelector('.navlinks');
  if(t&&n){t.addEventListener('click',()=>n.classList.toggle('open'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')));}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const carousel=document.querySelector('[data-photo-carousel]');
  if(carousel){
    const track=carousel.querySelector('.photo-track'),slides=[...carousel.querySelectorAll('.photo-slide')],dots=[...carousel.querySelectorAll('.photo-dot')];let current=0,timer;
    const show=i=>{current=(i+slides.length)%slides.length;track.style.transform=`translateX(-${current*100}%)`;dots.forEach((d,j)=>d.classList.toggle('active',j===current));};
    const autoplay=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),5000);};
    carousel.querySelector('[data-prev]')?.addEventListener('click',()=>{show(current-1);autoplay()});carousel.querySelector('[data-next]')?.addEventListener('click',()=>{show(current+1);autoplay()});dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);autoplay()}));
    show(0);autoplay();
  }
});
