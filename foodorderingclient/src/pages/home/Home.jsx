import HeaderCarousel from '../../components/HeaderCarousel';
import RestaurantCard from '../../components/RestaurantCard';
import Title from '../../components/Title';
import TopMealsCarousel from '../../components/TopMealsCarousel';

const Home = () => {
    return (
        <div className=' '>
            <HeaderCarousel />
            <div className='w-full px-5 lg:px-[120px] md:px-[60px] flex flex-col justify-center'>
                <Title>Top Meals</Title>
                <TopMealsCarousel />
            </div>
            <div className='w-full px-5 lg:px-[120px] md:px-[60px] flex flex-col justify-center mb-11'>
                <Title>Order From Our Handpicked Favorites</Title>
                <RestaurantCard />
            </div>
        </div>
    );
};

export default Home;