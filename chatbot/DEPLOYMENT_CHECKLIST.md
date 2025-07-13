# Firefly Chatbot: Deployment & Update Checklist

This document summarizes what you need to do for your chatbot website to work after making changes to the code or configuration.

## 1. Update Your Code
- Make your changes in the frontend (`src/App.tsx`) or backend (`backend/main.py`).
- Save and commit your changes:
  ```bash
  git add .
  git commit -m "Describe your change"
  ```

## 2. Deploy the Backend (FastAPI on Render)
- If you change backend code or update environment variables (like `CHATBOT_PASSWORD`):
  1. Push your changes to GitHub (if Render is connected to your repo), or use Render's web editor.
  2. **If you change an environment variable:** Go to the Render dashboard, update the variable, and manually trigger a redeploy or restart the service.
  3. Wait for the backend to finish redeploying.

## 3. Deploy the Frontend (GitHub Pages)
- If you change frontend code:
  1. Build the project:
     ```bash
     npm run build
     ```
  2. Deploy to GitHub Pages:
     ```bash
     npm run deploy
     ```
  3. Wait a minute, then visit your custom domain or GitHub Pages URL.
  4. Clear your browser cache or use a private window to see the latest version.

## 4. Test the Chatbot
- Go to your website.
- Enter the password (must match the backend's `CHATBOT_PASSWORD`).
- Send a message (e.g., "hello").
- The bot should respond according to the backend logic.

## 5. Troubleshooting
- If the password is rejected, make sure the frontend and backend are both updated and the backend was restarted after changing the password.
- If the site doesn't update, make sure you ran both the build and deploy steps for the frontend.
- If the backend doesn't respond, check the Render dashboard for errors.

## 6. Customizing Bot Responses
- Edit `backend/main.py` to change or add responses for greetings, farewells, or company info.
- No external APIs or costs are required for this rule-based logic.

---

**Tip:** Keep this document updated as your deployment process evolves!
