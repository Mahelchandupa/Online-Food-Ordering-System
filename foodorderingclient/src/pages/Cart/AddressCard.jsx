import { Button, Card, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useThemeContext } from '../../Theme/ThemeContext';

function AddressCard({ item, showButton, handleSelectAddress }) {

    const { mode } = useThemeContext();
    const theme = useTheme();
 
    return (
        <Card className=' flex gap-5 w-64 p-5' style={{ backgroundColor: `${ mode === "dark" ? "#EEe" : "#526D82"}`, color: `${ mode === "dark" ? "#000" : "#fff"}` }}>
            <HomeIcon />
            <div className=' space-y-3'>
                <h1 className=' font-semibold text-lg '>Home</h1>
                <p>
                   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, aut.  
                </p>
                {
                    showButton && <Button variant='contained' style={{ backgroundColor: theme.palette.secondary.main,  }} fullWidth onClick={() => handleSelectAddress()}>Select</Button>
                }
            </div>
        </Card>
    )
}

export default AddressCard