# Sketchler - Frontend Client

Modern React-based frontend for the Sketchler artist portfolio platform.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      - Navigation component
│   │   └── Footer.jsx      - Footer component
│   ├── pages/
│   │   ├── Home.jsx        - Landing page with hero and featured works
│   │   ├── Gallery.jsx     - Complete gallery with filtering
│   │   ├── About.jsx       - Artist bio page
│   │   ├── Contact.jsx     - Contact form
│   │   └── AdminDashboard.jsx - Admin login and management
│   ├── App.jsx             - Main app component with routing
│   ├── main.jsx            - React entry point
│   └── index.css           - Global styles with Tailwind
├── index.html              - HTML template
├── vite.config.js          - Vite configuration
├── tailwind.config.js      - Tailwind CSS configuration
├── postcss.config.js       - PostCSS configuration
└── package.json            - Dependencies and scripts
```

## Pages

### Home
- Hero section with call-to-action
- Artist bio section
- Featured artworks grid
- Responsive design

### Gallery
- Full artwork collection
- Filter by category (painting, drawing, sculpture, digital, photography, mixed-media)
- Hover effects and smooth transitions
- Displays price and year information

### About
- Detailed artist biography
- Profile image
- Social media links
- Contact information

### Contact
- Contact form with validation
- Success/error messages
- Email submission to backend

### Admin Dashboard
- Login interface
- Protected admin panel (TODO: Full implementation)
- Artwork management (TODO)
- Bio management (TODO)

## Components

### Navbar
- Responsive navigation menu
- Mobile hamburger menu
- Links to all pages
- Admin login button

### Footer
- Copyright information
- Social media links
- Consistent branding

## Styling

Uses **Tailwind CSS** for utility-first styling with:
- Responsive design (mobile-first)
- Dark/light color scheme
- Smooth transitions and animations
- Custom color variables

## API Integration

Frontend communicates with backend API at:
```
http://localhost:5000/api
```

All requests use Axios with proper error handling.

## Environment Variables

Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:5000/api
```

## Dependencies

- **react**: UI library
- **react-dom**: React rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **tailwindcss**: CSS framework
- **vite**: Build tool

## Development

### Adding a New Page
1. Create file in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`

### Adding a New Component
1. Create file in `src/components/`
2. Import and use in pages

### Styling
All styles use Tailwind classes. For custom styles, add to `index.css`.

## Performance

- Code splitting with React Router
- Lazy loading for images
- Optimized component re-renders
- Minimal bundle size with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
