
// Helpers
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
async function loadJSON(url){ const res = await fetch(url); return await res.json(); }

function renderRow(title, items){
  const row = document.createElement('section');
  row.className = 'row container';
  row.innerHTML = `<h3>${title}</h3><div class="scroller" role="list"></div>`;
  const scroller = row.querySelector('.scroller');
  items.forEach(it=>{
    const a = document.createElement('a');
    a.href = 'movie.html?id='+encodeURIComponent(it.id);
    a.className='card';
    a.setAttribute('role','listitem');
    a.innerHTML = `<img class="poster" alt="${it.title} poster" loading="lazy" src="${it.poster}"/>
                   <div class="meta"><div class="kv"><div>${it.year}</div><div class="badge">${(it.genre||[]).join(' / ')}</div></div></div>`;
    scroller.appendChild(a);
  });
  return row;
}

function mountNav(){
  const nav = document.createElement('nav');
  nav.className='nav';
  nav.innerHTML = `
    <a class="brand" href="index.html" aria-label="Netflixlite Home">NETFLIX<span style="opacity:.6">lite</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav-links">Menu</button>
    <div id="nav-links" class="links">
      <a href="browse.html">Browse</a>
      <a href="profile.html">Profile</a>
    </div>
    <div class="right">
      <form action="browse.html" method="GET" class="searchbar">
        <label class="visually-hidden" for="q">Search</label>
        <input id="q" name="q" placeholder="Search titles..." />
      </form>
      <a class="btn btn-ghost" href="login.html">Sign in</a>
    </div>`;
  document.body.prepend(nav);
  const btn = nav.querySelector('.menu-btn');
  btn?.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}
document.addEventListener('DOMContentLoaded', ()=> mountNav());
