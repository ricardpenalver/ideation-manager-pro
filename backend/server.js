const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Almacenamiento en memoria (en producción usarías una base de datos)
let ideas = [
    {
        id: 1,
        title: "Aplicación de gestión de tareas",
        description: "Crear una aplicación web para gestionar tareas personales con categorías y prioridades",
        category: "tecnologia",
        createdAt: new Date().toISOString(),
        status: "nueva"
    },
    {
        id: 2,
        title: "Blog sobre tecnología",
        description: "Iniciar un blog personal donde compartir conocimientos sobre desarrollo web",
        category: "personal",
        createdAt: new Date().toISOString(),
        status: "nueva"
    }
];

// Rutas de la API
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Idea Manager API funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            ideas: '/api/ideas',
            health: '/api/health'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// CRUD de ideas
app.get('/api/ideas', (req, res) => {
    res.json({
        success: true,
        data: ideas,
        count: ideas.length
    });
});

app.get('/api/ideas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idea = ideas.find(i => i.id === id);
    
    if (!idea) {
        return res.status(404).json({
            success: false,
            message: 'Idea no encontrada'
        });
    }
    
    res.json({
        success: true,
        data: idea
    });
});

app.post('/api/ideas', (req, res) => {
    const { title, description, category } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: 'Título y descripción son requeridos'
        });
    }
    
    const newIdea = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        category: category || 'personal',
        createdAt: new Date().toISOString(),
        status: 'nueva'
    };
    
    ideas.unshift(newIdea);
    
    res.status(201).json({
        success: true,
        message: 'Idea creada exitosamente',
        data: newIdea
    });
});

app.put('/api/ideas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ideaIndex = ideas.findIndex(i => i.id === id);
    
    if (ideaIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Idea no encontrada'
        });
    }
    
    const { title, description, category, status } = req.body;
    
    ideas[ideaIndex] = {
        ...ideas[ideaIndex],
        title: title || ideas[ideaIndex].title,
        description: description || ideas[ideaIndex].description,
        category: category || ideas[ideaIndex].category,
        status: status || ideas[ideaIndex].status,
        updatedAt: new Date().toISOString()
    };
    
    res.json({
        success: true,
        message: 'Idea actualizada exitosamente',
        data: ideas[ideaIndex]
    });
});

app.delete('/api/ideas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ideaIndex = ideas.findIndex(i => i.id === id);
    
    if (ideaIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Idea no encontrada'
        });
    }
    
    const deletedIdea = ideas.splice(ideaIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Idea eliminada exitosamente',
        data: deletedIdea
    });
});

// Servir archivos estáticos (para desarrollo)
app.use(express.static(path.join(__dirname, '..')));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
    });
});

// Ruta 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        availableEndpoints: [
            'GET /',
            'GET /api/health',
            'GET /api/ideas',
            'GET /api/ideas/:id',
            'POST /api/ideas',
            'PUT /api/ideas/:id',
            'DELETE /api/ideas/:id'
        ]
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Idea Manager ejecutándose en puerto ${PORT}`);
    console.log(`📡 API disponible en: http://localhost:${PORT}`);
    console.log(`🌐 Frontend disponible en: http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponibles:`);
    console.log(`   GET  /api/ideas - Listar todas las ideas`);
    console.log(`   POST /api/ideas - Crear nueva idea`);
    console.log(`   GET  /api/ideas/:id - Obtener idea específica`);
    console.log(`   PUT  /api/ideas/:id - Actualizar idea`);
    console.log(`   DELETE /api/ideas/:id - Eliminar idea`);
});

module.exports = app;
