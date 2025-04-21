# Usa una imagen base de Node.js
FROM node:18

# Crea y usa el directorio de la app
WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone dos puertos
EXPOSE 3000
EXPOSE 4000

# Comando para ejecutar la app (puedes personalizar esto si usas nodemon o PM2)
CMD ["node", "app.js"]