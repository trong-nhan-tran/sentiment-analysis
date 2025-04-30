from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import torch.nn.functional as F
from pydantic import BaseModel

app = FastAPI(title="Sentiment Analysis API")

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # URL của Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model loading
MODEL_PATH = "./model/sentiment_model/"
model = None
tokenizer = None

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    probabilities: dict[str, float]

@app.on_event("startup")
async def startup_event():
    global model, tokenizer
    print(f"Đang tải mô hình từ {MODEL_PATH}...")
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model.eval()
    print("Đã tải mô hình thành công!")

def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    
    # Predict
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=-1)
    
    # Get results
    predicted_class = torch.argmax(probs, dim=1).item()
    probabilities = probs[0].tolist()
    
    # Map label indices to sentiment names
    sentiment_labels = {0: "negative", 1: "neutral", 2: "positive"}
    result = {
        "sentiment": sentiment_labels[predicted_class],
        "probabilities": {sentiment_labels[i]: round(prob, 4) for i, prob in enumerate(probabilities)}
    }
    print(f"Đã dự đoán: {result}")
    
    return result

@app.post("/api/predict", response_model=SentimentResponse)
async def predict_sentiment(sentiment_request: SentimentRequest):
    result = predict(sentiment_request.text)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)