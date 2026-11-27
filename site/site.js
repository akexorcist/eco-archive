// cookie consent + Google Analytics 4 (basic consent mode). Only active when the server provides
// ga-config.js setting window.ECO_GA_ID; without it there is no banner, no Cookie settings link and no Google request.
(function () {
  var id = window.ECO_GA_ID;
  if (typeof id !== 'string' || !/^G-[A-Z0-9]+$/.test(id)) return;
  var KEY = 'eco-consent', VERSION = 1;
  function readChoice() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return v && v.v === VERSION && (v.analytics === 'granted' || v.analytics === 'denied') ? v.analytics : null;
    } catch (e) { return null; }
  }
  function saveChoice(c) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: c, date: new Date().toISOString() })); } catch (e) {}
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
  var loaded = false;
  function startGA() {
    window['ga-disable-' + id] = false;
    if (loaded) { gtag('consent', 'update', { analytics_storage: 'granted' }); return; }
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('config', id);
  }
  function clearGA() {
    // _ga and _ga_<id without G->, on this host and every parent domain (GA's "auto" cookie domain is the top one)
    var names = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return n === '_ga' || n.indexOf('_ga_') === 0; });
    ['_ga', '_ga_' + id.slice(2)].forEach(function (n) { if (names.indexOf(n) < 0) names.push(n); });
    var parts = location.hostname.split('.'), domains = [''];
    for (var i = 0; i < parts.length; i++) domains.push(';domain=' + parts.slice(i).join('.'), ';domain=.' + parts.slice(i).join('.'));
    names.forEach(function (n) {
      domains.forEach(function (d) { document.cookie = n + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + d; });
    });
  }
  function stopGA() {
    window['ga-disable-' + id] = true;
    if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
    clearGA();
  }

  var bar, opener = null;
  function build() {
    bar = document.createElement('section');
    bar.className = 'consent';
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML = '<p id="consent-text">We use Google Analytics cookies to see which pages are used, only if you accept. '
      + '<a href="privacy.html">Privacy policy</a></p>'
      + '<div class="btns"><button type="button" class="btn" data-consent="granted" aria-describedby="consent-text">Accept</button>'
      + '<button type="button" class="btn" data-consent="denied" aria-describedby="consent-text">Reject</button></div>';
    bar.hidden = true;
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (!b) return;
      var c = b.getAttribute('data-consent');
      saveChoice(c);
      if (c === 'granted') startGA(); else stopGA();
      hide();
    });
    bar.addEventListener('keydown', function (e) { if (e.key === 'Escape' && opener && readChoice()) hide(); });
    document.body.appendChild(bar);
    if (window.ResizeObserver) new ResizeObserver(pad).observe(bar);
  }
  function pad() { document.body.style.setProperty('--consent-h', (bar.hidden ? 0 : bar.offsetHeight) + 'px'); }
  function show(from) {
    if (!bar) build();
    opener = from || null;
    bar.hidden = false;
    document.body.classList.add('has-consent');
    pad();
    if (opener) bar.querySelector('button').focus();
  }
  function hide() {
    bar.hidden = true;
    document.body.classList.remove('has-consent');
    pad();
    if (opener) { opener.focus(); opener = null; }
  }

  var choice = readChoice();
  if (choice === 'granted') startGA();
  else if (choice === 'denied') clearGA();
  function init() {
    document.querySelectorAll('[data-cookiebtn]').forEach(function (btn) {
      btn.hidden = false;
      btn.addEventListener('click', function () { show(btn); });
    });
    if (!choice) show();
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();

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
  // short placeholder when the full one would be cut off
  if (input && window.ResizeObserver) {
    var fullPh = input.placeholder, ctx = document.createElement('canvas').getContext('2d');
    var fitPh = function () {
      var cs = getComputedStyle(input);
      ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      var room = input.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var ph = ctx.measureText(fullPh).width <= room ? fullPh : 'Search…';
      if (input.placeholder !== ph) input.placeholder = ph;
    };
    new ResizeObserver(fitPh).observe(input);
    if (document.fonts) document.fonts.ready.then(fitPh);
  }
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
// pin name labels stay inside their minimap box: on phones every label is sized and shifted (wrapping onto more lines);
// on desktop only a label whose site.css placement would run past the box gets the same fit, the others keep their place (2026-11-22)
(function () {
  var mq = window.matchMedia('(max-width: 599px)'), ctx = document.createElement('canvas').getContext('2d'), GAP = 2;
  var PROPS = ['position', 'left', 'right', 'top', 'bottom', 'transform', 'width', 'max-width', 'min-width', 'white-space', 'padding', 'font', 'border', 'box-sizing', 'text-align', 'line-height', 'overflow-wrap', 'letter-spacing'];
  function spills(pin, cs, b) {
    var s = document.createElement('span');
    s.textContent = pin.getAttribute('data-name');
    PROPS.forEach(function (k) { s.style.setProperty(k, cs.getPropertyValue(k)); });
    s.style.visibility = 'hidden';
    pin.appendChild(s);
    var r = s.getBoundingClientRect();
    pin.removeChild(s);
    return r.left < b.left - 0.5 || r.right > b.right + 0.5;
  }
  function fit() {
    [].forEach.call(document.querySelectorAll('.pin.hl[data-name]'), function (pin) {
      if (!mq.matches) pin.classList.remove('fit');
      var box = pin.closest('.mmbox') || pin.parentElement, b = box.getBoundingClientRect(), p = pin.getBoundingClientRect();
      // a tiny minimap (Light Tower floors, 20-64px wide) can't hold a name: the Maps page's 256px frame around it is the box
      if (b.width < 120 && pin.closest('.lf-mmframe')) { box = pin.closest('.lf-mmframe'); b = box.getBoundingClientRect(); }
      // elsewhere (an NPC block's narrow map, e.g. the 20x70 Secret Passage) the label may stick out past the map, 180px around its centre
      else if (b.width < 120) { var c = b.left + b.width / 2; b = { left: c - 90, right: c + 90, width: 180 }; }
      if (!b.width || !p.width) return;
      var cs = getComputedStyle(pin, '::after');
      if (cs.display === 'none' || cs.content === 'none') return;
      if (!mq.matches && !spills(pin, cs, b)) return;
      ctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      var pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      var room = b.width - 2 * GAP, w = Math.min(Math.ceil(ctx.measureText(pin.getAttribute('data-name')).width) + pad + 2, 170, room);
      var left = p.left + p.width / 2 - w / 2;
      left = Math.max(b.left + GAP, Math.min(left, b.right - GAP - w));
      pin.style.setProperty('--lbl-w', w + 'px');
      pin.style.setProperty('--lbl-x', (left - p.left) + 'px');
      pin.classList.add('fit');
    });
  }
  var t;
  function later() { clearTimeout(t); t = setTimeout(fit, 50); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fit); else fit();
  window.addEventListener('load', fit);
  window.addEventListener('resize', later);
  document.addEventListener('toggle', later, true);
  if (mq.addEventListener) mq.addEventListener('change', fit);
  // a pin labelled on hover / focus (Maps page) gets fitted as its label appears; the page's own listener sets .hl first
  function onPin(e) { if (e.target.closest && e.target.closest('.pin[data-name]')) fit(); }
  document.addEventListener('mouseover', onPin);
  document.addEventListener('focusin', onPin);
})();
// Maps page portal pins with a known destination (a.pin.go href="#map:<id>", 2026-11-24): the label names the destination,
// activating the pin follows its hash, and the .lf openHash above opens that row (clearing the filters when they hide it) and
// scrolls it into view; Back walks the hashes back. Keyboard focus shows the label like hover does.
(function () {
  document.addEventListener('focusin', function (e) { var a = e.target.closest && e.target.closest('a.pin.go'); if (a) a.classList.add('hl'); }, true);
  document.addEventListener('focusout', function (e) { var a = e.target.closest && e.target.closest('a.pin.go'); if (a && !a.matches(':hover')) a.classList.remove('hl'); }, true);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.pin.go');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // a tap leaves no mouseout, so the label would stay up on the map left behind
    a.classList.remove('hl');
    pending = a.getAttribute('data-target');
    // the hash is already this map's (Back, then the same portal): no hashchange fires, so send one
    if (location.hash === '#' + pending) { e.preventDefault(); window.dispatchEvent(new HashChangeEvent('hashchange')); }
  });
  // after openHash (registered earlier, so it runs first): keyboard focus moves on to the destination row
  var pending = null;
  window.addEventListener('hashchange', function () {
    var row = pending && document.getElementById(pending), s = row && row.querySelector('summary');
    pending = null;
    if (s) s.focus({ preventScroll: true });
  });
})();
// Light Tower floor map: hover/tap a floor or portal dot to fade everything not connected; click (or a second tap) jumps to the floor's monsters heading (2026-11-25)
(function () {
  var wrap = document.querySelector('.ltmap');
  if (!wrap) return;
  var svg = wrap.querySelector('svg'), sc = wrap.querySelector('.ltm-scroll'), sw = wrap.querySelector('.ltm-sw'), hint = wrap.querySelector('.ltm-hint');
  var det = wrap.closest('details');
  function upd() {
    if (det && !det.open) return;
    var fits = sc.scrollWidth <= sc.clientWidth + 1;
    sw.classList.toggle('end', fits || sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 2);
    if (hint) hint.classList.toggle('fits', fits);
  }
  sc.addEventListener('scroll', upd, { passive: true });
  window.addEventListener('resize', upd);
  // the tower climbs to the right, so the diagram opens scrolled to its right end (user, 2026-11-25)
  var started = false;
  function toEnd() { if (started || (det && !det.open)) return; started = true; sc.scrollLeft = sc.scrollWidth; upd(); }
  if (det) det.addEventListener('toggle', function () { toEnd(); upd(); }); else toEnd();
  upd();
  function q(sel) { return Array.prototype.slice.call(svg.querySelectorAll(sel)); }
  var pinned = null, tapped = null, touch = false;
  function clear() {
    q('.keep').forEach(function (e) { e.classList.remove('keep'); });
    svg.classList.remove('fx');
  }
  function focusFloor(id) {
    clear(); tapped = null;
    var nb = {}; nb[id] = 1;
    q('.ltm-ed[data-a="' + id + '"], .ltm-ed[data-b="' + id + '"], .ltm-exit[data-a="' + id + '"]').forEach(function (e) {
      e.classList.add('keep'); nb[e.dataset.a] = 1; nb[e.dataset.b] = 1;
    });
    q('.ltm-node, .ltm-lb').forEach(function (n) { if (nb[n.dataset.node || n.dataset.lab]) n.classList.add('keep'); });
    q('.ltm-pp').forEach(function (p) { if (p.dataset.from === id || (nb[p.dataset.from] && p.dataset.to === id)) p.classList.add('keep'); });
    svg.classList.add('fx');
  }
  function focusPin(p) {
    clear();
    p.classList.add('keep');
    var keepNodes = {}; keepNodes[p.dataset.from] = 1; keepNodes[p.dataset.to] = 1;
    q('.ltm-ed[data-p1="' + p.id + '"], .ltm-ed[data-p2="' + p.id + '"]').forEach(function (l) {
      l.classList.add('keep');
      [l.dataset.p1, l.dataset.p2].forEach(function (pid) { var o = pid && document.getElementById(pid); if (o) o.classList.add('keep'); });
    });
    if (!p.dataset.go) q('.ltm-exit').forEach(function (e) { e.classList.add('keep'); });
    q('.ltm-node, .ltm-lb').forEach(function (n) { if (keepNodes[n.dataset.node || n.dataset.lab]) n.classList.add('keep'); });
    svg.classList.add('fx');
  }
  function restore() { if (pinned) focusFloor(pinned); else clear(); }
  function go(hash) {
    if (!hash) return;
    pinned = null; clear();
    location.hash = '#' + hash;
  }
  svg.addEventListener('pointerdown', function (ev) { touch = ev.pointerType !== 'mouse'; });
  q('.ltm-node').forEach(function (n) {
    var id = n.dataset.node, lab = svg.querySelector('.ltm-lb[data-lab="' + id + '"]');
    n.addEventListener('mouseenter', function () { if (!pinned) focusFloor(id); });
    n.addEventListener('mouseleave', function () { if (!pinned) clear(); });
    n.addEventListener('focus', function () { if (n.matches(':focus-visible') && lab) lab.classList.add('kf'); if (!pinned) focusFloor(id); });
    n.addEventListener('blur', function () { if (lab) lab.classList.remove('kf'); if (!pinned) clear(); });
    n.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (touch && pinned !== id) { pinned = id; focusFloor(id); return; }
      go(n.dataset.go);
    });
    n.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(n.dataset.go); }
      if (ev.key === 'Escape') { pinned = null; clear(); }
    });
  });
  q('.ltm-pp').forEach(function (p) {
    p.addEventListener('mouseenter', function () { focusPin(p); });
    p.addEventListener('mouseleave', restore);
    p.addEventListener('focus', function () { focusPin(p); });
    p.addEventListener('blur', restore);
    p.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (touch && tapped !== p.id) { tapped = p.id; focusPin(p); return; }
      go(p.dataset.go);
    });
    p.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(p.dataset.go); } });
  });
  svg.addEventListener('click', function () { pinned = null; tapped = null; clear(); });
})();
// All Maps viewer (.mview, 2026-11-25): built when its <details> opens. The current map sits in the middle, the maps its portals
// lead to sit around it on the portal's side. Hover/focus/tap a portal or a neighbour fades everything else; click (or a second
// tap) re-centres on that map. Data: <script type="application/json" class="mv-data">, image prefix taken from the first <img>.
(function () {
  var root = document.querySelector('.mview');
  if (!root) return;
  var det = root.closest('details'), started = false;
  function start() {
    if (started) return;
    started = true;
    var D = JSON.parse(root.querySelector('.mv-data').textContent);
    var first = root.querySelector('.mv-mm img'), src = first.getAttribute('src');
    var PRE = src.slice(0, src.lastIndexOf('/') + 1);
    var stage = root.querySelector('.mv-stage'), side = root.querySelector('.mv-side');
    var SVG = 'http://www.w3.org/2000/svg';
    var cur = +root.dataset.start, busy = false, touch = false, tapped = null;
    var reduced = function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; };
    function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
    function img(code) { return PRE + code + '.png'; }
    function pins(id) { var p = D[id].p, out = []; for (var i = 0; i < p.length; i += 4) out.push({ x: p[i], y: p[i + 1], to: p[i + 2], lab: p[i + 3] }); return out; }
    function groups(id) {
      var g = {}, order = [];
      pins(id).forEach(function (p) {
        if (!p.to || !D[p.to]) return;
        if (!g[p.to]) { g[p.to] = { to: p.to, pins: [] }; order.push(g[p.to]); }
        g[p.to].pins.push(p);
      });
      order.forEach(function (o) {
        o.x = o.pins.reduce(function (s, p) { return s + p.x; }, 0) / o.pins.length;
        o.y = o.pins.reduce(function (s, p) { return s + p.y; }, 0) / o.pins.length;
      });
      return order;
    }
    function fit(m, W, H) { var r = Math.min(W / m.s, H / m.t); return { w: m.s * r, h: m.t * r }; }
    var SLOTS = [];
    for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) if (r === 0 || r === 4 || c === 0 || c === 4) SLOTS.push({ c: c, r: r, x: (c + .5) * 20, y: (r + .5) * 20 });
    function assign(id) {
      var m = D[id], b = fit(m, 60, 60), cx = 50 - b.w / 2, cy = 50 - b.h / 2;
      var gs = groups(id).map(function (g) {
        var ax = cx + g.x / 100 * b.w, ay = cy + g.y / 100 * b.h;
        g.d = Math.hypot(ax - 50, ay - 50); g.ang = Math.atan2(ay - 50, ax - 50);
        return g;
      }).sort(function (a, b2) { return b2.d - a.d; });
      var free = SLOTS.map(function (s, i) { return i; });
      gs.forEach(function (g) {
        var bi = 0, bv = Infinity;
        free.forEach(function (si, k) {
          var s = SLOTS[si], v;
          if (g.d < 3) v = Math.hypot(s.x - 50, s.y - 50) + si * 0.01;
          else { v = Math.abs(Math.atan2(s.y - 50, s.x - 50) - g.ang); if (v > Math.PI) v = 2 * Math.PI - v; }
          if (v < bv) { bv = v; bi = k; }
        });
        g.slot = free.splice(bi, 1)[0];
      });
      return gs.sort(function (a, b2) { return a.slot - b2.slot; });
    }
    function rel(e, base) { var a = e.getBoundingClientRect(), o = base.getBoundingClientRect(); return { x: a.left - o.left, y: a.top - o.top, w: a.width, h: a.height }; }

    var lab = el('label', 'lf-field mv-jump'), sel = el('select'), wrapSel = el('span', 'lf-select');
    lab.append(el('span', null, 'Jump to'), wrapSel); wrapSel.append(sel);
    var WO = ['Emil World', 'Titania World', 'Dominion World'];
    var wr = function (w) { var i = WO.indexOf(w); return i < 0 ? 9 : i; };
    var ids = Object.keys(D).sort(function (a, b) { return (wr(D[a].w) - wr(D[b].w)) || D[a].n.localeCompare(D[b].n); });
    var og = null, ow = null;
    ids.forEach(function (id) {
      if (D[id].w !== ow) { ow = D[id].w; og = el('optgroup'); og.label = ow; sel.append(og); }
      var o = el('option', null, D[id].n); o.value = id; og.append(o);
    });
    sel.addEventListener('change', function () { go(+sel.value, 'jump'); });
    side.append(lab);

    var layer, lines;
    function clear() { if (!layer) return; layer.classList.remove('fx'); [].forEach.call(layer.querySelectorAll('.keep'), function (e) { e.classList.remove('keep'); }); }
    function focusTo(to) {
      clear();
      [].forEach.call(layer.querySelectorAll('[data-to="' + to + '"]'), function (e) { e.classList.add('keep'); });
      layer.classList.add('fx');
    }
    function wire(e, to, key) {
      e.addEventListener('mouseenter', function () { if (!tapped) focusTo(to); });
      e.addEventListener('mouseleave', function () { if (!tapped) clear(); });
      e.addEventListener('focus', function () { if (e.matches(':focus-visible')) focusTo(to); });
      e.addEventListener('blur', function () { if (!tapped) clear(); });
      e.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (touch && tapped !== key) { tapped = key; focusTo(to); return; }
        go(to);
      });
    }
    function narrow() { return root.classList.contains('narrow'); }
    function draw() {
      var m = D[cur];
      sel.value = cur;
      tapped = null;
      var nl = el('div', 'mv-layer');
      var center = el('div', 'mv-center'), mm = el('div', 'mv-mm');
      var cs = getComputedStyle(root), box = narrow() ? Math.min(stage.clientWidth, 360) : 3 * parseFloat(cs.getPropertyValue('--mv-c')) + 8;
      var f = fit(m, box, box);
      mm.style.width = f.w + 'px'; mm.style.height = f.h + 'px';
      var im = el('img'); im.src = img(m.m); im.alt = 'Map of ' + m.n; mm.append(im);
      pins(cur).forEach(function (p, i) {
        var e, ok = p.to && D[p.to];
        if (ok) {
          var name = p.lab || D[p.to].n;
          e = el('button', 'mv-pin mv-f'); e.type = 'button';
          e.setAttribute('aria-label', 'Go to ' + name); e.title = name;
          e.dataset.to = p.to;
          wire(e, p.to, 'p' + i);
        } else {
          e = el('span', 'mv-pin dead mv-f'); e.title = p.lab + ' (no map data)';
        }
        e.style.left = p.x + '%'; e.style.top = p.y + '%';
        mm.append(e);
      });
      center.append(mm); nl.append(center);
      lines = document.createElementNS(SVG, 'svg'); lines.setAttribute('class', 'mv-lines'); lines.setAttribute('aria-hidden', 'true');
      nl.append(lines);
      var gs = assign(cur);
      gs.forEach(function (g) {
        var t = D[g.to], s = SLOTS[g.slot];
        var b = el('button', 'mv-nb mv-f'); b.type = 'button';
        b.dataset.to = g.to; b.title = t.n + (t.k ? ' · ' + t.k : '');
        b.setAttribute('aria-label', 'Go to ' + t.n);
        if (!narrow()) b.style.gridArea = (s.r + 1) + ' / ' + (s.c + 1);
        var ib = el('span', 'im'), ti = el('img'); ti.src = img(t.m); ti.alt = ''; ib.append(ti);
        b.append(ib, el('span', 'nm', t.n));
        wire(b, g.to, 't' + g.to);
        nl.append(b);
      });
      if (!gs.length) nl.append(el('p', 'mv-none', 'No portal here leads to a known map.'));
      nl.addEventListener('click', function () { tapped = null; clear(); });
      if (layer) layer.replaceWith(nl); else stage.querySelector('.mv-layer').replaceWith(nl);
      layer = nl;
      drawLines();
      return nl;
    }
    function drawLines() {
      lines.textContent = '';
      if (narrow()) return;
      [].forEach.call(layer.querySelectorAll('.mv-nb'), function (b) {
        var to = b.dataset.to, t = rel(b, layer), best = null, bd = Infinity, all = [];
        [].forEach.call(layer.querySelectorAll('.mv-pin[data-to="' + to + '"]'), function (p) {
          var q = rel(p, layer), x = q.x + q.w / 2, y = q.y + q.h / 2, d = Math.hypot(x - (t.x + t.w / 2), y - (t.y + t.h / 2));
          all.push({ x: x, y: y });
          if (d < bd) { bd = d; best = { x: x, y: y }; }
        });
        if (!best) return;
        // a line from every portal to its map, so no portal looks unlinked (user, 2026-11-25)
        all.forEach(function (pt) {
          var ln = document.createElementNS(SVG, 'line');
          ln.setAttribute('x1', pt.x); ln.setAttribute('y1', pt.y);
          ln.setAttribute('x2', Math.max(t.x, Math.min(pt.x, t.x + t.w)));
          ln.setAttribute('y2', Math.max(t.y, Math.min(pt.y, t.y + t.h)));
          ln.setAttribute('class', 'mv-f'); ln.dataset.to = to;
          lines.append(ln);
        });
      });
    }
    function go(to, how) {
      if (!D[to] || to === cur || busy) return;
      var from = cur, keep = root.contains(document.activeElement) && document.activeElement !== sel;
      var srcEl = layer.querySelector('.mv-nb[data-to="' + to + '"] img') || layer.querySelector('.mv-pin[data-to="' + to + '"]');
      var a1 = srcEl ? rel(srcEl, stage) : null, a2 = rel(layer.querySelector('.mv-mm'), stage);
      cur = to;
      var anim = !reduced() && how !== 'jump';
      var nl = draw();
      function after() {
        if (!keep) return;
        var b = nl.querySelector('.mv-pin[data-to="' + from + '"]') || nl.querySelector('.mv-pin[data-to], .mv-nb');
        if (b) b.focus({ preventScroll: true });
      }
      if (!anim) { after(); return; }
      busy = true;
      var b1 = rel(nl.querySelector('.mv-mm'), stage), back2 = nl.querySelector('.mv-nb[data-to="' + from + '"] img');
      var b2 = back2 ? rel(back2, stage) : { x: b1.x + b1.w / 2, y: b1.y + b1.h / 2, w: 0, h: 0 };
      var gh = [];
      function ghost(code, a, b) {
        var g = el('img', 'mv-ghost'); g.src = img(code); g.alt = '';
        place(g, a || { x: b.x + b.w / 2, y: b.y + b.h / 2, w: 0, h: 0 }); stage.append(g); gh.push([g, b]);
      }
      function place(g, r) { g.style.left = r.x + 'px'; g.style.top = r.y + 'px'; g.style.width = r.w + 'px'; g.style.height = r.h + 'px'; }
      ghost(D[to].m, a1, b1);
      ghost(D[from].m, a2, b2);
      nl.classList.add('hide');
      stage.offsetWidth;
      gh.forEach(function (x) { place(x[0], x[1]); });
      setTimeout(function () {
        nl.classList.remove('hide');
        busy = false;
        after();
        setTimeout(function () { gh.forEach(function (x) { x[0].remove(); }); }, 200);
      }, 360);
    }
    root.addEventListener('pointerdown', function (e) { touch = e.pointerType !== 'mouse'; });
    root.addEventListener('keydown', function (e) {
      touch = false;
      if (e.key === 'Escape') { tapped = null; clear(); }
    });
    var lastW = -1;
    function sizeCheck() {
      var w = root.clientWidth;
      if (!w || w === lastW) return;
      lastW = w;
      root.classList.toggle('narrow', w < 600);
      draw();
    }
    if (window.ResizeObserver) new ResizeObserver(sizeCheck).observe(root); else window.addEventListener('resize', sizeCheck);
    sizeCheck();
    // "Jump to" sits on the section title's row, at its right end (user, 2026-11-25)
    var wrapEl = root.closest('.mview-wrap'), h2 = wrapEl && wrapEl.previousElementSibling;
    if (h2 && h2.tagName === 'H2' && side) {
      var row = el('div', 'mv-headrow');
      h2.parentNode.insertBefore(row, h2);
      row.append(h2, side);
    }
  }
  if (det) { det.addEventListener('toggle', function () { if (det.open) start(); }); if (det.open) start(); }
  else start();
})();

// [[pinlist:]]: hovering/focusing a row or pin, or one open row, fades the other pins and rows; a pin opens its row
(function () {
  function init() {
    document.querySelectorAll('.pinlist').forEach(function (root) {
      var rows = [].slice.call(root.querySelectorAll('.lrow'));
      function sel(i) {
        if (i) root.dataset.sel = i; else delete root.dataset.sel;
        root.querySelectorAll('[data-i]').forEach(function (e) { e.classList.toggle('on', e.dataset.i === i); });
      }
      function rest() {
        var open = rows.filter(function (r) { return r.open; });
        sel(open.length === 1 ? open[0].dataset.i : null);
      }
      rows.forEach(function (r) {
        var s = r.querySelector('summary');
        s.addEventListener('mouseenter', function () { sel(r.dataset.i); });
        s.addEventListener('focus', function () { sel(r.dataset.i); });
        s.addEventListener('mouseleave', rest);
        s.addEventListener('blur', rest);
        r.addEventListener('toggle', rest);
      });
      root.querySelectorAll('.lpin').forEach(function (p) {
        p.addEventListener('mouseenter', function () { sel(p.dataset.i); });
        p.addEventListener('mouseleave', rest);
        p.addEventListener('click', function () {
          var r = rows[p.dataset.i - 1];
          r.open = true;
          r.querySelector('summary').focus();
        });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
