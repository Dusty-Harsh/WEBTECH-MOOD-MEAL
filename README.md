# MoodPlate - A Smart Meal Recommendation App

**A full-stack web application designed to suggest meals and recipes tailored to a user's emotional state, promoting mindful eating and well-being.**

---

## 🚀 Project Overview

In our fast-paced lives, the connection between mood and food is often overlooked, leading to decision fatigue and unconstructive eating habits. **MoodPlate** is a web application that addresses this gap by providing a fun, intuitive, and helpful platform for users to discover food that complements their feelings.

The application allows users to create an account, log their current mood (either through presets or custom input), and receive instant meal recommendations. Users can also save these recommendations to a personal food journal to track their choices over time. The project is built with a modern, full-stack approach, featuring a secure backend API and a dynamic, responsive frontend.

---

## ✨ Key Features

* ✅ **Secure User Authentication:** Users can sign up and log in to a personal account. Passwords are fully encrypted using **bcrypt**, and sessions are managed using **JSON Web Tokens (JWT)**.
* ✅ **Personalized Dashboard:** A welcoming and dynamic dashboard greets the user by name.
* ✅ **Dynamic Mood Input:** Users can either type their current mood (e.g., "adventurous," "calm") into a text field or use quick-select emoji buttons for common moods like "Stressed," "Happy," etc.
* ✅ **Instant Meal Recommendations:** The core feature provides immediate meal suggestions based on the user's mood, complete with ingredients, instructions, and an inspiring image.
* ✅ **Personal Food Journal:** Users can save any meal recommendation to their personal history log with a single click, allowing them to track their food choices over time.
* ✅ **Fully Responsive Design:** The entire application is built with a mobile-first approach and is beautifully functional on devices of all sizes, from phones to desktops.

---

## 📸 Screenshots

Here are a few snapshots of the application in action:

**1. The Login Page**

<img width="1253" height="760" alt="image" src="https://github.com/user-attachments/assets/13527a6f-ca26-4585-b8e2-dbed83033e16" />

**2. The User Dashboard**
<img width="1916" height="820" alt="image" src="https://github.com/user-attachments/assets/3e74ad84-3953-42df-96fd-131f2e6d47a0" />

**3. Meal Recommendations & Journal**
<img width="1234" height="364" alt="image" src="https://github.com/user-attachments/assets/05692c2f-8a6b-4e8c-b22b-0a3ef3fe7584" />



---

## 🛠️ Technology Stack

This project was built using a modern, full-stack architecture with the following technologies:

### Frontend
* **HTML5 & CSS3:** For the core structure and custom styling.
* **Tailwind CSS:** A utility-first CSS framework for rapid and responsive UI development.
* **Vanilla JavaScript (ES6+):** Used for all DOM manipulation, event handling, and client-side logic.
* **Fetch API:** For making asynchronous requests to the backend server.

### Backend
* **Node.js:** A JavaScript runtime environment for building the server-side application.
* **Express.js:** A fast and minimalist web framework for Node.js, used to build our RESTful API.

### Key Dependencies
* **`bcrypt`:** For securely hashing user passwords before storing them.
* **`jsonwebtoken` (JWT):** For creating and verifying secure authentication tokens to manage user sessions.
* **`cors`:** To enable Cross-Origin Resource Sharing, allowing the frontend and backend to communicate securely.

---

## 🏗️ System Architecture

The application follows a classic **Client-Server Architecture**.

1.  **Client (Frontend):** The user interacts with the HTML, CSS, and JavaScript files running in their browser. All user actions (like logging in or selecting a mood) are captured here.
2.  **API Communication:** The frontend sends HTTP requests to the backend API. For protected routes, a JWT is included in the `Authorization` header.
3.  **Server (Backend):** The Node.js/Express server receives these requests, processes them, and interacts with the in-memory data store.
4.  **Data Store:** For this project, a simple in-memory array is used to store user and history data. In a production environment, this would be replaced by a database like MongoDB or PostgreSQL.


## ⚙️ Local Setup and Installation

To run this project on your local machine, please follow these steps:

1.  **Prerequisites:**
    * Node.js and npm installed.
    * A code editor like Visual Studio Code with the "Live Server" extension.

2.  **Clone the Repository:**
    ```bash
    git clone (https://github.com/Dusty-Harsh/WEBTECH-MOOD-MEAL)
    ```

3.  **Navigate to the Project Directory:**
    ```bash
    cd LoginPage.HTML
    ```

4.  **Install Backend Dependencies:**
    ```bash
    npm install express cors bcrypt jsonwebtoken
    ```

5.  **Start the Backend Server:**
    ```bash
    node server.js
    ```
    The terminal should show: `Server is running on http://localhost:3000`

6.  **Launch the Frontend:**
    * In VS Code, right-click the `login.html` file.
    * Select **"Open with Live Server"**.

---

## 🔌 API Endpoints

The backend server exposes the following RESTful API endpoints:

| Method | Endpoint                      | Description                               | Protected? |
| :----- | :---------------------------- | :---------------------------------------- | :--------: |
| `POST` | `/api/signup`                 | Creates a new user account.               |     No     |
| `POST` | `/api/login`                  | Authenticates a user and returns a JWT.   |     No     |
| `GET`  | `/api/recommendations/:mood`  | Gets meal recommendations for a mood.     |    Yes     |
| `GET`  | `/api/history`                | Gets the logged-in user's meal journal.   |    Yes     |
| `POST` | `/api/history`                | Adds a new meal to the user's journal.    |    Yes     |

---

## 🔮 Future Enhancements

This project has a solid foundation that can be extended with several exciting features:

* **Database Integration:** Migrate from an in-memory store to a persistent database like **MongoDB** or **PostgreSQL** to store user data permanently.
* **Gemini API Integration:** Use a powerful LLM like Gemini to provide more dynamic, creative, and personalized meal descriptions or even generate unique recipes on the fly.
* **Detailed Nutritional Information:** Integrate a third-party nutrition API to display detailed information (calories, macros, vitamins) for each recipe.
* **Weekly Meal Planner:** Allow users to plan their meals for the week based on their anticipated moods or goals.

---

## 🧑‍💻 Project Author

* **Harsh Tyagi**
