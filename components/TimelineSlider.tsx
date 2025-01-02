"use client"

import React, { useState } from 'react'
import ReactSlider from 'react-slider'

const TimelineSlider = () => {
  const [year, setYear] = useState(-3000)

  const handleSliderChange = (value: number) => {
    setYear(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = parseInt(e.target.value)
    if (!isNaN(inputYear) && inputYear >= -3000 && inputYear <= 1850) {
      setYear(inputYear)
    }
  }

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BC` : `${year} AD`
  }

  return (
    <div className="w-full mt-4">
      <ReactSlider
        className="w-full h-10 flex items-center"
        thumbClassName="w-6 h-6 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        trackClassName="h-2 bg-gray-300 rounded-full"
        min={-3000}
        max={1850}
        value={year}
        onChange={handleSliderChange}
        renderThumb={(props, state) => <div {...props} key={state.index}></div>}
      />
      <div className="flex justify-between mt-2">
        <span>3000 BC</span>
        <div className="flex items-center">
          <input
            type="number"
            value={year}
            onChange={handleInputChange}
            className="w-20 px-2 py-1 text-center border border-gray-300 rounded mr-2"
          />
          <span>{formatYear(year)}</span>
        </div>
        <span>1850 AD</span>
      </div>
    </div>
  )
}

export default TimelineSlider

