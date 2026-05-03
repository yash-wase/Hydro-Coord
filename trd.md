# 🌊 HydroCoord – Technical Requirements Document (TRD)

---

# 🧠 1. System Architecture (Final)

```text id="trd_arch"
Frontend (React + Leaflet)
        ↓
Backend API (Node.js + Express)
        ↓
Python Model Service (Flask/FastAPI)
        ↓
Database (MongoDB / JSON storage)
```

---

# ⚙️ 2. Tech Stack

## Frontend

* React.js
* TailwindCSS
* Leaflet
* React-Leaflet

---

## Backend

* Node.js
* Express.js

---

## Model Layer

* Python
* FastAPI (preferred) or Flask
* NumPy / Pandas (optional)

---

## Database

* MongoDB (or JSON for MVP)

---

## APIs

* Weather (optional):

  * OpenWeather

---

# 📁 3. Project Structure

```text id="folder"
hydrocoord/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── map/
│   │   ├── Map.jsx
│   │   ├── SectorLayer.jsx
│   ├── assets/maps/ (GeoJSON files)
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│
├── python-service/
│   ├── main.py
│   ├── model1.py
│   ├── model2.py
│
└── data/
    ├── sectors.json
    ├── pressure.json
```

---

# 🗺️ 4. Map Implementation (Leaflet)

## Data Format: GeoJSON

Each sector:

```json id="geojson"
{
  "type": "Feature",
  "properties": {
    "name": "Sector A",
    "pressure": 72
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [...]
  }
}
```

---

## Rendering Logic

```js id="mapstyle"
function getColor(p) {
  if (p < 30) return "#EF4444";
  if (p < 70) return "#F59E0B";
  return "#22C55E";
}
```

---

# 🧠 5. Python Model Layer

---

## 5.1 Model 1 (Computation Engine)

### File: model1.py

```python id="m1"
def compute_pressure(base, distance, demand):
    return base - (distance * 2) - (demand * 5)
```

---

## 5.2 Model 2 (Event Engine)

### File: model2.py

```python id="m2"
def adjust_pressure(pressure, complaints):
    if pressure < 30 and complaints > 2:
        return pressure - 20, "PIPE_BURST"
    return pressure, None
```

---

## 5.3 API Service

### File: main.py

```python id="api"
from fastapi import FastAPI

app = FastAPI()

@app.get("/pressure")
def get_pressure():
    return {"A": 72, "B": 45}
```

---

# 🔗 6. Backend API (Node.js)

---

## Routes

### Get Pressure

```js id="route1"
GET /api/pressure
```

---

### Get Alerts

```js id="route2"
GET /api/alerts
```

---

### Create Task

```js id="route3"
POST /api/tasks
```

---

### Upload Image

```js id="route4"
POST /api/upload
```

---

# 📋 7. Task System

---

## Data Model

```json id="taskmodel"
{
  "task_id": "T1",
  "type": "Fix Leak",
  "sector": "A",
  "status": "In Progress",
  "assigned_to": "Operator1"
}
```

---

## Status Flow

```text id="statusflow"
Pending → Assigned → In Progress → Completed → Verified
```

---

# 📸 8. Verification System

---

## Flow

```text id="verify"
Upload → Pending → Approve/Reject
```

---

## Storage

* Use local storage or Cloudinary

---

# 🚨 9. Alert System

---

## Trigger Logic

```python id="alert"
if pressure < 30:
    alert = "LOW_PRESSURE"
```

---

# 🌧️ 10. Event Integration

---

## Weather API

* Fetch rain data
* Trigger event

---

# 🔄 11. Data Flow

```text id="flow2"
Python Model → Backend → Frontend Map
                ↓
             Alerts
                ↓
             Tasks
```

---

# ⚡ 12. Deployment (MVP)

---

## Frontend

* Vercel / Netlify

## Backend

* Render / Railway

## Python Service

* Render / Local

---

# 🎯 13. Development Phases

---

## Phase 1

* Leaflet map
* Static GeoJSON

---

## Phase 2

* Python model integration

---

## Phase 3

* Alerts + Tasks

---

## Phase 4

* Verification + UI polish

---

# 🏆 14. Final System Capability

HydroCoord will:

* Visualize pressure ✔
* Detect anomalies ✔
* Generate alerts ✔
* Manage tasks ✔
* Support decision making ✔

---

# 🎯 15. Final Note

Keep:

* Logic simple
* UI clean
* System functional

Avoid:

* Overengineering
* Fake ML

---
