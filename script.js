// DOM references for user interface elements
const form = document.getElementById('calc-form');
const resultOutput = document.getElementById('result-output');
const historyContainer = document.getElementById('history-entries');
const toggleHistoryBtn = document.getElementById('toggle-history');

// Track recent user-calculated results
let history = [];
let showAllHistory = false;

// Define mil interpolation boundaries based on in-game data for each faction
const factionMilRanges = {
  "german_us": { min: 622, max: 978 }, // Valid in-game values from 100m to 1600m
  "soviet": { min: 800, max: 1120 },   // Soviet artillery mil range
  "british": { min: 267, max: 533 }    // British artillery mil range
};

// Generate interpolated mil values for a distance
function getMilValue(distance, faction) {
  const range = factionMilRanges[faction];
  if (!range) return null;

  const { min, max } = range;
  const fraction = (distance - 100) / (1600 - 100);
  const mil = Math.floor((1 - fraction) * max + fraction * min);
  return mil;
}

// Handle form submission: fetch distance, validate, calculate and display mil
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const factionKey = form.faction.value;
  const distance = parseInt(form.distance.value);

  // Input validation for in-game range
  if (isNaN(distance) || distance < 100 || distance > 1600) {
    resultOutput.textContent = "Distance must be between 100 and 1600 meters.";
    return;
  }

  // Calculate mil value using interpolation
  const mil = getMilValue(distance, factionKey);
  if (mil === null) {
    resultOutput.textContent = "No valid mil data for selected faction.";
    return;
  }

  const result = `Faction: ${form.faction.options[form.faction.selectedIndex].text}, Distance: ${distance}m → ${mil} mil`;
  resultOutput.textContent = result;
  updateHistory(result);
});

// Maintain local calculation history for user convenience
function updateHistory(entry) {
  history.unshift(entry);
  if (history.length > 6) history.pop();
  renderHistory();
}

// Display recent results in the UI, allowing expansion
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

// Toggle between collapsed and expanded history states
toggleHistoryBtn.addEventListener('click', () => {
  showAllHistory = !showAllHistory;
  renderHistory();
});


