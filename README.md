# 💡 Idea Manager

Una aplicación web moderna para gestionar tus ideas de manera eficiente y organizada.

## 🚀 Características

- ✨ **Interfaz moderna y responsive**
- 📝 **Gestión completa de ideas** (crear, editar, eliminar)
- 🏷️ **Categorización** (Tecnología, Negocio, Personal, Creativo)
- 💾 **Almacenamiento local** (localStorage)
- 🔄 **API REST completa**
- 📱 **Diseño mobile-first**

## 🛠️ Tecnologías

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Diseño responsive con CSS Grid y Flexbox
- LocalStorage para persistencia de datos

### Backend
- Node.js + Express
- API REST con endpoints completos
- CORS habilitado para desarrollo

## 📦 Instalación

### Requisitos
- Node.js 16+ 
- Python 3 (para servidor de desarrollo)

### Pasos
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/idea-manager.git
cd idea-manager
```

2. Instala las dependencias del backend:
```bash
cd backend
npm install
cd ..
```

3. Ejecuta la aplicación:
```bash
# Opción 1: Script automático
./start.sh

# Opción 2: Manual
npm run dev
```

## 🌐 Uso

### Desarrollo Local
- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:5000

### API Endpoints
- `GET /api/ideas` - Listar todas las ideas
- `POST /api/ideas` - Crear nueva idea
- `GET /api/ideas/:id` - Obtener idea específica
- `PUT /api/ideas/:id` - Actualizar idea
- `DELETE /api/ideas/:id` - Eliminar idea

## 🚀 Despliegue

### Vercel
El proyecto está configurado para desplegarse automáticamente en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno si es necesario
3. El despliegue se realizará automáticamente en cada push a `main`

### Variables de Entorno
```env
NODE_ENV=production
PORT=5000
```

## 📁 Estructura del Proyecto

```
idea-manager/
├── backend/
│   ├── server.js          # Servidor Express
│   └── package.json       # Dependencias del backend
├── .github/
│   └── workflows/
│       └── ci.yml         # Pipeline CI/CD
├── index.html             # Página principal
├── app.js                 # Lógica del frontend
├── styles.css             # Estilos CSS
├── start.sh              # Script de inicio
├── package.json           # Configuración del proyecto
└── README.md             # Documentación
```

## 🔧 Desarrollo

### Scripts Disponibles
- `npm start` - Inicia el servidor de producción
- `npm run dev` - Modo desarrollo (backend + frontend)
- `npm run dev:backend` - Solo backend en modo desarrollo
- `npm run dev:frontend` - Solo frontend

### Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**rilihouse** - [GitHub](https://github.com/rilihouse)

---

⭐ ¡Si te gusta este proyecto, no olvides darle una estrella!
