export default function Contact() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden islamic-pattern">
      {/* Main Card */}
      <div className="relative bg-orange-50 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-12 max-w-5xl w-full border flex flex-col items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo and Content */}
          <div className="mb-6 md:mb-8 relative">
            <div className="absolute -inset-4 bg-orange-200 rounded-full opacity-50 animate-pulse"></div>
            <img
              src="/muslim-compass-logo.png"
              alt="Muslim Compass Logo"
              className="w-24 h-24 md:w-36 md:h-36 object-contain relative animate-float"
            />
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-yellow-800 mb-4 font-serif"
            style={{ transform: "translateZ(40px)" }}
          >
            Muslim Compass
          </h1>

          <p
            className="text-xl md:text-2xl text-yellow-700 mb-4"
            style={{ transform: "translateZ(30px)" }}
          >
            Your Guide to the Muslim Community
          </p>

          <p
            className="text-gray-600 mb-10 md:mb-16 max-w-md"
            style={{ transform: "translateZ(20px)" }}
          >
            Connecting you with events, opportunities, and resources in your
            local Muslim community.
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-yellow-800 mb-8 md:mb-10 font-serif">
            CONTACT COMING SOON
          </h2>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-yellow-800">
        <p className="font-medium">
          © 2025 Muslim Compass. All rights reserved.
        </p>
      </div>
    </div>
  );
}
