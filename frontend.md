# 🌊 HydroCoord – Frontend System Design (Final – Production Ready)

---

# 🎯 1. DESIGN INTENT

HydroCoord UI must resemble a **real operations control dashboard**.

### Must feel like:

* Infrastructure monitoring system
* Smart city control panel
* Data-heavy operational tool

NOT:

* SaaS landing page
* Fancy UI concept
* Minimal portfolio design

---

# 🎨 2. COLOR SYSTEM (STRICT)

## Base UI

| Element        | Color   |
| -------------- | ------- |
| Background     | #F8FAFC |
| Cards          | #FFFFFF |
| Primary Text   | #0F172A |
| Secondary Text | #64748B |
| Borders        | #E2E8F0 |
| Primary Action | #2563EB |

---

## System Colors (ONLY FOR STATES)

| State    | Color   |
| -------- | ------- |
| Critical | #EF4444 |
| Warning  | #F59E0B |
| Normal   | #22C55E |

---

## RULE

* No decorative colors
* No gradients overload
* No glow effects
* Colors only indicate system state

---

# 🏠 3. LANDING PAGE (CONTROLLED ANIMATION)

---

## Layout

```id="l1"
LEFT (40%) → Text  
RIGHT (60%) → Animation  
```

---

## LEFT

* Title: HydroCoord
* Subtitle
* Description (2 lines max)
* CTA:

  * Launch Dashboard
  * View Demo

---

## RIGHT (ANIMATION)

### Concept:

Water Tap + Droplet

---

## Behavior:

* Droplet forms
* Falls with gravity
* Ripple expands

---

## Motion Style:

Inspired by:
👉 https://phenomenonstudio.com

BUT:

* No flashy motion
* No over-animation
* Smooth loop (2–3 sec)

---

# 🖥️ 4. GLOBAL DASHBOARD LAYOUT

---

## Grid

```id="l2"
Sidebar (fixed)
Topbar (fixed)

Main Layout:
--------------------------------
| Map (70%) | Right Panel (30%) |
--------------------------------
```

---

# 📚 5. SIDEBAR

---

## Items

* Dashboard
* Map
* Tasks
* Alerts
* Requests
* Verification

---

## Extra

* Grid Status (Online indicator)
* Version info

---

## Behavior

* Active → blue indicator
* Hover → light grey

---

# 🔝 6. TOPBAR

---

## Elements

* Page title
* Optional region selector
* Weather indicator (top-right)

---

# 🗺️ 7. MAP SYSTEM (LEAFLET – CORE)

---

## Integration

Use:
👉 Leaflet + GeoJSON

---

## Features

* Zoom + pan
* Sector coloring
* Tooltip
* Click interaction

---

## Sector Color Logic

```js id="mapcolor"
if (pressure < 30) → red
else if (pressure < 70) → orange
else → green
```

---

## Interaction

### Hover:

* Show:

  * Sector name
  * Pressure

---

### Click:

* Open side panel:

  * Sector details
  * Alerts
  * Suggested action

---

# 📊 8. DASHBOARD: SECTOR PRESSURE

---

## Top Cards

* Avg Pressure
* Active Alerts
* Open Tasks

---

## Main Section

* Map (Leaflet container)
* OR grid fallback

---

## Right Panel

* Active Alerts list
* Quick actions

---

# 📋 9. TASK DASHBOARD

---

## Top Stats

* Total Tasks
* In Progress
* Awaiting Verification
* Completed

---

## Table

Columns:

* Task
* Sector
* Priority
* Operator
* Status
* Actions

---

## Bottom Section

### My Field Workflow

Each item:

* Task name
* Sector
* Buttons:

  * Start
  * Upload Evidence
  * Complete

---

# 🚨 10. ALERT DASHBOARD

---

## Top Cards

* Active Alerts
* Critical
* Warnings
* Resolved

---

## Table

Columns:

* Sector
* Severity
* Description
* Status
* Actions

---

## Filters

* Search
* Severity dropdown
* Status dropdown

---

# 📸 11. VERIFICATION DASHBOARD

---

## Layout

* Left: Image preview
* Right: Task details

---

## Actions

* Approve
* Reject

---

## Filters

* Sector
* Priority

---

# 🔥 12. INTERACTION RULES

---

Allowed:

* Hover highlight
* Button transitions (0.2–0.3s)

---

Not Allowed:

* Heavy animations
* Flashing UI
* Neon glow

---

# 🧱 13. COMPONENT STRUCTURE

```id="l3"
components/
  layout/
    Sidebar
    Topbar

  map/
    LeafletMap
    SectorLayer

  dashboard/
    StatsCards
    AlertsPanel

  tasks/
    TaskTable
    WorkflowPanel

  alerts/
    AlertsTable

  verification/
    EvidencePanel
```

---

# ⚡ 14. UX PRINCIPLES

* Data first, visuals second
* Minimal distractions
* Clear hierarchy
* Dense but readable

---

# 🏆 15. FINAL EXPERIENCE

User should feel:

✔ In control
✔ Informed
✔ Efficient

NOT:

❌ Distracted
❌ Overwhelmed
❌ Confused

---

# 🎯 FINAL GOAL

HydroCoord should look like:

👉 Government control dashboard
👉 Smart city monitoring system
👉 Real operational software

---
