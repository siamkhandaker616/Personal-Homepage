# Siam's Scrapbook - Project Documentation

## 1. Project Overview

`Siam's Scrapbook` is a personal homepage project for CSE 391. The goal is to present personal information, academic background, hobbies, experiences, and projects through a web page that feels like a decorated scrapbook or notebook.

The design is intentionally personal rather than corporate. It uses a binder/notebook layout, paper textures, doodles, decorative tape, handwritten-style fonts, and a pastel gothic color palette. The project also demonstrates required web development concepts: multiple pages, navigation, internal and external links, images, lists, tables, forms, CSS styling, JavaScript, dark/light mode, hover effects, and footer metadata.

The project is built with plain XHTML-style HTML, CSS, and JavaScript. It does not use a frontend framework.

## 2. File Structure

```text
22299030_CSE391_Assignment_1/
  index.html
  hobbies.html
  experiences.html
  projects.html
  style.css
  script.js
  README.md
  docs/
    PROJECT_DOCUMENTATION.md
  fonts/
    Cheveuxdange.ttf
    Disturbed-zrRGD.ttf
  images/
    *.png
    doodles/
      *.svg
```

The four HTML files are the website pages. `style.css` is responsible for all the customization. `script.js` provides interactivity used across pages.

## 3. Pages

### `index.html`

This is the main homepage. It introduces the site owner and acts as the main hub.

Main sections:

- Header and navigation
- Jump links to page sections
- About Me section
- Education section
- Technical Skills section
- Contact form
- Footer with page location and last modified date

This page also includes a small internal CSS block inside the `<head>`. The internal CSS is used for local homepage-specific presentation, such as the jump navigation, profile caption, education spacing, form reset, and footer compliance text.

### `hobbies.html`

This page explains personal interests and creative influences.

Main sections:

- Categorized activities and interests
- Top 10 lists
- Horror game recommendation table
- Visual Kei music corner

It includes a polaroid-style image, ordered and unordered lists, an embedded sentence link to GitHub, and a detailed table with row and column merging.

### `experiences.html`

This page presents academic coursework and achievements.

Main sections:

- Coursework and academic grades table
- Extracurricular achievements

The table includes multiline course/project details through hover popups. It uses `rowspan` for terms with multiple courses and `colspan` for the final summary row. This page also includes a small internal CSS block for page-specific decorative styling, such as the trophy cup placement and footer compliance text.

### `projects.html`

This page lists programming and design projects.

Main sections:

- Project gallery
- Future project plans

Each project appears inside a project card with an image, short description, technology label, and optional GitHub link.

## 4. Navigation

The site uses three types of navigation:

- Main internal navigation between pages: `index.html`, `hobbies.html`, `experiences.html`, and `projects.html`
- Anchor navigation within pages, such as `#about`, `#education`, and `#skills`
- External links, including BRAC University, the CSE 391 Discord, GitHub, YouTube, and project repositories

The active page is marked with the `active` class on the correct navigation link. The CSS makes the active link look like a hand-drawn circled label.

JavaScript adds a page-flip transition when the user clicks a main navigation link. Instead of navigating instantly, the script briefly applies the `page-flip-exit` class to `#wrapper`, waits about 480 milliseconds, and then changes `window.location.href`.

## 5. Visual Design Concept

The main concept is a digital scrapbook page inside a binder.

Important visual ideas:

- The central content area looks like yellow lined paper.
- The right edge looks like an extra notebook page.
- The binder spine and binder rings connect the paper visually.
- Cards look like pasted notes with tape.
- Doodles decorate each section.
- Soft pink, purple, yellow, and gothic accent colors give the site its pastel gothic identity.

The visual style is mostly CSS-driven. Gradients, shadows, pseudo-elements, borders, and layered background images create the notebook illusion.

## 6. CSS File Responsibilities

### `style.css`

This section is divided in fours types of styling:

#### Theme - controls global theme values.

Main responsibilities:

- Imports Google fonts
- Loads local fonts with `@font-face`
- Defines CSS variables in `:root`
- Defines dark mode variable overrides in `body.dark-mode`
- Sets body background, text color, font family, and global heading styles
- Provides small utility classes such as `.bold`, `.italic`, `.highlight`, and `.text-center`

Most colors are stored as CSS variables. This makes dark mode easier because JavaScript only needs to toggle `body.dark-mode`; CSS variables handle the rest.

#### Layout - controls the overall notebook layout.

Main responsibilities:

- Styles `#wrapper`, the main notebook page container
- Builds the lined paper effect with layered CSS gradients
- Builds the right-side paper extension with `#wrapper::after`
- Adds stitching with `#wrapper::before`
- Creates the binder spine and binder rings
- Styles the bookmark ribbon
- Styles the header and navigation
- Adds page-flip entrance and exit animations

The binder effect is decorative but central to the site's identity. The right-side pseudo-element overlaps near the binder so the paper looks connected rather than detached.

#### Components - controls reusable content components.

Main responsibilities:

- Cards
- About/profile layout
- Quote box
- Lists
- Tables
- Contact form
- Footer
- Project cards
- Polaroid image frame
- Scroll-to-top button
- Course hover popups
- Modal dialog
- Responsive rules for small screens

The table styles include borders, striped rows, hover states, and horizontal scrolling through `.table-container { overflow-x: auto; }`. This keeps wide tables usable on smaller screens.

#### Doodles - controls extra decorative scrapbook elements.

Main responsibilities:

- `.pressed-petal` CSS decoration
- `.scrapbook-doodle` absolute-position helper
- Interactive Chi cat doodle used on the hobbies page
- Chi cat hover/active states and speech bubble

The Chi cat uses different background images for normal, hover, and active states. It is one of the small playful interactions in the site.

## 7. JavaScript Features

All JavaScript is in `script.js`. The script runs after `DOMContentLoaded`, so it waits until the page HTML is available before trying to access elements.

### Dark/Light Mode Toggle

The button with `id="mode-toggle"` toggles `body.dark-mode`.

How it works:

1. On page load, JavaScript checks `localStorage.getItem('darkMode')`.
2. If the saved value is `"true"`, it adds the `dark-mode` class to `<body>`.
3. When the user clicks the button, the class is toggled.
4. The new state is saved back into `localStorage`.
5. The button label changes between dark mode and light mode text.

Because the state is stored in `localStorage`, the user's chosen mode persists after page reloads and while moving between pages.

### Footer Location and Last Modified Date

Each page footer contains:

- `#page-location`
- `#last-modified`

JavaScript fills these values automatically:

- `window.location.href` displays the current page address.
- `document.lastModified` displays the browser's last known modification date for the file.

This satisfies the assignment requirement to show page location and last modification date using JavaScript.

### Scroll-to-Top Button

The scroll-to-top link has `id="scroll-to-top"`.

How it works:

1. JavaScript listens for the page scroll event.
2. If the page has been scrolled more than 300 pixels, it adds the `show` class.
3. CSS makes the button visible and animated when `.show` is present.
4. Clicking the button links back to `#wrapper`.

### Modal Notification System

The homepage includes a modal with:

- `#paper-modal`
- `#paper-modal-title`
- `#paper-modal-message`
- `#paper-modal-close`

The function `showNotification(title, message, triggerReload)` updates the modal text and displays it. It is used for form validation, sending status, and success messages.

If `triggerReload` is true, clicking OK clears the form fields and reloads the page.

### Form Placeholder Behavior

Instead of using native placeholder attributes, the script manually fills empty form fields with placeholder-like text.

Fields:

- `input-name`
- `input-contact`
- `input-message`

On focus, the placeholder text disappears. On blur, it returns if the field is empty. The `.placeholder-style` class changes how placeholder-like text looks.

### Contact Form and Email Flow

The contact form is in `index.html` and posts to Formspree:

```html
<form action="https://formspree.io/f/xaqgoyrv" method="post">
```

The script prevents the browser's default form submission and sends the form data manually using `fetch()`. This keeps the user on the page and allows the site to show its custom modal messages instead of redirecting to a default Formspree response page.

The payload contains:

- Form subject
- Form origin
- Sender name
- Contact information
- Message details
- Send time

Current behavior:

- If required fields are empty, the modal asks the user to fill them.
- If Formspree accepts the request, the modal shows a success message.
- If the request fails or Formspree rejects it, the modal says the message could not be confirmed.

Actual email delivery depends on the Formspree endpoint being active and connected to the correct email account.

### Page Flip Transition

The script finds all main navigation links inside `.nav-links`.

If a clicked link:

- Is not an anchor link
- Is not an external link
- Is not already active

then JavaScript prevents immediate navigation, adds `.page-flip-exit` to `#wrapper`, and navigates after a short timeout. This makes page changes feel like turning a scrapbook page.

### Bookmark Retraction

The bookmark ribbon has `id="bookmark-ribbon"`.

How it works:

1. On page load, JavaScript checks `localStorage.getItem('bookmarkRetracted')`.
2. If true, it applies the `bookmark-retracted` class.
3. Clicking the bookmark toggles that class.
4. The retracted state is saved in `localStorage`.

This lets the bookmark stay tucked away or visible across page loads.

## 8. Tables

The project contains structured tables in the hobbies and experiences pages.

The experiences table documents coursework and grades. It includes:

- Header row
- Multiple rows of course data
- `rowspan` to group multiple courses under the same academic term
- `colspan` for the final enrollment status row
- Hover popups inside course title cells

The hobbies table documents horror game recommendations. It includes:

- Categories grouped with `rowspan`
- A final recommendation row using `colspan`
- Multiline descriptive content

Both tables are wrapped in `.table-container`, which provides notebook styling and horizontal scrolling for responsiveness.

## 9. Images and Assets

The project uses both local and remote images.

Local images include:

- Backgrounds: `images/bg-light.png`, `images/bg-dark.png`
- Profile image: `images/profile.png`
- Pressed flower: `images/pressed-petal.png`
- Decorative SVG doodles in `images/doodles/`

Remote images include:

- Unsplash project and hobby images
- Form/status badge image from shields.io
- Chi cat images loaded through CSS

For final submission, all local images, SVGs, and fonts must be included in the ZIP file. Remote images require internet access to display.

## 10. Styling Requirements Demonstrated

The project demonstrates:

- External CSS through `theme.css`, `layout.css`, `components.css`, and `doodles.css`
- Internal CSS through small `<style type="text/css">` blocks in selected pages
- Inline CSS for small one-off decorative placement values
- Hover effects on cards, links, tables, buttons, headings, project cards, and course popups
- CSS animations for page flip, floating scroll button, pulsing profile image, heading wiggle, and Chi cat motion
- Responsive table handling with horizontal overflow
- Responsive layout adjustments for small screens

## 11. XHTML-Style Structure

The HTML files use the XHTML 1.0 Strict doctype and XHTML-style syntax. Examples:

- Lowercase tags
- Quoted attributes
- Self-closing tags such as `<br />`, `<img />`, and `<meta />`
- Escaped ampersands as `&amp;`

This is important because the assignment mentions W3C validation and XHTML 1.0 or 1.1 standards.

## 12. Notes

- Some images are remote. If the user is offline, those images may not load.
- The contact form depends on Formspree to forward submissions to email.
- The bookmark and dark mode states use `localStorage`, so they persist per browser/device only.
- The site is highly decorative, so some positions are controlled with inline styles for precise scrapbook placement.
- The project does not use a backend server.

## 13. AI Use Declaration

AI assistance was used for this documentation file and for image-hunting/moodboard guidance while selecting replacement visual assets. The website's final content, personal details, styling choices, and submitted project files remain curated and reviewed by the student.

## 14. How to Run

This is a static website. Open `index.html` in a browser, then use the navigation links to move between pages.

Recommended starting point:

```text
index.html
```

For best results, keep the folder structure unchanged so CSS, fonts, images, and JavaScript continue to load correctly.

## 15. Summary

This project is a personal homepage designed as a scrapbook-style notebook. It combines assignment requirements with a personal visual identity: academic information, interests, projects, external links, tables, lists, images, JavaScript interactivity, dark mode, and a contact form. The result is intended to feel like a personal digital hub rather than a generic portfolio template.
