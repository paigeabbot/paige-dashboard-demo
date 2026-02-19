// Day at a Glance - Data embedded directly

// Embedded data (no fetch needed)
const EMBEDDED_DATA = {
    weather: {
        current: {
            temp: 72,
            unit: "F",
            icon: "sunny",
            description: "Sunny and pleasant"
        }
    },
    forecast: {
        forecast: [
            { day: "Wed", icon: "cloudy", high: 68 },
            { day: "Thu", icon: "rainy", high: 62 },
            { day: "Fri", icon: "sunny", high: 74 },
            { day: "Sat", icon: "sunny", high: 78 }
        ]
    },
    tasks: {
        tasks: [
            { title: "Complete recommendation letters", completed: false },
            { title: "Follow up with recruiter", completed: false },
            { title: "Send birthday wishes", completed: false }
        ]
    },
    events: {
        events: [
            { time: "9:00 AM", title: "Morning routine", duration: "1 hour" },
            { time: "2:00 PM", title: "Meeting", duration: "1 hour" },
            { time: "5:00 PM", title: "Wrap up", duration: "End of day" }
        ]
    },
    notes: {
        notes: [
            { tag: "Ideas", content: "Remember to water the plants" },
            { tag: "Shopping", content: "Milk, eggs, bread" },
            { tag: "Call", content: "Schedule dentist appointment" }
        ]
    }
};

// No fetch needed - data is embedded
function getData(type) {
    return EMBEDDED_DATA[type];
}

// Fallback helper
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
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('date');
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// Load weather
function loadWeather() {
    const weather = getData('weather');
    const current = weather?.current || {};
    const iconMap = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
    
    const weatherEl = document.getElementById('weather');
    weatherEl.innerHTML = `
        <span class="weather-icon">${iconMap[current.icon] || '🌤️'}</span>
        <span class="weather-temp">${fallback(current.temp, '--')}°${fallback(current.unit, '°')}</span>
        <span class="weather-desc">${fallback(current.description, 'Loading...')}</span>
    `;
}

// Load tasks
function loadTasks() {
    const data = getData('tasks');
    const tasks = data?.tasks || [];
    
    document.getElementById('tasks-count').textContent = fallback(tasks.length, 0);
    const taskList = document.getElementById('task-list');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="task"><label>No tasks today</label></li>';
    } else {
        taskList.innerHTML = tasks.map((task, index) => `
            <li class="task">
                <input type="checkbox" id="task${index + 1}" ${task.completed ? 'checked' : ''}>
                <label for="task${index + 1}">${fallback(task.title, 'Untitled task')}</label>
            </li>
        `).join('');
    }
}

// Load timeline/events
function loadTimeline() {
    const data = getData('events');
    const events = data?.events || [];
    
    document.getElementById('events-count').textContent = fallback(events.length, 0);
    const timeline = document.getElementById('timeline');
    
    if (events.length === 0) {
        timeline.innerHTML = '<div class="timeline-item"><span class="time">--:--</span><div class="event"><span class="event-title">No events today</span></div></div>';
    } else {
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
}

// Load notes
function loadNotes() {
    const data = getData('notes');
    const notes = data?.notes || [];
    
    document.getElementById('notes-count').textContent = fallback(notes.length, 0);
    const notesGrid = document.getElementById('notes-grid');
    
    if (notes.length === 0) {
        notesGrid.innerHTML = '<div class="note"><span class="note-tag">Notes</span><p>No notes</p></div>';
    } else {
        notesGrid.innerHTML = notes.map(note => `
            <div class="note">
                <span class="note-tag">${fallback(note.tag, 'Note')}</span>
                <p>${fallback(note.content, '')}</p>
            </div>
        `).join('');
    }
}

// Load forecast
function loadForecast() {
    const data = getData('forecast');
    const forecast = data?.forecast || [];
    const forecastEl = document.getElementById('forecast');
    const iconMap = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', stormy: '⛈️' };
    
    if (forecast.length === 0) {
        forecastEl.innerHTML = '<div class="forecast-day"><span class="day">--</span><span class="forecast-icon">🌤️</span><span class="forecast-temp">--°</span></div>';
    } else {
        forecastEl.innerHTML = forecast.map(day => `
            <div class="forecast-day">
                <span class="day">${fallback(day.day, '--')}</span>
                <span class="forecast-icon">${iconMap[day.icon] || '🌤️'}</span>
                <span class="forecast-temp">${fallback(day.high, '--')}°</span>
            </div>
        `).join('');
    }
}

// Initialize
function init() {
    updateGreeting();
    updateDate();
    loadWeather();
    loadTasks();
    loadTimeline();
    loadNotes();
    loadForecast();
}

// Run on load
document.addEventListener('DOMContentLoaded', init);
