#!/bin/bash

echo "🚀 Preparando deployment a Vercel..."
echo ""

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no encontrado. Instalando..."
    npm install -g vercel
fi

# Verificar que estemos en el directorio correcto
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json no encontrado. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

echo "✅ Iniciando deployment..."
echo ""

# Hacer deployment
vercel --prod

echo ""
echo "🎉 ¡Deployment completado!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Vercel te dará una URL de production"
echo "2. Visita la URL para probar tu aplicación"
echo "3. Tu API estará disponible en: [tu-url]/api/ideas"
echo ""
echo "💡 Para deployments futuros, simplemente ejecuta:"
echo "   ./deploy-vercel.sh"
echo ""