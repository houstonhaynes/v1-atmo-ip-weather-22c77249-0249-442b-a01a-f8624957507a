# Atmo: Minimalist IP Weather

A visually stunning, minimalist web application that automatically displays the current weather and forecast for your location.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/houstonhaynes/Vibe-Coded-Weather-app)

Atmo is a hyper-minimalist, visually-driven web application designed to provide immediate, location-aware weather information. It operates on a 'zero-input' principle: upon visiting, the application automatically detects the user's location via their IP address and presents the current weather and a 5-day forecast in a clean, elegant interface. The design emphasizes clarity, aesthetic pleasure, and performance, leveraging a subtle gradient background, glass morphism effects, and fluid animations.

## Key Features

- **Zero-Input Weather:** Automatically detects your location via IP address on page load.
- **Complete Forecast:** Displays current weather conditions and a detailed 5-day forecast.
- **Elegant Design:** A beautiful, minimalist interface featuring subtle animated gradients and glass morphism effects.
- **High-Performance Backend:** Powered by a lightweight Cloudflare Worker for fast, serverless data retrieval.
- **Fully Responsive:** A flawless, intentionally designed experience on desktops, tablets, and mobile devices.
- **Seamless User Experience:** Graceful loading skeletons and user-friendly error states prevent layout shifts and provide clear feedback.

## Technology Stack

- **Frontend:** React, Vite, TypeScript
- **Backend:** Cloudflare Workers, Hono
- **Styling:** Tailwind CSS, shadcn/ui
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Data Validation:** Zod
- **Date Utility:** date-fns

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [Bun](https://bun.sh/) package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/atmo_ip_weather.git
    cd atmo_ip_weather
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up local environment variables:**
    Create a `.dev.vars` file in the root of the project for local development with Wrangler. This project does not require any specific API keys to function.
    ```sh
    touch .dev.vars
    ```

### Running the Development Server

To start the local development server, which includes both the Vite frontend and the Cloudflare Worker backend, run:

```sh
bun dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Project Structure

- `src/`: Contains all the frontend React application code, including pages, components, and utilities.
- `worker/`: Contains the backend Cloudflare Worker code, built with Hono. This is where API routing and third-party service integration happens.
- `public/`: Static assets for the frontend application.
- `wrangler.jsonc`: Configuration file for the Cloudflare Worker.

## Deployment

This project is designed for easy deployment to Cloudflare Pages.

1.  **Log in to Cloudflare:**
    If you haven't already, log in to your Cloudflare account via the command line:
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script to build the application and deploy it to your Cloudflare account.
    ```sh
    bun deploy
    ```

    Wrangler will handle the process of building the frontend, deploying the assets, and publishing the worker.

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/houstonhaynes/Vibe-Coded-Weather-app)

## Architecture

Atmo uses a simple and powerful Backend-for-Frontend (BFF) architecture.

1.  The **React client** makes a single API request to a Cloudflare Worker endpoint.
2.  The **Cloudflare Worker** acts as an orchestrator. It securely determines the user's location from request headers and communicates with the external Open-Meteo API.
3.  The worker transforms the data into a clean, frontend-optimized format and sends it back as a JSON response.

This pattern ensures that no API keys or sensitive logic are exposed to the client, improving security and performance.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.