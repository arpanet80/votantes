# Etapa 1: Construcción (builder)
FROM node:18-alpine as builder

# Establecer el directorio de trabajo para la etapa de construcción
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir el proyecto Angular (se generará la carpeta dist)
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar los archivos generados en la etapa de construcción a la carpeta pública de nginx
COPY --from=builder /app/dist/votantes-ui/browser /usr/share/nginx/html

# Copiar la configuración de nginx personalizada (si aplica)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Comando para reemplazar variables en env.template.js y arrancar nginx
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && exec nginx -g 'daemon off;'"]

