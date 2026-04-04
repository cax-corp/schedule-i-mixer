import { Router } from 'itty-router';

const router = Router();

// ===== MIDDLEWARE =====

// CORS middleware
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// ===== API ROUTES =====

// OPTIONS (for CORS preflight)
router.options('*', () => new Response(null, { headers: corsHeaders }));

// GET /api/recipes - List all recipes
router.get('/api/recipes', async (request, env) => {
  try {
    const keys = await env.RECIPES.list();
    const recipes = [];
    
    for (const key of keys.keys) {
      const recipe = await env.RECIPES.get(key.name, 'json');
      if (recipe) recipes.push(recipe);
    }
    
    return new Response(JSON.stringify({ success: true, data: recipes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});

// GET /api/recipes/:id - Get single recipe
router.get('/api/recipes/:id', async (request, env) => {
  try {
    const { id } = request.params;
    const recipe = await env.RECIPES.get(id, 'json');
    
    if (!recipe) {
      return new Response(JSON.stringify({ success: false, error: 'Recipe not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      });
    }
    
    return new Response(JSON.stringify({ success: true, data: recipe }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});

// POST /api/recipes - Create new recipe
router.post('/api/recipes', async (request, env) => {
  try {
    const recipe = await request.json();
    
    // Validation
    if (!recipe.name || !recipe.finalProduct) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }
    
    // Generate ID if not provided
    const id = recipe.id || `recipe_${Date.now()}`;
    const recipeWithMeta = {
      ...recipe,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await env.RECIPES.put(id, JSON.stringify(recipeWithMeta));
    
    return new Response(JSON.stringify({ success: true, data: recipeWithMeta }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 201
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});

// PUT /api/recipes/:id - Update recipe
router.put('/api/recipes/:id', async (request, env) => {
  try {
    const { id } = request.params;
    const updates = await request.json();
    
    // Get existing recipe
    const existing = await env.RECIPES.get(id, 'json');
    if (!existing) {
      return new Response(JSON.stringify({ success: false, error: 'Recipe not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      });
    }
    
    // Merge updates
    const updated = {
      ...existing,
      ...updates,
      id, // Prevent ID changes
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    await env.RECIPES.put(id, JSON.stringify(updated));
    
    return new Response(JSON.stringify({ success: true, data: updated }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});

// DELETE /api/recipes/:id - Delete recipe
router.delete('/api/recipes/:id', async (request, env) => {
  try {
    const { id } = request.params;
    
    // Check if exists
    const existing = await env.RECIPES.get(id);
    if (!existing) {
      return new Response(JSON.stringify({ success: false, error: 'Recipe not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      });
    }
    
    // Delete
    await env.RECIPES.delete(id);
    
    return new Response(JSON.stringify({ success: true, message: 'Recipe deleted' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});

// Health check
router.get('/health', () => {
  return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
    headers: { 'Content-Type': 'application/json' }
  });
});

// 404 handler
router.all('*', () => new Response('Not Found', { status: 404 }));

// ===== EXPORT =====
export default {
  fetch: (request, env) => router.handle(request, env)
};
