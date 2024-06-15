import { Card, Chip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = () => {

    const restaurants = [1, 1, 1, 1, 1, 1, 1];

    return (
        <div className="flex flex-wrap lg:gap-10 gap-3 justify-center">
            {restaurants.map((res, index) => (
                <ResCard key={index} id={1}/>
            ))}
        </div>
    );
}

export default RestaurantCard;

const ResCard = ({ id }) => {
    const isOpen = true;
    const isFavorite = false;

    const theme = useTheme();
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (isOpen) navigate(`/restaurant/${id}`);
    }

    return (
        <Card className=" w-[15rem] lg:w-[18rem] min-h-80" style={{ backgroundColor: theme.palette.background.nav}}>
            <div onClick={handleNavigate} className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
                    alt="Restaurant"
                    className="w-full h-[12rem] rounded-t-md object-cover"
                />
                <Chip
                    size="small"
                    color={isOpen ? "success" : "error"}
                    label={isOpen ? "open" : "closed"}
                    className="absolute top-2 left-2"
                />
            </div>
            <div className="p-4 textPart lg:flex justify-between w-full">
                <div className="space-y-1">
                    <p className="font-semibold text-lg">Restaurant</p>
                    <p className="text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
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
