# ✨ CVAltitude — React + Firebase Resume Builder

🚀 **CVAltitude** is a modern, playful, and fully-functional resume builder built using **React**, **Firebase**, and **Tailwind CSS**. With Google authentication, live preview, template switching, and drag-and-drop features — it's perfect for both professional use and showcasing frontend engineering skills.

---

## 🔍 Features

- ✅ **Google Authentication** (via Firebase Auth)
- 🧩 **Component-based Modular Architecture**
- 🔄 **Live Drag & Drop Section Reordering** (using `react-beautiful-dnd`)
- 📄 **Live Preview + PDF Export** (powered by `react-to-print`)
- 🎨 **4 Unique Templates** with varied styles and layouts
- 🧠 **Dynamic Fields** for:
  - 📌 **Experience**: Add as many entries as needed (Title, Company, From, To, “Currently working”, Summary)
  - 🧰 **Projects**: Add or remove dynamically, with visibility toggle
- 🎯 **Skills Section** with optional visibility toggle
- 📦 **Firestore Integration** to persist:
  - Resume data
  - Section order
- 🔍 **Form Validation** for essential fields
- 📱 **Responsive UI** using Tailwind CSS

---

## 🛠️ Technologies Used

- **React (Vite + TypeScript)**
- **Tailwind CSS**
- **Firebase (Auth + Firestore)**
- **react-firebase-hooks**
- **react-to-print**
- **react-beautiful-dnd**

---

## 📸 Screenshots

> (Add screenshots or GIFs showing the functionality in action.)

---

## 🧱 Architecture Overview

- 🧩 **Modular Components**: Pages and templates split cleanly by concern
- 🔁 **React Hooks**: Clean and predictable state management
- 🔐 **Auth Handling**: Auth state managed with `react-firebase-hooks`
- 🗂️ **Cloud Firestore**: Stores resume data and section order per user
- 🧠 **Dynamic UI**: Built-in preview reflects all edits instantly

---

## ⚙️ How to Use

### 🔧 Installation

```bash
git clone https://github.com/your-username/cvaltitude.git
cd cvaltitude
npm install
```

### 🧪 Development

```bash
npm run dev
```

### 🔐 Firebase Setup

1. Create a Firebase project
2. Enable **Authentication > Google Sign-In**
3. Create a **Firestore database**
4. Add your Firebase config in `firebase.ts`

---

## 📤 PDF Export

Click the **"Export PDF"** button at any time to generate a print-ready version of your resume.

---

## ✨ Bonus Features

- 🌐 Template switching with one click  
- 🧩 Reset button to restore default section order  
- 📦 Data auto-persisted in the cloud  
- 🎭 Fun resume entries like Batman @ Marvel or Jon Snow @ Night’s Watch

---

## 🎨 Templates Available

| Template Name     | Style              |
|-------------------|--------------------|
| Modern Blue       | Clean, vibrant     |
| Classic Gray      | Formal, minimal    |
| Elegant Dark      | Sleek, bold        |
| Creative Color    | Playful, colorful  |

---

## 🔥 Why This Project?

CVAltitude isn't just a resume builder — it's also:

- A **portfolio-worthy React project** 💼  
- A **mini SaaS prototype** with authentication, persistence, export  
- A **playground for UI/UX, state management, and Firebase integration**

---

## 📚 Roadmap / Future Ideas

- 🌍 Public shareable CV links
- 📱 Mobile-optimized view for printing
- 📄 Section-wise template customization
- 🌈 More template styles + animations
- 💡 LLM-powered smart content suggestions (planned in Next.js version)

---

## 🤹‍♂️ Fun Modes (for screenshots / demos)

Add hilarious experience like:

> 🦇 *Batman @ Marvel*  
> 🐺 *Jon Snow @ Night's Watch*  
> 🧙 *Hogwarts School of Wizardry*  
> 🧠 *ThroneTrack: Westeros War Planner*

---

## 📄 License

MIT — free for personal and educational use.

---

## 🔗 Demo

🌐 [Live Demo](https://your-live-link.com) *(replace with actual link)*  
📸 [Screenshots Folder](./screenshots) *(optional)*

---

> Created with ❤️ by Moiz — built to impress recruiters and amuse developers.