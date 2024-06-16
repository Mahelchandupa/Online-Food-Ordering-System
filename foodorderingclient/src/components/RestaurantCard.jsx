import { Card, Chip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchResturants } from '../redux/slices/restaurantSlice';
import { truncateText } from '../utils/TruncateText';

const RestaurantCard = () => {

    const { restaurants, loading, error, message } = useSelector(state => state.restaurants)
    const dispatch = useDispatch()

    useEffect( () => {
       dispatch(fetchResturants())
    }, [dispatch])

    return (
        <div className="flex flex-wrap lg:gap-10 gap-3 justify-center">
            {restaurants?.map((restaurant, index) => (
                <ResCard key={index} restaurant={restaurant}/>
            ))}
        </div>
    );
}

export default RestaurantCard;

const ResCard = ({ restaurant }) => {
    const isOpen = true;
    const isFavorite = false;

    const theme = useTheme();
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (isOpen) navigate(`/restaurant/${restaurant?.id}`);
    }

    return (
        <Card className=" w-[15rem] lg:w-[18rem] min-h-80" style={{ backgroundColor: theme.palette.background.nav}}>
            <div onClick={handleNavigate} className={`${restaurant?.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img
                    src={restaurant?.images[0]}
                    alt="Restaurant"
                    className="w-full h-[12rem] rounded-t-md object-cover"
                />
                <Chip
                    size="small"
                    color={restaurant?.open ? "success" : "error"}
                    label={restaurant?.open ? "open" : "closed"}
                    className="absolute top-2 left-2"
                />
            </div>
            <div className="p-4 textPart lg:flex justify-between w-full">
                <div className="space-y-1">
                    <p className="font-semibold text-lg">{restaurant?.name}</p>
                    <p className="text-sm">{truncateText(restaurant?.description, 100)}</p>
                </div>
                <div>
                    <IconButton>
                        {isFavorite ? <FavoriteIcon style={{ color: theme.palette.secondary.main }}/> : <FavoriteBorderIcon style={{ color: theme.palette.secondary.main }}/>}
                    </IconButton>
                </div>
            </div>
        </Card>
    );
}
