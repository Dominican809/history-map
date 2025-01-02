import './globals.css'
import { Inter } from 'next/font/google'
import TimelineDropdown from '../components/TimelineDropdown'
import ProfileMenu from '../components/ProfileMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Interactive Historical Map',
  description: 'Explore political geography changes over time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </head>
      <body className={`${inter.className} bg-stone-100 text-stone-800`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-stone-200 border-b border-stone-300 p-4 relative z-50">
            <nav className="flex justify-between items-center">
              <TimelineDropdown />
              <ProfileMenu />
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4 relative">
            {children}
          </main>
          <footer className="bg-stone-200 border-t border-stone-300 p-4 text-center">
            <p>&copy; 2023 Interactive Historical Map. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

