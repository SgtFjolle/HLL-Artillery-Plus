const form = document.getElementById('calc-form');
const distanceInput = document.getElementById('distance');
const resultOutput = document.getElementById('result-output');
const historyContainer = document.getElementById('history-entries');
const toggleHistoryBtn = document.getElementById('toggle-history');

let history = [];
let showAllHistory = false;
let historyTimer;
let lastSavedDistance = null;

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
  const factionKey = form.faction.value;
  const distance = parseInt(distanceInput.value);

  if (!isNaN(distance) && distance >= 100 && distance <= 1600) {
    const mil = getMilValue(distance, factionKey);
    resultOutput.textContent = `${mil} mil`;

    clearTimeout(historyTimer);
    historyTimer = setTimeout(() => {
      if (lastSavedDistance !== distance) {
        history.unshift(`${distance}m → ${mil} mil`);
        if (history.length > 10) history.pop();
        lastSavedDistance = distance;
        renderHistory();
      }
    }, 1000);
  } else {
    resultOutput.textContent = "100–1600m";
    clearTimeout(historyTimer);
  }
}

distanceInput.addEventListener('input', updateLiveResult);
form.faction.addEventListener('change', updateLiveResult);

function renderHistory() {
  historyContainer.innerHTML = '';
  const displayCount = showAllHistory ? 10 : 3;
  history.slice(0, displayCount).forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    if (index < 3) div.classList.add('enhanced');
    div.textContent = item;
    historyContainer.appendChild(div);
  });
  toggleHistoryBtn.textContent = showAllHistory ? 'Show Less' : 'Show More';
}

toggleHistoryBtn.addEventListener('click', () => {
  showAllHistory = !showAllHistory;
  renderHistory();
});

document.querySelector('#calc-form button[type="submit"]').style.display = 'none';

