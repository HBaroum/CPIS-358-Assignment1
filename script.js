// ============================================================
// StudySync - Enhanced JavaScript
// Covers: Functions & Events, Form Validation,
//         Dynamic Elements, Dynamic Picture & Text
// ============================================================


// ============================================================
// (d) FUNCTIONS AND EVENTS — showWelcome, loginMessage, etc.
// ============================================================

function showWelcome() {
    alert("Welcome to StudySync! Let's start studying!");
}

function loginMessage() {
    const idInput = document.getElementById("studentId") || document.getElementById("Student ID");
    const passwordInput = document.getElementById("password");
    const result = document.getElementById("loginResult");

    if (!idInput || !passwordInput || !result) return false;

    const studentId = idInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (studentId === "" || password === "") {
        result.innerHTML = "⚠️ Please fill in all fields.";
        result.style.color = "orange";
        return false;
    }

    if (studentId.length !== 8) {
        result.innerHTML = "❌ Student ID must be exactly 8 digits.";
        result.style.color = "red";
        return false;
    }

    if (password.length < 6) {
        result.innerHTML = "❌ Password must be at least 6 characters.";
        result.style.color = "red";
        return false;
    }

    result.innerHTML = "✅ Login successful! Redirecting...";
    result.style.color = "green";
    return false;
}


// ============================================================
// (b) FORM VALIDATION — validateSignup with detailed checks
// ============================================================

function validateSignup() {
    const fullname = document.getElementById("fullname");
    const studentid = document.getElementById("studentid");
    const course = document.getElementById("course");
    const goal = document.getElementById("goal");
    const time = document.getElementById("time");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const result = document.getElementById("signupResult");

    // Clear previous result
    result.innerHTML = "";
    result.style.color = "";

    // --- Full Name: letters and spaces only ---
    if (!fullname || fullname.value.trim() === "") {
        showError(result, "❌ Full name is required.");
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(fullname.value.trim())) {
        showError(result, "❌ Full name must contain letters only.");
        return false;
    }

    // --- Student ID: numeric, min 5 digits ---
    if (!studentid || studentid.value.trim() === "") {
        showError(result, "❌ Student ID is required.");
        return false;
    }
    if (!/^\d{8}$/.test(studentid.value.trim())) {
        showError(result, "❌ Student ID must be exactly 8 digits.");
        return false;
    }

    // --- Course: not empty ---
    if (!course || course.value.trim() === "") {
        showError(result, "❌ Course is required.");
        return false;
    }

    // --- Goal: must be selected ---
    if (!goal || goal.value === "") {
        showError(result, "❌ Please select a study goal.");
        return false;
    }

    // --- Available Time: not empty ---
    if (!time || time.value.trim() === "") {
        showError(result, "❌ Available time is required.");
        return false;
    }

    // --- Mode: radio must be selected ---
    const modeSelected = document.querySelector('input[name="mode"]:checked');
    if (!modeSelected) {
        showError(result, "❌ Please select a preferred mode.");
        return false;
    }

    // --- Password: min 6 chars, must contain a number ---
    if (!password || password.value.length < 6) {
        showError(result, "❌ Password must be at least 6 characters.");
        return false;
    }
    if (!/\d/.test(password.value)) {
        showError(result, "❌ Password must contain at least one number.");
        return false;
    }

    // --- Confirm Password ---
    if (!confirmPassword || password.value !== confirmPassword.value) {
        showError(result, "❌ Passwords do not match!");
        return false;
    }

    // --- All passed ---
    result.innerHTML = "✅ Account created successfully! Welcome to StudySync!";
    result.style.color = "green";
    result.style.fontWeight = "bold";

    // Dynamic element: show a welcome card after signup
    showWelcomeCard(fullname.value.trim());

    return false;
}

function showError(el, msg) {
    el.innerHTML = msg;
    el.style.color = "red";
    el.style.fontWeight = "bold";
    // Shake animation
    el.style.animation = "shake 0.4s ease";
    setTimeout(() => { el.style.animation = ""; }, 500);
}


// ============================================================
// (c) DYNAMIC ELEMENTS — add/remove/modify DOM elements
// ============================================================

// Show a welcome card dynamically after signup
function showWelcomeCard(name) {
    // Remove old card if exists
    const old = document.getElementById("welcomeCard");
    if (old) old.remove();

    const card = document.createElement("div");
    card.id = "welcomeCard";
    card.style.cssText = `
        background: linear-gradient(135deg, #2d89ef, #1f5fa8);
        color: white;
        padding: 20px 25px;
        border-radius: 12px;
        margin-top: 20px;
        text-align: center;
        animation: fadeInUp 0.5s ease;
        box-shadow: 0 6px 20px rgba(45,137,239,0.4);
    `;
    card.innerHTML = `
        <h3 style="margin:0 0 8px;">🎉 Welcome, ${name}!</h3>
        <p style="margin:0;">Your account is ready. Start finding study partners now.</p>
        <button onclick="this.parentElement.remove()" 
            style="margin-top:12px; background:white; color:#1f5fa8; border:none;
                   padding:8px 18px; border-radius:8px; cursor:pointer; font-weight:bold;">
            Close
        </button>
    `;

    const resultEl = document.getElementById("signupResult");
    if (resultEl) resultEl.insertAdjacentElement("afterend", card);
}

// Dynamic session counter on the home page
function updateSessionCount() {
    const counter = document.getElementById("sessionCount");
    if (!counter) return;

    let count = parseInt(counter.textContent) || 0;
    const target = 128; // demo target

    const interval = setInterval(() => {
        count += 3;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        counter.textContent = count;
    }, 20);
}

// Add a new study session row dynamically to the table
function addSessionRow(course, goal, time, mode) {
    const table = document.querySelector(".table-section table");
    if (!table) return;

    const row = document.createElement("tr");
    row.style.animation = "fadeInUp 0.4s ease";
    row.innerHTML = `
        <td>${course}</td>
        <td>${goal}</td>
        <td>${time}</td>
        <td>${mode}</td>
    `;
    table.appendChild(row);
}

// Toggle dark mode dynamically
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const btn = document.getElementById("darkModeBtn");
    if (btn) {
        btn.textContent = document.body.classList.contains("dark-mode")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    }
}


// ============================================================
// (a) DYNAMIC PICTURE & TEXT — rotate hero images/text
// ============================================================

const heroSlides = [
    {
        img: "photo1.jpg",
        heading: "Find Your Perfect Study Partner",
        sub: "Same course. Same goal. Same time."
    },
    {
        img: "photo2.jpg",
        heading: "Study Together, Succeed Together",
        sub: "Connect with classmates who share your schedule."
    },
    {
        img: "photo1.jpg",
        heading: "Online or In-Person — Your Choice",
        sub: "Flexible study modes for every student."
    }
];

let currentSlide = 0;

function initHeroSlider() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    // Build slider HTML
    hero.innerHTML = `
        <div class="slider-bg" id="sliderBg"></div>
        <div class="overlay-box" id="overlayBox">
            <h2 id="heroHeading" style="text-shadow: 4px 2px 8px cadetblue;"></h2>
            <p id="heroSub"></p>
            <button onclick="showWelcome()">Start Now</button>
            <div class="slider-dots" id="sliderDots"></div>
        </div>
        <button class="slider-arrow left" onclick="changeSlide(-1)">&#8249;</button>
        <button class="slider-arrow right" onclick="changeSlide(1)">&#8250;</button>
    `;

    // Build dots
    const dotsContainer = document.getElementById("sliderDots");
    heroSlides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    renderSlide(0);

    // Auto-rotate every 10 seconds
    setInterval(() => changeSlide(1), 10000);
}

function renderSlide(index) {
    const slide = heroSlides[index];
    const bg = document.getElementById("sliderBg");
    const heading = document.getElementById("heroHeading");
    const sub = document.getElementById("heroSub");

    if (!bg || !heading || !sub) return;

    // Fade out
    bg.style.opacity = "0";
    heading.style.opacity = "0";
    sub.style.opacity = "0";

    setTimeout(() => {
        bg.style.backgroundImage = `url('${slide.img}')`;
        heading.textContent = slide.heading;
        sub.textContent = slide.sub;

        // Fade in
        bg.style.opacity = "1";
        heading.style.opacity = "1";
        sub.style.opacity = "1";
    }, 300);

    // Update dots
    document.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === index);
    });
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
    renderSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    renderSlide(currentSlide);
}


// ============================================================
// LIVE CHARACTER COUNTER for forms (bonus dynamic element)
// ============================================================

function attachCharCounter(inputId, maxLen) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const counter = document.createElement("small");
    counter.style.cssText = "color:#888; display:block; margin-top:-10px; margin-bottom:10px;";
    counter.textContent = `0 / ${maxLen}`;
    input.insertAdjacentElement("afterend", counter);

    input.addEventListener("input", () => {
        const len = input.value.length;
        counter.textContent = `${len} / ${maxLen}`;
        counter.style.color = len > maxLen * 0.9 ? "red" : "#888";
    });
}


// ============================================================
// DARK MODE CSS (injected dynamically)
// ============================================================

function injectDarkModeStyles() {
    const style = document.createElement("style");
    style.textContent = `
        /* ── Dark Mode Base ── */
        body.dark-mode {
            background-color: #0f1117 !important;
            color: #e8eaf0 !important;
        }

        /* ── Header / Footer / Nav ── */
        body.dark-mode header {
            background-color: #161b27 !important;
            color: #ffffff !important;
            border-bottom: 2px solid #2d89ef44;
        }
        body.dark-mode header p {
            color: #94a3b8 !important;
        }
        body.dark-mode footer {
            background-color: #161b27 !important;
            color: #94a3b8 !important;
            border-top: 1px solid #2d89ef33;
        }
        body.dark-mode .menu {
            background-color: #1a2035 !important;
            border-bottom: 1px solid #2d89ef33;
        }
        body.dark-mode .menu a {
            color: #93c5fd !important;
        }
        body.dark-mode .menu a:hover {
            color: #ffffff !important;
            text-decoration: underline;
        }

        /* ── Cards & Sections ── */
        body.dark-mode .welcome-box,
        body.dark-mode .image-section,
        body.dark-mode .table-section,
        body.dark-mode .article-section,
        body.dark-mode .about-section,
        body.dark-mode .about-box,
        body.dark-mode .form-container {
            background-color: #1a2035 !important;
            color: #e8eaf0 !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
            border: 1px solid #2a3050 !important;
        }

        body.dark-mode .highlight-box {
            background-color: #162040 !important;
            border-left: 5px solid #3b82f6 !important;
        }
        body.dark-mode .highlight-box h2,
        body.dark-mode .highlight-box p {
            color: #c7d9f5 !important;
        }
        body.dark-mode .card {
            background-color: #212840 !important;
            color: #e8eaf0 !important;
            border: 1px solid #2d3a5a !important;
            box-shadow: 0 3px 12px rgba(0,0,0,0.3) !important;
        }
        body.dark-mode .card h3 {
            color: #93c5fd !important;
        }
        body.dark-mode .card p {
            color: #b0bdd4 !important;
        }

        /* ── Headings ── */
        body.dark-mode h1,
        body.dark-mode h2,
        body.dark-mode h3 {
            color: #e8eaf0 !important;
        }
        body.dark-mode h2 {
            border-bottom: 1px solid #2a3a5a;
            padding-bottom: 6px;
        }

        /* ── Body Text & Lists — covers ALL nested elements ── */
        body.dark-mode p,
        body.dark-mode li,
        body.dark-mode label,
        body.dark-mode span:not(.dot):not(#sessionCount):not(#studentCount):not(#courseCount),
        body.dark-mode small,
        body.dark-mode .about-box p,
        body.dark-mode .about-box li,
        body.dark-mode .about-section p,
        body.dark-mode .about-section li,
        body.dark-mode .article-section p,
        body.dark-mode .article-section li,
        body.dark-mode .welcome-box p,
        body.dark-mode .welcome-box li,
        body.dark-mode .table-section p,
        body.dark-mode .image-section p,
        body.dark-mode .form-container p {
            color: #b0bdd4 !important;
        }
        body.dark-mode a {
            color: #60a5fa !important;
        }
        body.dark-mode a:hover {
            color: #93c5fd !important;
        }
        body.dark-mode ul li::marker,
        body.dark-mode ol li::marker {
            color: #60a5fa !important;
        }
        /* ── Force all headings inside sections ── */
        body.dark-mode .about-box h2,
        body.dark-mode .about-box h3,
        body.dark-mode .about-section h2,
        body.dark-mode .about-section h3,
        body.dark-mode .article-section h2,
        body.dark-mode .article-section h3,
        body.dark-mode .welcome-box h2,
        body.dark-mode .welcome-box h3,
        body.dark-mode .table-section h2,
        body.dark-mode .table-section h3,
        body.dark-mode .image-section h2,
        body.dark-mode .form-container h2 {
            color: #e8eaf0 !important;
        }

        /* ── Table ── */
        body.dark-mode table,
        body.dark-mode th,
        body.dark-mode td {
            border-color: #2d3a5a !important;
        }
        body.dark-mode th {
            background-color: #1e3a6e !important;
            color: #e0eeff !important;
        }
        body.dark-mode td {
            color: #c8d3e8 !important;
            background-color: #1a2035 !important;
        }
        body.dark-mode tr:nth-child(even) td {
            background-color: #1f2844 !important;
        }

        /* ── Forms ── */
        body.dark-mode form input,
        body.dark-mode form select,
        body.dark-mode form textarea {
            background-color: #0f1117 !important;
            color: #e8eaf0 !important;
            border: 1px solid #3a4a6a !important;
            border-radius: 8px;
        }
        body.dark-mode form input::placeholder {
            color: #5a6a8a !important;
        }
        body.dark-mode form input:focus,
        body.dark-mode form select:focus {
            border-color: #60a5fa !important;
            outline: none;
            box-shadow: 0 0 0 3px rgba(96,165,250,0.15) !important;
        }
        body.dark-mode form select option {
            background-color: #1a2035 !important;
            color: #e8eaf0 !important;
        }
        body.dark-mode .radio-group {
            color: #b0bdd4 !important;
        }
        body.dark-mode .radio-group input[type="radio"] {
            accent-color: #60a5fa !important;
        }

        /* ── Buttons ── */
        body.dark-mode button:not(#darkModeBtn):not(.slider-arrow) {
            background-color: #1e4db7 !important;
            color: #ffffff !important;
            border: none !important;
        }
        body.dark-mode button:not(#darkModeBtn):not(.slider-arrow):hover {
            background-color: #2d5fd4 !important;
        }

        /* ── Add-session inputs (inline styled) ── */
        body.dark-mode #newCourse,
        body.dark-mode #newGoal,
        body.dark-mode #newTime,
        body.dark-mode #newMode {
            background-color: #0f1117 !important;
            color: #e8eaf0 !important;
            border: 1px solid #3a4a6a !important;
        }

        /* ── Overlay box on hero ── */
        body.dark-mode .overlay-box {
            background-color: rgba(15, 17, 23, 0.88) !important;
            color: #e8eaf0 !important;
            border: 1px solid #2d3a5a;
        }
        body.dark-mode .overlay-box p {
            color: #94a3b8 !important;
        }

        /* ── Image border ── */
        body.dark-mode .main-image {
            border-color: #3b82f6 !important;
            opacity: 0.92;
        }

        /* ── Small hints & counters ── */
        body.dark-mode small {
            color: #6b7fa3 !important;
        }

        /* ── Stat boxes ── */
        body.dark-mode .stat-box {
            background: linear-gradient(135deg, #1e3a6e, #1a2d52) !important;
            border: 1px solid #2d4a7a !important;
            color: #e0eeff !important;
        }
        body.dark-mode .stat-box span {
            color: #60a5fa !important;
        }

        /* Slider styles */
        .slider-bg {
            position: absolute; inset: 0;
            background-size: cover;
            background-position: center;
            transition: opacity 0.5s ease;
        }
        .slider-arrow {
            position: absolute; top: 50%; transform: translateY(-50%);
            background: rgba(255,255,255,0.7); border: none;
            font-size: 2rem; padding: 5px 14px; cursor: pointer;
            border-radius: 50%; z-index: 10; transition: 0.2s;
        }
        .slider-arrow:hover { background: rgba(255,255,255,0.95); }
        .slider-arrow.left { left: 15px; }
        .slider-arrow.right { right: 15px; }
        .slider-dots { margin-top: 12px; }
        .dot {
            display: inline-block; width: 10px; height: 10px;
            background: #bbb; border-radius: 50%; margin: 0 4px;
            cursor: pointer; transition: background 0.3s;
        }
        .dot.active { background: #2d89ef; }

        /* Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25%       { transform: translateX(-6px); }
            75%       { transform: translateX(6px); }
        }

        /* Dark mode toggle button */
        #darkModeBtn {
            position: fixed; bottom: 20px; right: 20px;
            background: #1f5fa8; color: white;
            border: none; padding: 10px 16px;
            border-radius: 30px; cursor: pointer;
            font-size: 14px; z-index: 999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: 0.3s;
        }
        #darkModeBtn:hover { background: #17497f; transform: scale(1.07); }

        /* Stat counter */
        .stat-box {
            text-align: center; padding: 15px;
            background: #2d89ef; color: white;
            border-radius: 10px; margin: 10px;
            min-width: 120px;
        }
        .stat-box span { font-size: 2rem; font-weight: bold; display: block; }
    `;
    document.head.appendChild(style);
}


// ============================================================
// STATS SECTION (dynamic element — injected into index.html)
// ============================================================

function injectStatsSection() {
    const welcomeBox = document.querySelector(".welcome-box");
    if (!welcomeBox) return;

    const stats = document.createElement("div");
    stats.style.cssText = "display:flex; justify-content:center; flex-wrap:wrap; gap:10px; margin:20px 0;";
    stats.innerHTML = `
        <div class="stat-box">
            <span id="sessionCount">0</span>
            Active Sessions
        </div>
        <div class="stat-box">
            <span id="studentCount">0</span>
            Students
        </div>
        <div class="stat-box">
            <span id="courseCount">0</span>
            Courses
        </div>
    `;
    welcomeBox.insertAdjacentElement("afterbegin", stats);

    animateCounter("sessionCount", 128);
    animateCounter("studentCount", 340);
    animateCounter("courseCount", 47);
}

function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let count = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(interval); }
        el.textContent = count;
    }, 20);
}


// ============================================================
// DARK MODE TOGGLE BUTTON (injected into every page)
// ============================================================

function injectDarkModeButton() {
    const btn = document.createElement("button");
    btn.id = "darkModeBtn";
    btn.textContent = "🌙 Dark Mode";
    btn.onclick = toggleDarkMode;
    document.body.appendChild(btn);
}


// ============================================================
// INIT — runs on every page load
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    injectDarkModeStyles();
    injectDarkModeButton();

    // Home page specific
    if (document.querySelector(".hero")) {
        initHeroSlider();
        injectStatsSection();
    }

    // Signup page: attach char counters
    attachCharCounter("fullname", 50);
    attachCharCounter("course", 20);

    // Highlight active nav link
    const links = document.querySelectorAll(".menu a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.style.borderBottom = "2px solid white";
            link.style.paddingBottom = "4px";
        }
    });
});