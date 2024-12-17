# Backend Desafio 360
## Requerimientos
1. Instalación de NodeJs,
Express, POSTMAN, Repositorio de GitHub 

2. Crear un API-REST para el proyecto final enlazado a la base de datos creada
en la primera semana.

    2.1. Creación de Enpoints

        2.1.1 CRUD de Productos: Inserción/Actualización

        2.1.2 CRUD de Categorias de Productos: Inserción/Actualización

        2.1.3 CRUD de Estados: Inserción/Actualización

        2.1.4 CRUD de Usuarios: Inserción/Actualización (encriptar contraseña)

        2.1.5 CRUD de Orden/Detalles, este es el unico CRUD donde se implementa un maestro detalle: Inserción/Actualización (Solo Encabezado)

        2.1.6 CRUD de Clientes: Inserción/Actualización

3. Seguridad del API: Agregar autenticación al sistema

        3.1. realizarlo mediante JSON web token

        3.2. agregar gestión de sesiones de usuario

        3.3. validar cada transacción que se haga al API con un token valido, expirar los tokens en 24 horas

4. Validar los endpoint utilizando POSTMAN

5. Adjuntar LINK de repositorio publico de GITHUB

6. Adjuntar script de la base de datos actualizada con los registros de pruebas
realizados.

# Node + Express Service Starter

This is a simple API sample in Node.js with express.js based on [Google Cloud Run Quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service).

## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```

# Configuración de Variables de Entorno
## Configuración de la Base de Datos
DB_HOST=tu_host_de_base_de_datos
DB_USER=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_NAME=nombre_de_tu_base_de_datos

## Configuración de JWT
JWT_SECRET=tu_clave_secreta_para_jwt

# Base de datos SQL Server
[Archivo SQL](./utils/db.sql)

# Endpoints
## Rutas de la API

A continuación, se describen las rutas principales de la API y su funcionalidad:

**Base URL**: `/api/productos`

| Método | Endpoint           | Descripción                     | Middlewares                  |
|--------|--------------------|---------------------------------|------------------------------|
| POST   | `/`                | Crear un producto              | `authMiddleware`, `validateProduct` |
| PUT    | `/:idProductos`    | Actualizar un producto         | `authMiddleware`, `validateProduct` |

---

### **Rutas de Categorías**
**Base URL**: `/api/categorias`

| Método | Endpoint                 | Descripción                     | Middlewares                  |
|--------|--------------------------|---------------------------------|------------------------------|
| POST   | `/`                      | Crear una categoría             | `authMiddleware`, `validateCategory` |
| PUT    | `/:idCategoriaProductos` | Actualizar una categoría        | `authMiddleware`, `validateCategory` |

---

### **Rutas de Estados**
**Base URL**: `/api/estados`

| Método | Endpoint        | Descripción                     | Middlewares                  |
|--------|-----------------|---------------------------------|------------------------------|
| POST   | `/`             | Crear un estado                 | `authMiddleware`, `validateState` |
| PUT    | `/:idestados`   | Actualizar un estado            | `authMiddleware`, `validateState` |

---

### **Rutas de Usuarios**
**Base URL**: `/api/usuarios`

| Método | Endpoint        | Descripción                     | Middlewares                  |
|--------|-----------------|---------------------------------|------------------------------|
| POST   | `/`             | Crear un usuario                | `authMiddleware`, `validateUser` |
| PUT    | `/:id_usuarios` | Actualizar un usuario           | `authMiddleware`, `validateUser` |

---

### **Rutas de Órdenes**
**Base URL**: `/api/ordenes`

| Método | Endpoint        | Descripción                             | Middlewares                  |
|--------|-----------------|-----------------------------------------|------------------------------|
| POST   | `/`             | Crear una orden con detalles           | `authMiddleware`, `validateOrder` |
| PUT    | `/:idOrden`     | Actualizar una orden con detalles      | `authMiddleware`, `validateOrder` |

---

### **Rutas de Clientes**
**Base URL**: `/api/clientes`

| Método | Endpoint        | Descripción                     | Middlewares                  |
|--------|-----------------|---------------------------------|------------------------------|
| POST   | `/`             | Crear un cliente                | `authMiddleware`            |
| PUT    | `/:idClientes`  | Actualizar un cliente           | `authMiddleware`            |

---

### **Ruta de Comprobación**
**Base URL**: `/`

| Método | Endpoint        | Descripción                                 |
|--------|-----------------|---------------------------------------------|
| GET    | `/`             | Retorna un mensaje indicando que el servicio está corriendo correctamente. |

---

### **Nota**
Todas las rutas protegidas requieren un **token JWT válido** que debe enviarse en el encabezado `Authorization` como:

```http
Authorization: Bearer <token>
