window.CL = (function(){
  const SVGNS = 'http://www.w3.org/2000/svg';
  const SPEED = 1.6;
  const DONE_PREFIX = 'codelab_done_';

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

  function isDone(key){ return localStorage.getItem(DONE_PREFIX+key) === '1'; }

  function markDone(key){
    localStorage.setItem(DONE_PREFIX+key, '1');
    document.querySelectorAll('.tool[data-key="'+key+'"]').forEach(t=>{
      t.classList.add('done');
      if (!/^✅/.test(t.textContent)) t.textContent = '✅ ' + t.textContent.replace(/^[^\s]+\s/,'');
    });
  }

  function renderToolbox(activeKey, hostId){
    const host = $(hostId||'toolbox');
    if (!host) return;
    let html = '<span class="lbl">🎒 Hộp đồ nghề:</span>';
    STATIONS.forEach(s=>{
      const active = s.key === activeKey;
      const done = isDone(s.key);
      const cls = ['tool', active?'active':'', done?'done':''].filter(Boolean).join(' ');
      const label = done ? ('✅ '+s.label) : (s.icon+' '+s.label);
      html += `<a class="${cls}" data-key="${s.key}" href="${s.href}">${label}</a>`;
    });
    host.innerHTML = html;
  }

  function initQuiz(quizId, stationKey, answers){
    const quiz = $(quizId);
    if (!quiz) return;
    const fb = quiz.querySelector('.fb');
    quiz.querySelectorAll('button[data-a]').forEach(btn=>{
      btn.onclick = () => {
        const a = answers[btn.dataset.a];
        if (!a) return;
        fb.style.display = 'block';
        fb.className = 'fb ' + (a.ok ? 'ok' : 'no');
        fb.innerHTML = (a.ok ? '✔ ' : '✘ ') + a.msg;
        if (a.ok) markDone(stationKey);
      };
    });
  }

  return { STATIONS, SPEED, $, sleep, nap, renderCode, hl, narrate, lock, svg, clear,
           renderToolbox, isDone, markDone, initQuiz };
})();
