'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlignJustify, X } from 'lucide-react';
import Link from 'next/link';

const links = [
  { title: 'Home', href: '/' },
  { title: 'Art of the day', href: '/art-of-the-day' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full bg-background ">
      <nav className="container mx-auto flex items-center justify-between font-sans p-4">
        <div className="text-lg font-bold font-serif text-primary leading-5">
          THE
          <br />
          MET
        </div>
        <ul className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                className="hover:text-primary transition-colors"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X /> : <AlignJustify />}
        </Button>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-card md:hidden">
            <ul className="flex flex-col gap-4 text-sm p-2 font-medium text-muted-foreground">
              {links.map((link) => (
                <li key={link.title} className="p-2">
                  <Link
                    className="block hover:text-primary transition-colors"
                    href={link.href}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
