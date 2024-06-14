import React from 'react'
import EventCard from './EventCard'

function Events() {
  return (
    <div className=' flex flex-wrap  gap-6 justify-center mt-8'>
      {
        [1,1,1,1].map((item, index) => <EventCard />)
      }
    </div>
  )
}

export default Events