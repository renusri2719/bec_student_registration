# Full Stack Development (FSD) Lab Viva Preparation Guide

Short, simple, and natural answers that you can easily speak during your FSD Lab Internal Examination viva.

---

## ⚛️ 1. React.js

### What is React?
**Answer:** React is a JavaScript library used to build user interfaces. It lets us create reusable components and only updates parts of the web page that change, without reloading the whole page.

### What is a component?
**Answer:** A component is a reusable piece of UI code. In our project, `<Navbar />` and `<StudentForm />` are functional components.

### What is `useState`?
**Answer:** `useState` is a React Hook that lets a component remember values (like student name, roll number, or the student list) and re-render the screen whenever that value changes.
*Example:*
```javascript
const [students, setStudents] = useState([]);
```

### What is `useEffect`?
**Answer:** `useEffect` is a React Hook used to run code when the page loads, such as fetching student records from the backend API.
*Example:*
```javascript
useEffect(() => {
  getStudents();
}, []);
```

### Why did we use Axios?
**Answer:** Axios is a simple library for making HTTP requests (GET, POST, PUT, DELETE) from React to our Express backend. It automatically parses JSON data and handles errors easily.

### How does React communicate with the backend?
**Answer:** React uses Axios to send HTTP requests to Express endpoints (e.g., `http://localhost:5000/api/students`), receives the JSON response, and updates state with `setStudents()`.

---

## 🟢 2. Node.js & Express.js

### What is Node.js?
**Answer:** Node.js is a runtime environment that allows JavaScript to run on the computer or server, outside the browser.

### Why use Node.js?
**Answer:** It allows us to use one single language—JavaScript—for both the frontend and the backend.

### What is Express.js?
**Answer:** Express.js is a lightweight web framework for Node.js. It makes creating server routes and REST APIs fast and simple.

### What is an API?
**Answer:** An API (Application Programming Interface) is a bridge that lets two programs talk to each other. Our Express backend exposes APIs that our React frontend calls to fetch and save student data.

### What are GET, POST, PUT, and DELETE?
**Answer:**
- **GET:** Read/fetch data from the server (`GET /api/students`).
- **POST:** Send new data to create a record (`POST /api/students`).
- **PUT:** Modify an existing record (`PUT /api/students/:id`).
- **DELETE:** Remove a record (`DELETE /api/students/:id`).

### What is middleware?
**Answer:** Middleware is code that runs between receiving a request and sending a response. In our project, `express.json()` reads JSON request bodies, and `cors()` allows our React app to talk to Express.

### Why is CORS required?
**Answer:** By default, web browsers block web pages on one port (`5173`) from calling an API on another port (`5000`). The `cors()` middleware in Express tells the browser that requests from our frontend are permitted.

---

## 🍃 3. MongoDB & MongoDB Atlas

### What is MongoDB?
**Answer:** MongoDB is a NoSQL, document-based database. Instead of storing data in fixed SQL tables with rows and columns, it stores data in flexible JSON-like documents.

### What is MongoDB Atlas?
**Answer:** MongoDB Atlas is a cloud database service managed by MongoDB. It hosts our database on the internet, so we don't need to install or run MongoDB locally on our computer.

### What is a collection and a document?
**Answer:**
- **Collection:** A group of documents (like a "table" in SQL). Our collection is `students`.
- **Document:** A single student record with fields and values (like a "row" in SQL).

### What is Mongoose?
**Answer:** Mongoose is an Object Data Modeling (ODM) library for Node.js and MongoDB. It lets us define a schema for our student data and gives us simple methods like `find()`, `save()`, `findByIdAndUpdate()`, and `findByIdAndDelete()`.

---

## 🏗️ 4. Project Flow & Architecture

### Explain the complete flow of registering a student:
**Answer:**
1. The user fills in the form on the React frontend (`StudentForm.jsx`).
2. Clicking "Register Student" triggers Axios:
   ```javascript
   await axios.post('http://localhost:5000/api/students', studentData);
   ```
3. Express receives the request in `studentRoutes.js`.
4. The server checks if all fields are present and if the roll number already exists.
5. Mongoose creates the student document and saves it directly to **MongoDB Atlas**.
6. Express returns HTTP status 201 with the created student.
7. React shows a green success message `✓ Student registered successfully!`.

### What is the project architecture?
**Answer:**
It is a 3-tier architecture:
```text
React (Frontend) → Axios → Express (Backend API) → Mongoose → MongoDB Atlas (Cloud Database)
```

### How are duplicate roll numbers prevented?
**Answer:** In `studentRoutes.js`, before saving, we query:
```javascript
const existingStudent = await Student.findOne({ rollNumber });
if (existingStudent) {
  return res.status(400).json({ message: "Roll number already exists" });
}
```
If a match is found, Express sends back an error message to the frontend.

### What are CRUD operations in your project?
**Answer:**
- **C - Create:** `POST /api/students`
- **R - Read:** `GET /api/students`
- **U - Update:** `PUT /api/students/:id`
- **D - Delete:** `DELETE /api/students/:id`
