# 🌊 HydroCoord – Models Specification (Python-Based)

---

# 🎯 1. PURPOSE

HydroCoord uses a **two-layer modeling approach** implemented in Python:

* **Model 1 (Computation Engine)** → Generates baseline pressure
* **Model 2 (Event & Intelligence Engine)** → Adjusts pressure and detects anomalies

---

# 🧠 2. MODEL ARCHITECTURE

```text id="mflow"
Input Factors
   ↓
Model 1 (Baseline Computation)
   ↓
Pressure Dataset
   ↓
Model 2 (Event Adjustment)
   ↓
Final Dataset + Alerts + Predictions
```

---

# 🧠 3. MODEL 1 – COMPUTATION ENGINE

---

## 🔹 Type

Deterministic (rule-based, no training required)

---

## 🔹 Objective

Compute **baseline pressure per sector**

---

## 🔹 Inputs

* Base pressure
* Demand factor (time-based)
* Distance from source (optional)
* Supply adjustment

---

## 🔹 Formula

```text id="m1_formula"
Pressure = Base 
         - (Distance × α) 
         - (Demand × β) 
         + Supply Adjustment
```

---

## 🔹 Python Implementation

```python id="m1_code"
def compute_pressure(base, distance, demand, supply_adj=0):
    alpha = 2
    beta = 5

    pressure = base - (distance * alpha) - (demand * beta) + supply_adj

    return max(0, min(100, pressure))
```

---

## 🔹 Output

```json id="m1_out"
{
  "A": 72,
  "B": 45,
  "C": 88
}
```

---

## 🔹 What it Does

* Generates **baseline pressure map**
* Acts as **initial system state**

---

# 🧠 4. MODEL 2 – EVENT & INTELLIGENCE ENGINE

---

## 🔹 Type

Event-driven rule system + lightweight prediction

---

## 🔹 Objective

* Adjust pressure based on events
* Detect anomalies
* Generate alerts
* Predict short-term changes

---

## 🔹 Inputs

* Pressure dataset (Model 1 output)
* Complaints per sector
* Event flags (rain, maintenance)
* Historical pressure (optional)

---

## 🔹 Event Adjustment Logic

```python id="m2_code"
def adjust_pressure(pressure, complaints, rainfall=False):
    alert = None

    if pressure < 30 and complaints > 2:
        pressure -= 20
        alert = "PIPE_BURST"

    if rainfall:
        pressure -= 10

    return max(0, pressure), alert
```

---

## 🔹 Anomaly Detection

```python id="m2_anomaly"
def detect_anomaly(prev, current, threshold=20):
    return abs(current - prev) > threshold
```

---

## 🔹 Short-Term Prediction

```python id="m2_pred"
def predict_next(current, demand_next):
    return (0.7 * current) + (0.3 * (100 - demand_next))
```

---

## 🔹 Output

```json id="m2_out"
{
  "sector": "A",
  "pressure": 28,
  "alert": "LOW_PRESSURE",
  "prediction": 25
}
```

---

## 🔹 What it Does

* Detects system failures
* Updates pressure dynamically
* Predicts near-future pressure

---

# 🔁 5. MODEL INTERACTION

```text id="interaction"
Model 1 → Baseline Pressure
        ↓
Model 2 → Adjusted Pressure + Alerts + Predictions
```

---

# 🔗 6. API INTEGRATION (PYTHON SERVICE)

---

## Example using FastAPI

```python id="api_code"
from fastapi import FastAPI

app = FastAPI()

@app.get("/pressure")
def get_pressure():
    return {"A": 72, "B": 45}

@app.get("/alerts")
def get_alerts():
    return [{"sector": "A", "type": "LOW_PRESSURE"}]
```

---

# ⚠️ 7. IMPORTANT DESIGN RULES

---

## DO:

* Keep logic explainable
* Use simple formulas
* Use deterministic outputs

---

## DO NOT:

* Claim deep learning
* Use fake training datasets
* Overcomplicate models

---

# 🏆 8. SYSTEM ROLE

---

## Model 1:

* Computes system state

## Model 2:

* Adds intelligence + decision logic

---

# 🎯 9. FINAL SUMMARY

HydroCoord models:

* Simulate pressure using deterministic computation
* Adjust based on real-world-like events
* Detect anomalies
* Provide short-term predictions

---

# ⚡ 10. ONE-LINE EXPLANATION

> Model 1 computes baseline pressure, while Model 2 dynamically adjusts it using events and predicts near-term system behavior.

---
