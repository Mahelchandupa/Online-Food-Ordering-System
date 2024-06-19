import { truncateText } from '../../utils/TruncateText';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToFavorite } from '../../redux/slices/authSlice';
import { Card, Chip, IconButton, useTheme } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function RestaurantCard({ restaurant }) {

    const { favorites } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const theme = useTheme();

    const isOpen = true;

    const handleNavigate = (id) => {
        if (isOpen) navigate(`/restaurant/${id}`);
    }

    const addFavorite = (restaurantId) => {
        dispatch(addToFavorite(restaurantId))
    }

    return (
        <Card className=" w-[15rem] lg:w-[18rem] min-h-80" style={{ backgroundColor: theme.palette.background.nav }}>
            <div onClick={() => handleNavigate(restaurant?.id)} className={`${restaurant?.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
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
                    <IconButton onClick={() => addFavorite(restaurant?.id)}>
                        {favorites.some(item => item.id === restaurant?.id) ? <FavoriteIcon style={{ color: theme.palette.secondary.main }} /> : <FavoriteBorderIcon style={{ color: theme.palette.secondary.main }} />}
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}

export default RestaurantCard