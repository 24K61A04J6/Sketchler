# Sketchler - Artist Portfolio Web App

A full-stack web application for artists to display their bio, artwork gallery, and connect with visitors.

## ✨ Features

- 🎨 Responsive artwork gallery with category filtering
- 📝 Artist bio and information section
- 💌 Contact form for visitor inquiries
- 🔐 Secure admin panel for managing content
- 📱 Mobile-friendly design
- ⚡ Fast and modern tech stack
- 🔑 JWT authentication for admin access

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
Sketchler/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   └── ArtworkCard.jsx     # Reusable artwork card
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page with featured works
│   │   │   ├── Portfolio.jsx       # Full gallery with filtering
│   │   │   ├── Contact.jsx         # Contact form page
│   │   │   ├── AdminLogin.jsx      # Admin authentication
│   │   │   └── AdminDashboard.jsx  # Admin management panel
│   │   ├── services/
│   │   │   └── api.js              # Axios API client
│   │   ├── styles/
│   │   │   └── globals.css         # Tailwind styles
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── package.json                 # Frontend dependencies
│
├── server/                          # Node.js backend (Express)
│   ├── models/
│   │   ├── Bio.js                  # Artist bio schema
│   │   ├── Artwork.js              # Artwork schema
│   │   ├── Contact.js              # Contact form schema
│   │   └── Admin.js                # Admin user schema
│   ├── routes/
│   │   ├── bioRoutes.js            # Bio endpoints
│   │   ├── artworkRoutes.js        # Artwork endpoints
│   │   ├── contactRoutes.js        # Contact form endpoints
│   │   └── adminRoutes.js          # Admin endpoints
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── server.js                    # Main server file
│   ├── .env.example                 # Environment variables template
│   └── package.json                 # Backend dependencies
│
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ ([download](https://nodejs.org/))
- MongoDB ([install locally](https://www.mongodb.com/docs/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/24K61A04J6/Sketchler.git
   cd Sketchler
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
   
   Configure `.env` with your MongoDB connection string and JWT secret:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sketchler
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sketchler
   JWT_SECRET=your_secure_secret_key_here
   NODE_ENV=development
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

4. **Open your browser**
   - Visit `http://localhost:5173`
   - Navigate to `/admin` to access the admin panel

## 📚 API Endpoints

### Public Endpoints

#### Bio
- `GET /api/bio` - Get artist bio information

#### Artworks
- `GET /api/artworks` - Get all artworks
  - Query params: `category`, `featured` (boolean)
- `GET /api/artworks/:id` - Get single artwork by ID

#### Contact
- `POST /api/contact` - Submit contact form
  - Body: `{ name, email, subject, message }`

### Admin Endpoints (Require JWT Token)

#### Authentication
- `POST /api/admin/login` - Admin login
  - Body: `{ username, password }`
  - Returns: `{ token, admin }` with JWT token for future requests

- `POST /api/admin/register` - Create new admin (setup only)
  - Body: `{ username, email, password }`

#### Artwork Management
- `POST /api/admin/artworks` - Create new artwork
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ title, description, imageUrl, category, price, yearCreated, ... }`

- `PUT /api/admin/artworks/:id` - Update artwork
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ ...updated fields }`

- `DELETE /api/admin/artworks/:id` - Delete artwork
  - Headers: `Authorization: Bearer {token}`

#### Contact Management
- `GET /api/admin/contacts` - Get all contact messages
  - Headers: `Authorization: Bearer {token}`

- `PUT /api/admin/contacts/:id` - Update contact message status
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ status: 'new' | 'read' | 'responded' }`

## 🔐 Admin Setup

1. Start the backend server (it will connect to MongoDB)
2. Use a tool like Postman or cURL to create an admin account:
   ```bash
   curl -X POST http://localhost:5000/api/admin/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "admin@example.com",
       "password": "securepassword123"
     }'
   ```
3. Login at `/admin` with your credentials
4. Manage artworks and contact messages from the dashboard

## 🎨 Frontend Pages

### Public Pages
- **Home** (`/`) - Landing page with featured artworks and hero section
- **Portfolio** (`/portfolio`) - Full gallery with category filtering
- **Contact** (`/contact`) - Contact form to reach out

### Admin Pages
- **Admin Login** (`/admin`) - Secure login page
- **Admin Dashboard** (`/admin/dashboard`) - Manage artworks and messages
  - Add, edit, and delete artworks
  - View and manage contact messages
  - Filter artworks by category

## 🧪 Testing

### Test the Backend
```bash
# Health check
curl http://localhost:5000/api/health

# Get artworks
curl http://localhost:5000/api/artworks

# Create artwork (requires auth)
curl -X POST http://localhost:5000/api/admin/artworks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Art",
    "description": "A beautiful artwork",
    "imageUrl": "https://example.com/image.jpg",
    "category": "Painting",
    "yearCreated": 2024
  }'
```

### Test the Frontend
- Browse the portfolio gallery
- Test filtering by category
- Submit a contact message
- Login to admin panel
- Add/edit/delete artworks

## 🚢 Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Heroku/Railway (Backend)
1. Set MongoDB Atlas URI for production
2. Update `MONGODB_URI` in production environment
3. Update `JWT_SECRET` to a secure value
4. Deploy using platform's CLI or GitHub integration

### Environment Variables for Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sketchler
JWT_SECRET=very_secure_secret_key_with_random_characters
NODE_ENV=production
```

## 📝 Database Schema

### Bio Collection
```javascript
{
  artistName: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  profileImage: String,
  socialLinks: {
    instagram: String,
    twitter: String,
    linkedin: String,
    portfolio: String
  },
  skills: [String],
  timestamps: true
}
```

### Artwork Collection
```javascript
{
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  price: Number,
  dimensions: {
    width: Number,
    height: Number,
    unit: String
  },
  medium: String,
  yearCreated: Number,
  featured: Boolean,
  timestamps: true
}
```

### Contact Collection
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  status: 'new' | 'read' | 'responded',
  timestamps: true
}
```

### Admin Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'editor',
  timestamps: true
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### CORS Errors
- Backend CORS is configured to accept all origins in development
- For production, update `cors()` in `server.js` to specific domain

### Frontend Cannot Reach Backend
- Ensure backend is running on port 5000
- Check Vite proxy configuration in `vite.config.js`
- Clear browser cache and restart dev server

## 📦 Build and Production

### Build Frontend
```bash
cd client
npm run build
# Output in dist/ directory
```

### Start Backend in Production
```bash
cd server
NODE_ENV=production npm start
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

## 🎯 Future Enhancements

- [ ] Image upload functionality
- [ ] Email notifications for contact forms
- [ ] Social media integration
- [ ] Multiple artist support
- [ ] Analytics dashboard
- [ ] Commission inquiry system
- [ ] Artwork comments and ratings
- [ ] Newsletter subscription
- [ ] Dark mode
- [ ] Multi-language support
