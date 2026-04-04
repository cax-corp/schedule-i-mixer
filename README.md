# Schedule I - Mix Recipe Calculator

Un site web full-stack pour calculer, planifier et sauvegarder les recettes de mix du jeu **Schedule I**.

## 🚀 Déploiement Rapide - Deux Options

### 🌟 Option 1: GitHub → Cloudflare Pages (Recommandé)

```bash
git push → GitHub → Cloudflare → Deploy automatique! 🚀
```

✅ Plus facile | ✅ Automatique | ✅ Pas d'IDs à gérer

[Guide: QUICKSTART.md (Option 1)](QUICKSTART.md#option-1--github--cloudflare-pages-recommandé)

### 🚀 Option 2: Wrangler Direct

```bash
npm run deploy → Cloudflare Workers
```

✅ Pas de GitHub | ✅ Déploiement direct | ✅ Rapide pour tester

[Guide: QUICKSTART.md (Option 2)](QUICKSTART.md#option-2--wrangler-direct)

## 🎮 Fonctionnalités

- ✅ **Calculateur de Mix**: Calculez automatiquement les ingrédients nécessaires en fonction de la quantité désirée
- ✅ **Gestion des Recettes**: Créez, modifiez et supprimez vos recettes de mix
- ✅ **Planificateur de Production**: Planifiez votre production avec dates et notes
- ✅ **Sauvegarde Persistante**: Tous les données sont sauvegardées dans Cloudflare KV
- ✅ **Mode Sombre**: Interface avec thème clair/sombre
- ✅ **Design Responsive**: Optimisé pour téléphone, tablette et desktop
- ✅ **Zero Database**: Utilise Cloudflare KV pour le stockage

## 🛠️ Stack Technique

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Cloudflare Workers/Pages Functions
- **Stockage**: Cloudflare KV (clé-valeur)
- **Hébergement**: Cloudflare Pages (gratuit)

## 📋 Structure du Projet

```text
Schedule Scheduler/
├── public/
│   ├── index.html          # Page HTML principale
│   ├── styles.css          # Styles (responsive & dark mode)
│   └── app.js              # Logique client (JS Vanilla)
├── functions/
│   └── api/
│       └── [[route]].js    # Endpoints API (Cloudflare Functions)
├── wrangler.toml           # Configuration Cloudflare
├── package.json            # Dépendances NPM
└── README.md               # Ce fichier
```

## 🚀 Installation & Déploiement

### Prérequis

- Node.js 16+ installé
- Compte Cloudflare (gratuit)
- (Optionnel) GitHub account pour l'option 1

### Étapes Rapides

#### Option 1 (Recommandée): GitHub

1. Créez un repository GitHub
2. Poussez le code (`git push`)
3. Connectez-le à Cloudflare Pages
4. C'est tout! 🎉

[Instructions détaillées](QUICKSTART.md#option-1--github--cloudflare-pages-recommandé)

#### Option 2: Wrangler Direct

1. `npm install -g wrangler`
2. `wrangler login`
3. `npm install && npm run deploy`
4. C'est tout! 🎉

[Instructions détaillées](QUICKSTART.md#option-2--wrangler-direct)

### Documentation Complète

- 📖 **[QUICKSTART.md](QUICKSTART.md)** - Installation express (5 min)
- 🌍 **[CLOUDFLARE_CONFIG.md](CLOUDFLARE_CONFIG.md)** - Configuration détaillée
- 🔐 **[GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)** - GitHub Secrets (CI/CD)
- 🔒 **[SECURITY.md](SECURITY.md)** - Bonnes pratiques de sécurité
- 📚 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Guide complet
- 🗺️ **[INDEX.md](INDEX.md)** - Navigation dans la documentation

## 📱 Utilisation

### Onglet "Calculateur"

1. Sélectionnez une recette
2. Entrez la quantité désirée
3. Cliquez "Calculer"
4. Le système calcule automatiquement tous les ingrédients nécessaires

### Onglet "Recettes"

1. Remplissez le formulaire avec:
   - Nom et description de la recette
   - Produit final (nom, quantité, unité)
   - Ingrédients (nom, quantité, unité)
   - Notes optionnelles
2. Cliquez "Sauvegarder la Recette"
3. Visualisez toutes vos recettes sauvegardées
4. Modifiez ou supprimez une recette existante

### Onglet "Planificateur"

1. Sélectionnez une recette
2. Choisissez une date de production
3. Entrez la quantité à produire
4. Ajoutez des notes (priorité, client, etc.)
5. Cliquez "Planifier la Production"
6. Consultez tous vos plans de production

## 🎨 Personnalisation

### Modifier les Couleurs

Édez `public/styles.css` et changez les variables CSS dans `:root`:

```css
:root {
    --bg: #ffffff;           /* Fond clair */
    --text: #1a1a1a;         /* Texte */
    --accent: #1a1a1a;       /* Couleur d'accentuation */
    /* ... */
}
```

### Mode Sombre

Les couleurs du mode sombre sont automatiquement appliquées via `body.dark-mode`.

## 💾 Stockage des Données

Les données sont stockées dans **Cloudflare KV** sous deux clés:

- `recipes_list`: JSON array de toutes les recettes
- `plans_list`: JSON array de tous les plans de production

Les données sont persistantes et restent même après redéploiement.

## 🔧 Dépannage

### "GET /api/recipes 404"

- Vérifiez que Cloudflare Pages Functions est activé
- Assurez-vous que `public/` contient les fichiers statiques

### "KV Namespace not found"

- Vérifiez que `RECIPES` est défini dans `wrangler.toml`
- Vérifiez que le namespace existe dans Cloudflare dashboard

### Données non persistantes

- Attendez 30 secondes après la création d'un namespace KV
- Vérifiez les logs: `wrangler tail`

## 📝 API Endpoints

### Recettes

- `GET /api/recipes` - Récupérer toutes les recettes
- `GET /api/recipes/:id` - Récupérer une recette
- `POST /api/recipes` - Créer une recette
- `PUT /api/recipes/:id` - Modifier une recette
- `DELETE /api/recipes/:id` - Supprimer une recette

### Plans

- `GET /api/plans` - Récupérer tous les plans
- `POST /api/plans` - Créer un plan
- `DELETE /api/plans/:id` - Supprimer un plan

## 📄 Format des Données

### Recette

```json
{
    "id": "1234567890",
    "name": "Mix Premium",
    "description": "Mélange haut de gamme",
    "output": {
        "name": "Mix Premium",
        "quantity": 1,
        "unit": "litre"
    },
    "ingredients": [
        {
            "name": "Sucre",
            "quantity": 0.5,
            "unit": "kg"
        },
        {
            "name": "Eau",
            "quantity": 0.5,
            "unit": "litre"
        }
    ],
    "notes": "Bien mélanger à température ambiante",
    "createdAt": "2026-04-04T12:00:00.000Z"
}
```

### Plan de Production

```json
{
    "id": "1234567890",
    "recipeId": "9876543210",
    "recipeName": "Mix Premium",
    "date": "2026-04-10",
    "quantity": 10,
    "unit": "litre",
    "notes": "Urgent - Client ABC",
    "createdAt": "2026-04-04T12:00:00.000Z"
}
```

## 🤝 Contribution

N'hésitez pas à améliorer ce projet! Voici quelques idées:

- [ ] Importation/Exportation CSV
- [ ] Partage de recettes
- [ ] Historique de production
- [ ] Calcul de coûts
- [ ] Système d'unités de conversion automatique
- [ ] Notifications de rappel

## 📄 License

Apache License 2.0 - Libre d'utilisation

Voir le fichier [LICENSE](LICENSE) pour les détails complets.

### Ce Que Vous Pouvez Faire ✅
- ✅ Utiliser le code librement
- ✅ Modifier le code
- ✅ Distribuer vos modifications
- ✅ Utiliser à titre commercial

### Ce Que Vous Devez Faire ⚠️
- ⚠️ Inclure une copie de la licence
- ⚠️ Documenter les changements apportés
- ⚠️ Inclure la notice de copyright originale

## 💡 Support

Pour toute question ou problème:

1. Vérifiez les logs Cloudflare: `wrangler tail`
2. Consultez la section "Dépannage" ci-dessus
3. Vérifiez que votre navigateur accepte le localStorage (données persistantes)

---

## Happy Gaming! 🎮⚗️
