// Voice Assistant Elements
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello Sir, how can I help you?");
    } else if (message.includes("who are you") || message.includes("what are you")) {
        speak("I am a virtual assistant created by Vivek Sir.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else if (message.includes("open menu")) {
        let nav = document.getElementById("nav");
        if (!nav.classList.contains("expanded")) {
            nav.classList.add("expanded");
        }
        speak("Menu opened.");
    } else if (message.includes("close menu")) {
        let nav = document.getElementById("nav");
        if (nav.classList.contains("expanded")) {
            nav.classList.remove("expanded");
            speak("Menu closed.");
        }
    } else {
        let finalText = "Here is what I found on the internet for " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

// Toggle Navigation Bar
let nav = document.getElementById("nav");
let toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
    nav.classList.toggle("expanded");
});
