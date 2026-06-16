// Lucide 아이콘 초기화
lucide.createIcons();

// ----------------------------------
// Scroll Animation (Fade In)
// ----------------------------------
const fadeEls = document.querySelectorAll('.fade-in');
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));

// ----------------------------------
// Widget 1: FitDay Outfit Simulator Logic
// ----------------------------------
const fitdayData = {
  sunny: {
    campus: {
      items: ['린넨 반팔 셔츠', '와이드 크림진', '레더 스니커즈'],
      reason: '따뜻한 봄/가을 날씨에 가볍게 입기 좋으며, 세련되고 단정한 느낌을 주는 대학생 캠퍼스 추천 룩입니다.'
    },
    date: {
      items: ['카라 스웨터', '테이퍼드 슬랙스', '로퍼', '레더 숄더백'],
      reason: '맑은 날 데이트 일정을 위한 정석 남친 룩입니다. 얇은 니트 스웨터와 가죽 신발로 깔끔한 무드를 연출합니다.'
    },
    interview: {
      items: ['서머 트로피컬 블레이저', '반팔 니트', '셋업 슬랙스', '더비 슈즈'],
      reason: '더운 여름에도 시원하게 착용 가능한 경량 정장 셋업입니다. 면접이나 비즈니스 미팅에서 격식을 챙기기에 제격입니다.'
    }
  },
  rainy: {
    campus: {
      items: ['나일론 윈드브레이커', '카고 조거팬츠', '런닝화', '방수 크로스백'],
      reason: '비 소식이 있는 날, 젖어도 부담이 적은 카고 조거와 기능성 윈드브레이커 조합으로 활동성과 방수성을 높였습니다.'
    },
    date: {
      items: ['세미오버 데님 셔츠', '흑청 데님', '방수 첼시부츠'],
      reason: '습도가 높고 쌀쌀한 비오는 날 데이트를 위해 캐주얼한 톤온톤 데님 셋업과 비에 젖지 않는 가죽 첼시부츠를 권장합니다.'
    },
    interview: {
      items: ['레인 실드 트렌치코트', '수트 세트', '클래식 로퍼 (방수 처리)'],
      reason: '비오는 날 격식 있는 공간에 참석하기 위해 단정한 정장 위에 빗물을 방어할 수 있는 클래식한 트렌치코트를 덧입습니다.'
    }
  },
  snowy: {
    campus: {
      items: ['헤비 다운 파카', '기모 맨투맨', '코듀로이 조거팬츠', '스웨이드 부츠'],
      reason: '한파와 눈 소식에 대비하여 보온성이 매우 뛰어난 두터운 패딩과 바람을 막아주는 코듀로이 팬츠로 따뜻한 캐주얼 룩을 완성합니다.'
    },
    date: {
      items: ['캐시미어 더블코트', '울 터틀넥 니트', '와이드 슬랙스', '첼시 부츠'],
      reason: '추운 겨울날 댄디한 매력을 극대화할 수 있는 캐시미어 롱코트와 보온성이 뛰어난 울 터틀넥 조합의 매력적인 데이트 룩입니다.'
    },
    interview: {
      items: ['메리노울 포멀 패딩코트', '겨울용 수트', '가죽 장갑', '더비 슈즈'],
      reason: '영하의 면접일에는 일반 코트보다 보온성이 있는 패딩 수트 아우터를 활용하여 컨디션을 유지하고 격식도 잃지 않는 코디를 추천합니다.'
    }
  }
};

let activeWeather = 'sunny';
let activeSchedule = 'campus';

const weatherBtns = document.querySelectorAll('#weather-selector .select-btn');
const scheduleBtns = document.querySelectorAll('#schedule-selector .select-btn');
const outfitTagsContainer = document.getElementById('outfit-tags');
const outfitReasonText = document.getElementById('outfit-reason');

function updateOutfitResult() {
  const recommendation = fitdayData[activeWeather][activeSchedule];
  if (!recommendation) return;
  
  // Clear old tags
  outfitTagsContainer.innerHTML = '';
  
  // Append new badges
  recommendation.items.forEach(item => {
    const badge = document.createElement('span');
    badge.className = 'outfit-badge';
    badge.innerText = item;
    outfitTagsContainer.appendChild(badge);
  });
  
  // Update explanation text
  outfitReasonText.innerText = recommendation.reason;
}

weatherBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    weatherBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeWeather = btn.getAttribute('data-weather');
    updateOutfitResult();
  });
});

scheduleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    scheduleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSchedule = btn.getAttribute('data-schedule');
    updateOutfitResult();
  });
});

// ----------------------------------
// Widget 2: EcoRoute Carbon Calculator Logic
// ----------------------------------
const routeBtns = document.querySelectorAll('#route-selector .select-btn');
const routeCarIcon = document.getElementById('route-car');
const routeTimeVal = document.getElementById('route-time');
const routeCarbonVal = document.getElementById('route-carbon');
const routeRatingVal = document.getElementById('route-rating');
const routeProgress = document.getElementById('route-progress');

routeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    routeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const routeType = btn.getAttribute('data-route');
    
    // Trigger car movement animation
    routeCarIcon.style.left = '90%';
    setTimeout(() => {
      routeCarIcon.style.left = '10%';
    }, 1000);

    if (routeType === 'fast') {
      routeCarIcon.innerHTML = '<i data-lucide="car" style="width: 16px; height: 16px;"></i>';
      routeCarIcon.className = 'route-car-icon';
      routeTimeVal.innerText = '32분';
      routeCarbonVal.innerText = '5.8kg CO₂';
      routeCarbonVal.style.color = 'var(--color-danger)';
      routeRatingVal.innerText = 'C등급';
      routeProgress.className = 'progress-bar-fill';
      lucide.createIcons();
    } else {
      routeCarIcon.innerHTML = '<i data-lucide="footprints" style="width: 16px; height: 16px;"></i>';
      routeCarIcon.className = 'route-car-icon eco-mode';
      routeTimeVal.innerText = '48분';
      routeCarbonVal.innerText = '0.3kg CO₂';
      routeCarbonVal.style.color = 'var(--color-success)';
      routeRatingVal.innerText = 'S등급 (친환경)';
      routeProgress.className = 'progress-bar-fill eco-active';
      lucide.createIcons();
    }
  });
});

// ----------------------------------
// Widget 3: FocusSpace Pomodoro Synthesizer & Timer Logic
// ----------------------------------
let timerInterval = null;
let timerTime = 25 * 60; // 25 minutes in seconds
let timerRunning = false;
const timerText = document.getElementById('timer-text');
const timerToggleBtn = document.getElementById('timer-toggle-btn');
const timerResetBtn = document.getElementById('timer-reset-btn');
const soundBtns = document.querySelectorAll('.sound-selectors .sound-btn');
const waveContainer = document.getElementById('wave-container');
const waveBars = document.querySelectorAll('.wave-bar');

// Web Audio Synthesizer setup
let audioCtx = null;
let noiseNode = null;
let gainNode = null;
let audioFilter = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function toggleTimer() {
  if (timerRunning) {
    // Pause timer
    clearInterval(timerInterval);
    timerRunning = false;
    timerToggleBtn.innerHTML = '<i data-lucide="play" style="width: 14px; height: 14px;"></i> 시작';
    lucide.createIcons();
    stopSynth();
  } else {
    // Start timer
    timerRunning = true;
    timerToggleBtn.innerHTML = '<i data-lucide="pause" style="width: 14px; height: 14px;"></i> 일시정지';
    lucide.createIcons();
    
    timerInterval = setInterval(() => {
      if (timerTime > 0) {
        timerTime--;
        timerText.innerText = formatTime(timerTime);
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        timerToggleBtn.innerHTML = '<i data-lucide="play" style="width: 14px; height: 14px;"></i> 시작';
        lucide.createIcons();
        showToast('집중 시간이 종료되었습니다! 쉬어가는 시간입니다.');
        stopSynth();
      }
    }, 1000);

    // Resume audio if a sound was active
    const activeSoundBtn = document.querySelector('.sound-selectors .sound-btn.active');
    if (activeSoundBtn) {
      const soundType = activeSoundBtn.getAttribute('data-sound');
      if (soundType !== 'none') {
        startSynth(soundType);
      }
    }
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerTime = 25 * 60;
  timerRunning = false;
  timerText.innerText = formatTime(timerTime);
  timerToggleBtn.innerHTML = '<i data-lucide="play" style="width: 14px; height: 14px;"></i> 시작';
  lucide.createIcons();
  stopSynth();
}

timerToggleBtn.addEventListener('click', toggleTimer);
timerResetBtn.addEventListener('click', resetTimer);

// Audio synthesizer helper (realtime brownian noise simulating rain/ocean)
function startSynth(type) {
  if (!timerRunning) return; // Only make sound when timer is running

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Stop current nodes
    if (noiseNode) {
      noiseNode.disconnect();
      noiseNode = null;
    }

    // 1. Create a buffer source containing random noise
    const bufferSize = 2 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Brown noise generation algorithm
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // 2. Filter Node to shape the sound
    audioFilter = audioCtx.createBiquadFilter();
    
    if (type === 'rain') {
      audioFilter.type = 'bandpass';
      audioFilter.frequency.setValueAtTime(450, audioCtx.currentTime);
      audioFilter.Q.setValueAtTime(1.2, audioCtx.currentTime);
    } else if (type === 'waves') {
      audioFilter.type = 'lowpass';
      audioFilter.frequency.setValueAtTime(320, audioCtx.currentTime);
    }

    // 3. Gain node for volume control
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);

    // Connect nodes
    noiseNode.connect(audioFilter);
    audioFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();

    // Wave animation activate
    waveBars.forEach(bar => bar.classList.add('playing'));

  } catch (err) {
    console.warn('Web Audio API is not supported or was blocked:', err);
  }
}

function stopSynth() {
  if (noiseNode) {
    try {
      noiseNode.stop();
    } catch (e) {}
    noiseNode.disconnect();
    noiseNode = null;
  }
  waveBars.forEach(bar => bar.classList.remove('playing'));
}

soundBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    soundBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const soundType = btn.getAttribute('data-sound');

    if (soundType === 'none') {
      stopSynth();
    } else {
      if (!timerRunning) {
        showToast('타이머가 작동 중일 때만 오디오 신디사이저가 활성화됩니다.');
      } else {
        startSynth(soundType);
      }
    }
  });
});

// Default sound selection is none
const noneSoundBtn = document.querySelector('[data-sound="none"]');
if (noneSoundBtn) {
  noneSoundBtn.classList.add('active');
}

// ----------------------------------
// Modal Navigation & Control
// ----------------------------------
window.openModal = function(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // block scroll
  }
}

window.closeModal = function(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
  }
}

window.closeModalOnOverlay = function(event, id) {
  if (event.target.id === `modal-${id}`) {
    window.closeModal(id);
  }
}

// ----------------------------------
// Toast Notification & Form Action
// ----------------------------------
function showToast(message) {
  const toast = document.getElementById('toast-message');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;
  
  toastText.innerText = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

window.handleFormSubmit = function(e) {
  e.preventDefault();
  
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const msg = document.getElementById('form-message').value;

  // Save to localStorage
  const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
  submissions.push({
    name,
    email,
    message: msg,
    date: new Date().toISOString()
  });
  localStorage.setItem('contact_submissions', JSON.stringify(submissions));

  // Show success
  showToast(`${name}님의 소중한 의견이 등록되었습니다. 감사합니다!`);
  
  // Reset form
  document.getElementById('contact-form').reset();
}
