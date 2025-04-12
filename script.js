const valueInput = document.getElementById('valueInput');
const animateToggle = document.getElementById('animateToggle');
const hideToggle = document.getElementById('hideToggle');
const progressCircle = document.getElementById('progressCircle');
const progressRing = document.getElementById('progressRing');
const progressBlock = document.getElementById('progressBlock');

const radius = 55;
const circumference = 2 * Math.PI * radius;

let animationFrame;
let angle = 0;

progressCircle.setAttribute("r", radius);
progressCircle.setAttribute("stroke-dasharray", circumference);
progressCircle.setAttribute("stroke-dashoffset", circumference);

// Инициализация с 0
setProgress(0);

valueInput.addEventListener('input', () => {
  let value = parseInt(valueInput.value.replace(/\D/g, ''));
  if (isNaN(value)) value = 0;
  value = Math.min(100, Math.max(0, value));
  valueInput.value = value;
  setProgress(value);
});

function setProgress(value) {
  const offset = circumference - (value / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

function animateRotate() {
  angle = (angle + 1) % 360;
  progressRing.style.transform = `rotate(${angle}deg)`;
  animationFrame = requestAnimationFrame(animateRotate);
}

animateToggle.addEventListener('change', () => {
  if (animateToggle.checked) {
    animateRotate();
  } else {
    cancelAnimationFrame(animationFrame);
    progressRing.style.transform = 'rotate(0deg)';
    angle = 0;
  }
});

hideToggle.addEventListener('change', () => {
  const isHidden = hideToggle.checked;
  const elementsToToggle = progressBlock.querySelectorAll('.progress-ring, .all-controls label:not(:last-child)');
  elementsToToggle.forEach(el => {
    el.style.visibility = isHidden ? 'hidden' : 'visible';  
  });
});