
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

    # TODO: Replace with real chatbot logic or API call
    return {"response": f'You said: "{user_message}" (from backend)'}

@app.get("/")
def root():
    return {"status": "ok"}
