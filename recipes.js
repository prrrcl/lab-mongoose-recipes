'use strict'

const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.js')
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
}).catch(err => {
  console.error('Error connecting to mongo', err);
});


// estas funciones lo ideal es que estén en otro archivo
const createOneRecipe = async () =>{
  try{
    const response = await Recipe.create({
      title: 'Brocoli con patatas',
      level: 'UltraPro Chef',
      ingredients: ['brocoli','patatas','ajo','aceite','sal'],
      cuisine: 'veggie',
      dishType: 'Dish',
      duration: 30,
      creator: 'Anna'
    });
    console.log(response.title)
  }
  catch(err){
    console.log(err)
  }
}

const addManyRecipes = async data =>{
  try{
    const response = await Recipe.insertMany(data)
    response.forEach(element => console.log(element));
  }
  catch(err){
    console.log(err);
  }
}

const updateDurationRecipe = async (title, duration) =>{
  try{
    const response = await Recipe.findOneAndUpdate({title}, {duration}, {new:true}) // new true es para que devuelva el actualizado
    console.log(response)
  }catch(err){
    console.log(err)
  }
}

const deleteRecipe = async title =>{
  try{
  const resp = await Recipe.deleteOne({title}); // {title : title}
  console.log(resp);
  }catch(err){
    console.log(err)
  }
  
}
createOneRecipe();
addManyRecipes(data);
updateDurationRecipe('Rigatoni alla Genovese', 50);
deleteRecipe('Carrot Cake')
 
