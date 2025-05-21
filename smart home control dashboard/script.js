// Real-time clock
const clock = document.getElementById("clock");

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// Theme toggle (dark/light)
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.innerHTML = document.body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// Device states storage
const deviceStates = {
  
    "bedroom-light": false,
    "bedroom-temp": 22,
    "kitchen-light": false,
    "kitchen-camera": false,
    "bathroom-light": false,
    "bathroom-temp": 22,
    "balcony-light": false,
    "balcony-camera": false,
    "hall-light": false,
    "hall-camera": false,
    "veranda-light": false,
    "veranda-camera": false,
  };
  
  

// Helper functions for toggling lights and cameras
function toggleDevice(deviceId, statusElem, buttonElem, onText, offText, onClass) {
  deviceStates[deviceId] = !deviceStates[deviceId];
  const isOn = deviceStates[deviceId];
  statusElem.textContent = isOn ? onText : offText;
  buttonElem.textContent = isOn ? offText.replace('OFF', 'Turn OFF').replace('Inactive', 'Deactivate') : onText;
  statusElem.classList.toggle(onClass, isOn);
}

// Lights & Cameras toggles
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    const statusElem = document.getElementById(target + "-status");
    if (!statusElem) return;

    if (target.includes("light")) {
      toggleDevice(target, statusElem, btn, "Turn ON", "Turn OFF", "on");
    } else if (target.includes("camera")) {
      toggleDevice(target, statusElem, btn, "Activate", "Deactivate", "active");
    }
  });
});

// Temperature sliders
document.querySelectorAll(".temp-slider").forEach((slider) => {
  slider.addEventListener("input", () => {
    const target = slider.getAttribute("data-target");
    deviceStates[target] = slider.value;
    const display = document.getElementById(target + "-display");
    if (display) {
      display.textContent = slider.value + "°C";
    }
  });
});
