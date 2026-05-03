<div align="center">

<img src="frontend/src/assets/hero_image.jpg" alt="HydroCoord Banner" width="100%" style="border-radius:12px; max-height:320px; object-fit:cover;" />

<br/><br/>

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
<img src="https://img.shields.io/badge/Leaflet-Map-199900?style=for-the-badge&logo=leaflet&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />

<br/><br/>

# 💧 HydroCoord

### *Intelligent Water Distribution Monitoring & Control System*

> A map-driven, event-based system that simulates, monitors, and manages water distribution using real-time interaction and intelligent computation — built for Maharashtra's water infrastructure.

<br/>

[🚀 Live Demo](#-getting-started) · [📖 Docs](#-architecture) · [🐛 Issues](https://github.com/yash-wase/hydrocoord/issues) · [✨ Features](#-features)

</div>

---

## 📌 Overview

**HydroCoord** is a full-stack operational dashboard for water department administrators, field operators, and the public. It visualizes sector-wise water pressure across Maharashtra on an interactive Leaflet map, detects anomalies using Python computation models, manages field tasks end-to-end, and handles public complaints — all in one unified system.

```
React (Leaflet UI)
      ↓  HTTP
Node.js Backend (API Gateway)
      ↓  HTTP
Python FastAPI (Pressure Models)
      ↓
Computed Sector Data (JSON)
```

---

## ✨ Features

| Module | Description |
|---|---|
| 🗺️ **Live Pressure Map** | GeoJSON sectors over Maharashtra, color-coded by pressure (green/orange/red), with PSI labels directly on each sector |
| 📊 **Sector Dashboard** | Real-time avg pressure, active alerts, sector health stats — refreshes every 30s |
| 🚨 **Alert System** | Auto-generated alerts on pressure drops, pipe bursts, and anomalies |
| 📋 **Task Management** | Admin creates & assigns tasks; operators start, upload proof, and complete — full workflow |
| 📸 **Verification Panel** | Admin approves or rejects operator-submitted field evidence with live status updates |
| 📣 **Public Requests** | Citizens submit Emergency or Suggestion requests; admin assigns tasks directly from the request table |
| 🚛 **Tanker Directory** | 24 tanker drivers across 12 sectors with phone numbers, vehicle info, and status — admin can send pre-alerts |
| 🔐 **Role-Based Auth** | Three roles: Admin (full access), Operator (tasks only), Public (requests + map) |

---

## 🧠 Intelligence Layer

HydroCoord uses a **two-layer Python model** for pressure computation:

### Model 1 — Baseline Computation
```python
def compute_pressure(base, distance, demand):
    alpha = 2   # distance decay factor
    beta  = 5   # demand impact factor
    pressure = base - (distance * alpha) - (demand * beta)
    return max(0, min(100, pressure))
```

### Model 2 — Event Adjustment
```python
def adjust_pressure(pressure, complaints, rainfall=False):
    if pressure < 30 and complaints > 2:
        pressure -= 20
        alert = "PIPE_BURST"
    if rainfall:
        pressure -= 10
    return max(0, pressure), alert
```

---

## 🗺️ Maharashtra Sector Coverage

12 sectors covering the full state:

| ID | Region | ID | Region |
|---|---|---|---|
| A | Nashik | G | Konkan South |
| B | Aurangabad | H | Nagpur |
| C | Latur | I | Sangli |
| D | Pune | J | Kolhapur |
| E | Solapur | K | Osmanabad |
| F | Konkan North | L | Nanded |

---

## 🏗️ Architecture

```
hydrocoord/
├── frontend/               # React + Vite + Leaflet
│   ├── src/
│   │   ├── pages/          # Landing, Login, Dashboard, Tasks, Alerts,
│   │   │                   # Verification, Requests, Tankers
│   │   ├── components/
│   │   │   ├── layout/     # Sidebar, Topbar, DashboardLayout
│   │   │   └── map/        # LeafletMap, SectorLayer
│   │   ├── context/        # AuthContext (role-based access)
│   │   └── data/           # sectors.json (GeoJSON)
│   └── public/
│
├── backend/                # Node.js + Express
│   ├── server.js
│   └── routes/
│       ├── pressure.js     # Proxies → Python /pressure
│       └── alerts.js       # Proxies → Python /alerts
│
└── python-service/         # FastAPI
    ├── main.py             # API endpoints
    ├── model1.py           # Baseline pressure computation
    └── model2.py           # Event adjustment + anomaly detection
```

---

## 🔐 Role Access Matrix

| Feature | Admin | Operator | Public |
|---|:---:|:---:|:---:|
| Pressure Map | ✅ | ✅ | ✅ |
| Tanker Directory | ✅ | ✅ | ✅ |
| Task Management | ✅ | ✅ (own tasks) | ❌ |
| Create Tasks | ✅ | ❌ | ❌ |
| Alerts | ✅ | ❌ | ❌ |
| Verification | ✅ | ❌ | ❌ |
| Public Requests | ✅ (view+assign) | ❌ | ✅ (submit) |
| Send Pre-Alerts | ✅ | ❌ | ❌ |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- pip

### 1. Python Service

```bash
cd python-service
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

### 2. Node.js Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:4000
```

### 3. React Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Environment

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:4000
```

---

## 🎨 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Leaflet, react-leaflet, Axios |
| Backend | Node.js, Express.js, Axios |
| Model Service | Python, FastAPI, Uvicorn |
| Styling | Custom CSS Design System (no Tailwind) |
| Map | Leaflet + GeoJSON (Maharashtra sectors) |
| Auth | Session-based role storage (sessionStorage) |

---

## 📸 Screenshots

> Dashboard with live pressure map, sector labels, and alert panel

| Landing Page | Pressure Dashboard |
|---|---|
| Hero with floating UI cards | Maharashtra map with PSI labels |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT © 2026 HydroCoord

---

<div align="center">

**Built with 💧 by**

| Author | LinkedIn | GitHub |
|---|---|---|
| Yash Wase | [![LinkedIn](https://img.shields.io/badge/LinkedIn-Yash_Wase-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/yash-wase/) | [![GitHub](https://img.shields.io/badge/GitHub-yash--wase-181717?style=flat&logo=github)](https://github.com/yash-wase) |
| Pranesh Shelke | — | — |

<br/>

*by YashTechs*

</div>
