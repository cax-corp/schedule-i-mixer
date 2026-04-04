# 🚀 Guide de Déploiement Complet

Ce guide vous explique comment déployer **Schedule I - Mix Recipe Calculator** sur Cloudflare.

**Deux options disponibles**:

1. 🌟 **GitHub → Cloudflare Pages** (recommandé, automatique)
2. 🚀 **Wrangler CLI Direct** (sans GitHub)

## 📋 Table des matières

1. [Prérequis](#-prérequis)
2. [Option 1](#-option-1-github--cloudflare-pages-recommandé)
3. [Option 2](#-option-2-wrangler-direct)
4. [Sécurité](#-considérations-de-sécurité)

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir:

- ✅ **Node.js 16+** - [Télécharger](https://nodejs.org)
- ✅ **Compte Cloudflare gratuit** - [S'inscrire](https://dash.cloudflare.com/sign-up)
- ✅ **Git** (optionnel) - [Télécharger](https://git-scm.com)

Vérifiez votre version de Node:

```powershell
node --version
npm --version
```

## 🔧 Installation Locale

D'abord, vous devez cloner/avoir le code localement.

### 1. Installer Node.js & Git

- Node.js 16+: [https://nodejs.org](https://nodejs.org)
- Git: [https://git-scm.com](https://git-scm.com)

### 2. Installer les dépendances

```powershell
cd "c:\Users\thomb\Desktop\Schedule Scheduler"
npm install
```

---

## 🌟 Option 1: GitHub → Cloudflare Pages (RECOMMANDÉ)

**Avantages**: Automatique, facile, pas d'IDs à gérer, historique Git

### Étape 1: Créer un repository GitHub

1. Allez sur [https://github.com/new](https://github.com/new)
2. Nommez-le `schedule-i-mixer`
3. Cliquez **Create repository**

### Étape 2: Pousser le code sur GitHub

```powershell
git init
git add .
git commit -m "Initial commit: Schedule I Mixer"
git remote add origin https://github.com/VOTRE_USERNAME/schedule-i-mixer.git
git branch -M main
git push -u origin main
```

### Étape 3: Connecter GitHub à Cloudflare Pages

1. Allez sur [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Sélectionnez **Pages** (gauche)
3. Cliquez **Create a project** → **Connect to Git**
4. Autorisez GitHub et sélectionnez votre repo
5. Configurez le build:
   - **Framework**: None
   - **Build command**: `npm install`
   - **Build output**: `public`
   - **Root directory**: (laissez vide)
6. Cliquez **Save and Deploy**

### Étape 4: Vérifier le déploiement

- Votre app est maintenant en ligne à `https://schedule-mixer.pages.dev`
- Consultez **Pages → Deployments** pour voir l'historique

### Déploiements futurs

À chaque `git push`:

```powershell
git add .
git commit -m "votre message"
git push origin main
```

Cloudflare se redéploiera automatiquement! 🚀

---

## 🚀 Option 2: Wrangler Direct

**Avantages**: Pas de GitHub needed, déploiement rapide direct

### Étape 1: Installer Wrangler

```powershell
npm install -g wrangler
wrangler login
```

Cela ouvrira votre navigateur pour autoriser Wrangler.

### Étape 2: Créer KV Namespace

```powershell
wrangler kv:namespace create "RECIPES"
wrangler kv:namespace create "RECIPES" --preview
```

**Output:**

```text
✨ Created kv namespace with ID: abc123def456
```

Copiez les deux IDs.

### Étape 3: Récupérer Account ID

```powershell
wrangler whoami
```

Copiez l'Account ID.

### Étape 4: Configurer wrangler.toml

Ouvrez `wrangler.toml` et modifiez:

```toml
account_id = "VOTRE_ID_ICI"

[[kv_namespaces]]
binding = "RECIPES"
id = "ID_KV_PRINCIPAL"
preview_id = "ID_KV_PREVIEW"
```

### Étape 5: Tester Localement

```powershell
npm run dev
```

Attendez quelques secondes, puis ouvrez: [http://localhost:8787](http://localhost:8787)

### Étape 6: Déployer

```powershell
npm run deploy
```

Votre app est en ligne! 🎉

**URL**: `https://schedule-mixer.YOUR_SUBDOMAIN.workers.dev`

## ✅ Considérations de Sécurité

### ⚠️ Ne commettez PAS dans Git

- IDs Cloudflare
- API Tokens
- Secrets

### ✅ Utilisez plutôt

- Variables d'environnement
- Secrets GitHub Actions
- Cloudflare Dashboard

### Fichier `.gitignore` (déjà inclus)

```bash
.env
.env.local
.wrangler/
node_modules/
```

---

Besoin d'aide?

- 📖 [Documentation Cloudflare Workers](https://developers.cloudflare.com/workers/)
- 📖 [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- 🔧 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

---

Happy Gaming! 🎮⚗️
**Happy Gaming! 🎮⚗️**
