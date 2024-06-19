import { useSelector } from 'react-redux';
import HeaderCarousel from '../../components/HeaderCarousel';
import Title from '../../components/Title';
import TopMealsCarousel from '../../components/TopMealsCarousel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RestaurantList from '../Restaurant/RestaurantList';

const Home = () => {

    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/account/login')
        } 
    }, [])

    return (
        <div className=' '>
            <HeaderCarousel />
            <div className='w-full px-5 lg:px-[120px] md:px-[60px] flex flex-col justify-center'>
                <Title>Top Meals</Title>
                <TopMealsCarousel />
            </div>
            <div className='w-full px-5 lg:px-[120px] md:px-[60px] flex flex-col justify-center mb-11'>
                <Title>Order From Our Handpicked Favorites</Title>
                <RestaurantList />
            </div>
        </div>
    );
};

export default Home;