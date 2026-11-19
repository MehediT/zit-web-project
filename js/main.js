/**
 * Web Fundamentals - ZIT (460-2079/02)
 * Student: Mehedi Toure (TOU0026) - VSB-TUO
 * Minimalist Luxury Architecture (Vanilla ECMAScript, Zero Frameworks)
 */

document.addEventListener("DOMContentLoaded", () => {
  initCursorFollower();
  initMobileNav();
  initRealtimeCounters();
  initSearchFilter();
  initQuiz();
  initBoxModelTool();
  initFormValidation();
});

/* ==========================================================================
   1. Minimal Cursor Follower
   ========================================================================== */
function initCursorFollower() {
  const cursor = document.getElementById("cursor-follower");
  if (!cursor) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Scale up cursor slightly when hovering interactive buttons or links
  const interactives = document.querySelectorAll("a, button, input, select, textarea");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "36px";
      cursor.style.height = "36px";
      cursor.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "22px";
      cursor.style.height = "22px";
      cursor.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
    });
  });
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  if (!navToggle || !siteNav) return;

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "Close" : "Menu";
  });
}

/* ==========================================================================
   3. Real-time Clock
   ========================================================================== */
function initRealtimeCounters() {
  const clockEl = document.getElementById("prague-clock");

  function updateTimers() {
    const now = new Date();

    // Clock in Prague (CET)
    if (clockEl) {
      const options = {
        timeZone: "Europe/Prague",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      clockEl.textContent = "Prague Time: " + new Intl.DateTimeFormat("en-GB", options).format(now);
    }
  }

  updateTimers();
  setInterval(updateTimers, 1000);
}

/* ==========================================================================
   4. Search & Filter Cards (index.html)
   ========================================================================== */
function initSearchFilter() {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".luxury-card[data-topic]");
  if (!searchInput || !cards.length) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const body = card.querySelector("p")?.textContent.toLowerCase() || "";
      const topic = card.getAttribute("data-topic")?.toLowerCase() || "";

      if (title.includes(query) || body.includes(query) || topic.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}

/* ==========================================================================
   5. Interactive ZIT Web Fundamentals Quiz (interactive.html)
   ========================================================================== */
const QUIZ_DATA = [
  {
    question: "What is the primary role of semantic HTML5 elements (such as <main>, <nav>, <article>)?",
    options: [
      "To automatically apply modern CSS layout styling",
      "To convey meaning, document structure, and accessibility information to browsers and screen readers",
      "To speed up database response times on the server",
      "To replace the need for client-side JavaScript"
    ],
    answer: 1,
    explanation: "Semantic HTML5 tags explicitly define the role and hierarchy of content, boosting accessibility (WCAG), assistive tech parsing, and SEO."
  },
  {
    question: "In the standard CSS Box Model with 'box-sizing: border-box', what does the declared 'width' include?",
    options: [
      "Content only",
      "Content and margin",
      "Content, padding, and border",
      "Content, padding, border, and margin"
    ],
    answer: 2,
    explanation: "With 'box-sizing: border-box', padding and border are included within the specified width, making responsive layout calculations straightforward."
  },
  {
    question: "Which HTTP status code indicates that the requested resource was found and processed successfully?",
    options: [
      "200 OK",
      "301 Moved Permanently",
      "404 Not Found",
      "500 Internal Server Error"
    ],
    answer: 0,
    explanation: "200 OK is the standard success status response for HTTP GET, POST, or PUT requests that succeeded."
  },
  {
    question: "What is the purpose of the HTML meta viewport tag '<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">'?",
    options: [
      "To connect external CSS frameworks",
      "To ensure the website viewport matches the physical device width and scales correctly on mobile screens",
      "To enable full-screen browser mode by default",
      "To cache the DOM structure in local storage"
    ],
    answer: 1,
    explanation: "The meta viewport tag is foundational to responsive design; it instructs mobile browsers to render the layout at device scale instead of a 980px desktop fallback."
  },
  {
    question: "Which native DOM method is recommended to safely attach an event listener in modern vanilla JavaScript?",
    options: [
      "element.attachEvent()",
      "element.addEventListener('click', handler)",
      "element.onclick = 'handler()'",
      "document.evalListener()"
    ],
    answer: 1,
    explanation: "addEventListener() is standard W3C DOM Level 2+, allowing multiple independent handlers without overwriting existing listeners."
  }
];

function initQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  if (!quizContainer) return;

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  const stepEl = document.getElementById("quiz-step");
  const progressFill = document.getElementById("quiz-progress-fill");
  const scoreBadge = document.getElementById("quiz-score-badge");
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const feedbackEl = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("quiz-next-btn");
  const resetBtn = document.getElementById("quiz-reset-btn");

  function renderQuestion() {
    answered = false;
    const q = QUIZ_DATA[currentQuestion];

    stepEl.textContent = `Question ${currentQuestion + 1} of ${QUIZ_DATA.length}`;
    progressFill.style.width = `${((currentQuestion + 1) / QUIZ_DATA.length) * 100}%`;
    scoreBadge.textContent = `Score: ${score} / ${QUIZ_DATA.length}`;
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    feedbackEl.className = "quiz-feedback-box";
    feedbackEl.style.display = "none";
    feedbackEl.textContent = "";

    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestion === QUIZ_DATA.length - 1 ? "Finish Assessment" : "Next Question";

    q.options.forEach((optText, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-choice-btn";
      btn.textContent = optText;

      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        const isCorrect = index === q.answer;
        if (isCorrect) {
          score++;
          btn.classList.add("correct");
          feedbackEl.className = "quiz-feedback-box success show";
          feedbackEl.innerHTML = `<strong>Correct.</strong> ${q.explanation}`;
        } else {
          btn.classList.add("incorrect");
          const allOptions = optionsEl.querySelectorAll(".quiz-choice-btn");
          if (allOptions[q.answer]) {
            allOptions[q.answer].classList.add("correct");
          }
          feedbackEl.className = "quiz-feedback-box danger show";
          feedbackEl.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
        }

        optionsEl.querySelectorAll(".quiz-choice-btn").forEach((b) => (b.disabled = true));
        scoreBadge.textContent = `Score: ${score} / ${QUIZ_DATA.length}`;
        nextBtn.disabled = false;
      });

      optionsEl.appendChild(btn);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (!answered) return;
    if (currentQuestion < QUIZ_DATA.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showFinalSummary();
    }
  });

  resetBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
  });

  function showFinalSummary() {
    stepEl.textContent = "Evaluation Completed";
    progressFill.style.width = "100%";
    questionEl.textContent = `Assessment Summary: ${score} / ${QUIZ_DATA.length} correct`;

    const percentage = Math.round((score / QUIZ_DATA.length) * 100);
    optionsEl.innerHTML = `
      <div style="padding: 28px; border-radius: var(--radius-card); background: var(--bg-surface-subtle); text-align: center;">
        <p style="font-family: var(--font-serif); font-size: 28px; margin-bottom: 8px; color: var(--text-primary);">
          Final Result: ${percentage}%
        </p>
        <p style="font-size: 15px; color: var(--text-muted); max-width: 460px; margin: 0 auto;">
          ${percentage >= 80 ? "Excellence demonstrated across HTML5, CSS and JavaScript architecture." : "Review the curriculum cards on the home page to consolidate core fundamentals."}
        </p>
      </div>
    `;

    feedbackEl.style.display = "none";
    nextBtn.disabled = true;
  }

  renderQuestion();
}

/* ==========================================================================
   6. Interactive CSS Box Model Tool (interactive.html)
   ========================================================================== */
function initBoxModelTool() {
  const marginSlider = document.getElementById("slider-margin");
  const paddingSlider = document.getElementById("slider-padding");
  const borderSlider = document.getElementById("slider-border");

  const marginVal = document.getElementById("val-margin");
  const paddingVal = document.getElementById("val-padding");
  const borderVal = document.getElementById("val-border");

  const previewMargin = document.getElementById("preview-margin");
  const previewBorder = document.getElementById("preview-border");
  const previewPadding = document.getElementById("preview-padding");
  const generatedCss = document.getElementById("generated-css");

  if (!marginSlider || !previewMargin) return;

  function updateBox() {
    const m = marginSlider.value;
    const p = paddingSlider.value;
    const b = borderSlider.value;

    marginVal.textContent = `${m}px`;
    paddingVal.textContent = `${p}px`;
    borderVal.textContent = `${b}px`;

    previewMargin.style.padding = `${m}px`;
    previewBorder.style.borderWidth = `${b}px`;
    previewPadding.style.padding = `${p}px`;

    if (generatedCss) {
      generatedCss.textContent = `.element {\n  box-sizing: border-box;\n  margin: ${m}px;\n  border: ${b}px solid #171717;\n  padding: ${p}px;\n}`;
    }
  }

  marginSlider.addEventListener("input", updateBox);
  paddingSlider.addEventListener("input", updateBox);
  borderSlider.addEventListener("input", updateBox);

  updateBox();
}

/* ==========================================================================
   7. Form Validation (interactive.html)
   ========================================================================== */
function initFormValidation() {
  const form = document.getElementById("academic-feedback-form");
  if (!form) return;

  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const messageInput = document.getElementById("form-message");
  const alertBox = document.getElementById("form-alert");

  function validateField(input, condition) {
    const parent = input.closest(".form-field-unit");
    if (!condition) {
      parent.classList.add("has-error");
      return false;
    } else {
      parent.classList.remove("has-error");
      return true;
    }
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  nameInput?.addEventListener("blur", () => {
    validateField(nameInput, nameInput.value.trim().length >= 3);
  });

  emailInput?.addEventListener("blur", () => {
    validateField(emailInput, isValidEmail(emailInput.value.trim()));
  });

  messageInput?.addEventListener("blur", () => {
    validateField(messageInput, messageInput.value.trim().length >= 10);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 3);
    const isEmailValid = validateField(emailInput, isValidEmail(emailInput.value.trim()));
    const isMsgValid = validateField(messageInput, messageInput.value.trim().length >= 10);

    if (isNameValid && isEmailValid && isMsgValid) {
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.textContent = `Transmission confirmed. Message recorded for ${nameInput.value.trim()}. Validation passed.`;
        alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      form.reset();
      form.querySelectorAll(".form-field-unit").forEach((group) => group.classList.remove("has-error"));
    } else {
      if (alertBox) {
        alertBox.style.display = "none";
      }
    }
  });
}
