// script.js

// DOM references
const form = document.getElementById('calc-form');
const resultOutput = document.getElementById('result-output');
const historyContainer = document.getElementById('history-entries');
const toggleHistoryBtn = document.getElementById('toggle-history');

let history = [];
let showAllHistory = false;

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const faction = form.faction.value;
  const distance = parseFloat(form.distance.value);
  if (isNaN(distance) || distance <= 0) return;

  const angle = calculateAngle(faction, distance);

  const result = `Faction: ${faction}, Distance: ${distance}m → Angle: ${angle}°`;
  resultOutput.textContent = result;

  updateHistory(result);
});

// Angle calculation stub (replace with real logic)
function calculateAngle(faction, distance) {
  // Placeholder math — replace with real ballistic data
  return (distance / 10).toFixed(1);
}

// Update history view
function updateHistory(entry) {
  history.unshift(entry);
  if (history.length > 6) history.pop();
  renderHistory();
}

// Render history entries
function renderHistory() {
  historyContainer.innerHTML = '';

  const displayCount = showAllHistory ? 6 : 3;
  history.slice(0, displayCount).forEach(item => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    div.textContent = item;
    historyContainer.appendChild(div);
  });

  toggleHistoryBtn.textContent = showAllHistory ? 'Show Less' : 'Show More';
}

// Toggle between short and full history
toggleHistoryBtn.addEventListener('click', () => {
  showAllHistory = !showAllHistory;
  renderHistory();
});
