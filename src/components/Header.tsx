"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-text.png"
              alt="Kamaehu"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#ai-food-log"
              className="text-foreground-muted hover:text-primary transition-colors font-medium"
            >
              Nutrition
            </Link>
            <Link
              href="#workout"
              className="text-foreground-muted hover:text-primary transition-colors font-medium"
            >
              Workouts
            </Link>
            <Link
              href="#features"
              className="text-foreground-muted hover:text-primary transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#comparison"
              className="text-foreground-muted hover:text-primary transition-colors font-medium"
            >
              Compare
            </Link>
            <Link href="#download" className="btn-primary text-sm">
              Try Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <div className="flex flex-col gap-4">
              <Link
                href="#ai-food-log"
                className="text-foreground-muted hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nutrition
              </Link>
              <Link
                href="#workout"
                className="text-foreground-muted hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Workouts
              </Link>
              <Link
                href="#features"
                className="text-foreground-muted hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#comparison"
                className="text-foreground-muted hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </Link>
              <Link
                href="#download"
                className="btn-primary text-sm w-fit"
                onClick={() => setMobileMenuOpen(false)}
              >
                Try Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
