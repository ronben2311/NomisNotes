# 📝 NomiNotes

**NomiNotes** is a small, personal notes app I'm building for my wife.  
It's designed to run as an Android APK and built according to her preferences — aiming for simplicity, speed, tailor made by her requests.

---

## ✨ Features (so far…)

- 📄 Create, edit, and delete notes
- 📁 Organize notes by folders
- 🌙 Dark mode toggle
- 🔄 Realtime sync using Firebase Firestore
- 🚀 Built with Vue 3, Quasar, and Pinia (at next version)

> 💡 More features will be added by my wife order — possibly including file uploads, drag-and-drop folders, encryption, auto delete, magical alerts, or anything else she dreams up. I just build it for fun 😄

---

## 📦 Tech Stack

- [Vue 3](https://vuejs.org/) – Frontend framework
- [Quasar](https://quasar.dev/) – UI components & mobile support
- [Firebase](https://firebase.google.com/) – Firestore for data, Auth & Storage
- [Pinia](https://pinia.vuejs.org/) – (To be added) state management
- [Vite](https://vitejs.dev/) – lightning-fast dev environment

---

## 🚧 Project Status

> 🔰 First version published  
> ✅ Basic CRUD functionality  
> ✅ Folder support

---

## 🔐 Environment Setup

Create a `.env` file in the `/client` directory with the following keys:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
