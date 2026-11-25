(() => {
  const q = (selector) => document.querySelector(selector);
  const all = (selector) => [...document.querySelectorAll(selector)];
  const contact = 'https://open.kakao.com/o/g4Tap2Ri';
  const credit = '제작자: 정주고등학교 박지은';
  // original-muted uses the original artwork. The four SVG sketches remain available.
  const logoVariant = 'original-muted';
  const logoPath = 'design/gyohaeng-logos/' + logoVariant;
  const originalLogo = logoVariant === 'original-muted';
  const logo = () => originalLogo
    ? '<img class="portal-logo portal-logo-original" src="design/brand-logo.webp" alt="교행e">'
    : '<img class="portal-logo" src="' + logoPath + '.svg" width="85" height="32" alt="교행e">';
  if (originalLogo) {
    document.body.insertAdjacentHTML('afterbegin', '<svg class="portal-logo-filter" aria-hidden="true" width="0" height="0"><filter id="original-muted" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues=".118 .118 .325 .325 .325"/><feFuncG type="table" tableValues=".227 .227 .510 .510 .510"/><feFuncB type="table" tableValues=".373 .373 .706 .706 .706"/></feComponentTransfer></filter></svg>');
  } else {
    const icon = document.querySelector('link[rel="icon"]');
    icon.type = 'image/svg+xml';
    icon.sizes.value = 'any';
    icon.href = logoPath + '-icon.svg';
  }
  const contactLink = '<a class="portal-pill" target="_blank" rel="noopener" href="' + contact + '">문의·건의 ↗</a>';
  const labels = { 'sec-calc': '업무 계산기', 'sec-forms': '도구함', guide: '실무 지침', 'sec-links': '자주 쓰는 사이트' };
  const rail = q('.tnav');
  const brand = q('.topbar .logo');
  brand.innerHTML = logo();
  brand.setAttribute('aria-label', '교행e 홈');
  brand.href = '#top';
  brand.addEventListener('click', (event) => event.preventDefault());
  rail.id = 'portal-nav';
  rail.setAttribute('aria-label', '주 메뉴');
  q('.tnav .home').textContent = '홈';
  all('.tnav a[data-p]').forEach((a) => { a.textContent = labels[a.dataset.p]; });
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'portal-pill portal-menu-toggle';
  toggle.setAttribute('aria-controls', rail.id);
  toggle.innerHTML = '<span aria-hidden="true">☰</span> 메뉴';
  rail.before(toggle);
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    q('.topbar').classList.toggle('portal-menu-open', open);
  }
  setMenu(false);
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') === 'false'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  q('.tsearch').insertAdjacentHTML('afterend', contactLink);
  q('#topSearch').addEventListener('keydown', (event) => { if (event.key === 'Enter') setMenu(false); });
  q('.h-txt h1').textContent = '전북교행길라잡이';
  q('.h-txt p').textContent = '계산기 · 서식 · 실무 지침 · 자주 쓰는 사이트를 한곳에서.';
  q('.hsearch').insertAdjacentHTML('beforebegin', '<div class="portal-actions"><a class="portal-pill primary" href="#portal-work">업무 시작하기 ↓</a><a class="portal-pill" href="#portal-howto">사용 방법</a></div>');

  const menu = q('.menu2');
  menu.querySelector('.c1 .t').textContent = '업무 계산기';
  menu.insertAdjacentHTML('beforebegin', '<div id="portal-work" class="portal-frame"><div class="portal-framebar"><span>업무 화면 미리보기</span><button type="button" class="portal-text" data-preview-open>계산기 열기 →</button></div><div class="portal-work"><article class="portal-preview"><h2>국내출장 여비 계산기</h2><p>교통비 + 일비 + 식비 + 숙박비 · 결재 문안</p><div class="portal-upload">↑ NEIS 근무상황부 엑셀 올리기 (선택)</div><div class="portal-fields"><div>출장자 (문안용)<span>성명</span></div><div>출장지 (문안용)<span></span></div><div>시작일<span>연도-월-일</span></div><div>종료일<span>연도-월-일</span></div></div></article></div></div>');
  q('.portal-work').append(menu);
  q('[data-preview-open]').addEventListener('click', () => openCalc('여비'));

  const release = document.createElement('dialog');
  release.className = 'portal-release';
  release.setAttribute('aria-labelledby', 'portal-release-title');
  release.innerHTML = '<div class="portal-release-head"><h2 id="portal-release-title">공지사항 전체 내역</h2><form method="dialog"><button class="portal-pill">닫기</button></form></div><div class="portal-release-body">' + (window.GYO_NEWS_HTML?.release() || '') + '</div><div class="portal-release-credit">' + credit + contactLink + '</div>';
  document.body.append(release);
  const latest = window.GYO_NEWS?.[0];
  q('.qlist').insertAdjacentHTML('afterend', '<div class="portal-notes"><section class="portal-box"><h2>공지사항</h2><div class="portal-latest"></div><button type="button" class="portal-text portal-open-release">전체 내역 보기 →</button></section><section class="portal-box" id="portal-howto"><h2>사용 방법</h2><ol><li>업무 계산기·도구함에서 필요한 업무를 고르세요.</li><li>자료를 입력하거나 엑셀 파일을 올리세요.</li><li>결과를 확인하고 필요한 파일을 받으세요.</li></ol></section></div>');
  if (latest) {
    const changes = latest.li?.length
      ? '<details><summary>변경 내용 보기</summary><ul>' + latest.li.map((line) => '<li>' + line + '</li>').join('') + '</ul></details>'
      : '';
    q('.portal-latest').innerHTML = window.GYO_NEWS_HTML.latest().replace('<ul></ul>', changes);
    const recent = document.createElement('ul');
    recent.className = 'portal-recent';
    window.GYO_NEWS.slice(1, 5).forEach((item) => {
      const row = document.createElement('li');
      const date = document.createElement('time');
      date.dateTime = item.d;
      date.textContent = item.d.replaceAll('-', '.');
      const title = document.createElement('span');
      title.textContent = item.t;
      row.append(title, date);
      recent.append(row);
    });
    q('.portal-latest').append(recent);
  }
  q('.portal-open-release').addEventListener('click', () => release.showModal());

  const sites = [
    ['법인회계Master', 'https://law.lynqook.workers.dev/', 'M6 3h12v18H6zM9 8h6m-6 4h6m-6 4h4'],
    ['본예산 길라잡이', 'https://lynqook-gif.github.io/budget-guide/', 'M4 19h16M6 15l4-5 4 2 5-7'],
    ['식단표 편집기', 'https://lynqook-gif.github.io/food/', 'M5 3v7a2 2 0 0 0 4 0V3m-2 0v18m9-18c-2 2-2 6-2 9h4m0-9v18'],
    ['교복길라잡이', 'https://gyobok-guide.lynqook.workers.dev/', 'M4 7l4-4 4 3 4-3 4 4-3 4v10H7V11z'],
    ['급식췍', 'https://lynqook-gif.github.io/meal-check/', 'M5 4v16m3-16v16m3-16v16m4-16v16m3-16v16'],
    ['재물콕', 'https://jaemul.lynqook.workers.dev/', 'M4 7l8-4 8 4v10l-8 4-8-4zm0 0 8 4 8-4m-8 4v10'],
  ];
  const shortcuts = sites.map(([label, href, path]) => '<a href="' + href + '" target="_blank" rel="noopener"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + path + '"/></svg><span>' + label + '</span><span aria-hidden="true">↗</span></a>').join('');
  q('.portal-notes').insertAdjacentHTML('afterend', '<section class="portal-shortcuts"><h2>교행e 사이트 바로가기</h2><div>' + shortcuts + '</div></section>');

  const pageTitles = { 'sec-forms': ['도구함','필요한 업무를 고르고 바로 시작하세요.'], guide: ['실무 지침','분야를 선택하고 필요한 원문을 바로 확인하세요.'], 'sec-links': ['자주 쓰는 사이트','학교 행정에 필요한 외부 사이트를 새 탭으로 여세요.'] };
  Object.entries(pageTitles).forEach(([id,[title,description]]) => {
    q('#' + id + ' .fbanner').innerHTML = '<div><h2>' + title + '</h2><p>' + description + '</p></div>';
  });
  all('#guide .cat-block,#sec-forms .cat-block').forEach((group) => {
    group.querySelectorAll('.link-card').forEach((card, index) => {
      const title = card.querySelector('.lt').textContent;
      const badge = card.querySelector('.lc-ic');
      badge.textContent = title.match(/^s*제s*(d+)s*편/)?.[1] || String(index + 1).padStart(2, '0');
      badge.setAttribute('aria-hidden', 'true');
      const arrow = card.querySelector('.go');
      arrow.textContent = card.target === '_blank' ? '↗' : '→';
      arrow.setAttribute('aria-hidden', 'true');
    });
  });
  all('#sec-forms .fav br').forEach((lineBreak) => lineBreak.replaceWith(' '));
  all('#sec-calc .tool > .head > .ic').forEach((badge, index) => {
    badge.textContent = String(index + 1).padStart(2, '0');
    badge.setAttribute('aria-hidden', 'true');
  });
  q('#sec-calc .wrap').insertAdjacentHTML('afterbegin', '<div class="fbanner"><div><h2>업무 계산기</h2></div></div>');
  q('#foot .wrap').innerHTML = '<span>' + credit + '</span><a target="_blank" rel="noopener" href="' + contact + '">카카오 오픈채팅 ↗</a>';
  const toolBar = q('.tmodal-bar');
  toolBar.insertAdjacentHTML('afterbegin', logo());
  const close = toolBar.querySelector('button');
  close.insertAdjacentHTML('beforebegin', '<span class="portal-tool-credit">' + credit + '</span><button class="portal-pill portal-tool-home" type="button">← 홈</button>' + contactLink);
  close.classList.add('portal-pill', 'primary');
  toolBar.querySelector('.portal-tool-home').addEventListener('click', () => {
    closeTool();
    goHome();
    brand.focus();
  });

  // Original controls use inline click handlers. Keep them and add keyboard access.
  all('a[onclick]:not([href]),.mcard,.tool > .head').forEach((control) => {
    control.tabIndex = 0;
    control.setAttribute('role', 'button');
    control.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        control.click();
      }
    });
  });
  rail.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  function syncNav() {
    const current = document.body.classList.contains('searching') ? null :
      (document.body.classList.contains('in-page') ? rail.querySelector('.on') : rail.querySelector('.home'));
    rail.querySelectorAll('a').forEach((link) => {
      if (link === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  const navigationObserver = new MutationObserver(syncNav);
  navigationObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  navigationObserver.observe(rail, { subtree: true, attributes: true, attributeFilter: ['class'] });
  const hashPage = { '#toolbox': 'sec-forms', '#guide': 'guide', '#sites': 'sec-links', '#sec-calc': 'sec-calc' }[location.hash];
  if (hashPage) showPage(hashPage, labels[hashPage]);
  syncNav();
})();
