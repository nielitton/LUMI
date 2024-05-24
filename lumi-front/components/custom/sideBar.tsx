import { FileScan, LayoutDashboard, User } from 'lucide-react'
import Link from 'next/link'

export default function SideBar() {
  return (
    <div className="flex lg:flex-col items-center gap-10 p-6 lg:w-48 w-screen lg:h-screen h-25 shadow-xl">
      <div className="flex flex-col justify-center items-center gap-2 border rounded-full p-8 shadow-md">
        <User color="#1DB954" />
        <span className="text-green-spotify">Gabriel</span>
      </div>
      <nav className="flex lg:flex-col flex-wrap justify-center gap-3">
        <Link
          className="flex gap-2 bg-green-spotify text-white transition-all duration-300 p-2 lg:p4 rounded-md hover:bg-black-spotify hover:text-white"
          href="/"
        >
          <LayoutDashboard /> Dashboard
        </Link>
        <Link
          className="flex gap-2 bg-green-spotify text-white transition-all duration-75 p-2 lg:p4 rounded-md hover:bg-black-spotify hover:text-white"
          href="/invoices"
        >
          <FileScan /> Faturas
        </Link>
      </nav>
    </div>
  )
}
