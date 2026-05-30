// === SLIDER ===
let currentSlide = 0;
const totalSlides = 4;
let autoSlideTimer;

function goToSlide(n) {
  currentSlide = n;
  document.getElementById('slides').style.transform = `translateX(-${n * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === n));
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  goToSlide(currentSlide);
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => changeSlide(1), 5000);
}

resetAutoSlide();

// === CURRENCY DATA ===
const rates = {
  nagd:    { USD:{buy:1.6940,sell:1.7005}, EUR:{buy:1.9454,sell:1.9912}, RUB:{buy:0.0218,sell:0.0238}, GBP:{buy:2.2596,sell:2.3375} },
  nagdsiz: { USD:{buy:1.6900,sell:1.7025}, EUR:{buy:1.9513,sell:2.0126}, RUB:{buy:0.0228,sell:0.0248}, GBP:{buy:2.2573,sell:2.3261} },
  kart:    { USD:{buy:1.6950,sell:1.7200}, EUR:{buy:1.9500,sell:2.0000}, RUB:{buy:0.0234,sell:0.0243}, GBP:{buy:2.2600,sell:2.3100} }
};
const flags = { USD:'🇺🇸', EUR:'🇪🇺', RUB:'🇷🇺', GBP:'🇬🇧' };
let activeTab = 'nagd';

function renderCurrencyTable(tab) {
  const data = rates[tab];
  const tbody = document.getElementById('currencyTableBody');
  tbody.innerHTML = Object.entries(data).map(([curr, r]) =>
    `<tr>
      <td><span class="flag">${flags[curr]}</span><span class="curr-name">${curr}</span></td>
      <td class="buy-price">${r.buy.toFixed(4)}</td>
      <td class="sell-price">${r.sell.toFixed(4)}</td>
    </tr>`
  ).join('');
}

function switchCurrTab(tab, btn) {
  activeTab = tab;
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCurrencyTable(tab);
  calcConvert();
}

renderCurrencyTable('nagd');

// === CALCULATOR ===
function calcConvert() {
  const fromAmt = parseFloat(document.getElementById('calcFrom').value) || 0;
  const fromCurr = document.getElementById('calcFromCurr').value;
  const toCurr = document.getElementById('calcToCurr').value;
  const data = rates[activeTab];

  let azn;
  if (fromCurr === 'AZN') azn = fromAmt;
  else azn = fromAmt * data[fromCurr].sell;

  let result;
  if (toCurr === 'AZN') result = azn;
  else result = azn / data[toCurr].sell;

  document.getElementById('calcTo').value = result.toFixed(2);
  document.getElementById('calcResultDisplay').textContent = `${result.toFixed(2)} ${toCurr}`;

  let rateText = '';
  if (fromCurr !== 'AZN' && toCurr === 'AZN') rateText = `1 ${fromCurr} = ${data[fromCurr].sell.toFixed(4)} AZN`;
  else if (fromCurr === 'AZN' && toCurr !== 'AZN') rateText = `1 ${toCurr} = ${data[toCurr].sell.toFixed(4)} AZN`;
  else rateText = `Cari məzənnəyə əsasən hesablanır`;
  document.getElementById('calcRateDisplay').textContent = rateText;
}

function swapCalc() {
  const fc = document.getElementById('calcFromCurr');
  const tc = document.getElementById('calcToCurr');
  const fa = document.getElementById('calcFrom');
  const ta = document.getElementById('calcTo');
  [fc.value, tc.value] = [tc.value, fc.value];
  [fa.value, ta.value] = [ta.value, fa.value];
  calcConvert();
}

calcConvert();

// === SEGMENT SWITCH ===
function switchSegment(seg, btn) {
  document.querySelectorAll('.segment-tabs button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  showToast(seg === 'ferdi' ? 'Fərdi bölməsinə keçildi' : 'Biznes bölməsinə keçildi');
}

// === MOBILE MENU ===
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !e.target.closest('.burger')) {
    menu.classList.remove('open');
  }
});

// === NAV ACTIVE STATE ===
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
    showToast(`${this.textContent} bölməsinə yönləndirilirsiniz...`);
  });
});

// === TOAST ===
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// === KEYBOARD NAVIGATION FOR SLIDER ===
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

// Touch swipe for slider
let touchStartX = 0;
document.querySelector('.hero').addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.querySelector('.hero').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
});