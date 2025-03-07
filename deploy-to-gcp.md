# Guía para Desplegar ComunicAmi en una VPS de Google Cloud Platform

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
   - Nombre: `comunicami-server`
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
sudo nano /etc/nginx/sites-available/comunicami
```

Añade la siguiente configuración:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;
    root /var/www/comunicami;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Activa la configuración y reinicia Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/comunicami /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Subir los Archivos de la Aplicación

Hay varias formas de subir los archivos:

### Opción 1: Usando SCP

Desde tu máquina local:

```bash
scp -r ./dist/* usuario@IP-DE-TU-VPS:/var/www/comunicami/
```

### Opción 2: Usando Git

En la VPS:

```bash
# Instalar Git
sudo apt install -y git

# Clonar el repositorio
git clone https://tu-repositorio.git /tmp/comunicami

# Instalar dependencias y construir
cd /tmp/comunicami
npm install
npm run build

# Mover los archivos construidos
sudo mkdir -p /var/www/comunicami
sudo cp -r dist/* /var/www/comunicami/
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

## 10. Actualizar la Aplicación Desplegada con Git

Para actualizar la aplicación cuando hayas hecho cambios en tu repositorio local:

```bash
# Conéctate a tu VPS mediante SSH
ssh usuario@IP-DE-TU-VPS

# Navega al directorio temporal donde clonaste el repositorio
cd /tmp/comunicami

# Si es la primera vez que actualizas, asegúrate de que el repositorio existe
# Si no existe, clónalo como se indicó anteriormente

# Si el repositorio ya existe, actualízalo
git pull origin main  # o el nombre de tu rama principal

# Instala dependencias (por si hay nuevas) y reconstruye
npm install
npm run build

# Copia los archivos actualizados al directorio de Nginx
sudo cp -r dist/* /var/www/comunicami/

# Asegúrate de que los permisos son correctos
sudo chown -R www-data:www-data /var/www/comunicami/

# Opcionalmente, reinicia Nginx (generalmente no es necesario)
sudo systemctl restart nginx
```

## Solución de Problemas

- Verifica los logs de Nginx: `sudo tail -f /var/log/nginx/error.log`
- Asegúrate de que los permisos de archivos sean correctos: `sudo chown -R www-data:www-data /var/www/comunicami`
- Verifica el estado de Nginx: `sudo systemctl status nginx`
