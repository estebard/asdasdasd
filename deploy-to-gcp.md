# Guía para Desplegar TalkBuddy en una VPS de Google Cloud Platform

## 1. Preparar la Aplicación para Producción

Primero, construye la versión de producción de la aplicación:

```bash
npm run build
```

Esto generará una carpeta `dist` con los archivos optimizados para producción.

## 2. Configurar una VPS en Google Cloud Platform

### Crear una Instancia de VM

1. Accede a la [Consola de Google Cloud](https://console.cloud.google.com/)
2. Ve a "Compute Engine" > "Instancias de VM"
3. Haz clic en "Crear instancia"
4. Configura la instancia:
   - Nombre: `talkbuddy-server`
   - Región: Selecciona la más cercana a tus usuarios
   - Tipo de máquina: e2-small (2 vCPU, 2 GB de memoria) es suficiente para empezar
   - Sistema operativo: Debian 11 o Ubuntu 20.04 LTS
   - Permitir tráfico HTTP y HTTPS
5. Haz clic en "Crear"

## 3. Conectarse a la VPS

Puedes conectarte a tu instancia directamente desde la consola de GCP haciendo clic en el botón "SSH" junto a tu instancia, o configurar tu propia clave SSH.

## 4. Instalar Dependencias en la VPS

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Nginx
sudo apt install -y nginx

# Instalar PM2 para gestionar el proceso de Node.js
sudo npm install -g pm2
```

## 5. Configurar Nginx como Servidor Web

Crea un archivo de configuración para Nginx:

```bash
sudo nano /etc/nginx/sites-available/talkbuddy
```

Añade la siguiente configuración:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;
    root /var/www/talkbuddy;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Activa la configuración y reinicia Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/talkbuddy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Subir los Archivos de la Aplicación

Hay varias formas de subir los archivos:

### Opción 1: Usando SCP

Desde tu máquina local:

```bash
scp -r ./dist/* usuario@IP-DE-TU-VPS:/var/www/talkbuddy/
```

### Opción 2: Usando Git

En la VPS:

```bash
# Instalar Git
sudo apt install -y git

# Clonar el repositorio
git clone https://tu-repositorio.git /tmp/talkbuddy

# Instalar dependencias y construir
cd /tmp/talkbuddy
npm install
npm run build

# Mover los archivos construidos
sudo mkdir -p /var/www/talkbuddy
sudo cp -r dist/* /var/www/talkbuddy/
```

## 7. Configurar HTTPS (Recomendado)

Instala Certbot para obtener certificados SSL gratuitos:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

## 8. Configurar Firewall de GCP

Asegúrate de que los puertos 80 (HTTP) y 443 (HTTPS) estén abiertos en las reglas de firewall de GCP:

1. Ve a "VPC Network" > "Firewall"
2. Crea reglas para permitir el tráfico HTTP y HTTPS si no existen

## 9. Configurar un Dominio (Opcional)

Si tienes un dominio, configura los registros DNS para que apunten a la IP de tu VPS:

1. Crea un registro A que apunte a la IP de tu VPS
2. Espera a que se propaguen los cambios DNS (puede tomar hasta 48 horas)

## 10. Mantenimiento

Para actualizar la aplicación en el futuro:

```bash
# Sube los nuevos archivos construidos
# Luego, si es necesario, reinicia Nginx
sudo systemctl restart nginx
```

## Solución de Problemas

- Verifica los logs de Nginx: `sudo tail -f /var/log/nginx/error.log`
- Asegúrate de que los permisos de archivos sean correctos: `sudo chown -R www-data:www-data /var/www/talkbuddy`
- Verifica el estado de Nginx: `sudo systemctl status nginx`
