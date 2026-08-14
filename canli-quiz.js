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
#canli-quiz-widget input[type=text],#canli-quiz-widget input[type=password]{
  width:100%;background:var(--surface-2);border:1px solid rgba(255,255,255,0.1);
  color:var(--text);border-radius:12px;padding:13px 14px;font-size:15px;font-family:var(--font-body);
  margin-bottom:10px;
}
#canli-quiz-widget input[type=text]:focus,#canli-quiz-widget input[type=password]:focus{outline:2px solid var(--lime);}
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
      return Promise.all([
        loadScript('https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-firestore-compat.js'),
        loadScript('https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-auth-compat.js')
      ]);
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
const auth = firebase.auth();

const QUESTION_SECONDS = 15;

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
  editingIndex: null,
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
  templatesLoaded: false,
  unsubParticipants: null,
  participantsList: [],
  answeredPids: null,
  mySessions: null,
  pendingAfterLogin: 'setup'
};

function render(){
  document.getElementById('cq-app').innerHTML = viewFor(state.view);
}

function genCode(){ return String(Math.floor(1000 + Math.random()*9000)); }
function genId(){ return 'p' + Math.random().toString(36).slice(2,10); }

function stopListeners(){
  if(state.unsubQuiz){ state.unsubQuiz(); state.unsubQuiz = null; }
  if(state.unsubAnswers){ state.unsubAnswers(); state.unsubAnswers = null; }
  if(state.unsubParticipants){ state.unsubParticipants(); state.unsubParticipants = null; }
}

// Sorunun kalan süresini (saniye) hesaplar — soru başlatılmadıysa null döner
function remainingSeconds(){
  if(!state.quiz || !state.quiz.started || !state.quiz.questionStartedAt) return null;
  const elapsed = (Date.now() - state.quiz.questionStartedAt) / 1000;
  return Math.max(0, Math.ceil(QUESTION_SECONDS - elapsed));
}

// Süre görünür kalsın diye saniyede bir ekranı tazeler
setInterval(function(){
  if((state.view === 'host-live' || state.view === 'participant-live') && state.quiz && state.quiz.started && !state.quiz.revealed){
    render();
  }
}, 1000);

function goHome(){
  stopListeners();
  state = { ...state, view:'home', errorMsg:'' };
  render();
}

async function startHostSetup(){
  state.pendingAfterLogin = 'setup';
  if(auth.currentUser){
    await enterSetup();
    return;
  }
  state.view = 'login';
  state.errorMsg = '';
  render();
}

async function openManagePanel(){
  state.pendingAfterLogin = 'manage';
  if(auth.currentUser){
    await enterManage();
    return;
  }
  state.view = 'login';
  state.errorMsg = '';
  render();
}

async function doLogin(){
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPass').value;
  if(!email || !pw){
    state.errorMsg = 'E-posta ve şifre gir.';
    render();
    return;
  }
  try{
    await auth.signInWithEmailAndPassword(email, pw);
    state.errorMsg = '';
    if(state.pendingAfterLogin === 'manage') await enterManage();
    else await enterSetup();
  }catch(e){
    state.errorMsg = 'E-posta veya şifre hatalı.';
    render();
  }
}

function doLogout(){
  auth.signOut();
  goHome();
}

async function enterSetup(){
  state.view = 'host-setup';
  state.editingIndex = null;
  if(state.draftQuestions.length === 0){
    state.draftQuestions = [
      { q: 'Türkiye\'nin başkenti neresidir?', options: ['İstanbul','Ankara','İzmir','Bursa'], correct: 1 }
    ];
  }
  render();
  await loadTemplates();
  render();
}

async function enterManage(){
  stopListeners();
  state.view = 'manage';
  state.mySessions = null;
  render();
  try{
    const snap = await db.collection('quizzes').where('createdBy', '==', auth.currentUser.uid).get();
    const rows = [];
    snap.forEach(d => rows.push({ code: d.id, ...d.data() }));
    rows.sort((a,b) => (b.createdAt||0) - (a.createdAt||0));
    state.mySessions = rows;
  }catch(e){
    state.mySessions = [];
  }
  render();
}

async function manageSession(code){
  try{
    const snap = await db.collection('quizzes').doc(code).get();
    if(!snap.exists){ alert('Oturum bulunamadı.'); return; }
    state.code = code;
    state.quiz = snap.data();
    state.view = 'host-live';
    render();
    subscribeHostAnswers();
    subscribeHostParticipants();
  }catch(e){
    alert('Oturum açılamadı, tekrar dener misin?');
  }
}

async function manageResults(code){
  try{
    const leaderboard = await buildLeaderboard(code);
    state.leaderboard = leaderboard;
    state.code = code;
    state.view = 'host-results';
    render();
  }catch(e){
    alert('Sonuçlar yüklenemedi.');
  }
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
    alert('Kaydedilemedi, tekrar dener misin?');
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
    alert('Silinemedi, tekrar dener misin?');
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
  if(state.editingIndex !== null && state.editingIndex !== undefined){
    state.draftQuestions[state.editingIndex] = { q: qInput, options: opts, correct };
    state.editingIndex = null;
  } else {
    state.draftQuestions.push({ q: qInput, options: opts, correct });
  }
  state.errorMsg = '';
  render();
}

function editDraftQuestion(idx){
  state.editingIndex = idx;
  state.errorMsg = '';
  render();
}

function cancelEditDraftQuestion(){
  state.editingIndex = null;
  state.errorMsg = '';
  render();
}

function removeDraftQuestion(idx){
  state.draftQuestions.splice(idx,1);
  if(state.editingIndex === idx) state.editingIndex = null;
  render();
}

async function launchSession(){
  if(state.draftQuestions.length === 0){
    state.errorMsg = 'En az bir soru eklemelisin.';
    render();
    return;
  }
  const code = genCode();
  const quiz = {
    questions: state.draftQuestions, currentIndex: 0, revealed: false, ended: false,
    started: false, questionStartedAt: null, revealedLeaderboard: null,
    createdBy: auth.currentUser ? auth.currentUser.uid : null, createdAt: Date.now()
  };
  try{
    await db.collection('quizzes').doc(code).set(quiz);
  }catch(e){
    state.errorMsg = 'Oturum oluşturulamadı, tekrar dener misin?';
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
  subscribeHostParticipants();
}

function subscribeHostAnswers(){
  if(state.unsubAnswers) state.unsubAnswers();
  const qIndex = state.quiz.currentIndex;
  const answersRef = db.collection('quizzes').doc(state.code).collection('answers');
  state.unsubAnswers = answersRef.where('qIndex', '==', qIndex).onSnapshot((snap) => {
    let count = 0, correct = 0;
    const pids = {};
    snap.forEach(d => { count++; if(d.data().correct) correct++; pids[d.data().participantId] = true; });
    state.answerCount = count;
    state.correctCount = correct;
    state.answeredPids = pids;
    if(state.view === 'host-live') render();
  }, (err) => {
    console.error('answers listener error', err);
  });
}

function subscribeHostParticipants(){
  if(state.unsubParticipants) state.unsubParticipants();
  state.unsubParticipants = db.collection('quizzes').doc(state.code).collection('participants')
    .onSnapshot((snap) => {
      const list = [];
      snap.forEach(d => list.push({ id: d.id, name: d.data().name }));
      state.participantsList = list;
      if(state.view === 'host-live') render();
    }, (err) => {
      console.error('participants listener error', err);
    });
}

async function startQuestion(){
  state.quiz.started = true;
  state.quiz.questionStartedAt = Date.now();
  await db.collection('quizzes').doc(state.code).set(state.quiz);
  render();
}

async function revealCurrent(){
  state.quiz.revealed = true;
  try{
    state.quiz.revealedLeaderboard = await buildLeaderboard(state.code);
  }catch(e){
    state.quiz.revealedLeaderboard = [];
  }
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
  state.quiz.revealedLeaderboard = null;
  state.quiz.started = false;
  state.quiz.questionStartedAt = null;
  await db.collection('quizzes').doc(state.code).set(state.quiz);
  render();
  subscribeHostAnswers();
}

// Katılan herkesi (cevap vermemiş olsa bile) puanlarıyla birlikte sıralı getirir
async function buildLeaderboard(code){
  const [partSnap, scoreSnap] = await Promise.all([
    db.collection('quizzes').doc(code).collection('participants').get(),
    db.collection('quizzes').doc(code).collection('scores').get()
  ]);
  const scoreMap = {};
  scoreSnap.forEach(d => { scoreMap[d.id] = d.data(); });
  const rows = [];
  partSnap.forEach(d => {
    const sd = scoreMap[d.id] || {};
    rows.push({
      name: d.data().name,
      score: sd.score || 0,
      correctCount: sd.correctCount || 0,
      answeredCount: sd.answeredCount || 0
    });
  });
  rows.sort((a,b) => b.score - a.score);
  return rows;
}

async function loadLeaderboard(){
  try{
    state.leaderboard = await buildLeaderboard(state.code);
  }catch(e){
    state.leaderboard = [];
  }
}

function startJoinFlow(){
  state.view = 'join';
  state.errorMsg = '';
  render();
}

function getStoredParticipantId(code){
  try{ return localStorage.getItem('cqz_pid_' + code); }catch(e){ return null; }
}
function storeParticipantId(code, pid){
  try{ localStorage.setItem('cqz_pid_' + code, pid); }catch(e){}
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
    state.errorMsg = 'Bağlantı hatası, tekrar dener misin?';
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

  // Aynı cihazdan daha önce bu koda katılmışsa aynı kimliği kullan
  let pid = getStoredParticipantId(code);
  if(!pid){
    pid = genId();
    storeParticipantId(code, pid);
  }
  state.participantId = pid;

  // İsim kilidi: bu kimlik için daha önce bir isim kaydedildiyse, o isim korunur —
  // yeni yazılan isim yok sayılır (sonuçları manipüle etmeyi engeller).
  let finalName = name;
  try{
    const existingPart = await db.collection('quizzes').doc(code).collection('participants').doc(pid).get();
    if(existingPart.exists && existingPart.data().name){
      finalName = existingPart.data().name;
      if(finalName !== name){
        state.errorMsg = '';
        alert('Bu oturuma daha önce "' + finalName + '" adıyla katılmışsın, o isimle devam ediyorsun.');
      }
    } else {
      await db.collection('quizzes').doc(code).collection('participants').doc(pid).set({ name: finalName });
    }
  }catch(e){}
  state.name = finalName;

  // Önceki skoru geri yükle (varsa)
  state.myScore = 0;
  state.myCorrectCount = 0;
  state.myAnsweredCount = 0;
  try{
    const scoreSnap = await db.collection('quizzes').doc(code).collection('scores').doc(pid).get();
    if(scoreSnap.exists){
      const sd = scoreSnap.data();
      state.myScore = sd.score || 0;
      state.myCorrectCount = sd.correctCount || 0;
      state.myAnsweredCount = sd.answeredCount || 0;
    }
  }catch(e){}

  // Mevcut soru için daha önce cevap verilmiş mi kontrol et
  state.answeredThisQ = false;
  state.myAnswerIdx = null;
  try{
    const qIndex = state.quiz.currentIndex;
    const ansSnap = await db.collection('quizzes').doc(code).collection('answers')
      .doc(qIndex + '_' + pid).get();
    if(ansSnap.exists){
      const ad = ansSnap.data();
      state.answeredThisQ = true;
      state.myAnswerIdx = ad.choice;
    }
  }catch(e){}

  state.errorMsg = '';
  state.view = 'participant-live';
  render();
  subscribeParticipant();
}

function subscribeParticipant(){
  if(state.unsubQuiz) state.unsubQuiz();
  state.unsubQuiz = db.collection('quizzes').doc(state.code).onSnapshot(async (snap) => {
    if(!snap.exists) return;
    const fresh = snap.data();
    if(!state.quiz || fresh.currentIndex !== state.quiz.currentIndex){
      state.answeredThisQ = false;
      state.myAnswerIdx = null;
      // Yeni soruya geçildiğinde de olası önceki cevabı kontrol et (ör. iki sekme açıksa)
      try{
        const ansSnap = await db.collection('quizzes').doc(state.code).collection('answers')
          .doc(fresh.currentIndex + '_' + state.participantId).get();
        if(ansSnap.exists){
          state.answeredThisQ = true;
          state.myAnswerIdx = ansSnap.data().choice;
        }
      }catch(e){}
    }
    state.quiz = fresh;
    if(state.view === 'participant-live') render();
  }, (err) => {
    console.error('quiz listener error', err);
  });
}

async function submitAnswer(idx){
  if(state.answeredThisQ) return;
  if(!state.quiz.started) return;
  const rem = remainingSeconds();
  if(rem === null || rem <= 0) return;
  const qIndex = state.quiz.currentIndex;
  const question = state.quiz.questions[qIndex];
  const isCorrect = idx === question.correct;
  const startedAt = state.quiz.questionStartedAt || Date.now();
  const elapsedSec = Math.max(0, (Date.now() - startedAt) / 1000);
  // Kahoot tarzı: doğru cevap hızlıysa daha yüksek puan (max 1000, süre sonunda taban 100'e iner)
  const points = isCorrect ? Math.round(Math.max(100, 1000 - (elapsedSec / QUESTION_SECONDS) * 900)) : 0;
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
    view:'home', code:'', name:'', quiz:null, draftQuestions:[], editingIndex:null,
    participantId:null, answeredThisQ:false, myAnswerIdx:null, myScore:0,
    myCorrectCount:0, myAnsweredCount:0,
    answerCount:0, correctCount:0, leaderboard:null, errorMsg:'',
    unsubQuiz:null, unsubAnswers:null, templates:[], templatesLoaded:false,
    unsubParticipants:null, participantsList:[], answeredPids:null, mySessions:null, pendingAfterLogin:'setup'
  };
  render();
}

function viewFor(view){
  switch(view){
    case 'home': return homeView();
    case 'login': return loginView();
    case 'host-setup': return hostSetupView();
    case 'host-live': return hostLiveView();
    case 'host-results': return hostResultsView();
    case 'join': return joinView();
    case 'participant-live': return participantLiveView();
    case 'manage': return manageView();
    default: return homeView();
  }
}

function loginView(){
  return `
    <div class="top-bar"><button class="muted-link" onclick="cqApp.goHome()">← Geri</button></div>
    <div class="eyebrow">Yönetici Girişi</div>
    <h2>Oturum oluşturmak için giriş yap</h2>
    <div class="card">
      <input type="text" id="loginEmail" placeholder="E-posta">
      <input type="password" id="loginPass" placeholder="Şifre">
      ${state.errorMsg ? `<div class="error-msg">${state.errorMsg}</div>` : ''}
      <button class="btn btn-primary" onclick="cqApp.doLogin()">Giriş Yap</button>
    </div>
  `;
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
    <button class="muted-link" style="display:block;margin:14px auto 0;" onclick="cqApp.openManagePanel()">📋 Oturumlarımı Yönet</button>
  `;
}

function manageView(){
  if(state.mySessions === null){
    return `<div class="top-bar"><button class="muted-link" onclick="cqApp.goHome()">← Geri</button></div><p class="dim">Yükleniyor…</p>`;
  }
  const rows = state.mySessions.map(s => {
    const total = (s.questions||[]).length;
    const status = s.ended ? 'Bitti' : (s.started ? 'Devam Ediyor' : 'Lobide Bekliyor');
    const statusColor = s.ended ? 'var(--text-dim)' : (s.started ? 'var(--lime)' : 'var(--gold)');
    return `
    <div class="qlist-item" style="flex-direction:column;align-items:stretch;">
      <div class="row" style="margin-bottom:6px;">
        <span style="font-family:var(--font-display);font-weight:700;color:var(--lime);">${s.code}</span>
        <span style="font-size:12px;color:${statusColor};">${status}</span>
      </div>
      <p class="dim" style="font-size:12px;margin:0 0 8px;">Soru ${Math.min((s.currentIndex||0)+1,total)}/${total}</p>
      <div class="btn-row">
        <button class="btn btn-secondary" onclick="cqApp.manageSession('${s.code}')">Yönet</button>
        <button class="btn btn-secondary" onclick="cqApp.manageResults('${s.code}')">Sonuç</button>
      </div>
    </div>`;
  }).join('');
  return `
    <div class="top-bar"><button class="muted-link" onclick="cqApp.goHome()">← Geri</button><button class="muted-link" onclick="cqApp.doLogout()">Çıkış Yap</button></div>
    <div class="eyebrow">Oturumlarım</div>
    <h2>Oluşturduğun oturumlar</h2>
    <div class="card">
      ${state.mySessions.length ? rows : '<p class="dim">Henüz hiç oturum oluşturmadın.</p>'}
    </div>
    <button class="btn btn-primary" onclick="cqApp.startHostSetup()">+ Yeni Oturum Oluştur</button>
  `;
}

function hostSetupView(){
  const editQ = (state.editingIndex !== null && state.editingIndex !== undefined) ? state.draftQuestions[state.editingIndex] : null;
  const qItems = state.draftQuestions.map((q,i)=>`
    <div class="qlist-item" style="${i===state.editingIndex ? 'outline:2px solid var(--gold);' : ''}">
      <span>${i+1}. ${escapeHtml(q.q)}</span>
      <div style="display:flex;gap:10px;align-items:center;flex-shrink:0;">
        <button class="muted-link" onclick="cqApp.editDraftQuestion(${i})">Düzenle</button>
        <button class="small-x" onclick="cqApp.removeDraftQuestion(${i})">✕</button>
      </div>
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
    <div class="top-bar"><button class="muted-link" onclick="cqApp.goHome()">← Geri</button><button class="muted-link" onclick="cqApp.doLogout()">Çıkış Yap</button></div>
    <div class="eyebrow">Oturum Oluştur</div>
    <h2>Soruları hazırla</h2>
    ${templatesSection}
    <div class="card">
      <input type="text" id="draftQText" placeholder="Soru metni" value="${editQ ? escapeHtml(editQ.q) : ''}">
      <div class="qopt"><div class="shape" style="background:var(--lime)"></div>
        <input type="text" id="draftOpt0" placeholder="Seçenek 1" value="${editQ ? escapeHtml(editQ.options[0]) : ''}">
        <input type="radio" name="draftCorrect" value="0" ${(!editQ && true) || (editQ && editQ.correct===0) ? 'checked' : ''}></div>
      <div class="qopt"><div class="shape" style="background:var(--cyan)"></div>
        <input type="text" id="draftOpt1" placeholder="Seçenek 2" value="${editQ ? escapeHtml(editQ.options[1]) : ''}">
        <input type="radio" name="draftCorrect" value="1" ${editQ && editQ.correct===1 ? 'checked' : ''}></div>
      <div class="qopt"><div class="shape" style="background:var(--gold)"></div>
        <input type="text" id="draftOpt2" placeholder="Seçenek 3" value="${editQ ? escapeHtml(editQ.options[2]) : ''}">
        <input type="radio" name="draftCorrect" value="2" ${editQ && editQ.correct===2 ? 'checked' : ''}></div>
      <div class="qopt"><div class="shape" style="background:var(--coral)"></div>
        <input type="text" id="draftOpt3" placeholder="Seçenek 4" value="${editQ ? escapeHtml(editQ.options[3]) : ''}">
        <input type="radio" name="draftCorrect" value="3" ${editQ && editQ.correct===3 ? 'checked' : ''}></div>
      <p style="font-size:12px;margin:2px 0 12px;">İşaretli radyo butonu doğru cevabı gösterir.</p>
      ${state.errorMsg ? `<div class="error-msg">${state.errorMsg}</div>` : ''}
      <div class="btn-row">
        <button class="btn btn-secondary" onclick="cqApp.addDraftQuestion()">${editQ ? '✓ Güncelle' : '+ Soruyu Ekle'}</button>
        ${editQ ? '<button class="btn btn-secondary" onclick="cqApp.cancelEditDraftQuestion()">Vazgeç</button>' : ''}
      </div>
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
  const rem = remainingSeconds();
  const started = !!state.quiz.started;
  const pList = state.participantsList || [];
  const answeredSet = state.answeredPids || {};

  const partRows = pList.map(p => `
    <div class="row">
      <span>${escapeHtml(p.name)}</span>
      <span style="font-size:12px;color:${answeredSet[p.id] ? 'var(--lime)' : 'var(--text-dim)'};">${answeredSet[p.id] ? '✓ Cevapladı' : '⏳ Bekleniyor'}</span>
    </div>
  `).join('');
  const participantsCard = `
    <div class="card">
      <div class="row"><h3 style="font-size:15px;margin:0;">Katılımcılar</h3><span class="dim" style="font-size:13px;">${pList.length} kişi</span></div>
      ${pList.length ? partRows : '<p class="dim" style="font-size:13px;">Henüz kimse katılmadı.</p>'}
    </div>
  `;

  const optsHtml = q.options.map((o,i)=>`
    <div class="answer-tile a${i}" style="min-height:auto;padding:12px 14px;cursor:default;">
      ${SHAPES[i]}<span>${escapeHtml(o)}</span>
      ${state.quiz.revealed && i === q.correct ? '<span style="margin-left:auto;">✓</span>' : ''}
    </div>
  `).join('');

  const header = `
    <div class="top-bar">
      <button class="muted-link" onclick="if(confirm('Oturumdan çıkılsın mı?')) cqApp.leaveSession();">← Oturumu kapat</button>
    </div>
    <div class="status-pill">Kod: ${state.code}</div>
    <div class="code-display">${state.code}</div>
    <p class="code-sub">Katılımcılar bu kodla katılabilir · Soru ${state.quiz.currentIndex+1}/${total}</p>
  `;

  if(!started){
    return header + participantsCard + `
      <div class="card">
        <h3 style="font-size:15px;">Sıradaki soru (önizleme)</h3>
        <p style="color:var(--text-dim);">${escapeHtml(q.q)}</p>
      </div>
      <button class="btn btn-primary" onclick="cqApp.startQuestion()">▶ Soruyu Başlat</button>
      <p class="dim" style="text-align:center;font-size:12px;margin-top:8px;">Herkes katılana kadar bekleyebilirsin, süre bu butona basınca başlar.</p>
    `;
  }

  return header + `
    ${!state.quiz.revealed ? `<p style="text-align:center;font-size:28px;font-weight:800;color:${rem<=5?'var(--coral)':'var(--lime)'};margin:6px 0;">⏱ ${rem}s</p>` : ''}
    <div class="card" style="margin-top:16px;">
      <h2 style="font-size:19px;">${escapeHtml(q.q)}</h2>
      <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">${optsHtml}</div>
      <div class="stat-row">
        <span>${state.answerCount}/${pList.length} kişi cevapladı</span>
        <span>${state.quiz.revealed ? state.correctCount + ' doğru' : ''}</span>
      </div>
    </div>
    ${participantsCard}
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
    <div class="eyebrow">Sonuçlar</div>
    <h2>Puan Durumu</h2>
    <div class="card">${rows || '<p>Henüz kimse cevap vermedi.</p>'}</div>
    <div class="btn-row">
      <button class="btn btn-secondary" onclick="cqApp.openManagePanel()">Oturumlarım</button>
      <button class="btn btn-secondary" onclick="cqApp.goHome()">Ana Sayfa</button>
    </div>
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
  const started = !!state.quiz.started;
  const rem = remainingSeconds();
  const timeUp = started && (rem === null || rem <= 0);

  if(!started){
    return `
      <div class="top-bar">
        <button class="muted-link" onclick="if(confirm('Oturumdan ayrılınsın mı?')) cqApp.leaveSession();">← Ayrıl</button>
        <span style="font-size:13px;color:var(--text-dim);">${escapeHtml(state.name)}</span>
      </div>
      <div class="status-pill">Soru ${state.quiz.currentIndex+1} / ${total}</div>
      <div class="card" style="text-align:center;">
        <h2 style="font-size:19px;">Hazır ol!</h2>
        <p class="dim">Yönetici soruyu başlattığında otomatik olarak açılacak.</p>
      </div>
    `;
  }

  const optsHtml = q.options.map((o,i)=>{
    const disabled = state.answeredThisQ || revealed || timeUp;
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
  } else if(timeUp){
    banner = `<p style="text-align:center;margin-top:14px;">Süre doldu. Sonucun açıklanması bekleniyor…</p>`;
  }

  let leaderboardHtml = '';
  if(revealed && state.quiz.revealedLeaderboard && state.quiz.revealedLeaderboard.length){
    const rows = state.quiz.revealedLeaderboard.map((r,i)=>{
      const isMe = r.name === state.name && i === state.quiz.revealedLeaderboard.findIndex(x=>x.name===state.name);
      return `
      <div class="leaderboard-row" style="${isMe ? 'outline:2px solid var(--lime);' : ''}">
        <span class="rank">${i+1}</span>
        <span class="nm">${escapeHtml(r.name)}</span>
        <span class="sc">${r.score} p</span>
      </div>`;
    }).join('');
    leaderboardHtml = `<div class="card"><h3 style="font-size:15px;">Puan Durumu</h3>${rows}</div>`;
  }

  return `
    <div class="top-bar">
      <button class="muted-link" onclick="if(confirm('Oturumdan ayrılınsın mı?')) cqApp.leaveSession();">← Ayrıl</button>
      <span style="font-size:13px;color:var(--text-dim);">${escapeHtml(state.name)} · Puan: ${state.myScore}</span>
    </div>
    <div class="status-pill">Soru ${state.quiz.currentIndex+1} / ${total}</div>
    ${!revealed ? `<p style="text-align:center;font-size:26px;font-weight:800;color:${rem<=5?'var(--coral)':'var(--lime)'};margin:4px 0;">⏱ ${rem}s</p>` : ''}
    <div class="card">
      <h2 style="font-size:19px;">${escapeHtml(q.q)}</h2>
      <div class="answer-grid">${optsHtml}</div>
      ${banner}
    </div>
    ${leaderboardHtml}
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
  leaveSession, goHome, saveTemplate, useTemplate, deleteTemplate,
  doLogin, doLogout, editDraftQuestion, cancelEditDraftQuestion,
  startQuestion, openManagePanel, manageSession, manageResults
};

render();
  }
})();
