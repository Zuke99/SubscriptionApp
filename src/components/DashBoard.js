import React from 'react'
import Navbar from './Navbar'

function DashBoard() {
  return (
    <div>
      <Navbar/>
      <form>
        <input
            placeholder='Title'
            type='text'
        />
        <input type='file' />
      </form>
    </div>
  )
}

export default DashBoard
