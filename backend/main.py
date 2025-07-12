
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store your real password as an environment variable on Render
PASSWORD = os.environ.get("CHATBOT_PASSWORD", "changeme")


@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    password = data.get("password", "")

    if password != PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # Simple rule-based chatbot logic with placeholders
    msg = user_message.strip().lower()
    
    greetings = ["hello", "hi", "hey", "greetings"]
    farewells = ["bye", "goodbye", "see you", "farewell"]
    company_keywords = {
        "hours": "Our business hours are 9am to 5pm, Monday through Friday.",
        "location": "We are located at 123 Main St, Hometown, USA.",
        "contact": "You can contact us at (555) 123-4567 or email info@example.com.",
        "services": "We offer a range of services. Please visit our website for more details.",
        "about": "We are a company dedicated to customer satisfaction."
    }

    # Greeting
    if any(word in msg for word in greetings):
        return {"response": "Hello! How can I help you today?"}
    # Farewell
    if any(word in msg for word in farewells):
        return {"response": "Goodbye! Have a great day!"}
    # Company info
    for keyword, reply in company_keywords.items():
        if keyword in msg:
            return {"response": reply}
    # Fallback
    return {"response": "I'm here to answer questions about our company. How can I help?"}

@app.get("/")
def root():
    return {"status": "ok"}
