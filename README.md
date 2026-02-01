# Iron Lady 

**Developer:** Sakeena | AI Enthusiast & Full-Stack Developer

This repository contains two full-stack solutions developed for Iron Lady's mission of **ELEVATING A MILLION WOMEN TO THE TOP**.

##  About Me

I'm **Sakeena**, an AI enthusiast and full-stack developer passionate about building intelligent solutions that empower organizations and their communities. I specialize in creating scalable applications that combine modern AI capabilities with robust backend systems and intuitive user interfaces. My expertise spans React, Python, AI/ML integration, and database architecture, with a focus on solving real-world business challenges through technology.

---

## Overview

- **Task 1:** Iron Lady AI Assistant - An intelligent chatbot powered by Google Gemini 2.0 Flash
- **Task 2:** Participant Tracking System - A comprehensive participant management platform

---

## Task 1: Iron Lady AI Assistant

An AI-powered chatbot that provides intelligent guidance about Iron Lady's programs, business war tactics, and empowering mindset development.

### Features

- **Intelligent Conversations** - Powered by Google Gemini 2.0 Flash through LiteLLM
- **Comprehensive Knowledge Base** - Contains detailed information about all Iron Lady programs:
  - Leadership Essentials Program
  - 100 Board Members Program
  - Master of Business Warfare
  - Business War Tactics Masterclass
  - Winning Mindset Development
- **Brand-Aligned Responses** - AI speaks with Iron Lady's bold, empowering voice
- **Context-Aware** - Maintains conversation history for personalized guidance
- **Responsive UI** - Modern, mobile-friendly interface with real-time typing indicators

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (API calls)
- Lucide React (icons)

**Backend:**
- Python 3.10+
- FastAPI (web framework)
- Google Gemini 2.0 Flash (AI model via LiteLLM)
- Google Cloud Vertex AI
- Uvicorn (ASGI server)

### Quick Start

```bash
# Backend
cd Task1/backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py

# Frontend
cd Task1/frontend
npm install
npm run dev
```

**Access:** Frontend at `http://localhost:3000`, Backend at `http://localhost:8000`

### Key Highlights

* Real-time AI responses with streaming capability  
* Knowledge base with 200+ data points about Iron Lady programs  
* Conversation memory and context awareness  
* Bold, empowering brand voice alignment  
* Production-ready with error handling and fallbacks  
[📖 Full Documentation](Task1/README.md)

---

## Task 2: Participant Tracking System

A comprehensive participant management platform that enables Iron Lady to efficiently track thousands of participants across multiple programs.

### Problem Solved

Iron Lady manages thousands of ambitious women across various programs. Without a centralized system, tracking participant data, enrollment journeys, progress milestones, and program completion becomes fragmented and inefficient. This solution provides a scalable platform for complete participant lifecycle management.

### Features

**Dashboard:**
- Real-time metrics (Active Participants, Active Programs, Enrollments, Completions)
- Visual analytics and key performance indicators
- Quick overview of organizational health

**Participant Management:**
- Complete CRUD operations (Create, Read, Update, Delete)
- Detailed participant profiles (role, company, experience, career goals)
- Status tracking (Active, Inactive, Alumni)
- Industry and career goal categorization

**Program Management:**
- Manage multiple programs (Leadership Essentials, 100 Board Members, Master of Business Warfare)
- Track program modules and duration
- Monitor enrollment capacity and status

**Enrollment Tracking:**
- Link participants to programs
- Track enrollment dates and completion status
- Monitor participant progress through programs

**Milestone & Progress Tracking:**
- Record participant achievements and milestones
- Track module completion
- Generate progress reports

### Tech Stack

**Frontend:**
- React 18
- Modern component architecture
- Responsive design

**Backend:**
- Python 3.10+
- Flask (REST API framework)
- Flask-CORS (cross-origin support)

**Database:**
- MySQL (relational database)
- Comprehensive schema with relationships between participants, programs, enrollments, milestones, and modules

### Quick Start

```bash
# Database Setup
mysql -u root -p < Task2/database/schema.sql

# Backend
cd Task2/backend
pip install -r requirements.txt
# Configure .env with database credentials
python app.py

# Frontend
cd Task2/frontend
npm install
npm run dev
```

**Access:** Frontend at `http://localhost:3000`, Backend API at `http://localhost:5000`

### Database Schema

- **Participants** - Core participant information
- **Programs** - Program details and configurations
- **Enrollments** - Links participants to programs
- **Milestones** - Tracks participant achievements
- **Modules** - Program curriculum structure
- **Progress Tracking** - Monitors completion status

### Key Highlights

* Scalable architecture for thousands of participants  
* Complete REST API with 25+ endpoints  
* Real-time dashboard analytics  
* Intuitive UI for easy participant management  
* Production-ready with error handling and validation  
[📖 Full Documentation](Task2/backend/README.md)

---

## Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- MySQL Server (for Task 2)
- Google Cloud account with Vertex AI access (for Task 1)

### Environment Configuration

**Task 1 (.env in backend/):**
```env
GOOGLE_APPLICATION_CREDENTIALS=service-account.json
AGENT_MODEL=gemini-2.5-pro
```

**Task 2 (.env in backend/):**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=iron_lady_participants
```

---

## Project Structure

```
ironlady/
├── Task1/                          # AI Assistant
│   ├── backend/
│   │   ├── main.py                # FastAPI application
│   │   ├── services/
│   │   │   ├── chatbot_service.py # AI logic
│   │   │   └── knowledge_base.py  # Program data
│   │   └── requirements.txt
│   └── frontend/
│       ├── src/
│       │   ├── components/        # React components
│       │   └── api/               # API integration
│       └── package.json
│
└── Task2/                          # Participant Tracking System
    ├── backend/
    │   ├── app.py                 # Flask REST API
    │   ├── database.py            # Database connection
    │   └── requirements.txt
    └── frontend/
        ├── src/
        │   ├── components/        # React components
        │   └── services/          # API services
        └── package.json
```

---

## Key Technical Decisions

### Task 1: AI Assistant
- **LiteLLM Integration** - Provides unified interface for multiple AI providers with easy switching
- **Google Gemini 2.0 Flash** - Latest model with improved reasoning and faster responses
- **Knowledge Base Architecture** - Structured data enables consistent, accurate responses
- **FastAPI** - Modern Python framework with automatic API documentation and high performance

### Task 2: Participant Tracking
- **MySQL Database** - Relational structure perfect for participant-program-milestone relationships
- **Flask REST API** - Lightweight, flexible Python framework for rapid API development
- **Normalized Schema** - Prevents data redundancy and ensures data integrity
- **React Component Architecture** - Modular, reusable components for maintainability

---

## Business Impact

**Task 1: AI Assistant**
- 24/7 availability for participant inquiries
- Consistent brand voice across all interactions
- Reduces manual support workload
- Scales effortlessly with growing community

**Task 2: Participant Tracking System**
- Centralized management of thousands of participants
- Real-time visibility into program performance
- Data-driven decision making with analytics
- Streamlined operations and reduced administrative overhead

---

## API Documentation

### Task 1: AI Assistant API
- `POST /api/chat` - Send message to AI assistant
- `GET /api/health` - Health check endpoint

### Task 2: Participant Tracking API
- **Participants:** GET, POST, PUT, DELETE `/api/participants`
- **Programs:** GET, POST, PUT, DELETE `/api/programs`
- **Enrollments:** GET, POST, PUT, DELETE `/api/enrollments`
- **Milestones:** GET, POST, PUT, DELETE `/api/milestones`
- **Dashboard:** GET `/api/dashboard/stats`

Full API documentation available in respective backend folders.

---
