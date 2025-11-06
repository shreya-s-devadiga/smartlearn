# SmartLearn Full Stack

React (Vite) + Bootstrap + Axios frontend, Spring Boot + MySQL backend.

## Prereqs
- Node 18+ and npm
- Java 17+ and Maven
- MySQL (Workbench optional)

## 1) Backend
```bash
cd backend
# edit src/main/resources/application.properties with your MySQL password
mvn spring-boot:run
```
Backend runs on http://localhost:8080

## 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173. The vite dev server proxies `/api` to the backend.

## 3) Emotion models (optional)
Place Face API models into `frontend/src/assets/models/`:
- tiny_face_detector_model-weights_manifest.json + shard files
- face_expression_model-weights_manifest.json + shard files

You can obtain them from the face-api.js repo. If models are absent, emotion detector will show a warning.

## Endpoints used
- POST /api/users/register  {fullname,email,username,password}
- POST /api/users/login     {username,password}
- POST /api/support         {emotion,userMsg}

## Notes
- Passwords are hashed with BCrypt.
- CORS is enabled for localhost:5173
- JPA auto creates/updates tables (ddl-auto=update).