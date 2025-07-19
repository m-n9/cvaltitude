import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const GuestPage = () => (
  <div className="fixed inset-0 min-h-screen min-w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 z-0">
    <div className="relative w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-white/80 rounded-2xl shadow-2xl p-8 md:p-12 border border-blue-100 z-10">
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" fill="#2563EB"/>
            <path d="M12 28V12H28V28H12Z" fill="#fff"/>
            <path d="M20 16V24" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 20H24" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-2xl font-extrabold tracking-tight text-blue-700">CVAltitude</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">Elevate Your Resume.<br className="hidden md:block"/> Land Your Dream Job.</h1>
        <p className="text-gray-600 mb-6 text-lg">Create, preview, and export a professional resume in minutes. Secure, cloud-based, and always accessible.</p>
        <button
          onClick={() => signInWithPopup(auth, provider)}
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition-all text-lg"
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_40)">
                <path d="M47.617 24.552c0-1.636-.146-3.2-.418-4.705H24.48v9.09h13.01c-.56 3.02-2.25 5.58-4.79 7.3v6.06h7.74c4.54-4.18 7.177-10.34 7.177-17.75z" fill="#4285F4"/>
                <path d="M24.48 48c6.48 0 11.93-2.15 15.91-5.85l-7.74-6.06c-2.15 1.44-4.89 2.3-8.17 2.3-6.28 0-11.6-4.24-13.5-9.96H2.6v6.24C6.57 43.98 14.02 48 24.48 48z" fill="#34A853"/>
                <path d="M10.98 28.43c-.5-1.44-.78-2.98-.78-4.43s.28-2.99.78-4.43v-6.24H2.6A23.97 23.97 0 0 0 0 24c0 3.97.96 7.73 2.6 10.97l8.38-6.54z" fill="#FBBC05"/>
                <path d="M24.48 9.5c3.53 0 6.66 1.22 9.14 3.62l6.85-6.85C36.41 2.15 30.96 0 24.48 0 14.02 0 6.57 4.02 2.6 10.03l8.38 6.54c1.9-5.72 7.22-9.96 13.5-9.96z" fill="#EA4335"/>
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <path fill="#fff" d="M0 0h48v48H0z"/>
                </clipPath>
              </defs>
            </svg>
            Sign in with Google
          </span>
        </button>
      </div>
      <div className="flex-1 hidden md:flex justify-center">
        <img src="/src/assets/building-illustration.gif" alt="Resume builder illustration" className="rounded-xl shadow-lg w-72 h-72 object-cover object-top border-4 border-blue-100" />
      </div>
    </div>
  </div>
);

export default GuestPage;
