import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../../Theme/ThemeContext'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import { useState } from 'react';

const Restaurant = () => {

   const { mode } = useThemeContext();
   const theme = useTheme();

   const categories = [
      "pizza",
      "biriyani",
      "burger",
      "chicken",
      "rice"
   ]

   const foodTypes = [
      { label: "All", value: "all" },
      { label: "Vegetarain Only", value: "vegetarain" },
      { label: "Non-Vegetarain", value: "non_vegetarain" },
      { label: "Seasonal", value: "seasonal" },
   ]

   const [foodType, setFoodType] = useState('all')

   const handleFilter = (e) => {
      console.log(e.target.value)
   }

   return (
      <div className=' px-5 lg:px-20 py-6'>
         <section>
            <h3 className=' py-2'>Home / Srilanka / Restaurant / 1</h3>
            <div>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <img className=' w-full h-[40vh] object-cover' src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                     <img className=' w-full h-[40vh] object-cover' src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                     <img className=' w-full h-[40vh] object-cover' src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                  </Grid>
               </Grid>
            </div>
            <div className=' pt-6 pb-5'>
               <h1 className=' text-4xl font-semibold mb-2'>Restaurant</h1>
               <div className=' flex flex-col gap-4'>
                  <p className={` lg:max-w-[80%]`} style={{ color: theme.palette.background.gray }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate maxime non ea laudantium similique a corrupti fugit quos porro, atque, optio maiores suscipit at quod culpa natus sunt odio tempore!</p>
                  <span><AccessTimeIcon color='warning' /> Mon-Sun: 9.00 AM - 9.00 PM (Today)</span>
                  <span><PlaceIcon color='warning' /> Colombo, No 123</span>
               </div>
            </div>
         </section>
         <Divider />
         <section className=' pt-[2rem] lg:flex relative'>
            <div className=' space-y-10 lg:w-[20%] filter'>
               <div className=' box space-y-5 lg:sticky top-28'>
                  <div>
                     <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                        Food Type
                     </Typography>
                     <FormControl className=' py-10 space-y-5' component={"fieldset"}>
                        <RadioGroup onChange={handleFilter} name=' food_type' value={foodType}>
                           {
                              foodTypes.map((type, key) => (
                                 <FormControlLabel
                                    key={key}
                                    value={type.value}
                                    control={<Radio />}
                                    label={type.label}
                                 />
                              ))
                           }
                        </RadioGroup>
                     </FormControl>
                  </div>
                  <Divider />
                  <div>
                     <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                        Food Category
                     </Typography>
                     <FormControl className=' py-10 space-y-5' component={"fieldset"}>
                        <RadioGroup onChange={handleFilter} name=' food_type' value={foodType}>
                           {
                              categories.map((item, key) => (
                                 <FormControlLabel
                                    key={key}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                 />
                              ))
                           }
                        </RadioGroup>
                     </FormControl>
                  </div>
               </div>
            </div>
            <div className=' space-y-5 lg:w-[80%] lg:pl-10'>
               
            </div>
         </section>
      </div>
   )
}

export default Restaurant