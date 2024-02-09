const express = require('express');
const app = express();
const PORT = 3222;

app.use(express.json());
let recipes = [
    {
        id: 1,
        title: 'Dal Batti',
        description: 'Dal Baati is a traditional Rajasthani dish.',
        cuisine: 'Rajasthani',
        prep_time: '30 min',
        difficulty: 'Medium',
        imageUrl: 'images/i1.jpg',
    },
    {
        id: 2,
        title: 'Dal Dhokli',
        description: 'Dal Dhokla is a savory steamed dish',
        cuisine: 'Rajasthani', 
        prep_time: '30 min',
        difficulty: 'Hard',
        imageUrl: 'images/i2.jpg',
    },
    {
        id: 3,
        title: 'Pizza',
        description: 'Pizza is an Italian dish',
        cuisine: 'Italian',
        prep_time: '45 min',
        difficulty: 'Easy',
        imageUrl: 'images/i3.jpg',
    }
];

app.get('/recipes', (req, res) => {
    res.send( recipes )
});


app.get('/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
    //let foundRecipe = false;
  
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === recipeId) {
        res.send(recipes[i])
        //foundRecipe=true;
        break;
      }
    }
  if(!recipes[i]){
    res.status(404).send("NOT FOUND")
  }
});

app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);
  res.status(201).json({ recipe: newRecipe });
});

app.put('/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const uRecipe = req.body;
  for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === recipeId) {
          recipes[i] = { 
            ...recipes[i], 
            ...uRecipe 
          }
          res.json({ recipe: recipes[i] });
          return;
      }
  }

  res.status(404).send("NOT FOUND");
});

app.delete('/recipes/:id', (req, res) => {
  const deleteItemId = parseInt(req.params.id);
  let recipes_new = [];

  for (let i = 0; i < recipes.length; i++) {
      if (i !== deleteItemId) {
          recipes_new.push(recipes[i]);
      }
  }
  if (recipes.length === recipes_new.length) {
      res.status(404).send("NOT FOUND");
  } else {
      recipes = recipes_new;
      res.json({ message: 'Deleted successfully' });
  }
});




  app.listen(PORT, () => {
    console.log(`Listening at port number ${PORT}`);
});