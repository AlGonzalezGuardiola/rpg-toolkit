# RPG Toolkit 5e — sitio web

Landing estática bilingüe (ES/EN) para RPG Toolkit 5e.

- **Producción:** `https://algonzalez.cloud/roltoolkit5e/`
- **Hosting:** Apache en EC2, servido desde `/var/www/html/roltoolkit5e/`
- Todas las rutas son **relativas** para poder servirse desde la subcarpeta `/roltoolkit5e/`.

## Estructura

```
index.html            Landing
privacy.html          Política de privacidad (ES/EN)
assets/css/styles.css Sistema visual (paleta Jade, igual que la app)
assets/js/main.js      i18n (auto + toggle ES/EN), scroll, reveal
assets/img/            Logo, favicon, badges de tienda
```

## Desarrollo local

Servir la carpeta con cualquier servidor estático, p. ej.:

```
python -m http.server 5173
```

y abrir `http://localhost:5173/`.

## i18n

El idioma se detecta del navegador y se puede cambiar con el toggle ES/EN
(se guarda en `localStorage`). Cada texto traducible lleva `data-es` /
`data-en`; el contenido por defecto del HTML está en español.

## Redes

- Instagram: https://www.instagram.com/roltoolkit5e
- TikTok: https://www.tiktok.com/@roltoolkit.5e

## Pendiente

- `assets/img/og-image.png` (imagen para compartir en redes, 1200×630)
- Badges de tienda localizados para Apple (ahora solo EN)
