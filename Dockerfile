# === STAGE 1: BUILD (Compilación de la aplicación) ===
# Usamos una imagen Node para ejecutar la compilación de Vite
FROM node:21.7.3 AS build
WORKDIR /app

# Copia solo los archivos de dependencias y las instala
COPY package*.json .
RUN npm install
COPY .  .

EXPOSE 8000

CMD [ "node", "app.js"]