# === STAGE 1: BUILD (Compilación de la aplicación) ===
# Usamos una imagen Node para ejecutar la compilación de Vite
FROM node:21.7.3 AS build
WORKDIR /app

# Copia solo los archivos de dependencias y las instala
COPY package.json .
RUN npm install

# Copia todo el código y ejecuta la compilación de producción
COPY . .
RUN npm run build

# === STAGE 2: PRODUCTION (Servir con Nginx) ===
# Usamos una imagen Alpine de Nginx, que es muy ligera y segura
FROM nginx:alpine

# Copia los archivos estáticos (el resultado de npm run build) 
# desde la etapa 'build' a la carpeta de servicio web de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# [IMPORTANTE] Si tu aplicación React es una Single Page Application (SPA),
# necesitarás un archivo de configuración de Nginx (nginx.conf) 
# para manejar las rutas. Si no lo tienes, la navegación interna fallará.
# Ejemplo de copia de configuración:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# El puerto 80 es el estándar de Nginx y el que debe usar tu servicio ECS
EXPOSE 80

# Comando para iniciar Nginx en primer plano (requerido por Docker)
CMD ["nginx", "-g", "daemon off;"]