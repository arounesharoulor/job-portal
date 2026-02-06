# Job Portal Frontend

This is the React frontend for the Job Portal project.

## Features
- List jobs
- View job details
- Post a job (recruiter)
- Apply for a job (candidate, with file upload)
- View applications (recruiter)
- Update application status (planned)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure
- `src/pages/` — Main pages (JobList, JobDetails, JobForm, ApplicationForm, ApplicationList, NotFound)
- `src/context.js` — Context for global state
- `src/App.js` — Routing setup

## Note
- API endpoints are placeholders; connect to the backend once available.
