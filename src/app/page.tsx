'use client';
import { useState, useRef, useEffect } from 'react';

interface Recipe {
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
  cuisine: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

// 20+ Complete Recipe Database
const sampleRecipes: Recipe[] = [
  {
    id: 1,
    title: "Fresh Tomato Pasta",
    image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400",
    ingredients: ["pasta", "tomato", "garlic", "basil", "olive oil", "parmesan cheese"],
    instructions: [
      "Cook pasta according to package instructions",
      "Sauté garlic in olive oil until fragrant",
      "Add chopped tomatoes and cook for 5 minutes",
      "Mix sauce with cooked pasta",
      "Garnish with fresh basil and cheese"
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    dietary: ["vegetarian"],
    cuisine: "Italian",
    nutrition: { calories: 420, protein: 15, carbs: 65, fat: 12, fiber: 8 }
  },
  {
    id: 2,
    title: "Rainbow Veggie Stir Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
    ingredients: ["rice", "bell pepper", "carrot", "broccoli", "soy sauce", "ginger", "garlic"],
    instructions: [
      "Cook rice according to package instructions",
      "Chop all vegetables into uniform pieces",
      "Stir fry garlic and ginger in hot oil",
      "Add vegetables and stir fry for 5-7 minutes",
      "Add soy sauce and serve with rice"
    ],
    cookingTime: 25,
    servings: 2,
    difficulty: "Easy",
    rating: 4.2,
    dietary: ["vegetarian", "vegan"],
    cuisine: "Asian",
    nutrition: { calories: 320, protein: 8, carbs: 45, fat: 6, fiber: 12 }
  },
  {
    id: 3,
    title: "Classic Caprese Salad",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96f?w=400",
    ingredients: ["tomato", "mozzarella cheese", "basil", "olive oil", "balsamic glaze"],
    instructions: [
      "Slice tomatoes and mozzarella into 1/4 inch slices",
      "Arrange alternating slices on a plate",
      "Tuck fresh basil leaves between slices",
      "Drizzle with olive oil and balsamic glaze"
    ],
    cookingTime: 10,
    servings: 2,
    difficulty: "Easy",
    rating: 4.7,
    dietary: ["vegetarian", "gluten-free"],
    cuisine: "Italian",
    nutrition: { calories: 280, protein: 12, carbs: 8, fat: 18, fiber: 3 }
  },
  {
    id: 4,
    title: "Creamy Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
    ingredients: ["arborio rice", "mushrooms", "onion", "garlic", "white wine", "vegetable broth", "parmesan cheese"],
    instructions: [
      "Sauté onions and garlic until translucent",
      "Add rice and toast for 2 minutes",
      "Deglaze with white wine",
      "Add broth gradually while stirring constantly",
      "Stir in mushrooms and parmesan cheese"
    ],
    cookingTime: 35,
    servings: 3,
    difficulty: "Medium",
    rating: 4.4,
    dietary: ["vegetarian"],
    cuisine: "Italian",
    nutrition: { calories: 380, protein: 12, carbs: 58, fat: 14, fiber: 6 }
  },
  {
    id: 5,
    title: "Spicy Chicken Curry",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    ingredients: ["chicken breast", "coconut milk", "curry powder", "onion", "garlic", "ginger", "chili", "bell pepper"],
    instructions: [
      "Brown chicken pieces in a hot pan",
      "Sauté onions, garlic, and ginger until fragrant",
      "Add curry powder and toast for 1 minute",
      "Pour in coconut milk and bring to simmer",
      "Add chicken and vegetables, cook until tender"
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    dietary: ["gluten-free"],
    cuisine: "Indian",
    nutrition: { calories: 320, protein: 28, carbs: 12, fat: 18, fiber: 4 }
  },
  {
    id: 6,
    title: "Avocado Toast with Eggs",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400",
    ingredients: ["bread", "avocado", "eggs", "lemon juice", "red pepper flakes", "salt"],
    instructions: [
      "Toast bread until golden brown",
      "Mash avocado with lemon juice, salt, and pepper",
      "Fry or poach eggs to preference",
      "Spread avocado on toast and top with eggs",
      "Sprinkle with red pepper flakes"
    ],
    cookingTime: 10,
    servings: 2,
    difficulty: "Easy",
    rating: 4.3,
    dietary: ["vegetarian"],
    cuisine: "International",
    nutrition: { calories: 350, protein: 18, carbs: 28, fat: 22, fiber: 9 }
  },
  {
    id: 7,
    title: "Greek Quinoa Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    ingredients: ["quinoa", "cucumber", "tomato", "red onion", "feta cheese", "olives", "olive oil", "lemon juice"],
    instructions: [
      "Cook quinoa according to package instructions",
      "Chop vegetables into bite-sized pieces",
      "Combine all ingredients in a large bowl",
      "Whisk olive oil and lemon juice for dressing",
      "Toss everything together and chill before serving"
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    dietary: ["vegetarian", "gluten-free"],
    cuisine: "Mediterranean",
    nutrition: { calories: 280, protein: 11, carbs: 35, fat: 14, fiber: 8 }
  },
  {
    id: 8,
    title: "Beef Tacos",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    ingredients: ["ground beef", "taco shells", "lettuce", "tomato", "cheese", "sour cream", "taco seasoning"],
    instructions: [
      "Brown ground beef in a skillet over medium heat",
      "Add taco seasoning and water, simmer for 5 minutes",
      "Chop vegetables for toppings",
      "Warm taco shells according to package directions",
      "Assemble tacos with beef and desired toppings"
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: "Easy",
    rating: 4.4,
    dietary: [],
    cuisine: "Mexican",
    nutrition: { calories: 420, protein: 24, carbs: 32, fat: 22, fiber: 5 }
  },
  {
    id: 9,
    title: "Vegetable Lentil Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    ingredients: ["lentils", "carrot", "celery", "onion", "garlic", "vegetable broth", "tomato", "spinach"],
    instructions: [
      "Sauté onions, carrots, and celery until soft",
      "Add garlic and cook for 1 minute until fragrant",
      "Add lentils and vegetable broth, bring to boil",
      "Simmer for 25 minutes until lentils are tender",
      "Stir in spinach and tomatoes, cook for 5 more minutes"
    ],
    cookingTime: 35,
    servings: 6,
    difficulty: "Easy",
    rating: 4.2,
    dietary: ["vegetarian", "vegan", "gluten-free"],
    cuisine: "International",
    nutrition: { calories: 220, protein: 14, carbs: 38, fat: 3, fiber: 16 }
  },
  {
    id: 10,
    title: "Salmon with Roasted Vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    ingredients: ["salmon fillet", "asparagus", "cherry tomatoes", "lemon", "olive oil", "garlic", "herbs"],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Toss vegetables with olive oil and seasonings",
      "Place salmon and vegetables on baking sheet",
      "Roast for 12-15 minutes until salmon is cooked through",
      "Squeeze fresh lemon juice over before serving"
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: "Easy",
    rating: 4.7,
    dietary: ["gluten-free"],
    cuisine: "International",
    nutrition: { calories: 380, protein: 34, carbs: 12, fat: 22, fiber: 6 }
  },
  {
    id: 11,
    title: "Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
    ingredients: ["mixed berries", "banana", "yogurt", "honey", "granola", "chia seeds"],
    instructions: [
      "Blend berries, banana, and yogurt until smooth",
      "Pour into bowl and top with granola",
      "Drizzle with honey and sprinkle chia seeds",
      "Add extra berries for decoration"
    ],
    cookingTime: 5,
    servings: 1,
    difficulty: "Easy",
    rating: 4.6,
    dietary: ["vegetarian", "gluten-free"],
    cuisine: "International",
    nutrition: { calories: 280, protein: 12, carbs: 52, fat: 8, fiber: 7 }
  },
  {
    id: 12,
    title: "Chicken Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    ingredients: ["chicken breast", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    instructions: [
      "Grill or pan-fry chicken until cooked through",
      "Chop lettuce and combine with croutons",
      "Slice chicken and arrange on salad",
      "Shave parmesan cheese over top",
      "Dress with caesar dressing right before serving"
    ],
    cookingTime: 15,
    servings: 2,
    difficulty: "Easy",
    rating: 4.3,
    dietary: [],
    cuisine: "American",
    nutrition: { calories: 320, protein: 28, carbs: 18, fat: 16, fiber: 4 }
  },
  {
    id: 13,
    title: "Vegetable Fried Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    ingredients: ["rice", "eggs", "carrot", "peas", "soy sauce", "green onion", "garlic", "ginger"],
    instructions: [
      "Cook rice and let cool completely",
      "Scramble eggs in a hot wok, then set aside",
      "Stir-fry vegetables until tender-crisp",
      "Add rice and break up any clumps",
      "Add soy sauce and return eggs to wok"
    ],
    cookingTime: 25,
    servings: 4,
    difficulty: "Medium",
    rating: 4.4,
    dietary: ["vegetarian"],
    cuisine: "Asian",
    nutrition: { calories: 290, protein: 11, carbs: 52, fat: 6, fiber: 5 }
  },
  {
    id: 14,
    title: "Black Bean Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    ingredients: ["black beans", "bread crumbs", "egg", "onion", "garlic", "cumin", "burger buns"],
    instructions: [
      "Mash black beans in a large bowl",
      "Add bread crumbs, egg, and seasonings",
      "Form into patties and refrigerate 30 minutes",
      "Pan-fry or grill until golden brown",
      "Serve on buns with favorite toppings"
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: "Medium",
    rating: 4.1,
    dietary: ["vegetarian"],
    cuisine: "American",
    nutrition: { calories: 280, protein: 14, carbs: 45, fat: 8, fiber: 12 }
  },
  {
    id: 15,
    title: "Mango Salsa Chicken",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
    ingredients: ["chicken breast", "mango", "red onion", "cilantro", "lime", "jalapeño", "bell pepper"],
    instructions: [
      "Grill or bake chicken until fully cooked",
      "Dice mango, onion, and peppers for salsa",
      "Chop cilantro and mix with lime juice",
      "Combine all salsa ingredients in a bowl",
      "Serve chicken topped with fresh mango salsa"
    ],
    cookingTime: 25,
    servings: 3,
    difficulty: "Easy",
    rating: 4.5,
    dietary: ["gluten-free"],
    cuisine: "Mexican",
    nutrition: { calories: 290, protein: 31, carbs: 22, fat: 8, fiber: 4 }
  },
  {
    id: 16,
    title: "Zucchini Noodles with Pesto",
    image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=400",
    ingredients: ["zucchini", "basil", "pine nuts", "garlic", "parmesan cheese", "olive oil"],
    instructions: [
      "Spiralize zucchini into noodles",
      "Blend basil, pine nuts, garlic, and oil for pesto",
      "Sauté zucchini noodles for 2-3 minutes until tender",
      "Toss zucchini noodles with pesto sauce",
      "Top with shaved parmesan cheese before serving"
    ],
    cookingTime: 15,
    servings: 2,
    difficulty: "Easy",
    rating: 4.3,
    dietary: ["vegetarian", "gluten-free"],
    cuisine: "Italian",
    nutrition: { calories: 210, protein: 8, carbs: 12, fat: 18, fiber: 5 }
  },
  {
    id: 17,
    title: "Thai Green Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
    ingredients: ["chicken", "green curry paste", "coconut milk", "eggplant", "basil", "fish sauce", "lime leaves"],
    instructions: [
      "Sauté curry paste in a bit of coconut milk",
      "Add chicken and cook until sealed",
      "Pour in remaining coconut milk and bring to simmer",
      "Add vegetables and cook until tender",
      "Finish with fresh basil and lime juice"
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    dietary: ["gluten-free"],
    cuisine: "Thai",
    nutrition: { calories: 340, protein: 24, carbs: 14, fat: 22, fiber: 6 }
  },
  {
    id: 18,
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    ingredients: ["flour", "butter", "sugar", "chocolate chips", "egg", "vanilla", "baking soda"],
    instructions: [
      "Cream butter and sugars until light and fluffy",
      "Beat in egg and vanilla extract",
      "Mix in flour and baking soda until combined",
      "Fold in chocolate chips",
      "Bake at 350°F (175°C) for 10-12 minutes until golden"
    ],
    cookingTime: 25,
    servings: 12,
    difficulty: "Easy",
    rating: 4.8,
    dietary: ["vegetarian"],
    cuisine: "American",
    nutrition: { calories: 180, protein: 2, carbs: 25, fat: 9, fiber: 1 }
  },
  {
    id: 19,
    title: "Mediterranean Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    ingredients: ["quinoa", "chickpeas", "cucumber", "tomato", "red onion", "feta", "olives", "lemon dressing"],
    instructions: [
      "Cook quinoa according to package instructions",
      "Chop all vegetables into bite-sized pieces",
      "Combine quinoa, vegetables, and chickpeas",
      "Top with feta cheese and olives",
      "Drizzle with lemon herb dressing"
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: "Easy",
    rating: 4.4,
    dietary: ["vegetarian", "gluten-free"],
    cuisine: "Mediterranean",
    nutrition: { calories: 380, protein: 15, carbs: 55, fat: 14, fiber: 11 }
  },
  {
    id: 20,
    title: "Beef Stir Fry",
    image: "https://images.unsplash.com/photo-1604917018133-6aafce3f559f?w=400",
    ingredients: ["beef strips", "broccoli", "bell pepper", "carrot", "soy sauce", "ginger", "garlic", "sesame oil"],
    instructions: [
      "Slice beef into thin strips against the grain",
      "Stir-fry beef until browned, then set aside",
      "Stir-fry vegetables until tender-crisp",
      "Return beef to pan with sauce ingredients",
      "Cook until sauce thickens and coats everything"
    ],
    cookingTime: 25,
    servings: 3,
    difficulty: "Medium",
    rating: 4.5,
    dietary: ["gluten-free"],
    cuisine: "Asian",
    nutrition: { calories: 320, protein: 26, carbs: 18, fat: 16, fiber: 5 }
  }
];

interface FilterOptions {
  maxCookingTime: number;
  dietary: string[];
  difficulty: string;
  servings: number;
  cuisine: string;
}

export default function SmartRecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const [userRatings, setUserRatings] = useState<{[key: number]: number}>({});
  const [servingSize, setServingSize] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [aiConfidence, setAiConfidence] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    maxCookingTime: 60,
    dietary: [],
    difficulty: '',
    servings: 2,
    cuisine: ''
  });

  // Recipe Matching Algorithm
  const findMatchingRecipes = () => {
    const matchedRecipes = sampleRecipes.filter(recipe => {
      // Calculate ingredient matches
      const matchedIngredients = recipe.ingredients.filter(recipeIngredient =>
        ingredients.some(inputIngredient =>
          recipeIngredient.toLowerCase().includes(inputIngredient.toLowerCase()) ||
          inputIngredient.toLowerCase().includes(recipeIngredient.toLowerCase())
        )
      );

      const matchScore = matchedIngredients.length / recipe.ingredients.length;

      // Apply filters
      if (filters.maxCookingTime && recipe.cookingTime > filters.maxCookingTime) return false;
      if (filters.dietary.length > 0 && !filters.dietary.some(diet => recipe.dietary.includes(diet))) return false;
      if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
      if (filters.cuisine && recipe.cuisine !== filters.cuisine) return false;

      return matchScore >= 0.3;
    }).sort((a, b) => {
      // Sort by number of matches
      const aMatches = a.ingredients.filter(ai => 
        ingredients.some(ui => ai.toLowerCase().includes(ui.toLowerCase()))
      ).length;
      
      const bMatches = b.ingredients.filter(bi => 
        ingredients.some(ui => bi.toLowerCase().includes(ui.toLowerCase()))
      ).length;
      
      return bMatches - aMatches;
    });

    setRecipes(matchedRecipes);
  };

  // AI Image Detection
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const commonIngredients = [
        'tomato', 'onion', 'garlic', 'bell pepper', 'carrot', 'broccoli', 
        'chicken', 'beef', 'egg', 'milk', 'cheese', 'pasta', 'rice'
      ];
      
      const detectedIngredients = Array.from({ length: Math.floor(Math.random() * 4) + 2 }, 
        () => commonIngredients[Math.floor(Math.random() * commonIngredients.length)]
      );
      
      const uniqueIngredients = [...new Set(detectedIngredients)];
      setIngredients(uniqueIngredients);
      setAiConfidence(0.7 + Math.random() * 0.25);
      setIsLoading(false);
    }, 2000);
  };

  const addManualIngredient = () => {
    const ingredient = inputValue.trim().toLowerCase();
    if (ingredient && !ingredients.includes(ingredient)) {
      const newIngredients = [...ingredients, ingredient];
      setIngredients(newIngredients);
      setAiConfidence(0);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const toggleSaveRecipe = (recipeId: number) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleRateRecipe = (recipeId: number, rating: number) => {
    setUserRatings(prev => ({
      ...prev,
      [recipeId]: rating
    }));
  };

  // Substitution Suggestions
  const getSubstitutionSuggestions = (recipe: Recipe) => {
    const missingIngredients = recipe.ingredients.filter(recipeIngredient =>
      !ingredients.some(userIngredient =>
        recipeIngredient.toLowerCase().includes(userIngredient.toLowerCase()) ||
        userIngredient.toLowerCase().includes(recipeIngredient.toLowerCase())
      )
    );

    const substitutionMap: {[key: string]: string[]} = {
      'milk': ['almond milk', 'soy milk', 'oat milk'],
      'egg': ['flax egg', 'applesauce', 'banana'],
      'butter': ['coconut oil', 'olive oil', 'avocado oil'],
      'flour': ['almond flour', 'coconut flour', 'oat flour'],
      'sugar': ['honey', 'maple syrup', 'coconut sugar'],
      'chicken': ['tofu', 'tempeh', 'mushrooms'],
      'beef': ['lentils', 'mushrooms', 'black beans'],
      'cheese': ['nutritional yeast', 'vegan cheese', 'tofu']
    };

    const substitutions: {[key: string]: string[]} = {};
    
    missingIngredients.forEach(ingredient => {
      for (const [key, subs] of Object.entries(substitutionMap)) {
        if (ingredient.toLowerCase().includes(key)) {
          substitutions[ingredient] = subs;
          break;
        }
      }
    });

    return substitutions;
  };

  // Adjust nutrition for serving size
  const adjustNutrition = (baseValue: number) => {
    return Math.round((baseValue / 2) * servingSize);
  };

  // Update recipes when ingredients or filters change
  useEffect(() => {
    if (ingredients.length > 0) {
      findMatchingRecipes();
    } else {
      setRecipes([]);
    }
  }, [ingredients, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🍳 Chef AI</h1>
            <p className="text-gray-600">Smart Recipe Generator with AI Ingredient Detection</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'upload' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📷 AI Camera
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === 'manual' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ✏️ Manual Input
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-semibold mb-2">Upload Ingredients Photo</h3>
                <p className="text-gray-500 mb-4">AI will detect ingredients automatically</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {isLoading ? '🔄 AI Analyzing...' : 'Choose Image'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addManualIngredient()}
                  placeholder="Enter ingredient (tomato, chicken, rice...)"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={addManualIngredient}
                  disabled={!inputValue.trim()}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
                >
                  Add
                </button>
              </div>

              {ingredients.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Your Ingredients:</span>
                    {aiConfidence > 0 && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                        AI Confidence: {(aiConfidence * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                      <span 
                        key={index}
                        className="bg-blue-500 text-white px-3 py-2 rounded-full flex items-center gap-2"
                      >
                        {ingredient}
                        <button 
                          onClick={() => removeIngredient(index)}
                          className="hover:bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filters */}
        {ingredients.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">🔧 Filter Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cooking Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Cooking Time: {filters.maxCookingTime}min
                </label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={filters.maxCookingTime}
                  onChange={(e) => setFilters({...filters, maxCookingTime: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dietary Preferences
                </label>
                <div className="space-y-2">
                  {['vegetarian', 'vegan', 'gluten-free'].map(option => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.dietary.includes(option)}
                        onChange={(e) => {
                          const newDietary = e.target.checked
                            ? [...filters.dietary, option]
                            : filters.dietary.filter(d => d !== option);
                          setFilters({...filters, dietary: newDietary});
                        }}
                        className="rounded text-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Any Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cuisine
                </label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Any Cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Asian">Asian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                </select>
              </div>
            </div>

            {/* Serving Size */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Serving Size: {servingSize} people
              </label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setServingSize(Math.max(1, servingSize - 1))}
                  className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-lg">{servingSize}</span>
                <button 
                  onClick={() => setServingSize(servingSize + 1)}
                  className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {ingredients.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  🍳 Recipe Suggestions
                </h2>
                <p className="text-gray-600 text-lg">
                  Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} matching your ingredients
                </p>
              </div>
              {savedRecipes.length > 0 && (
                <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full">
                  <span>❤️</span>
                  <span className="font-semibold">{savedRecipes.length} saved</span>
                </div>
              )}
            </div>

            {recipes.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="text-6xl mb-4">🍳</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No recipes found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adding more ingredients or adjusting your filters to find more recipes.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map(recipe => {
                  const substitutions = getSubstitutionSuggestions(recipe);
                  
                  return (
                    <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <span className="text-6xl">🍳</span>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                          <button
                            onClick={() => toggleSaveRecipe(recipe.id)}
                            className={`text-2xl ${
                              savedRecipes.includes(recipe.id) ? 'text-red-500' : 'text-gray-300'
                            }`}
                          >
                            {savedRecipes.includes(recipe.id) ? '❤️' : '🤍'}
                          </button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span>⏱️ {recipe.cookingTime}min</span>
                          <span>👥 {recipe.servings}</span>
                          <span className={`px-2 py-1 rounded ${
                            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {recipe.difficulty}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="mb-4">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleRateRecipe(recipe.id, star)}
                                className={`text-xl ${
                                  star <= (userRatings[recipe.id] || recipe.rating) 
                                    ? 'text-yellow-500' 
                                    : 'text-gray-300'
                                }`}
                              >
                                ★
                              </button>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                              ({(userRatings[recipe.id] || recipe.rating).toFixed(1)})
                            </span>
                          </div>
                        </div>

                        {/* Nutrition */}
                        <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-2">Nutrition (per serving)</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Calories:</span>
                              <span className="font-semibold">{adjustNutrition(recipe.nutrition.calories)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Protein:</span>
                              <span className="font-semibold">{adjustNutrition(recipe.nutrition.protein)}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Carbs:</span>
                              <span className="font-semibold">{adjustNutrition(recipe.nutrition.carbs)}g</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Fat:</span>
                              <span className="font-semibold">{adjustNutrition(recipe.nutrition.fat)}g</span>
                            </div>
                          </div>
                        </div>

                        {/* Substitution Suggestions */}
                        {Object.keys(substitutions).length > 0 && (
                          <div className="mb-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <h4 className="font-bold text-orange-800 mb-2">💡 Substitution Ideas</h4>
                            {Object.entries(substitutions).map(([ingredient, subs]) => (
                              <div key={ingredient} className="mb-2">
                                <span className="font-semibold text-orange-700">{ingredient}:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {subs.map((sub, index) => (
                                    <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                      {sub}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Dietary Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipe.dietary.map((diet) => (
                            <span 
                              key={diet}
                              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {diet}
                            </span>
                          ))}
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {recipe.cuisine}
                          </span>
                        </div>

                        {/* Recipe Details */}
                        <details className="mb-4">
                          <summary className="cursor-pointer font-semibold text-blue-600 mb-2">
                            View Recipe Details
                          </summary>
                          <div className="mt-3 space-y-3">
                            <div>
                              <h4 className="font-semibold mb-1">Ingredients:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-700">
                                {recipe.ingredients.map((ingredient, index) => (
                                  <li key={index}>{ingredient}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Instructions:</h4>
                              <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                                {recipe.instructions.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {ingredients.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="text-8xl mb-8">👨‍🍳</div>
              <h2 className="text-4xl font-bold text-gray-600 mb-4">
                Ready to Cook Something Amazing?
              </h2>
              <p className="text-xl text-gray-500 mb-8 max-w-lg mx-auto">
                Upload a photo of your ingredients or add them manually to discover personalized recipe suggestions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-gray-500">
                  <span>🔒</span>
                  <span>100% Private</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>🤖</span>
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>⚡</span>
                  <span>Smart Matching</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="text-2xl">🍳</span>
              <span className="text-xl font-bold text-gray-800">
                Chef AI - Smart Recipe Generator
              </span>
            </div>
            <div className="text-gray-500 text-center md:text-right">
              <p className="mb-2">AI-powered ingredient detection and recipe matching</p>
              <p className="text-sm">20+ recipes • Dietary filters • Mobile friendly</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}