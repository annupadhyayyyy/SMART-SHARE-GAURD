document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.innerText && target.innerText.toLowerCase().includes("share")) {
    e.preventDefault();
    showDelayScreen();
  }
});

function showDelayScreen() {
  const overlay = createOverlay();
  let seconds = 5;

  const box = document.createElement("div");
  box.className = "ssg-box";
  box.innerHTML = `
    <h2>⏳ Wait Before Sharing</h2>
    <p>Analyzing content credibility...</p>
    <div class="ssg-timer">${seconds}</div>
    <button class="secondary" id="skipBtn">Skip</button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const interval = setInterval(() => {
    seconds--;
    box.querySelector(".ssg-timer").innerText = seconds;

    if (seconds === 0) {
      clearInterval(interval);
      overlay.remove();
      showWarningPopup();
    }
  }, 1000);

  document.getElementById("skipBtn").onclick = () => {
    clearInterval(interval);
    overlay.remove();
    showWarningPopup();
  };
}

function showWarningPopup() {
  const overlay = createOverlay();

  const box = document.createElement("div");
  box.className = "ssg-box";
  box.innerHTML = `
    <h2 class="warning">⚠️ This content may be misleading</h2>
    <p><strong>Trust Score:</strong> 32/100</p>

    <ul>
      <li>Unverified medical claim</li>
      <li>Emotional language detected</li>
    </ul>

    <p>This post shows patterns commonly found in misinformation.</p>

    <button class="primary" id="factBtn">Check Facts</button>
    <button class="secondary">Read Full Article</button>
    <button class="danger" id="shareBtn">Share Anyway</button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("factBtn").onclick = () => {
    overlay.remove();
    showFactScreen();
  };

  document.getElementById("shareBtn").onclick = () => {
    overlay.remove();
    alert("Shared (Not Recommended)");
  };
}

function showFactScreen() {
  const overlay = createOverlay();

  const box = document.createElement("div");
  box.className = "ssg-box";
  box.innerHTML = `
    <h2 class="danger-text">❌ Claim Not Supported</h2>
    <p>No scientific studies support this claim.</p>

    <h3>Trusted Sources</h3>
    <ul>
      <li>WHO</li>
      <li>Healthline</li>
      <li>Gov Health Portal</li>
    </ul>

    <button class="secondary" id="backBtn">Go Back</button>
    <button class="success" id="safeBtn">Proceed Safely</button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("backBtn").onclick = () => {
    overlay.remove();
    showWarningPopup();
  };

  document.getElementById("safeBtn").onclick = () => {
    overlay.remove();
    showSuccessScreen();
  };
}

function showSuccessScreen() {
  const overlay = createOverlay();

  const box = document.createElement("div");
  box.className = "ssg-box";
  box.innerHTML = `
    <h2 class="success-text">✅ Thanks for verifying</h2>
    <p>You are helping reduce misinformation</p>
    <button class="success" id="closeBtn">Back to Feed</button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("closeBtn").onclick = () => {
    overlay.remove();
  };
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "ssg-overlay";
  return overlay;
}