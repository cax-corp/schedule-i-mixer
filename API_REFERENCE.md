# 📡 API Reference - Schedule I Mixer

Documentation complète des endpoints API.

## 🔗 Base URL

```text
Development:  http://localhost:8787
Production:   https://schedule-mixer.YOUR_URL
```

## 🔑 Routes API

Tous les endpoints retournent du JSON.

---

## 📚 Recettes (Recipes)

### GET - Récupérer toutes les recettes

```http
GET /api/recipes
```

**Response (200 OK):**

```json
[
  {
    "id": "1712180400123",
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
]
```

**Example:**
```bash
curl http://localhost:8787/api/recipes
```

---

### GET - Récupérer une recette spécifique

```http
GET /api/recipes/:id
```

**Parameters:**

- `id` (string, required): ID de la recette

**Response (200 OK):**

```json
{
  "id": "1712180400123",
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

**Example:**
```bash
curl http://localhost:8787/api/recipes/1712180400123
```

---

### POST - Créer une recette

```http
POST /api/recipes
Content-Type: application/json
```

**Request Body:**
```json
{
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
  "notes": "Bien mélanger à température ambiante"
}
```

**Response (201 Created):**
```json
{
  "id": "1712180400123",
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

**Examples:**

Bash:
```bash
curl -X POST http://localhost:8787/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
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
      }
    ],
    "notes": "Mélanger bien"
  }'
```

JavaScript:
```javascript
const recipe = {
  name: "Mix Premium",
  description: "Mélange haut de gamme",
  output: {
    name: "Mix Premium",
    quantity: 1,
    unit: "litre"
  },
  ingredients: [
    {
      name: "Sucre",
      quantity: 0.5,
      unit: "kg"
    }
  ],
  notes: "Mélanger bien"
};

const response = await fetch('/api/recipes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(recipe)
});

const newRecipe = await response.json();
console.log(newRecipe);
```

---

### PUT - Modifier une recette

```http
PUT /api/recipes/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string, required): ID de la recette

**Request Body:** (identique à POST)
```json
{
  "name": "Mix Premium Updated",
  "description": "Mélange haut de gamme (v2)",
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
    }
  ],
  "notes": "Nouvelle version"
}
```

**Response (200 OK):** (Nouvelle recette avec `updatedAt`)

**Example:**
```bash
curl -X PUT http://localhost:8787/api/recipes/1712180400123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mix Premium Updated",
    "description": "Mélange haut de gamme (v2)",
    "output": {
      "name": "Mix Premium",
      "quantity": 1,
      "unit": "litre"
    },
    "ingredients": [
      {
        "name": "Sucre",
        "quantity": 0.75,
        "unit": "kg"
      }
    ],
    "notes": "Nouvelle version"
  }'
```

---

### DELETE - Supprimer une recette

```http
DELETE /api/recipes/:id
```

**Parameters:**
- `id` (string, required): ID de la recette

**Response (200 OK):**
```json
{
  "message": "Recipe deleted"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:8787/api/recipes/1712180400123
```

---

## 📅 Plans de Production (Plans)

### GET - Récupérer tous les plans

```http
GET /api/plans
```

**Response (200 OK):**
```json
[
  {
    "id": "1712180400456",
    "recipeId": "1712180400123",
    "recipeName": "Mix Premium",
    "date": "2026-04-10",
    "quantity": 10,
    "unit": "litre",
    "notes": "Urgent - Client ABC",
    "createdAt": "2026-04-04T12:00:00.000Z"
  }
]
```

**Example:**
```bash
curl http://localhost:8787/api/plans
```

---

### POST - Créer un plan

```http
POST /api/plans
Content-Type: application/json
```

**Request Body:**
```json
{
  "recipeId": "1712180400123",
  "recipeName": "Mix Premium",
  "date": "2026-04-10",
  "quantity": 10,
  "unit": "litre",
  "notes": "Urgent - Client ABC",
  "createdAt": "2026-04-04T12:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "id": "1712180400456",
  "recipeId": "1712180400123",
  "recipeName": "Mix Premium",
  "date": "2026-04-10",
  "quantity": 10,
  "unit": "litre",
  "notes": "Urgent - Client ABC",
  "createdAt": "2026-04-04T12:00:00.000Z"
}
```

**Example:**
```bash
curl -X POST http://localhost:8787/api/plans \
  -H "Content-Type: application/json" \
  -d '{
    "recipeId": "1712180400123",
    "recipeName": "Mix Premium",
    "date": "2026-04-10",
    "quantity": 10,
    "unit": "litre",
    "notes": "Urgent - Client ABC",
    "createdAt": "2026-04-04T12:00:00.000Z"
  }'
```

---

### DELETE - Supprimer un plan

```http
DELETE /api/plans/:id
```

**Parameters:**
- `id` (string, required): ID du plan

**Response (200 OK):**
```json
{
  "message": "Plan deleted"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:8787/api/plans/1712180400456
```

---

## 🔴 Codes d'Erreur

| Code | Message | Cause |
|------|---------|-------|
| 200 | OK | Succès |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Données invalides |
| 404 | Not Found | Ressource inexistante |
| 500 | Internal Server Error | Erreur serveur |

**Exemple d'erreur:**
```json
{
  "error": "Missing required fields"
}
```

---

## 📝 Notes

- **Tous les IDs** sont générés automatiquement (timestamp + random)
- **Les données** sont stockées dans Cloudflare KV
- **CORS** est activé pour `*` (tous les domaines)
- **Validation** basique implémentée côté serveur

---

## 🧪 Tester avec Postman

Importez cette collection dans [Postman](https://www.postman.com/downloads/):

```json
{
  "info": {
    "name": "Schedule I Mixer API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Recipes",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/recipes"
      }
    },
    {
      "name": "Create Recipe",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/recipes",
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"Mix Premium\", \"output\": {\"name\": \"Mix\", \"quantity\": 1, \"unit\": \"L\"}, \"ingredients\": [{\"name\": \"Sugar\", \"quantity\": 0.5, \"unit\": \"kg\"}]}"
        }
      }
    }
  ]
}
```

---

**API Version**: 1.0.0  
**Last Updated**: 2026-04-04
