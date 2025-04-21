# Imagen base
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios primero
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código de tu app al contenedor
COPY . .

# Expone los puertos para ambos servidores
EXPOSE 3000
EXPOSE 4000

# Ejecuta la app principal
CMD ["node", "app.js"]
