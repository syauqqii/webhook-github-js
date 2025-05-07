# 🛠️ Webhook GitHub JS

Webhook GitHub JS adalah sebuah proyek sederhana untuk mengotomatisasi proses Continuous Integration (CI) dan Continuous Deployment (CD) pada server menggunakan GitHub Webhook.

Proyek ini memungkinkan Anda untuk:
- Mengatur auto git pull dan pm2 restart setelah update di GitHub.
- Mendukung multi-server dengan konfigurasi modular.

## ⚡ Instalasi

Clone repository:

```bash
git clone https://github.com/syauqqii/webhook-github-js && cd webhook-github-js
```

Install dependencies:

```bash
npm install
```

## 🗃️ Struktur Folder

```
webhook-github-js/
├── helper/
│   └── ip.helper.js
├── server/
│   ├── translate.server
│   ├── project1.server
│   └── project2.server
├── webhook.js
└── README.md
```

## 🚀 Menjalankan

Manual (tanpa PM2)

```bash
node server/<filename>.server.js
```

Dengan PM2

```bash
pm2 start server/<filename>.server.js --name <project_webhook_name>
```