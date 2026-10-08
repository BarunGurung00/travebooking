const crypto = require("crypto");

// --- Config ---
const API_KEY = "a5ce96b449c054e23d4a24308b86d664"; // replace with fresh key
const SECRET  = "eixVNEPpWx";                        // replace with fresh secret
const BASE_URL = "https://api.test.hotelbeds.com";

// --- Signature ---
const timestamp = Math.floor(Date.now() / 1000); // seconds
const raw = `${API_KEY}${SECRET}${timestamp}`;
const signature = crypto.createHash("sha256").update(raw).digest("hex");

console.log("Timestamp:", timestamp);
console.log("Signature:", signature);

// --- Request ---
async function testStatus() {
  try {
    const res = await fetch(`${BASE_URL}/hotel-api/1.0/hotels`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Api-key": API_KEY,
        "X-Signature": signature,
      },
      body: {
        
    "stay": {
        "checkIn": "2020-06-15",
        "checkOut": "2020-06-16"
    },
    "occupancies": [
        {
            "rooms": 1,
            "adults": 1,
            "children": 0
        }
    ],
    "geolocation": {
        "latitude": 39.57119,
        "longitude": 2.646633999999949,
        "radius": 20,
        "unit": "km"
    
}
      }
    });

    console.log("HTTP status:", res.status);
    console.log("Body:", await res.text());
  } catch (err) {
    console.error("Request failed:", err);
  }
}

testStatus();