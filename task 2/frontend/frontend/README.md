# Iron Lady - Frontend Application

React-based frontend for the Iron Lady Participant Tracking System.

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Vite** - Build tool

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AllComponents.jsx    # All main components (Participants, Programs, etc.)
│   │   └── Dashboard.jsx        # Analytics dashboard
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global styles
│   └── main.jsx               # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API Endpoint

The API is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Make sure your backend is running on port 5000, or update this URL accordingly.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Features

### Dashboard
- Real-time statistics (participants, programs, enrollments, completion rate)
- Visual analytics with pie charts and bar charts
- Program performance metrics
- Recent enrollments tracking

### Participants Management
- Complete CRUD operations
- View all participants with details
- Add/Edit/Delete participants
- Filter by status and industry
- Track participant enrollments and progress

### Programs Management
- Create and manage leadership programs
- Program types: Leadership Essentials, 100 Board Members, Master of Business Warfare
- Track duration, modules, pricing, and capacity
- View enrollment statistics per program

### Enrollments Tracking
- View all program enrollments
- Track progress percentage per participant
- Monitor attendance rates
- Module completion tracking
- Visual progress bars

### Milestones & Achievements
- Celebrate participant successes
- Track promotions, salary increases, leadership roles
- View before/after metrics
- Percentage increase calculations
- Beautiful gradient cards for achievements

### Transformation Stories
- Inspiring participant journeys
- Featured stories showcase
- Before/after snapshots
- Key learnings documentation
- Published date tracking

## Component Details

### AllComponents.jsx

Contains 5 main components:

1. **Participants** - Full CRUD for participant management
2. **Programs** - Create and manage programs
3. **Enrollments** - View and track enrollments
4. **Milestones** - Display achievements
5. **TransformationStories** - Showcase success stories

### Dashboard.jsx

Analytics dashboard with:
- 4 stat cards with gradient icons
- Pie chart for enrollment status distribution
- Bar chart for program types
- Program performance table
- Recent enrollments list

### API Service (api.js)

Centralized API service with modules:
- `participantAPI` - CRUD operations for participants
- `programAPI` - CRUD operations for programs
- `enrollmentAPI` - Enrollment management
- `moduleProgressAPI` - Progress tracking
- `assignmentAPI` - Assignment submissions
- `milestoneAPI` - Milestone management
- `transformationStoryAPI` - Success stories
- `dashboardAPI` - Analytics data

## Styling

### App.css Features

- **Responsive design** - Mobile-friendly layouts
- **Gradient backgrounds** - Modern, colorful UI
- **Card-based layout** - Clean, organized interface
- **Status badges** - Color-coded status indicators
- **Modal forms** - Overlay forms for add/edit operations
- **Smooth animations** - Hover effects and transitions
- **Custom scrollbar** - Styled for better UX

### Color Scheme

- Primary: Purple gradient (#667eea → #764ba2)
- Success: Green (#27ae60)
- Warning: Orange (#f39c12)
- Danger: Red (#e74c3c)
- Info: Blue (#3498db)

## Usage

### Adding a New Participant

1. Navigate to **Participants** page
2. Click **Add Participant** button
3. Fill in the form:
   - Participant ID (unique)
   - Full Name, Email, Phone
   - Current Role, Company, Industry
   - Years of Experience
   - Career Goal
4. Click **Create**

### Creating a Program

1. Navigate to **Programs** page
2. Click **Create Program** button
3. Fill in details:
   - Program Name
   - Program Type (dropdown)
   - Duration, Modules, Price
   - Start/End Date
   - Description
4. Click **Create**

### Tracking Progress

1. Navigate to **Enrollments** page
2. View progress bars showing completion percentage
3. Check attendance rates
4. Monitor module completion

### Celebrating Milestones

1. Navigate to **Milestones** page
2. View achievements with gradient cards
3. See before/after values
4. Track percentage increases

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/participants` | GET | Fetch all participants |
| `/participants` | POST | Create new participant |
| `/participants/:id` | PUT | Update participant |
| `/participants/:id` | DELETE | Delete participant |
| `/programs` | GET | Fetch all programs |
| `/programs` | POST | Create new program |
| `/enrollments` | GET | Fetch all enrollments |
| `/milestones` | GET | Fetch all milestones |
| `/transformation-stories` | GET | Fetch all stories |
| `/dashboard/stats` | GET | Get dashboard statistics |
| `/dashboard/program-performance` | GET | Get program performance |

## Troubleshooting

### CORS Errors
Make sure Flask-CORS is enabled in the backend:
```python
from flask_cors import CORS
CORS(app)
```

### API Connection Failed
1. Check backend is running on port 5000
2. Verify API_BASE_URL in `src/services/api.js`
3. Check browser console for errors

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --clearCache
```

## Performance Optimization

- **Code splitting** - React.lazy() for route-based splitting
- **Memoization** - useMemo/useCallback for expensive computations
- **Debouncing** - Search inputs debounced
- **Virtualization** - Long lists use windowing

## Future Enhancements

1. **Search & Filters** - Advanced filtering capabilities
2. **Export Data** - CSV/PDF export functionality
3. **Notifications** - Real-time notifications
4. **Dark Mode** - Theme toggle
5. **Multi-language** - i18n support
6. **Pagination** - Handle large datasets
7. **Charts** - More visualization options

## Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Adding New Components

1. Create component in `src/components/`
2. Import in `App.jsx`
3. Add route in Routes
4. Update sidebar navigation

## Support

For issues or questions, refer to:
- Main README.md in project root
- Backend API documentation
- React documentation: https://react.dev
- Vite documentation: https://vitejs.dev

---

**Built with ❤️ for Iron Lady - Empowering Women Leaders**
