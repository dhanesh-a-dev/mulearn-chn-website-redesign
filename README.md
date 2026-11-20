# µLearn CHN website

A redesigned website for **Gtech µLearn CHN**, College of Engineering Chengannur. It's built from scratch in plain HTML, CSS and JavaScript, with no frameworks, UI kits or templates.

## Features
- **Dark and light themes.** The site follows the visitor's system setting, and a toggle in the nav overrides it. The choice is remembered.
- **Hero.** An animated 3D wave terrain (canvas) behind a floating stack of glass cards (latest event, karma, campus rank, team, interest groups) that drift with the mouse.
- **About.** The campus community photo, with peer learning, mentorship and projects.
- **What µLearn offers.** Four steps, each with a small visual: profile, interest groups, learning circles, karma.
- **Events.** A carousel of the featured event posters, plus an archive table for each academic year with poster thumbnails and format tags.
- **Memories.** A photo gallery.
- **Team.** Leadership portraits and a filterable grid with everyone's photo.
- **Explore.** Preview cards for the brand book, µLearn gallery, Instagram, announcements and LinkedIn.
- **Join.** A call to action with registration, Discord and email links.
- **Glass surfaces and 3D tilt.** Cards use glassmorphism over drifting colour orbs, with a 3D tilt and light glare on hover; the light theme adds soft neumorphic depth.
- **Image viewer.** Click any poster or photo to see it full size.
- **Motion and accessibility.** The site respects reduced-motion settings, supports keyboard navigation, and works at phone widths.

## Structure
```
index.html        markup for every section
css/styles.css    theme tokens, layout, components, responsive rules
js/data.js        all content: stats, events, team, photo and poster URLs
js/main.js        rendering, theme toggle, carousel, archive tabs, lightbox, hero animation
assets/           favicon
```
To update content each year, edit only `js/data.js`. Images are served from the existing µLearn CHN Cloudinary account, and `main.js` requests resized versions automatically.

## Run locally
The scripts are ES modules, so serve the folder over HTTP instead of opening the HTML file directly:
```
python -m http.server 5173
```
Then open http://localhost:5173.

## Deploy
This is a static site. You can deploy the folder as-is to Vercel, Netlify or GitHub Pages; there is no build step.
