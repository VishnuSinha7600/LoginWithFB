// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3lCOPEiQ0Gh0fWOlnmOFiEOvjzhxmwhU",
    authDomain: "loginpassword-946e6.firebaseapp.com",
    databaseURL: "https://loginpassword-946e6-default-rtdb.firebaseio.com",
    projectId: "loginpassword-946e6",
    storageBucket: "loginpassword-946e6.appspot.com",
    messagingSenderId: "471020342240",
    appId: "1:471020342240:web:8a1dcdf2d5345184e3b985",
    measurementId: "G-VWYSSRRF7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize the Realtime Database and get a reference to the service
const db = getDatabase(app);

// Function to handle user login
function loginUser(username, password) {
    const dbRef = ref(db);
    get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            let authenticated = false;
            for (let id in users) {
                if (users[id].username === username && users[id].password === password) {
                    authenticated = true;
                    break;
                }
            }
            if (authenticated) {
                console.log("Login successful!");
                // Redirect to the dashboard or perform other actions
            } else {
                console.log("Invalid credentials. Please try again.");
                // Display an error message to the user
                document.getElementById('error-message').textContent = "Invalid credentials. Please try again.";
            }
        } else {
            console.log("No data available.");
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
}

// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Call the loginUser function with the provided username and password
    loginUser(username, password);
});

