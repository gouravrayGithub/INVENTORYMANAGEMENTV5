# Inventory Management System (IVM)

A simple web-based Inventory Management System with **role-based access control**  
for **Owner**, **Manager**, and **Staff** users — built using **React** (frontend) and **Spring Boot** (backend).

---

## 📋 Features

### 🚀 Core Functionalities
- **User Authentication** (email-based login)
- **Role-based Dashboards**:
  - **Owner**: Add, update, delete, search, and view all inventory items
  - **Manager**: Add, update, delete, and view inventory items
  - **Staff**: View and update inventory items
- **Inventory Management** with real-time updates

### 🔒 Roles
- **Owner**
- **Manager**
- **Staff**

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Deployment |
|----------|---------|----------|------------|
| React    | Spring Boot | H2 / MySQL (configurable) | Localhost (Dev) |

---

## ⚙️ Installation

### 1️⃣ Backend Setup (Spring Boot)

```bash
cd backend/
./mvnw spring-boot:run
