/* Assignment 2 shared logic — palette persistence and icon swapping */

var A2_PALETTES = ['light-pink', 'baby-blue', 'gothic-purple', 'warm-orange'];

var A2_PALETTE_FORTUNE = {
    'light-pink': {
        bg: 'rgba(255, 220, 235, 0.75)',
        text: '#4a2040',
        border: '#e090b0',
    },
    'baby-blue': {
        bg: 'rgba(184, 220, 240, 0.75)',
        text: '#1a3050',
        border: '#7eb8dc',
    },
    'gothic-purple': {
        bg: 'rgba(58, 32, 80, 0.75)',
        text: '#e8d0f0',
        border: '#b48cd273',
    },
    'warm-orange': {
        bg: 'rgba(255, 210, 170, 0.75)',
        text: '#5c3018',
        border: '#e08850',
    }
};

function normalizePaletteName(name) {
    if (name === 'default') {
        return 'default';
    }
    if (A2_PALETTES.indexOf(name) === -1) {
        return 'default';
    }
    return name;
}

function setA2Palette(name) {
    name = normalizePaletteName(name);
    document.body.setAttribute('palette', name);
    localStorage.setItem('a2Palette', name);

    var chips = document.querySelectorAll('.palette-chip');
    for (var i = 0; i < chips.length; i++) {
        if (chips[i].getAttribute('data-palette') === name) {
            chips[i].classList.add('active');
        } else {
            chips[i].classList.remove('active');
        }
    }

    applyFortunePalette(name);
    swapIcons(name);
}

function applyFortunePalette(name) {
    var box = document.getElementById('fortune-box');
    var css = getComputedStyle(document.body);
    if (!box) return;
    var style = A2_PALETTE_FORTUNE[name] || A2_PALETTE_FORTUNE['light-pink'];
    box.style.background = style.bg;
    box.style.color = css.getPropertyValue('--text-color').trim();;
    box.style.borderColor = css.getPropertyValue('--border-color').trim();
    box.style.fontSize = '1.25rem';
    box.style.fontFamily = "'Cheveuxdange', cursive, sans-serif";
}

function swapIcons(name) {
    var leftIcon = document.getElementById("icon-left");
    var rightIcon = document.getElementById("icon-right");
    var resetIcon = document.getElementById('sw-reset-icon');
    var playIcon = document.getElementById('sw-play-icon');
    var stopIcon = document.getElementById('sw-stop-icon');
    if (!resetIcon) {
        if (!leftIcon && !rightIcon) return;
    }

    var prefix = name;
    leftIcon.src = "images/icons/" + prefix + "-emoji.png";
    rightIcon.src = "images/icons/" + prefix + "-emoji.png";
    resetIcon.src = 'images/icons/' + prefix + '-reset.svg';
    playIcon.src = 'images/icons/' + prefix + '-play.svg';
    stopIcon.src = 'images/icons/' + prefix + '-stop.svg';
}

function initA2Palette() {
    if (!document.body.classList.contains('a2')) return;
    var saved = normalizePaletteName(localStorage.getItem('a2Palette') || 'light-pink');
    setA2Palette(saved);
}

document.addEventListener('DOMContentLoaded', function() {
    initA2Palette();
});

/* Fortune Generator — random fortunes and palette chip buttons */

var fortunes = [
    'Today you might finally have that epiphany... or just another cup of coffee.',
    'Your silence speaks volumes, but no one is listening at full blast.',
    'A journey of a thousand miles begins with a single promise you never intended to keep.',
    "Don't worry, even a broken clock is right twice a day, or so they say.",
    'The banana stand holds secrets. Trust the process.',
    "Your future is as bright as your phone's screen at 3 AM.",
    'Some doors are meant to close, just like your mind during important discussions.',
    "Embrace chaos, it's nature's way of telling you that your plan wasn't really a plan.",
    'The art of doing nothing is often misunderstood and always underrated.',
    "Your path may be paved with self-doubt, but at least you'll never be lost.",
    "Congratulations, you’re about to achieve mediocrity ~ everyone's ultimate goal.",
    "Keep dreaming big, so vast, it's actually unreachable.",
    "Life's a journey; too bad your GPS only works when it's too late.",
    "Good news! You haven't made any new enemies today. Yet.",
    "You will be very successful one day. Or maybe it was yesterday.",
    "Your next revelation will be sponsored by caffeine and existential dread.",
];

function displayRandomFortune() {
    var box = document.getElementById('fortune-text');
    if (!box) return;
    var index = Math.floor(Math.random() * fortunes.length);
    box.textContent = '"' + fortunes[index] + '"';
}

function initFortunePage() {
    displayRandomFortune();

    var chips = document.querySelectorAll('.palette-chip');
    for (var i = 0; i < chips.length; i++) {
        chips[i].addEventListener('click', function() {
            var palette = this.getAttribute('data-palette');
            setA2Palette(palette);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.body.getAttribute('data-a2-page') === 'fortune') {
        initFortunePage();
    }
});


/* Stopwatch — 10s run, +3 displayed each second, stops at 30 */

var swElapsed = 0;
var swTimerId = null;
var swRunning = false;
var SW_TICK_MS = 1000;
var SW_STEP = 3;
var SW_MAX = 30;

function renderStopwatch() {
    var display = document.getElementById('stopwatch-display');
    if (display) {
        display.textContent = swElapsed + 's';
    }
}

function stopStopwatch() {
    swRunning = false;
    if (swTimerId !== null) {
        clearInterval(swTimerId);
        swTimerId = null;
    }
    var playBtn = document.getElementById('sw-play');
    var stopBtn = document.getElementById('sw-stop');
    if (playBtn) playBtn.disabled = (swElapsed >= SW_MAX);
    if (stopBtn) stopBtn.disabled = true;
}

function startStopwatch() {
    if (swRunning || swElapsed >= SW_MAX) return;
    swRunning = true;
    var playBtn = document.getElementById('sw-play');
    var stopBtn = document.getElementById('sw-stop');
    if (playBtn) playBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;

    swTimerId = setInterval(function() {
        swElapsed += SW_STEP;
        if (swElapsed >= SW_MAX) {
            swElapsed = SW_MAX;
            renderStopwatch();
            stopStopwatch();
            return;
        }
        renderStopwatch();
    }, SW_TICK_MS);
}

function resetStopwatch() {
    stopStopwatch();
    swElapsed = 0;
    renderStopwatch();
    var playBtn = document.getElementById('sw-play');
    if (playBtn) playBtn.disabled = false;
}

function initStopwatchPage() {
    renderStopwatch();

    var playBtn = document.getElementById('sw-play');
    var stopBtn = document.getElementById('sw-stop');
    var resetBtn = document.getElementById('sw-reset');

    if (playBtn) {
        playBtn.addEventListener('click', startStopwatch);
    }
    if (stopBtn) {
        stopBtn.addEventListener('click', stopStopwatch);
        stopBtn.disabled = true;
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetStopwatch);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.body.getAttribute('data-a2-page') === 'stopwatch') {
        initStopwatchPage();
    }
});

/* To-Do List — taped cards, modal add, localStorage, 10 task max */

var TODO_STORAGE_KEY = 'a2Todos';
var TODO_MAX = 10;
var TODO_PER_CARD = 5;
var a2Todos = [];
var todoIdCounter = 1;

function loadTodos() {
    var raw = localStorage.getItem(TODO_STORAGE_KEY);
    if (raw) {
        try {
            a2Todos = JSON.parse(raw);
            for (var i = 0; i < a2Todos.length; i++) {
                if (a2Todos[i].id >= todoIdCounter) {
                    todoIdCounter = a2Todos[i].id + 1;
                }
            }
        } catch (e) {
            a2Todos = [];
        }
    }
}

function saveTodos() {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(a2Todos));
}

function showA2Modal(title, message, showInput, onConfirm) {
    var backdrop = document.getElementById('a2-task-modal');
    var titleEl = document.getElementById('a2-task-modal-title');
    var msgEl = document.getElementById('a2-task-modal-msg');
    var inputWrap = document.getElementById('a2-task-input-wrap');
    var inputEl = document.getElementById('a2-task-input');
    var confirmBtn = document.getElementById('a2-task-modal-confirm');
    var cancelBtn = document.getElementById('a2-task-modal-cancel');

    if (!backdrop) return;

    titleEl.textContent = title;
    msgEl.textContent = message;
    msgEl.style.display = message ? 'block' : 'none';

    if (showInput) {
        inputWrap.style.display = 'block';
        inputEl.value = '';
        setTimeout(function() { inputEl.focus(); }, 100);
    } else {
        inputWrap.style.display = 'none';
    }

    confirmBtn.onclick = function() {
        backdrop.classList.remove('show');
        if (onConfirm) onConfirm(inputEl.value);
    };

    cancelBtn.onclick = function() {
        backdrop.classList.remove('show');
    };

    backdrop.classList.add('show');
}

function showPlateFullModal() {
    if (window.showNotification) {
        window.showNotification(
            'Enough on your plate!',
            'You already have enough on your plate — why not finish and remove some tasks before adding more?',
            false
        );
    } else {
        showA2Modal(
            'Enough on your plate!',
            'You already have enough on your plate — why not finish and remove some tasks before adding more?',
            false,
            null
        );
    }
}

function renderTodoItem(item) {
    var li = document.createElement('li');
    li.className = 'todo-item';
    li.setAttribute('data-id', String(item.id));

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', function() {
        toggleTodoComplete(item.id);
    });

    var span = document.createElement('span');
    span.className = 'todo-text' + (item.completed ? ' completed' : '');
    span.textContent = item.text;

    var delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'todo-delete';
    delBtn.appendChild(document.createTextNode('peel off'));
    delBtn.addEventListener('click', function() {
        deleteTodo(item.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
}

function renderTodos() {
    var list1 = document.getElementById('todo-list-1');
    var list2 = document.getElementById('todo-list-2');
    var card2 = document.getElementById('todo-card-2');
    if (!list1) return;

    while (list1.firstChild) list1.removeChild(list1.firstChild);
    if (list2) while (list2.firstChild) list2.removeChild(list2.firstChild);

    for (var i = 0; i < a2Todos.length; i++) {
        var li = renderTodoItem(a2Todos[i]);
        if (i < TODO_PER_CARD) {
            list1.appendChild(li);
        } else if (list2) {
            list2.appendChild(li);
        }
    }

    if (card2) {
        card2.style.display = a2Todos.length > TODO_PER_CARD ? 'block' : 'none';
    }
}

function addTodo(text) {
    var trimmed = text.replace(/^\s+|\s+$/g, '');
    if (!trimmed) return;

    if (a2Todos.length >= TODO_MAX) {
        showPlateFullModal();
        return;
    }

    a2Todos.push({
        id: todoIdCounter,
        text: trimmed,
        completed: false
    });
    todoIdCounter += 1;
    saveTodos();
    renderTodos();
}

function toggleTodoComplete(id) {
    for (var i = 0; i < a2Todos.length; i++) {
        if (a2Todos[i].id === id) {
            a2Todos[i].completed = !a2Todos[i].completed;
            break;
        }
    }
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    var next = [];
    for (var i = 0; i < a2Todos.length; i++) {
        if (a2Todos[i].id !== id) {
            next.push(a2Todos[i]);
        }
    }
    a2Todos = next;
    saveTodos();
    renderTodos();
}

function initTodoPage() {
    loadTodos();
    renderTodos();

    var addBtn = document.getElementById('todo-add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            if (a2Todos.length >= TODO_MAX) {
                showPlateFullModal();
                return;
            }
            showA2Modal('Scribble a task', '', true, function(value) {
                addTodo(value);
            });
        });
    }

    var inputEl = document.getElementById('a2-task-input');
    if (inputEl) {
        inputEl.addEventListener('keydown', function(e) {
            if (e.keyCode === 13) {
                var confirmBtn = document.getElementById('a2-task-modal-confirm');
                if (confirmBtn) confirmBtn.click();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.body.getAttribute('data-a2-page') === 'todo') {
        initTodoPage();
    }
});

