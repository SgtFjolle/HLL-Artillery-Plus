const form = document.getElementById('calc-form');
const resultOutput = document.getElementById('result-output');
const historyContainer = document.getElementById('history-entries');
const toggleHistoryBtn = document.getElementById('toggle-history');

let history = [];
let showAllHistory = false;

const milData = {
  "german_us": [ /* EasyArty AXIS mils */ ],
  "soviet": [ /* EasyArty USSR mils */ ],
  "british": [ /* EasyArty BRITISH mils */ ]
};

// Placeholders replaced with real data in previous messages. Insert complete arrays here.

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const factionKey = form.faction.value;
  const distance = parseInt(form.distance.value);
  if (isNaN(distance) || distance < 100 || distance > 1600) {
    resultOutput.textContent = "Distance must be between 100 and 1600 meters.";
    return;
  }

  const mil = milData[factionKey][distance - 100];
  const result = `Faction: ${form.faction.options[form.faction.selectedIndex].text}, Distance: ${distance}m → ${mil} mil`;
  resultOutput.textContent = result;

  updateHistory(result);
});

function updateHistory(entry) {
  history.unshift(entry);
  if (history.length > 6) history.pop();
  renderHistory();
}

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

toggleHistoryBtn.addEventListener('click', () => {
  showAllHistory = !showAllHistory;
  renderHistory();
});

