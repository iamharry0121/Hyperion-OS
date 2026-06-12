HyperionOS
HyperionOS is a high-performance, web-based desktop environment simulator built with raw HTML5, CSS3, and JavaScript. The interface features a sleek, modern glassmorphism design language that adapts dynamically to system events, laying down a highly visual and responsive user experience over a solid, lightweight layout engine.

🚀 Live Demo
Check out the live deployment on Render here:
👉 https://hyperion-os.onrender.com

✨ Features
Glassmorphism Engine: Translucent frosted glass window frames utilizing advanced CSS background blending and dynamic real-time hardware-accelerated blur filters (backdrop-filter).

Window Management System: Independent multi-window canvas layer hierarchy handling open, toggle, x-out hide, and absolute-coordinate dragging loops without lag.

Dynamic Interface Modes: Single-toggle configuration architecture swapping global CSS variable themes seamlessly between high-visibility Light Mode and a deep, high-contrast Dark Mode optimized for black background configurations.

Centered Taskbar Layout: Mathematical horizontal alignment engine mirroring premium desktop workflows (macOS/Windows 11) while preserving absolute right-pinning constraints for the system info clock display module.

Virtual Drive Core: Built-in client-side text file processing layer utilizing the HTML5 FileReader API for local text asset uploads (.txt) and instant editing workspace rendering.

🛠️ Tech Stack
Markup: HTML5 (semantic layout structures)

Styling: CSS3 (Flexbox architecture, custom global utility variables, blur filters)

Logic: Native JavaScript (Vanilla ES6+ event listeners, absolute coordinate mapping loops)

Icons: Font Awesome V6 Vector Glyph Interface

📂 Project Structure
Plaintext
├── assets/
│   └── background.jpg     # Desktop canvas wallpaper asset
├── index.html             # Application entry point & core window DOM nodes
├── style.css              # System UI design definitions & glassmorphism parameters
├── script.js             # Window manager execution & system clock handlers
└── README.md              # Project documentation

💻 Local Development
To run this project locally on your machine without compilation utilities:

Clone the repository:

Bash
git clone https://github.com/iamharry0121/hyperion-os.git
Navigate to the directory:

Bash
cd your-repo-name
Launch the system:
Open index.html directly in any modern, compliant web browser (Chrome, Safari, Edge, Firefox).
