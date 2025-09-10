// Vercel Serverless Function para gestión de ideas
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

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    // Add CORS headers
    Object.keys(corsHeaders).forEach(key => {
        res.setHeader(key, corsHeaders[key]);
    });

    const { method, query } = req;
    const { id } = query;

    try {
        switch (method) {
            case 'GET':
                if (id) {
                    // Get specific idea
                    const idea = ideas.find(i => i.id === parseInt(id));
                    if (!idea) {
                        return res.status(404).json({
                            success: false,
                            message: 'Idea no encontrada'
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        data: idea
                    });
                } else {
                    // Get all ideas
                    return res.status(200).json({
                        success: true,
                        data: ideas,
                        count: ideas.length
                    });
                }

            case 'POST':
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
                
                return res.status(201).json({
                    success: true,
                    message: 'Idea creada exitosamente',
                    data: newIdea
                });

            case 'PUT':
                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: 'ID es requerido para actualizar'
                    });
                }

                const ideaIndex = ideas.findIndex(i => i.id === parseInt(id));
                
                if (ideaIndex === -1) {
                    return res.status(404).json({
                        success: false,
                        message: 'Idea no encontrada'
                    });
                }
                
                const { title: newTitle, description: newDescription, category: newCategory, status: newStatus } = req.body;
                
                ideas[ideaIndex] = {
                    ...ideas[ideaIndex],
                    title: newTitle || ideas[ideaIndex].title,
                    description: newDescription || ideas[ideaIndex].description,
                    category: newCategory || ideas[ideaIndex].category,
                    status: newStatus || ideas[ideaIndex].status,
                    updatedAt: new Date().toISOString()
                };
                
                return res.status(200).json({
                    success: true,
                    message: 'Idea actualizada exitosamente',
                    data: ideas[ideaIndex]
                });

            case 'DELETE':
                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: 'ID es requerido para eliminar'
                    });
                }

                const deleteIndex = ideas.findIndex(i => i.id === parseInt(id));
                
                if (deleteIndex === -1) {
                    return res.status(404).json({
                        success: false,
                        message: 'Idea no encontrada'
                    });
                }
                
                const deletedIdea = ideas.splice(deleteIndex, 1)[0];
                
                return res.status(200).json({
                    success: true,
                    message: 'Idea eliminada exitosamente',
                    data: deletedIdea
                });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({
                    success: false,
                    message: 'Método no permitido'
                });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
        });
    }
}