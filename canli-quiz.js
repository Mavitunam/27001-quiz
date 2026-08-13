/* ====== Canlı Quiz — gömülebilir widget ======
   Bu kodu sitenizin herhangi bir sayfasına (JS/HTML ekleme alanına) yapıştırın.
   Widget, script'in bulunduğu yere kendi kutusunu (div) oluşturur. */
(function(){
  if (window.__canliQuizLoaded) return; // aynı sayfada iki kez eklenirse çakışmayı önler
  window.__canliQuizLoaded = true;

  // 1) Stilleri sayfaya ekle
  var styleEl = document.createElement('style');
  styleEl.textContent = `
#canli-quiz-widget{
  --font-display:'Segoe UI','Sora',system-ui,-apple-system,sans-serif;
  --font-body:'Segoe UI',system-ui,-apple-system,sans-serif;
  --bg:#140F2B;
  --surface:#1F1A3D;
  --surface-2:#2A2352;
  --lime:#D4FF3F;
  --coral:#FF5D73;
  --gold:#FFB84D;
  --cyan:#4DE1FF;
  --text:#F5F3FF;
  --text-dim:#B7AEDB;
}
#canli-quiz-widget *{box-sizing:border-box;}
#canli-quiz-widget{
  margin:0;
  min-height:100vh;
  background:
    radial-gradient(circle at 15% 10%, rgba(212,255,63,0.08), transparent 40%),
    radial-gradient(circle at 85% 85%, rgba(255,93,115,0.10), transparent 45%),
    var(--bg);
  color:var(--text);
  font-family:var(--font-body);
  display:flex;
  justify-content:center;
  padding:24px 16px 60px;
}
#canli-quiz-widget #cq-app{width:100%;max-width:560px;}
#canli-quiz-widget h1,#canli-quiz-widget h2,#canli-quiz-widget h3{font-family:var(--font-display);margin:0 0 6px;}
#canli-quiz-widget .eyebrow{
  font-family:var(--font-display);font-weight:700;font-size:12px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--lime);margin-bottom:6px;
}
#canli-quiz-widget p{color:var(--text-dim);line-height:1.5;}
#canli-quiz-widget .card{
  background:var(--surface);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:18px;
  padding:22px;
  margin-bottom:16px;
}
#canli-quiz-widget .btn{
  font-family:var(--font-display);font-weight:700;font-size:15px;
  border:none;border-radius:14px;padding:14px 20px;cursor:pointer;
  width:100%;transition:transform .12s ease, filter .12s ease;
  color:#14102B;
}
#canli-quiz-widget .btn:active{transform:scale(0.97);}
#canli-quiz-widget .btn-primary{background:var(--lime);}
#canli-quiz-widget .btn-secondary{background:transparent;color:var(--text);border:1px solid rgba(255,255,255,0.18);}
#canli-quiz-widget .btn-gold{background:var(--gold);}
#canli-quiz-widget .btn:disabled{opacity:.4;cursor:not-allowed;}
#canli-quiz-widget .btn-row{display:flex;gap:10px;}
#canli-quiz-widget input[type=text]{
  width:100%;background:var(--surface-2);border:1px solid rgba(255,255,255,0.1);
  color:var(--text);border-radius:12px;padding:13px 14px;font-size:15px;font-family:var(--font-body);
  margin-bottom:10px;
}
#canli-quiz-widget input[type=text]:focus{outline:2px solid var(--lime);}
#canli-quiz-widget .code-display{
  font-family:var(--font-display);font-weight:800;font-size:36px;letter-spacing:.08em;
  text-align:center;color:var(--lime);margin:10px 0 4px;
  text-shadow:0 0 24px rgba(212,255,63,0.35);
}
#canli-quiz-widget .code-sub{text-align:center;color:var(--text-dim);font-size:13px;margin-bottom:0;}
#canli-quiz-widget .role-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
#canli-quiz-widget .role-card{
  background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:18px;
  padding:26px 16px;text-align:center;cursor:pointer;transition:border-color .15s ease;
}
#canli-quiz-widget .role-card:hover{border-color:var(--lime);}
#canli-quiz-widget .role-card .icon{font-size:32px;display:block;margin-bottom:10px;}
#canli-quiz-widget .qopt{
  display:flex;align-items:center;gap:10px;
  background:var(--surface-2);border-radius:12px;padding:11px 12px;margin-bottom:8px;
}
#canli-quiz-widget .qopt input{flex:1;margin:0;}
#canli-quiz-widget .shape{width:16px;height:16px;flex-shrink:0;border-radius:4px;}
#canli-quiz-widget .qlist-item{
  background:var(--surface-2);border-radius:12px;padding:12px 14px;margin-bottom:8px;
  display:flex;justify-content:space-between;align-items:center;gap:10px;
}
#canli-quiz-widget .qlist-item span{color:var(--text);font-size:14px;}
#canli-quiz-widget .small-x{background:transparent;border:none;color:var(--coral);font-size:18px;cursor:pointer;font-weight:700;}
#canli-quiz-widget .answer-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px;}
#canli-quiz-widget .answer-tile{
  border:none;border-radius:16px;padding:22px 14px;font-family:var(--font-display);
  font-weight:700;font-size:16px;color:#14102B;cursor:pointer;text-align:left;
  display:flex;align-items:center;gap:10px;min-height:78px;
  transition:transform .12s ease, filter .12s ease;
}
#canli-quiz-widget .answer-tile:active{transform:scale(0.96);}
#canli-quiz-widget .answer-tile:disabled{opacity:.55;cursor:default;}
#canli-quiz-widget .answer-tile.correct-flash{outline:3px solid #fff;}
#canli-quiz-widget .a0{background:var(--lime);}
#canli-quiz-widget .a1{background:var(--cyan);}
#canli-quiz-widget .a2{background:var(--gold);}
#canli-quiz-widget .a3{background:var(--coral);color:#fff;}
#canli-quiz-widget .shape-icon{width:20px;height:20px;flex-shrink:0;}
#canli-quiz-widget .status-pill{
  display:inline-block;font-family:var(--font-display);font-weight:700;font-size:12px;
  letter-spacing:.05em;text-transform:uppercase;padding:6px 12px;border-radius:999px;
  background:var(--surface-2);color:var(--lime);margin-bottom:10px;
}
#canli-quiz-widget .result-banner{
  text-align:center;border-radius:16px;padding:20px;margin-top:14px;font-family:var(--font-display);
  font-weight:800;font-size:20px;
}
#canli-quiz-widget .result-correct{background:rgba(212,255,63,0.14);color:var(--lime);border:1px solid rgba(212,255,63,0.3);}
#canli-quiz-widget .result-wrong{background:rgba(255,93,115,0.14);color:var(--coral);border:1px solid rgba(255,93,115,0.3);}
#canli-quiz-widget .stat-row{display:flex;justify-content:space-between;color:var(--text-dim);font-size:13px;margin-top:6px;}
#canli-quiz-widget .leaderboard-row{
  display:flex;justify-content:space-between;align-items:center;
  background:var(--surface-2);border-radius:12px;padding:10px 14px;margin-bottom:8px;
}
#canli-quiz-widget .leaderboard-row .rank{font-family:var(--font-display);font-weight:800;color:var(--gold);width:24px;}
#canli-quiz-widget .leaderboard-row .nm{flex:1;padding:0 8px;}
#canli-quiz-widget .leaderboard-row .sc{font-family:var(--font-display);font-weight:700;color:var(--lime);}
#canli-quiz-widget .muted-link{background:none;border:none;color:var(--text-dim);text-decoration:underline;cursor:pointer;font-size:13px;padding:0;}
#canli-quiz-widget .top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
#canli-quiz-widget .error-msg{color:var(--coral);font-size:13px;margin:-4px 0 10px;}
`;
  document.head.appendChild(styleEl);

  // 2) Widget kutusunu, bu script etiketinin olduğu yere ekle
  var container = document.createElement('div');
  container.id = 'canli-quiz-widget';
  container.innerHTML = '<div id="cq-app"><p style="text-align:center;color:#B7AEDB;">Yükleniyor…</p></div>';
  var thisScript = document.currentScript;
  if (thisScript && thisScript.parentNode) {
    thisScript.parentNode.insertBefore(container, thisScript.nextSibling);
  } else {
    document.body.appendChild(container);
  }

  // 3) Firebase SDK'larını sırayla yükle, sonra uygulamayı başlat
  function loadScript(src){
    return new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function(){ reject(new Error('Yüklenemedi: ' + src)); };
      document.head.appendChild(s);
    });
  }

  loadScript('https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-app-compat.js')
    .then(function(){
      return loadScript('https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-firestore-compat.js');
    })
    .then(function(){
      runApp();
    })
    .catch(function(err){
      container.querySelector('#cq-app').innerHTML =
        '<p style="text-align:center;color:#FF5D73;">Quiz yüklenemedi: ' + err.message + '</p>';
      console.error(err);
    });

  function runApp(){
const firebaseConfig = {
  apiKey: "AIzaSyBKrpy3AU6R5uFiWTRo9rU9YGYE9dYK2e4",
  authDomain: "quiz-56300.firebaseapp.com",
  projectId: "quiz-56300",
  storageBucket: "quiz-56300.firebasestorage.app",
  messagingSenderId: "388811795251",
  appId: "1:388811795251:web:253ef10bd5b26b66592c46"
};

const fbApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const SHAPES = [
  '<svg class="shape-icon" viewBox="0 0 24 24" fill="#14102B"><path d="M12 3l9 18H3z"/></svg>',
  '<svg class="shape-icon" viewBox="0 0 24 24" fill="#14102B"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>',
  '<svg class="shape-icon" viewBox="0 0 24 24" fill="#14102B"><circle cx="12" cy="12" r="9"/></svg>',
  '<svg class="shape-icon" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l6 10-6 10-6-10z"/></svg>'
];

let state = {
  view: 'home',
  code: '',
  name: '',
  quiz: null,
  draftQuestions: [],
  participantId: null,
  answeredThisQ: false,
  myAnswerIdx: null,
  myScore: 0,
  answerCount: 0,
  correctCount: 0,
  leaderboard: null,
  errorMsg: '',
  unsubQuiz: null,
  unsubAnswers: null,
  templates: [],
  templatesLoaded: false
};

function render(){
  document.getElementById('cq-app').innerHTML = viewFor(state.view);
}

function genCode(){ return String(Math.floor(1000 + Math.random()*9000)); }
function genId(){ return 'p' + Math.random().toString(36).slice(2,10); }

function stopListeners(){
  if(state.unsubQuiz){ state.unsubQuiz(); state.unsubQuiz = null; }
  if(state.unsubAnswers){ state.unsubAnswers(); state.unsubAnswers = null; }
}

function goHome(){
  stopListeners();
  state = { ...state, view:'home', errorMsg:'' };
  render();
}

async function startHostSetup(){
  state.view = 'host-setup';
  if(state.draftQuestions.length === 0){
    state.draftQuestions = [
      { q: 'Türkiye\'nin başkenti neresidir?', options: ['İstanbul','Ankara','İzmir','Bursa'], correct: 1 }
    ];
  }
  render();
  await loadTemplates();
  render();
}

async function loadTemplates(){
  try{
    const snap = await db.collection('templates').get();
    const list = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() }));
    list.sort((a,b) => (b.createdAt||0) - (a.createdAt||0));
    state.templates = list;
  }catch(e){
    state.templates = [];
  }
  state.templatesLoaded = true;
}

async function saveTemplate(){
  if(state.draftQuestions.length === 0){
    alert('Kaydetmeden önce en az bir soru ekle.');
    return;
  }
  const title = prompt('Bu soru setine bir isim ver (örn. "Hijyen Eğitimi - Modül 1"):');
  if(!title || !title.trim()) return;
  try{
    await db.collection('templates').add({
      title: title.trim(),
      questions: state.draftQuestions,
      createdAt: Date.now()
    });
    await loadTemplates();
    render();
  }catch(e){
    alert('Kaydedilemedi: ' + e.message);
  }
}

function useTemplate(id){
  const t = state.templates.find(t => t.id === id);
  if(!t) return;
  state.draftQuestions = JSON.parse(JSON.stringify(t.questions));
  state.errorMsg = '';
  render();
}

async function deleteTemplate(id){
  if(!confirm('Bu kayıtlı soru seti silinsin mi? Bu işlem geri alınamaz.')) return;
  try{
    await db.collection('templates').doc(id).delete();
    await loadTemplates();
    render();
  }catch(e){
    alert('Silinemedi: ' + e.message);
  }
}

function addDraftQuestion(){
  const qInput = document.getElementById('draftQText').value.trim();
  const opts = [0,1,2,3].map(i => document.getElementById('draftOpt'+i).value.trim());
  const correct = parseInt(document.querySelector('input[name=draftCorrect]:checked').value, 10);
  if(!qInput || opts.some(o=>!o)){
    state.errorMsg = 'Lütfen soru metnini ve 4 seçeneği de doldur.';
    render();
    return;
  }
  state.draftQuestions.push({ q: qInput, options: opts, correct });
  state.errorMsg = '';
  render();
}

function removeDraftQuestion(idx){
  state.draftQuestions.splice(idx,1);
  render();
}

async function launchSession(){
  if(state.draftQuestions.length === 0){
    state.errorMsg = 'En az bir soru eklemelisin.';
    render();
    return;
  }
  const code = genCode();
  const quiz = { questions: state.draftQuestions, currentIndex: 0, revealed: false, ended: false, questionStartedAt: Date.now() };
  try{
    await db.collection('quizzes').doc(code).set(quiz);
  }catch(e){
    state.errorMsg = 'Oturum oluşturulamadı: ' + e.message;
    render();
    return;
  }
  state.code = code;
  state.quiz = quiz;
  state.view = 'host-live';
  state.errorMsg = '';
  state.answerCount = 0;
  state.correctCount = 0;
  render();
  subscribeHostAnswers();
}

function subscribeHostAnswers(){
  if(state.unsubAnswers) state.unsubAnswers();
  const qIndex = state.quiz.currentIndex;
  const answersRef = db.collection('quizzes').doc(state.code).collection('answers');
  state.unsubAnswers = answersRef.where('qIndex', '==', qIndex).onSnapshot((snap) => {
    let count = 0, correct = 0;
    snap.forEach(d => { count++; if(d.data().correct) correct++; });
    state.answerCount = count;
    state.correctCount = correct;
    if(state.view === 'host-live') render();
  }, (err) => {
    console.error('answers listener error', err);
  });
}

async function revealCurrent(){
  state.quiz.revealed = true;
  await db.collection('quizzes').doc(state.code).set(state.quiz);
  render();
}

async function nextQuestion(){
  const isLast = state.quiz.currentIndex >= state.quiz.questions.length - 1;
  if(isLast){
    state.quiz.ended = true;
    await db.collection('quizzes').doc(state.code).set(state.quiz);
    stopListeners();
    await loadLeaderboard();
    state.view = 'host-results';
    render();
    return;
  }
  state.quiz.currentIndex += 1;
  state.quiz.revealed = false;
  state.quiz.questionStartedAt = Date.now();
  await db.collection('quizzes').doc(state.code).set(state.quiz);
  render();
  subscribeHostAnswers();
}

async function loadLeaderboard(){
  try{
    const scoresRef = db.collection('quizzes').doc(state.code).collection('scores');
    const snap = await scoresRef.get();
    const rows = [];
    snap.forEach(d => rows.push(d.data()));
    rows.sort((a,b)=> b.score - a.score);
    state.leaderboard = rows;
  }catch(e){
    state.leaderboard = [];
  }
}

function startJoinFlow(){
  state.view = 'join';
  state.errorMsg = '';
  render();
}

async function joinSession(){
  const code = document.getElementById('joinCode').value.trim();
  const name = document.getElementById('joinName').value.trim();
  if(!code || !name){
    state.errorMsg = 'Kod ve isim gerekli.';
    render();
    return;
  }
  let quizSnap;
  try{
    quizSnap = await db.collection('quizzes').doc(code).get();
  }catch(e){
    state.errorMsg = 'Bağlantı hatası: ' + e.message;
    render();
    return;
  }
  if(!quizSnap.exists){
    state.errorMsg = 'Bu kodla bir oturum bulunamadı.';
    render();
    return;
  }
  state.quiz = quizSnap.data();
  state.code = code;
  state.name = name;
  state.participantId = genId();
  state.myScore = 0;
  state.myCorrectCount = 0;
  state.myAnsweredCount = 0;
  state.answeredThisQ = false;
  state.myAnswerIdx = null;
  state.errorMsg = '';
  state.view = 'participant-live';
  render();
  subscribeParticipant();
}

function subscribeParticipant(){
  if(state.unsubQuiz) state.unsubQuiz();
  state.unsubQuiz = db.collection('quizzes').doc(state.code).onSnapshot((snap) => {
    if(!snap.exists) return;
    const fresh = snap.data();
    if(!state.quiz || fresh.currentIndex !== state.quiz.currentIndex){
      state.answeredThisQ = false;
      state.myAnswerIdx = null;
    }
    state.quiz = fresh;
    if(state.view === 'participant-live') render();
  }, (err) => {
    console.error('quiz listener error', err);
  });
}

async function submitAnswer(idx){
  if(state.answeredThisQ) return;
  const qIndex = state.quiz.currentIndex;
  const question = state.quiz.questions[qIndex];
  const isCorrect = idx === question.correct;
  const startedAt = state.quiz.questionStartedAt || Date.now();
  const elapsedSec = Math.max(0, (Date.now() - startedAt) / 1000);
  // Kahoot tarzı: doğru cevap hızlıysa daha yüksek puan (max 1000, 20 sn sonra taban 200'e iner)
  const points = isCorrect ? Math.round(Math.max(200, 1000 - elapsedSec * 40)) : 0;
  state.answeredThisQ = true;
  state.myAnswerIdx = idx;
  state.myScore += points;
  state.myCorrectCount = (state.myCorrectCount || 0) + (isCorrect ? 1 : 0);
  state.myAnsweredCount = (state.myAnsweredCount || 0) + 1;
  render();
  try{
    await db.collection('quizzes').doc(state.code).collection('answers')
      .doc(qIndex + '_' + state.participantId).set({
        qIndex, name: state.name, choice: idx, correct: isCorrect, points, participantId: state.participantId
      });
    await db.collection('quizzes').doc(state.code).collection('scores')
      .doc(state.participantId).set({
        name: state.name, score: state.myScore,
        correctCount: state.myCorrectCount, answeredCount: state.myAnsweredCount
      });
  }catch(e){}
}


function leaveSession(){
  stopListeners();
  state = {
    view:'home', code:'', name:'', quiz:null, draftQuestions:[],
    participantId:null, answeredThisQ:false, myAnswerIdx:null, myScore:0,
    myCorrectCount:0, myAnsweredCount:0,
    answerCount:0, correctCount:0, leaderboard:null, errorMsg:'',
    unsubQuiz:null, unsubAnswers:null
  };
  render();
}

function viewFor(view){
  switch(view){
    case 'home': return homeView();
    case 'host-setup': return hostSetupView();
    case 'host-live': return hostLiveView();
    case 'host-results': return hostResultsView();
    case 'join': return joinView();
    case 'participant-live': return participantLiveView();
    default: return homeView();
  }
}

function homeView(){
  return `
    <div class="eyebrow">Canlı Quiz</div>
    <h1>Herkes aynı anda oynasın</h1>
    <p>Bir oturum oluştur ya da elindeki kodla bir oturuma katıl. Hesap gerekmez.</p>
    <div class="role-grid" style="margin-top:20px;">
      <div class="role-card" onclick="cqApp.startHostSetup()">
        <span class="icon">🎛️</span>
        <div style="font-family:var(--font-display);font-weight:700;">Oturum Oluştur</div>
        <p style="font-size:13px;margin-top:4px;">Sunucu / öğretmen</p>
      </div>
      <div class="role-card" onclick="cqApp.startJoinFlow()">
        <span class="icon">🙋</span>
        <div style="font-family:var(--font-display);font-weight:700;">Katıl</div>
        <p style="font-size:13px;margin-top:4px;">Katılımcı</p>
      </div>
    </div>
  `;
}

function hostSetupView(){
  const qItems = state.draftQuestions.map((q,i)=>`
    <div class="qlist-item">
      <span>${i+1}. ${escapeHtml(q.q)}</span>
      <button class="small-x" onclick="cqApp.removeDraftQuestion(${i})">✕</button>
    </div>
  `).join('');

  const templateItems = (state.templates||[]).map(t => `
    <div class="qlist-item">
      <span>${escapeHtml(t.title)} <span style="color:var(--text-dim);">· ${(t.questions||[]).length} soru</span></span>
      <div style="display:flex;gap:10px;align-items:center;flex-shrink:0;">
        <button class="muted-link" onclick="cqApp.useTemplate('${t.id}')">Kullan</button>
        <button class="small-x" onclick="cqApp.deleteTemplate('${t.id}')">✕</button>
      </div>
    </div>
  `).join('');

  const templatesSection = !state.templatesLoaded
    ? `<div class="card"><p style="margin:0;">Kayıtlı soru setleri yükleniyor…</p></div>`
    : (state.templates && state.templates.length
        ? `<div class="card"><h3 style="font-size:15px;">Kayıtlı Quizler (${state.templates.length})</h3><p style="font-size:12px;margin-top:-4px;">Önceki eğitimlerden kaydettiğin soru setleri. "Kullan" ile aşağıya yükle.</p>${templateItems}</div>`
        : `<div class="card"><p style="margin:0;">Henüz kayıtlı soru setin yok. Aşağıda soruları hazırlayıp "Şablon Olarak Kaydet" ile eğitimler arası tekrar kullanabilirsin.</p></div>`
      );

  return `
    <div class="top-bar"><button class="muted-link" onclick="cqApp.goHome()">← Geri</button></div>
    <div class="eyebrow">Oturum Oluştur</div>
    <h2>Soruları hazırla</h2>
    ${templatesSection}
    <div class="card">
      <input type="text" id="draftQText" placeholder="Soru metni">
      <div class="qopt"><div class="shape" style="background:var(--lime)"></div>
        <input type="text" id="draftOpt0" placeholder="Seçenek 1">
        <input type="radio" name="draftCorrect" value="0" checked></div>
      <div class="qopt"><div class="shape" style="background:var(--cyan)"></div>
        <input type="text" id="draftOpt1" placeholder="Seçenek 2">
        <input type="radio" name="draftCorrect" value="1"></div>
      <div class="qopt"><div class="shape" style="background:var(--gold)"></div>
        <input type="text" id="draftOpt2" placeholder="Seçenek 3">
        <input type="radio" name="draftCorrect" value="2"></div>
      <div class="qopt"><div class="shape" style="background:var(--coral)"></div>
        <input type="text" id="draftOpt3" placeholder="Seçenek 4">
        <input type="radio" name="draftCorrect" value="3"></div>
      <p style="font-size:12px;margin:2px 0 12px;">İşaretli radyo butonu doğru cevabı gösterir.</p>
      ${state.errorMsg ? `<div class="error-msg">${state.errorMsg}</div>` : ''}
      <button class="btn btn-secondary" onclick="cqApp.addDraftQuestion()">+ Soruyu Ekle</button>
    </div>
    ${state.draftQuestions.length ? `<div class="card"><h3 style="font-size:15px;">Sorular (${state.draftQuestions.length})</h3>${qItems}
      <button class="btn btn-secondary" style="margin-top:4px;" onclick="cqApp.saveTemplate()">💾 Şablon Olarak Kaydet</button>
    </div>` : ''}
    <button class="btn btn-primary" onclick="cqApp.launchSession()">Oturumu Başlat</button>
  `;
}

function hostLiveView(){
  const q = state.quiz.questions[state.quiz.currentIndex];
  const total = state.quiz.questions.length;
  const optsHtml = q.options.map((o,i)=>`
    <div class="answer-tile a${i}" style="min-height:auto;padding:12px 14px;cursor:default;">
      ${SHAPES[i]}<span>${escapeHtml(o)}</span>
      ${state.quiz.revealed && i === q.correct ? '<span style="margin-left:auto;">✓</span>' : ''}
    </div>
  `).join('');

  return `
    <div class="top-bar">
      <button class="muted-link" onclick="if(confirm('Oturumdan çıkılsın mı?')) cqApp.leaveSession();">← Oturumu kapat</button>
    </div>
    <div class="status-pill">Kod: ${state.code}</div>
    <div class="code-display">${state.code}</div>
    <p class="code-sub">Katılımcılar bu kodla katılabilir · Soru ${state.quiz.currentIndex+1}/${total}</p>
    <div class="card" style="margin-top:16px;">
      <h2 style="font-size:19px;">${escapeHtml(q.q)}</h2>
      <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">${optsHtml}</div>
      <div class="stat-row">
        <span>${state.answerCount} kişi cevapladı</span>
        <span>${state.quiz.revealed ? state.correctCount + ' doğru' : ''}</span>
      </div>
    </div>
    <div class="btn-row">
      ${!state.quiz.revealed
        ? `<button class="btn btn-gold" onclick="cqApp.revealCurrent()">Cevabı Göster</button>`
        : `<button class="btn btn-primary" onclick="cqApp.nextQuestion()">${state.quiz.currentIndex+1 >= total ? 'Bitir ve Sonuçları Gör' : 'Sonraki Soru'}</button>`
      }
    </div>
  `;
}

function hostResultsView(){
  const total = state.quiz && state.quiz.questions ? state.quiz.questions.length : 0;
  const rows = (state.leaderboard || []).map((r,i)=>{
    const c = r.correctCount || 0;
    const wrong = Math.max(0, (r.answeredCount||0) - c);
    return `
    <div class="leaderboard-row">
      <span class="rank">${i+1}</span>
      <span class="nm">${escapeHtml(r.name)}<br><span style="font-size:11px;color:var(--text-dim);">${c} doğru · ${wrong} yanlış</span></span>
      <span class="sc">${r.score} p</span>
    </div>
  `;}).join('');
  return `
    <div class="eyebrow">Oturum Bitti</div>
    <h2>Sonuçlar</h2>
    <div class="card">${rows || '<p>Henüz kimse cevap vermedi.</p>'}</div>
    <button class="btn btn-secondary" onclick="cqApp.goHome()">Ana Sayfaya Dön</button>
  `;
}

function joinView(){
  return `
    <div class="top-bar"><button class="muted-link" onclick="cqApp.goHome()">← Geri</button></div>
    <div class="eyebrow">Katıl</div>
    <h2>Oturuma katıl</h2>
    <div class="card">
      <input type="text" id="joinCode" placeholder="Oturum kodu (örn. 4821)" maxlength="4" inputmode="numeric">
      <input type="text" id="joinName" placeholder="Adın">
      ${state.errorMsg ? `<div class="error-msg">${state.errorMsg}</div>` : ''}
      <button class="btn btn-primary" onclick="cqApp.joinSession()">Katıl</button>
    </div>
  `;
}

function participantLiveView(){
  const q = state.quiz.questions[state.quiz.currentIndex];
  const total = state.quiz.questions.length;
  const revealed = state.quiz.revealed;

  const optsHtml = q.options.map((o,i)=>{
    const disabled = state.answeredThisQ || revealed;
    let extraClass = '';
    if(revealed && i === q.correct) extraClass = 'correct-flash';
    return `<button class="answer-tile a${i} ${extraClass}" ${disabled?'disabled':''} onclick="cqApp.submitAnswer(${i})">${SHAPES[i]}<span>${escapeHtml(o)}</span></button>`;
  }).join('');

  let banner = '';
  if(revealed && state.answeredThisQ){
    const wasCorrect = state.myAnswerIdx === q.correct;
    banner = `<div class="result-banner ${wasCorrect ? 'result-correct':'result-wrong'}">${wasCorrect ? 'Doğru! 🎉' : 'Yanlış'}</div>`;
  } else if(revealed && !state.answeredThisQ){
    banner = `<div class="result-banner result-wrong">Cevap vermedin</div>`;
  } else if(state.answeredThisQ){
    banner = `<p style="text-align:center;margin-top:14px;">Cevabın kaydedildi. Sunucunun sonucu göstermesi bekleniyor…</p>`;
  }

  return `
    <div class="top-bar">
      <button class="muted-link" onclick="if(confirm('Oturumdan ayrılınsın mı?')) cqApp.leaveSession();">← Ayrıl</button>
      <span style="font-size:13px;color:var(--text-dim);">${escapeHtml(state.name)} · Puan: ${state.myScore}</span>
    </div>
    <div class="status-pill">Soru ${state.quiz.currentIndex+1} / ${total}</div>
    <div class="card">
      <h2 style="font-size:19px;">${escapeHtml(q.q)}</h2>
      <div class="answer-grid">${optsHtml}</div>
      ${banner}
    </div>
  `;
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

window.cqApp = {
  startHostSetup, addDraftQuestion, removeDraftQuestion, launchSession,
  revealCurrent, nextQuestion, startJoinFlow, joinSession, submitAnswer,
  leaveSession, goHome, saveTemplate, useTemplate, deleteTemplate
};

render();
  }
})();
