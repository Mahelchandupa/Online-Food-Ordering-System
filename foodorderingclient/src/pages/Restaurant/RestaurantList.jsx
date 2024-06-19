import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchResturants } from '../../redux/slices/restaurantSlice';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {

    const { restaurants, loading, error, message } = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchResturants())
    }, [dispatch])


    return (
        <div className="flex flex-wrap lg:gap-10 gap-3 justify-center">
            {restaurants?.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant}/>
            ))}
        </div>
    );
}

export default RestaurantList;
