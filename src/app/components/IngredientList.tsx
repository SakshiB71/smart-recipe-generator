'use client';
import { useState } from 'react';
import { X, Plus, Filter } from 'lucide-react';

interface IngredientListProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (index: number) => void;
  filters: {
    maxCookingTime: number;
    dietary: string[];
    difficulty: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function IngredientList({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  filters,
  onFiltersChange
}: IngredientListProps) {
  const [newIngredient, setNewIngredient] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      onAddIngredient(newIngredient.trim().toLowerCase());
      setNewIngredient('');
    }
  };

  const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free'];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Detected Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {ingredient}
                <button
                  onClick={() => onRemoveIngredient(index)}
                  className="hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Add Ingredient Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
          placeholder="Add another ingredient..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddIngredient}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-t pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Max Cooking Time: {filters.maxCookingTime}min</label>
            <input
              type="range"
              min="10"
              max="120"
              step="10"
              value={filters.maxCookingTime}
              onChange={(e) => onFiltersChange({ ...filters, maxCookingTime: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    const newDietary = filters.dietary.includes(option)
                      ? filters.dietary.filter(d => d !== option)
                      : [...filters.dietary, option];
                    onFiltersChange({ ...filters, dietary: newDietary });
                  }}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    filters.dietary.includes(option)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Difficulty</label>
            <div className="flex gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, difficulty: '' })}
                className={`px-4 py-2 rounded-lg border ${
                  !filters.difficulty
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                Any
              </button>
              {difficultyOptions.map(option => (
                <button
                  key={option}
                  onClick={() => onFiltersChange({ ...filters, difficulty: option })}
                  className={`px-4 py-2 rounded-lg border ${
                    filters.difficulty === option
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}