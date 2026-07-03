# Cookies, Chores & Chronos — Project Documentation

## 1. Project Overview

`Cookies, Chores & Chronos` is a JavaScript programming assignment for CSE 391. The project consists of three interactive web applications — a fortune generator, a stopwatch, and a to-do list — that demonstrate core JavaScript concepts including DOM manipulation, event handling, timing functions, localStorage persistence, and array operations.

The three tools are presented inside a unified scrapbook-style notebook interface that extends the visual identity of the main homepage (`Siam's Scrapbook`). The design uses a binder/notebook layout, lined paper textures, post-it note sidebars, palette themes, custom SVG doodles, hand-drawn-style fonts, and a pastel gothic color scheme with four swappable colour palettes. The project also demonstrates XHTML 1.0 Strict compliance, external CSS with CSS custom properties, and vanilla JavaScript cross-page architecture.

The project is built with plain XHTML-style HTML, CSS, and JavaScript. It does not use a frontend framework.

## 2. File Structure

```text
Assignment 2/
  fortune.html
  stopwatch.html
  todo.html
  script.js
  style.css
  docs/
    PROJECT_DOCUMENTATION.md
  fonts/
    Blackcraft.ttf
  images/
    icons/
      *.svg
      *.png
    doodles/
      *.svg
```

The three HTML files are the application pages. `script.js` contains all A2-specific JavaScript logic. `style.css` provides A2-specific CSS overrides and palette theme definitions.

The A2 pages also depend on the parent directory's `style.css` (notebook layout, global components, animations) and `script.js` (shared UI features: dark/light mode toggle, scroll-to-top, footer metadata, paper modal, bookmark ribbon, page flip transition, post-it sidebar interaction).

## 3. Pages

### `fortune.html` — Fortune Generator

This page displays a random fortune message in a styled box and allows the user to change the appearance of the fortune box through palette chip buttons.

Main sections:

- Dual post-it note sidebars (A2 task navigation + HP site navigation)
- Binder spine with decorative rings
- Bookmark ribbon
- Header with page title, emoji icons, and top navigation
- Fortune generator area with heading, reset button, and fortune display box
- Palette chip card showing four colour theme buttons (PINK, BLUE, PURPLE, ORANGE)
- Footer with page location and last modified date
- Scroll-to-top button
- Paper modal notification overlay

The fortune is randomly selected from an array of 16 unique fortunes on every page load. Each palette button changes the font colour, background colour, border colour, font size, and font family of the fortune box, while also swapping emoji and SVG control icons across the page.

### `stopwatch.html` — Stopwatch

This page provides a functional stopwatch that counts time in steps of 3 seconds and automatically stops at 30 seconds unless reset.

Main sections:

- Dual post-it note sidebars
- Binder spine with rings
- Bookmark ribbon
- Header with title, emoji icons, and navigation
- Stopwatch card with large display and three sketch-style buttons: Play, Stop, Reset
- Footer with metadata
- Scroll-to-top button
- Paper modal

The timer increments in multiples of 3 seconds each second. If stopped before reaching 30 seconds, it resumes from the last recorded time when started again. The display font uses a custom Blackcraft typeface for a distressed, hand-drawn look.

### `todo.html` — To-Do List

This page provides a task management application where users can add, track, and delete tasks with persistent storage.

Main sections:

- Dual post-it note sidebars
- Binder spine with rings
- Bookmark ribbon
- Header with title, emoji icons, and navigation
- "Add a task" button card
- Two task cards: "Today's scraps" (primary) and "Overflow pile" (shown when more than 5 tasks exist)
- Custom task input modal with text field and Cancel/Add buttons
- Footer with metadata
- Scroll-to-top button
- Paper modal notification system

Each task has a custom-styled checkbox to mark completion (with strikethrough) and a "peel off" delete button. Tasks are saved to localStorage and persist across page refreshes. A 10-task cap prevents overload, triggering a "Enough on your plate!" warning modal when exceeded. The Enter key is supported in the task input modal for quick adding.

## 4. Navigation

The A2 pages use three types of navigation:

- **Main internal navigation** between A2 pages: `fortune.html`, `stopwatch.html`, and `todo.html` — available in both the top nav bar and the A2 post-it sidebar
- **Cross-site navigation** back to the main homepage: `index.html`, `hobbies.html`, `experiences.html`, and `projects.html` — available in the HP post-it sidebar
- **Anchor navigation** within pages, such as scroll-to-top linking to `#wrapper`

The active page is marked with the `active` class on the correct navigation link in both the top nav and the sidebar.

The post-it sidebars are fold-out panels with a tab that slides the content in and out. Tugging the tab toggles the `.open` class, which animates the sidebar. The A2 sidebar uses a pink-tinted tab; the HP sidebar uses a green-tinted tab. Both sidebars appear with a delayed entrance (1500ms after page load) for a staggered notebook aesthetic.

## 5. Visual Design Concept

The main concept is a digital scrapbook page inside a binder, extending the visual language from the main homepage.

Important visual ideas:

- The central content area looks like yellow lined paper with a red margin line.
- A binder spine with four gradient rings sits on the left side.
- Cards look like pasted notes with semi-transparent tape across the top edge.
- Each interactive element (fortune box, palette chips, sketch buttons, todo cards) has a subtle rotation for a hand-placed scrapbook feel.
- Four complete colour palettes (light-pink, baby-blue, gothic-purple, warm-orange) define the entire page appearance through CSS custom properties.
- SVG control icons (play, stop, reset) and emoji PNGs swap per palette, reinforcing the theme visually.
- A bookmark ribbon with a tucked-hanging animation sits on the right side.
- The stopwatch display uses Blackcraft, a distressed/grunge custom font loaded via `@font-face`.
- SVG doodles themed to each page's purpose decorate the notebook (hourglass, fortune cookie, tarot card, scorpio, etc.).

The visual style is CSS-driven: gradients, shadows, pseudo-elements, borders, keyframe animations, and layered backgrounds create the notebook illusion.

## 6. Features

### Fortune Generator

- An array of 16 fortune messages is stored in JavaScript.
- On page load, `Math.random()` selects one fortune to display in a centred box.
- The fortune box is styled with a dashed border, italic serif font, and soft shadow.
- Four palette chip buttons sit below the fortune box, each labelled with a colour name.
- Clicking a chip changes the fortune box's background, text colour, border colour, font size, and font family simultaneously using both inline styles and CSS variable cascade.
- The active palette is persisted in localStorage and can be reset manually with the reset button.
- A reset button next to the heading restores the default palette with a hover rotation animation.
- Palette change triggers icon swapping: the header emoji PNGs and all SVG control icons update to match the selected palette across all A2 pages.

### Stopwatch

- The timer uses `setInterval` with a 1000ms interval, incrementing `swElapsed` by 3 each tick.
- When `swElapsed` reaches the 30-second maximum (`SW_MAX`), the timer stops automatically and caps the display at 30.
- The Play button starts or resumes the timer. It is disabled while running or when at max.
- The Stop button pauses the timer. It is disabled when the timer is already stopped or at zero.
- The Reset button stops the timer and resets the display to 0s, re-enabling the Play button.
- The sketch-style buttons use rotated button wraps with SVG icons that change per palette.

### To-Do List

- Tasks are stored in a JavaScript array and serialised to localStorage as JSON using `TODO_STORAGE_KEY`.
- Adding a task opens a custom modal backdrop with a text input field. The Enter key triggers the confirm action.
- Tasks are rendered as `<li>` elements inside unordered lists within card containers.
- Each task item contains: a custom-styled checkbox, the task text, and a "peel off" delete button.
- Checking the checkbox applies a strikethrough and reduces opacity via the `.completed` class.
- A 10-task maximum (`TODO_MAX`) prevents unlimited task creation. Reaching the cap opens a "Enough on your plate!" warning modal.
- Tasks are split across two cards: the primary card holds 5 tasks, and a secondary "Overflow pile" card appears when more than 5 tasks exist.
- All CRUD operations (add, toggle, delete) call `saveTodos()` and `renderTodos()` to keep the UI and storage synchronised.

### Palette Themes

The four palette themes redefine 20+ CSS custom properties each:

- **light-pink** — pink paper, rose accents, teal-green post-it tabs
- **baby-blue** — blue paper, sky accents, warm coral tape, soft yellow post-it tabs
- **gothic-purple** — dark purple paper, lavender text, mint-green post-it tabs
- **warm-orange** — warm beige paper, rust accents, sage-green post-it tabs

Each palette also controls: `--paper-bg`, `--paper-line`, `--margin-line`, `--text-color`, `--text-muted`, `--border-color`, `--card-bg`, `--accent-color`, `--highlight-color`, `--tape-color`, `--footer-bg`, `--a2-bookmark-color`, `--stacked-page-color`, `--postit-tab` colours, and `--cover-edge-color`.

### Cross-Page Shared Features (from main `script.js`)

The A2 pages also inherit the following features from the main `script.js`:

- **Dark/Light Mode Toggle** — toggles `body.dark-mode` and persists state in localStorage
- **Post-it Sidebar Interaction** — fold-out tab panels with `.open` class toggle, delayed appearance, and `aria-expanded` attribute
- **Bookmark Ribbon** — clickable interaface that retracts/hangs with localStorage persistence
- **Page Flip Transition** — 3D perspective rotation animation on navigation between pages
- **Scroll-to-Top Button** — appears after 300px scroll, animated with float and pulse ring
- **Footer Metadata** — Page Location (`window.location.href`) and Last Modified (`document.lastModified`) auto-populated
- **Paper Modal Notification** — reusable backdrop overlay for alerts and success messages

## 7. JavaScript Architecture

All A2-specific JavaScript is in `Assignment 2/script.js` (486 lines). The global `script.js` (~324 lines) provides shared UI infrastructure.

Key patterns:

- **Per-page initialisation guards**: Each `DOMContentLoaded` listener checks `document.body.classList.contains('a2-page-fortune')` (or `-stopwatch`, `-todo`) to run page-specific code only on the correct page.
- **State as module-level variables**: `a2Todos`, `swElapsed`, `swRunning`, `todoIdCounter` are declared at the top level and mutated by functions.
- **localStorage for persistence**: Two storage keys for A2: `a2Palette` (palette name) and `a2Todos` (JSON-serialized task array).
- **No framework**: Pure vanilla JavaScript with `var` declarations, `for` loops, `getElementById`, `querySelectorAll`, `addEventListener`, and `setInterval`.
- **Cross-file communication**: `window.showNotification()` is exposed by the main script and called by the A2 script for the "plate full" warning.
- **Icon swapping**: Direct `src` reassignment on `<img>` elements based on palette name.
- **Error handling**: `try/catch` wrapping `localStorage` access and JSON parsing; null checks before DOM element access.

## 8. Images and Assets

The A2 pages use both local images and custom fonts.

Local images include:

- Emoji PNG icons (4 palette variants): `images/icons/{palette}-emoji.png`
- Play SVG icons (4 palette variants): `images/icons/{palette}-play.svg`
- Stop SVG icons (4 palette variants): `images/icons/{palette}-stop.svg`
- Reset SVG icons (4 palette variants): `images/icons/{palette}-reset.svg`
- Decorative SVG doodles in `images/doodles/`: checkmark, clipboard, fortune-cookie, fortune-stars, hourglass, pencil, scorpio, stopwatch, tarot-card

Fonts:

- `fonts/Blackcraft.ttf` — distressed/grunge display font for the stopwatch
- `../fonts/Cheveuxdange.ttf` — cursive heading font (shared from homepage)
- `../fonts/Disturbed-zrRGD.ttf` — disturbed font for header elements (shared from homepage)

For final submission, all local images, SVGs, and fonts must be included in the ZIP file.

## 9. Required Features Implemented

- **Fortune Generator**: 16 fortunes, random selection on load, 4 colour chips changing the fortune box's background, text, border, font size, and font family
- **Stopwatch**: 3-second-step counting, auto-stop at 30, start/stop/reset buttons, resume from paused time
- **To-Do List**: add tasks via modal input with Enter key, checkbox completion with strikethrough, delete with "peel off" button, localStorage persistence
- **Technical**: XHTML 1.0 Strict, external CSS/JS, well-commented JS, lowercase tags, self-closing tags, escaped ampersands

## 10. Extra Features

Beyond the base requirements: four full palette themes with 20+ CSS variables each, palette-driven icon swapping (emoji PNGs + SVG controls), dual post-it sidebars, clickable bookmark ribbon, custom Blackcraft font, sketch-style rotated buttons, two-card todo layout, 10-task cap with "Enough on your plate!" modal, custom-styled checkboxes, page flip 3D transitions, responsive design, fortune reset button, and rotating/scaling hover effects.

## 11. CSS Architecture

The A2 styling is split across two files:

### Global `style.css` (shared with homepage)

Provides the base notebook layout:

- `#wrapper` — lined paper background with layered CSS gradients
- `.binder-spine` and `.binder-ring` — decorative binder elements
- `.card` — reusable content card with tape pseudo-element
- `.header`, `.nav-links`, `.footer` — layout and typography
- `.postit-rail`, `.postit-sidebar` — fold-out sidebar system with `.postit-sidebar-tab` and `.postit-sidebar-content`
- `#bookmark-ribbon` — bookmark with retraction animation
- `.scroll-top-btn` — scroll-to-top with float animation
- `.paper-modal-backdrop` — modal overlay
- Page flip keyframe animations (`pageFlipEnter`, `pageFlipExit`)
- Dark mode variable overrides in `body.dark-mode`
- Responsive media queries at 1180px, 767px, 600px, 420px

### A2-specific `style.css` (~556 lines)

Provides A2-specific styling:

- `@font-face` for Blackcraft
- `body.a2` — background colour and base overrides
- `.a2-nav-links` — flexible nav wrap
- `body.a2 .card` — rotation hover effect
- `body.a2 .fortune-box` — fortune display with rotation hover
- `body.a2 .palette-chip` — grid layout, individual rotation per chip (`--chip-rotate`), active state
- `.chip-light-pink`, `.chip-baby-blue`, `.chip-gothic-purple`, `.chip-warm-orange` — chip colour classes
- `.fortune-heading` — flex layout with reset button
- `.fortune-reset-btn` — transparent button with rotation hover
- `.stopwatch-display` — Blackcraft font, large size
- `.stopwatch-controls` — flex layout
- `.sketch-btn-wrap` — rotation per button using `--sketch-tilt`, hover straighten
- `.sketch-btn` — circular SVG button with hover scale
- `.todo-section`, `.todo-cards-wrap`, `.todo-card` — card layout
- `.todo-item` — flex layout with checkbox, text, delete button
- `.todo-checkbox` — custom appearance with pseudo-element checkmark
- `.todo-text.completed` — strikethrough and opacity
- `.todo-delete` — dashed border "peel off" button
- `.todo-add-btn` — absolute positioned below the card
- `.a2-modal-backdrop`, `.a2-modal-content` — modal styling with rotation
- `.a2-modal-actions` — button layout
- Four palette theme classes (`body.a2.palette-light-pink`, etc.) with 20+ CSS variables each

## 11. Notes

- The contact form and dark/light mode toggle are carried over from the main homepage and function across A2 pages. The dark mode is independent of the palette system.
- The bookmark and palette states use `localStorage`, so they persist per browser/device only. The palette can be reset to default using the reset button on the fortune page.
- The palette icon swapping requires 4 sets of emoji PNGs (light-pink, baby-blue, gothic-purple, warm-orange) and 4 sets of SVG icons (play, stop, reset) to exist in `images/icons/`.
- Default palette uses warm-orange emoji PNGs and light-pink SVG icons. This is intentional for visual harmony.
- The project is highly decorative, so some positions are controlled with inline styles for precise scrapbook placement.
- The project does not use a backend server. All three pages are static HTML with client-side JavaScript.

## 12. How to Run

This is a static web project. Open any of the A2 pages in a browser:

```text
Assignment 2/fortune.html
Assignment 2/stopwatch.html
Assignment 2/todo.html
```

Alternatively, open `index.html` in the parent directory and navigate to the A2 pages via the HP sidebar or top navigation.

For best results, keep the folder structure unchanged so CSS, fonts, images, and JavaScript continue to load correctly.

## 13. Summary

This project is a JavaScript-focused web application that implements three interactive tools — a fortune generator, a stopwatch, and a to-do list — for CSE 391 Assignment 2. It combines all base assignment requirements (random fortune selection with 4-style customisation, 3-second-step stopwatch with start/stop/reset, persistent to-do list with add/check/delete) with a cohesive scrapbook visual identity that extends the main homepage's design language. The project demonstrates XHTML 1.0 Strict compliance, CSS custom property theming with four palettes, vanilla JavaScript DOM manipulation and event handling, localStorage persistence, responsive design, and a hand-drawn notebook aesthetic with custom fonts, SVG icons, and decorative doodles.
