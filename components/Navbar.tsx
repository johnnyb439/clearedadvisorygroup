'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/mock-interview', label: 'Mock Interview' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Get Started' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-command-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/images/cag-logo.png" 
                alt="Cleared Advisory Group Logo" 
                width={50} 
                height={50}
                className="object-contain"
              />
              <div>
                <span className="text-white font-montserrat font-bold text-xl">Cleared Advisory Group</span>
                <p className="text-sky-blue text-xs">Your Gateway to Opportunities</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-sky-blue transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            {/* User Account Links */}
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center text-white hover:text-sky-blue transition-colors duration-300"
              >
                <User size={20} className="mr-2" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-sky-blue transition-colors duration-300"
              >
                Sign In
              </Link>
            )}
            
            {/* American Flag */}
            <div className="flex items-center space-x-2 ml-4">
              <div className="w-8 h-5 relative bg-patriot-red">
                {/* Red and white stripes */}
                <div className="absolute inset-0 flex flex-col">
                  {[...Array(13)].map((_, i) => (
                    <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-patriot-red' : 'bg-white'}`}></div>
                  ))}
                </div>
                {/* Blue canton with 50 stars */}
                <div className="absolute top-0 left-0 w-[40%] h-[54%] bg-navy-blue flex items-center justify-center overflow-hidden">
                  <div className="text-white text-[3px] leading-[3px] tracking-[0.5px]">
                    ★★★★★★<br/>
                    ★★★★★<br/>
                    ★★★★★★<br/>
                    ★★★★★<br/>
                    ★★★★★★<br/>
                    ★★★★★<br/>
                    ★★★★★★<br/>
                    ★★★★★<br/>
                    ★★★★★★
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400">USA</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-sky-blue"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-ops-charcoal rounded-lg mt-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-sky-blue py-2 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* User Account Links in Mobile */}
            <div className="border-t border-gray-700 mt-4 pt-4">
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center text-white hover:text-sky-blue py-2 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} className="mr-2" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block text-white hover:text-sky-blue py-2 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}