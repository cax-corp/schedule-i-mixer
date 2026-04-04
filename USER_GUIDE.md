# 📱 Guide Utilisateur - Schedule I Mixer

Bienvenue dans votre calculateur de recettes de mix pour le jeu **Schedule I**!

## 🎮 À Quoi Sert Cette Application?

Cette application vous permet de:

- ✅ **Créer vos recettes** de mix avec ingrédients et proportions
- ✅ **Calculer automatiquement** les quantités d'ingrédients nécessaires
- ✅ **Planifier votre production** avec dates et deadlines
- ✅ **Sauvegarder tout** dans le cloud (Cloudflare)
- ✅ **Accéder partout** depuis votre téléphone ou ordinateur

## 🚀 Au Premier Démarrage

### 1. Accédez au site

Ouvrez votre navigateur et allez à l'URL de l'application:

- **Développement**: `http://localhost:8787`
- **Production**: `https://schedule-mixer.votre-url.workers.dev`

### 2. Explorez l'interface

Vous verrez:
- 🌙 Bouton "Dark Mode" (mode sombre) en haut à droite
- 3 onglets principaux: **Calculateur**, **Recettes**, **Planificateur**

### 3. Personnalisez le thème
Cliquez sur 🌙 pour activer le mode sombre - parfait pour les gamers de nuit! 🎮

---

## 📋 Onglet "Recettes"

C'est ici que vous créez et gérez vos formules.

### Créer une Recette

#### Étape 1: Informations de base

- **Nom de la recette**: ex "Mix Premium", "Potion Spéciale"
- **Description**: ex "Mélange haut de gamme", "Pour événement spécial"

#### Étape 2: Produit final

- **Nom du produit**: ex "Mix Premium"
- **Quantité produite**: ex 1
- **Unité**: ex "litre", "kg", "portion", "unité"

*Exemple: 1 litre de Mix Premium*

#### Étape 3: Ingrédients

Cliquez sur "+ Ajouter un ingrédient" et remplissez:
- **Ingrédient**: ex "Sucre", "Eau", "Additif A"
- **Quantité**: ex 500
- **Unité**: ex "g", "ml", "kg"

Ajoutez autant d'ingrédients que nécessaire (il n'y a pas de limite!)

*Exemple:*

```text
- 500 g de Sucre
- 400 ml d'Eau
- 50 ml d'Additif A
= 1 litre de Mix Premium
```

#### Étape 4: Notes optionnelles

Ajoutez des conseils:
- Temps de mélange: "15 minutes"
- Température: "à température ambiante"
- Stockage: "au réfrigérateur"

#### Étape 5: Sauvegarder

Cliquez "Sauvegarder la Recette" ✅

### Visualiser une Recette

Vos recettes apparaissent en bas dans des cartes. Cliquez sur:

- **👁️ Détails** - Voir tous les ingrédients
- **✏️ Éditer** - Modifier la recette
- **🗑️ Supprimer** - Effacer la recette

---

## 📊 Onglet "Calculateur"

Utilisez cet onglet pour **calculer rapidement** les quantités.

### Comment Ça Marche?

**Exemple**: Vous avez une recette pour 1 litre, mais vous en voulez 5 litres.

**Étape 1**: Sélectionnez la recette

- Dropdown: Choisissez "Mix Premium"

**Étape 2**: Entrez la quantité désirée
- Quantité: `5`

**Étape 3**: Cliquez "Calculer"

**Résultat**: Le système affiche automatiquement:

```text
Recette: Mix Premium
Production: 5 litres

Ingrédients nécessaires:
- 2500 g de Sucre     (au lieu de 500)
- 2000 ml d'Eau       (au lieu de 400)
- 250 ml d'Additif A  (au lieu de 50)
```

**🔥 Calcule automatiquement!** Pas besoin de faire des maths! 🎉

---

## 📅 Onglet "Planificateur"

Planifiez vos productions futures.

### Créer un Plan de Production

**Étape 1: Sélectionner la recette**
- Dropdown: Choisissez la recette à produire

**Étape 2: Choisir la date**
- Cliquez sur le calendrier et sélectionnez la date
- Vous pouvez planifier plusieurs jours à l'avance!

**Étape 3: Quantité à produire**
- Entrez combien vous voulez fabriquer
- Ex: 10 litres, 50 kg, 100 portions

**Étape 4: Notes / Priorité** (optionnel)
- "Urgent - Client VIP"
- "Livraison samedi matin"
- "Haute priorité"
- "Stock de secours"

**Étape 5: Créer le plan**
Cliquez "Planifier la Production" ✅

### Gérer vos Plans

Vos plans apparaissent en bas, triés par date. Vous pouvez:
- **Voir tous les détails** (date, quantité, notes)
- **🗑️ Supprimer** un plan

---

## 💡 Conseils et Astuces

### Pour les Gamers Impatients
- 📱 **Sur téléphone**: L'interface est optimisée! Utilisez-la en jeu. Gardez votre téléphone à côté. ✅
- 🌙 **Mode sombre**: Activez-le pour moins d'éblouissement
- 🔄 **Auto-save**: Tout est sauvegardé automatiquement dans le cloud

### Organisation des Recettes
- Utilisez des noms clairs ("Mix Standard", "Mix Premium", "Mix Spécial")
- Ajoutez des descriptions pour vous souvenir rapidement
- Notez les variations ("Mix Premium v1", "Mix Premium v2")

### Planification Efficace
- **Planifiez par semaine** - Mieux organisé
- **Notes claires** - "Livraison client ABC", "Stock personnel"
- **Dates réalistes** - Vérifiez votre disponibilité en jeu

### Calculs Rapides
- Testez d'abord avec **de petites quantités** pour vérifier
- Utilisez le calculateur **avant d'acheter les ingrédients**
- Vérifiez les **proportions** (le système calcule en ratio)

---

## 🔄 Flux Typique d'Utilisation

### Jour 1: Configuration
1. Ouvrez l'onglet "Recettes"
2. Créez votre première recette
3. Testez le calculateur avec différentes quantités
4. Validez que le calcul est correct

### Jour 2-7: Production
1. Ouvrez le calculateur
2. Sélectionnez votre recette
3. Entrez la quantité que vous voulez fabriquer
4. **Notez les ingrédients** affichés
5. Produisez avec confiance!

### Planification
1. En fin de semaine, ouvrez "Planificateur"
2. Créez vos plans pour la semaine suivante
3. Les rendez-vous ne sont plus oubliés!

---

## ❓ FAQ (Questions Fréquentes)

### Q: Où sont stockées mes recettes?
**R**: Dans le cloud Cloudflare, loin et en sécurité! Elles sont accessibles partout.

### Q: Mes données peuvent disparaître?
**R**: Non! Vos recettes sont sauvegardées. Aucune donnée n'est jamais supprimée accidentellement (sauf si vous cliquez 🗑️).

### Q: Comment utiliser sur téléphone?
**R**: C'est simple! Ouvrez simplement l'URL dans le navigateur mobile. L'interface s'adapte automatiquement.

### Q: Puis-je partager une recette avec des amis?
**R**: Actuellement non, mais vous pouvez manuellement noter les ingrédients (le calculateur l'affiche) et les envoyer par message.

### Q: Le calculateur a fait une erreur. Pourquoi?
**R**: Vérifiez que votre recette de base est correcte. Le calculateur utilise les proportions de votre recette.

### Q: Puis-je modifier une recette déjà créée?
**R**: Oui! Cliquez ✏️ Éditer sur la recette.

### Q: Comment supprimer une recette?
**R**: Cliquez 🗑️ Supprimer. Confirmez. C'est fait!

---

## 🎮 Intégration avec le Jeu

### Pendant que vous jouez
1. **Mobile à côté**: Consultez le calculateur sans quitter le jeu
2. **Alt+Tab rapide**: Sur PC, cherchez rapidement une quantité
3. **Pas de connexion?**: Les données du navigateur sont mises en cache localement

### Après votre session
1. Notez les recettes qui ont bien marché
2. Planifiez la session suivante
3. Itérez pour trouver vos meilleures formules!

---

## 🆘 Besoin d'Aide?

Si quelque chose ne fonctionne pas:

### Problème: Le site ne charge pas
- Vérifiez votre connexion Internet
- Rafraîchir la page (F5 ou Ctrl+R)
- Essayez un autre navigateur

### Problème: Les données ne se sauvegardent pas
- Vérifiez que JavaScript est activé
- Vérifiez que le stockage local (localStorage) est autorisé
- Attendez quelques secondes avant de vérifier

### Problème: Les calculs semblent incorrects
- Vérifiez les unités (kg ≠ g)
- Vérifiez les proportions de la recette
- Testez avec tout petits nombres

---

## 📞 Feedback & Suggestions

Vous avez une idée pour améliorer l'appli?
- Partage de recettes entre amis
- Export CSV pour tableur
- Historique de production
- Calcul de coûts
- Conversions d'unités automatiques

Dites-le au développeur! 🚀

---

## 🎯 Raccourcis Clavier (Bonus)

- `Ctrl+R`: Réinitialiser le formulaire (selon le contexte)
- `Tab`: Naviguer entre les champs
- `Enter`: Soumettre un formulaire

---

**Good luck gamers! 🎮⚗️ Profitez de vos mixes!**

*Version 1.0 - 2026*
