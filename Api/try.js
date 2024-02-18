const express = require('express');
const app = express();
const PORT = 3222;

app.use(express.json());

let recipes = [];

app.get('/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
    let foundRecipe = false;

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === recipeId) {
            res.send(recipes[i]);
            foundRecipe = true;
            break;
        }
    }

    if (!foundRecipe) {
        res.status(404).send("NOT FOUND");
    }
});

app.post('/recipes', (req, res) => {
    const newRecipe = req.body;
    newRecipe.id = Math.max(...recipes.map(recipe => recipe.id), 0) + 1;
    recipes.push(newRecipe);
    res.status(201).json({ recipe: newRecipe });
});

app.put('/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
    const uRecipe = req.body;
    let foundRecipe = false;

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === recipeId) {
            recipes[i] = { 
                ...recipes[i], 
                ...uRecipe 
            };
            res.json({ recipe: recipes[i] });
            foundRecipe = true;
            break;
        }
    }

    if (!foundRecipe) {
        res.status(404).send("NOT FOUND");
    }
});

app.delete('/recipes/:id', (req, res) => {
    const deleteItemId = parseInt(req.params.id, 10);
    let recipeIndexToDelete = -1;
    const recipes_new = [];

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === deleteItemId) {
            recipeIndexToDelete = i;
        } else {
            recipes_new.push(recipes[i]);
        }
    }

    if (recipeIndexToDelete === -1) {
        res.status(404).send("NOT FOUND");
    } else {
        recipes = recipes_new;
        res.json({ message: 'Deleted successfully' });
    }
});

app.listen(PORT, () => {
    console.log(`Listening at port number ${PORT}`);
});
