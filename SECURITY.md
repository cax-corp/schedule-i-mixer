# 🔐 Sécurité & Bonnes Pratiques

Guide pour déployer Schedule I de manière sécurisée sans exposer vos credentials.

## ✅ Ce Qui a Été Fait

### 1. Aucun Identifiant en Dur dans le Code
- ✅ `wrangler.toml` ne contient plus les IDs
- ✅ `.env.example` contient seulement des templates
- ✅ `.gitignore` exclut les fichiers sensibles

### 2. Deux Méthodes Sécurisées de Déploiement

#### 🌟 Méthode 1: GitHub → Cloudflare Pages (Recommandée)
```
Code    →  GitHub (public)
         →  Cloudflare Pages (détecte git)
         →  Déploiement automatique
```
**Sécurité**: Cloudflare gère les secrets automatiquement

#### 🚀 Méthode 2: Wrangler Direct + GitHub Secrets
```
Code    →  GitHub (public)
Secrets → GitHub Secrets (privé)
         →  GitHub Actions (CI/CD)
         →  Cloudflare Workers (déploiement)
```
**Sécurité**: Secrets jamais exposés en public

### 3. GitHub Actions Workflow
- ✅ Fichier `.github/workflows/deploy.yml` inclus
- ✅ Utilise les GitHub Secrets
- ✅ Pas de credentials en dur

---

## 🔑 Gestion des Identifiants

### ⚠️ À NE PAS FAIRE

```bash
# ❌ Mauvais: Commit des IDs
git add wrangler.toml  # Contient les IDs
git commit -m "add cloudflare config"
git push

# ❌ Mauvais: Commit du .env
git add .env
git commit "add secrets"
git push

# ❌ Mauvais: IDs visibles dans GitHub
git show  # Affiche les IDs pour toujours dans l'historique
```

### ✅ À FAIRE

**Pour Méthode 1 (GitHub Pages):**
```bash
# Connectez juste sur Cloudflare Dashboard
# Cloudflare détecte votre repo GitHub automatiquement
# Aucun secret à gérer!
```

**Pour Méthode 2 (Wrangler + GitHub):**
```bash
# 1. Récupérez vos IDs localement
wrangler whoami
wrangler kv:namespace list

# 2. Ajoutez les secrets à GitHub (pas en local)
# GitHub Settings → Secrets → Actions
# Ajoutez: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID

# 3. Le workflow utilise les secrets automatiquement
```

---

## 📝 Fichiers Sensibles

### `.env` (À Exclure)
```
CLOUDFLARE_API_TOKEN=abc123...  ❌ Never commit!
CLOUDFLARE_ACCOUNT_ID=def456... ❌ Never commit!
```

**Pourquoi?** Si quelqu'un trouve ce fichier, il peut accéder à vos ressources Cloudflare!

### `wrangler.toml` (Publique)
```toml
# ✅ Sans IDs: Peut être public
name = "schedule-mixer"
type = "javascript"
compatibility_date = "2024-01-01"

# Les IDs sont ajoutés dynamiquement à la création du namespace
```

### Historique Git (Permanent)
```
# Attention! Une fois committé, c'est permanent
# git rewrite-history est compliqué
# Mieux vaut prévenir que guérir!
```

---

## 🔐 Procédure Sécurisée pour Déployer

### Step 1: Installer Localement (sans push)

```bash
# Ne commit rien encore
wrangler login
wrangler kv:namespace create "RECIPES"
wrangler kv:namespace create "RECIPES" --preview

# Vous avez les IDs localement dans .wrangler/
# Ils ne seront JAMAIS commités
```

### Step 2: Pousser le Code (sans secrets)

```bash
# Ne commit que le code public
git add .
git commit -m "Initial commit"
git push origin main

# Vérifiez que wrangler.toml n'a PAS les IDs
git show wrangler.toml
# Ne doit pas contenir: account_id, id, preview_id (hardcoded)
```

### Step 3: Configurer GitHub (pour le CI/CD)

```
GitHub Settings → Secrets → Actions
+ CLOUDFLARE_API_TOKEN
+ CLOUDFLARE_ACCOUNT_ID
```

### Step 4: Déployer

- **Option A** (GitHub Pages): Connectez via Cloudflare Dashboard (aucun secret)
- **Option B** (GitHub Actions): Push déclenche le workflow automatiquement

---

## 🚨 Si Vous Avez Exposé un Secret

**Acte 1 (Immédiat)**:
```bash
# 1. Changez le token Cloudflare immédiatement
#    https://dash.cloudflare.com/profile/api-tokens
#    Delete le vieux token

# 2. Retirez le commit de l'historique
git reset --soft HEAD~1
git restore wrangler.toml
git commit -m "Remove secrets"
git push --force-with-lease

# ⚠️ --force-with-lease est dangereux!
# Utilisez seulement si urgent et pas d'autres contributeurs
```

**Acte 2 (Prévention)**:
```bash
# Utilisez un git hook pour prévenir les IDs
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit 'npm run lint'
```

---

## ✅ Checklist de Sécurité

Avant de déployer:
- [ ] `.env` n'existe pas (ou contient seulement des templates)
- [ ] `wrangler.toml` n'a pas d'`account_id` en dur
- [ ] Aucun secret dans le code source
- [ ] `.gitignore` exclut `node_modules/`, `.env`, `.wrangler/`
- [ ] GitHub Secrets sont configurés (pour GitHub Actions)
- [ ] Pas de tokens visibles dans `git log`

---

## 📚 Resources

### Cloudflare
- [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
- [Account Settings](https://dash.cloudflare.com/settings/account)

### GitHub
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Repository Settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features)

### Bonnes Pratiques
- [OWASP: Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)
- [git-secrets](https://github.com/awslabs/git-secrets)

---

## 🎯 Résumé

| Aspect | Approche | Sécurité |
|--------|----------|----------|
| **Code** | Public (GitHub) | ✅ Pas de secrets |
| **Credentials** | Privé (GitHub Secrets) | ✅ Chiffré |
| **Déploiement** | CI/CD automatique | ✅ Logs privés |
| **Historique** | Jamais de secrets | ✅ Sûr pour toujours |

---

**Your Schedule I Mixer is Secure! 🔐🚀**
