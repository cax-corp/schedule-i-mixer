# Setup Cloudflare Workers Backend

## 🎯 Objectif
Migrer la persistance des recettes de **localStorage** (client-side) vers **Cloudflare Workers + KV** (serveur-side) pour un stockage persistant.

## 📋 Architecture

```
┌──────────────────────┐
│  schedule.cax-corp.com
│ (Frontend Statique)
└──────────┬───────────┘
           │ API calls
           ↓
┌──────────────────────────────────┐
│ Cloudflare Workers (API)          │
│ https://api.schedule.cax-corp.com │
└──────────┬──────────────────────┘
           │
           ↓
   ┌──────────────┐
   │  KV Storage  │
   │  (Recipes)   │
   └──────────────┘
```

## 🚀 Étape 1: Créer un KV Namespace

### Option A: Via Wrangler CLI (Recommandé)

```bash
# Créer une KV binding locale and production
wrangler kv:namespace create "RECIPES"
wrangler kv:namespace create "RECIPES" --preview

# Output:
# ✨ Created kv namespace 'RECIPES'
# Add the following to your wrangler.toml:
# [[kv_namespaces]]
# binding = "RECIPES"
# id = "your_kv_id_here"
# preview_id = "your_kv_preview_id_here"
```

### Option B: Via Dashboard Cloudflare

1. Go to **Workers & Pages → Namespaces**
2. Click **Create Namespace**
3. Name: `RECIPES`
4. Copy the **Namespace ID** and **Preview ID**

## 🔧 Étape 2: Configurer `wrangler.toml`

```toml
name = "schedule-mixer-api"
main = "src/index.js"
type = "service"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "RECIPES"
id = "your_production_id"
preview_id = "your_preview_id"

[env.production]
name = "schedule-mixer-api"
routes = [
  { pattern = "api.schedule.cax-corp.com/api/*", zone_name = "cax-corp.com" }
]
```

## 🔌 Étape 3: Installer les dépendances

```bash
npm install
# ou
yarn install
```

## 🧪 Étape 4: Tester Localement

```bash
wrangler dev

# Le serveur démarre sur http://localhost:8787
# Frontend: http://localhost:8080 (via http.server)
```

### Tester l'API

```bash
# Create recipe
curl -X POST http://localhost:8787/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"name":"Purple","steps":[],"finalProduct":{"name":"OG","basePrice":10,"effects":"Shrinking"}}'

# List recipes
curl http://localhost:8787/api/recipes

# Get single recipe
curl http://localhost:8787/api/recipes/recipe_1234567890

# Update recipe
curl -X PUT http://localhost:8787/api/recipes/recipe_1234567890 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}'

# Delete recipe
curl -X DELETE http://localhost:8787/api/recipes/recipe_1234567890
```

## 🌐 Étape 5: Déployer sur Cloudflare

```bash
# Production deployment
wrangler deploy

# Output:
# ✨ Uploading 'schedule-mixer-api'
# ✨ Successfully published your Worker to https://schedule-mixer-api.your-account.workers.dev
```

## 📡 Étape 6: Configurer le DNS (sous-domaine API)

### Dans Cloudflare Dashboard:

1. **DNS → Records**
2. **Create New Record:**
   - Type: `CNAME`
   - Name: `api`
   - Target: `schedule-mixer-api.workers.dev`
   - Proxy: ✅ (orange cloud)

3. Save → Vous aurez: `api.schedule.cax-corp.com`

## 🔄 Étape 7: Tester l'app complète

### Option A: Production (schedule.cax-corp.com)
1. Ouvrir: https://schedule.cax-corp.com
2. Change `const USE_API = false` → `true` dans `app.js` (ou détection auto du hostname)
3. Créer/modifier/supprimer des recettes
4. Les données sont maintenant sur **Cloudflare KV** ✅

### Option B: Local + Remote API
1. Frontend: `http://localhost:8080`
2. API: `https://api.schedule.cax-corp.com/api`
3. Change `API_BASE` in `app.js:` 
   ```javascript
   const API_BASE = 'https://api.schedule.cax-corp.com/api';
   const USE_API = true;
   ```

## 🛡️ Sécurité

### Rajouter Authentication (Futur)

```javascript
// Exemple avec API Token
const response = await fetch(\`\${API_BASE}/recipes\`, {
  headers: {
    'Authorization': \`Bearer YOUR_TOKEN\`,
    'Content-Type': 'application/json'
  }
});
```

### Activer CORS Restriction 

Dans `src/index.js`, remplacer:
```javascript
'Access-Control-Allow-Origin': '*',
```

Par:
```javascript
'Access-Control-Allow-Origin': 'https://schedule.cax-corp.com',
```

## 📊 Monitoring

### Logs Workers

```bash
wrangler tail
```

### Espace utilisé dans KV

```bash
wrangler kv:key list --namespace-id=YOUR_ID
```

## ⚙️ Variables d'environnement

Dans `wrangler.toml`:

```toml
[env.production.vars]
ALLOWED_ORIGINS = "https://schedule.cax-corp.com"
RATE_LIMIT = "100"
```

Accès dans `src/index.js`:

```javascript
const allowedOrigins = env.ALLOWED_ORIGINS;
```

## 🐛 Troubleshooting

| Problème | Solution |
|----------|----------|
| API returns 401 | Vérifier CORS headers |
| KV quota exceeded | Réduire la taille des recettes ou upgrade plan |
| Timeout 504 | API trop lente, ajouter caching |
| CORS error en frontend | Ajouter domaine dans whitelist |

## 📈 Prochaines étapes optionnelles

- [ ] Ajouter authentication (OAuth2/JWT)
- [ ] Rate limiting per user
- [ ] Caching avec Cloudflare Cache API
- [ ] Backup KV data (export/import)
- [ ] Metrics & Analytics
- [ ] Database (D1) pour plus de fonctionnalités

## 📚 Ressources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [KV Storage Guide](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [Itty Router](https://itty.dev)
