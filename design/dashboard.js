(()=>{const c={"title": "전북교행길라잡이", "eyebrow": "ADMINISTRATION DESK", "line1": "교육행정의 매일을,", "line2": "더 명확하고 간결하게.", "desc": "계산기 · 서식 · 실무 지침 · 자주 쓰는 사이트를 한곳에서.", "nav": [["홈", "home"], ["업무 계산기", "page:sec-calc:계산"], ["도구함", "page:sec-forms:도구함"], ["실무 지침", "page:guide:실무 지침"], ["자주 쓰는 사이트", "page:sec-links:자주 쓰는 사이트"]], "target": "header.topbar", "place": "after", "site": "jeonbuk-gyohaeng"};document.body.classList.add('desk-layout');const rail=document.createElement('aside');rail.className='desk-rail';rail.setAttribute('aria-label',c.title+' 메뉴');rail.innerHTML='<div class="desk-brand">교행<span>e</span></div><div class="desk-product">'+c.title+'</div><div class="desk-label">업무 메뉴</div><nav class="desk-menu" aria-label="주 메뉴"></nav><div class="desk-bottom"><div class="desk-mascot" role="img" aria-label="'+c.title+' 안내 캐릭터"></div><p>복잡한 업무도 차근차근.<br>교행e가 함께합니다.</p></div>';const nav=rail.querySelector('nav');c.nav.forEach(([label,action],i)=>{const el=document.createElement(action.startsWith('file:')?'a':'button');if(el.tagName==='BUTTON')el.type='button';else{el.href=action.slice(5);el.target='_blank';el.rel='noopener';}el.dataset.deskAction=action;el.innerHTML='<span class="desk-icon">'+String(i+1).padStart(2,'0')+'</span><span>'+label+'</span>';if(i===0){el.classList.add('selected');el.setAttribute('aria-current','page')}el.addEventListener('click',()=>{nav.querySelectorAll('.selected').forEach(x=>{x.classList.remove('selected');x.removeAttribute('aria-current')});el.classList.add('selected');el.setAttribute('aria-current','page');const [type,id,label]=action.split(':');if(type==='tab')document.querySelector('#tabs [data-tab="'+id+'"]')?.click();if(type==='click')document.getElementById(id)?.click();if(type==='anchor')document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'center'});if(type==='go')document.querySelector('[data-go="'+id+'"]:not(.desk-rail *)')?.click();if(type==='home')window.goHome?.();if(type==='page')window.showPage?.(id,label);});nav.append(el)});document.body.prepend(rail);const hero=document.createElement('section');hero.className='desk-hero';hero.id='design-hero';hero.innerHTML='<div class="desk-copy"><div class="desk-eyebrow">'+c.eyebrow+'</div><h1>'+c.line1+'<br><span>'+c.line2+'</span></h1><p>'+c.desc+'</p><div class="desk-status">'+c.title+' · 업무를 위한 나만의 데스크</div></div><div class="desk-mascot" role="img" aria-label="'+c.title+' 컨셉의 교행e 캐릭터"></div>';const target=document.querySelector(c.target);if(c.place==='prepend')target.prepend(hero);else target.after(hero);
const workspace=document.createElement('div');workspace.className='desk-workheading';workspace.innerHTML='<div><p class="desk-crumb">'+c.title+' <span>/</span> <span class="desk-current"></span></p><h1></h1><p class="desk-workdesc"></p></div><span class="desk-worktag">'+c.title+'</span>';
if(c.site==='law')document.querySelector('main').prepend(workspace);
const descriptions={acc:'회계연도와 학교 정보를 입력하고 예산을 편성하세요.',sechul:'지출결의부터 지출부·현금출납부까지 이어서 관리하세요.',seip:'징수결의와 수입 내역을 정확하게 기록하세요.',settle:'한 해의 회계를 정리하고 결산 서류를 준비하세요.',board:'이사회 회의와 관련 서류를 한곳에서 작성하세요.'};
function syncWorkspace(){
 let current='';
 if(c.site==='law'){
  const panel=document.querySelector('main > .panel.active');current=panel?.id.replace('panel-','')||'home';
  hero.hidden=current!=='home';workspace.hidden=current==='home';
  const label=c.nav.find(x=>x[1]==='tab:'+current)?.[0]||'법인회계';
  workspace.querySelector('h1').textContent=label;workspace.querySelector('.desk-current').textContent=label;workspace.querySelector('.desk-workdesc').textContent=descriptions[current]||'';
  document.body.classList.toggle('desk-working',current!=='home');
 }else if(c.site==='gyobok-guide'){
  current=document.querySelector('.page:not([hidden])')?.dataset.page||'flow';hero.hidden=current!=='flow';
 }else if(c.site==='jeonbuk-gyohaeng'){
  hero.hidden=document.body.classList.contains('in-page');current=hero.hidden?document.querySelector('.panel.open')?.id||'':'';
 }
 nav.querySelectorAll('button,a').forEach((el,i)=>{
  const action=el.dataset.deskAction||'',chosen=c.site==='law'?action==='tab:'+current:c.site==='gyobok-guide'?action==='go:'+current:c.site==='jeonbuk-gyohaeng'?(current?action.startsWith('page:'+current+':'):action==='home'):el.classList.contains('selected');
  if(el.classList.contains('selected')!==chosen){el.classList.toggle('selected',chosen);if(chosen)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')}
 });
}
const observed=c.site==='law'?document.querySelectorAll('main>.panel'):c.site==='gyobok-guide'?document.querySelectorAll('.page'):c.site==='jeonbuk-gyohaeng'?[document.body,...document.querySelectorAll('.panel')]:[];
const observer=new MutationObserver(syncWorkspace);observed.forEach(el=>observer.observe(el,{attributes:true,attributeFilter:['class','hidden']}));syncWorkspace();
if(c.site==='law'){
 const hint=document.querySelector('#inputArea .hint');if(hint){const details=document.createElement('details');details.className='desk-help';const summary=document.createElement('summary');summary.textContent='출력 규칙과 미리보기 안내';hint.before(details);details.append(summary,hint);}
}

const bottom=rail.querySelector('.desk-bottom');bottom.innerHTML='<a class="desk-support" href="https://open.kakao.com/o/g4Tap2Ri" target="_blank" rel="noopener"><img src="design/assistant-face.webp" alt="" width="42" height="42"><span><b>도움이 필요하신가요?</b><small>문의·건의하기 ↗</small></span></a>';
document.querySelectorAll('a[href*="open.kakao.com"]').forEach(a=>{if(a.closest('.desk-rail')||a.classList.contains('fab'))return;a.classList.add('desk-contact-link');const img=document.createElement('img');img.src='design/assistant-face.webp';img.alt='';img.width=30;img.height=30;a.prepend(img)});

// One persistent support entry; keep author attribution without repeated calls to action.
document.querySelectorAll('a[href*="open.kakao.com"]').forEach(a=>{if(a.closest('.desk-support,footer,.credit'))return;const card=a.closest('.chatcta,.askbox,.ls-cta');if(card){card.remove();return;}a.remove();});
document.querySelectorAll('.desk-contact-link img').forEach(img=>img.remove());
document.querySelectorAll('.chatcta,.askbox,.ls-cta').forEach(el=>el.remove());document.querySelectorAll('.bottom').forEach(el=>{if(!el.children.length)el.remove()});

const releaseDialog=document.createElement('dialog');releaseDialog.className='desk-release';releaseDialog.setAttribute('aria-labelledby','desk-release-title');releaseDialog.innerHTML='<div class="desk-release-head"><div><small>변경 내역</small><h2 id="desk-release-title">업데이트 안내</h2></div><button type="button" class="desk-release-close" aria-label="업데이트 안내 닫기">✕</button></div><div class="desk-release-body"><time datetime="2026-10-28">2026. 10. 28.</time><h3>첨부파일 형식 변환기 추가</h3><ul><li>도구함 &gt; 공통·문서에 <b>첨부파일 형식 변환기</b>를 추가했어요. 첨부할 파일을 끌어다 놓으면 재저장이 필요한 hwp·xls·doc·ppt를 골라 알려 줘요.</li><li><b>xls → xlsx</b>, <b>hwp → hwpx</b>(글·표 내용만)는 바로 바꿔 받을 수 있고, 여러 개는 zip 하나로 받아요.</li><li>프로그램(한글·엑셀·워드·파워포인트)에서 서식 그대로 다시 저장하는 방법과 공문용 안내 문구 복사도 있어요.</li><li>파일은 브라우저 안에서만 처리돼요.</li></ul><time datetime="2026-10-27">2026. 10. 27.</time><h3>도구함 12개 화면 통일</h3><ul><li>도구함 12개의 맨 위를 <b>한 줄</b>로 합쳤어요. (로고 · 도구 이름 · 버튼 · 카카오 문의)</li><li>12개 도구의 화면 폭·간격·탭·버튼·카드 색을 같은 모양으로 맞췄어요.</li><li>물품선정위원회: 기본 설정에서 <b>업체와 평가위원 칸을 나란히</b> 위쪽에 두어 내려가지 않고 바로 입력해요.</li><li>도구 창 위 닫기 막대를 얇고 밝게 바꿨어요.</li><li>기능과 입력해 둔 자료는 그대로예요.</li></ul><time datetime="2026-10-25">2026. 10. 25.</time><h3>디자인 일괄 수정</h3><ul><li>교행e 도구 5개(전북교행길라잡이·법인회계Master·본예산 길라잡이·식단표 편집기·교복길라잡이) 화면을 같은 모양으로 정리했어요.</li><li>글씨를 더 크고 또렷하게, 메뉴와 선택한 칸을 알아보기 쉽게 바꿨어요.</li><li>문의·건의는 카카오 오픈채팅으로 받아요.</li><li>기능과 입력해 둔 자료는 그대로예요.</li></ul><time datetime="2026-10-24">2026. 10. 24.</time><h3>문서등록대장 개인정보 점검기 추가 · 메뉴 이름 변경</h3><ul><li>도구함 &gt; 공통·문서에 <b>문서등록대장 개인정보 점검기</b>를 추가했어요. K-에듀파인 문서등록대장 CSV·엑셀을 넣으면 제목에 학생·학부모 실명, 생년월일, 전화번호가 들어간 문서를 찾아 주고, 정보목록 점검 결과를 엑셀로 내려받을 수 있어요.</li><li>파일은 서버로 보내지 않고 내 PC 안에서만 처리해요.</li><li>메뉴 이름 &#39;서식 생성&#39;을 <b>&#39;도구함&#39;</b>으로 바꿨어요. 계산기·점검·취합 도구도 함께 들어 있어서요.</li></ul><time datetime="2026-10-18">2026. 10. 18.</time><h3>학교운영위원회 결과 문서 번호 자동</h3><ul><li>심의결과 통보·결과 안내(공고)의 문서번호·공고번호를 비워 두면 개최 번호의 다음 번호로 자동으로 들어가요. (예: 개최 15 → 결과 16, 공고 2026-21 → 2026-22) 결과 통보일은 회의 날짜로 들어가요.</li><li>예전에 받은 기초자료 업로드 양식도 그대로 쓸 수 있어요. 새 양식에는 기본정보 시트에 &#39;참고&#39; 설명 칸만 추가됐어요.</li><li>다음 회의 때 기초자료 파일을 복사해 쓰면 문서번호·공고번호를 2씩 올려 주세요. (회의 한 번에 개최·결과로 2개씩 씁니다)</li></ul><time datetime="2026-10-16">2026. 10. 16.</time><h3>물품선정위원회 평가 엑셀 양식</h3><ul><li>엑셀 양식을 내려받아 업체·제품, 평가위원, 점수를 적어 올리면 한 번에 채워져요.</li><li>파일을 끌어다 놓아도 올라가요. 배점을 넘는 점수나 이름이 맞지 않는 줄은 알려 줘요.</li></ul><time datetime="2026-10-15">2026. 10. 15.</time><h3>학교운영위원회 자동서식 개선</h3><ul><li>학교운영위원회 자동서식: 한글(HWPX) 저장이 실제 학교 한글 서식 모양 그대로 나와요 (개최 통보·공고·참석자명부·회의록 표지·회의록·심의결과 통보·결과 공고·회의 진행 시나리오).</li><li>회의록에 기타 사항이 들어가지 않던 문제를 고쳤어요. 안건마다 보고사항·안건 설명자도 적을 수 있어요.</li><li>인쇄도 한글 서식과 같은 글꼴·여백으로 나오게 맞췄어요.</li><li>출석 체크를 기초자료에서 빼고 왼쪽 메뉴 ✅ 출석 체크로 따로 만들었어요. 체크 후 바로 회의록으로 갈 수 있어요.</li><li>기초자료 엑셀은 업로드 칸에 끌어 놓아도 올라가요.</li><li>문서등록대장은 법인회계Master로 옮겼어요.</li></ul><time datetime="2026-10-12">2026. 10. 12.</time><h3>디자인 수정</h3><ul>'+["서식 화면의 중복 분류 메뉴와 소개 배너를 정리했습니다.", "홈 검색창 아래의 큰 빈 공간을 줄였습니다.", "분류 탭과 서식 목록을 같은 흐름으로 배치했습니다."].map(t=>'<li>'+t+'</li>').join('')+'</ul><div class="desk-release-history"></div></div>';
document.body.append(releaseDialog);const history=releaseDialog.querySelector('.desk-release-history');const source=document.querySelector('.news');if(source){const copy=source.cloneNode(true);copy.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));copy.removeAttribute('id');history.append(copy);source.classList.add('desk-release-source');}
const releaseButton=document.createElement('button');releaseButton.type='button';releaseButton.className='desk-update-button';releaseButton.innerHTML='<span aria-hidden="true">↻</span><span>업데이트 안내</span>';releaseButton.addEventListener('click',()=>releaseDialog.showModal());releaseDialog.querySelector('.desk-release-close').addEventListener('click',()=>releaseDialog.close());releaseDialog.addEventListener('click',e=>{if(e.target===releaseDialog){const r=releaseDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)releaseDialog.close()}});

document.querySelectorAll('.news').forEach(el=>{if(!el.closest('.desk-release'))el.classList.add('desk-release-source')});

const homeUpdates=document.createElement('section');homeUpdates.className='desk-home-updates';homeUpdates.setAttribute('aria-labelledby','desk-home-updates-title');homeUpdates.innerHTML='<header><div><small>서비스 소식</small><h2 id="desk-home-updates-title">업데이트 안내</h2><p>새로 추가된 기능과 개선 내용을 확인하세요.</p></div><button type="button" class="desk-all-updates">전체 내역 보기 ↗</button></header><div class="desk-home-update-latest"><time datetime="2026-10-28">2026. 10. 28.</time><div><h3>첨부파일 형식 변환기 추가</h3><ul></ul></div></div>';
const previewList=homeUpdates.querySelector('ul');releaseDialog.querySelectorAll('.desk-release-body>ul:first-of-type>li').forEach(li=>previewList.append(li.cloneNode(true)));homeUpdates.querySelector('.desk-all-updates').addEventListener('click',()=>releaseDialog.showModal());
if(c.site==='law'){const shortcuts=document.getElementById('cards');shortcuts.classList.add('desk-home-shortcuts');document.querySelector('#panel-home .sec-head')?.classList.add('desk-home-shortcuts');shortcuts.before(homeUpdates);}
if(c.site==='jeonbuk-gyohaeng'){const shortcuts=document.querySelector('#menu .menu2');shortcuts.classList.add('desk-home-shortcuts');shortcuts.before(homeUpdates);document.querySelector('#menu .qhead')?.classList.add('desk-home-shortcuts');document.querySelector('#menu .qlist')?.classList.add('desk-home-shortcuts');}
if(c.site==='gyobok-guide'){const shortcuts=document.querySelector('[data-page="flow"] .reflinks');shortcuts.classList.add('desk-home-shortcuts');shortcuts.before(homeUpdates);}
if(c.site==='food'){homeUpdates.classList.add('desk-food-updates');const compact=document.createElement('details');compact.className='desk-food-update-summary';compact.innerHTML='<summary>업데이트 안내 <span>새 화면과 개선 사항 확인하기</span></summary>';compact.append(homeUpdates);document.getElementById('design-hero').after(compact);}

const relatedSites=[["법인회계Master", "https://law.lynqook.workers.dev/"],["본예산 길라잡이", "https://lynqook-gif.github.io/budget-guide/"],["식단표 편집기", "https://lynqook-gif.github.io/food/"],["교복길라잡이", "https://gyobok-guide.lynqook.workers.dev/"]];const related=document.createElement('section');related.className='desk-related-sites';related.innerHTML='<h3>교행e 사이트 바로가기</h3><div></div>';relatedSites.forEach(([label,url])=>{const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener';link.innerHTML='<span>'+label+'</span><span aria-hidden="true">↗</span>';related.querySelector('div').append(link)});homeUpdates.after(related);
if(c.site==='jeonbuk-gyohaeng'){document.querySelectorAll('.quick2').forEach(box=>{const heading=box.querySelector('h4,h3');if(heading)heading.textContent='교행e 사이트 바로가기';box.querySelectorAll('a').forEach(a=>a.remove());relatedSites.forEach(([label,url])=>{const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener';link.innerHTML='<span>'+label+'</span><span aria-hidden="true">↗</span>';box.append(link)});});}
document.querySelectorAll('footer.credit,footer#foot>.wrap').forEach(el=>{el.classList.add('desk-credit');el.innerHTML='<div>제작자: <b>정주고등학교 박지은</b></div><div>문의: <a href="mailto:ican6363@naver.com">ican6363@naver.com</a></div><div><a href="https://open.kakao.com/o/g4Tap2Ri" target="_blank" rel="noopener">카카오 오픈채팅 문의 ↗</a></div>'});
})();

/* BRAND-20261024 */
/* Presentation layer only. Preserve original handlers and DOM IDs. */
(()=>{
 const site="portal";
 const titles={portal:'전북교행길라잡이',law:'법인회계Master',food:'식단표 편집기',looks:'교복길라잡이',budget:'본예산 길라잡이'};
 const chat='https://open.kakao.com/o/g4Tap2Ri';
 document.body.classList.add('brand-'+site);
 let rail=document.querySelector('.desk-rail');
 if(site==='budget'){
  rail=document.createElement('aside');rail.className='brand-rail desk-rail';rail.setAttribute('aria-label','본예산 길라잡이 메뉴');rail.innerHTML='<div class="desk-brand"></div><nav class="desk-menu" aria-label="주 메뉴"></nav><div class="desk-bottom"></div>';document.body.prepend(rail);
  const home=document.getElementById('home'),view=document.getElementById('view');
  const back=document.getElementById('switchBtn')||[...document.querySelectorAll('button')].find(x=>/처음|홈으로|다시 선택/.test(x.textContent));
  const nav=rail.querySelector('nav');
  [['홈',()=>{if(!view.hidden&&back)back.click();home.scrollIntoView({behavior:'smooth'})}],['학교 유형 선택',()=>{if(!view.hidden&&back)back.click();document.querySelector('.pickcard')?.scrollIntoView({behavior:'smooth',block:'center'})}],['편성 절차',()=>{(view.hidden?document.querySelector('.pickcard'):document.querySelector('.budget-workspace'))?.scrollIntoView({behavior:'smooth',block:'start'})}],['공문 문안',()=>{(view.hidden?document.querySelector('.pickcard'):document.querySelector('.budget-current .budget-doc-column'))?.scrollIntoView({behavior:'smooth',block:'start'})}],['붙임 서식',()=>{(view.hidden?document.querySelector('.pickcard'):document.querySelector('.budget-current .attach'))?.scrollIntoView({behavior:'smooth',block:'center'})}]].forEach(([label,action],i)=>{const b=document.createElement('button');b.type='button';b.innerHTML='<span class="desk-icon">'+String(i+1).padStart(2,'0')+'</span><span>'+label+'</span>';if(i===0)b.classList.add('selected');b.addEventListener('click',action);nav.append(b)});
  const hero=home.querySelector('.hero');hero.replaceChildren();const copy=document.createElement('div');copy.innerHTML='<div class="desk-eyebrow">교행e와 함께하는 예산 편성</div><h1>새 학년도 예산,<br>차근차근 준비하세요.</h1><p class="brand-budget-desc">학교 유형을 선택하고 편성 절차와 공문 문안을 확인하세요.</p>';const mascot=document.createElement('div');mascot.className='brand-budget-mascot';mascot.setAttribute('role','img');mascot.setAttribute('aria-label','교행e 예산 안내 캐릭터');hero.append(copy,mascot);
 }
 if(!rail)return;
 const logo=rail.querySelector('.desk-brand');logo.replaceChildren();const img=document.createElement('img');img.src='design/brand-logo.png';img.alt='교행e';img.width=158;img.height=79;logo.append(img);
 const bar=document.createElement('div');bar.className='brand-topbar';const title=document.createElement('strong');title.textContent=titles[site];const help=document.createElement('a');help.href=chat;help.target='_blank';help.rel='noopener';help.textContent='문의·건의 ↗';bar.append(title,help);rail.after(bar);
 const bottom=rail.querySelector('.desk-bottom');bottom.replaceChildren();const support=document.createElement('a');support.className='desk-support';support.href=chat;support.target='_blank';support.rel='noopener';support.innerHTML='<span><b>카카오 오픈채팅 문의</b></span>';bottom.append(support);
 const nav=rail.querySelector('.desk-menu');
 const label=el=>el?.querySelector('span:last-child')?.textContent.trim()||el?.textContent.trim();
 function before(text,caption){const node=[...nav.querySelectorAll('button,a')].find(el=>label(el)===text);if(!node)return;const h=document.createElement('div');h.className='brand-menu-group';h.textContent=caption;node.before(h)}
 if(site==='portal'){before('업무 계산기','업무 도구');before('실무 지침','업무 참고');const updates=document.querySelector('#menu>.desk-home-updates'),cards=document.querySelector('#menu .menu2');if(updates&&cards)cards.after(updates)}
 if(site==='law'){const parent=nav.querySelector('.desk-accounting-parent');if(parent)parent.querySelector('span:nth-child(2)').textContent='수입·지출';const settle=[...nav.querySelectorAll('button')].find(x=>label(x)==='결산관리');const group=nav.querySelector('.desk-accounting');if(settle&&group)group.before(settle);before('예산관리','예산·결산');before('수입·지출','회계 업무');before('이사회','문서 업무');const cards=document.getElementById('cards'),updates=document.querySelector('#panel-home .desk-home-updates');if(cards&&updates)cards.after(updates)}
 if(site==='looks'){
  const source=document.querySelector('[data-go="basedata"]:not(.desk-rail *)');
  if(source){const b=document.createElement('button');b.type='button';b.innerHTML='<span class="desk-icon">02</span><span>기초자료 입력</span>';b.addEventListener('click',()=>{source.click();nav.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});nav.querySelector('button')?.after(b)}
  before('기초자료 입력','업무 준비');before('나라장터 입찰','업체 선정');before('서식 다운로드','서식·점검');
 }
 if(site==='food'){
  const find=[...nav.querySelectorAll('button')].find(x=>label(x)==='음식 찾기');const upload=document.getElementById('importBtn');
  if(upload){const b=document.createElement('button');b.type='button';b.innerHTML='<span class="desk-icon">↥</span><span>파일 불러오기</span>';b.addEventListener('click',()=>{[...nav.querySelectorAll('button')].find(x=>label(x)==='식단표 작성')?.click();upload.click()});find?.after(b)}
  before('식단표 작성','식단 작성');before('파일 불러오기','파일 관리');before('인쇄 / PDF','출력');
  const home=document.getElementById('desk-food-home'),launch=document.createElement('div');launch.className='brand-launches';
  [['식단표 작성','기간과 요일을 정하고 식단을 작성하세요.','식단표 작성'],['파일 불러오기','엑셀이나 백업 파일로 이어서 작성하세요.','파일 불러오기'],['엑셀 서식 받기','빈 양식을 받아 식단을 준비하세요.','엑셀 서식 받기']].forEach(([t,desc,target],i)=>{const b=document.createElement('button');b.type='button';b.className='brand-launch';b.innerHTML='<span>0'+(i+1)+'</span><strong>'+t+'</strong><small>'+desc+'</small>';b.addEventListener('click',()=>[...nav.querySelectorAll('button')].find(x=>label(x)===target)?.click());launch.append(b)});home?.prepend(launch);
 }
 if(site==='budget')before('편성 절차','예산 편성');
 // Match the approved photo using existing navigation actions; business handlers remain in source HTML.
 const paths={calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h1m3 0h1m3 0h1M8 18h1m3 0h1m3 0h1"/>',doc:'<path d="M14 2H5v20h14V7zM14 2v6h5M8 12h8M8 16h8M8 19h5"/>',folder:'<path d="M3 6h7l2 3h9v12H3zM3 6V3h7l2 3h8v3"/>',book:'<path d="M3 4c3-1 6-1 9 1 3-2 6-2 9-1v16c-3-1-6-1-9 1-3-2-6-2-9-1zM12 5v16"/>',link:'<path d="m10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l6-6a4 4 0 0 1 6 0M16 8l2-2a4 4 0 0 1 6 6l-6 6a4 4 0 0 1-6 0" transform="translate(1 0) scale(.9)"/>',money:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v5c0 4 16 4 16 0V5M4 10v5c0 4 16 4 16 0v-5M4 15v4c0 4 16 4 16 0v-4"/>',school:'<path d="m3 9 9-7 9 7v13H3zM9 22v-7h6v7M6 10h2m8 0h2M6 13h2m8 0h2"/>',people:'<circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-5c0-5 12-5 12 0v5zM16 13c4 0 6 2 6 5v3h-5"/>',meal:'<path d="M4 2v7m3-7v7m3-7v7M4 7h6M7 9v13M17 2c-4 4-4 10 0 10h3V2zM18 12v10"/>'};
 const icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name]||paths.doc)+'</svg>';
 nav.querySelectorAll('button,a').forEach(button=>{const holder=button.querySelector('.desk-icon');if(!holder)return;const name=label(button);holder.innerHTML=icon(/계산|예산|결산/.test(name)?'calc':/도구|파일|백업|등록대장/.test(name)?'folder':/사이트/.test(name)?'link':/지침/.test(name)?'book':/수입|지출/.test(name)?'money':/이사회|업체/.test(name)?'people':/학교/.test(name)?'school':/음식|식단/.test(name)?'meal':'doc');holder.setAttribute('aria-hidden','true')});
 const colors=[['#287de6','#e8f2ff'],['#159b78','#e3f7ef'],['#e98a15','#fff1df'],['#8654d5','#f0e9ff']];
 function cards(items){const box=document.createElement('div');box.className='photo-home-cards';items.forEach(([title,desc,symbol,action],i)=>{const b=document.createElement('button');b.type='button';b.className='photo-home-card';b.style.setProperty('--photo-color',colors[i%4][0]);b.style.setProperty('--photo-tint',colors[i%4][1]);b.innerHTML='<span class="photo-home-icon">'+icon(symbol)+'</span><strong>'+title+'</strong><small>'+desc+'</small><span class="photo-home-arrow">→</span>';b.addEventListener('click',action);box.append(b)});return box}
 if(site==='portal'){
  const h=document.querySelector('#design-hero h1');if(h)h.innerHTML='교육행정 업무,<br><span>한곳에서.</span>';
  const p=document.querySelector('#design-hero .desk-copy>p');if(p)p.textContent='계산기 · 도구 · 실무 지침을 쉽고 빠르게 찾아보세요.';
  const names=['업무 계산기','도구함','실무 지침','자주 쓰는 사이트'];document.querySelectorAll('#menu .menu2 .mcard .t').forEach((el,i)=>el.textContent=names[i]);
  document.querySelector('#menu .menu2 .c2 .tile')?.replaceChildren();const folder=document.querySelector('#menu .menu2 .c2 .tile');if(folder)folder.innerHTML=icon('folder');
 }
 if(site==='law'){
  const h=document.querySelector('#design-hero h1');if(h)h.innerHTML='법인회계,<br><span>한눈에 정리하세요.</span>';
  const p=document.querySelector('#design-hero .desk-copy>p');if(p)p.textContent='예산부터 결산, 이사회까지 학교법인 회계업무를 쉽고 정확하게.';
  const source=document.getElementById('cards');source?.classList.add('photo-native-cards');
  const activate=id=>()=>document.querySelector('#tabs [data-tab="'+id+'"]')?.click();
  source?.before(cards([['예산관리','본예산·추경 편성과 총괄표 작성','doc',activate('acc')],['수입·지출','결의서 작성부터 장부 정리까지','money',activate('sechul')],['결산관리','결산서 작성과 보고 자료 확인','calc',activate('settle')],['이사회','명단·회의 서식과 회의록 관리','people',activate('board')]]));
 }
 if(site==='food'){
  const h=document.querySelector('#design-hero h1');if(h)h.innerHTML='건강한 한 끼,<br><span>편리한 식단 작성.</span>';
  const invoke=name=>()=>[...nav.querySelectorAll('button')].find(x=>label(x)===name)?.click();
  document.querySelector('.brand-launches')?.before(cards([['식단표 작성','달력형 식단표를 쉽게 작성하세요.','meal',invoke('식단표 작성')],['파일 불러오기','기존 엑셀·백업 파일로 이어서 작성하세요.','folder',invoke('파일 불러오기')],['엑셀 서식 받기','바로 사용할 수 있는 빈 양식입니다.','doc',invoke('엑셀 서식 받기')]]));
 }
 if(site==='looks'){
  const h=document.querySelector('#design-hero h1');if(h)h.innerHTML='교복 구매,<br><span>절차부터 서식까지.</span>';
  const home=document.querySelector('[data-page="home"] .homepage');
  const go=id=>()=>{const source=document.querySelector('[data-go="'+id+'"]:not(.desk-rail *)');source?.click()};
  home?.prepend(cards([['한 번에 끝내기','공문 문안을 복사하고 붙임 서식까지 준비하세요.','doc',go('docs')],['기초자료 입력','학교·일정·금액을 한 번에 입력하세요.','folder',go('basedata')],['추진 절차','단계별 업무와 준비사항을 확인하세요.','calc',go('flow')],['입찰·계약 안내','나라장터 입찰·수의계약 안내','people',go('g2b')]]));
  const docs=[...nav.querySelectorAll('button')].find(b=>label(b)==='공문 예시');if(docs){docs.querySelector('span:last-child').textContent='한 번에 끝내기';nav.querySelector('button')?.after(docs)}
  document.querySelectorAll('[data-page="docs"] h1,[data-page="docs"]>.phead h2').forEach(el=>el.textContent='한 번에 끝내기');
 }
 if(site==='budget'){document.querySelectorAll('.pickcard').forEach(card=>{const span=document.createElement('span');span.className='photo-choice-icon';span.innerHTML=icon('school');span.setAttribute('aria-hidden','true');card.prepend(span)})}
 document.querySelectorAll('.desk-related-sites a').forEach((a,i)=>{const span=document.createElement('span');span.className='photo-related-icon';span.innerHTML=icon(['calc','school','meal','doc'][i%4]);span.setAttribute('aria-hidden','true');a.prepend(span)});
 document.querySelectorAll('.desk-home-update-history').forEach(history=>{const details=document.createElement('details');details.className='photo-history';const summary=document.createElement('summary');summary.textContent='이전 업데이트 보기';history.before(details);details.append(summary,history)});
 const homeNotice=site==='budget'?document.querySelector('#home .news'):document.querySelector('.desk-home-updates');
 if(homeNotice){
  const paired=document.createElement('div');paired.className='photo-home-bottom';homeNotice.before(paired);paired.append(homeNotice);
  const heading=homeNotice.querySelector('header h2,h3');if(heading)heading.textContent='공지사항';
  const small=homeNotice.querySelector('header small');if(small)small.textContent='업데이트 안내';
  homeNotice.querySelectorAll('.desk-home-update-latest ul').forEach(ul=>{const details=document.createElement('details');details.className='photo-notice-details';const summary=document.createElement('summary');summary.textContent='변경 내용 보기';ul.before(details);details.append(summary,ul)});
  const instructions={portal:['업무 계산기·도구함에서 필요한 업무를 선택하세요.','자료를 입력하거나 엑셀 파일을 불러오세요.','결과를 확인하고 필요한 파일로 저장하세요.'],law:['예산·수입·지출 등 필요한 업무를 선택하세요.','기초자료를 입력하고 작성 내용을 확인하세요.','미리보기에서 검토한 뒤 저장·출력하세요.'],food:['식단표 작성에서 기간과 요일을 정하세요.','식단을 입력하거나 엑셀·백업 파일을 불러오세요.','중복을 확인하고 엑셀·PDF로 저장하세요.'],looks:['한 번에 끝내기에서 필요한 공문을 찾아보세요.','기초자료를 입력하면 문안에 반영됩니다.','제목·본문을 복사하고 붙임 서식을 준비하세요.'],budget:['공립학교·사립학교 중 학교 유형을 선택하세요.','학교 정보와 학년도를 입력하고 단계를 확인하세요.','공문 문안을 복사하고 붙임 서식을 준비하세요.']};
  const guide=document.createElement('section');guide.className='photo-quick-guide';guide.innerHTML='<h2>사용 방법</h2><ol>'+instructions[site].map((t,i)=>'<li><b>'+(i+1)+'</b><span>'+t+'</span></li>').join('')+'</ol>';paired.append(guide);
 }
 const approvedBanner=site==='budget'?document.querySelector('#home>.hero'):document.getElementById('design-hero');
 approvedBanner?.classList.add('photo-live-hero');
 if(site==='portal'){const search=document.querySelector('.hero2 .hsearch');if(search&&approvedBanner)approvedBanner.append(search)}
 if(site==='looks'){const roles=document.querySelector('.roleswitch');if(roles)bar.append(roles)}
 // Source footer content is not a business function. Keep author, use only Kakao for contact.
 document.querySelectorAll('footer.credit,footer#foot>.wrap,footer .desk-credit,.desk-credit').forEach(el=>{el.classList.add('brand-credit');el.replaceChildren(document.createTextNode('제작자: 정주고등학교 박지은'))});
 document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{const p=a.closest('p,div');if(p&&p.textContent.trim().length<85&&!p.querySelector('input,button')){p.textContent='';p.hidden=true}else a.remove()});
})();

/* Readable suite: remove old banner mode, preserve original controls. */
(()=>{
 const hero=document.getElementById('design-hero');hero?.classList.remove('photo-live-hero','photo-fixed-hero');
 const eyebrow=hero?.querySelector('.desk-eyebrow');if(eyebrow)eyebrow.textContent='학교 행정, 교행e와 함께';
 document.querySelectorAll('.photo-notice-details').forEach(x=>x.open=true);
 const nav=document.querySelector('.desk-menu');
 if(document.body.classList.contains('brand-looks')&&nav){
  const docs=nav.querySelector('[data-desk-action="go:docs"]');
  if(docs){docs.querySelector('span:last-child').textContent='한 번에 끝내기';nav.querySelector('button')?.after(docs);}
 }
})();

/* Portal-specific home hierarchy; original shortcut elements retain their handlers. */
(()=>{
 const home=document.getElementById('menu'),cards=home?.querySelector('.menu2');
 const quickHeading=home?.querySelector('.qhead'),quickLinks=home?.querySelector('.qlist');
 if(cards&&quickHeading&&quickLinks){
  const h=quickHeading.querySelector('h2');if(h)h.textContent='바로 시작하기';
  const title=document.createElement('h2');title.className='portal-section-title';title.textContent='업무별로 찾아보기';
  cards.before(quickHeading,quickLinks,title);
 }
 const eyebrow=document.querySelector('#design-hero .desk-eyebrow');if(eyebrow)eyebrow.textContent='전북 교육행정 업무 포털';
 const input=document.querySelector('#design-hero .hsearch input');if(input)input.placeholder='어떤 업무를 찾으세요?  여비, 학운위, 물품…';
})();

/* Toolbox presentation; keep filtering and tool-opening handlers untouched. */
(()=>{
 const panel=document.getElementById('sec-forms'),banner=panel?.querySelector('.fbanner');
 if(banner){banner.innerHTML='<div><h2>도구함</h2><p>필요한 업무를 고르고 바로 시작하세요.</p></div><div class="toolbox-mascot" role="img" aria-label="교행이"></div>';}
 if(location.hash==='#toolbox')document.querySelector('.desk-menu [data-desk-action="page:sec-forms:도구함"]')?.click();
})();

/* Match the guide list to the compact toolbox layout. */
(()=>{
 const banner=document.querySelector('#guide .fbanner');
 if(banner)banner.innerHTML='<div><h2>실무 지침</h2><p>분야를 선택하고 필요한 원문을 바로 확인하세요.</p></div><div class="toolbox-mascot" role="img" aria-label="교행이"></div>';
 if(location.hash==='#guide')document.querySelector('.desk-menu [data-desk-action="page:guide:실무 지침"]')?.click();
})();

/* Related websites use the same compact list presentation. */
(()=>{
 const banner=document.querySelector('#sec-links .fbanner');
 if(banner)banner.innerHTML='<div><h2>자주 쓰는 사이트</h2><p>학교 행정에 필요한 외부 사이트를 새 탭으로 여세요.</p></div><div class="toolbox-mascot" role="img" aria-label="교행이"></div>';
 if(location.hash==='#sites')document.querySelector('.desk-menu [data-desk-action="page:sec-links:자주 쓰는 사이트"]')?.click();
})();

/* MOBILE-20261026 */
/* Presentation only: fold existing navigation without replacing its actions. */
(() => {
  const rail = document.querySelector('.desk-rail');
  const bar = document.querySelector('.brand-topbar');
  if (!rail || !bar) return;
  const mobile = matchMedia('(max-width:800px)');
  rail.id ||= 'gyohaeng-navigation';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'mobile-menu-toggle';
  toggle.setAttribute('aria-controls', rail.id);
  toggle.innerHTML = '<span aria-hidden="true">☰</span><span>메뉴</span>';
  const backdrop = document.createElement('button');
  backdrop.type = 'button';
  backdrop.className = 'mobile-menu-backdrop';
  backdrop.tabIndex = -1;
  backdrop.setAttribute('aria-label', '메뉴 닫기');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'mobile-menu-close';
  closeButton.textContent = '메뉴 닫기 ×';
  rail.prepend(closeButton);
  bar.prepend(toggle);
  rail.after(backdrop);
  const roles = bar.querySelector('.roleswitch');
  const roleAnchor = roles ? document.createComment('desktop role controls') : null;
  if (roles) roles.before(roleAnchor);
  let opened = false;
  function setOpen(value, restoreFocus = false) {
    opened = mobile.matches && value;
    document.body.classList.toggle('mobile-menu-open', opened);
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? '메뉴 닫기' : '메뉴 열기');
    rail.inert = mobile.matches && !opened;
    if (restoreFocus) toggle.focus();
    if (opened) closeButton.focus();
  }
  function syncViewport() {
    setOpen(false);
    if (roles) {
      if (mobile.matches) rail.querySelector('.desk-bottom')?.before(roles);
      else roleAnchor.after(roles);
    }
  }
  toggle.addEventListener('click', () => setOpen(!opened));
  closeButton.addEventListener('click', () => setOpen(false, true));
  backdrop.addEventListener('click', () => setOpen(false, true));
  rail.addEventListener('click', event => {
    const action = event.target.closest('.desk-menu button,.desk-menu a');
    if (action && !action.classList.contains('desk-accounting-parent')) setOpen(false, true);
  });
  document.addEventListener('keydown', event => {
    if (!opened) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false, true); }
    if (event.key === 'Tab') {
      const items = [...rail.querySelectorAll('button,a[href],input,select,[tabindex="0"]')]
        .filter(el => !el.disabled && el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  mobile.addEventListener('change', syncViewport);
  syncViewport();
})();
