import { Box, Button, Chip,List, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { themeContext } from '../context/ThemeContext'
import axios from 'axios';
import '../css/componentcss/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

const Sidebar = () => {

  const { mode } = useContext(themeContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedVegies, setSelectedVegies] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://recipegenerate-backend.onrender.com/api/recipes/allrecipes');
        setRecipes(response.data.recipes);
        setLoading(false);
      } catch (error) {
        console.error("unable to fetch recipes", error);
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  const uniqueIngredients = new Set();
  const uniqueMainIngredients = new Set();

  recipes.forEach(recipe => {
    recipe.vegies.forEach(ingredient => {
      uniqueIngredients.add(ingredient.name);
    })
    recipe.mainingredients.forEach(mainIngredient => {
      uniqueMainIngredients.add(mainIngredient.name);
    })
  })

  const handleVegieClick = (vegie) => {
    setSelectedVegies((prev) => {
      if (prev.includes(vegie)) {
        return prev.filter(v => v !== vegie);
      }
      else {
        return [...prev, vegie];
      }
    })
  }

  const handleIngredientsClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      }
      else {
        return [...prev, ingredient];
      }
    })
  }


  const handleGenerateRecipes = async () => {
    if (selectedVegies.length >= 3 && selectedIngredients.length >= 2) {
      try {
        const response = await axios.post('https://recipegenerate-backend.onrender.com/api/recipes/match', {
          vegies: selectedVegies,
          ingredients: selectedIngredients
        });

        const filterdRecipes = response.data.recipes.filter(recipe => {
          const matchedVegies = recipe.vegies.filter(vegie => selectedVegies.includes(vegie.name));
          const matchedIngredients = recipe.mainingredients.filter(ingredient => selectedIngredients.includes(ingredient.name));
          return matchedVegies.length >= 3 && matchedIngredients.length >= 2;
        })

        navigate('/generatedRecipes', { state: { recipes: filterdRecipes,selectedVegies,selectedIngredients } })

      } catch (error) {
        console.error("Error generating recipes", error);
      }
    }
    else {
      alert("atleast 3 vegies and ingredients should match to find recipe");
    }

  }

  const handleResetAll=()=>{
    setSelectedVegies([]);
    setSelectedIngredients([]);
  }

  const isGerneratedButtonDisabled = selectedVegies.length >= 3 && selectedIngredients.length >= 2;
  return (
    <Box className="sidebar"
      sx={{

        bgcolor: mode === 'light' ? 'white' : '#171616',
        boxShadow: 3,
        zIndex: 1,
      }}
    >
      {loading ? (<Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ScaleLoader size={20} color="#8a2be2" />
      </Box>) :
        (<>
          <List component="nav" sx={{ padding: 2 }}>

            <Box my={2} >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontSize: "16px" }} component="div">Vegies/non veg</Typography>
                <Button onClick={handleResetAll}>Reset all</Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5" }}>
                {[...uniqueIngredients].map((vegie, index) => (
                  <Chip key={index} label={vegie} sx={{ margin: "5px", fontSize: "12px" }} color={selectedVegies.includes(vegie) ? 'success' : 'default'} onClick={() => handleVegieClick(vegie)} />
                ))}
              </Box>
            </Box>

            <Box my={2}>
              <Typography sx={{ fontSize: "16px" }} component="div" mb={2}>Main ingredients</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5" }}>
                {[...uniqueMainIngredients].map((ingredient, index) => (
                  <Chip key={index} label={ingredient} sx={{ margin: "5px", fontSize: "12px" }} color={selectedIngredients.includes(ingredient) ? 'primary' : 'default'} onClick={() => handleIngredientsClick(ingredient)} />
                ))}
              </Box>
            </Box>


          </List>
          <Box sx={{ bgcolor: mode === 'light' ? "white" : "#2b2a2a", height: "80px", boxShadow: "15", borderTopLeftRadius: "30px", borderTopRightRadius: "30px", textAlign: "center", position: "sticky", bottom: "-1px" }}>
            <Button className="gen_btn" disabled={!isGerneratedButtonDisabled} onClick={handleGenerateRecipes}>Generate</Button>
          </Box>
        </>)}

    </Box>

  )
}

export default Sidebar