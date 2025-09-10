// Idea Manager - Frontend JavaScript con API
class IdeaManagerAPI {
    constructor() {
        this.apiUrl = '/api/ideas';
        this.ideas = [];
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadIdeas();
        this.renderIdeas();
    }

    bindEvents() {
        const form = document.getElementById('ideaForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('ideaTitle').value;
        const description = document.getElementById('ideaDescription').value;
        const category = document.getElementById('ideaCategory').value;

        if (!title.trim() || !description.trim()) {
            alert('Por favor completa todos los campos');
            return;
        }

        const ideaData = {
            title: title.trim(),
            description: description.trim(),
            category: category
        };

        await this.addIdea(ideaData);
        this.clearForm();
    }

    async addIdea(ideaData) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ideaData)
            });

            if (!response.ok) {
                throw new Error('Error al crear la idea');
            }

            const result = await response.json();
            
            if (result.success) {
                await this.loadIdeas(); // Recargar lista
                this.renderIdeas();
                this.showNotification('¡Idea guardada exitosamente!');
            } else {
                throw new Error(result.message || 'Error al crear la idea');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error al guardar la idea: ' + error.message, 'error');
        }
    }

    async deleteIdea(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta idea?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la idea');
            }

            const result = await response.json();
            
            if (result.success) {
                await this.loadIdeas(); // Recargar lista
                this.renderIdeas();
                this.showNotification('Idea eliminada');
            } else {
                throw new Error(result.message || 'Error al eliminar la idea');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error al eliminar la idea: ' + error.message, 'error');
        }
    }

    async loadIdeas() {
        try {
            const response = await fetch(this.apiUrl);
            
            if (!response.ok) {
                throw new Error('Error al cargar las ideas');
            }

            const result = await response.json();
            
            if (result.success) {
                this.ideas = result.data || [];
            } else {
                throw new Error(result.message || 'Error al cargar las ideas');
            }
        } catch (error) {
            console.error('Error al cargar ideas:', error);
            this.showNotification('Error al cargar las ideas: ' + error.message, 'error');
            this.ideas = [];
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

    showNotification(message, type = 'success') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        const bgColor = type === 'error' ? '#e53e3e' : '#48bb78';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Detectar si estamos en desarrollo o producción
const isProduction = window.location.hostname !== 'localhost';
let ideaManager;

// Inicializar la aplicación apropiada
if (isProduction || window.location.search.includes('api=true')) {
    // Usar versión con API
    ideaManager = new IdeaManagerAPI();
} else {
    // Usar versión con localStorage (fallback para desarrollo)
    document.write('<script src="app.js"><\/script>');
}

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