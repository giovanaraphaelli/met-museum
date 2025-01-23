'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlignJustify, Search } from 'lucide-react';
import Link from 'next/link';
import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { DialogTitle } from '@radix-ui/react-dialog';

const links = [
  { title: 'Home', href: '/' },
  { title: 'Art of the day', href: '/art-of-the-day' },
];

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="container mx-auto flex items-center justify-between font-sans p-4">
        <Link href="/">
          <div className="text-lg font-bold font-serif text-primary leading-5">
            THE
            <br />
            MET
          </div>
        </Link>
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium text-muted-foreground">
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
          <li>
            <Link href="/arts">
              <Button variant="outline" size="sm">
                <Search />
                Search
              </Button>
            </Link>
          </li>
        </ul>
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleDrawer}
          aria-label="Open Drawer"
        >
          <AlignJustify />
        </Button>
      </nav>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DialogTitle>
            <Link href="/">
              <div className="text-lg font-bold font-serif text-primary text-center p-2 mt-2">
                THE MET
              </div>
            </Link>
          </DialogTitle>
          <DrawerClose />
          <div className="p-4">
            <ul className="flex flex-col gap-2 text-base font-sans font-medium text-center text-muted-foreground">
              {links.map((link) => (
                <li key={link.title}>
                  <Link
                    className="block bg-card p-2 rounded-md"
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="block bg-card p-2 rounded-md"
                  href="/arts"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
