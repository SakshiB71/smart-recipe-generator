// Sample recipe data - moved here to avoid import issues
const recipes = {
  "recipes": [
    {
      "id": 1,
      "title": "Fresh Tomato Pasta",
      "image": "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400",
      "ingredients": ["tomato", "pasta", "garlic", "basil", "olive oil", "cheese"],
      "instructions": ["Cook pasta", "Sauté garlic", "Add tomatoes", "Mix with pasta", "Garnish with basil"],
      "cookingTime": 20,
      "servings": 2,
      "difficulty": "Easy",
      "rating": 4.5,
      "dietary": ["vegetarian"]
    },
    {
      "id": 2,
      "title": "Vegetable Stir Fry",
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
      "ingredients": ["onion", "garlic", "bell pepper", "carrot", "soy sauce", "ginger"],
      "instructions": ["Chop vegetables", "Stir fry garlic", "Add vegetables", "Add sauce", "Serve hot"],
      "cookingTime": 15,
      "servings": 2,
      "difficulty": "Easy",
      "rating": 4.2,
      "dietary": ["vegetarian", "vegan"]
    },
    {
      "id": 3,
      "title": "Caprese Salad",
      "image": "https://images.unsplash.com/photo-1563379091339-03246963d96f?w=400",
      "ingredients": ["tomato", "cheese", "basil", "olive oil", "balsamic"],
      "instructions": ["Slice tomatoes", "Layer with cheese", "Add basil", "Drizzle oil"],
      "cookingTime": 10,
      "servings": 2,
      "difficulty": "Easy",
      "rating": 4.7,
      "dietary": ["vegetarian", "gluten-free"]
    },
    {
      "id": 4,
      "title": "Garlic Bread",
      "image": "https://images.unsplash.com/photo-1573140247632-f2fd2a5d5d20?w=400",
      "ingredients": ["bread", "garlic", "butter", "herbs", "cheese"],
      "instructions": ["Mix garlic with butter", "Spread on bread", "Bake until golden", "Add herbs"],
      "cookingTime": 15,
      "servings": 4,
      "difficulty": "Easy",
      "rating": 4.3,
      "dietary": ["vegetarian"]
    },
    {
      "id": 5,
      "title": "Fruit Salad",
      "image": "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400",
      "ingredients": ["apple", "banana", "orange", "berries", "honey", "yogurt"],
      "instructions": ["Chop fruits", "Mix together", "Add honey", "Serve with yogurt"],
      "cookingTime": 10,
      "servings": 2,
      "difficulty": "Easy",
      "rating": 4.6,
      "dietary": ["vegetarian", "gluten-free"]
    },
    {
      "id": 6,
      "title": "Tomato Soup",
      "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
      "ingredients": ["tomato", "onion", "garlic", "vegetable broth", "cream", "herbs"],
      "instructions": ["Sauté onions and garlic", "Add tomatoes and broth", "Simmer and blend", "Add cream and herbs"],
      "cookingTime": 25,
      "servings": 4,
      "difficulty": "Easy",
      "rating": 4.4,
      "dietary": ["vegetarian"]
    },
    {
      "id": 7,
      "title": "Onion Rings",
      "image": "https://images.unsplash.com/photo-1573080496213-b6d6c8cc6d6e?w=400",
      "ingredients": ["onion", "flour", "eggs", "breadcrumbs", "oil", "spices"],
      "instructions": ["Slice onions", "Coat in flour", "Dip in eggs", "Bread and fry", "Season and serve"],
      "cookingTime": 20,
      "servings": 4,
      "difficulty": "Medium",
      "rating": 4.1,
      "dietary": ["vegetarian"]
    },
    {
      "id": 8,
      "title": "Garlic Butter Shrimp",
      "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
      "ingredients": ["shrimp", "garlic", "butter", "lemon", "parsley", "pasta"],
      "instructions": ["Cook pasta", "Sauté garlic in butter", "Add shrimp and cook", "Add lemon and parsley", "Mix with pasta"],
      "cookingTime": 15,
      "servings": 2,
      "difficulty": "Easy",
      "rating": 4.8,
      "dietary": []
    },
    {
      "id": 9,
      "title": "Berry Smoothie",
      "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
      "ingredients": ["berries", "banana", "yogurt", "milk", "honey"],
      "instructions": ["Combine all ingredients", "Blend until smooth", "Serve immediately"],
      "cookingTime": 5,
      "servings": 2,
      "difficulty": "Easy",
      "rating": 4.6,
      "dietary": ["vegetarian", "gluten-free"]
    },
    {
      "id": 10,
      "title": "Cheese Omelette",
      "image": "https://images.unsplash.com/photo-1551782453-4b67ba17e2a5?w=400",
      "ingredients": ["eggs", "cheese", "butter", "salt", "pepper", "herbs"],
      "instructions": ["Beat eggs", "Melt butter in pan", "Cook eggs", "Add cheese and fold", "Season and serve"],
      "cookingTime": 10,
      "servings": 1,
      "difficulty": "Easy",
      "rating": 4.3,
      "dietary": ["vegetarian", "gluten-free"]
    }
  ]
};

// Interfaces
export interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  dietary: string[];
  matchScore?: number;
}

export interface MatchOptions {
  maxCookingTime?: number;
  dietary?: string[];
  difficulty?: string;
}

// Smart recipe matching algorithm
export function matchRecipes(
  availableIngredients: string[],
  options: MatchOptions = {}
): Recipe[] {
  if (availableIngredients.length === 0) {
    return [];
  }

  return recipes.recipes
    .map(recipe => {
      // Calculate ingredient matches
      const matchedIngredients = recipe.ingredients.filter(recipeIngredient =>
        availableIngredients.some(availableIngredient =>
          recipeIngredient.toLowerCase().includes(availableIngredient.toLowerCase()) ||
          availableIngredient.toLowerCase().includes(recipeIngredient.toLowerCase())
        )
      );

      // Calculate match score (percentage of recipe ingredients matched)
      const baseMatchScore = (matchedIngredients.length / recipe.ingredients.length) * 100;
      
      // Bonus for using more of the available ingredients
      const usageBonus = (matchedIngredients.length / availableIngredients.length) * 30;
      
      // Penalty for missing ingredients
      const missingIngredients = recipe.ingredients.length - matchedIngredients.length;
      const missingPenalty = missingIngredients * 5;
      
      // Final score with bonuses and penalties
      let finalScore = baseMatchScore + usageBonus - missingPenalty;
      finalScore = Math.max(0, Math.min(100, finalScore)); // Clamp between 0-100

      return { 
        ...recipe, 
        matchScore: Math.round(finalScore) 
      };
    })
    .filter(recipe => {
      // Apply filters
      if (options.maxCookingTime && recipe.cookingTime > options.maxCookingTime) {
        return false;
      }
      
      if (options.dietary && options.dietary.length > 0) {
        const hasMatchingDietary = options.dietary.some(diet => 
          recipe.dietary.includes(diet)
        );
        if (!hasMatchingDietary) return false;
      }
      
      if (options.difficulty && recipe.difficulty !== options.difficulty) {
        return false;
      }
      
      // Only show recipes with at least 40% match score
      return recipe.matchScore >= 40;
    })
    .sort((a, b) => b.matchScore! - a.matchScore!)
    .slice(0, 12); // Limit to top 12 results
}

// Enhanced ingredient substitution system
export const substitutionMap: { [key: string]: string[] } = {
  'milk': ['almond milk', 'soy milk', 'oat milk', 'coconut milk', 'cream'],
  'eggs': ['applesauce', 'banana', 'yogurt', 'silken tofu', 'flax egg'],
  'butter': ['coconut oil', 'olive oil', 'avocado', 'margarine', 'ghee'],
  'flour': ['almond flour', 'oat flour', 'coconut flour', 'whole wheat flour'],
  'sugar': ['honey', 'maple syrup', 'agave nectar', 'stevia', 'brown sugar'],
  'cream': ['coconut cream', 'cashew cream', 'greek yogurt', 'milk'],
  'cheese': ['nutritional yeast', 'tofu', 'vegan cheese', 'cottage cheese'],
  'meat': ['tofu', 'tempeh', 'seitan', 'mushrooms', 'beans'],
  'chicken': ['tofu', 'tempeh', 'jackfruit', 'mushrooms', 'beans'],
  'beef': ['lentils', 'mushrooms', 'walnuts', 'beans', 'tofu'],
  'fish': ['tofu', 'tempeh', 'jackfruit', 'chickpeas', 'eggplant']
};

export function getSubstitutions(ingredient: string): string[] {
  const lowerIngredient = ingredient.toLowerCase();
  
  // Find matching substitutions
  for (const [key, substitutes] of Object.entries(substitutionMap)) {
    if (lowerIngredient.includes(key) || key.includes(lowerIngredient)) {
      return substitutes;
    }
  }
  
  return [];
}

// Get missing ingredients for a recipe
export function getMissingIngredients(recipe: Recipe, availableIngredients: string[]): string[] {
  return recipe.ingredients.filter(recipeIngredient =>
    !availableIngredients.some(availableIngredient =>
      recipeIngredient.toLowerCase().includes(availableIngredient.toLowerCase()) ||
      availableIngredient.toLowerCase().includes(recipeIngredient.toLowerCase())
    )
  );
}

// Get recipe by ID
export function getRecipeById(id: number): Recipe | undefined {
  return recipes.recipes.find(recipe => recipe.id === id);
}

// Get all recipes (for debugging)
export function getAllRecipes(): Recipe[] {
  return recipes.recipes;
}

// Get unique dietary options from all recipes
export function getAvailableDietaryOptions(): string[] {
  const allDietary = recipes.recipes.flatMap(recipe => recipe.dietary);
  return [...new Set(allDietary)].sort();
}

// Get unique difficulties
export function getAvailableDifficulties(): string[] {
  const difficulties = recipes.recipes.map(recipe => recipe.difficulty);
  return [...new Set(difficulties)];
}

// Get cooking time ranges
export function getCookingTimeRanges(): { min: number; max: number } {
  const times = recipes.recipes.map(recipe => recipe.cookingTime);
  return {
    min: Math.min(...times),
    max: Math.max(...times)
  };
}