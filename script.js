let activeCode = null;
let usedCodes = new Set();
let startTime = null;
let rounds = [];
let maxPrediction = 3.1;

let validCodes = [
  "lhnhamdk29k8yulbqaaul9",
  "79A7D-8559A-ED5C2-69A48",
  "663BD-9C152-90B32-8D40F",
  "79A7D-8559A-ED5C2-69A41"
];

function showCodePopup() {
  document.getElementById("codePopup").style.display = "block";
}

function activateCode() {
  const code = document.getElementById("codeInput").value.trim();
  if (!validCodes.includes(code)) {
    notify("❌ كود غير صالح");
    return;
  }

  if (usedCodes.has(code)) {
    notify("⛔ تم استخدام الكود من قبل");
    return;
  }

  usedCodes.add(code);
  document.getElementById("codePopup").style.display = "none";
  notify("✅ تم تفعيل الكود بنجاح");

  startTime = Date.now();
  activeCode = code;

  document.getElementById("timer-box").style.display = "block";
  startTimer();
  updateStats();
}

function startTimer() {
  const timer = document.getElementById("timer");
  const interval = setInterval(() => {
    if (!startTime) return clearInterval(interval);
    let remaining = 30 * 60 * 1000 - (Date.now() - startTime);
    if (remaining <= 0) {
      notify("⏳ تم انتهاء وقت الكود");
      document.getElementById("timer-box").style.display = "none";
      startTime = null;
      activeCode = null;
      clearInterval(interval);
    } else {
      let m = Math.floor(remaining / 60000);
      let s = Math.floor((remaining % 60000) / 1000);
      timer.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  }, 1000);
}

function startRound() {
  if (!activeCode) {
    notify("🔒 فعّل كود التشغيل أولاً");
    return;
  }

  const prediction = (Math.random() * (maxPrediction - 1.1) + 1.1).toFixed(2);
  document.getElementById("prediction").innerText = prediction;
  document.getElementById("prediction").style.animation = "pulse 1s";

  rounds.push(+prediction);
  updateStats();
}

function notify(msg) {
  document.getElementById("notification").innerText = msg;
  setTimeout(() => {
    document.getElementById("notification").innerText = '';
  }, 3000);
}

function resetApp() {
  activeCode = null;
  startTime = null;
  document.getElementById("prediction").innerText = "?";
  document.getElementById("timer-box").style.display = "none";
  notify("✅ تمت إعادة التهيئة");
}

function shareApp() {
  const link = window.location.href;
  navigator.clipboard.writeText(`جرب التطبيق التجريبي ZERO: ${link}`);
  notify("📤 تم نسخ رابط التطبيق للمشاركة");
}

function updateStats() {
  document.getElementById("usedCodes").innerText = usedCodes.size;
  if (rounds.length > 0) {
    const avg = (rounds.reduce((a, b) => a + b, 0) / rounds.length).toFixed(2);
    const max = Math.max(...rounds);
    document.getElementById("avgTime").innerText = avg;
    document.getElementById("bestPrediction").innerText = max;
  }
}
