#!/bin/bash

echo "🚀 Iniciando Idea Manager..."

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js para continuar."
    exit 1
fi

# Verificar que Python esté disponible
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 no está instalado. Por favor instala Python3 para el servidor frontend."
    exit 1
fi

echo "📦 Instalando dependencias del backend..."
cd backend
npm install

echo "🔧 Iniciando servidor backend en puerto 5000..."
npm run dev &
BACKEND_PID=$!

echo "📦 Iniciando servidor frontend en puerto 3000..."
cd ..
python3 -m http.server 3000 &
FRONTEND_PID=$!

echo "✅ ¡Aplicación iniciada!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 API Backend: http://localhost:5000"
echo ""
echo "Para detener la aplicación, presiona Ctrl+C"

# Función para limpiar al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT

# Esperar a que terminen los procesos
wait
