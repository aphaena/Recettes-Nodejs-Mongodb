// ingredientRoutes.test.js
const supertest = require('supertest');
const app = require('../app'); // Assurez-vous que le chemin est correct
const { clearScreenDown } = require('readline');
const request = supertest('http://localhost:3000');

let ingredientId;

// Ou si vous utilisez directement l'application Express :
//  const request = supertest(app);

describe('Le serveur répond bien sur /api/v1/ingredients', () => {
    test('GET /api/v1/ingredients', async () => {
        const response = await request.get('/api/v1/ingredients');
        expect(response.statusCode).toBe(200);
        // Autres assertions...
    });
});

describe('Tous les ingrédients sont bien structurés', () => {
    test('GET /api/v1/ingredients', async () => {
        const response = await request.get('/api/v1/ingredients');
        expect(response.statusCode).toBe(200);

        // Vérifiez la structure de la réponse
        expect(response.body.status).toBe('success');
        expect(response.body.results).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(response.body.data.ingredients)).toBeTruthy();

        // Vérifiez la structure de chaque ingrédient
        response.body.data.ingredients.forEach(ingredient => {
            expect(ingredient).toHaveProperty('nutritionInfo');
            expect(ingredient).toHaveProperty('nutritionInfo.calories');
            expect(ingredient).toHaveProperty('nutritionInfo.protein');
            expect(ingredient).toHaveProperty('nutritionInfo.fat');
            expect(ingredient).toHaveProperty('_id');
            expect(ingredient).toHaveProperty('name');
            expect(ingredient).toHaveProperty('quantite');
            expect(ingredient).toHaveProperty('__v');

            // Vérifiez les types de données
            if (ingredient.nutritionInfo.calories !== null) {
                expect(typeof ingredient.nutritionInfo.calories).toBe('number');
            } else {
                expect(ingredient.nutritionInfo.calories).toBeNull();
            }

            if (ingredient.nutritionInfo.protein !== null) {
                expect(typeof ingredient.nutritionInfo.protein).toBe('number');
            } else {
                expect(ingredient.nutritionInfo.protein).toBeNull();
            }

            if (ingredient.nutritionInfo.fat !== null) {
                expect(typeof ingredient.nutritionInfo.fat).toBe('number');
            } else {
                expect(ingredient.nutritionInfo.fat).toBeNull();
            }
            expect(typeof ingredient._id).toBe('string');
            expect(typeof ingredient.name).toBe('string');
            expect(typeof ingredient.quantite).toBe('number');
            expect(typeof ingredient.__v).toBe('number');
        });
    });
});



describe('POST /api/v1/ingredients/ingredient', () => {
  it('doit créer un nouvel ingrédient et retourner les détails de l\'ingrédient', async () => {
    const newIngredient = {
      name: "Farine de blé T55",
      quantite: 100,
      nutritionInfo: {
        calories: 50,
        protein: 50,
        fat: 1
      }
    };

    const response = await request.post('/api/v1/ingredients/ingredient')
      .send(newIngredient)
      .expect('Content-Type', /json/)
      .expect(201);

    ingredientId = response.body.data.ingredient._id; // Stocker l'ID pour les tests suivant et le delete

    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('ingredient');
    expect(response.body.data.ingredient.name).toBe(newIngredient.name);
    expect(response.body.data.ingredient.quantite).toBe(newIngredient.quantite);
    expect(response.body.data.ingredient.nutritionInfo).toEqual(newIngredient.nutritionInfo);
    expect(response.body.data.ingredient).toHaveProperty('_id');
    expect(response.body.data.ingredient).toHaveProperty('__v');
  });
});

describe('POST /api/v1/ingredients/ingredient', () => {
  it('avec des données incorrectes : doit renvoyer une erreur 400 en raison de données manquantes', async () => {
    const incorrectData = {
      nom: "Farine de blé T55", // Champ incorrect, devrait être 'name'
      quantite: 100,
      nutritionInfo: {
        calories: 50,
        protein: 50,
        fat: 1
      }
    };

    const response = await request.post('/api/v1/ingredients/ingredient')
      .send(incorrectData)
      .expect('Content-Type', /json/)
      .expect(400); // S'attend à une erreur 400 Bad Request

    expect(response.body.status).toBe('fail');
    expect(response.body).toHaveProperty('message', 'Ingredient validation failed: name: Path `name` is required.');
  });
});




describe('GET /api/v1/ingredients/ingredient/:id', () => {
  it('doit retourner les détails d\'un ingrédient spécifique', async () => {
    // const ingredientId = '65a813dd979d884761a25c3b';
    // le test récupère l'id de l'ingrédeient précédent dans ingredientId

    const response = await request.get(`/api/v1/ingredients/ingredient/${ingredientId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('ingredient');
    expect(response.body.data.ingredient).toHaveProperty('_id', ingredientId);
    expect(response.body.data.ingredient).toHaveProperty('name', 'Farine de blé T55');
    expect(response.body.data.ingredient).toHaveProperty('quantite', 100);
    expect(response.body.data.ingredient).toHaveProperty('nutritionInfo');
    expect(response.body.data.ingredient.nutritionInfo).toEqual({
      calories: 50,
      protein: 50,
      fat: 1
    });
    expect(response.body.data.ingredient).toHaveProperty('__v', 0);
  });
});


describe('PATCH /api/v1/ingredients/ingredient/:id', () => {
    it('doit mettre à jour un ingrédient et retourner les détails mis à jour', async () => {
      const updatedIngredient = {
        name: "Farine de blé mise à jour",
        quantite: 150,
        nutritionInfo: {
          calories: 350,
          protein: 11,
          fat: 0.8
        }
      };
  
      const response = await request.patch(`/api/v1/ingredients/ingredient/${ingredientId}`)
        .send(updatedIngredient)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('ingredient');
      expect(response.body.data.ingredient._id).toBe(ingredientId);
      expect(response.body.data.ingredient.name).toBe(updatedIngredient.name);
      expect(response.body.data.ingredient.quantite).toBe(updatedIngredient.quantite);
      expect(response.body.data.ingredient.nutritionInfo).toEqual(updatedIngredient.nutritionInfo);
      expect(response.body.data.ingredient).toHaveProperty('__v', 0);
    });
  });


describe('DELETE /api/v1/ingredients/ingredient/:id', () => {
  it('doit supprimer un ingrédient et retourner un message de confirmation success', async () => {
    const response = await request.delete(`/api/v1/ingredients/ingredient/${ingredientId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('message', 'Ingrédient supprimé');
  });
});

//test une deuxème fois le delete pour voir si l'erreur est bien gérée
describe('DELETE /api/v1/ingredients/ingredient/:id', () => {
    it('doit supprimer un ingrédient et retourner un message de confirmation fail', async () => {
      const response = await request.delete(`/api/v1/ingredients/ingredient/${ingredientId}`)
        .expect('Content-Type', /json/)
        .expect(404);
  
      expect(response.body.status).toBe('fail');
      expect(response.body.data).toHaveProperty('message', 'Ingrédient non trouvé');
    });
  });