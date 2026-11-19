# Web Fundamentals - ZIT (460-2079/02)

Academic Project for "Basics of Information Technology" (ZIT)
VSB - Technical University of Ostrava (VSB-TUO)
Lecturer: Ing. Michal Radecky, Ph.D.

## Student Information

- **Student:** Mehedi Toure
- **VŠB Login:** TOU0026
- **Course:** Basics of Information Technology (460-2079/02)
- **Academic Year:** 2026/2027

## Compliance with LMS Assignment Criteria

1. **Framework-Free Stack:**
   - 100% Plain Semantic HTML5
   - 100% Plain Modern CSS3 (CSS Variables, Flexbox, CSS Grid)
   - 100% Plain Vanilla ECMAScript (Zero dependencies, no jQuery, no Bootstrap, no external frameworks)

2. **Multipage Architecture:**
   - `index.html`: Web Architecture Curriculum, Core Standards, Prague Clock & Deadline Countdown, Interactive Search.
   - `interactive.html`: Interactive Knowledge Quiz with real-time scoring, CSS Box Model Inspector, and Form Validation.

3. **Responsive Design:**
   - Fluid responsive breakpoints with CSS Grid `repeat(auto-fit, minmax(...))` and Flexbox.
   - Mobile navigation toggle menu for viewports under 680px.

4. **JavaScript Functionalities:**
   - Live Countdown Timer to deadline (22 November 2026 23:59:59 CET).
   - Real-time Prague clock (CET timezone).
   - Dark/Light mode theme switch with `localStorage` persistence.
   - Live search filter across technical concept cards.
   - Dynamic 5-question Quiz Engine with instant feedback and score evaluation.
   - Live CSS Box Model playground updating computed CSS declarations.
   - Strict client-side form validation with inline accessible error reporting.

## Deployment Options

### Option A: GitHub Pages (Recommended)

```bash
cd /Users/eteindre/Projet/web/sites/zit-web-project
git init
git add .
git commit -m "feat: initial release of ZIT web fundamentals project"
gh repo create zit-web-project --public --source=. --push
gh repo edit --enable-pages --pages-branch=main
```

### Option B: Vercel

```bash
cd /Users/eteindre/Projet/web/sites/zit-web-project
vercel --prod
```
