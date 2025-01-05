# Resume designer

This repository contains the monorepo for both the **client** (React) and **server** (Node.js) applications.

## Getting Started

use node v22

### 1. Install Dependencies

Before running the project, you need to install the dependencies for all packages. Run the following command to ensure all dependencies are installed across the monorepo:

```bash
npm run hydrate
```

### 2. Create a .env file inside packages/server

```bash
MONGO_URI=your_database_uri
PORT=your_port
JWT_SECRET=your_jwt_secret
```

### 3. Run the app

```bash
npm run start
```