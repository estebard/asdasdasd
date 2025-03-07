# Guía para Actualizar ComunicAmi en el Servidor

Esta guía explica cómo actualizar la aplicación ComunicAmi en tu servidor VPS de Google Cloud Platform cuando hayas realizado cambios en tu código local.

## Método 1: Actualización mediante Git (Recomendado)

Si desplegaste la aplicación usando Git, este es el método más eficiente para actualizarla:

### Paso 1: Confirmar y subir tus cambios locales

Primero, asegúrate de que todos tus cambios locales estén confirmados y subidos a tu repositorio remoto:

```bash
# En tu máquina local
git add .
git commit -m "Cambio de nombre a ComunicAmi y otras actualizaciones"
git push origin main  # o la rama que estés utilizando
```

### Paso 2: Conectarse al servidor

```bash
ssh usuario@IP-DE-TU-VPS
```

### Paso 3: Actualizar el código en el servidor

```bash
# Navega al directorio donde está clonado el repositorio
cd /tmp/comunicami  # o la ruta donde hayas clonado el repositorio

# Actualiza el repositorio con los últimos cambios
git pull origin main  # o la rama que estés utilizando

# Instala dependencias (por si hay nuevas)
npm install

# Reconstruye la aplicación
npm run build

# Copia los archivos actualizados al directorio de Nginx
sudo cp -r dist/* /var/www/comunicami/

# Asegúrate de que los permisos son correctos
sudo chown -R www-data:www-data /var/www/comunicami/
```

### Paso 4: Verificar la actualización

Abre tu sitio web en un navegador para verificar que los cambios se han aplicado correctamente. Si usas un nombre de dominio, visita tu dominio. Si no, usa la IP de tu VPS.

## Método 2: Actualización mediante SCP

Si prefieres no usar Git en el servidor, puedes construir la aplicación localmente y subir los archivos directamente:

```bash
# En tu máquina local
npm run build

# Sube los archivos construidos al servidor
scp -r ./dist/* usuario@IP-DE-TU-VPS:/var/www/comunicami/
```

## Solución de problemas comunes

### Los cambios no se ven reflejados

1. **Problema de caché del navegador**: Intenta forzar una recarga completa (Ctrl+F5 o Cmd+Shift+R)
2. **Permisos incorrectos**: Verifica que los archivos tienen los permisos correctos
   ```bash
   sudo chown -R www-data:www-data /var/www/comunicami/
   sudo chmod -R 755 /var/www/comunicami/
   ```
3. **Nginx no está sirviendo los nuevos archivos**: Reinicia Nginx
   ```bash
   sudo systemctl restart nginx
   ```

### Errores durante la actualización

Si encuentras errores durante el proceso de actualización, verifica los logs:

```bash
# Logs de Nginx
sudo tail -f /var/log/nginx/error.log

# Estado de Nginx
sudo systemctl status nginx
```

## Automatización del proceso (opcional)

Para automatizar este proceso, puedes crear un script de despliegue en tu servidor:

```bash
# Crea un archivo deploy.sh en el servidor
sudo nano /home/usuario/deploy.sh
```

Contenido del script:

```bash
#!/bin/bash
echo "Iniciando actualización de ComunicAmi..."

# Navegar al repositorio
cd /tmp/comunicami

# Actualizar el código
git pull origin main

# Instalar dependencias y construir
npm install
npm run build

# Copiar archivos al directorio web
sudo cp -r dist/* /var/www/comunicami/

# Corregir permisos
sudo chown -R www-data:www-data /var/www/comunicami/

echo "¡Actualización completada!"
```

Haz el script ejecutable:

```bash
sudo chmod +x /home/usuario/deploy.sh
```

Ahora puedes ejecutar la actualización simplemente con:

```bash
/home/usuario/deploy.sh
```
