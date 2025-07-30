import { Bar } from "./components/bar";
import { Contact } from "./components/Contact";
import { HeroLogo } from "./components/hero-logo";
import { Quote } from "./components/Quote";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center bg-green-900"
        style={{
          backgroundImage: "url('/images/lawn-placeholder.png')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)'
          }}
        ></div>
        <div className="relative text-center text-white px-4 z-10">
          <HeroLogo />
          <p className="text-xl md:text-2xl mb-8 font-medium font-main">
            Family-Owned Lawn Care in Lumberton, TX
          </p>
          <div className='flex flex-col mb-8 gap-1'>
            <div className="flex flex-wrap justify-center gap-8 text-lg bg-teal-700 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Mowing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Trimming</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Landscaping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Cleanups</span>
              </div>
            </div>

            <Bar color="yellow-400" />
          </div>

          <button onClick={() => window.location.href = "#contact"} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors">
            Contact Us
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="bg-yellow-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-green-700 text-4xl">🌲</div>
                <h2 className="text-4xl font-bold text-red-600 font-futura">ABOUT US</h2>
              </div>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  We're a local family-owned business offering reliable, affordable lawn care with attention to detail.
                </p>
                <p className="font-semibold text-green-700">
                  Serving Southeast Texas with pride.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4"><img src="/images/terrytodd.jpg" alt="Big Thicket Lawn Services - Owners" className="rounded" /></div>
                  <p className="text-lg text-gray-600">Family-owned & operated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 bg-orange-500 w-24"></div>
              <h2 className="text-4xl font-bold text-green-700 font-futura">OUR SERVICES</h2>
              <div className="h-1 bg-orange-500 w-24"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🚜</span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Lawn Mowing</h3>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✂️</span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Edging & Trimming</h3>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🧹</span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Mulch & Cleanups</h3>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌳</span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Bush Shaping</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Forms Section */}
      <div id="contact" className="bg-yellow-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Quote />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}
