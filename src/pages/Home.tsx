export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center bg-green-900"
      >
        <div className="text-center text-white px-4">
          <h1 className="text-9xl font-bold mb-4 tracking-wider">
            <div className="flex flex-col gap-1">
              <span className="font-decorative tracking-tighter">BIG THICKET</span>
              <span className="text-6xl font-main tracking-tight">LAWN SERVICES</span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium font-futura">
            Family-Owned Lawn Care in Lumberton, TX
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-lg">
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
              <span>Cleanups</span>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors">
            Get a Free Quote
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
                  We're a local family business offering reliable, affordable lawn care with attention to detail.
                </p>
                <p className="font-semibold text-green-700">
                  Serving Southeast Texas with pride.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                  <p className="text-lg text-gray-600">Family-owned & operated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
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
            {/* Left Form */}
            <div className="bg-white rounded-lg p-8 border-4 border-red-600">
              <h3 className="text-2xl font-bold text-red-600 mb-6 text-center font-futura">GET A FREE QUOTE</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder="Services Needed"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </form>
            </div>

            {/* Right Form */}
            <div className="bg-orange-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-red-600 mb-6 text-center font-futura">GET A FREE QUOTE</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Address</option>
                  <option>Lumberton, TX</option>
                  <option>Beaumont, TX</option>
                  <option>Other</option>
                </select>
                <textarea
                  placeholder="Services Needed"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors">
                  SEND REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
