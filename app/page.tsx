"use client"
import { useState, useEffect } from 'react'

// Prevent hydration errors by mounting components only after hydration
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  
  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

// Move the dynamic import and TimelineSlider import to the top
// since we're already in a client component
import dynamic from 'next/dynamic'
import TimelineSlider from '../components/TimelineSlider'

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
})


const ProfileMenu = dynamic(() => import('../components/ProfileMenu'), {
  ssr: false,
})
// Wrap components that need client-side features in a ClientOnly component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Interactive Historical Map</h1>
      <div className="w-full max-w-6xl">
        <MapComponent />
        <TimelineSlider />
      </div>
      <div className="prose prose-stone mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">How to use this map:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click the menu icon in the top left corner to access saved events, explore menu, or mini lessons</li>
          <li>Use the timeline slider or input field to choose a specific year between 3000 BC and 1850 AD</li>
          <li>Observe how the political boundaries change on the map</li>
          <li>Use the zoom controls in the bottom right of the map to zoom in and out</li>
          <li>Click on highlighted areas to learn about important events (coming soon)</li>
          <li>Access your profile, friends, and puzzle games using the profile icon in the top right corner</li>
        </ol>
      </div>
    </div>
  )
}


