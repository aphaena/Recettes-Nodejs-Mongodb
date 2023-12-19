import React from 'react';

const CategorySelect = ({ categories, selectedCategory, onCategorySelect, onAddNewCategory, newCategory, setNewCategory }) => {
  return (
    <div>
      <label htmlFor="category">Catégorie :</label>
      <select name="category" value={selectedCategory} onChange={onCategorySelect}>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
        <option value="other">Autre</option>
      </select>

      {selectedCategory === 'other' && (
        <div>
          <input 
            type="text" 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="Nouvelle catégorie" 
          />
          <button onClick={onAddNewCategory}>Ajouter Catégorie</button>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
