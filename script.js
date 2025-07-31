// script.js
const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

recognition.onresult = (event) => {
  const transcript = Array.from(event.results)
    .map(result => result[0].transcript)
    .join('');

  if (transcript.includes("beautiful")) {
    drawSpiral();
  }
};

recognition.start();

function drawSpiral() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
  const angleStep = 0.1;
  const lineWidth = 2;
  const hue = Math.random() * 360;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  for (let angle = 0, radius = 0; radius < maxRadius; angle += angleStep, radius += 0.5) {
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

  if (transcript.includes("spiral")) {
    drawSpiral();
  }
  if (transcript.includes("color")) {
    drawColorfulSpiral();
  }
  if (transcript.includes("clear")) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};