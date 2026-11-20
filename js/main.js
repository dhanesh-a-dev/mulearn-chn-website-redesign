import {
  STATS, JOURNEY, ARCHIVE, EVENT_TYPES, INTEREST_GROUPS, TEAM,
  PHOTOS, POSTERS, GALLERY, COMMUNITY_PHOTO,
} from "./data.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = new Intl.NumberFormat("en-IN");
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const icon = (id) => `<svg class="ico"><use href="#${id}"/></svg>`;

/* Resize Cloudinary images on the fly; other hosts are used as-is. */
function img(url, { w = 600, h, crop = "fill", face = false } = {}) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  const t = [`w_${w}`, h && `h_${h}`, `c_${crop}`, face && "g_face", "f_auto", "q_auto"].filter(Boolean).join(",");
  return url.replace("/upload/", `/upload/${t}/`);
}

/* ---------------- Theme ---------------- */
const themeListeners = [];
function initTheme() {
  const btn = $("#theme-toggle");
  const system = window.matchMedia("(prefers-color-scheme: light)");
  const current = () => root.dataset.theme || (system.matches ? "light" : "dark");
  const apply = () => {
    const mode = current();
    root.dataset.mode = mode;
    btn.setAttribute("aria-label", mode === "light" ? "Switch to dark theme" : "Switch to light theme");
    themeListeners.forEach((fn) => fn(mode));
  };
  btn.addEventListener("click", () => {
    const next = current() === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    apply();
  });
  system.addEventListener("change", apply);
  apply();
}

/* ---------------- Navigation ---------------- */
function initNav() {
  const nav = $("#nav");
  const toggle = $("#nav-toggle");
  const links = $("#nav-links");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  // Highlight the section in view
  const map = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const a = map.get(en.target.id);
      if (a && en.isIntersecting) {
        map.forEach((x) => x.classList.remove("is-active"));
        a.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* ---------------- Hero bits ---------------- */
function renderHeroExtras() {
  const faces = ["Nithin Jayakumar", "Divyalakshmi", "Amanul Farhan", "Pavithra A", "Adhi Narayan"];
  $("#proof-faces").innerHTML = faces
    .map((n) => `<img src="${img(PHOTOS[n], { w: 72, h: 72, face: true })}" alt="" width="30" height="30" />`)
    .join("");

  const items = [...INTEREST_GROUPS.map((g) => g.name), "Learning Circles", "Level Up in 30", "Build with AI", "Exodia", "Karma"];
  const row = items.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#marquee").innerHTML = row + row;

  // Floating card stack
  $("#hc-poster").src = img(POSTERS["Build with AI"], { w: 600, h: 495 });
  const teamFaces = ["Geetha S", "Govind J S", "Hanin C K", "Albin Thomas"];
  const total = TEAM.reduce((n, g) => n + g.people.length, 0);
  $("#hc-faces").innerHTML =
    teamFaces.map((n) => `<img src="${img(PHOTOS[n], { w: 80, h: 80, face: true })}" alt="" />`).join("") +
    `<span>+${total - teamFaces.length}</span>`;

  // Count the karma figure up once
  const big = $("[data-count]");
  if (big && !reduceMotion) {
    const target = Number(big.dataset.count);
    const start = performance.now() + 700;
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / 2000));
      big.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - t, 4)))) + (big.dataset.suffix || "");
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

/* Cards in the hero drift with the pointer, nearer cards more. */
function initStack() {
  const hero = $(".hero");
  const cards = $$(".hc");
  if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let raf = 0;
  hero.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      cards.forEach((c) => {
        const d = Number(c.dataset.depth || 1);
        c.style.setProperty("--px", `${(-x * d * 14).toFixed(1)}px`);
        c.style.setProperty("--py", `${(-y * d * 14).toFixed(1)}px`);
      });
    });
  });
  hero.addEventListener("pointerleave", () => cards.forEach((c) => { c.style.removeProperty("--px"); c.style.removeProperty("--py"); }));
}

/* 3D tilt with a light glare that follows the pointer. */
function initTilt() {
  if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest("[data-tilt]");
    $$("[data-tilt].is-tilting").forEach((x) => {
      if (x !== el) { x.classList.remove("is-tilting"); x.style.removeProperty("--rx"); x.style.removeProperty("--ry"); }
    });
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = Number(el.dataset.tilt) || 7;
    el.classList.add("is-tilting");
    el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  }, { passive: true });
  document.addEventListener("pointerleave", () => {
    $$("[data-tilt].is-tilting").forEach((x) => { x.classList.remove("is-tilting"); x.style.removeProperty("--rx"); x.style.removeProperty("--ry"); });
  });
}

/* ---------------- Explore previews ---------------- */
function renderExplore() {
  $("#polaroids").innerHTML = [GALLERY[2], GALLERY[0], GALLERY[4]]
    .map((g) => `<figure class="polaroid"><img src="${img(g.src, { w: 360, h: 270 })}" alt="" loading="lazy" /></figure>`)
    .join("");
  const posters = ["Exodia 3.0", "Build with AI", "Behind the Hack", "Karma Fest", "µment 2.0", "Introduction to Figma"];
  $("#insta-grid").innerHTML = posters
    .map((t) => `<img src="${img(POSTERS[t], { w: 200, h: 200 })}" alt="" loading="lazy" />`)
    .join("");
}

/* ---------------- Stats ---------------- */
const STAT_META = [
  { icon: "i-users", note: "and counting" },
  { icon: "i-spark", note: "earned by our learners" },
  { icon: "i-layers", note: "AI, UI/UX, Web, Cyber, Biz" },
  { icon: "i-trophy", note: "among µLearn campuses" },
];

function renderStats() {
  const wrap = $("#stats");
  wrap.innerHTML = STATS.map((s, i) => `
    <div class="stat ${s.accent ? "stat--karma" : ""}" data-reveal data-tilt="6" style="--d:${i * 0.07}s">
      <div class="stat__top"><span>${esc(s.label)}</span>${icon(STAT_META[i].icon)}</div>
      <b class="stat__value" data-stat="${i}">${s.prefix ?? ""}${fmt.format(s.value)}${s.suffix ?? ""}</b>
      <span class="stat__top">${esc(STAT_META[i].note)}</span>
    </div>`).join("");

  if (reduceMotion) return;
  const nodes = $$("[data-stat]", wrap);
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1800);
      const e = 1 - Math.pow(1 - t, 4);
      nodes.forEach((n) => {
        const s = STATS[n.dataset.stat];
        n.textContent = `${s.prefix ?? ""}${fmt.format(Math.round(s.value * e))}${s.suffix ?? ""}`;
      });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.4 });
  io.observe(wrap);
}

/* ---------------- About ---------------- */
function renderAbout() {
  const el = $("#community-photo");
  el.src = img(COMMUNITY_PHOTO, { w: 1200, h: 1020 });
  el.srcset = `${img(COMMUNITY_PHOTO, { w: 700, h: 595 })} 700w, ${img(COMMUNITY_PHOTO, { w: 1200, h: 1020 })} 1200w`;
  el.sizes = "(max-width: 1040px) 92vw, 600px";
}

/* ---------------- Offers ---------------- */
const IG_COLORS = ["#a593ff", "#f08fb8", "#3fd68e", "#6f97ff", "#f4a94e"];
function renderInterestGroups() {
  $("#ig-list").innerHTML = INTEREST_GROUPS.map((g, i) => `
    <li class="${i === 2 ? "is-hot" : ""}" style="--c:${IG_COLORS[i]}">
      <i></i>${esc(g.name)}<small>${esc(g.lead.split(" ")[0])}</small>
    </li>`).join("");
}

/* ---------------- Events: journey carousel ---------------- */
function renderJourney() {
  const track = $("#journey");
  track.innerHTML = JOURNEY.map((e, i) => {
    const poster = POSTERS[e.title];
    return `
    <article class="ev" data-reveal data-tilt="6" style="--d:${i * 0.08}s">
      <div class="ev__media">
        <button class="ev__poster" data-full="${esc(img(poster, { w: 1400, crop: "limit" }))}" data-cap="${esc(e.title)}" aria-label="View ${esc(e.title)} poster">
          <img src="${img(poster, { w: 700, h: 805 })}" alt="${esc(e.title)} poster" loading="lazy" />
        </button>
        <span class="ev__zoom" aria-hidden="true">${icon("i-arrow")}</span>
        <div class="ev__panel">
          <div class="ev__chips">
            <span>${icon("i-layers")}${esc(e.format)}</span>
            <span>${icon("i-calendar")}${esc(e.duration)}</span>
          </div>
          <div class="ev__more"><p>${esc(e.text)}</p></div>
        </div>
      </div>
      <div class="ev__body">
        <span class="ev__date">${esc(e.month)} · ${esc(e.days)}</span>
        <h3>${esc(e.title)}</h3>
        <p class="ev__desc">${esc(e.text)}</p>
      </div>
    </article>`;
  }).join("");

  const prev = $("#journey-prev");
  const next = $("#journey-next");
  const step = () => (track.querySelector(".ev")?.offsetWidth ?? 300) + 16;
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));
  const update = () => {
    prev.disabled = track.scrollLeft < 8;
    next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
  };
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------------- Events: archive board ---------------- */
const TYPE_COLORS = {
  Hackathon: "#a593ff", Workshop: "#6f97ff", "Tech fest": "#f08fb8", Talk: "#2fc9b4", Session: "#2fc9b4",
  Contest: "#f4a94e", Programme: "#c79bff", Bootcamp: "#3fd68e", Community: "#f08fb8",
};

function initArchive() {
  const tabs = $("#archive-tabs");
  const panel = $("#archive-panel");
  const count = $("#archive-count");
  const years = Object.keys(ARCHIVE);

  tabs.innerHTML = years.map((y, i) => `
    <button role="tab" id="tab-${i}" aria-controls="archive-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${y}</button>`).join("");
  const buttons = $$("button", tabs);

  const show = (index, focus = false, animate = true) => {
    buttons.forEach((b, i) => { b.setAttribute("aria-selected", String(i === index)); b.tabIndex = i === index ? 0 : -1; });
    if (focus) buttons[index].focus();
    panel.setAttribute("aria-labelledby", buttons[index].id);

    const items = [...ARCHIVE[years[index]]].sort((a, b) => b.sort.localeCompare(a.sort));
    count.textContent = `${items.length} ${items.length === 1 ? "event" : "events"} in ${years[index]}`;
    panel.innerHTML = items.map((e, i) => {
      const type = EVENT_TYPES[e.title] ?? "Event";
      const poster = POSTERS[`${e.title}@${e.sort}`] ?? POSTERS[e.title];
      const thumb = poster
        ? `<button class="row__thumb" data-full="${esc(img(poster, { w: 1400, crop: "limit" }))}" data-cap="${esc(e.title)}" aria-label="View ${esc(e.title)} poster"><img src="${img(poster, { w: 112, h: 112 })}" alt="" loading="lazy" /></button>`
        : "";
      return `
      <div class="row" style="--i:${i}">
        <time datetime="${e.sort}">${esc(e.date)}, ${e.sort.slice(0, 4)}</time>
        <div class="row__event">${thumb}<h4>${esc(e.title)}</h4></div>
        <span class="chip" style="--c:${TYPE_COLORS[type] ?? "#a593ff"}">${esc(type)}</span>
        <p>${esc(e.text)}</p>
      </div>`;
    }).join("");
    panel.scrollTop = 0;
    panel.classList.remove("is-swapping");
    if (animate) { void panel.offsetWidth; panel.classList.add("is-swapping"); }
  };

  tabs.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(buttons.indexOf(b)); });
  tabs.addEventListener("keydown", (e) => {
    const cur = buttons.findIndex((b) => b.getAttribute("aria-selected") === "true");
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (step) { e.preventDefault(); show((cur + step + buttons.length) % buttons.length, true); }
    else if (e.key === "Home") { e.preventDefault(); show(0, true); }
    else if (e.key === "End") { e.preventDefault(); show(buttons.length - 1, true); }
  });
  show(0, false, false);
}

/* ---------------- Memories ---------------- */
function renderGallery() {
  $("#gallery").innerHTML = GALLERY.map((g, i) => {
    const big = i === 0;
    return `
    <button class="shot" data-reveal style="--d:${(i % 3) * 0.08}s" data-full="${esc(img(g.src, { w: 1800, crop: "limit" }))}" data-cap="${esc(g.alt)}" aria-label="View photo: ${esc(g.alt)}">
      <img src="${img(g.src, { w: big ? 1100 : 640, crop: "limit" })}" alt="${esc(g.alt)}" loading="lazy" />
    </button>`;
  }).join("");
}

/* ---------------- Team ---------------- */
function renderTeam() {
  const [leaders, ...groups] = TEAM;

  $("#team-spotlight").innerHTML = leaders.people.map((p, i) => `
    <article class="lead-card" data-reveal data-tilt="5" style="--d:${i * 0.08}s">
      <img src="${img(PHOTOS[p.name], { w: 640, h: 768, face: true })}" alt="${esc(p.name)}" loading="lazy" />
      <div class="lead-card__info">
        <div class="lead-card__top"><span class="lead-card__role">${esc(p.role)}</span><span class="lead-card__tag">${i === 0 ? "Faculty" : "Leadership"}</span></div>
        <h3>${esc(p.name)}</h3>
      </div>
    </article>`).join("");

  const total = groups.reduce((n, g) => n + g.people.length, 0);
  const filter = $("#team-filter");
  filter.innerHTML =
    `<button aria-pressed="true" data-group="all">Everyone<small>${total}</small></button>` +
    groups.map((g, i) => `<button aria-pressed="false" data-group="${i}">${esc(g.group)}<small>${g.people.length}</small></button>`).join("");

  const grid = $("#team-grid");
  grid.innerHTML = groups.map((g, gi) => g.people.map((p, pi) => `
    <li class="person" data-group="${gi}" data-reveal data-tilt="8" style="--d:${(pi % 4) * 0.06}s">
      <div class="person__photo"><img src="${img(PHOTOS[p.name], { w: 440, h: 550, face: true })}" alt="${esc(p.name)}" loading="lazy" /></div>
      <div class="person__plate">
        <span class="person__name">${esc(p.name)}</span>
        <span class="person__role">${gi === 1 ? "IG Lead, " : ""}${esc(p.role)}</span>
        <span class="person__group"><span>${esc(g.group)} · µLearn CHN</span></span>
      </div>
    </li>`).join("")).join("");

  filter.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("button", filter).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    $$(".person", grid).forEach((card) => {
      card.hidden = b.dataset.group !== "all" && card.dataset.group !== b.dataset.group;
      card.classList.add("is-in");
    });
  });
}

/* ---------------- Lightbox ---------------- */
function initLightbox() {
  const dlg = $("#lightbox");
  const pic = $("#lightbox-img");
  const cap = $("#lightbox-cap");
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-full]");
    if (!t) return;
    pic.src = t.dataset.full;
    pic.alt = t.dataset.cap || "";
    cap.textContent = t.dataset.cap || "";
    dlg.showModal();
  });
  $("#lightbox-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { pic.removeAttribute("src"); });
}

/* ---------------- Scroll reveal ---------------- */
function initReveal() {
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  $$(".head, .about__photo, .about__text, .feature, .step, .board, .join, .gallery__more, .filter").forEach((el, i) => {
    if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "");
  });
  $$(".step").forEach((el, i) => el.style.setProperty("--d", `${i * 0.08}s`));
  $$(".feature").forEach((el, i) => el.style.setProperty("--d", `${0.1 + i * 0.08}s`));
  root.classList.add("js-reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$("[data-reveal]").forEach((el) => io.observe(el));
}

/* ---------------- Hero: perspective wave terrain ---------------- */
function initTerrain() {
  const canvas = $("#terrain");
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  let w = 0, h = 0, dpr = 1;
  let camX = 0, targetX = 0;
  let visible = true, running = false;
  let line = "200,196,255", haze = "7,6,13", strength = 1;

  const readColors = () => {
    const cs = getComputedStyle(root);
    line = cs.getPropertyValue("--terrain").trim() || line;
    haze = cs.getPropertyValue("--haze").trim() || haze;
    strength = root.dataset.mode === "light" ? 0.75 : 1;
    if (!running) draw(0);
  };
  themeListeners.push(readColors);

  const Z_NEAR = 1.1, Z_FAR = 22, ROWS = 52, COLS = 34, SAMPLES = 110, CAM_H = 1.15;
  const height = (x, z, t) => {
    const wall = Math.min(0.11 * x * x, 9);
    const swell = Math.sin(x * 0.55 + z * 0.32 - t * 0.6) * 0.14 + Math.sin(z * 0.5 + t * 0.35) * 0.1;
    return wall + swell * (0.4 + Math.min(1, Math.abs(x) / 6));
  };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const f = Math.max(h * 0.95, w * 0.5);
    const cx = w / 2;
    const horizon = h * 0.6;
    const project = (x, y, z) => [cx + (x - camX) * f / z, horizon + (CAM_H - y) * f / z];
    ctx.lineWidth = 1;

    for (let r = 0; r < ROWS; r++) {
      const u = r / (ROWS - 1);
      const z = Z_NEAR + (Z_FAR - Z_NEAR) * Math.pow(u, 1.6);
      const half = (w / 2) * z / f + 1;
      const fade = Math.pow(1 - u, 1.3);
      ctx.strokeStyle = `rgba(${line},${(0.03 + fade * 0.38) * strength})`;
      ctx.beginPath();
      for (let s = 0; s <= SAMPLES; s++) {
        const x = camX - half + (2 * half * s) / SAMPLES;
        const [sx, sy] = project(x, height(x, z, t), z);
        s ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy);
      }
      ctx.stroke();
    }

    for (let c = 0; c < COLS; c++) {
      const x = (c - (COLS - 1) / 2) * 0.62;
      ctx.strokeStyle = `rgba(${line},${(0.05 + 0.05 * (1 - Math.abs(x) / 11)) * strength})`;
      ctx.beginPath();
      for (let r = 0; r <= 40; r++) {
        const z = Z_NEAR + (Z_FAR - Z_NEAR) * Math.pow(r / 40, 1.6);
        const [sx, sy] = project(x, height(x, z, t), z);
        r ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy);
      }
      ctx.stroke();
    }

    const g = ctx.createLinearGradient(0, horizon - h * 0.25, 0, horizon + 20);
    g.addColorStop(0, `rgba(${haze},0)`);
    g.addColorStop(1, `rgba(${haze},0.85)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, horizon - h * 0.25, w, h * 0.25 + 20);
    const b = ctx.createLinearGradient(0, h * 0.82, 0, h);
    b.addColorStop(0, `rgba(${haze},0)`);
    b.addColorStop(1, `rgba(${haze},1)`);
    ctx.fillStyle = b;
    ctx.fillRect(0, h * 0.82, w, h * 0.18);
  }

  function frame(now) {
    if (!visible) { running = false; return; }
    camX += (targetX - camX) * 0.04;
    draw(now / 1000);
    requestAnimationFrame(frame);
  }
  function start() {
    if (reduceMotion || running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    targetX = ((e.clientX / w) - 0.5) * 1.4;
  });
  hero.addEventListener("pointerleave", () => { targetX = 0; });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); }).observe(hero);

  let timer;
  window.addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(resize, 120); });
  resize();
  readColors();
  start();
}

/* ---------------- Boot ---------------- */
initTheme();
initNav();
renderHeroExtras();
renderStats();
renderAbout();
renderInterestGroups();
renderJourney();
initArchive();
renderGallery();
renderTeam();
renderExplore();
initLightbox();
initStack();
initTilt();
initTerrain();
initReveal();
$("#year").textContent = new Date().getFullYear();
