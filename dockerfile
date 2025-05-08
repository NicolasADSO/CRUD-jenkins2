# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copia e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código (incluye .env)
COPY . .

# ⚠️ Borra el .env dentro del contenedor
RUN rm -f .env

# Expone los puertos
EXPOSE 3000
EXPOSE 4000

# Ejecuta la app
CMD ["node", "app.js"]
