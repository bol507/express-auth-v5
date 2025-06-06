
# Node - Autenticación Rest con Clean Architecture






## Acerca de 

Este es un repositorio personal con una implementación básica de autenticación REST usando Express y clean architecture. En el proceso se exploran fundamentos de Arquitectura Limpias, inyección de dependencias entre otros conceptos más de arquitectura de software.
## Requerimientos


- Node 22.11.0
- Express 5.1.0
- Prisma 6.5.0 
- podman
## Installation

Para instalar el proyecto siga los siguientes pasos

Instalar módulos o dependencias


```bash
  npm install 
```
    
## Ejecucion del proyecto

Para ejecutar el proyecto se deben seguir los siguientes pasos:

1. Clonar el archivo `.env.template` a `.env`
2. Configurar variables de entorno

```
#default port express server
PORT=3000 

# Database string for connecting to your database with prisma
DATABASE_URL="mysql://your-user:your-password@localhost:3306/your-database"

# Database connection variables with docker
DB_NAME=your-database
DB_USER=your-user
DB_PASSWORD=your-password
DB_PORT=3306
DB_ROOT_PASSWORD=my_secure_password

JWT_SECRET="generate pass with npx auth secret " 
JWT_EXPIRES_IN=24h
```
generar las variables de prisma y crear las tablas en la base de datos
```
npx prisma
npx prisma generate
npx prisma db push
```
mas informacion en la pagina oficial de prisma: https://www.prisma.io/docs/

### Levantar la base de datos y adminer
```
podman compose -f compose.yml up -d
```

### Ejecucion del proyecto
Entorno de desarrollo

```
npm run dev
```
pnpm
```
pnpm dev
```