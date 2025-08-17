# 📝 Gestio - Simple Task Manager

## Personal project aimed at learning API Platform, React and TypeScript

- **Backend** : API Platform <img src="https://api-platform.com/images/logos/Logo_Circle%20webby%20blue%20light.svg" alt="API Platform" width="20" style="vertical-align:middle;"/>
- **Frontend** : React <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="20" style="vertical-align:middle;"/> + <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="React" width="20" style="vertical-align:middle;"/>

---

## 🚀 Launch the Project

### 1. Start the PHP server <img src="https://www.php.net/images/logos/new-php-logo.svg" alt="React" width="32" style="vertical-align:middle;"/>

From the `backend/` folder, start the built-in PHP server:

```bash

cd gestioBack
php /bin/console lexik:jwt:generate-keypair # to create Keys Pair for the Auth, optionally you can do with openssl command
php /bin/console doctrine:migrations:migrate # create DB
php -S localhost:8000 -t ./public

```

### 2. Launch Front server <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="React" width="24" style="vertical-align:middle;"/>

From the `frontend/` folder, start the front server:

```bash

cd frontend
npm init -y       
npm install        
npm run dev        
o  # open default browser
```

Prerequisites

- PHP 8+

- Node.js 18+ / npm
