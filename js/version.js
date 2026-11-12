// Конфігурація
const version = "v1.4.0";
const siteTitle = "SiriusCat";
const faviconURL = "./css/favicons/favicon-1.png";
const favicon = document.createElement('link');

// Встановленння версії на сторінці
const versionContainer = document.getElementById('site-version');
if (versionContainer) {
    versionContainer.textContent = `Версія: ${version}`;
}

// Заголовок сайту
document.title = `${siteTitle} (${version})`;

// Іконка сайту

favicon.rel = 'icon';
favicon.href = faviconURL;
document.head.appendChild(favicon);