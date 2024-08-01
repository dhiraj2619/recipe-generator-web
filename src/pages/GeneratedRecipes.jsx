import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const GeneratedRecipes = () => {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] }

  return (
    <Container>
      <Box>
        {recipes.length > 0 ? (
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => (
              <Grid item lg={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{recipe.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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