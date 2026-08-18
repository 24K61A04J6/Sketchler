# Sketchler - Artist Portfolio Web App

A full-stack web application for artists to display their bio, artwork gallery, and connect with visitors.

## Features

- 🎨 Responsive artwork gallery
- 📝 Artist bio and information
- 💌 Contact form
- 🔐 Admin panel for managing content
- 📱 Mobile-friendly design
- ⚡ Fast and modern tech stack

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Styling:** Tailwind CSS

## Project Structure

```
Sketchler/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/24K61A04J6/Sketchler.git
cd Sketchler
```

2. Set up the backend
```bash
cd server
npm install
cp .env.example .env
# Configure your MongoDB connection in .env
npm run dev
```

3. Set up the frontend (in a new terminal)
```bash
cd client
npm install
npm run dev
```

4. Open http://localhost:5173 in your browser

## API Endpoints

- `GET /api/bio` - Get artist bio
- `GET /api/artworks` - Get all artworks
- `POST /api/contact` - Submit contact form
- `POST /api/admin/login` - Admin login
- `POST /api/admin/artworks` - Create artwork (admin)
- `PUT /api/admin/artworks/:id` - Update artwork (admin)
- `DELETE /api/admin/artworks/:id` - Delete artwork (admin)

## License

MIT
