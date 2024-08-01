import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, Card, CardContent, Container, Grid, Icon, Link, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GeneratedRecipes = () => {
  const location = useLocation();
  const { recipes, selectedVegies = [], selectedIngredients = [] } = location.state || { recipes: [], selectedVegies: [], selectedIngredients: [] }

  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ height: "510px" }}>
        {recipes.length > 0 ? (
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => {

              const availableVegies = recipe.vegies.filter(vegie => selectedVegies.includes(vegie.name));
              const requiredVegies = recipe.vegies.filter(vegie => !selectedVegies.includes(vegie.name));
              const availableIngredients = recipe.mainingredients.filter(ingredient => selectedIngredients.includes(ingredient.name));
              const requiredIngredients = recipe.mainingredients.filter(ingredient => !selectedIngredients.includes(ingredient.name));

              return (
                <Grid item lg={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{recipe.name}</Typography>
                      <Box mt={2} display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{ fontSize: "14.5px",marginRight:"3px" }}>available vegies :</Typography>  
                          <Typography key={index} sx={{fontSize:"14.5px"}} color="primary">{availableVegies.map(vegie=>vegie.name).join(',')}</Typography>
                      </Box>
                      <Box mt={1} display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{ fontSize: "14.5px",marginRight:"3px" }}>available ingredients :</Typography>  
                          <Typography key={index} sx={{fontSize:"14.5px"}} color="primary">{availableIngredients.map(ingredient=>ingredient.name).join(',')}</Typography>
                      </Box>
                    
                      <Box mt={1} display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{ fontSize: "14.5px",marginRight:"3px" }}>required vegies :</Typography>  
                          <Typography key={index} sx={{fontSize:"14.5px"}} color="error">{requiredVegies.map(vegie=>vegie.name).join(',')}</Typography>
                      </Box>
                      {requiredIngredients.length>0 &&<Box mt={1} display="flex" flexDirection="row" alignItems="center">
                        <Typography sx={{ fontSize: "14.5px",marginRight:"3px" }}>required ingredients :</Typography>  
                          <Typography key={index} sx={{fontSize:"14.5px"}} color="error">{requiredIngredients.map(ingredient=>ingredient.name).join(',')}</Typography>
                      </Box>}
                      <Box mt={2}>
                      <Link sx={{textDecoration:"none",display:"flex",alignItems:"center",cursor:"pointer"}} onClick={()=>navigate('/getfullrecipe')}>Get full recipe<Icon style={{ marginBottom: "4px" }}><KeyboardArrowRight /></Icon></Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )

            })}
          </Grid>
        ) : (
          <Typography variant="h6">No Recipes found</Typography>
        )

        }
      </Box>
    </Container>
  )
}

export default GeneratedRecipes