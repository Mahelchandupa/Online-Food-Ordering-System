import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useThemeContext } from '../Theme/ThemeContext';
import { useTheme } from '@mui/material/styles';

const MenuCard = () => {

    const { mode } = useThemeContext()
    const theme = useTheme()

    const ingredientItems = [
        {
            category: "Nuts & Seeds",
            ingredients: [
                "Cashews"
            ]
        },
        {
            category: "Protein",
            ingredients: [
                "Protein",
                "Bacon Strips"
            ],
        },
        {
            category: "Vegetables",
            ingredients: [
                "Potatoes",
                "Tomatoes",
                "Onions"
            ],
        },
        {
            category: "Dairy",
            ingredients: [
                "Milk",
                "Cheese"
            ],
        },
        {
            category: "Meat",
            ingredients: [
                "Chicken",
                "Beef"
            ],
        },
        {
            category: "Fruits",
            ingredients: [
                "Apples",
                "Oranges"
            ],
        }
    ]

    const handleCheckBoxChange = (ingredient) => {
       console.log(ingredient)
    }

    return (
        <div>
            <Accordion style={{ backgroundColor: theme.palette.background.nav }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className=' lg:flex items-center justify-between lg:gap-5'>
                        <div className=' lg:flex items-center'>
                            <img
                                className=' w-[7rem] h-[7rem] object-cover'
                                src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt=""
                            />
                        </div>
                        <div className=' space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className=' font-semibold text-xl sm:mt-2'>Burger</p>
                            <p>Rs. 567.00</p>
                            <p className=' text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <form>
                        <div className=' flex gap-5 flex-wrap'>
                            {
                                ingredientItems?.map((item, key) =>
                                    <div key={key}>
                                        <p className=' font-bold text-md'>{item.category}</p>
                                        <FormGroup>
                                            {
                                                item?.ingredients?.map((ingredient, ingredientIndex) =>
                                                    <FormControlLabel key={ingredientIndex} control={<Checkbox onChange={() => handleCheckBoxChange(ingredient)}/>} label={ingredient} />
                                                )
                                            }
                                        </FormGroup>
                                    </div>
                                )
                            }
                        </div>
                        <div className=' pt-5'>
                            <Button type='submit' variant="contained" disabled={false}>{true ? "Add To Cart" : "Out Of Stock"}</Button>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default MenuCard