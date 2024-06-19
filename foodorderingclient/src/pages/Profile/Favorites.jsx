import React from 'react'
import { useSelector } from 'react-redux'
import RestaurantCard from '../Restaurant/RestaurantCard'

function Favorites() {

  const { favorites } = useSelector(state => state.auth)


  return (
    <div className=' p-8'>
      {
        favorites.length > 0 ? (
          <div className="flex flex-wrap lg:gap-10 gap-3 justify-center">
            {favorites?.map((restaurant, index) => (
              <RestaurantCard restaurant={restaurant} />
            ))}
          </div>
        ) : <h1 className="text-center text-2xl mt-14">No favorites yet</h1>
      }
    </div>
  )
}

export default Favorites