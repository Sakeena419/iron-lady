# Iron Lady Learning Assistant - Backend

AI-powered chatbot backend built with FastAPI and Google Gemini 2.0 Flash.

## Features

- RESTful API with FastAPI
- Google Gemini 2.0 Flash via LiteLLM for natural conversations
- GCP Service Account authentication
- Comprehensive knowledge base about Iron Lady programs
- Conversation context management
- Fallback responses when API is unavailable
- CORS enabled for frontend integration

## Setup

1. **Create virtual environment:**
```bash
python -m venv venv
```

2. **Activate virtual environment:**
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Setup Google Cloud Service Account:**

   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select existing one
   
   c. Enable the Vertex AI API:
      - Go to APIs & Services → Library
      - Search for "Vertex AI API"
      - Click Enable
   
   d. Create a Service Account:
      - Go to IAM & Admin → Service Accounts
      - Click "Create Service Account"
      - Name: `iron-lady-chatbot`
      - Click "Create and Continue"
      - Grant role: "Vertex AI User"
      - Click "Done"
   
   e. Create and download key:
      - Click on the service account you just created
      - Go to "Keys" tab
      - Click "Add Key" → "Create new key"
      - Choose JSON format
      - Save the file to your backend folder
   
5. **Configure environment variables:**
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env and add your GCP configuration
GOOGLE_APPLICATION_CREDENTIALS=your-service-account-key.json
GCP_PROJECT_ID=your-project-id
GCP_REGION=us-central1
MODEL_NAME=gemini/gemini-2.0-flash-exp
```

6. **Run the server:**
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /` - API info
- `GET /api/health` - Health status

### Chat
- `POST /api/chat` - Send message and get AI response
  ```json
  {
    "message": "What programs do you offer?",
    "conversation_id": "optional-id"
  }
  ```

### Resources
- `GET /api/quick-questions` - Get suggested questions
- `GET /api/programs` - Get all programs information

## Google Cloud Setup Details

### Prerequisites
- Google Cloud account
- Project with billing enabled
- Vertex AI API enabled

### Required IAM Roles
Your service account needs:
- **Vertex AI User** - To use Gemini models
- Or **Vertex AI Service Agent** - For full access

### Supported Models
- `gemini/gemini-2.0-flash-exp` (Recommended - Fast & Free)
- `gemini/gemini-1.5-pro`
- `gemini/gemini-1.5-flash`

### Region Options
- `us-central1` (Default - Iowa)
- `us-east4` (Virginia)
- `europe-west1` (Belgium)
- `asia-northeast1` (Tokyo)

## Project Structure

```
backend/
├── main.py                 # FastAPI application
├── services/
│   ├── chatbot_service.py # AI chatbot logic
│   └── knowledge_base.py  # Program information
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables
```

## Notes

- The chatbot has a fallback mode that works without Gemini API
- Conversations are stored in memory (resets on server restart)
- Gemini 2.0 Flash is currently **FREE** during experimental phase
- Service account credentials are more secure than API keys
- LiteLLM provides unified interface for multiple AI providers

## Cost Estimation

**Gemini 2.0 Flash (Experimental):**
- Currently FREE
- After GA: ~$0.00001 per 1K characters (very cheap)

**Gemini 1.5 Pro:**
- Input: $0.00125 per 1K characters
- Output: $0.005 per 1K characters

For 1000 conversations/month: ~$1-5 (much cheaper than GPT-4)
