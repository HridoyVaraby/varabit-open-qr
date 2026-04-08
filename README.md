# Varabit Open QR - Free QR Code Generator

A modern, fast, and privacy-focused QR code generator built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Instant Generation**: Create QR codes in real-time
- 🎨 **Customizable**: Adjust colors (foreground & background) and size
- 📥 **High-Quality Download**: Export as PNG images
- 🌓 **Dark Mode Support**: Beautiful light and dark themes
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔒 **Privacy First**: No tracking, completely free
- ⚡ **Fast & Lightweight**: Built with performance in mind
- 🎯 **Easy to Use**: Simple and intuitive interface

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Code Generation**: qrcode.react
- **Icons**: Lucide React
- **Deployment**: Docker

## Quick Start with Docker

### Prerequisites

- Docker installed on your system
- Port 3013 available (or modify in docker-compose.yml)

### Installation & Deployment

1. Clone the repository:
```bash
git clone <repository-url>
cd varabit-open-qr
```

2. Build and start the container:
```bash
docker-compose up -d
```

3. Access the application:
- Open your browser and navigate to: `http://localhost:3013`
- Or use your server IP: `http://192.168.0.103:3013`

### Stopping the Application

```bash
docker-compose down
```

## Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. Enter any text, URL, or content in the input field
2. Customize the QR code:
   - Change foreground color
   - Change background color
   - Adjust size (128px - 512px)
3. Click "Download QR Code" to save as PNG

## Docker Configuration

The application is configured to run on port 3013. To change the port, edit `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:3000"
```

## Project Structure

```
varabit-open-qr/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── QRGenerator.tsx
├── public/
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## License

This project is open source and free to use forever.

## Support

Built with ❤️ by Varabit

---

**Enjoy generating QR codes! 🎉**
