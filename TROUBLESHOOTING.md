# 🔧 Dépannage & Troubleshooting

Guide complet pour résoudre les problèmes courants.

## 🚨 Problèmes Courants

### ❌ "Module itty-router not found"

**Symptôme**: Erreur déploiement, `Cannot find module 'itty-router'`

**Cause**: Les dépendances NPM ne sont pas installées

**Solution**:
```powershell
npm install
```

Attendez que l'installation se termine, puis relancez:
```powershell
npm run dev
```

---

### ❌ "KV Namespace RECIPES not found"

**Symptôme**: Erreur API: `KV Namespace not found`

**Cause**: Le namespace KV n'existe pas ou n'est pas lié correctement

**Solution 1: Vérifier que le namespace existe**
```powershell
wrangler kv:namespace list
```

Si RECIPES n'apparaît pas:
```powershell
wrangler kv:namespace create "RECIPES"
wrangler kv:namespace create "RECIPES" --preview
```

**Solution 2: Vérifier wrangler.toml**
Assurez-vous que `wrangler.toml` contient:
```toml
[[kv_namespaces]]
binding = "RECIPES"
id = "YOUR_ID"
preview_id = "YOUR_PREVIEW_ID"
```

**Solution 3: Réinstancier en Dev**
```powershell
npm run dev
```

Attendez 10-15 secondes avant de tester pour que KV se synchronise.

---

### ❌ "401 Unauthorized"

**Symptôme**: `401 Unauthorized` lors de la connexion Cloudflare

**Cause**: Le token d'authentification a expiré

**Solution**:
```powershell
wrangler logout
wrangler login
```

Suivez les étapes de connexion dans votre navigateur.

---

### ❌ "Cannot GET /api/recipes"

**Symptôme**: API retourne 404, routes ne sont pas trouvées

**Cause**: Les Cloudflare Pages Functions ne sont pas configurées correctement

**Solution 1: Vérifier la structure**
- Assurez-vous que `functions/api/[[route]].js` existe
- Le double crochet `[[route]]` est IMPORTANT (pas `[route]`)
- Le dossier doit s'appeler `api/`

**Solution 2: Redémarrer le serveur dev**
```powershell
# Arrêter: Ctrl+C
# Relancer:
npm run dev
```

**Solution 3: Vérifier wrangler.toml**
Doit contenir:
```toml
type = "javascript"
compatibility_date = "2024-01-01"
```

---

### ❌ "Les données ne se sauvegardent pas"

**Symptôme**: Les recettes disparaissent après fermeture du navigateur

**Cause 1**: KV Storage ne fonctionne pas
**Cause 2**: localStorage du navigateur désactivé

**Solution 1: Vérifier KV**
```powershell
wrangler kv:key list --binding RECIPES
```

**Solution 2: Vérifier localStorage**
Ouvrez la console (F12) et tapez:
```javascript
localStorage.getItem('recipes')
```

**Solution 3: Attendre la synchronisation**
Attendez 30 secondes après création du namespace KV.

**Solution 4: Vérifier les logs**
```powershell
wrangler tail
```

Recherchez les erreurs en rouge.

---

### ❌ "Impossible de se connecter à Cloudflare"

**Symptôme**: `Cannot connect to Cloudflare API`

**Cause**: Problème de connexion Internet ou API Cloudflare en panne

**Solution**:
1. Vérifiez votre connexion Internet
2. Essayez https://status.cloudflare.com/ (statut des services)
3. Attendez quelques minutes et réessayez
4. Si ça persiste, changez de réseau (retirez VPN, etc.)

---

### ❌ "Le calculateur donne des résultats incorrects"

**Symptôme**: Les quantités calculées ne sont pas correctes

**Cause**: Les ingrédients ou le produit final ne sont pas configurés correctement

**Solution**:
1. Vérifiez la recette:
   ```
   - Produit final: 1 litre
   - Ingrédient A: 500g
   - Ingrédient B: 500ml
   ```

2. Testez le calculateur:
   ```
   - Quantité désirée: 2
   - Résultat attendu:
     - Ingrédient A: 1000g (500 × 2)
     - Ingrédient B: 1000ml (500 × 2)
   ```

3. Si incorrect, modifiez la recette et vérifiez les proportions

---

### ❌ "L'interface est en anglais ou buggée"

**Symptôme**: Textes mélangés, boutons qui ne marchent pas

**Cause**: Cache navigateur obsolète

**Solution**:
```
1. Appuyez sur Ctrl+Shift+Suppr (ou Cmd+Shift+Suppr sur Mac)
2. Cochez: Cache, Cookies, Stockage local
3. Cliquez "Effacer les données"
4. Rafraîchissez la page (F5)
```

---

### ❌ "Le mode sombre ne sauvegarde pas"

**Symptôme**: Mode sombre réinitialise à chaque actualisation

**Cause**: localStorage désactivé

**Solution**: Vérifiez que localStorage est activé dans les paramètres du navigateur:
- Chrome/Edge: Settings → Privacy & Security → Cookies & other data
- Firefox: about:preferences → Privacy → Cookies & Site Data

---

### ❌ "Je peux pas créer de recette"

**Symptôme**: Le formulaire ne se soumet pas, pas de message d'erreur

**Cause**: Validation côté client échoue

**Solution**:
1. Vérifiez que TOUS les champs requis sont remplis:
   - ✅ Nom de la recette
   - ✅ Produit final (nom, quantité, unité)
   - ✅ Au moins 1 ingrédient
   
2. Si ingrédients: au moins 3 champs par ingrédient:
   - ✅ Nom de l'ingrédient
   - ✅ Quantité
   - ✅ Unité

3. Ouvrez la console (F12) pour voir les erreurs exactes

---

### ❌ "Erreur CORS"

**Symptôme**: `Access to XMLHttpRequest blocked by CORS policy`

**Cause**: API et frontend ne sont pas sur le même domaine

**Solution**: Vérifiez que vous utilisez la même URL:
- ❌ Frontend: `http://localhost:8787`
- ❌ API: `https://schedule-mixer.workers.dev`
- ✅ Les deux: `http://localhost:8787`

En production, CORS est configuré pour tous les domaines.

---

## 📱 Problèmes sur Téléphone

### ❌ "L'interface est coupée sur téléphone"

**Solution**: Vérifiez:
1. Orientation: Portrait (vertical)
2. Zoom: 100% (pas zoomer)
3. Largeur d'écran: Minimum 320px

### ❌ "Les inputs ne se remplissent pas"

**Cause**: Clavier virtuel couvre le formulaire

**Solution**:
1. Tapez lentement
2. Utilisez mode paysage
3. Zoomez moins

### ❌ "Pas d'accès à la caméra/géolocalisation"

**Note**: Cette app ne demande PAS permission à la caméra ou GPS. Si vous la refusez, c'est OK!

---

## 🌍 Problèmes de Déploiement

### ❌ "Le déploiement échoue"

**Erreur**: `Error: Deployment failed`

**Solution 1: Vérifier les erreurs**
```powershell
npm run deploy -- --verbose
```

**Solution 2: Nettoyer et relancer**
```powershell
Remove-Item -Recurse .wrangler/
npm install
npm run deploy
```

**Solution 3: Vérifier l'authentification**
```powershell
wrangler whoami
```

Si erreur, reconnectez-vous:
```powershell
wrangler login
```

---

### ❌ "Déploiement réussi mais l'app ne marche pas"

**Cause**: Données non synchronisées

**Solution**:
1. Attendez 2-3 minutes
2. Videz le cache navigateur (Ctrl+Shift+Suppr)
3. Rechargez la page (F5)
4. Testez dans une fenêtre privée

---

### ❌ "Pages n'affiche que le HTML brut"

**Cause**: Cloudflare Pages ne trouve pas `public/index.html`

**Solution**:
1. Vérifiez que le fichier existe: `public/index.html`
2. Vérifiez la structure: `functions/api/[[route]].js`
3. Dans wrangler.toml, vérifiez `type = "javascript"`

---

## 🔍 Comment Déboguer

### Étape 1: Ouvrir la Console (F12)

**Chrome/Edge**:
```
Ctrl+Shift+J ou Clic droit → Inspecter → Console
```

**Firefox**:
```
Ctrl+Shift+K ou Clic droit → Inspecter → Console
```

### Étape 2: Chercher les Erreurs

Erreurs en **rouge**: c'est le problème!  
Avertissements en **jaune**: peut être ignoré

### Étape 3: Copier l'Erreur

Cliquez sur l'erreur rouge, tous les détails apparaissent.  
Copiez le message complet.

### Étape 4: Simuler Problème

Dans la console, tapez:
```javascript
// Récupérer les recettes manuellement
fetch('/api/recipes')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

### Étape 5: Vérifier les Logs Serveur

```powershell
wrangler tail
```

Puis reproduisez le problème. Les logs s'affichent en temps réel!

---

## 🆘 Aide Supplémentaire

### Ressources

1. **Cloudflare Docs**: https://developers.cloudflare.com/workers/
2. **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/install-and-update/
3. **itty-router**: https://itty.dev/
4. **Status Cloudflare**: https://status.cloudflare.com/

### Vérifier la Santé

```powershell
# Version Node
node --version

# Version NPM
npm --version

# Authentification Cloudflare
wrangler whoami

# Namespaces KV
wrangler kv:namespace list

# Logs serveur
wrangler tail --format pretty
```

### Réinitialiser Complètement (Nuclear Option)

```powershell
# ⚠️ Attention: cela supprime tout le cache local

# 1. Supprimer les données locales
Remove-Item -Recurse .wrangler/
Remove-Item -Recurse node_modules/

# 2. Réinstaller
npm install

# 3. Relancer
npm run dev
```

---

## ✅ Checklist Santé de l'App

Avant de signaler un bug:

- [ ] Actualisez la page (F5)
- [ ] Vérifiez la connexion Internet
- [ ] Essayez une fenêtre privée (Ctrl+Shift+P)
- [ ] Videz le cache (Ctrl+Shift+Suppr)
- [ ] Réconnectez-vous (si applicable)
- [ ] Vérifiez wrangler.toml
- [ ] Relancez `npm run dev`
- [ ] Attendez 30 secondes

Si ça ne marche toujours pas, consultez la section correspondante ci-dessous.

---

## 📞 Rapport de Bug

Si vous trouvez un vrai bug, contactez le développeur avec:

1. **Description**: Qu'est-ce qui ne marche pas?
2. **Reproduction**: Comment reproduire?
3. **Logs**: Utilisez `wrangler tail` pour copier les logs
4. **Environnement**: Browser? OS? Version Node?
5. **Screenshot**: Prenez une capture d'écran

**Template**:
```
# Bug Report

## Description
Décrivez le problème en détail.

## Reproduction
1. Étape 1
2. Étape 2
3. Étape 3

## Logs
[Copier les logs de wrangler tail]

## Environnement
- Browser: Chrome 120
- OS: Windows 11
- Node: v18.0.0

## Screenshot
[Joindre une image]
```

---

**Besoin d'aide? 🚀 Consultez ce guide ou les docs Cloudflare!**

*Version 1.0 - 2026-04-04*
