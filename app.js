// ===== CONFIG =====
// ӨӨРИЙН Google Apps Script Web App URL-ээр солино уу!
// Жишээ: https://script.google.com/macros/s/ТАНЫ_APPS_SCRIPT_ID/exec
// const API_BASE = 'https://script.google.com/macros/s/AKfycbxGAbzrXcMM-f0dj0enI_5kQmamH95r5oTS9jbfhbj_zdD72ndEimkvPzXiJc9qAQbE/exec';
// const API_BASE = 'https://script.google.com/macros/s/AKfycbzjtBfbwfHZ2-CJIrXK2-qDqMCCbb46cVNRNCeQEeQXAJqUrn2IJHIZZlJnqMoKUQk4/exec';
// const API_BASE = 'https://script.google.com/macros/s/AKfycbxe_jyURzdDyQt9y6G7mJn0v0ea4Ix6sbO33eqNoP1qXBsnj-UkUCXzKi9-1GqfpzNA/exec';
// const API_BASE = 'https://script.google.com/macros/s/AKfycbzjtBfbwfHZ2-CJIrXK2-qDqMCCbb46cVNRNCeQEeQXAJqUrn2IJHIZZlJnqMoKUQk4/exec';
// const API_BASE = 'https://script.google.com/macros/s/AKfycbwNE56WMvvmaoZH1fAuGUVbqyx2CrqWqV-uuPO6tDB545kQTovnIlCWRx_rrLD2XhVG/exec';
const API_BASE = 'https://script.google.com/macros/s/AKfycby3_ydBjGzG_Arw-QZXBiTCiL0YeAbL4_xBCaB14SbVptlUZ1q6BICSX7HigPPc84Jf/exec';



// ===== Helpers =====
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

function toast(msgEl, text, ok=true){
  if(!msgEl) return;
  const lang = localStorage.getItem('lang') || 'mn';
  const successMsg = lang === 'mn' ? 'Санал амжилттай илгээгдлээ.' : 'Feedback submitted successfully.';
  const errorMsg = lang === 'mn' ? 'Алдаа гарлаа.' : 'Error occurred.';
  const networkError = lang === 'mn' ? 'Сүлжээний алдаа.' : 'Network error.';
  
  if (ok) {
    msgEl.textContent = text || successMsg;
    msgEl.className = 'text-sm text-green-600';
  } else {
    msgEl.textContent = text || errorMsg;
    msgEl.className = 'text-sm text-red-600';
  }
  
  // Network алдааны тохиолдол
  if (text === 'Сүлжээний алдаа.' || text === 'Network error.') {
    msgEl.textContent = networkError;
  }
  
  setTimeout(() => { msgEl.textContent = ''; }, 5000);
}

// --- 2. Сүлжээний функцүүд (Энд оруулна) ---
async function getJSON(url) {
  const r = await fetch(url, { method: 'GET' });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function postJSON(url, payload) {
  const r = await fetch(url, {
    method: 'POST',
    // 'application/json' биш 'text/plain' ашиглаж CORS-оос зайлсхийнэ
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, 
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

// ===== Theme =====
function initTheme(){
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ html.classList.add('dark'); }
  $('#themeToggle')?.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
}

// ===== i18n =====
const I18N = {
  mn: {
    title_home: "М.Говьсайхан",
    title_projects: "Төслийн сан ",
    title_news: "Мэдээ — Санал хүсэлт",
    nav_home:"НҮҮР", nav_projects:"ТӨСӨЛ", nav_news:"МЭДЭЭ", nav_book:"👍🏻САНАЛ ӨГӨХ",
    badge_exec:"НОСК ХК",
    hero_title:"Нийслэлийн орон сууцны корпораци ХК гүйцэтгэх захирал <span class='grad'>М.Говьсайхан</span>",
    hero_desc:"Бид иргэдийн ая тухтай, таатай орчинд амьдрах нөхцөлийг бүрдүүлэхийн тулд олон төсөл хөтөлбөрийг амжилттай хэрэгжүүлж байна.",
    cta_meeting:"👍🏻 Санал өгөх", cta_projects:"Төслийн санг үзэх",
    kpi_exp_n:"22+ жил", kpi_exp_t:"Туршлага", kpi_done_n:"22+ төсөл", kpi_done_t:"Хэрэгжүүлж буй", kpi_cs_n:"92%", kpi_cs_t:"Ханын материал ОСТ Газар чөлөөлөлт",
    bio_title:"Нийгэмд хийж хэрэгжүүлсэн төсөл хөтөлбөр", bio_name:"М.Говьсайхан", bio_role:"Гүйцэтгэх захирал",
    bio_desc:"Нийслэлд анх удаа дотоод бонд гаргаж 2.000 орчим иргэнийг орон сууцанд оруулсан.",
    bio_point1:"Улаанбаатар хотын дэд төвүүдийг хөгжүүлэхээр ‘’Улаанбаатар хотын түгжрэлийг бууруулж, гэр хорооллыг орон сууцжуулах’’ тухай хуулийг батлуулжээ.",
    bio_point2:"Сэлбэ дэд төвийг түшиглэн гэр хорооллыг орон сууцжуулах төслийн хүрээнд 12 мянган айлын орон сууцны төслийг эхлүүлжээ.",
    bio_point3:"Улаанбаатар хотод түрээсийн орон сууцны олон талт хэлбэрийг амжилттай хэрэгжүүлжээ.",
    bio_point4:"Ашиглалтын шаардлага хангахгүй орон сууцнуудыг буулгаж, дахин төлөвлөн иргэдийг эрүүл аюулгүй орчинд амьдрах нөхцөлөөр хангажээ.",
    bio_point5:"Эрчим хүчний хэмнэлттэй төслүүдийг дэмжиж Улаанбаатар хотод анх удаа дулааны төлбөр төлөхгүйгээр амьдарч болох загвар орон сууцыг ашиглалтад оруулжээ.",
    bio_point6:"Улаанбаатар хотын шинэ суурьшлын бүсийг тэлэх ажлын хүрээнд Төр, хувийн хэвшлийн түншлэлтэй хамтран томоохон төслүүдийг эхлүүлэв.",
    bio_point7:"Улаанбаатар хотод орлогод нийцсэн ногоон орон сууцны төслийг хэрэгжүүлж 800 айлын орон сууцыг барьж эхэлсэн.",
    featured_title:"Онцлох төслүүд", featured_all:"Бүгдийг харах →", latest_news:"Сүүлийн мэдээ", latest_news_desc:"Шинэ нийтлэлүүд мэдээний хуудсаас автоматаар татагдана.", see_all_news:"Бүгдийг харах →",
    projects_title:"Төслийн сан", projects_desc:"Мэдээлэл татаж байна.",
    all_categories:"Бүх ангилал", all_status:"Бүх төлөв", view_grid:"Grid", view_list:"List",
    news_title:"Мэдээ мэдээлэл", news_desc:"Мэдээлэл татаж байна.",
    tab_news:"Мэдээ", tab_feedback:"Санал",
    no_results:"Илэрц олдсонгүй.", all:"Бүгд",
    search:"Хайлт...", name_ph:"Нэр *", phone_ph:"Утас *", email_ph:"И-мэйл",
    detail_ph:"Дэлгэрэнгүй...", send:"Илгээх",
    name_opt_ph:"Нэр", phone_opt_ph:"Утас", email_opt_ph:"И-мэйл", fb_ph:"Таны санал...",
    rating:"Үнэлгээ:",
    feedback_desc:"Та саналаа үлдээнэ үү. Бид таны саналыг анхааралтай хүлээн авч, шийдвэрлэх болно."
  },
  en: {
    title_home:"M.Govisaikhan",
    title_projects:"Projects — Executive Portfolio",
    title_news:"News — Feedback — Executive",
    nav_home:"Home", nav_projects:"Projects", nav_news:"News", nav_book:"👍🏻Vote",
    badge_exec:"NOSK LLC",
    hero_title:"<span class='grad'>M.Govisaikhan</span> CEO Capital Housing Corporation LLC",
    hero_desc:"We are successfully implementing many projects and programs to create conditions for citizens to live in a comfortable and pleasant environment.",
    cta_meeting:"👍🏻 Give Feedback", cta_projects:"Browse projects",
    kpi_exp_n:"22+ yrs", kpi_exp_t:"Experience", kpi_done_n:"22+ projects", kpi_done_t:"Delivered", kpi_cs_n:"92%", kpi_cs_t:"Wall material OST land clearance",
    bio_title:"Projects implemented in the community", bio_name:"M.Govisakhan", bio_role:"Ceo",
    bio_desc:"For the first time in the capital, domestic bonds were issued and approximately 2,000 citizens were placed in housing.",
    bio_point1:"The law on Reducing congestion in Ulaanbaatar and housing ger districts was approved to develop sub-centers in Ulaanbaatar.",
    bio_point2:"A housing project for 12,000 families has been launched as part of the housing project for ger districts, based on the Selbe sub-center.",
    bio_point3:"A variety of rental housing options have been successfully implemented in Ulaanbaatar.",
    bio_point4:"Unusable apartments were demolished and redesigned to provide citizens with a healthy and safe living environment.",
    bio_point5:"In support of energy-efficient projects, a model apartment where you can live without paying heating bills has been put into operation for the first time in Ulaanbaatar.",
    bio_point6:"As part of the expansion of the new residential area of Ulaanbaatar, major projects have been launched in collaboration with the public-private partnership.",
    bio_point7:"The implementation of an income-friendly green housing project in Ulaanbaatar has begun, with the construction of 800 apartments.",
    featured_title:"Featured Projects", featured_all:"View all →", latest_news:"Latest News", latest_news_desc:"Newest posts are pulled from the news page.", see_all_news:"View all →",
    projects_title:"Projects", projects_desc:"Data is loading",
    all_categories:"All categories", all_status:"All status", view_grid:"Grid", view_list:"List",
    news_title:"News & Updates", news_desc:"Pulled from Sheets with skeleton loading.",
    tab_news:"News", tab_feedback:"Feedback",
    no_results:"No results.", all:"All",
    search:"Search...", name_ph:"Name *", phone_ph:"Phone *", email_ph:"Email",
    detail_ph:"Details...", send:"Send",
    name_opt_ph:"Name", phone_opt_ph:"Phone", email_opt_ph:"Email", fb_ph:"Your feedback...",
    rating:"Rating:",
    feedback_desc:"Please leave your feedback. We will carefully review and address your suggestions."
  }
};

function applyI18n(){
  const lang = localStorage.getItem('lang') || 'mn';
  // text nodes
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const html = I18N[lang]?.[key];
    if(html != null){ el.innerHTML = html; }
  });
  // placeholders
  $$('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = I18N[lang]?.[key];
    if(val != null){ el.setAttribute('placeholder', val); }
  });
  // title
  const tkey = $('title')?.getAttribute('data-i18n');
  if(tkey && I18N[lang]?.[tkey]) document.title = I18N[lang][tkey];
  // button label
  const btn = $('#langToggle'); if(btn) btn.textContent = (lang==='mn' ? 'MN' : 'EN');
}

function initLang(){
  applyI18n();
  $('#langToggle')?.addEventListener('click', () => {
    const cur = localStorage.getItem('lang') || 'mn';
    const next = cur === 'mn' ? 'en' : 'mn';
    localStorage.setItem('lang', next);
    applyI18n();
  });
}

// ===== Skeletons =====
function newsSkeleton(n=6){
  return Array.from({length:n}).map(()=>`
    <article class="news-card">
      <div class="skel" style="height:360px"></div>
      <div class="news-body">
        <div class="skel" style="height:14px;width:60%"></div>
        <div class="skel" style="height:18px;width:85%;margin-top:10px"></div>
        <div class="skel" style="height:60px;width:100%;margin-top:10px"></div>
      </div>
    </article>
  `).join('');
}

function projectSkeletonGrid(n=6){
  return Array.from({length:n}).map(()=>`
    <article class="news-card">
      <div class="skel" style="height:360px"></div>
      <div class="news-body">
        <div class="skel" style="height:18px;width:70%"></div>
        <div class="skel" style="height:14px;width:40%;margin-top:8px"></div>
      </div>
    </article>
  `).join('');
}

function projectSkeletonList(n=6){
  return Array.from({length:n}).map(()=>`
    <div class="row">
      <div class="skel" style="width:80px;height:56px;border-radius:.5rem"></div>
      <div class="skel" style="height:18px;width:60%"></div>
      <div class="skel" style="height:14px;width:40%"></div>
      <div class="skel" style="height:14px;width:40%"></div>
      <div class="skel" style="height:14px;width:60px"></div>
    </div>
  `).join('');
}

// ===== News card template =====
function newsCard(item) {
  const img = item.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop';
  const link = item.link || '#';
  const date = item.date || '';
  return `
  <article class="news-card">
    <img class="news-cover" src="${img}" alt="cover">
    <div class="news-body">
      <div class="news-meta">${date} • ${item.category || 'Мэдээ'}</div>
      <h3 class="news-title mt-1">${item.title || 'Гарчиг'}</h3>
      <p class="text-gray-600 mt-2">${item.summary || ''}</p>
      <a class="inline-block mt-3 text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Дэлгэрэнгүй →</a>
    </div>
  </article>`;
}

// ===== Pagination =====
const GRID_DATA = {};
const PER_PAGE = 9;

function initPagination(gridId) {
  document.getElementById(gridId + '_prev')?.addEventListener('click', () => {
    const d = GRID_DATA[gridId];
    if (d && d.page > 1) { d.page--; drawPage(gridId); }
  });
  document.getElementById(gridId + '_next')?.addEventListener('click', () => {
    const d = GRID_DATA[gridId];
    if (!d) return;
    const total = Math.ceil(d.items.length / PER_PAGE);
    if (d.page < total) { d.page++; drawPage(gridId); }
  });
}

function setupGrid(gridId, items, renderFn) {
  if (!GRID_DATA[gridId]) initPagination(gridId);
  GRID_DATA[gridId] = { items, renderFn, page: 1 };
  drawPage(gridId);
}

function drawPage(gridId) {
  const d = GRID_DATA[gridId];
  if (!d) return;
  const total = Math.max(1, Math.ceil(d.items.length / PER_PAGE));
  const p = d.page;
  const slice = d.items.slice((p - 1) * PER_PAGE, p * PER_PAGE);
  const grid = document.getElementById(gridId);
  if (grid) grid.innerHTML = slice.map(d.renderFn).join('');
  const nav = document.getElementById(gridId + '_nav');
  if (nav) nav.style.display = total > 1 ? 'flex' : 'none';
  const prevBtn = document.getElementById(gridId + '_prev');
  const nextBtn = document.getElementById(gridId + '_next');
  const info = document.getElementById(gridId + '_info');
  if (prevBtn) prevBtn.disabled = p <= 1;
  if (nextBtn) nextBtn.disabled = p >= total;
  if (info) info.textContent = `${p} / ${total}`;
}

// ===== News =====
async function loadNews(){
  const grid = $('#newsGrid');
  const empty = $('#newsEmpty');
  if(!grid) return;
  grid.innerHTML = newsSkeleton(6);
  try{
    const q = $('#q')?.value?.trim()?.toLowerCase() || '';
    const catVal = $('#cat')?.value || '';
    const res = await getJSON(`${API_BASE}?action=listNews`);
    const all = res?.data ?? [];
    // categories
    const cats = Array.from(new Set(all.map(x => x.category).filter(Boolean)));
    if($('#cat')){
      const lang = localStorage.getItem('lang') || 'mn';
      const allTxt = I18N[lang].all;
      $('#cat').innerHTML = `<option value="">${allTxt}</option>` + cats.map(c => `<option ${c===catVal?'selected':''}>${c}</option>`).join('');
    }
    // filter
    const items = all.filter(x => (catVal ? x.category===catVal : true))
                     .filter(x => (q ? (x.title?.toLowerCase().includes(q) || x.summary?.toLowerCase().includes(q)) : true));
    if(items.length === 0){
      grid.innerHTML = '';
      empty?.classList.remove('hidden');
      return;
    }
    empty?.classList.add('hidden');
    setupGrid('newsGrid', items, newsCard);
  }catch(e){
    console.error(e);
    grid.innerHTML = '';
    empty?.classList.remove('hidden');
  }
}

// ===== Projects =====
async function loadProjects(){
  const g = $('#projectsGrid');
  const l = $('#projectsList');
  if(!g && !l) return;
  const isGrid = !l || l.classList.contains('hidden');
  if(g) g.innerHTML = projectSkeletonGrid(6);
  if(l && !isGrid) l.innerHTML = projectSkeletonList(6);
  try{
    const q = $('#p_q')?.value?.trim()?.toLowerCase() || '';
    const catVal = $('#p_cat')?.value || '';
    const statusVal = $('#p_status')?.value || '';
    const res = await getJSON(`${API_BASE}?action=listProjects`);
    const all = res?.data ?? [];
    // fill cats
    const cats = Array.from(new Set(all.map(x => x.category).filter(Boolean)));
    if($('#p_cat')){
      const lang = localStorage.getItem('lang') || 'mn';
      const allTxt = I18N[lang].all_categories;
      $('#p_cat').innerHTML = `<option value="">${allTxt}</option>` + cats.map(c => `<option ${c===catVal?'selected':''}>${c}</option>`).join('');
    }
    // filter
    const items = all.filter(x => (catVal ? x.category===catVal : true))
                     .filter(x => (statusVal ? x.status===statusVal : true))
                     .filter(x => (q ? (x.title?.toLowerCase().includes(q) || x.location?.toLowerCase().includes(q)) : true));

    if(items.length === 0){
      if(g) g.innerHTML = '';
      if(l) l.innerHTML = '';
      $('#p_empty')?.classList.remove('hidden');
      return;
    }
    $('#p_empty')?.classList.add('hidden');

    if(g) setupGrid('projectsGrid', items, projectCard);
    if(l) l.innerHTML = items.map(it => projectRow(it)).join('');
  }catch(e){
    console.error(e);
    if(g) g.innerHTML = '';
    if(l) l.innerHTML = '';
    $('#p_empty')?.classList.remove('hidden');
  }
}

function projectCard(p){
  const img = p.cover || 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop';
  const link = p.link || '#';
  return `
  <article class="news-card">
    <img class="news-cover" src="${img}" alt="${p.title||'project'}">
    <div class="news-body">
      <div class="news-meta">${p.startDate||''} • ${p.status||''} • ${p.category||''}</div>
      <h3 class="news-title mt-1">${p.title || 'Project'}</h3>
      <p class="text-gray-600 mt-2">${p.location || ''}</p>
      <a class="inline-block mt-3 text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Дэлгэрэнгүй →</a>
    </div>
  </article>`;
}

function projectRow(p){
  const img = p.cover || 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop';
  const link = p.link || '#';
  return `
  <div class="row">
    <img src="${img}" alt="${p.title||'project'}"/>
    <div class="font-bold">${p.title || 'Project'} <div class="text-sm text-gray-500">${p.location||''}</div></div>
    <div class="text-sm">${p.category||''}</div>
    <div class="text-sm">${p.status||''}</div>
    <div class="text-right"><a class="text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Link</a></div>
  </div>`;
}

// Featured on homepage
async function loadFeatured(){
  const el = $('#featuredGrid');
  if(!el) return;
  el.innerHTML = projectSkeletonGrid(3);
  try{
    const res = await getJSON(`${API_BASE}?action=listProjects`);
    const items = (res?.data ?? []).filter(x => x.featured === true).slice(0,3);
    if(items.length === 0){ el.innerHTML = ''; return; }
    el.innerHTML = items.map(projectCard).join('');
  }catch(e){
    console.error(e);
    el.innerHTML = '';
  }
}

// ===== Feedback =====
function bindFeedback(){
  const form = $('#feedbackForm'); 
  if(!form) return;
  
  const btn = $('#fbBtn'); 
  const msg = $('#fbMsg');
  const stars = $('#stars'); 
  let rating = 5;
  
  // Одны үнэлгээг эхлээд идэвхтэй болгох
  if (stars) {
    $$('[data-v]', stars).forEach(b => b.classList.add('active'));
  }
  
  // Одны үнэлгээг сонгох
  stars?.addEventListener('click', (e) => {
    if(e.target.closest('.star')){
      rating = Number(e.target.dataset.v);
      $$('[data-v]', stars).forEach(b => b.classList.toggle('active', Number(b.dataset.v) <= rating));
      if (form.querySelector('[name="rating"]')) {
        form.querySelector('[name="rating"]').value = String(rating);
      }
    }
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Хэлний тохиргоог авах
    const lang = localStorage.getItem('lang') || 'mn';
    const sendingText = I18N[lang]?.send || 'Илгээх';
    
    // Товчны текстийг өөрчлөх
    btn.disabled = true; 
    btn.textContent = sendingText + '...';
    
    try {
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      
      // Хоосон талбаруудыг шалгах
      if (!payload.name || !payload.phone) {
        toast(msg, lang === 'mn' ? 'Нэр болон утасны дугаар оруулна уу.' : 'Please enter name and phone.', false);
        btn.disabled = false;
        btn.textContent = sendingText;
        return;
      }
      
      // API руу илгээх
      const res = await postJSON(API_BASE, { 
        action: 'submitFeedback', 
        payload: { 
          ...payload, 
          page: location.pathname 
        } 
      });
      
      if(res.ok){
        // Формыг цэвэрлэх
        form.reset();
        
        // Одны үнэлгээг дахин 5 болгох
        if (stars) {
          rating = 5;
          $$('[data-v]', stars).forEach(b => b.classList.toggle('active', Number(b.dataset.v) <= rating));
          if (form.querySelector('[name="rating"]')) {
            form.querySelector('[name="rating"]').value = '5';
          }
        }
        
        toast(msg, lang === 'mn' ? 'Санал амжилттай илгээгдлээ.' : 'Feedback submitted successfully.', true);
      } else {
        toast(msg, res.message || (lang === 'mn' ? 'Алдаа гарлаа.' : 'Error occurred.'), false);
      }
    } catch(err) {
      console.error('Feedback error:', err);
      
      // API_BASE URL шалгах
      if (!API_BASE || API_BASE.includes('AKfycbxGAbzrXcMM-f0dj0enI_5kQmamH95r5oTS9jbfhbj_zdD72ndEimkvPzXiJc9qAQbE')) {
        toast(msg, lang === 'mn' ? 'API холболтын тохиргоог шалгана уу!' : 'Please check API configuration!', false);
      } else {
        toast(msg, lang === 'mn' ? 'Сүлжээний алдаа.' : 'Network error.', false);
      }
    } finally { 
      btn.disabled = false; 
      btn.textContent = sendingText; 
    }
  });
}

// ===== Tabs =====
function initTabs(){
  const tabs = $$('.tab');
  if(!tabs.length) return;
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const id = t.dataset.tab;
    $$('.tab-pane').forEach(p => p.classList.add('hidden'));
    $('#'+id)?.classList.remove('hidden');
  }));
}

// ===== View toggles =====
function initProjectViewToggle(){
  const gbtn = $('#viewGrid'); const lbtn = $('#viewList');
  const g = $('#projectsGrid'); const l = $('#projectsList');
  if(!gbtn || !lbtn) return;
  gbtn.addEventListener('click', () => {
    gbtn.classList.add('active'); lbtn.classList.remove('active');
    g?.classList.remove('hidden'); l?.classList.add('hidden');
    loadProjects();
  });
  lbtn.addEventListener('click', () => {
    lbtn.classList.add('active'); gbtn.classList.remove('active');
    l?.classList.remove('hidden'); g?.classList.add('hidden');
    loadProjects();
  });
}

// ===== Facebook Reels (from Google Sheets) — robust with fallbacks =====
function reelsSkeleton(n=3){
  return Array.from({length:n}).map(() => `
    <article class="news-card">
      <div class="skel" style="height:320px"></div>
      <div class="news-body">
        <div class="skel" style="height:14px;width:40%"></div>
      </div>
    </article>
  `).join('');
}

// Бүх reel видео нэг хэмжээтэй — гар утасд 320px, desktop-д max 480px
const REEL_H = 'clamp(420px,65vw,600px)';

function renderReel(url, title=''){
  try{
    const safeTitle = title ? title.replace(/"/g,'&quot;') : '';
    const wrap = `position:relative;height:${REEL_H};border-radius:1rem;overflow:hidden`;

    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?\/\s]+)/);
    if(ytMatch){
      const src = `https://www.youtube.com/embed/${ytMatch[1]}?playsinline=1&rel=0`;
      return `
        <article class="news-card">
          <div style="${wrap}">
            <iframe src="${src}" style="position:absolute;inset:0;width:100%;height:100%;border:none"
              allowfullscreen allow="autoplay; picture-in-picture; web-share"
              title="${safeTitle || 'YouTube Video'}"></iframe>
          </div>
          ${title ? `<div class="news-body"><div class="news-title mt-2">${title}</div></div>` : ''}
        </article>`;
    }

    // Шууд видео файл (.mp4, .webm, .ogg, .mov)
    if(/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)){
      return `
        <article class="news-card">
          <div style="${wrap}">
            <video src="${url}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"
              controls playsinline preload="metadata"
              title="${safeTitle || 'Видео'}"></video>
          </div>
          ${title ? `<div class="news-body"><div class="news-title mt-2">${title}</div></div>` : ''}
        </article>`;
    }

    // Facebook Reel / Video
    const enc = encodeURIComponent(url);
    const src = `https://www.facebook.com/plugins/video.php?href=${enc}&show_text=false&t=0`;
    return `
      <article class="news-card">
        <div style="${wrap}">
          <iframe src="${src}" style="position:absolute;inset:0;width:100%;height:100%;border:none;overflow:hidden"
            scrolling="no" frameborder="0" allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="${safeTitle || 'Facebook Reel'}"></iframe>
        </div>
        ${title ? `<div class="news-body"><div class="news-title mt-2">${title}</div></div>` : ''}
      </article>`;
  }catch(e){
    return '';
  }
}

function parseManualReels(){
  // HTML-д шууд оруулах:
  // data-reels='["url1","url2"]'  — жагсаалт
  // data-reels='[{"url":"...","title":"..."},...]'  — title-тэй
  const grid = document.getElementById('reelsGrid');
  if(!grid) return [];
  try{
    const raw = grid.getAttribute('data-reels') || '[]';
    const arr = JSON.parse(raw);
    if(!Array.isArray(arr)) return [];
    return arr.filter(Boolean).map(item =>
      typeof item === 'string' ? {url: item, title: ''} : {url: item.url || '', title: item.title || ''}
    ).filter(x => x.url);
  }catch(e){ return []; }
}

function filterNewsAsReels(items){
  if(!Array.isArray(items)) return [];
  return items.filter(it => {
    const link = (it.link || it.LinkURL || '').toString();
    const cat = (it.category || it.Category || '').toString().toLowerCase();
    return link.includes('facebook.com/') && (link.includes('/reels/') || link.includes('/videos/')) ||
           ['reel','reels','fb','facebook'].includes(cat);
  }).map(it => ({ url: it.link || it.LinkURL, title: it.title || it.Title || '' }));
}

async function tryListReels(){
  try{
    const r = await getJSON(`${API_BASE}?action=listReels`);
    if(r && r.data && r.data.length){
      return r.data.filter(x => x && x.url).map(x => ({url:x.url, title:x.title || ''}));
    }
    return [];
  }catch(e){ return []; }
}

async function tryNewsFallback(){
  try{
    const r = await getJSON(`${API_BASE}?action=listNews`);
    return filterNewsAsReels(r && r.data ? r.data : []);
  }catch(e){ return []; }
}

async function loadReelsFromSheet(){
  const grid  = document.getElementById('reelsGrid');
  const empty = document.getElementById('reelsEmpty');
  if(!grid) return;

  // data-no-api="true" бол зөвхөн HTML-д оруулсан data-reels ашиглана (API дуудахгүй)
  if(grid.getAttribute('data-no-api') === 'true'){
    const items = parseManualReels();
    const limitAttr = grid.getAttribute('data-limit');
    const limit = limitAttr ? parseInt(limitAttr, 10) : 0;
    const showing = (Number.isFinite(limit) && limit > 0) ? items.slice(0, limit) : items;
    if(!showing.length){
      grid.innerHTML = '';
      if(empty) empty.classList.remove('hidden');
    } else {
      if(empty) empty.classList.add('hidden');
      grid.innerHTML = showing.map(it => renderReel(it.url, it.title)).join('');
    }
    return;
  }

  // skeleton
  grid.innerHTML = reelsSkeleton(3);

  // 1) Sheets: listReels
  let items = await tryListReels();

  // 2) Fallback: News дотроос FB reel/video холбоос
  if(!items.length) items = await tryNewsFallback();

  // 3) Manual fallback: data-reels
  if(!items.length) items = parseManualReels();

  // Хоосон бол
  if(!items.length){
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    console.warn('Reels not found: check listReels endpoint, News links, or data-reels.');
    return;
  }

  // ▼ НҮҮРТ ЗӨВХӨН 3-ХАН ХАРАГДУУЛАХ
  const limitAttr = grid.getAttribute('data-limit');
  const limit = limitAttr ? parseInt(limitAttr, 10) : 0;
  if(Number.isFinite(limit) && limit > 0){
    items = items.slice(0, limit);
  }

  if (empty) empty.classList.add('hidden');
  grid.innerHTML = items.map(it => renderReel(it.url, it.title)).join('');
}


// ===== Home Latest News =====
async function loadHomeNews(){
  const el = $('#homeNewsGrid');
  if(!el) return;
  el.innerHTML = newsSkeleton(3);
  try{
    const res = await getJSON(`${API_BASE}?action=listNews`);
    const items = (res?.data ?? []).slice(0,3);
    if(items.length === 0){ el.innerHTML = ''; return; }
    el.innerHTML = items.map(item => {
      const img = item.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop';
      const link = item.link || '#';
      const date = item.date || '';
      return `
      <article class="news-card">
        <img class="news-cover" src="${img}" alt="cover">
        <div class="news-body">
          <div class="news-meta">${date} • ${item.category || 'Мэдээ'}</div>
          <h3 class="news-title mt-1">${item.title || 'Гарчиг'}</h3>
          <p class="text-gray-600 mt-2">${item.summary || ''}</p>
          <a class="inline-block mt-3 text-blue-600 font-semibold" href="${link}" target="_blank" rel="noopener">Дэлгэрэнгүй →</a>
        </div>
      </article>`;
    }).join('');
  }catch(e){
    console.error(e);
    el.innerHTML = '';
  }
}

// ===== Ангилалаар мэдээ татах (СБД МАН + НОСК ХК хоёр хуудас зэрэг) =====
// categories: string эсвэл array — аль нэг ангилалтай мэдээ бүгд гарна
async function loadCategoryNews(categories, gridId){
  const el = document.getElementById(gridId);
  if(!el) return;
  const cats = Array.isArray(categories)
    ? categories.map(c => c.trim().toLowerCase())
    : [categories.trim().toLowerCase()];
  el.innerHTML = newsSkeleton(3);
  try{
    const res = await getJSON(`${API_BASE}?action=listNews`);
    const all = res?.data ?? [];
    const items = all
      .filter(x => {
        const cat = (x.category || '').trim().toLowerCase();
        return cats.some(tc => cat === tc || cat.includes(tc));
      })
    if(!items.length){
      el.innerHTML = '';
      return;
    }
    setupGrid(gridId, items, newsCard);
  }catch(e){
    console.error(e);
    el.innerHTML = '';
  }
}

// ===== Hamburger Menu =====
const ICON_MENU  = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const ICON_CLOSE = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function initHamburger(){
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if(!btn || !menu) return;
  btn.innerHTML = ICON_MENU;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('mob-open');
    btn.innerHTML = open ? ICON_CLOSE : ICON_MENU;
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('mob-open');
      btn.innerHTML = ICON_MENU;
    });
  });
}

// ===== Page Init =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  initTabs();
  initProjectViewToggle();
  initHamburger();

  // Wire inputs
  $('#q')?.addEventListener('input', loadNews);
  $('#cat')?.addEventListener('change', loadNews);
  $('#p_q')?.addEventListener('input', loadProjects);
  $('#p_cat')?.addEventListener('change', loadProjects);
  $('#p_status')?.addEventListener('change', loadProjects);

  // Load data
  loadNews();
  loadProjects();
  loadFeatured();
  loadReelsFromSheet();

  // Forms
  bindFeedback();
  
  // Homepage news
  loadHomeNews();

  // Ангилалаар мэдээ — аль хоёр ангилал ч гарна
  if(document.getElementById('sbdNewsGrid'))  loadCategoryNews(['СБД МАН','НОСК ХК'], 'sbdNewsGrid');
  if(document.getElementById('noskNewsGrid')) loadCategoryNews(['СБД МАН','НОСК ХК'], 'noskNewsGrid');

});
