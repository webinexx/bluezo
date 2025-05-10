"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar with scroll effect */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="relative h-10 w-10 mr-3">
                </div>
                <span className="text-2xl font-bold text-blue-700">bluezo<span className="text-gray-800">Support</span></span>
              </div>
            </div>
            
            {/* Right side buttons with Home link nearby */}
            <div className="hidden md:flex items-center space-x-5">
              <Link href="/" className="text-blue-700 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-700 transition-colors duration-300">
                Home
              </Link>
              <Link href="https://bluezo.ae/" className="text-blue-700 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-700 transition-colors duration-300">
                Bluezo
              </Link>
              <Link href="/Login">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Login
                </button>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center ">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none transition-colors duration-300"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out`}>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center px-4 py-2 space-x-5">
            <Link href="/" className="text-blue-700 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-700 transition-colors duration-300">
                Home
              </Link>
              <Link href="https://bluezo.ae/" className="text-blue-700 hover:text-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-blue-700 transition-colors duration-300">
                Bluezo
              </Link>
              <Link href="/Login">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative bg-gradient-to-b from-slate-50 to-white pt-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div className="relative h-full text-lg max-w-prose mx-auto">
              <div className="absolute top-0 right-0 transform translate-x-32 -translate-y-24 opacity-10">
                <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
              </div>
              <div className="absolute bottom-0 left-0 transform -translate-x-32 translate-y-24 opacity-10">
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500 to-blue-300"></div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
              <div className="pt-16 sm:pt-24 lg:pt-32">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="px-4 mx-auto sm:px-6 sm:text-center lg:px-8 lg:text-left lg:flex lg:items-center">
                    <div className="lg:py-24">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                        <svg className="mr-1.5 h-2 w-2 text-blue-600" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Professional IT Support
                      </span>
                      <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                        <span className="block">Elevating Technology at</span>
                        <span className="block">the Speed of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">Innovation</span></span>
                      </h1>
                      <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg lg:text-xl max-w-xl">
                        Experience seamless IT management with our comprehensive support services tailoblue to your business needs.
                      </p>
                      <div className="mt-8 sm:mt-10">
                        <div className="rounded-md shadow">
                        <Link href="/Login">
                          <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            Submit a Ticket
                          </button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-10 border border-dashed border-blue-200 rounded-xl bg-blue-50 bg-opacity-50 p-4 inline-flex items-center shadow-sm hover:shadow transition-shadow duration-300">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-blue-700 font-medium">24/7 Emergency Support</div>
                          <div className="text-blue-700 font-bold text-lg">
                          +971 4 264 8483</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto text-center lg:flex lg:items-center lg:justify-end">
                    <div className="relative mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0">
                      <div className="relative mx-auto w-full overflow-hidden lg:max-w-md">
                        <div className="relative block w-full overflow-hidden">
                          <div className="w-full mb-20">
                            <Image
                              className="w-full"
                              src="/images/smiling-woman-headset-presentation-something.jpg"
                              alt="Support Specialist"
                              width={800}
                              height={500}
                              priority
                              style={{ objectFit: 'cover' }}
                            />
                            {/* <div className="absolute inset-0 bg-gradient-to-tl from-blue-800/40 to-transparent"></div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our IT Support Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive solutions to keep your business running smoothly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-slate-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200">
              <div className="h-12 w-12 bg-blue-100 rounded-lg text-blue-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">IT Security Services</h3>
              <p className="text-gray-600 mb-4">Protect your business with our comprehensive security solutions including monitoring, threat detection, and response.</p>
              <a href="https://bluezo.ae/" className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Service Card 2 */}
            <div className="bg-slate-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200">
              <div className="h-12 w-12 bg-blue-100 rounded-lg text-blue-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Managed IT Services</h3>
              <p className="text-gray-600 mb-4">We handle all aspects of your IT infrastructure so you can focus on running your business efficiently.</p>
              <a href="https://bluezo.ae/" className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Service Card 3 */}
            <div className="bg-slate-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200">
              <div className="h-12 w-12 bg-blue-100 rounded-lg text-blue-700 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud Solutions</h3>
              <p className="text-gray-600 mb-4">Modernize your business with our cloud migration, implementation, and management services.</p>
              <a href="https://bluezo.ae/" className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call-to-action Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to enhance your IT infrastructure?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Our experts are available 24/7 to help you implement the right solutions for your business.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/Login">
              <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Contact Us
              </button>
              </Link>
              <Link href="/Login">
              <button className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold inline-flex items-center hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Submit a Ticket
            </button>
            </Link>
              
            </div>
  
          </div>
        </div>
      </section>

      {/* Black Footer Bar */}
      <div className="bg-black text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="https://bluezo.ae/about" className="hover:text-gray-300 transition-colors">About Bluezo</Link>
            <Link href="/center" className="hover:text-gray-300 transition-colors">Customer Happiness Center</Link>
          </div>
          <div>
            <p>2025 © Support Master</p>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed bottom-6 right-6 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}