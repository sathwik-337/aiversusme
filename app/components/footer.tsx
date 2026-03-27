// "use client";

// import Link from "next/link";
// import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="w-full bg-black text-white">

//       {/* INNER CONTAINER */}
//       <div className="max-w-6xl mx-auto px-6 py-12">

//         {/* TOP SECTION */}
//         <div className="flex flex-col md:flex-row justify-between gap-10">

//           {/* LEFT - BRAND */}
//           <div className="flex flex-col gap-4 max-w-sm">
//             <div className="flex items-center gap-2">
//               <img src="/bgremovedlogo.png" alt="logo" height={200} width={200} />
//             </div>
//             <p className="text-gray-400 text-sm">
//               Discover how AI will impact your career. Analyze job risks,
//               explore rankings, and future-proof your skills.
//             </p>
//           </div>

//           {/* CENTER - LINKS */}
//           <div className="flex flex-col md:flex-row gap-10 text-sm">

//             <div className="flex flex-col gap-3">
//               <span className="text-gray-400 uppercase text-xs">Product</span>
//               <Link href="/" className="hover:text-gray-300">Home</Link>
//               <Link href="/#about" className="hover:text-gray-300">About</Link>
//               <Link href="/rankings" className="hover:text-gray-300">Rankings</Link>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-gray-400 uppercase text-xs">Company</span>
//               <Link href="/#blog-section" className="hover:text-gray-300">Blog</Link>
//               <Link href="/contact" className="hover:text-gray-300">Contact</Link>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-gray-400 uppercase text-xs">Legal</span>
//               <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
//               <Link href="/terms" className="hover:text-gray-300">Terms</Link>
//             </div>

//           </div>

//           {/* RIGHT - SOCIAL */}
//           <div className="flex flex-col gap-4">
//             <span className="text-gray-400 uppercase text-xs">Follow</span>
//             <div className="flex gap-4">
//               <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
//                 <FaGithub size={16} />
//               </a>
//               <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
//                 <FaTwitter size={16} />
//               </a>
//               <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
//                 <FaLinkedin size={16} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="border-t border-gray-800 my-8"></div>

//         {/* BOTTOM */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
//           <span>© {new Date().getFullYear()} AI vs ME. All rights reserved.</span>
//           <div className="flex gap-6">
//             <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
//             <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
//           </div>
//         </div>

//       </div>

//       {/* MOVING DISCLAIMER - loops forever */}
//       <div className="w-full border-t border-white/10 bg-white/5 py-3 overflow-hidden">
//         <style>{`
//           @keyframes scroll-loop {
//             0%   { transform: translateX(100vw); }
//             100% { transform: translateX(-100%); }
//           }
//           .disclaimer-loop {
//             display: inline-block;
//             white-space: nowrap;
//             animation: scroll-loop 20s linear infinite;
//           }
//         `}</style>
//         <p className="disclaimer-loop text-sm font-medium text-yellow-400">
//           ⚠️&nbsp;&nbsp;All insights provided are AI-generated and for informational purposes only; please verify independently before making career decisions.
//         </p>
//       </div>

//     </footer>
//   );
// }





"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">

      {/* 🆕 PARTNERS SECTION */}
      <div className="w-full border-b border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-lg md:text-xl font-semibold mb-8 text-white/80">
            Our Partners
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">

            <a href="https://torsecure.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/partners/torsecure.png"
                alt="Torsecure"
                width={140}
                height={50}
                className="object-contain opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
              />
            </a>

            <a href="https://panamacorporationltd.com/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/partners/panama.png"
                alt="Panama Corporation"
                width={140}
                height={50}
                className="object-contain opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
              />
            </a>

            <a href="https://thesurepass.com/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/partners/surepass.jpeg"
                alt="Surepass"
                width={140}
                height={50}
                className="object-contain opacity-80 hover:opacity-100 hover:scale-105 transition duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/* 🆕 BRANCHSELECTOR SECTION */}
      <div className="w-full py-20 bg-gradient-to-b from-black to-zinc-900 border-b border-white/10">
  <div className="max-w-5xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
      Build a Career That Actually Fits You
    </h2>

    {/* Subheading */}
    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
      Discover your ideal path with AI-powered career guidance and psychometric tests.
      Stop guessing — start choosing the right future.
    </p>

    {/* Logo */}
   <div className="w-full flex justify-center items-center py-10">
  <div className="flex items-center gap-3">
    <Image
      src="/branchlogo.png"
      alt="BranchSelector Logo"
      width={55}
      height={55}
      className="object-contain"
    />

    <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-wide">
      BranchSelector
    </h1>
  </div>
</div>

    {/* Brand Name
    <h3 className="text-2xl font-semibold text-white mb-8">
      BranchSelector
    </h3> */}

    {/* CTA Button */}
    <a
      href="https://branchselector.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300 shadow-lg"
    >
      Get Started →
    </a>

  </div>
</div>

      {/* INNER CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* LEFT - BRAND */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2">
              <img src="/bgremovedlogo.png" alt="logo" height={200} width={200} />
            </div>
            <p className="text-gray-400 text-sm">
              Discover how AI will impact your career. Analyze job risks,
              explore rankings, and future-proof your skills.
            </p>
          </div>

          {/* CENTER - LINKS */}
          <div className="flex flex-col md:flex-row gap-10 text-sm">

            <div className="flex flex-col gap-3">
              <span className="text-gray-400 uppercase text-xs">Product</span>
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/#about" className="hover:text-gray-300">About</Link>
              <Link href="/rankings" className="hover:text-gray-300">Rankings</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-gray-400 uppercase text-xs">Company</span>
              <Link href="/#blog-section" className="hover:text-gray-300">Blog</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-gray-400 uppercase text-xs">Legal</span>
              <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            </div>

          </div>

          
    
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} AI vs ME. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>

      </div>

      {/* MOVING DISCLAIMER */}
      <div className="w-full border-t border-white/10 bg-white/5 py-3 overflow-hidden">
        <style>{`
          @keyframes scroll-loop {
            0%   { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          .disclaimer-loop {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-loop 20s linear infinite;
          }
        `}</style>
        <p className="disclaimer-loop text-sm font-medium text-yellow-400">
          ⚠️ All insights provided are AI-generated and for informational purposes only; please verify independently before making career decisions.
        </p>
      </div>

    </footer>
  );
}