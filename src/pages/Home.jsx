import { KeyboardArrowRight, MenuBook } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Container, Grid, Icon, Link, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Home = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://recipegenerate-backend.onrender.com/api/recipes/allrecipes');

        const latestRecipes = response.data.recipes.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

        setRecipes(latestRecipes);
      } catch (error) {
        console.error("unable to fecth latest recipes", error);
      }
    }
    fetchRecipes();
  }, [])

  return (

    <Container>
      <Box sx={{height:"510px"}}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h4" mb={2} color="secondary">
          Recipe Generator
        </Typography>
        <MenuBook sx={{ fontSize: "50px" }} color="secondary" />
        <Grid container spacing={2} mt={2} display="flex" justifyContent="center" >
          <Grid item xs={10} lg={11}>
            <Grid container spacing={3}>
              {recipes.map(recipe => (
                <Grid item lg={3}>
                  <Card variant="outlined" sx={{ minHeight: "130px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent>
                      <Typography sx={{ fontSize: "15px" }}>{recipe.name}</Typography>
                      <Box mt={2}>
                        <Link color="secondary" sx={{ cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" }}>Generate <Icon style={{ marginBottom: "4px" }}><KeyboardArrowRight /></Icon></Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

          </Grid>
        </Grid>
      </Box>


    </Container>

  )
}

export default Home