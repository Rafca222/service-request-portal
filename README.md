\# Internal Service Request Portal



A full-stack web application that allows employees to submit and track internal service requests for IT, HR, Facilities, and Finance teams.



\## Tech Stack



\- \*\*Frontend:\*\* React + Vite + TypeScript

\- \*\*Backend:\*\* NestJS

\- \*\*Database:\*\* PostgreSQL

\- \*\*ORM:\*\* Prisma

\- \*\*Containerization:\*\* Docker + Docker Compose



\## Features



\- Create new service requests

\- View and search all requests by title

\- Edit existing requests and update their status

\- Delete or cancel requests

\- DTO validation and consistent error handling

\- Fully containerized with Docker



\## How to Run



\### Prerequisites

\- Docker Desktop installed and running



\### Start the app



```bash

docker compose up --build

```



\- Frontend: http://localhost:5173

\- Backend API: http://localhost:3000

\- Database: localhost:5432



\### Run locally without Docker



\*\*Backend:\*\*

```bash

cd backend

npm install

npm run start:dev

```



\*\*Frontend:\*\*

```bash

cd frontend

npm install

npm run dev

```



> Make sure PostgreSQL is running via Docker before starting the backend locally:

> ```bash

> docker compose up postgres -d

> ```



\## Project Structure
service-request-portal/

├── backend/          # NestJS API

│   ├── src/

│   │   ├── lib/database/     # Prisma service and module

│   │   └── service-requests/ # CRUD module

│   └── prisma/       # Schema and migrations

├── frontend/         # React + Vite app

│   └── src/

│       ├── api/      # Axios API client

│       └── pages/    # RequestsPage, CreateRequestPage, EditRequestPage

└── docker-compose.yml


## API Endpoints



| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | /service-requests | Get all requests (supports ?search=) |

| POST | /service-requests | Create a new request |

| GET | /service-requests/:id | Get a single request |

| PATCH | /service-requests/:id | Update a request |

| DELETE | /service-requests/:id | Delete a request |

