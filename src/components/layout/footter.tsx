import Link from 'next/link'
import { Github } from 'lucide-react'


export default function Footer() {  
    return (
        <footer className="bg-[#1a1a1a] text-[#f2f0ed] py-6 px-4 border-t border-[#333333]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <nav className="mb-4 md:mb-0">
        <ul className="flex space-x-6 text-sm">
          <li><Link href="/dashboard" className="hover:text-[#ff4800] transition-colors">Dashboard</Link></li>
          <li><Link href="/roadmap" className="hover:text-[#ff4800] transition-colors">Roadmap</Link></li>
          <li><Link href="/changelog" className="hover:text-[#ff4800] transition-colors">Changelog</Link></li>
          <li><Link href="/login" className="hover:text-[#ff4800] transition-colors">Login</Link></li>
          <li><Link href="/register" className="hover:text-[#ff4800] transition-colors">Register</Link></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Link href="https://github.com/remcostoeten" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4800] transition-colors">
          <Github size={24} />
        </Link>
        <div className="text-sm">
          Built with <span className="animate-pulse inline-block">❤️</span> by{' '}
          <Link href="https://github.com/remcostoeten" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#ff4800] transition-colors">
            remco stoeten
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

