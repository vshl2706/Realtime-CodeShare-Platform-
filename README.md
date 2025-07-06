# 💻 Real-Time Collaborative Code Editor

A real-time web application that enables multiple users to collaboratively write and edit code in the same room. Built using WebSockets for real-time communication and CodeMirror for a rich text/code editing experience.

---

## 🚀 Features

### ⚡ Real-Time Collaboration
- Live code synchronization across all connected users using WebSockets
- Smooth and instant updates without page refresh

### 🔐 Room System
- Users can **create** or **join** rooms using a unique Room ID
- Each room acts as a shared workspace for code editing

### 📋 Utility Functions
- Copy Room ID button for easy sharing
- Graceful room exit handling with cleanup
- Toast notifications for user join/leave events

### 👥 Dynamic User Dashboard
- See who’s currently online in your room
- Handle duplicate usernames gracefully

### 🧠 Code Editor
- Built with CodeMirror for syntax-highlighted code editing
- Supports JavaScript (extendable to other languages)

---

## 🛠️ Tech Stack

| Frontend      | Real-Time Engine | UI/UX         | Dev Tools     |
|---------------|------------------|---------------|---------------|
| React.js      | WebSockets (Socket.IO) | Toast Notifications | VS Code       |
| JavaScript    | Node.js (optional backend) | CSS / Tailwind | Git & GitHub  |

---

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/realtime-code-editor.git
   cd realtime-code-editor
