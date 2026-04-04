// === CONSTANTS ===
const API_BASE = '/api';

// === STATE ===
let recipes = [];
let plans = [];
let currentEditingRecipeId = null;

// === DOM ELEMENTS ===
const themeToggle = document.getElementById('themeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const calcForm = document.getElementById('calcForm');
const recipeForm = document.getElementById('recipeForm');
const plannerForm = document.getElementById('plannerForm');
const alertContainer = document.getElementById('alertContainer');
const ingredientsList = document.getElementById('ingredientsList');
const addIngredientBtn = document.getElementById('addIngredientBtn');
const clearFormBtn = document.getElementById('clearFormBtn');
const clearPlanBtn = document.getElementById('clearPlanBtn');
const recipeSelect = document.getElementById('recipeSelect');
const planRecipeSelect = document.getElementById('planRecipeSelect');
const recipesList = document.getElementById('recipesList');
const plansList = document.getElementById('plansList');
const noRecipes = document.getElementById('noRecipes');
const noPlans = document.getElementById('noPlans');

// === THEME MANAGEMENT ===
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

// === TAB MANAGEMENT ===
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Load data when switching tabs
        if (tabName === 'recipes') {
            loadRecipes();
        } else if (tabName === 'planner') {
            loadPlans();
        }
    });
});

// === ALERTS ===
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// === RECIPES ===

// Add ingredient input
addIngredientBtn.addEventListener('click', () => {
    addIngredientField();
});

function addIngredientField(name = '', quantity = '', unit = '') {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.className = 'ingredient-field';
    ingredientDiv.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 10px; align-items: flex-end;';
    
    const id = `ingredient-${Date.now()}-${Math.random()}`;
    
    ingredientDiv.innerHTML = `
        <div class="form-field">
            <label for="${id}-name">Ingrédient</label>
            <input type="text" id="${id}-name" class="ingredient-name" placeholder="ex: Sucre" value="${name}" required>
        </div>
        <div class="form-field">
            <label for="${id}-qty">Quantité</label>
            <input type="number" id="${id}-qty" class="ingredient-qty" min="0.1" step="0.1" value="${quantity}" required>
        </div>
        <div class="form-field">
            <label for="${id}-unit">Unité</label>
            <input type="text" id="${id}-unit" class="ingredient-unit" placeholder="kg, L" value="${unit}" required>
        </div>
        <button type="button" class="btn-delete" style="padding: 10px; height: 40px; min-width: auto;">✕</button>
    `;
    
    const deleteBtn = ingredientDiv.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => ingredientDiv.remove());
    
    ingredientsList.appendChild(ingredientDiv);
}

// Save recipe
recipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const ingredients = Array.from(ingredientsList.querySelectorAll('.ingredient-field')).map(field => ({
        name: field.querySelector('.ingredient-name').value,
        quantity: parseFloat(field.querySelector('.ingredient-qty').value),
        unit: field.querySelector('.ingredient-unit').value
    }));
    
    if (ingredients.length === 0) {
        showAlert('Ajoutez au moins un ingrédient', 'error');
        return;
    }
    
    const recipe = {
        name: document.getElementById('recipeName').value,
        description: document.getElementById('recipeDescription').value,
        output: {
            name: document.getElementById('outputName').value,
            quantity: parseFloat(document.getElementById('outputQty').value),
            unit: document.getElementById('outputUnitName').value
        },
        ingredients: ingredients,
        notes: document.getElementById('recipeNotes').value
    };
    
    try {
        const method = currentEditingRecipeId ? 'PUT' : 'POST';
        const url = currentEditingRecipeId 
            ? `${API_BASE}/recipes/${currentEditingRecipeId}` 
            : `${API_BASE}/recipes`;
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        });
        
        if (!response.ok) throw new Error('Erreur lors de la sauvegarde');
        
        showAlert(currentEditingRecipeId ? 'Recette mise à jour!' : 'Recette sauvegardée!');
        recipeForm.reset();
        ingredientsList.innerHTML = '';
        currentEditingRecipeId = null;
        loadRecipes();
    } catch (error) {
        showAlert('Erreur: ' + error.message, 'error');
    }
});

clearFormBtn.addEventListener('click', () => {
    recipeForm.reset();
    ingredientsList.innerHTML = '';
    currentEditingRecipeId = null;
});

// Load recipes
async function loadRecipes() {
    try {
        const response = await fetch(`${API_BASE}/recipes`);
        recipes = await response.json();
        
        // Update calculator and planner selects
        updateRecipeSelect();
        
        // Display recipes
        displayRecipes();
    } catch (error) {
        showAlert('Erreur lors du chargement des recettes', 'error');
    }
}

function updateRecipeSelect() {
    const defaultOption = '<option value="">-- Sélectionner une recette --</option>';
    recipeSelect.innerHTML = defaultOption;
    planRecipeSelect.innerHTML = defaultOption;
    
    recipes.forEach(recipe => {
        const option1 = document.createElement('option');
        option1.value = recipe.id;
        option1.textContent = recipe.name;
        recipeSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = recipe.id;
        option2.textContent = recipe.name;
        planRecipeSelect.appendChild(option2);
    });
}

function displayRecipes() {
    const hasRecipes = recipes.length > 0;
    noRecipes.style.display = hasRecipes ? 'none' : 'block';
    recipesList.innerHTML = '';
    
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <div class="recipe-info">
                <div class="recipe-info-item">
                    <span class="recipe-info-label">Description:</span>
                    <span class="recipe-info-value">${recipe.description || '-'}</span>
                </div>
                <div class="recipe-info-item">
                    <span class="recipe-info-label">Produit:</span>
                    <span class="recipe-info-value">${recipe.output.quantity} ${recipe.output.unit} de ${recipe.output.name}</span>
                </div>
                <div class="recipe-info-item">
                    <span class="recipe-info-label">Ingrédients:</span>
                    <span class="recipe-info-value">${recipe.ingredients.length}</span>
                </div>
                ${recipe.notes ? `<div class="recipe-info-item"><span class="recipe-info-label">Notes:</span><span class="recipe-info-value">${recipe.notes}</span></div>` : ''}
            </div>
            <div class="recipe-actions">
                <button class="btn-view" data-id="${recipe.id}">👁️ Détails</button>
                <button class="btn-edit" data-id="${recipe.id}">✏️ Éditer</button>
                <button class="btn-delete-recipe" data-id="${recipe.id}">🗑️ Supprimer</button>
            </div>
        `;
        
        card.querySelector('.btn-view').addEventListener('click', () => viewRecipeDetails(recipe));
        card.querySelector('.btn-edit').addEventListener('click', () => editRecipe(recipe));
        card.querySelector('.btn-delete-recipe').addEventListener('click', () => deleteRecipe(recipe.id));
        
        recipesList.appendChild(card);
    });
}

function viewRecipeDetails(recipe) {
    let details = `📋 ${recipe.name}\n\n`;
    details += `Produit: ${recipe.output.quantity} ${recipe.output.unit} de ${recipe.output.name}\n\n`;
    details += `Ingrédients:\n`;
    recipe.ingredients.forEach(ing => {
        details += `  • ${ing.quantity} ${ing.unit} de ${ing.name}\n`;
    });
    if (recipe.notes) {
        details += `\nNotes: ${recipe.notes}`;
    }
    alert(details);
}

function editRecipe(recipe) {
    currentEditingRecipeId = recipe.id;
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('recipeDescription').value = recipe.description || '';
    document.getElementById('outputName').value = recipe.output.name;
    document.getElementById('outputQty').value = recipe.output.quantity;
    document.getElementById('outputUnitName').value = recipe.output.unit;
    document.getElementById('recipeNotes').value = recipe.notes || '';
    
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ing => {
        addIngredientField(ing.name, ing.quantity, ing.unit);
    });
    
    // Scroll to form
    document.querySelector('[data-tab="recipes"]').click();
    document.getElementById('recipeForm').scrollIntoView({ behavior: 'smooth' });
    showAlert('Mode édition activé');
}

async function deleteRecipe(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette recette?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/recipes/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        
        showAlert('Recette supprimée!');
        loadRecipes();
    } catch (error) {
        showAlert('Erreur: ' + error.message, 'error');
    }
}

// === CALCULATOR ===
calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const selectedId = recipeSelect.value;
    const recipe = recipes.find(r => r.id === selectedId);
    
    if (!recipe) {
        showAlert('Veuillez sélectionner une recette', 'error');
        return;
    }
    
    const desiredQuantity = parseFloat(document.getElementById('outputQuantity').value);
    const recipeQuantity = recipe.output.quantity;
    const ratio = desiredQuantity / recipeQuantity;
    
    let resultHTML = `<div class="result-item">
        <span class="result-label">Recette</span>
        <span class="result-value">${recipe.name}</span>
    </div>`;
    
    resultHTML += `<div class="result-item">
        <span class="result-label">Production</span>
        <span class="result-value">${desiredQuantity} ${recipe.output.unit}</span>
    </div>`;
    
    resultHTML += `<div class="result-item" style="border-top: 2px solid var(--border); padding-top: 20px;">
        <span class="result-label" style="font-weight: 700;">Ingrédients nécessaires:</span>
    </div>`;
    
    recipe.ingredients.forEach(ing => {
        const neededQuantity = (ing.quantity * ratio).toFixed(3);
        resultHTML += `<div class="result-item">
            <span class="result-label">${ing.name}</span>
            <span class="result-value">${neededQuantity} ${ing.unit}</span>
        </div>`;
    });
    
    document.getElementById('resultContent').innerHTML = resultHTML;
    document.getElementById('calculatorResult').style.display = 'block';
});

// Update output unit when recipe is selected
recipeSelect.addEventListener('change', (e) => {
    const recipe = recipes.find(r => r.id === e.target.value);
    if (recipe) {
        document.getElementById('outputUnit').value = recipe.output.unit;
    }
});

planRecipeSelect.addEventListener('change', (e) => {
    const recipe = recipes.find(r => r.id === e.target.value);
    if (recipe) {
        document.getElementById('planUnit').value = recipe.output.unit;
    }
});

// === PLANNER ===
plannerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const selectedId = planRecipeSelect.value;
    const recipe = recipes.find(r => r.id === selectedId);
    
    if (!recipe) {
        showAlert('Veuillez sélectionner une recette', 'error');
        return;
    }
    
    const plan = {
        recipeId: selectedId,
        recipeName: recipe.name,
        date: document.getElementById('planDate').value,
        quantity: parseFloat(document.getElementById('planQuantity').value),
        unit: recipe.output.unit,
        notes: document.getElementById('planNotes').value,
        createdAt: new Date().toISOString()
    };
    
    try {
        const response = await fetch(`${API_BASE}/plans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(plan)
        });
        
        if (!response.ok) throw new Error('Erreur lors de la sauvegarde du plan');
        
        showAlert('Plan de production créé!');
        plannerForm.reset();
        document.getElementById('planUnit').value = '';
        loadPlans();
    } catch (error) {
        showAlert('Erreur: ' + error.message, 'error');
    }
});

clearPlanBtn.addEventListener('click', () => {
    plannerForm.reset();
    document.getElementById('planUnit').value = '';
});

async function loadPlans() {
    try {
        const response = await fetch(`${API_BASE}/plans`);
        plans = await response.json();
        displayPlans();
    } catch (error) {
        showAlert('Erreur lors du chargement des plans', 'error');
    }
}

function displayPlans() {
    const hasPlans = plans.length > 0;
    noPlans.style.display = hasPlans ? 'none' : 'block';
    plansList.innerHTML = '';
    
    // Sort by date
    const sortedPlans = [...plans].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedPlans.forEach(plan => {
        const date = new Date(plan.date).toLocaleDateString('fr-FR');
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${plan.recipeName}</h3>
            <div class="recipe-info">
                <div class="recipe-info-item">
                    <span class="recipe-info-label">Date:</span>
                    <span class="recipe-info-value">${date}</span>
                </div>
                <div class="recipe-info-item">
                    <span class="recipe-info-label">Quantité:</span>
                    <span class="recipe-info-value">${plan.quantity} ${plan.unit}</span>
                </div>
                ${plan.notes ? `<div class="recipe-info-item"><span class="recipe-info-label">Notes:</span><span class="recipe-info-value">${plan.notes}</span></div>` : ''}
            </div>
            <div class="recipe-actions">
                <button class="btn-delete-plan" data-id="${plan.id}">🗑️ Supprimer</button>
            </div>
        `;
        
        card.querySelector('.btn-delete-plan').addEventListener('click', () => deletePlan(plan.id));
        plansList.appendChild(card);
    });
}

async function deletePlan(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plan?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/plans/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        
        showAlert('Plan supprimé!');
        loadPlans();
    } catch (error) {
        showAlert('Erreur: ' + error.message, 'error');
    }
}

// === INITIALIZATION ===
function init() {
    initTheme();
    loadRecipes();
    
    // Set today's date as default in planner
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('planDate').value = today;
}

init();
