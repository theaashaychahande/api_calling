# Universal AI API Tester

A high-performance, technically advanced web application for instant validation of AI API keys. Built with React, TypeScript, and Tailwind CSS.

## Architecture

The application is designed as a secure, client-side only tool. All API requests are dispatched directly from the user's browser to the respective provider endpoints, ensuring zero data persistence of sensitive API keys.

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with Framer Motion for high-fidelity animations
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Key Features

- **Multi-Provider Support**: Seamless integration with OpenAI, Gemini (Google), and OpenRouter.
- **Zero-Storage Security**: API keys are processed in-memory and never stored on any server or local storage.
- **Real-time Terminal**: A simulated terminal interface for immediate feedback on API responses.
- **Responsive Design**: Optimized for both desktop and mobile environments with a modern, dark-themed UI.

## Installation

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/api-tester.git
   cd api-tester
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Security Audit

- **End-to-End Encryption**: All API calls utilize HTTPS (TLS 1.2+).
- **Environment Isolation**: Local development environment is protected via `.gitignore`.
- **Secret Management**: No hardcoded API keys or sensitive metadata within the source code.

## License

This project is licensed under the MIT License.
