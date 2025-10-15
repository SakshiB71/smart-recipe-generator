import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

class ImageClassifier {
  private model: mobilenet.MobileNet | null = null;
  private isLoaded = false;

  async loadModel() {
    try {
      console.log('Loading MobileNet model...');
      this.model = await mobilenet.load();
      this.isLoaded = true;
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }

  async classifyImage(imageElement: HTMLImageElement): Promise<string[]> {
    if (!this.model || !this.isLoaded) {
      await this.loadModel();
    }

    if (!this.model) {
      throw new Error('Model failed to load');
    }

    const predictions = await this.model.classify(imageElement);
    
    // Filter for food-related predictions and map to ingredients
    const foodKeywords = [
      'fruit', 'vegetable', 'food', 'dish', 'meal', 'produce',
      'tomato', 'onion', 'garlic', 'apple', 'banana', 'orange',
      'carrot', 'potato', 'broccoli', 'lettuce', 'spinach',
      'bread', 'cheese', 'meat', 'chicken', 'fish', 'egg',
      'pasta', 'rice', 'bean', 'nut', 'herb', 'spice'
    ];

    const ingredients = predictions
      .filter(pred => 
        foodKeywords.some(keyword => 
          pred.className.toLowerCase().includes(keyword)
        )
      )
      .map(pred => {
        // Simple mapping from classification to ingredient names
        const className = pred.className.toLowerCase();
        if (className.includes('tomato')) return 'tomato';
        if (className.includes('onion')) return 'onion';
        if (className.includes('garlic')) return 'garlic';
        if (className.includes('carrot')) return 'carrot';
        if (className.includes('potato')) return 'potato';
        if (className.includes('broccoli')) return 'broccoli';
        if (className.includes('apple')) return 'apple';
        if (className.includes('banana')) return 'banana';
        if (className.includes('orange')) return 'orange';
        if (className.includes('cheese')) return 'cheese';
        if (className.includes('bread')) return 'bread';
        if (className.includes('pasta')) return 'pasta';
        if (className.includes('rice')) return 'rice';
        
        // Return the main word from classification
        return className.split(',')[0].split(' ')[0];
      })
      .filter((ingredient, index, self) => 
        ingredient && self.indexOf(ingredient) === index
      )
      .slice(0, 8); // Limit to top 8 ingredients

    return ingredients;
  }
}

export const imageClassifier = new ImageClassifier();