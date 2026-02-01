# Iron Lady Learning Assistant - Frontend

React-based frontend for the AI-powered chatbot assistant.

## Tech Stack

- React 18
- JavaScript (ES6+)
- Vite (build tool)
- Tailwind CSS
- Axios for API calls
- Lucide React for icons
- React Markdown for formatting

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment (optional):**
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env if needed (default backend is http://localhost:8000)
```

3. **Run development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/           # React components
│   ├── ChatInterface.jsx     # Main chat interface
│   ├── MessageBubble.jsx     # Individual message display
│   ├── Sidebar.jsx           # Sidebar with navigation
│   └── TypingIndicator.jsx   # Loading animation
├── api/
│   └── chatApi.js           # API client for backend
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Features

- **Real-time Chat** - Send messages and receive AI responses
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Quick Questions** - Pre-defined questions for easy access
- **Message History** - Maintains conversation context
- **Typing Indicators** - Shows when AI is thinking
- **Markdown Support** - Rich text formatting in responses
- **Error Handling** - Graceful error messages

## Customization

### Change Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Update API URL
Edit `.env` file:
```
VITE_API_URL=http://your-backend-url.com
```

### Modify Components
All components are in the `src/components/` directory and can be customized as needed.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `VITE_API_URL`
4. Deploy

### Netlify
1. Push code to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variable: `VITE_API_URL`

## Troubleshooting

**Port already in use:**
- Change port in `vite.config.js`

**API connection error:**
- Ensure backend is running on port 8000
- Check `VITE_API_URL` in `.env`

**Styling issues:**
- Run `npm install` to ensure Tailwind is installed
- Clear browser cache

## License

ISC
