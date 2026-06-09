// ==========================================
// FUNÇÕES PARA GERENCIAR COOKIES
// ==========================================

/**
 * Cria ou atualiza um cookie
 */
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

/**
 * Recupera o valor de um cookie
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        cookie = cookie.trim();
        if(cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

/**
 * Deleta um cookie
 */
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// ==========================================
// GERENCIAMENTO DE TAREFAS
// ==========================================

let tasks = [];
let currentFilter = 'all';

/**
 * Carrega as tarefas do cookie
 */
function loadTasks() {
    const savedTasks = getCookie('tasks');
    if (savedTasks) {
        try {
            tasks = JSON.parse(decodeURIComponent(savedTasks));
        } catch (e) {
            tasks = [];
        }
    } else {
        tasks = [];
    }
}

/**
 * Salva as tarefas em um cookie
 */
function saveTasks() {
    const encoded = encodeURIComponent(JSON.stringify(tasks));
    setCookie('tasks', encoded, 365);
}

/**
 * Adiciona uma nova tarefa
 */
function addTask(text) {
    if (!text.trim()) return;
    
    const task = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toLocaleDateString('pt-BR')
    };
    
    tasks.unshift(task);
    saveTasks();
    renderTasks();
}

/**
 * Marca uma tarefa como concluída/não concluída
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

/**
 * Deleta uma tarefa
 */
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

/**
 * Deleta todas as tarefas concluídas
 */
function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

/**
 * Filtra tarefas baseado no status
 */
function getFilteredTasks() {
    if (currentFilter === 'active') {
        return tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        return tasks.filter(t => t.completed);
    }
    return tasks;
}

/**
 * Renderiza a lista de tarefas
 */
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    const filteredTasks = getFilteredTasks();
    
    tasksList.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        emptyState.classList.add('visible');
    } else {
        emptyState.classList.remove('visible');
        
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text">${escapeHtml(task.text)}</span>
                <button class="task-delete" onclick="deleteTask(${task.id})">🗑️</button>
            `;
            tasksList.appendChild(taskItem);
        });
    }
    
    updateTaskCount();
}

/**
 * Atualiza o contador de tarefas
 */
function updateTaskCount() {
    const activeCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    
    let countText = '';
    if (activeCount > 0) {
        countText = `${activeCount} ${activeCount === 1 ? 'tarefa' : 'tarefas'} ativa${activeCount === 1 ? '' : 's'}`;
    } else if (completedCount > 0) {
        countText = `${completedCount} ${completedCount === 1 ? 'tarefa' : 'tarefas'} concluída${completedCount === 1 ? '' : 's'}`;
    } else {
        countText = '0 tarefas';
    }
    
    document.getElementById('taskCount').textContent = countText;
    
    const clearBtn = document.getElementById('clearCompleted');
    clearBtn.disabled = completedCount === 0;
}

/**
 * Escapa caracteres especiais do HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// GERENCIAMENTO DE TEMA
// ==========================================

/**
 * Aplica o tema
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeButton('dark');
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeButton('light');
    }
}

/**
 * Atualiza o ícone do botão de tema
 */
function updateThemeButton(theme) {
    const button = document.getElementById('themeToggle');
    const icon = button.querySelector('.icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * Alterna o tema
 */
function toggleTheme() {
    const currentTheme = getCookie('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCookie('theme', newTheme, 365);
    applyTheme(newTheme);
}

/**
 * Inicializa o tema
 */
function initializeTheme() {
    const savedTheme = getCookie('theme') || 'light';
    applyTheme(savedTheme);
}

// ==========================================
// EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Carrega tarefas
    loadTasks();
    renderTasks();
    
    // Inicializa tema
    initializeTheme();
    
    // Botão adicionar tarefa
    document.getElementById('addTaskBtn').addEventListener('click', function() {
        const input = document.getElementById('taskInput');
        addTask(input.value);
        input.value = '';
        input.focus();
    });
    
    // Enter para adicionar tarefa
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('addTaskBtn').click();
        }
    });
    
    // Botão tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Botão limpar concluídas
    document.getElementById('clearCompleted').addEventListener('click', function() {
        if (tasks.some(t => t.completed)) {
            clearCompleted();
        }
    });
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTasks();
        });
    });
});
