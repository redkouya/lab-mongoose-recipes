const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
mongoose.set('strictQuery', false);
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Ramen",
      level: "Amateur Chef",
      ingredients: ["Chicken", "Dog", "Noodles", "Carrot", "Peppers"],
      cuisine: "Japanese",
      dishType: "soup",
      image: "https://user-images.githubusercontent.com/23629340/38369283-ac1bda62-38e7-11e8-9c9b-d9df623f1bc3.jpg",
      duration: 60,
      creator: "Fatima"
    })
    
  })
  .then((recipe)=> {
    console.log(recipe.title);

    return Recipe.insertMany(data)
  })
  .then((allRecipes) => {
    allRecipes.forEach((recipe) => console.log(recipe.title))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
