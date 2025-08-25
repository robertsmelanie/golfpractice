{/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}

const drills = {
alignment: ["Use alignment sticks parallel to target line", "Check foot and shoulder alignment", "Use a mirror for visual feedback"],
swing: ["Swing path drill with headcover behind club", "Use a noodle to prevent over-the-top swing", "Slow motion swings with alignment rod"],
grip: ["Use a grip trainer for hand positioning", "Check V shapes in both hands", "Use marker to align grip"],
tempo: ["Count 1-2 during backswing and downswing", "Use metronome for rhythm", "Swing with eyes closed to feel tempo"]
};


function generatePlan() {
const time = parseInt(document.getElementById('time').value);
const focus = document.getElementById('focus').value;
let plan = `<h3>Your ${time}-minute ${focus} plan</h3><ul>`;
if (time <= 30) {
plan += `<li>5 min warm-up</li><li>10 min focused ${focus}</li><li>10 min drills</li><li>5 min recap</li>`;
} else {
plan += `<li>10 min warm-up</li><li>20 min focused ${focus}</li><li>20 min varied drills</li><li>10 min recap & notes</li>`;
}
plan += '</ul>';
document.getElementById('plan-output').innerHTML = plan;
}


function generateDrills() {
const problem = document.getElementById('problem').value;
const list = drills[problem].map(d => `<li>${d}</li>`).join('');
document.getElementById('drill-output').innerHTML = `<ul>${list}</ul>`;
}


let logs = JSON.parse(localStorage.getItem('golfLogs') || '[]');


function saveLog() {
const date = document.getElementById('log-date').value;
const focus = document.getElementById('log-focus').value;
const rating = parseInt(document.getElementById('log-rating').value);
const notes = document.getElementById('log-notes').value;
logs.push({ date, focus, rating, notes });
localStorage.setItem('golfLogs', JSON.stringify(logs));
renderChart();
}


function renderChart() {
const ctx = document.getElementById('progressChart').getContext('2d');
const data = logs.map(l => l.rating);
const labels = logs.map(l => l.date);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Session Rating',
                data,
                borderColor: 'blue',
                fill: false
            }]
        }
    });
}
