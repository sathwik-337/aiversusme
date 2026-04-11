"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Purpose", href: "#feature" },
    { name: "About", href: "#about" },
    { name: "E-Learning", href: "/academy" },
    { name: "Blog", href: "/blogs" },
    { name: "Rankings", href: "/rankings" },
    { name: "Contact", href: "#contact" },
  ];

  const handleHashClick = (hash: string) => {
    if (hash === "#home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
      }
      return;
    }

    if (pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${hash}`);
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-black"
        }`}
      >
        <nav className="flex items-center px-4 md:px-8 max-w-7xl mx-auto text-white h-[80px] md:h-[110px]">

          {/* LEFT - LOGO */}
          <div className="flex items-center flex-shrink-0 h-full overflow-hidden mr-auto md:mr-0 md:w-1/4">
            <Link href="/">
              <Image
                src="/bgremovedlogo.png"
                alt="logo"
                width={190}
                height={190}
                className="h-[120px] md:h-[190px] w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* CENTER - DESKTOP LINKS */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-base font-medium">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              const isActive = pathname === link.href;

              if (isHash) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleHashClick(link.href)}
                    className="relative group text-gray-300 hover:text-white transition"
                    suppressHydrationWarning
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-300" />
                  </button>
                );
              }

              return (
                <Link key={link.name} href={link.href} className="relative group">
                  <span className={`transition ${isActive ? "text-white" : "text-gray-300"}`}>
                    {link.name}
                  </span>
                  <span className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </div>

          {/* RIGHT - LOGIN / MOBILE MENU */}
          <div className="flex items-center justify-end md:w-1/4 gap-4">
            {/* DESKTOP LOGIN */}
            <div className="hidden md:block flex-shrink-0">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                    Login
                  </button>
                </SignInButton>
              )}
            </div>

            {/* MOBILE MENU ICON */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} suppressHydrationWarning>
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-black text-white p-6 flex flex-col items-center gap-6 overflow-y-auto max-h-[80vh] border-t border-white/10">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#");

              if (isHash) {
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleHashClick(link.href);
                      setMenuOpen(false);
                    }}
                    className="text-lg text-gray-300 hover:text-white"
                  >
                    {link.name}
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg text-gray-300 hover:text-white"
                >
                  {link.name}
                </Link>
              );
            })}

            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
                  Login
                </button>
              </SignInButton>
            ) : (
              <div className="bg-white text-black px-3 py-2 rounded-full">
                <UserButton />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
