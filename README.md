# SimulateRecruitAI - AI Interview Mocker

An end-to-end interview preparation platform powered by **Next.js**, **Gemini AI**, **Drizzle + NeonDB** and **Clerk** for authentication. Designed to streamline & simulate real-world interviews with dynamic question generation, feedback mechanisms & recording features.

---

# Architecture

![image](https://github.com/user-attachments/assets/e3cb2ee2-f0d0-430f-af16-17900b5a21cb)

---

##  Features

-  **Authentication** with Clerk
-  **AI-Driven** Interview Generation & Feedback (via Gemini AI)
-  **Custom Questions** and Interview Creation
-  **Interview Simulation**: Question + Record Answer + AI Feedback
-  **Dashboard** to Manage Interviews, Questions & Progress
-  **Stripe Payments** Payment Gateway
-  **Fully Dockerized** for Deployment
-  Built with **React**, **TailwindCSS** and **Next.js App Router**

---

## Tech Stack

| Purpose              | Tech                      |
|----------------------|---------------------------|
| Frontend Framework   | Next.js+React (App Router)|
| Styling              | TailWindCSS               |
| Component System     | Custom + ShadCN UI        |
| Authentication       | Clerk                     |
| Database             | Neon (Postgres) + Drizzle |
| AI Integration       | Gemini AI (Google)        |
| Payments             | Stripe (USD only)         |
| Containerization     | Docker                    |
| Deployment           | Vercel                    |

---

## Project Structure
```bash
root
├─ app/                # App directory (Next.js App Router)
│  ├─ auth/            # Clerk-based Sign-in & Sign-up
│  ├─ dashboard/       # Main dashboard with modular components
│  ├─ interview/       # Interview flow: start, feedback, details
│  ├─ pyq/             # Previous Year Questions
│  └─ upgrade/         # Stripe payment upgrade page
├─ components/         # Shared UI Components (button, card, modal)
├─ utils/              # Gemini modal, DB logic, schema
├─ public/             # Static assets
├─ Dockerfile          # Docker build
├─ compose.yaml        # Docker Compose (if multi-service setup)
├─ next.config.mjs     # Next.js config
├─middleware.js        # Backend middlewares
├─ package.json        # Dependencies
└─ README.md
```

---

## Admin Panel, DB & Backend Logs

**1.Clerk**

![Clerk admin dashboard](https://github.com/user-attachments/assets/f1e1ed25-d118-4c6b-9331-9c8a811addbe)

**2.NeonDB (all 4 tables)**

![Mock Interview](https://github.com/user-attachments/assets/2b04bff8-caae-4858-9131-49d9e6a52836)
![Newsletter](https://github.com/user-attachments/assets/6b8b59e1-7f47-4c1c-b9bd-049780010f1e)
![Question](https://github.com/user-attachments/assets/7bfdb30f-141c-47f3-9721-c295e10ad104)
![User Answer](https://github.com/user-attachments/assets/1ee420ae-e489-4903-9de2-195aab059251)

---

## Stripe Test Checkout Flow
https://github.com/user-attachments/assets/2a9ffc74-56d0-4e00-9703-9e4e310d1c75

---

## Local Development

**1. Clone & Install**
```bash
git clone https://github.com/Soumilgit/Soumilgit-AI-Interview-SAAS.git
cd Soumilgit-AI-Interview-SAAS
npm install
```

**2. Configure Environment Variables**
Create a `.env.local` file:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_DRIZZLE_DB_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
NEXT_PUBLIC_INFORMATION="Enable your video & microphone, webcam recommended."
NEXT_PUBLIC_QUESTION_NOTE="You can move to next qs. by clicking on 'Next Question' button."
```

**3. Run Locally**
Configure Clerk & Drizzle locally, then
```bash
npm run dev
```

or with Docker:
```bash
docker compose up --build
```

---

## Production Deployment
Use platforms like **Vercel**, **Render**, **Railway** or **Docker-based VPS** .

Securely add `.env.local` variables & `drizzle.config.js` to production environment

---

## Future Scope
🎯 Full-screen Interview Mode

🚫 Tab-Switch Detection & Blocking

🎧 Real-Time Proctoring Tools

📈 Analytics Dashboard for Admins & Users

🧑‍💻 Coding Interview support

## How To Contribute

1. Fork this repo & clone your fork locally.  
2. Create a new branch: `git checkout -b your-feature-name`  
3. Make changes, test locally, then commit: `git commit -m "your message"`  
4. Push to your fork: `git push origin your-feature-name`  
5. Open a Pull Request — I’ll take it from there 😊.  
