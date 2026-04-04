# 🔐 GitHub Secrets Setup

Guide rapide pour configurer GitHub Secrets pour le déploiement automatique sur Cloudflare.

## 📋 Prérequis

- Repository GitHub (créé et code pushé)
- Compte Cloudflare
- Credentials Cloudflare

## 🔑 Récupérer vos Credentials

### 1. Cloudflare Account ID

```bash
wrangler whoami
```

Copiez le `Account ID`.

### 2. Cloudflare API Token

1. Allez sur https://dash.cloudflare.com/profile/api-tokens
2. Cliquez **Create Token**
3. Utilisez le template **"Edit Cloudflare Workers"**
4. Autorisez:
   - Account Resources: All accounts
   - Zone Resources: None
   - Permissions:
     - Workers: Edit
     - KV: Edit
5. Cliquez **Continue to summary** → **Create Token**
6. Copiez le token (vous ne pourrez le voir qu'une fois!)

## 🔐 Ajouter les Secrets à GitHub

### Étape 1: Aller aux Settings du Repository

1. Allez sur votre repo GitHub
2. Cliquez **Settings** (onglet à droite)
3. Sur la gauche, cliquez **Secrets and variables** → **Actions**

### Étape 2: Créer les Secrets

Cliquez **New repository secret** et ajoutez:

#### Secret 1: CLOUDFLARE_API_TOKEN
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: Collez le token reçu à l'étape 1.2
- Cliquez **Add secret**

#### Secret 2: CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: Collez l'Account ID reçu à l'étape 1.1
- Cliquez **Add secret**

### Résultat

Vous devriez voir:
```
CLOUDFLARE_API_TOKEN ••••••••••
CLOUDFLARE_ACCOUNT_ID ••••••••••
```

## ✅ Vérifier que ça marche

1. Faites une modification dans le code
2. Push sur GitHub:
   ```bash
   git add .
   git commit -m "test deployment"
   git push origin main
   ```

3. Allez sur votre repo → **Actions**
4. Vous devriez voir un workflow "Deploy to Cloudflare Workers" en cours
5. Attendez qu'il se termine (vert = succès, rouge = erreur)

## 🎉 C'est Fait!

Chaque push sur `main` déclenche un déploiement automatique sur Cloudflare! 🚀

## ⚠️ Troubleshooting

### "Permission denied" ou "401 Unauthorized"

Vérifiez que:
- Le CLOUDFLARE_API_TOKEN est correct (pas de copie-colle partielle)
- Le CLOUDFLARE_ACCOUNT_ID est correct
- Le token n'a pas expiré

### Workflow échoue avec "No account_id found"

Le workflow utilise les secrets GitHub comme variables d'environnement.
Vérifiez que `wrangler.toml` n'a pas d'`account_id` en dur:

```toml
# ❌ MAUVAIS - Ne pas faire ça
account_id = "hardcoded-id"

# ✅ BON - Laisser vide, le workflow remplit
```

### Secrets ne s'appliquent pas

GitHub Secrets ne s'appliquent qu'aux **prochains** workflows.
Créez un secret, puis faites un nouveau push pour déployer.

## 📖 Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)

---

**Bon déploiement! 🚀**
