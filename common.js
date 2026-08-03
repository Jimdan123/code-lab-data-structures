window.CL = (function(){
  const SVGNS = 'http://www.w3.org/2000/svg';
  const SPEED = 1.6;

  const STATIONS = [
    {key:'circular', href:'station-1-circular.html', icon:'🔄',  label:'Circular Buffer'},
    {key:'stack',    href:'station-2-stack.html',    icon:'📚',  label:'Stack'},
    {key:'hash',     href:'station-3-hash.html',     icon:'#️⃣', label:'Hash Table'},
    {key:'avl',      href:'station-4-avl.html',      icon:'🌳',  label:'AVL Tree'},
    {key:'segment',  href:'station-5-segment.html',  icon:'📊',  label:'Segment Tree'},
    {key:'quadtree', href:'station-6-quadtree.html', icon:'🗺️', label:'Quadtree'},
  ];

  function $(id){ return document.getElementById(id); }
  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  function nap(ms, mult){ return sleep(ms*SPEED*(mult||1)); }

  function renderCode(hostId, CODE){
    const b = $(hostId);
    b.innerHTML = '';
    CODE.forEach((c,i)=>{
      const d = document.createElement('div');
      d.className = 'cl';
      d.id = 'L'+i;
      d.innerHTML = (c && c[0]) || ' ';
      b.appendChild(d);
    });
  }

  function hl(...idx){
    document.querySelectorAll('.cl').forEach(e=>e.classList.remove('hl'));
    idx.forEach(i=>{ const e=$('L'+i); if(e) e.classList.add('hl'); });
  }

  function narrate(html, id){ $(id||'narr').innerHTML = html; }

  function lock(ids, bool){ ids.forEach(id=>{ const e=$(id); if(e) e.disabled = bool; }); }

  function svg(tag, attrs, children){
    const el = document.createElementNS(SVGNS, tag);
    attrs = attrs || {};
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    (children||[]).forEach(c=>{ if(c) el.appendChild(c); });
    return el;
  }
  function clear(svgId){ $(svgId).innerHTML = ''; }

  function renderToolbox(activeKey, hostId){
    const host = $(hostId||'toolbox');
    if (!host) return;
    let html = '<span class="lbl">🎒 Hộp đồ nghề:</span>';
    STATIONS.forEach(s=>{
      const cls = ['tool', s.key===activeKey?'active':''].filter(Boolean).join(' ');
      html += `<a class="${cls}" data-key="${s.key}" href="${s.href}">${s.icon} ${s.label}</a>`;
    });
    host.innerHTML = html;
  }

  // Two named panes (e.g. {theme:'themeView', tech:'techView'}) toggled by
  // buttons with data-view="<key>" inside the element at toggleId.
  function initViewToggle(toggleId, panes){
    const host = $(toggleId);
    if (!host) return;
    host.querySelectorAll('.vt-btn').forEach(btn=>{
      btn.onclick = () => {
        host.querySelectorAll('.vt-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        Object.keys(panes).forEach(k=>{ $(panes[k]).style.display = (k===view) ? '' : 'none'; });
      };
    });
  }

  return { STATIONS, SPEED, $, sleep, nap, renderCode, hl, narrate, lock, svg, clear,
           renderToolbox, initViewToggle };
})();
