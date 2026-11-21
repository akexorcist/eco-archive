(function () {
  var root = document.documentElement;

  // theme
  var themeBtn = document.getElementById('themebtn');
  var themeMenu = document.getElementById('thememenu');
  var icons = { system: 'i-auto', light: 'i-sun', dark: 'i-moon' };
  function applyTheme(mode) {
    if (mode === 'system') { root.removeAttribute('data-theme'); localStorage.removeItem('theme'); }
    else { root.setAttribute('data-theme', mode); localStorage.setItem('theme', mode); }
    themeMenu.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.mode === mode)); });
    themeBtn.querySelector('use').setAttribute('href', '#' + icons[mode]);
    themeBtn.setAttribute('aria-label', 'Theme: ' + mode);
  }
  function closeThemeMenu(focus) { themeMenu.hidden = true; themeBtn.setAttribute('aria-expanded', 'false'); if (focus) themeBtn.focus(); }
  applyTheme(localStorage.getItem('theme') || 'system');
  themeBtn.addEventListener('click', function () {
    var open = themeMenu.hidden;
    themeMenu.hidden = !open; themeBtn.setAttribute('aria-expanded', String(open));
    if (open) (themeMenu.querySelector('[aria-checked=true]') || themeMenu.querySelector('button')).focus();
  });
  themeMenu.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    applyTheme(b.dataset.mode); closeThemeMenu(true);
  });
  themeMenu.addEventListener('keydown', function (e) {
    var items = Array.prototype.slice.call(themeMenu.querySelectorAll('button'));
    var i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i + items.length - 1) % items.length].focus(); }
    if (e.key === 'Escape') closeThemeMenu(true);
    if (e.key === 'Tab') closeThemeMenu(false);
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.thememenu')) closeThemeMenu(false); });

  // navigation drawer (modal on small screens)
  var drawer = document.getElementById('drawer');
  var menuBtn = document.getElementById('menubtn');
  var scrim = document.getElementById('scrim');
  function setDrawer(open) {
    drawer.classList.toggle('open', open); scrim.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open));
    if (open) drawer.querySelector('.head button').focus(); else menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () { setDrawer(true); });
  drawer.querySelector('.head button').addEventListener('click', function () { setDrawer(false); });
  scrim.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });
  var cur = drawer.querySelector('[aria-current=page]');
  if (cur) cur.scrollIntoView({ block: 'center' });

  // top bar tint on scroll
  var bar = document.querySelector('.topbar');
  function onScroll() { bar.classList.toggle('scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // search (combobox)
  var input = document.getElementById('q');
  var list = document.getElementById('results');
  var index = window.SEARCH_INDEX || [];
  var active = -1;
  function norm(s) { return s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, ''); }
  function render() {
    var q = norm(input.value.trim());
    list.innerHTML = ''; active = -1;
    if (!q) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
    var hits = index.map(function (p) {
      var t = norm(p.t), a = norm(p.a || '');
      var score = t.indexOf(q) === 0 ? 3 : t.indexOf(q) >= 0 ? 2 : a.indexOf(q) >= 0 ? 1 : 0;
      return { p: p, s: score };
    }).filter(function (x) { return x.s; }).sort(function (x, y) { return y.s - x.s || x.p.t.localeCompare(y.p.t); }).slice(0, 8);
    if (!hits.length) list.innerHTML = '<li class="none" role="option" aria-disabled="true">No pages found</li>';
    hits.forEach(function (h, i) {
      var li = document.createElement('li');
      li.id = 'r' + i; li.setAttribute('role', 'option'); li.setAttribute('aria-selected', 'false');
      var a = document.createElement('a'); a.href = h.p.u; a.tabIndex = -1;
      a.textContent = h.p.t;
      var s = document.createElement('span'); s.textContent = h.p.c; a.appendChild(s);
      li.appendChild(a); list.appendChild(li);
    });
    list.hidden = false; input.setAttribute('aria-expanded', 'true');
  }
  function move(d) {
    var opts = list.querySelectorAll('[aria-selected]'); if (!opts.length) return;
    if (active >= 0) opts[active].setAttribute('aria-selected', 'false');
    active = (active + d + opts.length) % opts.length;
    opts[active].setAttribute('aria-selected', 'true'); input.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  }
  input.addEventListener('input', render);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') {
      var opts = list.querySelectorAll('[aria-selected] a');
      var pick = opts[active >= 0 ? active : 0]; if (pick) { e.preventDefault(); location.href = pick.href; }
    } else if (e.key === 'Escape') { input.value = ''; render(); }
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) { list.hidden = true; input.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); input.focus(); }
  });

  // carousels
  document.querySelectorAll('.carousel').forEach(function (car) {
    var track = car.querySelector('.outfits');
    var prev = car.querySelector('.prev'), next = car.querySelector('.next');
    var step = function () { var c = track.querySelector('.outfit'); return c ? c.getBoundingClientRect().width + 24 : 300; };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      car.querySelector('.carnav').hidden = max <= 1;
      prev.disabled = track.scrollLeft <= 1; next.disabled = track.scrollLeft >= max - 1;
      track.classList.toggle('fade-l', track.scrollLeft > 1);
      track.classList.toggle('fade-r', track.scrollLeft < max - 1);
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); update();
  });

  // plain sideways scrollers: fade the edge that has more content
  document.querySelectorAll('.hscroll').forEach(function (track) {
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      track.classList.toggle('fade-l', track.scrollLeft > 1);
      track.classList.toggle('fade-r', track.scrollLeft < max - 1);
    };
    track.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); update();
  });

  // expand / collapse all skills
  document.querySelectorAll('[data-skills]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var head = btn.closest('.secthead');
      var wrap = head && head.nextElementSibling;
      while (wrap && !wrap.classList.contains('skwrap')) wrap = wrap.nextElementSibling;
      if (!wrap) return;
      wrap.querySelectorAll('details.skill').forEach(function (d) { d.open = btn.dataset.skills === 'open'; });
    });
  });

  // expand / collapse all SAGA cards (Story Overview)
  document.querySelectorAll('[data-sagas]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('details.sagacard').forEach(function (d) { d.open = btn.dataset.sagas === 'open'; });
    });
  });

  // tabs
  var tablist = document.querySelector('[role=tablist]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role=tab]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
      history.replaceState(null, '', '#' + tab.dataset.hash);
    };
    tablist.addEventListener('click', function (e) { var t = e.target.closest('[role=tab]'); if (t) select(t); });
    tablist.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (e.key === 'ArrowRight') { e.preventDefault(); select(tabs[(i + 1) % tabs.length], true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i + tabs.length - 1) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
    });
    var start = tabs.filter(function (t) { return '#' + t.dataset.hash === location.hash; })[0];
    if (start) select(start);
  }

  // table of contents scroll spy
  var links = document.querySelectorAll('.toc a');
  var heads = document.querySelectorAll('.content h2[id]');
  function spy() {
    var pick = heads.length ? heads[0].id : null;
    heads.forEach(function (h) { if (h.getBoundingClientRect().top < 160) pick = h.id; });
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + pick;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  if (links.length) { window.addEventListener('scroll', spy, { passive: true }); spy(); }

  // NPC picture tooltip: hover or focus a name with data-pic
  var tip = document.createElement('div');
  tip.className = 'pictip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true;
  var tipImg = document.createElement('img'); tipImg.alt = '';
  var tipBox = document.createElement('div'); tipBox.className = 'pictip-box';
  var tipCell = document.createElement('span'); tipCell.className = 'pictip-cell';
  var tipPin = document.createElement('span'); tipPin.className = 'pictip-pin';
  var tipCap = document.createElement('div'); tipCap.className = 'pictip-cap';
  tipBox.appendChild(tipImg); tipBox.appendChild(tipCell); tipBox.appendChild(tipPin);
  // mapspot mode: world map + cell on the left, minimap + pin on the right
  var tipWorld = document.createElement('div'); tipWorld.className = 'pictip-box pictip-world';
  var tipWorldImg = document.createElement('img'); tipWorldImg.alt = '';
  var tipWorldCell = document.createElement('span'); tipWorldCell.className = 'pictip-cell';
  tipWorld.appendChild(tipWorldImg); tipWorld.appendChild(tipWorldCell);
  var tipMaps = document.createElement('div'); tipMaps.className = 'pictip-maps';
  tipMaps.appendChild(tipWorld); tipMaps.appendChild(tipBox);
  tip.appendChild(tipMaps); tip.appendChild(tipCap); document.body.appendChild(tip);
  function sizeRoomImg() {
    // room tooltip: scale the (non-square) town minimap so its long side is 280px
    var room = tip.classList.contains('room') && tipImg.naturalWidth;
    var f = room ? 280 / Math.max(tipImg.naturalWidth, tipImg.naturalHeight) : 0;
    tipImg.style.width = room ? Math.round(tipImg.naturalWidth * f) + 'px' : '';
    tipImg.style.height = room ? Math.round(tipImg.naturalHeight * f) + 'px' : '';
  }
  var tipFor = null;
  function placeTip() {
    if (!tipFor) return;
    var r = tipFor.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
    var y = r.top - h - 8 >= 8 ? r.top - h - 8 : r.bottom + 8;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function showTip(el) {
    tipFor = el;
    tipImg.onload = function () { sizeRoomImg(); placeTip(); };
    tip.classList.toggle('map', el.getAttribute('data-tip') === 'map');
    var mode = el.getAttribute('data-tip'), world = mode === 'mapspot' && el.getAttribute('data-world');
    tip.classList.toggle('room', mode === 'room' || mode === 'mapspot');
    tipWorld.hidden = !world;
    if (world) {
      tipWorldImg.onload = placeTip; tipWorldImg.src = world;
      var wc = (el.getAttribute('data-cell') || '').split(',');
      tipWorldCell.style.left = wc[0] + '%'; tipWorldCell.style.top = wc[1] + '%';
    }
    tipImg.src = el.getAttribute('data-pic');
    tipImg.alt = el.textContent;
    sizeRoomImg();
    var pin = el.getAttribute('data-pin'), cap = el.getAttribute('data-cap');
    tipPin.hidden = !pin;
    if (pin) { pin = pin.split(','); tipPin.style.left = pin[0]; tipPin.style.top = pin[1]; }
    tipCap.hidden = !cap; tipCap.textContent = cap || '';
    var cell = pin ? null : el.getAttribute('data-cell');
    tipCell.hidden = !cell;
    if (cell) { cell = cell.split(','); tipCell.style.left = cell[0] + '%'; tipCell.style.top = cell[1] + '%'; }
    tip.hidden = false; placeTip();
  }
  function hideTip() { tipFor = null; tip.hidden = true; }
  document.addEventListener('mouseover', function (e) {
    var el = e.target.closest && e.target.closest('[data-pic]');
    if (el && el !== tipFor) showTip(el); else if (!el && tipFor) hideTip();
  });
  document.addEventListener('focusin', function (e) {
    var el = e.target.closest && e.target.closest('[data-pic]');
    if (el) showTip(el); else if (tipFor) hideTip();
  });
  document.addEventListener('focusout', function (e) { if (e.target === tipFor) hideTip(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && tipFor) hideTip(); });
  window.addEventListener('scroll', function () { if (tipFor) hideTip(); }, { passive: true });
})();

// ===== List filter component (.lf), the standard filter-and-list (2026-11-19). Used by Weapons & Armor, Monsters and Partners. =====
// List filter (.lf): search + filters + sortable list of <details class="lf-row">.
// Filter controls carry data-f="<key>". Matching, by data attributes on each row:
//   data-f="q"                    text in the row's data-n
//   <select data-f="k">           row data-<attr> (attr = option data-attr, else select data-attr, else k)
//                                 is a list split on "|" or space; matches the value, or the select's data-any value
//   <input type=number data-op>   max: row data-<k> <= value, min: row data-<k> >= value
// URL presets: ?<param>=<value> sets the control (param = data-param, else the key).
// Count word: root data-noun="item|items" (singular|plural). .lf-summary [data-lfx=open|close] open/close the shown rows only.
// Sorting: .lf-head buttons data-sort="<attr>" [data-num] [data-then="<attr>"]; root data-sort = default.
//   An optional <select data-sortsel> with the same values stays in sync with the header buttons. No group headings.
// Design preview pages (body.pv) carry their own inline copy, so this one stays off there.
(function () {
  if (document.body.classList.contains('pv')) return;
  document.querySelectorAll('.lf').forEach(function (root) {
    if (root.dataset.lfReady) return;
    root.dataset.lfReady = '1';
    var list = root.querySelector('.lf-list');
    var rows = [].slice.call(list.querySelectorAll('.lf-row'));
    var controls = [].slice.call(root.querySelectorAll('[data-f]'));
    var more = root.querySelector('.lf-more'), toggle = root.querySelector('.lf-moretoggle');
    var sortBtns = [].slice.call(root.querySelectorAll('.lf-head [data-sort]'));
    var defSort = root.dataset.sort || 'name', sort = defSort, sorted = null;
    var count = root.querySelector('.lf-count'), empty = root.querySelector('.lf-empty');
    var sortSel = root.querySelector('[data-sortsel]');
    var xBtns = [].slice.call(root.querySelectorAll('.lf-summary [data-lfx]'));
    var noun = (root.dataset.noun || 'item|items').split('|');

    function parts(v) { return (v || '').split(/[| ]/).filter(Boolean); }
    function test(el, d) {
      var v = el.value.trim();
      if (!v) return true;
      if (el.dataset.f === 'q') return d.dataset.n.indexOf(v.toLowerCase().replace(/^■\s*/, '')) >= 0;
      if (el.dataset.op) {
        var n = +d.getAttribute('data-' + el.dataset.f);
        return el.dataset.op === 'max' ? n <= +v : n >= +v;
      }
      var opt = el.options[el.selectedIndex];
      var vals = parts(d.getAttribute('data-' + (opt.dataset.attr || el.dataset.attr || el.dataset.f)));
      return vals.indexOf(v) >= 0 || (!!el.dataset.any && vals.indexOf(el.dataset.any) >= 0);
    }
    function isOn(el) { return el.dataset.f !== 'q' && el.value.trim() !== ''; }
    function cmp(a, b) {
      var btn = sortBtns.filter(function (x) { return x.dataset.sort === sort; })[0] || {};
      var keys = [[sort, btn.hasAttribute && btn.hasAttribute('data-num')]];
      if (btn.dataset && btn.dataset.then) keys.push([btn.dataset.then, true]);
      keys.push(['name', false]);
      for (var i = 0; i < keys.length; i++) {
        var x = a.getAttribute('data-' + keys[i][0]) || '', y = b.getAttribute('data-' + keys[i][0]) || '';
        var c = keys[i][1] ? (+x) - (+y) : x.localeCompare(y);
        if (c) return c;
      }
      return 0;
    }
    function update() {
      var shown = [];
      rows.forEach(function (d) { var hit = controls.every(function (el) { return test(el, d); }); if (d.hidden === hit) d.hidden = !hit; if (hit) shown.push(d); });
      // all rows stay in sort order (hidden ones too), so filtering only flips hidden; rows move only when the sort changes
      if (sorted !== sort) {
        sorted = sort;
        var next = rows.slice().sort(cmp);
        if (next.some(function (d, i) { return d !== rows[i]; })) {
          var frag = document.createDocumentFragment();
          next.forEach(function (d) { frag.appendChild(d); });
          list.appendChild(frag);
        }
        rows = next;
      }
      var on = controls.filter(isOn).length;
      var moreOn = more ? [].filter.call(more.querySelectorAll('[data-f]'), isOn).length : 0;
      var q = controls.filter(function (el) { return el.dataset.f === 'q' && el.value.trim(); }).length;
      var total = rows.length.toLocaleString('en-US') + ' ' + (rows.length === 1 ? noun[0] : noun[1]);
      count.textContent = (shown.length === rows.length ? total : shown.length.toLocaleString('en-US') + ' of ' + total) +
        (on ? ' · ' + on + (on > 1 ? ' filters on' : ' filter on') : '');
      if (toggle) toggle.querySelector('.lf-morecount').textContent = moreOn ? '(' + moreOn + ' on)' : '';
      root.querySelectorAll('.lf-summary [data-reset]').forEach(function (b) { b.hidden = !(on || q); });
      controls.forEach(function (el) { var f = el.closest('.lf-field'); if (f) f.classList.toggle('on', isOn(el)); });
      empty.hidden = shown.length > 0;
      list.classList.toggle('none', !shown.length);
      xBtns.forEach(function (b) { b.disabled = !shown.length; });
      sortBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.sort === sort)); });
      if (sortSel) sortSel.value = sort;
    }
    function setMore(open) {
      more.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.lf-morelabel').textContent = open ? (toggle.dataset.less || 'Fewer filters') : (toggle.dataset.more || 'More filters');
    }

    root.addEventListener('input', function (e) { if (e.target.dataset.f) update(); });
    root.addEventListener('change', function (e) {
      if (e.target.dataset.f) update();
      else if (e.target === sortSel) { sort = sortSel.value; update(); }
    });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !root.contains(b)) return;
      if (b === toggle) setMore(more.hidden);
      else if (b.dataset.sort) { sort = b.dataset.sort; update(); }
      else if (b.dataset.lfx) { var o = b.dataset.lfx === 'open'; rows.forEach(function (d) { if (!d.hidden && d.open !== o) d.open = o; }); }
      else if (b.hasAttribute('data-reset')) {
        controls.forEach(function (el) { el.value = ''; });
        sort = defSort;
        update();
        root.querySelector('[data-f="q"]').focus();
      }
    });

    var qs = new URLSearchParams(location.search);
    controls.forEach(function (el) {
      var v = qs.get(el.dataset.param || el.dataset.f);
      if (v !== null && el.dataset.f !== 'q') el.value = v;
    });
    if (more && [].some.call(more.querySelectorAll('[data-f]'), isOn)) setMore(true);
    update();
    function openHash() {
      var id = decodeURIComponent(location.hash.slice(1)), target = id && document.getElementById(id);
      // an anchor inside a row (a merged duplicate's old id, .lpalias) opens that row
      if (target && !target.classList.contains('lf-row')) target = target.closest('.lf-row');
      if (target && root.contains(target)) {
        if (target.hidden) { controls.forEach(function (el) { el.value = ''; }); update(); }
        target.open = true; target.scrollIntoView();
      }
    }
    window.addEventListener('hashchange', openHash);
    openHash();
  });
  // .lf-cut: "Show all" / "Show fewer" for a long list in the opened detail
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lf-showall');
    if (!b) return;
    var box = b.closest('.lf-cut'), open = !box.classList.contains('open');
    box.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open));
    b.textContent = open ? 'Show fewer' : 'Show all';
  });
})();
