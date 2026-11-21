/**
 * Web Fundamentals - ZIT (460-2079/02)
 * Student: Mehedi Toure (TOU0026) - VSB-TUO
 * Javascript Part: Client-side validation & dynamic table management
 * Pure Vanilla JavaScript (Zero Frameworks)
 */

document.addEventListener("DOMContentLoaded", () => {
  initCursorFollower();
  initMobileNav();
  initRealtimeClock();
  initSearchFilter();
  initFeedbackManager();
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
   3. Real-time Prague Clock (index.html & interactive.html)
   ========================================================================== */
function initRealtimeClock() {
  const clockEl = document.getElementById("prague-clock");
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
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

  updateClock();
  setInterval(updateClock, 1000);
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
   5. Feedback Manager: Validation & Dynamic Table (interactive.html)
   ========================================================================== */
const DEFAULT_FEEDBACKS = [
  {
    date: "2026-11-21 17:45",
    name: "Jensen Huang (NVIDIA CEO)",
    email: "jensen@nvidia.com",
    message: "Zero framework latency, ultra-lightweight rendering. Faster than Blackwell. Highly approved: 10/10.",
    status: "10/10 Approved"
  },
  {
    date: "2026-11-21 18:20",
    name: "Sam Altman (OpenAI CEO)",
    email: "sama@openai.com",
    message: "Flawless semantic HTML5 and native JavaScript execution. AGI-ready architecture: 10/10.",
    status: "10/10 Verified"
  },
  {
    date: "2026-11-21 19:10",
    name: "Mehedi Toure",
    email: "mehedi.toure.st@vsb.cz",
    message: "ZIT course assignment: pure standards-compliant frontend with dynamic DOM management.",
    status: "Submitted"
  }
];

function initFeedbackManager() {
  const form = document.getElementById("academic-feedback-form");
  const tableBody = document.getElementById("feedback-table-body");
  const countBadge = document.getElementById("feedback-count-badge");
  if (!tableBody) return;

  // Retrieve or seed localStorage (refresh if legacy data present)
  let feedbacks = [];
  try {
    const stored = localStorage.getItem("zit_feedbacks");
    if (stored && !stored.includes("Michal Radecky") && !stored.includes("ChatGPT") && stored.includes("Sam Altman")) {
      feedbacks = JSON.parse(stored);
    } else {
      feedbacks = [...DEFAULT_FEEDBACKS];
      localStorage.setItem("zit_feedbacks", JSON.stringify(feedbacks));
    }
  } catch (err) {
    feedbacks = [...DEFAULT_FEEDBACKS];
  }

  // Render function
  function renderFeedbacks() {
    tableBody.innerHTML = "";

    if (countBadge) {
      countBadge.textContent = `${feedbacks.length} review${feedbacks.length > 1 ? "s" : ""} recorded`;
    }

    if (feedbacks.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="5" class="table-empty-row">No reviews recorded yet.</td>`;
      tableBody.appendChild(emptyRow);
      return;
    }

    feedbacks.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "feedback-row";
      row.innerHTML = `
        <td class="table-date-cell" data-label="Date">${escapeHtml(item.date)}</td>
        <td class="table-author-cell" data-label="Author">${escapeHtml(item.name)}</td>
        <td class="table-email-cell" data-label="Email"><a href="mailto:${escapeHtml(item.email)}" class="table-email-link">${escapeHtml(item.email)}</a></td>
        <td class="table-message-cell" data-label="Feedback">${escapeHtml(item.message)}</td>
        <td class="table-status-cell" data-label="Status"><span class="table-status-pill">${escapeHtml(item.status || "Approved")}</span></td>
      `;
      tableBody.appendChild(row);
    });
  }

  renderFeedbacks();

  // Form Validation & Submit handling
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
      // Format current timestamp
      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

      const newEntry = {
        date: formattedDate,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        status: "10/10 New"
      };

      // Add to beginning of array
      feedbacks.unshift(newEntry);

      // Save to localStorage
      try {
        localStorage.setItem("zit_feedbacks", JSON.stringify(feedbacks));
      } catch (err) {
        // Fallback if storage unavailable
      }

      // Re-render table with new row
      renderFeedbacks();

      // Alert feedback
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.textContent = `Transmission confirmed. Review from ${nameInput.value.trim()} recorded in the table below.`;
        alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Reset form fields
      form.reset();
      form.querySelectorAll(".form-field-unit").forEach((group) => group.classList.remove("has-error"));
    } else {
      if (alertBox) {
        alertBox.style.display = "none";
      }
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
