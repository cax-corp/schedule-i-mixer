# 📁 Structure du Projet

```
Schedule Scheduler/                    ← Racine du projet
│
├── 📄 wrangler.toml                   ← Configuration Cloudflare (éditer avec IDs)
├── 📄 package.json                    ← Dépendances NPM
├── 📄 .gitignore                      ← Fichiers à ignorer dans Git
├── 📄 .env.example                    ← Exemple de variables d'environnement
│
├── 📚 DOCUMENTATION
│   ├── 📄 README.md                   ← Vue d'ensemble du projet ⭐ START HERE
│   ├── 📄 QUICKSTART.md               ← Installation rapide (5 min)
│   ├── 📄 DEPLOYMENT_GUIDE.md         ← Guide de déploiement détaillé
│   ├── 📄 USER_GUIDE.md               ← Guide utilisateur final
│   └── 📄 API_REFERENCE.md            ← Documentation des API endpoints
│
├── 📁 public/                         ← Frontend (fichiers statiques)
│   ├── 📄 index.html                  ← Page HTML principale (UI)
│   ├── 📄 styles.css                  ← Feuille de styles (responsive + dark mode)
│   └── 📄 app.js                      ← Logique JavaScript client
│
├── 📁 functions/                      ← Backend (Cloudflare Workers)
│   └── 📁 api/
│       └── 📄 [[route]].js            ← API endpoints (CRUD recettes & plans)
│
└── 📁 node_modules/                   ← Dépendances (créé après npm install)
    ├── itty-router/
    ├── wrangler/
    └── ... (autres packages)
```

---

## 📝 Description des Fichiers

### Configuration & Setup

#### `wrangler.toml`
- Configuration Cloudflare Workers/Pages
- Contient les liens vers KV Namespaces
- **À éditer**: Ajouter `account_id` et IDs KV

#### `package.json`
- Gestion des dépendances NPM
- Scripts: `npm run dev`, `npm run deploy`
- Dépendances: `itty-router`, `wrangler`

#### `.env.example`
- Template pour variables d'environnement
- Copier en `.env` et remplir avant utilisation
- **À ne pas commiter** sur Git

#### `.gitignore`
- Fichiers ignorés lors du push Git
- Inclut: `node_modules/`, `.env`, `.wrangler/`, etc.

---

### Documentation 📚

| Fichier | Pour Qui | Contenu |
|---------|----------|---------|
| **README.md** | Tout le monde | Vue d'ensemble, fonctionnalités, installation |
| **QUICKSTART.md** | Développeurs impatients | Installation en 5 minutes |
| **DEPLOYMENT_GUIDE.md** | Devops/Techies | Configuration Cloudflare pas à pas |
| **USER_GUIDE.md** | Joueurs finaux | Comment utiliser l'application |
| **API_REFERENCE.md** | Développeurs | Endpoints, formats, exemples |

---

### Frontend: `public/`

#### `index.html`
- **Type**: Document HTML5
- **Rôle**: Structure et UI de l'application
- **Sections**:
  - Navigation (navbar avec mode sombre)
  - Onglets: Calculateur, Recettes, Planificateur
  - Formulaires pour créer/modifier recettes et plans
  - Affichage des listes de recettes et plans
  - Footer

#### `styles.css`
- **Type**: Feuille de styles CSS3
- **Rôle**: Mise en page et design
- **Caractéristiques**:
  - Variables CSS (thème clair/sombre)
  - Design responsive (mobile, tablette, desktop)
  - Animations fluides
  - Support du mode sombre automatique

#### `app.js`
- **Type**: JavaScript Vanilla (ES6+)
- **Rôle**: Logique côté client
- **Fonctionnalités**:
  - Gestion des onglets (tabs)
  - Gestion du thème (clair/sombre)
  - Formulaires (recettes, plans)
  - Appels API au backend
  - Affichage des résultats
  - Gestion des alertes/notifications
  - Calculateur de mix

**Pas de framework lourd** (React, Vue, etc.) → Plus léger, plus rapide! ⚡

---

### Backend: `functions/`

#### `functions/api/[[route]].js`
- **Type**: Cloudflare Pages Functions (Worker)
- **Rôle**: API REST backend
- **Architecture**:
  - Router (itty-router) pour les routes
  - 7 endpoints CRUD
  - Stockage Cloudflare KV
  - Gestion CORS
  - Validation basique

**Endpoints:**
```
GET    /api/recipes           - Toutes les recettes
GET    /api/recipes/:id       - Une recette
POST   /api/recipes           - Créer recette
PUT    /api/recipes/:id       - Modifier recette
DELETE /api/recipes/:id       - Supprimer recette

GET    /api/plans             - Tous les plans
POST   /api/plans             - Créer plan
DELETE /api/plans/:id         - Supprimer plan
```

---

## 🔄 Flux de Données

```
┌─── FRONTEND (public/) ────────┐
│                                 │
│  index.html (structure)         │
│  + styles.css (design)          │
│  + app.js (logique)             │
│                                 │
│  ↓ API Calls (fetch)            │
│                                 │
├─ Endpoints /api/recipes         │
├─ Endpoints /api/plans           │
│                                 │
└─────────────────────────────────┘
              ↓
        API FETCH
              ↓
┌─── BACKEND (functions/) ──────┐
│                                 │
│  [[route]].js                   │
│  (itty-router + logic)          │
│                                 │
│  ↓ Stockage                     │
│                                 │
└─────────────────────────────────┘
              ↓
    Cloudflare KV Storage
         (Persistance)
```

---

## 📊 Environnements

### Development
```bash
npm run dev
→ Localhost: http://localhost:8787
→ KV Preview: Données temporaires
```

### Production
```bash
npm run deploy
→ Workers URL: https://schedule-mixer.workers.dev
→ KV Production: Données persistantes
```

---

## 🗂️ Données Stockées (Cloudflare KV)

### Clé: `recipes_list`
```json
[
  {
    "id": "1712180400123",
    "name": "Mix Premium",
    "output": { "name": "Mix", "quantity": 1, "unit": "L" },
    "ingredients": [...]
  }
]
```

### Clé: `plans_list`
```json
[
  {
    "id": "1712180400456",
    "recipeId": "1712180400123",
    "date": "2026-04-10",
    "quantity": 10
  }
]
```

---

## 🔧 Aide-Mémoire Commandes

```bash
# Installation
npm install                          # Installer dépendances
wrangler login                       # Se connecter à Cloudflare
wrangler kv:namespace create RECIPES # Créer KV

# Développement
npm run dev                          # Lancer serveur local
npm run build                        # Builder (pas applicable ici)

# Production
npm run deploy                       # Déployer sur Cloudflare

# KV Management
wrangler kv:key list --binding RECIPES    # Voir toutes les clés
wrangler kv:key delete RECIPES recipes_list  # Supprimer données
wrangler tail                        # Voir les logs en temps réel
```

---

## 📦 Taille & Performance

| Fichier | Taille | Compression |
|---------|--------|-------------|
| index.html | ~8 KB | ~2 KB |
| styles.css | ~25 KB | ~5 KB |
| app.js | ~12 KB | ~3 KB |
| [[route]].js | ~6 KB | ~2 KB |
| **Total** | **~51 KB** | **~12 KB** |

✅ **Très léger!** Charge rapidement même sur 4G 📱

---

## 🔐 Données & Sécurité

- **Stockage**: Cloudflare KV (sécurisé, performant)
- **Authentification**: Aucune (public)
- **CORS**: Actif pour tous les domaines (`*`)
- **Validation**: Basique côté serveur

⚠️ **Note**: Pour une app en production avec authentification, 
ajouter un système de login Cloudflare Access.

---

## 🚀 Prochaines Améliorations Possibles

- [ ] Authentification utilisateur
- [ ] Export/Import recettes (CSV, JSON)
- [ ] Partage de recettes entre amis
- [ ] Historique de production
- [ ] Calcul de coûts
- [ ] Système de notation des recettes
- [ ] API publique pour tiers
- [ ] Mobile app native
- [ ] Synchronisation multi-appareils
- [ ] Webhooks pour notifications

---

## 📋 Checklist pour Déploiement

- [ ] Éditer `wrangler.toml` avec Account ID
- [ ] Éditer `wrangler.toml` avec KV IDs
- [ ] Tester localement (`npm run dev`)
- [ ] Créer recettes de test
- [ ] Tester calculateur
- [ ] Déployer (`npm run deploy`)
- [ ] Tester en production
- [ ] Partager URL avec amis
- [ ] Célébrer! 🎉

---

**Version**: 1.0.0  
**Dernière mise à jour**: 2026-04-04  
**Status**: ✅ Production Ready
