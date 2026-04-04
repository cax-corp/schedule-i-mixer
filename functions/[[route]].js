/**
 * API Routes for Schedule I Mix Recipe Calculator
 * Cloudflare Pages Functions
 */

import { Router } from 'itty-router';

const router = Router();

// Error handler
function errorResponse(message, status = 400) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

// Success response
function successResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

// CORS preflight
router.options('*', () => {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
});

// === RECIPES ENDPOINTS ===

// GET all recipes
router.get('/api/recipes', async (request, env) => {
    try {
        const recipesJson = await env.RECIPES.get('recipes_list');
        const recipes = recipesJson ? JSON.parse(recipesJson) : [];
        return successResponse(recipes);
    } catch (error) {
        return errorResponse('Failed to fetch recipes', 500);
    }
});

// GET single recipe
router.get('/api/recipes/:id', async (request, env) => {
    try {
        const recipesJson = await env.RECIPES.get('recipes_list');
        const recipes = recipesJson ? JSON.parse(recipesJson) : [];
        const recipe = recipes.find(r => r.id === request.params.id);
        
        if (!recipe) {
            return errorResponse('Recipe not found', 404);
        }
        
        return successResponse(recipe);
    } catch (error) {
        return errorResponse('Failed to fetch recipe', 500);
    }
});

// POST create recipe
router.post('/api/recipes', async (request, env) => {
    try {
        const recipe = await request.json();
        
        // Validation
        if (!recipe.name || !recipe.output || !recipe.ingredients) {
            return errorResponse('Missing required fields');
        }
        
        // Get existing recipes
        const recipesJson = await env.RECIPES.get('recipes_list');
        const recipes = recipesJson ? JSON.parse(recipesJson) : [];
        
        // Create new recipe with ID
        const newRecipe = {
            id: Date.now().toString(),
            ...recipe,
            createdAt: new Date().toISOString()
        };
        
        recipes.push(newRecipe);
        
        // Save to KV
        await env.RECIPES.put('recipes_list', JSON.stringify(recipes));
        
        return successResponse(newRecipe, 201);
    } catch (error) {
        return errorResponse('Failed to create recipe', 500);
    }
});

// PUT update recipe
router.put('/api/recipes/:id', async (request, env) => {
    try {
        const recipe = await request.json();
        
        // Get existing recipes
        const recipesJson = await env.RECIPES.get('recipes_list');
        const recipes = recipesJson ? JSON.parse(recipesJson) : [];
        
        // Find and update recipe
        const index = recipes.findIndex(r => r.id === request.params.id);
        if (index === -1) {
            return errorResponse('Recipe not found', 404);
        }
        
        const updatedRecipe = {
            ...recipes[index],
            ...recipe,
            id: request.params.id,
            updatedAt: new Date().toISOString()
        };
        
        recipes[index] = updatedRecipe;
        
        // Save to KV
        await env.RECIPES.put('recipes_list', JSON.stringify(recipes));
        
        return successResponse(updatedRecipe);
    } catch (error) {
        return errorResponse('Failed to update recipe', 500);
    }
});

// DELETE recipe
router.delete('/api/recipes/:id', async (request, env) => {
    try {
        // Get existing recipes
        const recipesJson = await env.RECIPES.get('recipes_list');
        const recipes = recipesJson ? JSON.parse(recipesJson) : [];
        
        // Find and remove recipe
        const index = recipes.findIndex(r => r.id === request.params.id);
        if (index === -1) {
            return errorResponse('Recipe not found', 404);
        }
        
        recipes.splice(index, 1);
        
        // Save to KV
        await env.RECIPES.put('recipes_list', JSON.stringify(recipes));
        
        return successResponse({ message: 'Recipe deleted' });
    } catch (error) {
        return errorResponse('Failed to delete recipe', 500);
    }
});

// === PLANS ENDPOINTS ===

// GET all plans
router.get('/api/plans', async (request, env) => {
    try {
        const plansJson = await env.RECIPES.get('plans_list');
        const plans = plansJson ? JSON.parse(plansJson) : [];
        return successResponse(plans);
    } catch (error) {
        return errorResponse('Failed to fetch plans', 500);
    }
});

// POST create plan
router.post('/api/plans', async (request, env) => {
    try {
        const plan = await request.json();
        
        // Validation
        if (!plan.recipeId || !plan.date || !plan.quantity) {
            return errorResponse('Missing required fields');
        }
        
        // Get existing plans
        const plansJson = await env.RECIPES.get('plans_list');
        const plans = plansJson ? JSON.parse(plansJson) : [];
        
        // Create new plan with ID
        const newPlan = {
            id: Date.now().toString(),
            ...plan
        };
        
        plans.push(newPlan);
        
        // Save to KV
        await env.RECIPES.put('plans_list', JSON.stringify(plans));
        
        return successResponse(newPlan, 201);
    } catch (error) {
        return errorResponse('Failed to create plan', 500);
    }
});

// DELETE plan
router.delete('/api/plans/:id', async (request, env) => {
    try {
        // Get existing plans
        const plansJson = await env.RECIPES.get('plans_list');
        const plans = plansJson ? JSON.parse(plansJson) : [];
        
        // Find and remove plan
        const index = plans.findIndex(p => p.id === request.params.id);
        if (index === -1) {
            return errorResponse('Plan not found', 404);
        }
        
        plans.splice(index, 1);
        
        // Save to KV
        await env.RECIPES.put('plans_list', JSON.stringify(plans));
        
        return successResponse({ message: 'Plan deleted' });
    } catch (error) {
        return errorResponse('Failed to delete plan', 500);
    }
});

// 404 handler
router.all('*', () => {
    return errorResponse('Not found', 404);
});

// Export for Cloudflare Pages Functions
export default {
    fetch: router.handle
};
