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

// ===== BASE DRUGS DATA =====
const baseDrugs = [
    // Marijuana varieties
    { id: 'og_kush', name: 'OG Kush', price: 38, icon: 'Marijuana.webp' },
    { id: 'sour_diesel', name: 'Sour Diesel', price: 40, icon: 'Marijuana.webp' },
    { id: 'green_crack', name: 'Green Crack', price: 43, icon: 'Marijuana.webp' },
    { id: 'granddaddy_purple', name: 'Granddaddy Purple', price: 44, icon: 'Marijuana.webp' },
    // Other bases
    { id: 'methamphetamine', name: 'Methamphetamine', price: 70, icon: 'Meth.webp' },
    { id: 'shrooms', name: 'Shrooms', price: 100, icon: 'Shroom.webp' },
    { id: 'cocaine', name: 'Cocaine', price: 150, icon: 'Cocaine.webp' }
];

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
let selectedBaseDrug = null;  // Current base drug selection

// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const alertContainer = document.getElementById('alertContainer');

// Builder elements
const baseDrugSelect = document.getElementById('baseDrugSelect');
const baseDrugValue = document.getElementById('baseDrugValue');
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
    initBaseDrugSelector();
    loadRecipes();
    setupTabListener();
    setupBuilderListeners();
    setupViewerListeners();
    populateEffectsHint();
});

// ===== BASE DRUG SELECTOR =====
function initBaseDrugSelector() {
    baseDrugSelect.innerHTML = baseDrugs.map(drug => `
        <div class="base-drug-option" data-drug-id="${drug.id}" onclick="selectBaseDrug('${drug.id}', this)">
            <img src="icons/${drug.icon}" alt="${drug.name}" class="base-drug-icon">
            <div class="base-drug-name">${drug.name}</div>
            <div class="base-drug-price">$${drug.price}</div>
        </div>
    `).join('');
}

function selectBaseDrug(drugId, element) {
    document.querySelectorAll('.base-drug-option').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedBaseDrug = baseDrugs.find(d => d.id === drugId);
    baseDrugValue.value = drugId;
}

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
}

// ===== STEP MANAGEMENT =====
function addStep() {
    if (!selectedBaseDrug) {
        showAlert('⚠ Veuillez d\'abord choisir une drogue de base', 'warning');
        return;
    }
    
    const stepIndex = stepsContainer.querySelectorAll('.step-input-group').length;
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-input-group';
    
    // Calculate previous result name for display
    let previousResult = selectedBaseDrug.name;
    if (stepIndex > 0) {
        const prevStep = stepsContainer.children[stepIndex - 1];
        const prevSelect = prevStep.querySelector('.ingredient-select');
        if (prevSelect && prevSelect.value) {
            const prevIng = ingredients.find(i => i.id === prevSelect.value);
            if (prevIng) {
                previousResult = prevIng.name;
            }
        }
    }
    
    const ingredientOptions = ingredients.map(ing => 
        `<option value="${ing.id}">🌿 ${ing.name} (x${ing.function})</option>`
    ).join('');
    
    stepDiv.innerHTML = `
        <div class="step-header">
            <span class="step-number">Étape ${stepIndex + 1}</span>
            <button type="button" class="btn-remove-step" onclick="removeStep(${stepIndex})">✕ Supprimer</button>
        </div>
        <div class="step-inputs">
            <div class="previous-result">
                🧪 Résultat précédent: <strong>${previousResult}</strong>
            </div>
            <select class="ingredient-select" onchange="updatePrice(); updatePreviousResults();">
                <option value="">+ Choisir ingrédient à mélanger...</option>
                ${ingredientOptions}
            </select>
        </div>
    `;
    
    stepsContainer.appendChild(stepDiv);
}

function removeStep(index) {
    const steps = stepsContainer.querySelectorAll('.step-input-group');
    if (index >= 0 && index < steps.length) {
        steps[index].remove();
        updatePrice();
        updatePreviousResults();
    }
}

function updatePreviousResults() {
    const steps = stepsContainer.querySelectorAll('.step-input-group');
    steps.forEach((stepDiv, idx) => {
        let prevResult = idx === 0 ? selectedBaseDrug.name : 'Résultat précédent';
        
        if (idx > 0) {
            const prevSelect = steps[idx - 1].querySelector('.ingredient-select');
            if (prevSelect && prevSelect.value) {
                const ing = ingredients.find(i => i.id === prevSelect.value);
                if (ing) prevResult = ing.name;
            }
        }
        
        const prevDiv = stepDiv.querySelector('.previous-result strong');
        if (prevDiv) prevDiv.textContent = prevResult;
    });
}

// ===== PRICE CALCULATION =====
function updatePrice() {
    if (!selectedBaseDrug) return;
    
    let totalPrice = selectedBaseDrug.price;
    const steps = stepsContainer.querySelectorAll('.step-input-group');
    
    steps.forEach(stepDiv => {
        const select = stepDiv.querySelector('.ingredient-select');
        if (select && select.value) {
            const ing = ingredients.find(i => i.id === select.value);
            if (ing) {
                totalPrice += ing.function;
            }
        }
    });
    
    finalCalculatedPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

// ===== RECIPE SAVING =====
async function saveRecipe() {
    if (!selectedBaseDrug) {
        showAlert('Choisissez une drogue de base', 'error');
        return;
    }

    const name = recipeName.value.trim();
    if (!name) {
        showAlert('Veuillez entrer un nom de recette', 'error');
        return;
    }

    const steps = [];
    stepsContainer.querySelectorAll('.step-input-group').forEach((stepDiv, idx) => {
        const select = stepDiv.querySelector('.ingredient-select');
        if (select && select.value) {
            const ing = ingredients.find(i => i.id === select.value);
            steps.push({
                number: idx + 1,
                ingredientId: select.value,
                ingredientName: ing.name
            });
        }
    });

    if (steps.length === 0) {
        showAlert('Ajoutez au moins une étape', 'error');
        return;
    }

    const finalName = finalProductName.value.trim();
    if (!finalName) {
        showAlert('Entrez un nom pour le produit final', 'error');
        return;
    }

    let totalPrice = selectedBaseDrug.price;
    steps.forEach(step => {
        const ing = ingredients.find(i => i.id === step.ingredientId);
        if (ing) totalPrice += ing.function;
    });

    const recipe = {
        id: `recipe_${Date.now()}`,
        name: name,
        baseDrugId: selectedBaseDrug.id,
        baseDrugName: selectedBaseDrug.name,
        baseDrugPrice: selectedBaseDrug.price,
        steps: steps,
        finalProduct: {
            name: finalName,
            calculatedPrice: totalPrice
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
    selectedBaseDrug = null;
    baseDrugValue.value = '';
    document.querySelectorAll('.base-drug-option').forEach(el => el.classList.remove('selected'));
    recipeName.value = '';
    stepsContainer.innerHTML = '';
    finalProductName.value = '';
    finalProductPrice.value = '';
    finalCalculatedPrice.textContent = '$0.00';
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
                <div>Base: <strong>${recipe.baseDrugName}</strong></div>
                <div>Étapes: <strong>${recipe.steps.length}</strong></div>
                <div>Produit final: <strong>${recipe.finalProduct.name}</strong></div>
                <div>Prix: <strong>$${recipe.finalProduct.calculatedPrice.toFixed(2)}</strong></div>
            </div>
            <div class="recipe-card-actions">
                <button onclick="editRecipe('${recipe.id}')" class="recipe-card-edit">✏️ Éditer</button>
                <button onclick="deleteRecipe('${recipe.id}')" class="recipe-card-delete">🗑️ Supprimer</button>
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

    // Select base drug
    const baseDrug = baseDrugs.find(d => d.id === recipe.baseDrugId);
    if (baseDrug) {
        selectBaseDrug(baseDrug.id, document.querySelector(`[data-drug-id="${baseDrug.id}"]`));
    }

    // Load recipe into builder
    recipeName.value = recipe.name;
    finalProductName.value = recipe.finalProduct.name;

    stepsContainer.innerHTML = '';
    recipe.steps.forEach((step, idx) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-input-group';
        
        let prevResult = idx === 0 ? recipe.baseDrugName : recipe.steps[idx - 1].ingredientName;
        
        const ingredientOptions = ingredients.map(ing => 
            `<option value="${ing.id}" ${ing.id === step.ingredientId ? 'selected' : ''}>🌿 ${ing.name} (x${ing.function})</option>`
        ).join('');
        
        stepDiv.innerHTML = `
            <div class="step-header">
                <span class="step-number">Étape ${step.number}</span>
                <button type="button" class="btn-remove-step" onclick="removeStep(${idx})">✕ Supprimer</button>
            </div>
            <div class="step-inputs">
                <div class="previous-result">
                    🧪 Résultat précédent: <strong>${prevResult}</strong>
                </div>
                <select class="ingredient-select" onchange="updatePrice(); updatePreviousResults();">
                    <option value="">+ Choisir ingrédient à mélanger...</option>
                    ${ingredientOptions}
                </select>
            </div>
        `;
        stepsContainer.appendChild(stepDiv);
    });

    updatePrice();

    // Switch to builder tab
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
    
    // Get base drug icon
    const baseDrug = baseDrugs.find(d => d.id === currentRecipe.baseDrugId);
    const baseDrugIcon = baseDrug ? baseDrug.icon : 'default.png';
    
    html += `
        <div class="tree-node">
            <div class="tree-box" style="background: #6366f1;">
                <img src="icons/${baseDrugIcon}" alt="${currentRecipe.baseDrugName}">
                ${currentRecipe.baseDrugName}
            </div>
        </div>
    `;
    
    currentRecipe.steps.forEach((step, idx) => {
        const ing = ingredients.find(i => i.id === step.ingredientId);
        const iconPath = ing ? ing.icon : 'default.png';
        
        html += `
            <div class="tree-node">
                <span class="tree-arrow">↓ + Étape ${step.number}</span>
            </div>
            <div class="tree-node">
                <div class="tree-box">
                    <img src="icons/${iconPath}" alt="${step.ingredientName}">
                    ${step.ingredientName}
                </div>
                <span class="tree-arrow">=</span>
                <div class="tree-box" style="background: #10b981;">
                    Résultat ${idx + 1}
                </div>
            </div>
        `;
    });

    html += `
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 2px solid var(--border);">
            <h4>Produit Final</h4>
            <div class="tree-box" style="background: #f59e0b; font-size: 1.1rem;">
                ${currentRecipe.finalProduct.name}
                <div style="font-size: 0.9rem; margin-top: 0.5rem;">Prix: <strong>$${currentRecipe.finalProduct.calculatedPrice.toFixed(2)}</strong></div>
            </div>
        </div>
    `;

    treeViewer.innerHTML = html;
}

function renderResourcesPanel() {
    if (!currentRecipe) {
        resourcesPanel.style.display = 'none';
        return;
    }
    
    resourcesPanel.style.display = 'block';
    
    let resourcesHtml = '<h4>Ressources Utilisées</h4>';
    
    // Add base drug
    resourcesHtml += `<div class="resource-item">🔧 ${currentRecipe.baseDrugName}: <strong>$${currentRecipe.baseDrugPrice}</strong></div>`;
    
    // Add ingredients
    let totalIngredientCost = 0;
    currentRecipe.steps.forEach(step => {
        const ing = ingredients.find(i => i.id === step.ingredientId);
        if (ing) {
            totalIngredientCost += ing.function;
            resourcesHtml += `<div class="resource-item">🌿 ${step.ingredientName}: <strong>$${ing.function}</strong></div>`;
        }
    });
    
    resourcesHtml += `
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
            <div class="resource-item">Base: <strong>$${currentRecipe.baseDrugPrice}</strong></div>
            <div class="resource-item">Ingrédients: <strong>$${totalIngredientCost.toFixed(2)}</strong></div>
            <div class="resource-item" style="font-weight: bold; font-size: 1.1rem;">Total: <strong style="color: #10b981;">$${currentRecipe.finalProduct.calculatedPrice.toFixed(2)}</strong></div>
        </div>
    `;
    
    resourcesList.innerHTML = resourcesHtml;
}
