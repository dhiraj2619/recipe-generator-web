import { KeyboardArrowRight} from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Icon, Link, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import logoImage from '../img/cookbook.png';
import { ScaleLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://recipegenerate-backend.onrender.com/api/recipes/allrecipes');

        const latestRecipes = response.data.recipes.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

        setRecipes(latestRecipes);
        
      } catch (error) {
        console.error("unable to fecth latest recipes", error);
        
      }finally{
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [])


  if(loading){
     return (
       <Box sx={{height:"510px"}}  display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
          <ScaleLoader size={70} color="#8a2be2" loading={loading}/>
       </Box>
     )
  }
  return (

    <Container>
      <Box sx={{height:"510px"}}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h4" mb={2} color="inherit">
          Recipe Generator
        </Typography>
        <img src={logoImage} width="70px" alt="" />
        <Grid container spacing={2} mt={2} display="flex" justifyContent="center" >
          <Grid item xs={10} lg={11}>
            <Grid container spacing={3}>
              {recipes.map(recipe => (
                <Grid item lg={3}>
                  <Card variant="outlined" sx={{ minHeight: "130px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CardContent>
                      <Typography sx={{ fontSize: "15px" }}>{recipe.name}</Typography>
                      <Box mt={2}>
                        <Link color="primary" sx={{ cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" }} onClick={()=>navigate('/getfullrecipe')}>Generate <Icon style={{ marginBottom: "4px" }}><KeyboardArrowRight /></Icon></Link>
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