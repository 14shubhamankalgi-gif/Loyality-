// --- Navigation Logic ---
function loginCustomer() {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    if(name && phone) {
        // Here you would save to Firebase
        window.location.href = "customer.html";
    } else {
        alert("Please enter Name and Phone");
    }
}

function loginOwner() {
    const phone = document.getElementById('ownerPhone').value;
    const pass = document.getElementById('ownerPass').value;
    if(phone === "8208170542" && pass === "14092001") { // Change this later

        window.location.href = "owner.html";
    } else {
        alert("Invalid credentials");
    }
}

// --- QR Scanner Logic (Customer Page) ---
function startScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" }, // Uses back camera
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText, decodedResult) => {
            if(decodedText === "avadhut_shankar_foods_stamp_trigger") {
                html5QrCode.stop();
                addStamp();
            }
        },
        (errorMessage) => {
            // parse error, ignore
        }
    ).catch((err) => {
        console.log(err);
    });
}

// --- Stamp Logic ---
let currentStamps = 0; // In reality, fetch this from Firebase

function addStamp() {
    if(currentStamps < 7) {
        currentStamps++;
        document.getElementById(`stamp-${currentStamps}`).classList.add('stamped');
        alert("Stamp added successfully!");
        
        if(currentStamps === 7) {
            document.getElementById('reward-message').style.display = "block";
        }
    }
}
