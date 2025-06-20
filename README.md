# 🚚 Vehicle & Task Management Frontend Overview

---

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-4.x-blueviolet)](https://www.prisma.io/)
[![Axios](https://img.shields.io/badge/Axios-0.27.x-yellowgreen)](https://axios-http.com/)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)

---

## 📖 Table of Contents
- [✨ Application Overview](#-application-overview)
- [🎯 Functional Requirements](#-functional-requirements)
- [⚙️ Non-Functional Requirements](#️-non-functional-requirements)
- [🌐 API Requests](#-api-requests)
- [🤝 Assumptions](#-assumptions)
- [🧠 Database Structure](#-database-structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ How to Run](#️-how-to-run)
- [📸 Screenshots](#-screenshots)

---

## ✨ Application Overview

### 🖥️ Part A — UI Views

#### Left Screen View:
- 🚚 Number of Vehicles
- 🗺️ Points of Interest (POIs)
- 🎬 Scene Overview

#### Right Screen View:
- 📄 Selected Vehicle Details:
  - 🚛 Size of the Vehicle
  - ⚖️ Load Carrying Capacity
  - ⛽ Fuel Indicator
  - 🛠️ Function of the Vehicle
  - 🆔 Vehicle ID
  - 📡 Vehicle Status
  - 📍 Location (Latitude, Longitude)

---

### 🤖 Part B — AI-based NLP/Command Planner

- Operators specify tasks in natural language.
- AI Task Planner breaks down the instructions into actionable plans.
- Operator can **Approve** or **Decline** the generated plan.
- Planner has access to the selected vehicle’s real-time information.

---

## 🎯 Functional Requirements
- 🔍 View or GET vehicle status and information (e.g., Truck A, B, C, D).
- 🗺️ View Points of Interest (e.g., Zone A, B, C).
- 🧠 Convert natural language instructions into a list of individual tasks:
  - `MOVE` (source → destination)
  - `LOAD` (source zone with material)
  - `UNLOAD` (destination)
  - `REPEAT` (for multiple trips)
- 🛠️ Task planner must fetch selected vehicle’s information before planning.

---

## ⚙️ Non-Functional Requirements
- 🚦 Handle high traffic with many simultaneous users.
- ⚡ Provide real-time status updates for vehicles and zone information.

---

## 🌐 API Requests

Example axios usage for API calls:

baseURL: process.env.COREAPP_API_URL || 'http://localhost:process.env.Port/api/v1',


// Task Endpoints
 await api.post('/taskPlannerAgent', { task: taskDescription });


a await api.post('/task/post', taskData);


// Entity Selection Endpoint
 api.post('/task/setSelectedVehicle', { vehicle });




🤝 Assumptions
	•	Operators may not always provide clear or complete task definitions.
	•	Using a ReAct agent approach:
	•	Provides reasoning for each step.
	•	Utilizes available tools to fetch up-to-date data.
	•	Self-prompts to improve task planning accuracy continuously.


🛠️ Tech Stack
	•	React — Frontend UI framework
	•	Prisma ORM — Database interaction
	•	Axios — API requests
	•	Leaflet — Interactive map view


⚙️ How to Run
	1.	✍️ Create a .env file with the following variable:
    COREAPP_API_URL=http://localhost:PORT/api/v1
    2.	📦 Install dependencies:
    npm install
    3.	▶️ Start the development server:
    npm run dev