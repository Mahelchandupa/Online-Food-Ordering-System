import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselItems = [
    {
        id: 1,
        img: "https://plus.unsplash.com/premium_photo-1669742928007-71b99d6ab1dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
        title: 'Hot Pizza',
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1622001618569-eae18fee3a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
        title: 'Delicious Noodles',
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww",
        title: 'Roast Chicken',
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1565976469782-7c92daebc42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
        title: 'Spaghetti',
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1605888969139-42cca4308aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwYWdoZXR0aXxlbnwwfHwwfHx8MA%3D%3D",
        title: 'Burger',
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fHww",
        title: 'Chicken Wings',
    },
]
const TopMealsCarousel = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1624,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <Slider
            {...settings}
            className=' w-full'
        >
            {
                carouselItems.map(item => (
                    <TopMealItem item={item}/>
                ))
            }
        </Slider>
    )
}

export default TopMealsCarousel


const TopMealItem = ({item}) => {
    return (
        <div key={item.id} className='flex flex-col items-center justify-center'>
            <div className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full overflow-hidden'>
                <img className='w-full h-full object-cover' src={item.img} alt={item.title} />
            </div>
            <span className=' py-4 font-semibold text-md text-center'>{item.title}</span>
        </div>
    )
}