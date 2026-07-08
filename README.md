# StadiumVerse AI 🏟️🤖

StadiumVerse AI is a next-generation, premium smart stadium operations and fan experience platform designed for the FIFA World Cup 2026. Powered by Google Gemini, the platform dynamically collects telemetry data and coordinates real-time operational directives to optimize fan comfort, safety, sustainability, and command operations.

---

## 🚀 Key AI Features

1. **Live Match Operations Center**: Displays real-time match telemetry, queue statuses, metro traffic updates, and outputs real-time AI warnings.
2. **AI Operational Intelligence**: Six specialized operational panels simulating forecasts, volunteer allocations, water/food stall inventory consumption predictions, and eco recycling station states.
3. **Tournament Command Dashboard**: A high-level tournament health command panel that uses 12-column grid containers to display overall system readiness.
4. **AI Incident Response Center**: An interactive triage feed displaying recent anomalies and safety alerts (crowd congestion, fluctuation, medical emergencies, etc.) with real-time AI-recommended actions.
5. **Predictive Intelligence & Digital Twin**: Uses pure CSS sparklines to display 30-minute forecasts alongside an interactive, animated 2D SVG stadium coordinate twin map.
6. **Fan Experience, Sustainability & Accessibility**: Tracks satisfaction levels, routes accessible pathways, and rewards green fan actions (eco points) using responsive smart notifications.
7. **Gemini AI Companion**: A secure, multi-turn AI chatbot with dynamic markdown rendering support (via `react-markdown`) and graceful fallback simulation loops.

---

## ⚙️ Setup and Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* NPM or UV package managers

### Installation
1. Clone or extract the project files.
2. Install project dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### Building for Production
To bundle and optimize the application (including route-based chunk splitting):
```bash
npm run build
```

---

## 🔑 Environment Variables Configuration

The application securely loads the Google Gemini credentials using Vite's metadata configuration files.

1. In the project root, locate or create a file named `.env.local` (this file is automatically ignored by Git configurations to prevent security leaks).
2. Configure the following variable slot:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
3. If the key is not defined, the application gracefully degrades to local simulated behaviors to keep the UI interactive and robust.

---

## 🏗️ Technical Architecture & Optimizations

* **Code Splitting**: Routes are dynamically lazy loaded using `React.lazy` and wrapped in `Suspense` loaders to optimize bundle chunk distributions.
* **Component Memoization**: Telemetry dashboard cards are modularized to minimize root-level page re-renders.
* **Accessibility (a11y)**: Built with semantic layouts, keyboard-accessible interaction targets, high contrast overrides, and descriptive ARIA controls.
