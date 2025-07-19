import { useState } from "react";

const techStack = [
  {
    title: "Technologies Used",
    items: [
      "React (Vite)",
      "TypeScript",
      "Tailwind CSS",
      "Firebase (Auth, Firestore)",
      "react-firebase-hooks",
      "react-to-print",
      "react-beautiful-dnd"
    ]
  },
  {
    title: "Architecture Concepts",
    items: [
      "Component-based modular architecture",
      "State management with React hooks",
      "Firestore persistence for user data and section order",
      "Authentication with Firebase Auth"
    ]
  },
  {
    title: "Core Features & Concepts",
    items: [
      "Drag and drop section reordering (react-beautiful-dnd)",
      "Dynamic array fields (Experience, Projects)",
      "Conditional rendering (section visibility toggles)",
      "Live preview with sticky positioning",
      "PDF export (react-to-print)",
      "Form state management",
      "Basic validation (required fields, etc.)"
    ]
  }
];

export default function TechStackInfo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Floating Info Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        title="Tech Stack Used"
        aria-label="Show Tech Stack Info"
      >
        <img src="/src/assets/info-icon.png" alt="Info" className="min-w-[20px]" />
      </button>
      {/* Popup Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-xl p-6 m-8 max-w-sm w-full animate-fadeInUp">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75h.008v.008h-.008V9.75zm.75 3v3m9-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold text-blue-700">Tech Stack Used</h3>
            </div>
            <div className="space-y-4 text-sm">
              {techStack.map((section) => (
                <div key={section.title}>
                  <div className="font-semibold text-gray-700 mb-1">{section.title}</div>
                  <ul className="list-disc ml-5 text-gray-600">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button
              className="mt-6 w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
