#!/bin/bash

echo "🚀 Iniciando Idea Manager..."
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Capturar señales para limpiar procesos
trap cleanup SIGINT SIGTERM

# Verificar si las dependencias del backend están instaladas
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

# Iniciar backend
echo "🔧 Iniciando backend en puerto 5000..."
cd backend && npm start &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend inicie
sleep 2

# Iniciar frontend
echo "🌐 Iniciando frontend en puerto 3000..."
python3 -m http.server 3000 &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicación iniciada exitosamente!"
echo ""
echo "📍 Accede a la aplicación en: http://localhost:3000"
echo "🔗 API backend disponible en: http://localhost:5000"
echo ""
echo "💡 Presiona Ctrl+C para detener ambos servidores"
echo ""

# Esperar a que termine algún proceso
wait