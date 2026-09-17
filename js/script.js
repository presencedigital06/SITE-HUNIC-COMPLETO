document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.header');
 const toggle=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.nav-menu');
 const setHeader=()=>header&&header.classList.toggle('scrolled',window.scrollY>12);
 setHeader(); window.addEventListener('scroll',setHeader,{passive:true});
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.classList.toggle('active',open);toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false')}));}
 const page=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.nav-menu a').forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('active')});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible','show');observer.unobserve(e.target)}}),{threshold:.1});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
 document.querySelectorAll('[data-gallery]').forEach(gallery=>{
   let images; try{images=JSON.parse(gallery.dataset.gallery)}catch{return}
   const image=gallery.querySelector('.gallery-image'),dots=gallery.querySelector('.gallery-dots'); let index=0;
   if(!image||!dots)return;
   images.forEach((_,i)=>{const dot=document.createElement('button');dot.className='dot'+(i===0?' active':'');dot.setAttribute('aria-label','Foto '+(i+1));dot.addEventListener('click',()=>show(i));dots.appendChild(dot)});
   function show(i){index=(i+images.length)%images.length;image.src=images[index];dots.querySelectorAll('.dot').forEach((d,n)=>d.classList.toggle('active',n===index))}
   gallery.querySelector('.gallery-prev')?.addEventListener('click',()=>show(index-1)); gallery.querySelector('.gallery-next')?.addEventListener('click',()=>show(index+1));
 });
 const carousel=document.querySelector('[data-property-carousel]');
 if(carousel){const cards=carousel.querySelectorAll('.property-card');const navDots=document.querySelector('.property-carousel-nav');let current=0;
   cards.forEach((card,i)=>{const dot=document.createElement('button');dot.className='dot'+(i===0?' active':'');dot.setAttribute('aria-label','Imóvel '+(i+1));dot.addEventListener('click',()=>showCard(i));navDots?.appendChild(dot)});
   function showCard(i){current=(i+cards.length)%cards.length;cards.forEach((c,n)=>c.style.display=n===current?'grid':'none');navDots?.querySelectorAll('.dot').forEach((d,n)=>d.classList.toggle('active',n===current));}
   carousel.querySelector('.prev')?.addEventListener('click',()=>showCard(current-1));carousel.querySelector('.next')?.addEventListener('click',()=>showCard(current+1));showCard(0);
 }
 const tabs=document.querySelectorAll('.tab');
 tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));tab.classList.add('active');document.getElementById(tab.dataset.tab)?.classList.add('active')}));
 document.querySelectorAll('.value').forEach(v=>v.addEventListener('click',()=>v.classList.toggle('open')));
});
