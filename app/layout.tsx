import './globals.css'
import { Montserrat, Inter } from 'next/font/google'
import TimelineDropdown from '../components/TimelineDropdown'
import ProfileMenu from '../components/ProfileMenu'
import Link from 'next/link'
import { Globe, Home } from 'lucide-react'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

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
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </head>
      <body className={`font-inter bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <header className="glass-effect border-b border-emerald-900/20 p-4 relative z-50">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-2">
                <TimelineDropdown />
              </div>
              
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Globe className="w-8 h-8 text-emerald-400 animate-pulse-slow" />
                  <span className="text-2xl font-montserrat font-bold gradient-text">
                    Historical Atlas
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="button-primary p-2 rounded-lg hover:opacity-80 transition-all"
                  title="Home"
                >
                  <Home className="w-5 h-5" />
                </Link>
                <ProfileMenu />
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4 relative">
            {children}
          </main>
          <footer className="glass-effect border-t border-emerald-900/20 p-4 text-center">
            <p>&copy; 2023 Interactive Historical Map. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

