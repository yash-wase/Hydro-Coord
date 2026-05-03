from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model1 import compute_pressure
from model2 import adjust_pressure

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sector definitions: base pressure, distance from source, demand level, complaints
SECTORS = {
    "A": {"base": 100, "distance": 5,  "demand": 4, "complaints": 0, "name": "Sector A – Nashik"},
    "B": {"base": 100, "distance": 8,  "demand": 6, "complaints": 2, "name": "Sector B – Aurangabad"},
    "C": {"base": 100, "distance": 12, "demand": 8, "complaints": 4, "name": "Sector C – Latur"},
    "D": {"base": 100, "distance": 3,  "demand": 3, "complaints": 0, "name": "Sector D – Pune"},
    "E": {"base": 100, "distance": 7,  "demand": 5, "complaints": 1, "name": "Sector E – Solapur"},
    "F": {"base": 100, "distance": 2,  "demand": 2, "complaints": 0, "name": "Sector F – Konkan North"},
    "G": {"base": 100, "distance": 14, "demand": 9, "complaints": 5, "name": "Sector G – Konkan South"},
    "H": {"base": 100, "distance": 6,  "demand": 4, "complaints": 0, "name": "Sector H – Nagpur"},
    "I": {"base": 100, "distance": 9,  "demand": 5, "complaints": 1, "name": "Sector I – Sangli"},
    "J": {"base": 100, "distance": 11, "demand": 6, "complaints": 2, "name": "Sector J – Kolhapur"},
    "K": {"base": 100, "distance": 13, "demand": 7, "complaints": 3, "name": "Sector K – Osmanabad"},
    "L": {"base": 100, "distance": 10, "demand": 6, "complaints": 2, "name": "Sector L – Nanded"},
}


@app.get("/pressure")
def get_pressure():
    result = {}

    for key, val in SECTORS.items():
        p = compute_pressure(val["base"], val["distance"], val["demand"])
        p, alert = adjust_pressure(p, val["complaints"])

        result[key] = {
            "pressure": round(p, 1),
            "alert": alert,
            "name": val["name"],
        }

    return result


@app.get("/alerts")
def get_alerts():
    alerts = []

    for key, val in SECTORS.items():
        p = compute_pressure(val["base"], val["distance"], val["demand"])
        p, alert = adjust_pressure(p, val["complaints"])

        if alert:
            alerts.append({"sector": key, "type": alert, "pressure": round(p, 1)})
        elif p < 30:
            alerts.append({"sector": key, "type": "LOW_PRESSURE", "pressure": round(p, 1)})
        elif p < 70:
            alerts.append({"sector": key, "type": "WARNING", "pressure": round(p, 1)})

    return alerts


@app.get("/health")
def health():
    return {"status": "ok"}
