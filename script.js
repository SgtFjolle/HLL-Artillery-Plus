const resultOutput = document.getElementById('result-output');
const historyContainer = document.getElementById('history-entries');
const distanceInput = document.getElementById('distance');
const toggleFullHistory = document.getElementById('toggle-full-history');
const factionButtons = document.querySelectorAll('.faction-btn');

let selectedFaction = 'german_us';
let history = [];
let showFullHistory = false;
let historyTimer;
let lastSavedDistance = null;
let initialLoad = true;

const factionMilRanges = {
  "german_us": { min: 622, max: 978 },
  "soviet": { min: 800, max: 1120 },
  "british": { min: 267, max: 533 }
};

function getMilValue(distance, faction) {
  const range = factionMilRanges[faction];
  if (!range) return null;
  const { min, max } = range;
  const fraction = (distance - 100) / (1600 - 100);
  return Math.floor((1 - fraction) * max + fraction * min);
}

function updateLiveResult() {
  const distance = parseInt(distanceInput.value);
  if (!isNaN(distance) && distance >= 100 && distance <= 1600) {
    const mil = getMilValue(distance, selectedFaction);
    resultOutput.textContent = `${mil} mil`;
    resultOutput.classList.remove("out-of-range");

    clearTimeout(historyTimer);
    historyTimer = setTimeout(() => {
      if (lastSavedDistance !== distance && !initialLoad) {
        history.unshift(`${distance}m → ${mil} mil`);
        if (history.length > 10) history.pop();
        lastSavedDistance = distance;
        renderHistory();
      }
    }, 1000);
  } else {
    resultOutput.textContent = "Out of Range";
    resultOutput.classList.add("out-of-range");
    clearTimeout(historyTimer);
  }
  initialLoad = false;
}

function renderHistory() {
  historyContainer.innerHTML = '';
  const displayCount = showFullHistory ? 10 : 3;
  history.slice(0, displayCount).forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    if (index < 3) div.classList.add('enhanced');
    div.textContent = item;
    historyContainer.appendChild(div);
  });
}

toggleFullHistory.addEventListener('change', () => {
  showFullHistory = toggleFullHistory.checked;
  renderHistory();
});

distanceInput.value = 100;
setTimeout(() => {
  initialLoad = false;
}, 1500);
updateLiveResult();

distanceInput.addEventListener('input', updateLiveResult);

factionButtons.forEach(button => {
  if (button.dataset.faction === selectedFaction) {
    button.classList.add('active');
  }
  button.addEventListener('click', () => {
    selectedFaction = button.dataset.faction;
    factionButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateLiveResult();
  });
});
