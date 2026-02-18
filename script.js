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

// Get fallback value
function fallback(value, defaultValue) {
    return value !== undefined && value !== null ? value : defaultValue;
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
    const options = { weekday: 'long', month: 'long', 'day': 'numeric' };
    const dateEl = document.getElementById('date');
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// Load weather
async function loadWeather() {
    const weather = await fetchJSON('weather.json');
    
    // Fallback values
    const temp = fallback(weather?.current?.temp, '--');
    const unit = fallback(weather?.current?.unit, '°');
    const description = fallback(weather?.current?.description, 'Loading...');
    const iconMap = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
    const icon = iconMap[weather?.current?.icon] || '🌤️';
    
    const weatherEl = document.getElementById('weather');
    weatherEl.innerHTML = `
        <span class="weather-icon">${icon}</span>
        <span class="weather-temp">${temp}${unit}</span>
        <span class="weather-desc">${description}</span>
    `;
}

// Load tasks
async function loadTasks() {
    const data = await fetchJSON('tasks.json');
    const tasks = data?.tasks || [];
    
    document.getElementById('tasks-count').textContent = fallback(data?.tasks?.length, 0);

    const taskList = document.getElementById('task-list');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="task"><label>No tasks today</label></li>';
        return;
    }

    taskList.innerHTML = tasks.map((task, index) => `
        <li class="task">
            <input type="checkbox" id="task${index + 1}" ${task.completed ? 'checked' : ''}>
            <label for="task${index + 1}">${fallback(task.title, 'Untitled task')}</label>
        </li>
    `).join('');
}

// Load timeline/events
async function loadTimeline() {
    const data = await fetchJSON('events.json');
    const events = data?.events || [];
    
    document.getElementById('events-count').textContent = fallback(events.length, 0);

    const timeline = document.getElementById('timeline');
    
    if (events.length === 0) {
        timeline.innerHTML = '<div class="timeline-item"><span class="time">--:--</span><div class="event"><span class="event-title">No events today</span></div></div>';
        return;
    }

    timeline.innerHTML = events.map(event => `
        <div class="timeline-item">
            <span class="time">${fallback(event.time, '--:--')}</span>
            <div class="event">
                <span class="event-title">${fallback(event.title, 'Untitled event')}</span>
                <span class="event-duration">${fallback(event.duration, '')}</span>
            </div>
        </div>
    `).join('');
}

// Load notes
async function loadNotes() {
    const data = await fetchJSON('notes.json');
    const notes = data?.notes || [];
    
    document.getElementById('notes-count').textContent = fallback(notes.length, 0);

    const notesGrid = document.getElementById('notes-grid');
    
    if (notes.length === 0) {
        notesGrid.innerHTML = '<div class="note"><span class="note-tag">Notes</span><p>No notes</p></div>';
        return;
    }

    notesGrid.innerHTML = notes.map(note => `
        <div class="note">
            <span class="note-tag">${fallback(note.tag, 'Note')}</span>
            <p>${fallback(note.content, '')}</p>
        </div>
    `).join('');
}

// Load forecast
async function loadForecast() {
    const data = await fetchJSON('forecast.json');
    const forecast = data?.forecast || [];
    
    const forecastEl = document.getElementById('forecast');
    const iconMap = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
    
    if (forecast.length === 0) {
        forecastEl.innerHTML = '<div class="forecast-day"><span class="day">--</span><span class="forecast-icon">🌤️</span><span class="forecast-temp">--°</span></div>';
        return;
    }

    forecastEl.innerHTML = forecast.map(day => `
        <div class="forecast-day">
            <span class="day">${fallback(day.day, '--')}</span>
            <span class="forecast-icon">${iconMap[day.icon] || '🌤️'}</span>
            <span class="forecast-temp">${fallback(day.high, '--')}°</span>
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
