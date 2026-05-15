# Ayush Sharma — Personal Portfolio 🌌

> **"Good data is honest."**

This repository contains the source code for my cinematic personal portfolio. It's more than just a resume—it's an interactive 3D experience designed to showcase my journey as a **Data Engineer**, **Automation Architect**, and **Full-stack Developer**.

### 📊 Impact at a Glance
*   **4,700+ Hours** saved through production-grade automation.
*   **12+ Dashboards** deployed for executive-level decision making.
*   **$15K+ USD** documented business impact.
*   **8.7 CGPA** B.Tech in Computer Science & Engineering.

### ✨ Key Interactive Features
*   **Hyper-realistic Hero Globe:** A custom Three.js implementation representing global data connectivity.
*   **Interactive Skills Galaxy:** A dual-mode (Network/Radar) canvas system for exploring my tech ecosystem.
*   **Terminal Preloader:** A GSAP-sequenced "system boot" simulation.
*   **Physics-based Motion:** Butter-smooth scrolling using Lenis and ScrollTrigger.

## 🚀 Live Demo
[ayush-s-portfolio-17.vercel.app](https://ayush-s-portfolio-17.vercel.app/)

## 🛠️ Tech Stack & Architecture

This is a high-performance, vanilla web project built without heavy frameworks to ensure maximum control over animations and rendering.

*   **HTML5 / CSS3:** Semantic structure with modern CSS features (CSS Variables, Grid, Flexbox, Glassmorphism).
*   **JavaScript (ES6+):** Vanilla JS for DOM manipulation, event handling, and logic.
*   **Three.js:** Used for 3D rendering (the interactive Earth globe in the hero section and the interactive skills network canvas).
*   **GSAP (GreenSock):** Powers the complex timeline animations, scroll-triggered reveals, and smooth transitions.
*   **Lenis:** Provides butter-smooth, physics-based scrolling.

## 🎨 Design Philosophy

*   **Cinematic Dark Mode:** A deep black base (`#0d0d0d`) layered with animated film grain.
*   **Glassmorphism:** Frosted glass panels (`backdrop-filter: blur`) with subtle translucent borders.
*   **Neon Accents:** Primary tech-blue (`#4F8EF7`) with striking neon-green (`#AAFF45`) highlights for emphasis.
*   **Typography:** `Inter` for clean, readable body text, paired with `Space Mono` for technical labels, numbers, and tags.

## 📁 File Structure

*   `index.html`: The main structural document containing all 8 sections (Identity, Evolution, Work, Projects, Ecosystem, Numbers, Connect, Credentials).
*   `style.css`: Contains all styling, CSS variables, keyframe animations, and responsive media queries.
*   `script.js`: (Not fully detailed here but presumed) Initializes Three.js scenes, GSAP ScrollTriggers, Lenis scrolling, custom cursor logic, and the preloader sequence.

## 🔧 Local Development

To run this project locally, you simply need a local web server to prevent CORS issues with canvas/Three.js.

1. Clone the repository.
2. Open the folder in VS Code.
3. Use the **Live Server** extension to launch `index.html`.
4. Alternatively, use Python: `python -m http.server 8000`

## 👤 Author
**Ayush Sharma**
*   GitHub: [Ayush-1-7](https://github.com/Ayush-1-7)
*   LinkedIn: [ayush-sharma-](https://linkedin.com/in/ayush-sharma-)

---
*Designed and built with code, caffeine, and an obsession with data.*
