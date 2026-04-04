# 🎯 Exemples de Recettes - Schedule I

Voici quelques exemples de recettes que vous pouvez utiliser pour démarrer rapidement.

## 📝 Comment Importer les Recettes Exemples

### Option 1: Manuel (5 minutes)
1. Ouvrez l'onglet "Recettes"
2. Copie-collez les informations du formulaire
3. Cliquez "Sauvegarder la Recette"

### Option 2: Via API (Plus rapide)
```bash
# Créer la recette "Mix Standard"
curl -X POST http://localhost:8787/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mix Standard",
    "description": "Mélange classique pour débutants",
    "output": {
      "name": "Mix Standard",
      "quantity": 1,
      "unit": "litre"
    },
    "ingredients": [
      {"name": "Sucre", "quantity": 600, "unit": "g"},
      {"name": "Eau", "quantity": 300, "unit": "ml"},
      {"name": "Additif Base", "quantity": 100, "unit": "ml"}
    ],
    "notes": "Temps de mélange: 10 minutes. Température ambiante."
  }'
```

---

## 🧪 Recettes Exemples Prêtes à l'Emploi

### 1️⃣ Mix Standard (Débutant)

**Nom**: Mix Standard  
**Description**: Mélange classique pour débutants  
**Produit**: 1 litre de Mix Standard

**Ingrédients**:
- 600 g de Sucre
- 300 ml d'Eau
- 100 ml d'Additif Base

**Notes**: Temps de mélange: 10 minutes. Température ambiante.

**Cas d'usage**: Parfait pour débuter, proportions simples.

---

### 2️⃣ Mix Premium (Intermédiaire)

**Nom**: Mix Premium  
**Description**: Mélange haut de gamme avec meilleure qualité  
**Produit**: 1 litre de Mix Premium

**Ingrédients**:
- 500 g de Sucre Raffiné
- 350 ml d'Eau Purifiée
- 80 ml d'Additif Premium
- 70 ml d'Concentré Saveur

**Notes**: Mélanger à 20-25°C. Laisser reposer 5 minutes avant utilisation.

**Cas d'usage**: Meilleure qualité, prix intermédiaire.

---

### 3️⃣ Mix Spécial (Avancé)

**Nom**: Mix Spécial  
**Description**: Recette complexe pour experts  
**Produit**: 1 litre de Mix Spécial

**Ingrédients**:
- 450 g de Sucre Bio
- 250 ml d'Eau Distillée
- 100 ml d'Additif Spécial
- 120 ml de Concentré Delux
- 50 ml d'Stabilisant
- 30 ml de Correcteur pH

**Notes**: Équipement: thermomètre, balance de précision. Mélange lent pendant 15 min. Filtrer après.

**Cas d'usage**: Qualité maximale, pour clients exigeants.

---

### 4️⃣ Mix Économique (Budget)

**Nom**: Mix Économique  
**Description**: Rapport qualité-prix optimal  
**Produit**: 1 litre de Mix Économique

**Ingrédients**:
- 700 g de Sucre Standard
- 250 ml d'Eau
- 50 ml d'Additif Base

**Notes**: Simple et efficace. Temps de mélange: 5 minutes seulement.

**Cas d'usage**: Pour les gros volumes, maximiser les profits.

---

### 5️⃣ Mix Rapid (Express)

**Nom**: Mix Rapid  
**Description**: Mélange ultra-rapide (production d'urgence)  
**Produit**: 500 ml de Mix Rapid

**Ingrédients**:
- 250 g de Sucre
- 150 ml d'Eau
- 100 ml d'Additif Rapide

**Notes**: Temps de mélange: 2-3 minutes. Parfait pour les urgences.

**Cas d'usage**: Petites quantités urgentes, événements dernière minute.

---

## 📊 Tableau Récapitulatif

| Nom | Difficulté | Ingrédients | Temps | Coût | Usage |
|-----|-----------|------------|-------|------|-------|
| Mix Standard | ⭐ | 3 | 10 min | $ | Débutants |
| Mix Premium | ⭐⭐ | 4 | 15 min | $$$ | Qualité |
| Mix Spécial | ⭐⭐⭐ | 6 | 20 min | $$$$ | Expert |
| Mix Économique | ⭐ | 3 | 5 min | $$ | Volume |
| Mix Rapid | ⭐ | 3 | 3 min | $ | Urgence |

---

## 💡 Conseils pour Créer vos Propres Recettes

### Variables à Ajuster
- **Quantité de sucre**: Plus = plus sucré, plus cher
- **Additifs**: Varient la saveur, la texture, la couleur
- **Eau**: Dilue ou concentre le mélange
- **Stabilisants**: Pour longue durée de vie

### Proportions Générales
```
1 Litre = 
  - 50-70% Sucre (500-700g)
  - 20-40% Eau (200-400ml)
  - 10-20% Additifs/Concentrés (100-200ml)
```

### Tester une Nouvelle Recette

**Étape 1**: Créer en petite quantité (100ml)
- Sucre: 50-70g
- Eau: 20-40ml
- Additifs: 10-20ml

**Étape 2**: Tester la qualité
- Goût
- Texture
- Couleur
- Odeur

**Étape 3**: Ajuster si nécessaire
- Trop sucré? Moins de sucre
- Pas assez concentré? Plus d'additif
- Mauvaise couleur? Changer l'additif

**Étape 4**: Valider et scaler
- Utiliser le calculateur pour x10, x100, etc.

---

## 🎮 Stratégie de Mix pour Schedule I

### Semaine 1: Apprendre
- Créez Mix Standard
- Testez le calculateur
- Produisez 5-10 L

### Semaine 2-3: Expérimenter
- Créez Mix Premium
- Testez Mix Économique
- Comparez les résultats

### Semaine 4+: Optimiser
- Créez Mix Spécial
- Planifiez la production
- Maximisez les profits

---

## 📐 Calcul d'Exemple

**Situation**: Vous avez Mix Standard (1L) mais besoin de 5L.

**Recette de base**:
- 600 g Sucre
- 300 ml Eau
- 100 ml Additif

**Utiliser le calculateur**:
1. Sélectionnez "Mix Standard"
2. Entrez quantité: 5
3. Cliquez "Calculer"

**Résultat**:
- 3000 g (3 kg) Sucre
- 1500 ml (1.5 L) Eau
- 500 ml Additif

**Facile!** Sans calcule mentale, sans erreur! ✅

---

## 🚀 Exporter vos Propres Recettes

Pour partager une recette avec des amis, copiez en JSON:

```json
{
  "name": "Ma Recette Secrète",
  "description": "Recette personnalisée",
  "output": {
    "name": "Mix Maison",
    "quantity": 1,
    "unit": "litre"
  },
  "ingredients": [
    {"name": "Ingrédient 1", "quantity": 250, "unit": "g"},
    {"name": "Ingrédient 2", "quantity": 500, "unit": "ml"},
    {"name": "Ingrédient 3", "quantity": 250, "unit": "ml"}
  ],
  "notes": "Vos notes ici"
}
```

---

## ❓ Questions Fréquentes

### Q: Quelle recette choisir?
**R**: Commencez par Mix Standard (facile, fiable).

### Q: Comment améliorer une recette?
**R**: Changer les proportions et tester. Le calculateur vous aide!

### Q: Combien de recettes créer?
**R**: 3-5 au début. Augmentez progressivement.

### Q: Les proportions doivent être exactes?
**R**: Oui, plus vous êtes précis, mieux c'est (balance de précision).

---

**Bon mixing! 🎮⚗️**
