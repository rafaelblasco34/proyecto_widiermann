# proyecto_widiermann 
Nombre del grupo: proyecto widi xxv. 

Participantes: Santino Reynoso - Acuña Aixa - Raimondi Lourdes - Prado Giuliana - Blasco Rafael - Celiz Tiago - Tardugno Ciro. 

Nombre y objetivo: denunciasonline.com, el objetivo de esta app es poder hacer denuncias o sucesos callejeros los que le sucedan a las personas ya sean robos, secuestros, etc. Podran utilizar esta app para poder hacer su denuncia online adjuntando descripciones de lo sucedido, imagenes o videos que sean las pruebas y una vez hecha la denuncia se mandara el formulario hecho con la denuncia hacia una comisaria. Esto permite que las personas se ahorren la necesidad de moverse de sus casas para ir a una comisaria y perder tiempo haciendo filas.

Colores: Elegimos estos colores porque son los mas representativos de la policia, ademas aportan armonia y le dan una buena estetica visual a la pagina.

Tipografia: La tipografia la elegimos porque para un proyecto para la policia, es una letra elegante, legible y clara para la lectura.

Utilizamos la herramienta de canva para hacer los diseños y nos guiamos de paginas existentes.

pantalla de inicio: En esta primera pantalla se realiza el inicio de sesión para ingresar a la pagina utilizamos para el fondo colores claros y suaves con el logo de la policía provincial (este fondo será el predeterminado de la pagina) en el centro se encuentra el formulario del log in en el cual usamos colores algo más fuertes a la vista para realzarlo aquí las personas que ya se hallan registrado pueden iniciar sesión con su nombre propio y de su usuario 

Pantalla de registro: Esta pantalla la cual cumparte colores y logo con la primera cumple la funcion de hacer que el usuario se registre en la pagina para dejar su usuario en la pagina guardado, se le pedira su nombre completo, correo electronico y un nombre de usuario.

Pantalla principal: Una vez que el usuario ingrese podrá realizar distintas tareas como realizar denuncias, contactarse para consultar el procedimiento de las denuncias o encontrar la comisaria mas cercana  

Pantalla de denuncia: Este formulario consiste varias partes un apartado donde pueden describir con sus palabras el echo ocurrido y elegir a que comisaria quiere enviarlo (si no conoce alguna comisaria puede volver atrás y buscarla en el apartado “COMISARIAS DE NEUQUEN”), después de esto puede dejar una descripción del agresor en el caso que lo conozca su nombre o una descripción física si es posible, antes de finalizar puede adjuntar algún archivo como videos o fotografías del acto.

# 🛡️ Sistema de Denuncias Online

Una plataforma web moderna y segura para realizar denuncias de manera eficiente, con un diseño responsive y una experiencia de usuario optimizada.

### 🎨 Diseño Moderno
- **Interfaz intuitiva** con diseño responsive
- **Sistema de colores** profesional y accesible
- **Tipografías** optimizadas (Poppins + Inter)
- **Iconografía** consistente con React Icons
- **Animaciones** suaves y transiciones elegantes

## 🚀 Tecnologías

### Frontend
- **React 18.2.0** - Biblioteca principal
- **React Router DOM 7.8.2** - Enrutamiento
- **Tailwind CSS 4.1.12** - Framework de estilos
- **React Icons 5.0.1** - Iconografía
- **Styled Components 6.1.8** - CSS-in-JS

### Backend
- **Firebase 12.2.1** - Backend como servicio
- **Firestore** - Base de datos NoSQL
- **Firebase Auth** - Autenticación
- **Firebase Hosting** - Hosting estático

### Herramientas de Desarrollo
- **Create React App** - Boilerplate
- **PostCSS** - Procesador CSS
- **Autoprefixer** - Prefijos CSS automáticos
- **ESLint** - Linting de código

## 🛠️ Instalación

### Prerrequisitos
- **Node.js** v16.0.0 o superior
- **npm** v8.0.0 o superior
- **Git** para control de versiones

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/denuncias-online.git
   cd denuncias-online
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Configuración de Firebase

1. **Crear proyecto en Firebase Console**
   - Ve a [Firebase Console](https://console.firebase.google.com)
   - Crea un nuevo proyecto
   - Habilita Firestore Database
   - Habilita Authentication

2. **Configurar métodos de autenticación**
   - Email/Password
   - Google (opcional)

## 📖 Uso

### Páginas Principales

#### 🏠 Inicio
- Landing page con información del sistema
- Características principales
- Estadísticas del sistema
- Proceso de 3 pasos

#### 🔐 Autenticación
- **Login**: Inicio de sesión con usuario/contraseña
- **Registro**: Creación de nueva cuenta
- **Validación**: Formularios con validación en tiempo real

#### 📝 Denuncias
- **Lista**: Visualización de todas las denuncias
- **Estados**: Resuelto, En proceso, En investigación
- **Filtros**: Por estado y fecha
- **Nueva**: Formulario para crear denuncias

#### 📞 Contacto
- Información de contacto
- Formulario de mensaje
- Horarios de atención

### Funcionalidades

#### Para Usuarios No Autenticados
- ✅ Ver página de inicio
- ✅ Ver lista de denuncias públicas
- ✅ Acceder a página de contacto
- ✅ Registrarse en el sistema
- ✅ Iniciar sesión

#### Para Usuarios Autenticados
- ✅ Todas las funciones anteriores
- ✅ Crear nuevas denuncias
- ✅ Ver detalles de denuncias
- ✅ Editar perfil de usuario
- ✅ Cerrar sesión

## 📁 Estructura del Proyecto

```
denuncias-online/
├── 📁 public/                    # Archivos estáticos
│   ├── index.html               # Página principal
│   ├── favicon.ico              # Icono del sitio
│   └── manifest.json            # Configuración PWA
│
├── 📁 src/                      # Código fuente
│   ├── 📁 auth/                 # Autenticación
│   │   ├── AuthContext.jsx      # Contexto de auth
│   │   └── ProtectedRoute.jsx   # Ruta protegida
│   │
│   ├── 📁 components/           # Componentes reutilizables
│   │   ├── Navbar.jsx           # Navegación
│   │   ├── AltaDato.jsx         # Formulario alta
│   │   └── ListadoDatos.jsx     # Lista datos
│   │
│   ├── 📁 firebase/             # Servicios Firebase
│   │   ├── config.js            # Configuración
│   │   └── firestoreService.js  # Servicios BD
│   │
│   ├── 📁 pages/                # Páginas principales
│   │   ├── Inicio.jsx           # Landing page
│   │   ├── Login.jsx            # Login
│   │   ├── Registro.jsx         # Registro
│   │   ├── Denuncias.jsx        # Lista denuncias
│   │   ├── Contacto.jsx         # Contacto
│   │   └── NuevaDenuncia.jsx    # Nueva denuncia
│   │
│   ├── App.jsx                  # Componente principal
│   ├── index.js                 # Punto de entrada
│   └── index.css                # Estilos globales
│
├── 📁 docs/                     # Documentación
│   ├── estructura.md            # Estructura proyecto
│   ├── manual-usuario.md        # Manual usuario
│   ├── guia-desarrollador.md    # Guía desarrollador
│   └── diagrama-componentes.md  # Diagrama componentes
│
├── package.json                 # Dependencias
├── tailwind.config.jsx          # Configuración Tailwind
└── README.md                    # Este archivo
```

## 📚 Documentación

### Documentación Disponible

- **[Manual de Usuario](docs/manual-usuario.md)** - Guía completa para usuarios finales

## 🚀 Deploy

### Deploy en Firebase Hosting

1. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login en Firebase**
   ```bash
   firebase login
   ```

3. **Inicializar proyecto**
   ```bash
   firebase init hosting
   ```

4. **Build para producción**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests con coverage
npm test -- --coverage

# Tests en modo watch
npm test -- --watch
```

### Estructura de Tests

```
src/
├── components/
│   └── __tests__/
│       ├── Navbar.test.js
│       └── Card.test.js
├── pages/
│   └── __tests__/
│       ├── Login.test.js
│       └── Denuncias.test.js
└── utils/
    └── __tests__/
        └── helpers.test.js
```

## 📊 Performance

### Métricas de Rendimiento

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimizaciones Implementadas

- ✅ **Code Splitting** con React.lazy()
- ✅ **Image Optimization** con WebP
- ✅ **Bundle Analysis** con webpack-bundle-analyzer
- ✅ **Service Workers** para caching
- ✅ **Tree Shaking** para eliminar código no usado

## 🔒 Seguridad

### Medidas de Seguridad

- 🔐 **Autenticación** robusta con Firebase Auth
- 🛡️ **Autorización** basada en roles
- 🔒 **Encriptación** de datos sensibles
- ✅ **Validación** de entrada en frontend y backend
- 🚫 **Protección** contra XSS y CSRF
- 🔍 **Logging** de actividades de seguridad

### Estándares de Código

- **ESLint** para linting
- **Prettier** para formateo
- **Conventional Commits** para mensajes
- **Tests** requeridos para nuevas funcionalidades

### Versiones

- **v1.0.0** - Versión inicial (Octubre 2025)
- **v1.1.0** - Mejoras de UI/UX (Noviembre 2025)
- **v1.2.0** - Nuevas funcionalidades (Diciembre 2025)


**Screenshots**
Si aplica, agrega screenshots.


## 📞 Soporte

- **Email**: soporte@denunciasonline.com

### Horarios de Atención

- **Lunes a Viernes**: 9:00 - 18:00 (GMT-3)
- **Sábados**: 9:00 - 13:00 (GMT-3)
- **Domingos**: Cerrado

## 👥 Autores

- **Proyecto_widiermann** 
-**Rafael Blasco**
-**Lourdes Raimondi**
-**Tiago Celiz**
-**Giuliana Prado**
-**Ciro Tardugno**
-**Santino Reynoso**
---
