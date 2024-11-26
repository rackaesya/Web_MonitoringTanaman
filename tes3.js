// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7miUmJJU0yZmwVwdhKi7r4cvj2oZKg6I",
    authDomain: "monitoringtanah-61f3f.firebaseapp.com",
    databaseURL: "https://monitoringtanah-61f3f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "monitoringtanah-61f3f",
    storageBucket: "monitoringtanah-61f3f.appspot.com",
    messagingSenderId: "974193767939",
    appId: "1:974193767939:web:8f47c5fa0a2bf948bc0036"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Retrieve data from Firebase for sensor and pump status
function getData() {
    // Get sensor data
    db.ref("sensor/kelembaban1").on("value", function(snapshot) {
        const sensor1Data = snapshot.val();
        console.log("Sensor 1 Data:", sensor1Data);  // Log untuk debugging
        document.getElementById('sensor1').textContent = sensor1Data ? `Kelembaban Tanah 1: ${sensor1Data} %` : 'Kelembaban Tanah 1: Tidak tersedia';
    });

    db.ref("sensor/kelembaban2").on("value", function(snapshot) {
        const sensor2Data = snapshot.val();
        console.log("Sensor 2 Data:", sensor2Data);  // Log untuk debugging
        document.getElementById('sensor2').textContent = sensor2Data ? `Kelembaban Tanah 2: ${sensor2Data} %` : 'Kelembaban Tanah 2: Tidak tersedia';
    });

    // Get pump status
    db.ref("pompa/status1").on("value", function(snapshot) {
        const pump1Status = snapshot.val();
        console.log("Pompa 1 Status:", pump1Status);  // Log untuk debugging
        document.getElementById('pump1').textContent = pump1Status ? `Pompa 1: ${pump1Status}` : 'Pompa 1: Tidak tersedia';
    });

    db.ref("pompa/status2").on("value", function(snapshot) {
        const pump2Status = snapshot.val();
        console.log("Pompa 2 Status:", pump2Status);  // Log untuk debugging
        document.getElementById('pump2').textContent = pump2Status ? `Pompa 2: ${pump2Status}` : 'Pompa 2: Tidak tersedia';
    });
}

// Show login form and initialize Firebase interaction
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;

    if (nama && password) {
        // Simulate login check (You can add real authentication logic)
        document.getElementById('loginFormDiv').style.display = 'none';
        document.getElementById('monitoringTitle').style.display = 'block';
        document.getElementById('monitoringContent').style.display = 'block';

        // Start fetching sensor and pump data
        getData();

        // Display date and time
        setInterval(function() {
            const currentDate = new Date();
            document.getElementById('current-date').textContent = currentDate.toLocaleDateString();
            document.getElementById('current-time').textContent = currentDate.toLocaleTimeString();
        }, 1000);
    } else {
        alert("Nama dan password harus diisi!");
    }
});
