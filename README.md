# Registration form

A React form backed by a Spring Boot API and PostgreSQL. Locally, the API connects to your existing `registration_db`. The public Render deployment uses a separate hosted PostgreSQL database; it cannot connect to a PostgreSQL server running only on your computer.

## Run locally

Requirements: Node.js 18+, Java 17+, Maven 3.6.3+, and local PostgreSQL.

Start the API from a PowerShell terminal:

```powershell
cd backend
$env:DB_USERNAME = "your-postgres-username"
$securePassword = Read-Host "PostgreSQL password" -AsSecureString
$env:DB_PASSWORD = [System.Net.NetworkCredential]::new("", $securePassword).Password
mvn spring-boot:run
```

In another terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Open **http://localhost:5173**. Vite forwards `/api` requests to the local Spring Boot server at port 8080.

## Public deployment

The root `Dockerfile` packages the React build into Spring Boot so the form and API share one public URL. `render.yaml` describes a Render web service and a hosted PostgreSQL database. To deploy after pushing this repository to GitHub:

1. Sign in to [Render](https://dashboard.render.com/).
2. Choose **New > Blueprint**, connect this GitHub repository, and deploy the `render.yaml` Blueprint.
3. Use the generated `onrender.com` service URL to open and test the public form.

The Blueprint uses Render's free service/database plans to avoid unexpected charges. Free web services can spin down when idle, and free Render Postgres databases expire after 30 days; use a paid database plan for data that must persist longer. See [Render's free-instance limits](https://render.com/docs/free).

Database credentials are supplied to the service by Render and are not stored in this repository.
