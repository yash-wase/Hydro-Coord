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
    # Maharashtra
    "MH_Nashik":      {"base": 100, "distance": 5,  "demand": 4, "complaints": 0, "name": "Nashik",       "state": "MH"},
    "MH_Aurangabad":  {"base": 100, "distance": 8,  "demand": 6, "complaints": 2, "name": "Aurangabad",   "state": "MH"},
    "MH_Latur":       {"base": 100, "distance": 12, "demand": 8, "complaints": 4, "name": "Latur",        "state": "MH"},
    "MH_Pune":        {"base": 100, "distance": 3,  "demand": 3, "complaints": 0, "name": "Pune",         "state": "MH"},
    "MH_Solapur":     {"base": 100, "distance": 7,  "demand": 5, "complaints": 1, "name": "Solapur",      "state": "MH"},
    "MH_KonkanNorth": {"base": 100, "distance": 2,  "demand": 2, "complaints": 0, "name": "Konkan North", "state": "MH"},
    "MH_KonkanSouth": {"base": 100, "distance": 14, "demand": 9, "complaints": 5, "name": "Konkan South", "state": "MH"},
    "MH_Nagpur":      {"base": 100, "distance": 6,  "demand": 4, "complaints": 0, "name": "Nagpur",       "state": "MH"},
    "MH_Sangli":      {"base": 100, "distance": 9,  "demand": 5, "complaints": 1, "name": "Sangli",       "state": "MH"},
    "MH_Kolhapur":    {"base": 100, "distance": 11, "demand": 6, "complaints": 2, "name": "Kolhapur",     "state": "MH"},
    "MH_Osmanabad":   {"base": 100, "distance": 13, "demand": 7, "complaints": 3, "name": "Osmanabad",    "state": "MH"},
    "MH_Nanded":      {"base": 100, "distance": 10, "demand": 6, "complaints": 2, "name": "Nanded",       "state": "MH"},
    # Rajasthan
    "RJ_Bikaner":     {"base": 100, "distance": 4,  "demand": 3, "complaints": 0, "name": "Bikaner",      "state": "RJ"},
    "RJ_Jodhpur":     {"base": 100, "distance": 6,  "demand": 5, "complaints": 1, "name": "Jodhpur",      "state": "RJ"},
    "RJ_Jaipur":      {"base": 100, "distance": 3,  "demand": 4, "complaints": 0, "name": "Jaipur",       "state": "RJ"},
    "RJ_Alwar":       {"base": 100, "distance": 5,  "demand": 4, "complaints": 1, "name": "Alwar",        "state": "RJ"},
    "RJ_Bharatpur":   {"base": 100, "distance": 7,  "demand": 5, "complaints": 1, "name": "Bharatpur",    "state": "RJ"},
    "RJ_Ajmer":       {"base": 100, "distance": 8,  "demand": 6, "complaints": 2, "name": "Ajmer",        "state": "RJ"},
    "RJ_Udaipur":     {"base": 100, "distance": 10, "demand": 7, "complaints": 2, "name": "Udaipur",      "state": "RJ"},
    "RJ_Kota":        {"base": 100, "distance": 9,  "demand": 6, "complaints": 2, "name": "Kota",         "state": "RJ"},
    # Tamil Nadu
    "TN_Vellore":         {"base": 100, "distance": 5,  "demand": 4, "complaints": 0, "name": "Vellore",         "state": "TN"},
    "TN_Chennai":         {"base": 100, "distance": 2,  "demand": 6, "complaints": 1, "name": "Chennai",         "state": "TN"},
    "TN_Coimbatore":      {"base": 100, "distance": 8,  "demand": 7, "complaints": 2, "name": "Coimbatore",      "state": "TN"},
    "TN_Salem":           {"base": 100, "distance": 6,  "demand": 5, "complaints": 1, "name": "Salem",           "state": "TN"},
    "TN_Tiruchirappalli": {"base": 100, "distance": 9,  "demand": 6, "complaints": 2, "name": "Tiruchirappalli", "state": "TN"},
    "TN_Madurai":         {"base": 100, "distance": 11, "demand": 7, "complaints": 3, "name": "Madurai",         "state": "TN"},
    "TN_Thoothukudi":     {"base": 100, "distance": 13, "demand": 8, "complaints": 3, "name": "Thoothukudi",     "state": "TN"},
    "TN_Tirunelveli":     {"base": 100, "distance": 12, "demand": 7, "complaints": 2, "name": "Tirunelveli",     "state": "TN"},
    # Karnataka
    "KA_Belagavi":   {"base": 100, "distance": 5,  "demand": 4, "complaints": 0, "name": "Belagavi",   "state": "KA"},
    "KA_Hubballi":   {"base": 100, "distance": 7,  "demand": 5, "complaints": 1, "name": "Hubballi",   "state": "KA"},
    "KA_Kalaburagi": {"base": 100, "distance": 9,  "demand": 6, "complaints": 2, "name": "Kalaburagi", "state": "KA"},
    "KA_Mangaluru":  {"base": 100, "distance": 4,  "demand": 4, "complaints": 0, "name": "Mangaluru",  "state": "KA"},
    "KA_Shivamogga": {"base": 100, "distance": 8,  "demand": 5, "complaints": 1, "name": "Shivamogga", "state": "KA"},
    "KA_Bengaluru":  {"base": 100, "distance": 3,  "demand": 7, "complaints": 1, "name": "Bengaluru",  "state": "KA"},
    "KA_Mysuru":     {"base": 100, "distance": 6,  "demand": 5, "complaints": 1, "name": "Mysuru",     "state": "KA"},
    "KA_Ballari":    {"base": 100, "distance": 10, "demand": 6, "complaints": 2, "name": "Ballari",    "state": "KA"},
    # Uttar Pradesh
    "UP_Saharanpur": {"base": 100, "distance": 6,  "demand": 5, "complaints": 1, "name": "Saharanpur", "state": "UP"},
    "UP_Meerut":     {"base": 100, "distance": 4,  "demand": 6, "complaints": 1, "name": "Meerut",     "state": "UP"},
    "UP_Agra":       {"base": 100, "distance": 5,  "demand": 5, "complaints": 1, "name": "Agra",       "state": "UP"},
    "UP_Lucknow":    {"base": 100, "distance": 3,  "demand": 6, "complaints": 0, "name": "Lucknow",    "state": "UP"},
    "UP_Kanpur":     {"base": 100, "distance": 7,  "demand": 7, "complaints": 2, "name": "Kanpur",     "state": "UP"},
    "UP_Prayagraj":  {"base": 100, "distance": 9,  "demand": 6, "complaints": 2, "name": "Prayagraj",  "state": "UP"},
    "UP_Varanasi":   {"base": 100, "distance": 11, "demand": 7, "complaints": 3, "name": "Varanasi",   "state": "UP"},
    "UP_Gorakhpur":  {"base": 100, "distance": 8,  "demand": 5, "complaints": 1, "name": "Gorakhpur",  "state": "UP"},
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
            "state": val["state"],
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
