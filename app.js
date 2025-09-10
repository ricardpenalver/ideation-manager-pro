// Idea Manager - Frontend JavaScript
class IdeaManager {
    constructor() {
        this.ideas = this.loadIdeas();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderIdeas();
    }

    bindEvents() {
        const form = document.getElementById('ideaForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('ideaTitle').value;
        const description = document.getElementById('ideaDescription').value;
        const category = document.getElementById('ideaCategory').value;

        if (!title.trim() || !description.trim()) {
            alert('Por favor completa todos los campos');
            return;
        }

        const idea = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            category: category,
            createdAt: new Date().toISOString(),
            status: 'nueva'
        };

        this.addIdea(idea);
        this.clearForm();
    }

    addIdea(idea) {
        this.ideas.unshift(idea);
        this.saveIdeas();
        this.renderIdeas();
        this.showNotification('¡Idea guardada exitosamente!');
    }

    deleteIdea(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta idea?')) {
            this.ideas = this.ideas.filter(idea => idea.id !== id);
            this.saveIdeas();
            this.renderIdeas();
            this.showNotification('Idea eliminada');
        }
    }

    clearForm() {
        document.getElementById('ideaForm').reset();
    }

    renderIdeas() {
        const container = document.getElementById('ideasContainer');
        
        if (this.ideas.length === 0) {
            container.innerHTML = '<p class="no-ideas">No tienes ideas guardadas aún. ¡Crea tu primera idea!</p>';
            return;
        }

        container.innerHTML = this.ideas.map(idea => `
            <div class="idea-item">
                <div class="idea-title">${this.escapeHtml(idea.title)}</div>
                <div class="idea-description">${this.escapeHtml(idea.description)}</div>
                <div class="idea-meta">
                    <span class="idea-category">${this.getCategoryLabel(idea.category)}</span>
                    <span class="idea-date">${this.formatDate(idea.createdAt)}</span>
                </div>
                <button class="delete-btn" onclick="ideaManager.deleteIdea(${idea.id})">
                    🗑️ Eliminar
                </button>
            </div>
        `).join('');
    }

    getCategoryLabel(category) {
        const labels = {
            'tecnologia': '💻 Tecnología',
            'negocio': '💼 Negocio',
            'personal': '👤 Personal',
            'creativo': '🎨 Creativo'
        };
        return labels[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    saveIdeas() {
        localStorage.setItem('ideaManager_ideas', JSON.stringify(this.ideas));
    }

    loadIdeas() {
        const saved = localStorage.getItem('ideaManager_ideas');
        return saved ? JSON.parse(saved) : [];
    }
}

// Inicializar la aplicación
const ideaManager = new IdeaManager();

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
