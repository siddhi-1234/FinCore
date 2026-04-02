# 💰 Finance Dashboard UI

A responsive and interactive finance dashboard built using React to help users track, analyze, and understand financial activity. The application focuses on clean UI design, intuitive data visualization, and efficient state management.


## 🚀 Tech Stack

- React (CRA - not Vite)
- Tailwind CSS
- Recharts / Chart.js
- Context API / Zustand
- Framer Motion


## 📊 Core Features

### 1. Dashboard Overview
- Summary cards: Total Balance, Income, Expenses
- Time-based visualization (balance trend)
- Category-based visualization (spending breakdown)

### 2. Transactions Section
- Displays:
  - Date
  - Amount
  - Category
  - Type (income/expense)
- Features:
  - Search
  - Filtering
  - Sorting

### 3. Role-Based UI
- Viewer → Read-only access
- Admin → Can add/edit transactions
- Role switching via dropdown/toggle

### 4. Insights Section
- Highest spending category
- Monthly comparison
- Basic financial observations

### 5. State Management
- Handles:
  - Transactions
  - Filters
  - User role
- Implemented using Context API / Zustand

### 6. UI & UX
- Clean and minimal design
- Fully responsive (mobile, tablet, desktop)
- Graceful handling of empty states

### 7. 🌙 Dark Mode
- Toggle using Tailwind `dark:` classes

### 8. 🎬 Animations
- Smooth transitions using Framer Motion

---

## ⚠️ Edge Cases Handled

- No transactions → “No data” state
- No filter results → proper message
- Large numbers → formatted currency
- Invalid inputs → validation handling



# Start development server
npm start
