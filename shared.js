(function() {
  var body = document.body, btn = document.getElementById('themeToggle'), key = 'wcf-theme';
  function isDark() { return !body.classList.contains('light'); }
  function applyTheme(t) {
    if (t === 'light') { body.classList.add('light'); btn.innerHTML = '&#9728;'; }
    else { body.classList.remove('light'); btn.innerHTML = '&#9790;'; }
  }
  applyTheme(localStorage.getItem(key) || 'dark');
  btn.addEventListener('click', function() {
    var n = isDark() ? 'light' : 'dark';
    localStorage.setItem(key, n); applyTheme(n); renderMermaid();
  });

  // Build mega-menu nav: inject "Pages" button + current-page breadcrumb
  var nav = document.querySelector('nav');
  var navLinks = nav ? nav.querySelector('.nav-links') : null;
  if (nav && navLinks) {
    var activeLink = navLinks.querySelector('a.active');
    var activeTxt = activeLink ? activeLink.textContent : '';
    var logoLink = nav.querySelector('.logo');
    var section = logoLink ? logoLink.textContent : '';

    var menuBtn = document.createElement('button');
    menuBtn.className = 'nav-menu-btn';
    menuBtn.innerHTML = (activeTxt || 'Pages') + ' <span class="nm-arrow">&#9662;</span>';
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && e.target !== menuBtn) {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('open');
      }
    });
    navLinks.addEventListener('click', function() {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
    });

    var logoEl = nav.querySelector('.logo');
    if (logoEl && logoEl.nextSibling) {
      nav.insertBefore(menuBtn, logoEl.nextSibling);
    } else {
      var themeBtn = nav.querySelector('.theme-toggle');
      nav.insertBefore(menuBtn, themeBtn);
    }

    // Search
    var searchWrap = document.createElement('div');
    searchWrap.className = 'nav-search';
    searchWrap.innerHTML = '<span class="search-icon">&#128269;</span><input type="text" placeholder="Search..." id="navSearchInput">';
    nav.insertBefore(searchWrap, themeBtn);

    var resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    resultsDiv.id = 'searchResults';
    document.body.appendChild(resultsDiv);

    var searchIndex = null;
    var searchInput = document.getElementById('navSearchInput');

    function buildIndex() {
      if (searchIndex) return Promise.resolve(searchIndex);
      var links = navLinks.querySelectorAll('a');
      var promises = [];
      links.forEach(function(a) {
        var href = a.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        promises.push(
          fetch(href).then(function(r) { return r.ok ? r.text() : ''; }).then(function(html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var main = doc.querySelector('main') || doc.body;
            var text = main ? main.textContent : '';
            var title = doc.querySelector('h1');
            return { href: href, title: title ? title.textContent.trim() : a.textContent.trim(), text: text.replace(/\s+/g, ' ').substring(0, 10000) };
          }).catch(function() { return null; })
        );
      });
      return Promise.all(promises).then(function(results) {
        searchIndex = results.filter(Boolean);
        return searchIndex;
      });
    }

    function doSearch(q) {
      if (!q || q.length < 2) { resultsDiv.classList.remove('open'); return; }
      buildIndex().then(function(idx) {
        var lower = q.toLowerCase();
        var matches = [];
        idx.forEach(function(page) {
          var ti = page.title.toLowerCase().indexOf(lower);
          var bi = page.text.toLowerCase().indexOf(lower);
          if (ti >= 0 || bi >= 0) {
            var snippet = '';
            if (bi >= 0) {
              var start = Math.max(0, bi - 40);
              var end = Math.min(page.text.length, bi + q.length + 60);
              snippet = (start > 0 ? '...' : '') + page.text.substring(start, end) + (end < page.text.length ? '...' : '');
              var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
              snippet = snippet.replace(re, '<mark>$1</mark>');
            }
            matches.push({ href: page.href, title: page.title, snippet: snippet, score: ti >= 0 ? 2 : 1 });
          }
        });
        matches.sort(function(a, b) { return b.score - a.score; });
        if (matches.length === 0) {
          resultsDiv.innerHTML = '<div class="sr-empty">No results for &ldquo;' + q + '&rdquo;</div>';
        } else {
          resultsDiv.innerHTML = matches.slice(0, 15).map(function(m) {
            return '<a href="' + m.href + '"><span class="sr-title">' + m.title + '</span>' +
              (m.snippet ? '<span class="sr-match">' + m.snippet + '</span>' : '') + '</a>';
          }).join('');
        }
        resultsDiv.classList.add('open');
      });
    }

    var searchTimer = null;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function() { doSearch(searchInput.value.trim()); }, 250);
    });
    searchInput.addEventListener('focus', function() {
      if (searchInput.value.trim().length >= 2) doSearch(searchInput.value.trim());
    });
    document.addEventListener('click', function(e) {
      if (!searchWrap.contains(e.target) && !resultsDiv.contains(e.target)) {
        resultsDiv.classList.remove('open');
      }
    });
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { resultsDiv.classList.remove('open'); searchInput.blur(); }
    });
  }

  // Mermaid source/copy buttons
  document.querySelectorAll('.mermaid-wrap').forEach(function(wrap) {
    var inner = wrap.querySelector('.mermaid-inner');
    if (!inner) return;
    var src = inner.getAttribute('data-src'), tb = wrap.querySelector('.mw-toolbar');
    if (!tb) return;
    var srcBtn = document.createElement('button'); srcBtn.textContent = 'Source';
    srcBtn.addEventListener('click', function() {
      var s = wrap.querySelector('.mw-source');
      if (s) { s.classList.toggle('visible'); srcBtn.classList.toggle('active'); }
    });
    tb.appendChild(srcBtn);
    var cpBtn = document.createElement('button'); cpBtn.textContent = 'Copy';
    cpBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(src).then(function() { showToast('Mermaid source copied!'); });
    });
    tb.appendChild(cpBtn);
    var pre = document.createElement('pre'); pre.className = 'mw-source'; pre.textContent = src;
    var cap = wrap.querySelector('.mw-caption');
    if (cap) wrap.insertBefore(pre, cap); else wrap.appendChild(pre);
  });

  function showToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2000);
  }
  window.showToast = showToast;

  function renderMermaid() {
    if (typeof window.mermaid === 'undefined') return;
    var dark = isDark();
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: dark ? {
        primaryColor: '#1e3a5f',
        primaryTextColor: '#e6edf3',
        primaryBorderColor: '#58a6ff',
        secondaryColor: '#2d1b4e',
        secondaryTextColor: '#e6edf3',
        secondaryBorderColor: '#d2a8ff',
        tertiaryColor: '#1a3328',
        tertiaryTextColor: '#e6edf3',
        tertiaryBorderColor: '#3fb950',
        lineColor: '#58a6ff',
        textColor: '#e6edf3',
        mainBkg: '#1e3a5f',
        nodeBorder: '#58a6ff',
        clusterBkg: '#161b2299',
        clusterBorder: '#30363d',
        titleColor: '#e6edf3',
        edgeLabelBackground: '#0d1117',
        nodeTextColor: '#e6edf3',
        actorTextColor: '#e6edf3',
        actorBkg: '#1e3a5f',
        actorBorder: '#58a6ff',
        actorLineColor: '#58a6ff',
        signalColor: '#58a6ff',
        signalTextColor: '#e6edf3',
        labelBoxBkgColor: '#161b22',
        labelBoxBorderColor: '#30363d',
        labelTextColor: '#e6edf3',
        loopTextColor: '#e6edf3',
        noteBkgColor: '#2d333b',
        noteTextColor: '#e6edf3',
        noteBorderColor: '#58a6ff',
        sectionBkgColor: '#161b22',
        sectionBkgColor2: '#1c2333',
        altSectionBkgColor: '#1c2333',
        gridColor: '#30363d',
        doneTaskBkgColor: '#238636',
        doneTaskBorderColor: '#3fb950',
        activeTaskBkgColor: '#1e3a5f',
        activeTaskBorderColor: '#58a6ff',
        taskTextColor: '#e6edf3',
        taskTextDarkColor: '#e6edf3',
        taskTextOutsideColor: '#e6edf3',
        todayLineColor: '#f0883e',
        cScale0: '#1e3a5f', cScale1: '#2d1b4e', cScale2: '#1a3328',
        cScale3: '#3b2e15', cScale4: '#3b1518', cScale5: '#1e3a5f',
        cScaleLabel0: '#e6edf3', cScaleLabel1: '#e6edf3', cScaleLabel2: '#e6edf3',
        cScaleLabel3: '#e6edf3', cScaleLabel4: '#e6edf3', cScaleLabel5: '#e6edf3',
        cScalePeer0: '#58a6ff', cScalePeer1: '#d2a8ff', cScalePeer2: '#3fb950',
        cScalePeer3: '#f0883e', cScalePeer4: '#f85149', cScalePeer5: '#58a6ff'
      } : {
        primaryColor: '#dbeafe',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#0969da',
        secondaryColor: '#f3e8ff',
        secondaryTextColor: '#1e293b',
        secondaryBorderColor: '#8250df',
        tertiaryColor: '#dcfce7',
        tertiaryTextColor: '#1e293b',
        tertiaryBorderColor: '#1a7f37',
        lineColor: '#0969da',
        textColor: '#1e293b',
        mainBkg: '#dbeafe',
        nodeBorder: '#0969da',
        clusterBkg: '#f8fafc',
        clusterBorder: '#d0d7de',
        titleColor: '#1e293b',
        edgeLabelBackground: '#ffffff',
        nodeTextColor: '#1e293b',
        actorTextColor: '#1e293b',
        actorBkg: '#dbeafe',
        actorBorder: '#0969da',
        actorLineColor: '#0969da',
        signalColor: '#0969da',
        signalTextColor: '#1e293b',
        labelBoxBkgColor: '#f6f8fa',
        labelBoxBorderColor: '#d0d7de',
        labelTextColor: '#1e293b',
        loopTextColor: '#1e293b',
        noteBkgColor: '#fff8c5',
        noteTextColor: '#1e293b',
        noteBorderColor: '#d4a72c',
        sectionBkgColor: '#f6f8fa',
        sectionBkgColor2: '#eef1f5',
        altSectionBkgColor: '#eef1f5',
        gridColor: '#d0d7de',
        doneTaskBkgColor: '#1a7f37',
        doneTaskBorderColor: '#1a7f37',
        activeTaskBkgColor: '#dbeafe',
        activeTaskBorderColor: '#0969da',
        taskTextColor: '#1e293b',
        taskTextDarkColor: '#ffffff',
        taskTextOutsideColor: '#1e293b',
        todayLineColor: '#bc4c00',
        cScale0: '#dbeafe', cScale1: '#f3e8ff', cScale2: '#dcfce7',
        cScale3: '#fef3c7', cScale4: '#fee2e2', cScale5: '#dbeafe',
        cScaleLabel0: '#1e293b', cScaleLabel1: '#1e293b', cScaleLabel2: '#1e293b',
        cScaleLabel3: '#1e293b', cScaleLabel4: '#1e293b', cScaleLabel5: '#1e293b'
      }
    });
    // Clear old SVGs and re-render each diagram
    document.querySelectorAll('.mermaid-inner').forEach(function(el, i) {
      var s = el.getAttribute('data-src');
      if (!s) return;
      el.innerHTML = '';
      var id = 'm' + i + '-' + Date.now();
      window.mermaid.render(id, s).then(function(r) {
        el.innerHTML = r.svg;
      }).catch(function(err) {
        el.innerHTML = '<pre style="color:#f85149;font-size:0.85rem;">Diagram error: ' + err.message + '</pre>';
      });
    });
  }

  // Load mermaid via script tag (works on file:// protocol, unlike ESM import)
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
  s.onload = function() { renderMermaid(); };
  s.onerror = function() {
    document.querySelectorAll('.mermaid-inner').forEach(function(el) {
      var src = el.getAttribute('data-src');
      if (src) el.innerHTML = '<pre style="color:#8b949e;font-size:0.85rem;white-space:pre-wrap;">' + src + '</pre>';
    });
  };
  document.head.appendChild(s);

  // Zoom/Pan/Fullscreen
  var scales = {}, pans = {};
  window.mzoom = function(b, f) {
    var w = b.closest('.mermaid-wrap'), id = w.id;
    scales[id] = (scales[id] || 1) * f;
    var p = pans[id] || { x: 0, y: 0 };
    w.querySelector('.mermaid-inner').style.transform =
      'translate(' + p.x + 'px,' + p.y + 'px) scale(' + scales[id] + ')';
  };
  window.mreset = function(b) {
    var w = b.closest('.mermaid-wrap');
    scales[w.id] = 1; pans[w.id] = { x: 0, y: 0 };
    w.querySelector('.mermaid-inner').style.transform = 'scale(1)';
  };
  window.mfull = function(b) {
    var w = b.closest('.mermaid-wrap');
    if (document.fullscreenElement) document.exitFullscreen();
    else w.requestFullscreen();
  };
  document.querySelectorAll('.mw-view').forEach(function(v) {
    var d = false, sx, sy, w = v.closest('.mermaid-wrap'), inner = v.querySelector('.mermaid-inner');
    if (!inner) return;
    v.addEventListener('mousedown', function(e) { d = true; sx = e.clientX; sy = e.clientY; e.preventDefault(); });
    window.addEventListener('mousemove', function(e) {
      if (!d) return;
      var id = w.id, p = pans[id] || { x: 0, y: 0 };
      p.x += e.clientX - sx; p.y += e.clientY - sy; pans[id] = p;
      sx = e.clientX; sy = e.clientY;
      inner.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px) scale(' + (scales[id] || 1) + ')';
    });
    window.addEventListener('mouseup', function() { d = false; });
    v.addEventListener('wheel', function(e) {
      e.preventDefault();
      var id = w.id, f = e.deltaY < 0 ? 1.1 : 0.9;
      scales[id] = (scales[id] || 1) * f;
      var p = pans[id] || { x: 0, y: 0 };
      inner.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px) scale(' + scales[id] + ')';
    }, { passive: false });
  });

  // Progress bar
  var pb = document.querySelector('.progress-bar');
  if (pb) {
    window.addEventListener('scroll', function() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      pb.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + '%';
    });
  }

  window.expandAll = function() {
    document.querySelectorAll('details').forEach(function(d) { d.open = true; });
  };
  window.collapseAll = function() {
    document.querySelectorAll('details').forEach(function(d) { d.open = false; });
  };

  // === MONOCHROME LINE-ART ICON REPLACEMENT ===
  (function() {
    var S='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">',E='</svg>';
    var i={
      clipboard:S+'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>'+E,
      layers:S+'<polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'+E,
      plug:S+'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><rect x="7" y="8" width="10" height="5" rx="2"/><path d="M9 13v2"/><path d="M15 13v2"/>'+E,
      box:S+'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'+E,
      refresh:S+'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'+E,
      lock:S+'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'+E,
      file:S+'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>'+E,
      zap:S+'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>'+E,
      rocket:S+'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3"/>'+E,
      search:S+'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'+E,
      folder:S+'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'+E,
      image:S+'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'+E,
      cart:S+'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'+E,
      creditCard:S+'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>'+E,
      user:S+'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'+E,
      users:S+'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'+E,
      home:S+'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'+E,
      gear:S+'<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'+E,
      heart:S+'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'+E,
      tag:S+'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'+E,
      book:S+'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'+E,
      palette:S+'<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'+E,
      globe:S+'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'+E,
      target:S+'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'+E,
      calendar:S+'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'+E,
      clock:S+'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'+E,
      camera:S+'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'+E,
      shield:S+'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'+E,
      wrench:S+'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'+E,
      barChart:S+'<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>'+E,
      trendUp:S+'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'+E,
      check:S+'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'+E,
      xMark:S+'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'+E,
      newspaper:S+'<path d="M19 5v14H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="11" y2="17"/>'+E,
      megaphone:S+'<path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'+E,
      briefcase:S+'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>'+E,
      monitor:S+'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'+E,
      cpu:S+'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>'+E,
      flask:S+'<path d="M9 3h6"/><path d="M10 3v7.4a2 2 0 0 1-.5 1.3L4 19a2 2 0 0 0 1.5 3h13a2 2 0 0 0 1.5-3l-5.5-7.3A2 2 0 0 1 14 10.4V3"/>'+E,
      award:S+'<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>'+E,
      unlock:S+'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>'+E,
      activity:S+'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'+E,
      pin:S+'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'+E,
      diamond:S+'<path d="M12 3L3 10l9 11 9-11z"/>'+E,
      square:S+'<rect x="4" y="4" width="16" height="16" rx="2"/>'+E,
      circleCheck:S+'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'+E,
      circleAlert:S+'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'+E,
      circleClock:S+'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'+E,
      circleX:S+'<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'+E,
      traffic:S+'<rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="7" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="17" r="2"/>'+E,
      puzzle:S+'<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61A2.404 2.404 0 0 1 12 2c.618 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/>'+E,
      arrowRight:S+'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'+E,
      masks:S+'<path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2z"/>'+E,
      hourglass:S+'<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>'+E,
      scroll:S+'<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>'+E,
      accessibility:S+'<circle cx="12" cy="4" r="2"/><path d="M12 8v6"/><path d="M8 10h8"/><path d="M9 20l3-6 3 6"/>'+E,
      stopwatch:S+'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M10 2h4"/><path d="M12 2v3"/>'+E,
      grid:S+'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'+E
    };
    var m={};
    m[0x1F4CB]='clipboard';m[0x1F4C4]='file';m[0x1F4DC]='scroll';m[0x1F4C1]='folder';
    m[0x1F4F0]='newspaper';m[0x1F4D6]='book';m[0x1F4DA]='book';m[0x1F50D]='search';
    m[0x1F50E]='search';m[0x1F3D7]='layers';m[0x1F50C]='plug';m[0x1F4E6]='box';
    m[0x1F504]='refresh';m[0x1F512]='lock';m[0x1F513]='unlock';m[0x1F6E1]='shield';
    m[0x1F4A5]='zap';m[0x1F680]='rocket';m[0x1F6D2]='cart';m[0x1F4B3]='creditCard';
    m[0x1F464]='user';m[0x1F465]='users';m[0x1F3E0]='home';m[0x2699]='gear';
    m[0x2764]='heart';m[0x1F3F7]='tag';m[0x1F3A8]='palette';m[0x2705]='check';
    m[0x274C]='xMark';m[0x1F3AF]='target';m[0x23F3]='hourglass';m[0x231B]='hourglass';
    m[0x23F1]='stopwatch';m[0x1F4C5]='calendar';m[0x26A1]='zap';m[0x1F4F7]='camera';
    m[0x1F310]='globe';m[0x1F30D]='globe';m[0x1F30E]='globe';m[0x1F30F]='globe';
    m[0x1F4CA]='barChart';m[0x1F4C8]='trendUp';m[0x1F527]='wrench';m[0x1F6E0]='wrench';
    m[0x1F3AD]='masks';m[0x1F4E3]='megaphone';m[0x1F6A7]='layers';m[0x1F6A6]='traffic';
    m[0x1F4CC]='pin';m[0x1F3C5]='award';m[0x1F426]='activity';m[0x1F4BB]='monitor';
    m[0x1F916]='cpu';m[0x1F454]='briefcase';m[0x1F9E9]='puzzle';m[0x1F52C]='flask';
    m[0x1F304]='image';m[0x1F7E2]='circleCheck';m[0x1F7E1]='circleAlert';
    m[0x1F7E0]='circleClock';m[0x1F534]='circleX';m[0x267F]='accessibility';
    m[0x25AC]='square';m[0x25AD]='square';m[0x25AE]='square';m[0x25AF]='square';
    m[0x25A0]='square';m[0x25A1]='diamond';m[0x25A3]='layers';m[0x25A9]='grid';
    m[0x25C6]='diamond';m[0x25C7]='diamond';m[0x21A6]='arrowRight';
    m[0x1F4C8]='trendUp';m[0x1F4CC]='pin';m[0x1F6E0]='wrench';
    m[0x128736]='wrench';m[0x128737]='shield';
    document.querySelectorAll('.theme-icon').forEach(function(el){
      var t=el.textContent.trim();if(!t)return;
      var cp=t.codePointAt(0),n=m[cp];
      if(n&&i[n])el.innerHTML=i[n];
      else el.innerHTML=i.diamond;
    });
  })();
})();
