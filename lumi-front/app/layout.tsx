import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideBar from '../components/custom/sideBar'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lumi',
  description: 'Dashboard de contas de energia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} lg:flex overflow-hidden`}>
          <SideBar />
          {children}
        </body>
      </Providers>
    </html>
  )
}
