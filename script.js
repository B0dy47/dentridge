// Ripple animation + مثال تصرّف عند الضغط
const btn = document.getElementById('applyBtn');

btn.addEventListener('click', (e) => {
  // Ripple
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  btn.appendChild(ripple);
  const rect = btn.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left) + 'px';
  ripple.style.top  = (e.clientY - rect.top)  + 'px';
  setTimeout(() => ripple.remove(), 450);

  // فعل رابط التقديم الحقيقي هنا (اختياري)
  // window.location.href = 'https://your-form-link.com';
});

// Inject ripple styles (خفيف)
const s = document.createElement('style');
s.textContent = `
  .cta .ripple{
    position:absolute; width:6px; height:6px; background:#ed1c2422;
    border-radius:999px; transform:translate(-50%,-50%); pointer-events:none;
    animation:ripple .45s ease-out;
  }
  @keyframes ripple{
    from{ opacity:1; transform:translate(-50%,-50%) scale(1) }
    to{ opacity:0; transform:translate(-50%,-50%) scale(30) }
  }
`;
document.head.appendChild(s);



// ===== Services: active card toggle with left/right arrows =====
(function(){
  const services = document.querySelector('.services');
  if(!services) return;

  const cards = Array.from(services.querySelectorAll('.service-card'));
  if(cards.length === 0) return;

  const prevBtn = services.querySelector('.services__nav .nav-btn--prev');
  const nextBtn = services.querySelector('.services__nav .nav-btn--next');
  const dotsWrap = services.querySelector('.services__nav .nav-dots');

  // Build dots dynamically to match cards count
  if(dotsWrap){
    dotsWrap.innerHTML = '';
    cards.forEach((_,i)=>{
      const d = document.createElement('span');
      d.className = 'dot';
      d.setAttribute('role','button');
      d.setAttribute('aria-label', 'Go to card ' + (i+1));
      d.addEventListener('click', ()=>setActive(i));
      dotsWrap.appendChild(d);
    });
  }

  // Determine initial active (first with --dark or 0)
  let current = Math.max(0, cards.findIndex(c => c.classList.contains('service-card--dark')));
  if(current === -1) current = 0;

  function applyClasses(){
    cards.forEach((c, i) => {
      c.classList.remove('service-card--dark','service-card--light');
      if(i === current){
        c.classList.add('service-card--dark');
      }else{
        c.classList.add('service-card--light');
      }
    });
    // update dots
    if(dotsWrap){
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
        d.classList.toggle('is-faded', i !== current);
      });
    }
  }

  function setActive(i){
    // wrap around for any number of cards
    current = (i + cards.length) % cards.length;
    applyClasses();
  }

  applyClasses(); // on load

  // Hook buttons
  prevBtn && prevBtn.addEventListener('click', () => setActive(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => setActive(current + 1));

  // Optional: card click also selects it
  cards.forEach((c, i) => c.addEventListener('click', () => setActive(i)));

  // Keyboard A11y
  services.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft'){ setActive(current-1); }
    if(e.key === 'ArrowRight'){ setActive(current+1); }
  });
})();
