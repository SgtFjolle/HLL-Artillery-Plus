const form = document.getElementById('calc-form');
const resultOutput = document.getElementById('result-output');
const historyContainer = document.getElementById('history-entries');
const toggleHistoryBtn = document.getElementById('toggle-history');

let history = [];
let showAllHistory = false;

const milData = {
  "german_us": [
    600,596,591,587,582,578,574,570,566,562,558,554,550,546,543,539,535,532,528,525,
    521,518,514,511,508,504,501,498,494,491,488,485,482,479,476,473,470,467,464,461,
    458,455,453,450,447,445,442,439,437,434,432,429,427,424,422,420,417,415,413,410,
    408,406,404,401,399,397,395,393,391,389,387,385,383,381,379,377,375,373,371,370,
    368,366,364,362,361,359,357,355,354,352,350,349,347,345,344,342,340,339,337,336,
    334,332,331,329,328,326,325,323,322,320,319,317,316,314,313,311,310
  ],
  "soviet": [
    615,610,606,602,598,594,590,586,582,578,574,570,566,563,559,556,552,549,545,542,
    538,535,532,528,525,522,519,516,512,509,506,503,500,497,494,491,488,485,482,479,
    477,474,471,468,466,463,460,458,455,452,450,447,445,442,440,437,435,432,430,428,
    425,423,421,418,416,414,412,410,408,406,403,401,399,397,395,393,391,389,387,385,
    383,381,379,378,376,374,372,371,369,367,365,364,362,360,359,357,356,354,352,351,
    349,348,346,344,343,341,340,338,337,335,334
  ],
  "british": [
    596,591,587,582,578,574,570,566,562,558,554,550,546,543,539,535,532,528,525,521,
    518,514,511,508,504,501,498,494,491,488,485,482,479,476,473,470,467,464,461,458,
    455,453,450,447,445,442,439,437,434,432,429,427,424,422,420,417,415,413,410,408,
    406,404,401,399,397,395,393,391,389,387,385,383,381,379,377,375,373,371,370,368,
    366,364,362,361,359,357,355,354,352,350,349,347,345,344,342,340,339,337,336,334,
    332,331,329,328,326,325,323,322,320,319,317,316,314,313,311,310
  ]
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

