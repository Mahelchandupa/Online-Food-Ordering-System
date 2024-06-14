import { Button, Card } from '@mui/material'
import React from 'react'

function OrderCard() {
    return (
        <Card className=' flex justify-between items-center p-5'>
            <div className=' flex items-center space-x-5'>
                <img className=' h-16 w-16' src="https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg" alt="" />
                <div>
                    <p>Biriyani</p>
                    <p>Rs. 399.00</p>
                </div>
            </div>
            <div>
                <Button disabled variant='contained' className=" cursor-not-allowed">Completed</Button>
            </div>
        </Card>
    )
}

export default OrderCard