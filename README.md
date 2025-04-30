# Vietnamese Sentiment Analysis Application

A comprehensive application for analyzing sentiment in Vietnamese text using PhoBERT model trained on the UIT-VSFC dataset.

## Introduction

This application provides a complete solution for Vietnamese sentiment analysis with both backend and frontend components:
- **Backend**: Built with FastAPI, providing an API for Vietnamese text sentiment analysis
- **Frontend**: Built with Next.js, providing a user-friendly interface

The system uses a fine-tuned PhoBERT model to identify three main sentiment types: positive, neutral, and negative.

## Directory Structure

```
sentiment-analysis/
│
├── backend/                # Backend source code
│   ├── app.py              # Entry point for the FastAPI application
│   ├── requirements.txt    # List of required libraries
│   └── model/              # Directory containing PhoBERT model
│       └── sentiment_model/
│
├── frontend/               # Frontend source code
│   ├── app/                # Next.js route directory
│   ├── components/         # React components
│   ├── public/             # Static assets
│   ├── utils/              # Utility functions
│   ├── package.json        # Dependencies configuration
│   └── next.config.ts      # Next.js configuration
│
├── train/                  # Model training source code
│   ├── train.ipynb         # Training notebook
│   └── test_predict.ipynb  # Prediction testing notebook
│
└── readme.md               # This file
```

## Technical Requirements

### Backend
- Python 3.10 or higher
- FastAPI
- PyTorch
- Transformers
- Libraries listed in [`backend/requirements.txt`](backend/requirements.txt)

### Frontend
- Node.js 16.0 or higher
- Next.js
- React
- TypeScript
- Tailwind CSS

## Installation and Running the Application

### 1. Clone the repository:
```bash
git clone https://github.com/trong-nhan-tran/sentiment-analysis.git
cd sentiment-analysis
```

### 2. Backend Setup:

#### Create and activate a virtual environment:

##### On macOS/Linux:
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
source .venv/bin/activate
```

##### On Windows:
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate
```

#### Install required libraries:
```bash
pip install -r requirements.txt
```

#### Start the backend:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The Backend API will be running at `http://localhost:8000`

### 3. Frontend Setup:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The Frontend will be running at `http://localhost:3000`

## API Endpoints

### Sentiment Analysis
```
POST /api/predict
```

**Request body:**
```json
{
  "text": "Text to analyze sentiment"
}
```

**Response:**
```json
{
  "positive": 0.85,  
  "neutral": 0.10,   
  "negative": 0.05,  
  "sentiment": "positive"
}
```

Where:
- positive, neutral, negative: Probabilities of belonging to each sentiment group
- sentiment: Predicted sentiment (value can be "positive", "neutral", or "negative")

## Using the Application

1. Access the user interface at `http://localhost:3000`
2. Enter the text to be analyzed in the input field
3. Click the "Analyze" button to see the results
4. Analysis history will be stored for reference

