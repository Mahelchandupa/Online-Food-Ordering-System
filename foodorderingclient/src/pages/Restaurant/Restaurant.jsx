import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect, useState } from 'react';
import MenuCard from '../../components/MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRestaurantById } from '../../redux/slices/restaurantSlice';

const Restaurant = () => {

   const theme = useTheme();
   const dispatch = useDispatch()
   const { restaurant } = useSelector(state => state.restaurants)
   const navigate = useNavigate()

   const { restaurantId } = useParams()

   useEffect(() => {
      dispatch(fetchRestaurantById(restaurantId))
   }, [restaurantId])

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

   const foodItem = [1, 1, 1, 1]

   return (
      <div className=' px-5 lg:px-20 py-6'>
         <section>
            <h3 className=' py-2'><span className=' cursor-pointer' onClick={() => navigate("/")}>Home</span> / {restaurant?.address?.country} / {restaurant?.name} / 1</h3>
            <div>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <img className=' w-full h-[40vh] object-cover' src={restaurant?.images[0]} alt="" />
                  </Grid>
                  <Grid item xs={12} lg={restaurant?.images.length > 2 ? 6 : 12}>
                     <img className=' w-full h-[40vh] object-cover' src={restaurant?.images[1]} alt="" />
                  </Grid>
                  {
                     restaurant?.images.length > 2 &&
                     <Grid item xs={12} lg={6}>
                        <img className=' w-full h-[40vh] object-cover' src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
                     </Grid>
                  }
               </Grid>
            </div>
            <div className=' pt-6 pb-5'>
               <h1 className=' text-4xl font-semibold mb-2'>{restaurant?.name}</h1>
               <div className=' flex flex-col gap-4'>
                  <p className={` lg:max-w-[80%]`} style={{ color: theme.palette.background.gray }}>{restaurant?.description}</p>
                  <span><AccessTimeIcon color='warning' /> {restaurant?.openingHours} (Today)</span>
                  <span><PlaceIcon color='warning' />{restaurant?.address.street}</span>
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
            <div className=' space-y-5 lg:w-[80%] lg:pl-10 sm:mt-6'>
               {
                  foodItem.map((item, key) => (
                     <MenuCard />
                  ))
               }
            </div>
         </section>
      </div>
   )
}

export default Restaurant