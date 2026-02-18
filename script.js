// Day at a Glance - Data fetcher
// Fetches data from JSON files in /data/

const DATA_PATH = 'data/';

// Fetch helper
async function fetchJSON(file) {
    try {
        const response = await fetch(`${DATA_PATH}${file}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.warn(`Could not load ${file}:`, error);
        return null;
    }
}

// Update greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    
    if (hour < 12) {
        greetingEl.textContent = 'Good morning';
    } else if (hour < 17) {
        greetingEl.textContent = 'Good afternoon';
    } else {
        greetingEl.textContent = 'Good evening';
    }
}

// Update date
function updateDate() {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('date');
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// Load weather
async function loadWeather() {
    const weather = await fetchJSON('weather.json');
    if (!weather) return;

    const weatherEl = document.getElementById('weather');
    const icons = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
    
    weatherEl.innerHTML = `
        <span class="weather-icon">${icons[weather.icon] || '☀️'}</span>
        <span class="weather-temp">${weather.temp}°${weather.unit || 'F'}</span>
        <span class="weather-desc">${weather.description}</span>
    `;
}

// Load tasks
async function loadTasks() {
    const data = await fetchJSON('tasks.json');
    if (!data) return;

    const taskList = document.getElementById('task-list');
    document.getElementById('tasks-count').textContent = data.tasks?.length || 0;

    if (!data.tasks) return;

    taskList.innerHTML = data.tasks.map((task, index) => `
        <li class="task">
            <input type="checkbox" id="task${index + 1}" ${task.completed ? 'checked' : ''}>
            <label for="task${index + 1}">${task.title}</label>
        </li>
    `).join('');
}

// Load timeline/events
async function loadTimeline() {
    const data = await fetchJSON('events.json');
    if (!data) return;

    const timeline = document.getElementById('timeline');
    document.getElementById('events-count').textContent = data.events?.length || 0;

    if (!data.events) return;

    timeline.innerHTML = data.events.map(event => `
        <div class="timeline-item">
            <span class="time">${event.time}</span>
            <div class="event">
                <span class="event-title">${event.title}</span>
                <span class="event-duration">${event.duration || ''}</span>
            </div>
        </div>
    `).join('');
}

// Load notes
async function loadNotes() {
    const data = await fetchJSON('notes.json');
    if (!data) return;

    const notesGrid = document.getElementById('notes-grid');
    document.getElementById('notes-count').textContent = data.notes?.length || 0;

    if (!data.notes) return;

    notesGrid.innerHTML = data.notes.map(note => `
        <div class="note">
            <span class="note-tag">${note.tag}</span>
            <p>${note.content}</p>
        </div>
    `).join('');
}

// Load forecast
async function loadForecast() {
    const data = await fetchJSON('forecast.json');
    if (!data) return;

    const forecast = document.getElementById('forecast');
    const icons = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };

    if (!data.forecast) return;

    forecast.innerHTML = data.forecast.map(day => `
        <div class="forecast-day">
            <span class="day">${day.day}</span>
            <span class="forecast-icon">${icons[day.icon] || '☀️'}</span>
            <span class="forecast-temp">${day.high}°</span>
        </div>
    `).join('');
}

// Initialize
async function init() {
    updateGreeting();
    updateDate();
    
    // Load all data in parallel
    await Promise.all([
        loadWeather(),
        loadTasks(),
        loadTimeline(),
        loadNotes(),
        loadForecast()
    ]);
}

// Run on load
document.addEventListener('DOMContentLoaded', init);
