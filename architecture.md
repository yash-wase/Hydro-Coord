# 🌊 HydroCoord – System Architecture (Final)

---

# 🎯 1. SYSTEM OVERVIEW

HydroCoord is a **map-driven, event-based water monitoring system** that:

* Visualizes sector-wise pressure on a real map
* Detects anomalies using computation models
* Triggers alerts and generates tasks
* Supports operator workflow and verification

---

# 🧠 2. ARCHITECTURE TYPE

Hybrid system combining:

* Simulation (pressure computation)
* Event-driven processing
* Workflow management
* Map-based visualization

---

# 🧱 3. HIGH-LEVEL ARCHITECTURE

```text id="a1"
Frontend (React + Leaflet UI)
        ↓
Backend API (Node.js)
        ↓
Python Model Service
        ↓
Data Layer (DB / JSON)
```

---

# 🔁 4. DATA FLOW

```text id="a2"
Input Factors
   ↓
Model 1 (Compute Pressure)
   ↓
Baseline Dataset
   ↓
Model 2 (Event Adjustment)
   ↓
Updated Dataset + Alerts
   ↓
Decision Layer
   ↓
Tasks + Notifications
   ↓
Frontend (Leaflet Map + Dashboard)
```

---

# 🧩 5. CORE COMPONENTS

---

## 5.1 Frontend Layer

Built using:

* React.js
* Leaflet
* TailwindCSS

---

### Responsibilities:

* Render GeoJSON sectors
* Display pressure via color
* Show dashboards (tasks, alerts, verification)
* Handle user interactions

---

## 5.2 Backend Layer (Node.js)

---

### Responsibilities:

* API routing
* Data aggregation
* Communication with Python service
* Task & alert management

---

### Key APIs:

```text id="api_list"
GET /pressure
GET /alerts
POST /tasks
POST /upload
GET /tasks
```

---

## 5.3 Python Model Layer

---

### Model 1: Computation Engine

* Generates baseline pressure
* Uses:

  * Base pressure
  * Demand factor
  * Distance

---

### Model 2: Event Engine

* Adjusts pressure based on:

  * Complaints
  * Alerts
  * Weather

---

### Output:

* Updated pressure dataset
* Alert triggers
* Short-term predictions

---

## 5.4 Data Layer

---

### Stores:

* GeoJSON sector data
* Pressure values
* Tasks
* Alerts
* Verification records

---

### Options:

* MongoDB
* JSON (for MVP)

---

# 🗺️ 6. MAP ARCHITECTURE (LEAFLET)

---

## Data Format:

GeoJSON

---

## Structure:

```json id="geo"
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

## Rendering Flow:

```text id="map_flow"
GeoJSON → Leaflet Layer → Style Function → Color Rendering
```

---

## Interaction Flow:

```text id="map_interact"
Hover → Tooltip
Click → Sector Detail Panel
```

---

# 🚨 7. EVENT & ALERT SYSTEM

---

## Event Sources:

### 1. System Generated

* Low pressure
* Sudden drop

---

### 2. User Generated

* Public complaints

---

### 3. External

* Weather API

Example:

* OpenWeather

---

## Alert Flow:

```text id="alert_flow"
Event → Model 2 → Alert Generated → Dashboard Display
```

---

# 📋 8. TASK MANAGEMENT ARCHITECTURE

---

## Workflow:

```text id="task_flow"
Alert → Task Creation → Assignment → Execution → Verification
```

---

## Roles:

* Admin → assigns & verifies
* Operator → executes tasks

---

# 📸 9. VERIFICATION SYSTEM

---

## Flow:

```text id="verify_flow"
Operator Upload → Backend Store → Admin Review → Approve/Reject
```

---

## Purpose:

* Ensure accountability
* Validate field work

---

# 👥 10. PUBLIC REQUEST SYSTEM

---

## Types:

* Emergency → immediate alert
* Suggestion → admin review

---

## Flow:

```text id="public_flow"
User → Request → Backend → Alert/Review → Action
```

---

# ⚙️ 11. TECH STACK SUMMARY

---

## Frontend:

* React
* Leaflet
* TailwindCSS

---

## Backend:

* Node.js
* Express

---

## Model:

* Python
* FastAPI / Flask

---

## Data:

* MongoDB / JSON

---

# 🔄 12. SYSTEM LOOP

```text id="loop"
Compute → Adjust → Detect → Alert → Act → Verify → Repeat
```

---

# ⚠️ 13. DESIGN PRINCIPLES

---

* Avoid fake ML claims
* Use explainable logic
* Keep system modular
* Ensure real-time feel

---

# 🏆 14. FINAL SYSTEM CAPABILITY

HydroCoord can:

✔ Visualize pressure
✔ Detect anomalies
✔ Trigger alerts
✔ Manage tasks
✔ Support decision-making

---

# 🎯 15. ONE-LINE SUMMARY

HydroCoord is a **map-driven, event-based system that simulates, monitors, and manages water distribution using real-time interaction and intelligent computation.**

---
