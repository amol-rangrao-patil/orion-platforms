# Orion Platforms — Enterprise IT Engineering

This web application is built with **React 19, Vite, Tailwind CSS, and Motion**.

---

## 🚀 How to Run in VS Code (Local Setup)

Follow these steps to run the application locally in Visual Studio Code:

### 1. Prerequisites
- **Node.js**: Version 18.x or higher (recommended: LTS version from [nodejs.org](https://nodejs.org/)).
- **VS Code**: Downloaded and installed.

### 2. Open Project in VS Code
1. Open VS Code.
2. Click **File > Open Folder...** and select this project directory.

### 3. Open Integrated Terminal
- Press ``Ctrl + ` `` (or `Terminal > New Terminal` from the top menu).

### 4. Install Dependencies
Run the following command in the terminal:
```bash
npm install
```

*(Note: If you get a PowerShell script execution restriction error on Windows, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in your terminal or use Git Bash / Command Prompt).*

### 5. Start Development Server
Run:
```bash
npm run dev
```
*(Or alternatively: `npm start`)*

### 6. View the App
Open your web browser and navigate to:
```
http://localhost:3000
```
(If port 3000 is occupied, Vite will automatically notify you of the active port, e.g., `http://localhost:3001`).

---

## 🛠️ Build for Production
To create an optimized production build:
```bash
npm run build
```
The compiled static assets will be generated in the `dist/` directory.

---

## 🌐 How to Deploy to Vercel (Step-by-Step)

The project is already pre-configured with `vercel.json` for seamless zero-config deployment.

### Method 1: Deploy via GitHub (Recommended)
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Orion Platforms"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com/)** and log in with your GitHub account.
3. Click **"Add New..." > "Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**. Within 30 seconds, your site will be live on a `*.vercel.app` URL with free SSL!

### Method 2: Deploy directly via Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. In the project folder, run:
   ```bash
   vercel
   ```
3. Follow the simple prompts (press Enter to accept default settings).
4. For production deployment, run:
   ```bash
   vercel --prod
   ```

