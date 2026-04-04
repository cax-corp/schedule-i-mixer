// ===== API CONFIG =====
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:8787/api'  // Local dev
    : 'https://api.schedule.cax-corp.com/api';  // Production
const USE_API = window.location.hostname !== 'localhost' || false;  // Toggle for testing

// ===== API ABSTRACTION LAYER =====
const RecipeAPI = {
    async list() {
        if (!USE_API) return RecipeStorage.loadAll();
        
        try {
            const response = await fetch(`${API_BASE}/recipes`);
            if (!response.ok) throw new Error('API error');
            const result = await response.json();
            return result.data || [];
        } catch (error) {
            console.error('API error, falling back to localStorage:', error);
            return RecipeStorage.loadAll();
        }
    },

    async get(id) {
        if (!USE_API) return RecipeStorage.load(id);
        
        try {
            const response = await fetch(`${API_BASE}/recipes/${id}`);
            if (!response.ok) throw new Error('Not found');
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('API error, falling back to localStorage:', error);
            return RecipeStorage.load(id);
        }
    },

    async create(recipe) {
        if (!USE_API) return RecipeStorage.save(recipe);
        
        try {
            const response = await fetch(`${API_BASE}/recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe)
            });
            if (!response.ok) throw new Error('Creation failed');
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('API error, falling back to localStorage:', error);
            return RecipeStorage.save(recipe);
        }
    },

    async update(id, recipe) {
        if (!USE_API) return RecipeStorage.save({ ...recipe, id });
        
        try {
            const response = await fetch(`${API_BASE}/recipes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipe)
            });
            if (!response.ok) throw new Error('Update failed');
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('API error, falling back to localStorage:', error);
            return RecipeStorage.save({ ...recipe, id });
        }
    },

    async delete(id) {
        if (!USE_API) return RecipeStorage.delete(id);
        
        try {
            const response = await fetch(`${API_BASE}/recipes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Delete failed');
            return true;
        } catch (error) {
            console.error('API error, falling back to localStorage:', error);
            return RecipeStorage.delete(id);
        }
    }
};

// ===== FALLBACK LOCALSTORAGE =====
const RecipeStorage = {
    loadAll() {
        const data = localStorage.getItem('schedule_recipes');
        return data ? JSON.parse(data) : [];
    },

    load(id) {
        const recipes = this.loadAll();
        return recipes.find(r => r.id === id);
    },

    save(recipe) {
        const recipes = this.loadAll();
        const idx = recipes.findIndex(r => r.id === recipe.id);
        if (idx >= 0) {
            recipes[idx] = { ...recipe, updatedAt: new Date().toISOString() };
        } else {
            recipes.push({ ...recipe, id: recipe.id || `recipe_${Date.now()}`, createdAt: new Date().toISOString() });
        }
        localStorage.setItem('schedule_recipes', JSON.stringify(recipes));
        return recipes.find(r => r.id === recipe.id || r.id === `recipe_${Date.now()}`);
    },

    delete(id) {
        let recipes = this.loadAll();
        recipes = recipes.filter(r => r.id !== id);
        localStorage.setItem('schedule_recipes', JSON.stringify(recipes));
        return true;
    }
};

// ===== INGREDIENTS DATA =====
const ingredients = [
    { id: 'cuke', name: 'Cuke', price: 2, icon: 'cuke.png', base_effect: 'Energizing' },
    { id: 'banana', name: 'Banana', price: 2, icon: 'banana.png', base_effect: 'Gingeritis' },
    { id: 'paracetamol', name: 'Paracetamol', price: 3, icon: 'paracetamol.png', base_effect: 'Sneaky' },
    { id: 'donut', name: 'Donut', price: 3, icon: 'donut.png', base_effect: 'Calorie-Dense' },
    { id: 'viagra', name: 'Viagra', price: 4, icon: 'viagra.png', base_effect: 'Tropic Thunder' },
    { id: 'mouth_wash', name: 'Mouth Wash', price: 4, icon: 'mouth_wash.png', base_effect: 'Balding' },
    { id: 'flu_medecine', name: 'Flu Medicine', price: 5, icon: 'flu_medecine.png', base_effect: 'Sedating' },
    { id: 'gasoline', name: 'Gasoline', price: 5, icon: 'gasoline.png', base_effect: 'Toxic' },
    { id: 'energy_drink', name: 'Energy Drink', price: 6, icon: 'energy_drink.png', base_effect: 'Athletic' },
    { id: 'motor_oil', name: 'Motor Oil', price: 6, icon: 'motor_oil.png', base_effect: 'Slippery' },
    { id: 'mega_bean', name: 'Mega Bean', price: 7, icon: 'mega_bean.png', base_effect: 'Foggy' },
    { id: 'chili', name: 'Chili', price: 7, icon: 'chili.png', base_effect: 'Spicy' },
    { id: 'battery', name: 'Battery', price: 8, icon: 'battery.png', base_effect: 'Bright-Eyed' },
    { id: 'iodine', name: 'Iodine', price: 8, icon: 'iodine.png', base_effect: 'Jennerising' },
    { id: 'addy', name: 'Addy', price: 9, icon: 'addy.png', base_effect: 'Thought-Provoking' },
    { id: 'horse_semen', name: 'Horse Semen', price: 9, icon: 'horse_semen.png', base_effect: 'Long-Faced' }
];

// ===== EFFECTS DATA =====
const effects = [
    { name: 'Shrinking', multiplier: 0.60 },
    { name: 'Zombifying', multiplier: 0.58 },
    { name: 'Cyclopean', multiplier: 0.56 },
    { name: 'Anti-Gravity', multiplier: 0.54 },
    { name: 'Long-Faced', multiplier: 0.52 },
    { name: 'Electrifying', multiplier: 0.50 },
    { name: 'Glowing', multiplier: 0.48 },
    { name: 'Tropic Thunder', multiplier: 0.46 },
    { name: 'Thought-Provoking', multiplier: 0.44 },
    { name: 'Jennerising', multiplier: 0.42 },
    { name: 'Bright-Eyed', multiplier: 0.40 },
    { name: 'Spicy', multiplier: 0.38 },
    { name: 'Foggy', multiplier: 0.36 },
    { name: 'Slippery', multiplier: 0.34 },
    { name: 'Athletic', multiplier: 0.32 },
    { name: 'Balding', multiplier: 0.30 },
    { name: 'Calorie-Dense', multiplier: 0.28 },
    { name: 'Sedating', multiplier: 0.26 },
    { name: 'Sneaky', multiplier: 0.24 },
    { name: 'Energizing', multiplier: 0.22 },
    { name: 'Euphoric', multiplier: 0.18 },
    { name: 'Focused', multiplier: 0.16 },
    { name: 'Refreshing', multiplier: 0.14 },
    { name: 'Munchies', multiplier: 0.12 },
    { name: 'Calming', multiplier: 0.10 },
    { name: 'Disorienting', multiplier: 0.00 },
    { name: 'Explosive', multiplier: 0.00 },
    { name: 'Laxative', multiplier: 0.00 },
    { name: 'Paranoia', multiplier: 0.00 },
    { name: 'Schizophrenic', multiplier: 0.00 },
    { name: 'Seizure-Inducing', multiplier: 0.00 },
    { name: 'Smelly', multiplier: 0.00 },
    { name: 'Toxic', multiplier: 0.00 },
    { name: 'Gingeritis', multiplier: 0.20 }
];

// ===== STATE =====
let recipes = [];
let currentRecipe = null;

// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const alertContainer = document.getElementById('alertContainer');

// Builder elements
const recipeName = document.getElementById('recipeName');
const stepsContainer = document.getElementById('stepsContainer');
const addStepBtn = document.getElementById('addStepBtn');
const finalProductName = document.getElementById('finalProductName');
const finalProductPrice = document.getElementById('finalProductPrice');
const finalProductEffects = document.getElementById('finalProductEffects');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');
const clearBuilderBtn = document.getElementById('clearBuilderBtn');
const finalCalculatedPrice = document.getElementById('finalCalculatedPrice');
const effectsMultiplier = document.getElementById('effectsMultiplier');
const effectsHint = document.getElementById('effectsHint');

// Recipes list elements
const recipesList = document.getElementById('recipesList');
const noRecipes = document.getElementById('noRecipes');

// Viewer elements
const recipeViewerSelect = document.getElementById('recipeViewerSelect');
const treeViewer = document.getElementById('treeViewer');
const resourcesPanel = document.getElementById('resourcesPanel');
const resourcesList = document.getElementById('resourcesList');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadRecipes();
    setupTabListener();
    setupBuilderListeners();
    setupViewerListeners();
    populateEffectsHint();
});

// ===== THEME MANAGEMENT =====
function initTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ===== TAB MANAGEMENT =====
function setupTabListener() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            if (tabName === 'recipes') {
                renderRecipesList();
            } else if (tabName === 'viewer') {
                updateViewerSelect();
            }
        });
    });
}

// ===== ALERT FUNCTION =====
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">✕</button>
    `;
    alertContainer.prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 4000);
}

// ===== EFFECTS HINT =====
function populateEffectsHint() {
    const effectNames = effects.map(e => e.name).join(', ');
    effectsHint.textContent = `Available effects: ${effectNames}`;
}

// ===== BUILDER SETUP =====
function setupBuilderListeners() {
    addStepBtn.addEventListener('click', addStep);
    saveRecipeBtn.addEventListener('click', saveRecipe);
    clearBuilderBtn.addEventListener('click', clearBuilder);
    finalProductEffects.addEventListener('input', updateFinalPrice);
}

// ===== STEP MANAGEMENT =====
function addStep() {
    const stepCount = stepsContainer.querySelectorAll('.step-item').length + 1;
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-item';
    stepDiv.innerHTML = `
        <div class="step-header">
            <span class="step-number">Étape ${stepCount}</span>
            <button type="button" class="remove-step" onclick="removeStep(this)">Supprimer</button>
        </div>
        <div class="step-inputs">
            <div class="form-group">
                <label>Ingrédient/Produit 1</label>
                <select class="ingredient-select">
                    <option value="">-- Sélectionner --</option>
                    ${ingredients.map(ing => `<option value="${ing.id}">${ing.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Ingrédient/Produit 2</label>
                <select class="ingredient-select">
                    <option value="">-- Sélectionner --</option>
                    ${ingredients.map(ing => `<option value="${ing.id}">${ing.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Nom du produit intermédiaire</label>
                <input type="text" class="step-product-name" placeholder="ex: Purple Cake">
            </div>
        </div>
    `;
    stepsContainer.appendChild(stepDiv);
}

function removeStep(btn) {
    btn.closest('.step-item').remove();
}

// ===== PRICE CALCULATION =====
function calculatePrice(basePrice, effectNames) {
    const selectedEffects = effectNames
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0);
    
    const multiplierSum = selectedEffects.reduce((sum, effectName) => {
        const effect = effects.find(e => e.name.toLowerCase() === effectName.toLowerCase());
        return sum + (effect ? effect.multiplier : 0);
    }, 0);
    
    return basePrice * (1 + multiplierSum);
}

function updateFinalPrice() {
    const basePrice = parseFloat(finalProductPrice.value) || 0;
    const effectsText = finalProductEffects.value;
    const finalPrice = calculatePrice(basePrice, effectsText);
    finalCalculatedPrice.textContent = `$${finalPrice.toFixed(2)}`;
    
    const selectedEffects = effectsText.split(',').map(e => e.trim()).filter(e => e.length > 0);
    const totalMultiplier = selectedEffects.reduce((sum, effectName) => {
        const effect = effects.find(e => e.name.toLowerCase() === effectName.toLowerCase());
        return sum + (effect ? effect.multiplier : 0);
    }, 0);
    
    effectsMultiplier.textContent = `Effects multiplier: +${(totalMultiplier * 100).toFixed(0)}%`;
}

// ===== RECIPE SAVING =====
async function saveRecipe() {
    const name = recipeName.value.trim();
    if (!name) {
        showAlert('Veuillez entrer un nom de recette', 'error');
        return;
    }

    const steps = [];
    stepsContainer.querySelectorAll('.step-item').forEach((stepDiv, idx) => {
        const selects = stepDiv.querySelectorAll('.ingredient-select');
        const productName = stepDiv.querySelector('.step-product-name').value;
        
        steps.push({
            number: idx + 1,
            ingredient1: selects[0].value,
            ingredient2: selects[1].value,
            intermediateProduct: productName
        });
    });

    if (steps.length === 0) {
        showAlert('Ajoutez au moins une étape', 'error');
        return;
    }

    const finalName = finalProductName.value.trim();
    const finalPrice = parseFloat(finalProductPrice.value) || 0;
    const finalEffects = finalProductEffects.value;

    const recipe = {
        id: `recipe_${Date.now()}`,
        name: name,
        steps: steps,
        finalProduct: {
            name: finalName,
            basePrice: finalPrice,
            effects: finalEffects
        },
        createdAt: new Date().toISOString()
    };

    try {
        const saved = await RecipeAPI.create(recipe);
        recipes.push(saved);
        showAlert(`Recette "${name}" sauvegardée!`, 'success');
        clearBuilder();
        renderRecipesList();
    } catch (error) {
        showAlert('Erreur lors de la sauvegarde', 'error');
        console.error('Save error:', error);
    }
}

function clearBuilder() {
    recipeName.value = '';
    stepsContainer.innerHTML = '';
    finalProductName.value = '';
    finalProductPrice.value = '';
    finalProductEffects.value = '';
    finalCalculatedPrice.textContent = '$0.00';
    effectsMultiplier.textContent = '';
}

// ===== RECIPES LOADING =====
async function loadRecipes() {
    try {
        recipes = await RecipeAPI.list();
    } catch (error) {
        console.error('Load error:', error);
        recipes = [];
    }
}

// ===== RECIPES LIST DISPLAY =====
function renderRecipesList() {
    if (recipes.length === 0) {
        recipesList.innerHTML = '';
        noRecipes.style.display = 'block';
        return;
    }

    noRecipes.style.display = 'none';
    recipesList.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <h3>${recipe.name}</h3>
            <div class="recipe-info">
                <div>Étapes: <strong>${recipe.steps.length}</strong></div>
                <div>Produit final: <strong>${recipe.finalProduct.name}</strong></div>
                <div>Prix base: <strong>$${recipe.finalProduct.basePrice}</strong></div>
            </div>
            <div class="recipe-card-actions">
                <button onclick="editRecipe(${recipe.id})" class="recipe-card-edit">✏️ Éditer</button>
                <button onclick="deleteRecipe(${recipe.id})" class="recipe-card-delete">🗑️ Supprimer</button>
            </div>
        </div>
    `).join('');
}

async function deleteRecipe(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette?')) {
        try {
            await RecipeAPI.delete(id);
            recipes = recipes.filter(r => r.id !== id);
            renderRecipesList();
            showAlert('Recette supprimée', 'success');
        } catch (error) {
            showAlert('Erreur lors de la suppression', 'error');
            console.error('Delete error:', error);
        }
    }
}

function editRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    // Load recipe into builder
    recipeName.value = recipe.name;
    finalProductName.value = recipe.finalProduct.name;
    finalProductPrice.value = recipe.finalProduct.basePrice;
    finalProductEffects.value = recipe.finalProduct.effects;

    stepsContainer.innerHTML = '';
    recipe.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-item';
        stepDiv.innerHTML = `
            <div class="step-header">
                <span class="step-number">Étape ${step.number}</span>
                <button type="button" class="remove-step" onclick="removeStep(this)">Supprimer</button>
            </div>
            <div class="step-inputs">
                <div class="form-group">
                    <label>Ingrédient/Produit 1</label>
                    <select class="ingredient-select">
                        <option value="">-- Sélectionner --</option>
                        ${ingredients.map(ing => `<option value="${ing.id}" ${ing.id === step.ingredient1 ? 'selected' : ''}>${ing.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Ingrédient/Produit 2</label>
                    <select class="ingredient-select">
                        <option value="">-- Sélectionner --</option>
                        ${ingredients.map(ing => `<option value="${ing.id}" ${ing.id === step.ingredient2 ? 'selected' : ''}>${ing.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Nom du produit intermédiaire</label>
                    <input type="text" class="step-product-name" placeholder="ex: Purple Cake" value="${step.intermediateProduct}">
                </div>
            </div>
        `;
        stepsContainer.appendChild(stepDiv);
    });

    updateFinalPrice();

    // Delete old recipe and switch to builder tab
    deleteRecipe(id);
    tabButtons[0].click();
    saveRecipeBtn.textContent = '✅ Mettre à Jour Recette';
}

// ===== VIEWER SETUP =====
function setupViewerListeners() {
    recipeViewerSelect.addEventListener('change', () => {
        const id = parseInt(recipeViewerSelect.value);
        if (id) {
            currentRecipe = recipes.find(r => r.id === id);
            renderTreeViewer();
            renderResourcesPanel();
        }
    });
}

function updateViewerSelect() {
    recipeViewerSelect.innerHTML = '<option value="">-- Sélectionner une recette --</option>';
    recipes.forEach(recipe => {
        const option = document.createElement('option');
        option.value = recipe.id;
        option.textContent = recipe.name;
        recipeViewerSelect.appendChild(option);
    });
}

// ===== TREE VISUALIZATION =====
function renderTreeViewer() {
    if (!currentRecipe) {
        treeViewer.innerHTML = '<p class="empty-state">Sélectionnez une recette</p>';
        return;
    }

    let html = '<h3>Arbre de Transformation</h3>';
    
    currentRecipe.steps.forEach(step => {
        const ing1 = ingredients.find(i => i.id === step.ingredient1);
        const ing2 = ingredients.find(i => i.id === step.ingredient2);

        html += `
            <div class="tree-node">
                ${ing1 ? `<div class="tree-box"><img src="icons/${ing1.icon}" alt="${ing1.name}">${ing1.name}</div>` : ''}
                <span class="tree-arrow">+</span>
                ${ing2 ? `<div class="tree-box"><img src="icons/${ing2.icon}" alt="${ing2.name}">${ing2.name}</div>` : ''}
                <span class="tree-arrow">=</span>
                <div class="tree-box" style="background: #10b981;">${step.intermediateProduct}</div>
            </div>
        `;
    });

    html += `
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 2px solid var(--border);">
            <h4>Produit Final</h4>
            <div class="tree-box" style="background: #f59e0b; font-size: 1.1rem;">
                ${currentRecipe.finalProduct.name}
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                Prix base: <strong>$${currentRecipe.finalProduct.basePrice}</strong><br>
                Effets: <strong>${currentRecipe.finalProduct.effects || 'Aucun'}</strong>
            </p>
        </div>
    `;

    treeViewer.innerHTML = html;
}

// ===== RESOURCES CALCULATION =====
function renderResourcesPanel() {
    if (!currentRecipe) {
        resourcesList.innerHTML = '';
        return;
    }

    const resourceMap = {};
    
    // Collect all base ingredients needed
    currentRecipe.steps.forEach(step => {
        if (step.ingredient1) {
            const ing = ingredients.find(i => i.id === step.ingredient1);
            if (ing) {
                resourceMap[ing.id] = (resourceMap[ing.id] || 0) + 1;
            }
        }
        if (step.ingredient2) {
            const ing = ingredients.find(i => i.id === step.ingredient2);
            if (ing) {
                resourceMap[ing.id] = (resourceMap[ing.id] || 0) + 1;
            }
        }
    });

    let totalPrice = 0;
    resourcesList.innerHTML = Object.keys(resourceMap).map(ingId => {
        const ing = ingredients.find(i => i.id === ingId);
        const qty = resourceMap[ingId];
        const cost = ing.price * qty;
        totalPrice += cost;

        return `
            <div class="resource-item">
                <div class="resource-item-name">
                    <img src="icons/${ing.icon}" alt="${ing.name}">
                    ${ing.name}
                </div>
                <div class="resource-item-qty">x${qty}</div>
                <div class="resource-item-price">$${ing.price} × ${qty} = $${cost}</div>
            </div>
        `;
    }).join('');

    // Add final product info
    const finalPrice = calculatePrice(
        currentRecipe.finalProduct.basePrice,
        currentRecipe.finalProduct.effects
    );

    resourcesList.innerHTML += `
        <div class="resource-item" style="border-left-color: #f59e0b;">
            <div class="resource-item-name">
                🎯 ${currentRecipe.finalProduct.name}
            </div>
            <div class="resource-item-qty">Prix final</div>
            <div class="resource-item-price"><strong>$${finalPrice.toFixed(2)}</strong></div>
        </div>
    `;

    resourcesList.innerHTML += `
        <div class="resource-item" style="border-left-color: #6366f1; background: var(--bg); border: 2px solid var(--primary);">
            <div class="resource-item-name">📊 Coût Total Ingrédients</div>
            <div class="resource-item-qty">$${totalPrice}</div>
        </div>
    `;
}
