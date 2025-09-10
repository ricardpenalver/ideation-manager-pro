// Vercel Serverless Function para health check
export default function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            message: '🚀 Idea Manager API funcionando correctamente',
            version: '1.0.0'
        });
    }

    return res.status(405).json({
        success: false,
        message: 'Método no permitido'
    });
}