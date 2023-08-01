# Utiliza una imagen base con Nginx para servir la aplicación web
FROM nginx:alpine

# Copia los archivos de tu proyecto al directorio predeterminado de Nginx
COPY . /usr/share/nginx/html


# Expone el puerto 80 para acceder a la aplicación web
EXPOSE 80

# Inicia el servidor web Nginx
CMD ["nginx", "-g", "daemon off;"]