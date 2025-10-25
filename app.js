/* EDIT HERE: coloque seu número no formato: 55DDDNÚMERO (ex: 5511999999999) */
const WHATSAPP_NUMBER = '55YOUR_WHATSAPP_NUMBER';

const PRODUCTS = [
  {
    id: 'p1',
    title: 'Legging Power',
    price: 129.9,
    category: 'feminino',
    phrase: 'Conquiste com estilo',
    imageUrl: 'assets/product1.jpg'
  },
  {
    id: 'p2',
    title: 'Camiseta Performance',
    price: 79.9,
    category: 'masculino',
    phrase: 'Vista sua força',
    imageUrl: 'assets/product2.jpg'
  },
  {
    id: 'p3',
    title: 'Suporte de Ginásio',
    price: 49.9,
    category: 'acessorios',
    phrase: 'Detalhes que inspiram',
    imageUrl: 'assets/product3.jpg'
  }
];

const cart = [];

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProducts(PRODUCTS);
  setupFilters();
  setupPopup();
});

function renderProducts(list){
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="muted">${p.phrase}</p>
      <div class="price">R$ ${p.price.toFixed(2)}</div>
      <button class="buy" data-id="${p.id}">Comprar</button>
    `;
    grid.appendChild(card);
  });
  document.querySelectorAll('.buy').forEach(b=>b.addEventListener('click', addToCart));
}

function addToCart(e){
  const id = e.currentTarget.dataset.id;
  const product = PRODUCTS.find(p=>p.id===id);
  cart.push(product);
  // feedback simples
  alert(`${product.title} adicionado ao carrinho`);
}

function setupFilters(){
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const f = btn.dataset.filter;
      if(f==='all') renderProducts(PRODUCTS);
      else renderProducts(PRODUCTS.filter(p=>p.category===f));
    });
  });
}

function getCartSummary(){
  if(cart.length===0) return 'Carrinho vazio';
  let text = 'Quero comprar:%0A';
  cart.forEach((c,i)=>{ text += `${i+1} - ${c.title} - R$ ${c.price.toFixed(2)}%0A`; });
  const total = cart.reduce((s,it)=>s+it.price,0);
  text += `%0ATotal: R$ ${total.toFixed(2)}`;
  return text;
}

function sendToWhatsApp(){
  const summary = getCartSummary();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${summary}`;
  window.open(url,'_blank');
}

// Popup
function setupPopup(){
  const seen = localStorage.getItem('casual_popup');
  if(seen==='shown') return;
  const popup = document.getElementById('popup');
  popup.classList.remove('hidden');
  popup.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      localStorage.setItem('casual_popup','shown');
      // opcional: gravar escolha
      localStorage.setItem('casual_choice', b.dataset.choice);
      popup.classList.add('hidden');
    });
  });
}

// exemplo: funçao para finalizar compra
window.finalizeOrder = function(){
  if(cart.length===0){ alert('Seu carrinho está vazio'); return; }
  sendToWhatsApp();
}
