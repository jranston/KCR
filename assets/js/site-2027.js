document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('.menu-toggle'), n=document.querySelector('.navlinks');
  if(t&&n){t.addEventListener('click',()=>n.classList.toggle('open'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')));}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});
