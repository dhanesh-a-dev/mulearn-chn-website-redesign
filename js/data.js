/* Content for µLearn CHN — kept separate from markup so it is easy to update each year. */

export const LINKS = {
  register: "https://app.mulearn.org/register",
  learningCircles: "https://app.mulearn.org/learning-circle",
  discord: "https://discord.gg/DfnDfBhGha",
  email: "mailto:gtechmulearncec@gmail.com",
  emailText: "gtechmulearncec@gmail.com",
  linkedin: "https://www.linkedin.com/company/gtech-mulearn-cec/",
  instagram: "https://www.instagram.com/mulearn.chn",
  mulearn: "https://mulearn.org/",
  announcements: "https://mulearn.org/announcements",
  gallery: "https://mulearn.org/gallery",
  branding: "https://online.fliphtml5.com/egsqr/tlgc/",
};

export const STATS = [
  { value: 1090, suffix: "+", label: "Students enrolled" },
  { value: 643350, suffix: "+", label: "Karma mined", accent: true },
  { value: 4, suffix: "+", label: "Interest groups" },
  { value: 7, prefix: "#", label: "Campus rank" },
];

/* Highlights from "Our Event Journey" */
export const JOURNEY = [
  {
    month: "Jun – Jul",
    days: "30 days",
    title: "Level Up in 30",
    format: "Mentored sprint",
    duration: "30 days",
    text: "A 30-day mentorship-driven sprint where students follow structured learning paths and build portfolio-ready projects within their chosen Interest Groups.",
  },
  {
    month: "Apr",
    days: "6 – 7",
    title: "Build with AI",
    format: "Hackathon",
    duration: "16 hours",
    text: "A 16-hour AI-powered hackathon where students collaborate, innovate, and transform ideas into real-world solutions.",
  },
  {
    month: "Feb",
    days: "26",
    title: "Behind the Hack",
    format: "Workshop",
    duration: "1 day",
    text: "A hands-on learning experience that introduces students to cybersecurity fundamentals, ethical hacking, and modern security practices.",
  },
  {
    month: "Feb",
    days: "1 – 28",
    title: "µment 2.0",
    format: "Mentorship programme",
    duration: "28 days",
    text: "A month-long learning journey where students develop practical skills, work on meaningful projects, and receive guidance from experienced mentors.",
  },
  {
    month: "Aug",
    days: "4 – 13",
    title: "Build-a-Struct",
    format: "Bootcamp",
    duration: "1 week",
    text: "A week-long hands-on bootcamp where students learn core Data Structures and Algorithms in C through guided sessions and practical problem-solving.",
  },
];

/* Event archive, grouped by academic year. `sort` is an ISO date used for ordering. */
export const ARCHIVE = {
  "2025–26": [
    { date: "Apr 6 – 7", sort: "2026-04-06", title: "Build with AI", text: "A 16-hour intercollege sprint focused on building innovative AI solutions using Google Cloud and the Gemini API." },
    { date: "Mar 31", sort: "2026-03-31", title: "Build with AI: Gemini-powered YouTube Summarizer", text: "A technical workshop where students used the Google Gemini API to build and deploy a video summarization tool." },
    { date: "Feb 7 – 8", sort: "2026-02-07", title: "Exodia 3.0", text: "An all-Kerala technical gala featuring intensive tracks in Robotics, Computer Vision, and Data Science with Machine Learning." },
    { date: "Jan 31", sort: "2026-01-31", title: "From Campus to Career", text: "An online career guidance session with Career Coach Remya Girija on professional development and industry expectations." },
    { date: "Jan 15", sort: "2026-01-15", title: "Notion Flow", text: "A productivity workshop on workspace organization, task management, and academic workflows." },
    { date: "Jan 8", sort: "2026-01-08", title: "Blind Coding", text: "A pre-event for Exodia 3.0 where students tested their logical thinking by coding without screens." },
    { date: "Dec 10 – 20", sort: "2025-12-10", title: "Keyboard Mastery 3.0", text: "A 10-day online typing challenge aimed at improving typing speed, accuracy, and professional discipline." },
    { date: "Aug 4 – 13", sort: "2025-08-04", title: "Build a Struct", text: "An intensive workshop on Data Structures for students to strengthen CS foundations through hands-on tasks." },
    { date: "Jul 30", sort: "2025-07-30", title: "Intro to IoT Essentials", text: "A beginner-friendly session covering smart device communication, hardware interaction, and real-world IoT applications." },
    { date: "Jul 30", sort: "2025-07-30", title: "Basics of Wireframing", text: "A UI/UX session introducing the fundamentals of interface design and digital layout structuring." },
    { date: "Jul 14", sort: "2025-07-14", title: "Website Redesign", text: "A web development workshop introducing core front-end concepts and redesign methodologies through practical tasks." },
  ],
  "2024–25": [
    { date: "Mar 19", sort: "2025-03-19", title: "Salt Mango Tree", text: "A casual Discord talk session exploring failure vs. regret to promote open communication and community connection." },
    { date: "Mar 16", sort: "2025-03-16", title: "Make(Me)²", text: "An online meme-making competition themed around Women's Day, celebrating collaborative creativity." },
    { date: "Mar 15", sort: "2025-03-15", title: "Change the Look", text: "A creative poster design challenge that encouraged students to transform existing designs into impactful visual narratives." },
    { date: "Mar 5 – 6", sort: "2025-03-05", title: "Introduction to Figma", text: "A two-day offline workshop where participants gained practical design skills through hands-on Figma exercises." },
    { date: "Feb 15 – 16", sort: "2025-02-15", title: "Exodia'25", text: "An all-Kerala technical gala featuring specialized stacks in Cyber Security, Chatbot Mastery, and Robotics with IoT." },
    { date: "Feb 6", sort: "2025-02-06", title: "Verbattle", text: "A debate competition centered on women's empowerment and inclusive dialogue, held as a precursor to Exodia'25." },
    { date: "Jan 29 – 30", sort: "2025-01-29", title: "Karma Fest", text: "A two-day event introducing students to the µLearn Discord community and the importance of earning Karma Points." },
    { date: "Jan 28", sort: "2025-01-28", title: "Sherlock'D", text: "An online analytical competition where participants solved encryption, audio, and cryptographic challenges." },
    { date: "Jan 9", sort: "2025-01-09", title: "Notion 101", text: "A hands-on session introducing productivity and workspace management with Notion." },
  ],
  "2023–24": [
    { date: "Dec 17", sort: "2024-12-17", title: "Exclusive Weekly Twitch", text: "A year-end session where Abhaynath T G shared lessons on resilience and self-belief to foster a growth-oriented mindset." },
    { date: "Oct 16", sort: "2024-10-16", title: "Salt Mango Tree", text: "A language enhancement workshop on professional communication, expressive writing, and vocabulary." },
    { date: "Sep 10 – 12", sort: "2024-09-10", title: "TechForge 2.0", text: "A three-day initiative launching a year-long peer-learning ecosystem focused on UI/UX, Arduino, and Flutter." },
    { date: "Aug 29", sort: "2024-08-29", title: "Keyboard Mastery Level 2", text: "An offline typing competition that challenged students to build speed and accuracy through progressively difficult rounds." },
    { date: "Jun 18", sort: "2024-06-18", title: "Exclusive Weekly Twitch", text: "An online talk by P Sathya Narayan sharing real-world professional insights and motivational stories." },
    { date: "Apr 10 – 30", sort: "2024-04-10", title: "Keyboard Mastery 2.0", text: "A 20-day online program bridging basic typing familiarity and professional-level proficiency." },
    { date: "Feb 17 – 18", sort: "2024-02-17", title: "Exodia'24", text: "An all-Kerala technical event with expert-led workshops on AI, Cybersecurity, and IoT." },
  ],
  "2022–23": [
    { date: "Sep 13 – 15", sort: "2022-09-13", title: "Postman Student Expert", text: "A guided training program on API testing, documentation, scripting, and collection management, preparing students for the Postman Student Expert certification." },
  ],
};

/* Event format, used for the coloured chips in the archive table. */
export const EVENT_TYPES = {
  "Build with AI": "Hackathon",
  "Build with AI: Gemini-powered YouTube Summarizer": "Workshop",
  "Exodia 3.0": "Tech fest",
  "Exodia'25": "Tech fest",
  "Exodia'24": "Tech fest",
  "From Campus to Career": "Talk",
  "Exclusive Weekly Twitch": "Talk",
  "Salt Mango Tree": "Session",
  "Notion Flow": "Workshop",
  "Notion 101": "Workshop",
  "Intro to IoT Essentials": "Workshop",
  "Basics of Wireframing": "Workshop",
  "Website Redesign": "Workshop",
  "Introduction to Figma": "Workshop",
  "Blind Coding": "Contest",
  "Make(Me)²": "Contest",
  "Change the Look": "Contest",
  "Verbattle": "Contest",
  "Sherlock'D": "Contest",
  "Keyboard Mastery Level 2": "Contest",
  "Keyboard Mastery 3.0": "Programme",
  "Keyboard Mastery 2.0": "Programme",
  "TechForge 2.0": "Programme",
  "Postman Student Expert": "Programme",
  "Build a Struct": "Bootcamp",
  "Karma Fest": "Community",
};

export const INTEREST_GROUPS = [
  { name: "Artificial Intelligence", lead: "Adhi Narayan" },
  { name: "UI/UX Design", lead: "Al Ameen" },
  { name: "Cyber Security", lead: "Amal S" },
  { name: "Web Development", lead: "Abhiram J" },
  { name: "Entrepreneurship", lead: "Swathy J" },
];

export const TEAM = [
  {
    group: "Leadership",
    people: [
      { name: "Geetha S", role: "Lead Enabler" },
      { name: "Nithin Jayakumar", role: "Campus Lead" },
      { name: "Divyalakshmi", role: "Campus Co-Lead" },
    ],
  },
  {
    group: "Leads",
    people: [
      { name: "Govind J S", role: "Creative Lead" },
      { name: "Hanin C K", role: "Operation Lead" },
      { name: "Amanul Farhan", role: "Technical Lead" },
      { name: "Pavithra A", role: "Media Lead" },
      { name: "Albin Thomas", role: "Content Lead" },
    ],
  },
  {
    group: "Interest group leads",
    people: [
      { name: "Adhi Narayan", role: "AI" },
      { name: "Al Ameen", role: "UI/UX" },
      { name: "Amal S", role: "Cyber Security" },
      { name: "Abhiram J", role: "Web" },
      { name: "Swathy J", role: "Entrepreneurship" },
    ],
  },
  {
    group: "Core team",
    people: [
      { name: "Melwin Shibu Mathew", role: "Operations" },
      { name: "Sara Shaji", role: "Operations" },
      { name: "Afsal S", role: "Design" },
      { name: "Vismaya Gawri Krishnan", role: "Design" },
      { name: "Karthika S", role: "Content" },
      { name: "Sreelakshmi M", role: "Content" },
      { name: "Parvathy Vinayan", role: "Media" },
      { name: "Brijith K Reji", role: "Media" },
    ],
  },
];

/* ------------------------------------------------------------------
   Images, all hosted on the existing µLearn CHN image CDN.
   Cloudinary URLs are resized on the fly by `img()` in main.js.
   ------------------------------------------------------------------ */
const CLD = "https://res.cloudinary.com/dsyus516r/image/upload/";
const CLD2 = "https://res.cloudinary.com/dctmapb3t/image/upload/";

/* Team photos, keyed by name */
export const PHOTOS = {
  "Geetha S": CLD + "v1793550435/geetha_hebv4k.jpg",
  "Nithin Jayakumar": CLD + "v1781766715/Nithin_img_b8crqm.jpg",
  "Divyalakshmi": CLD2 + "v1780429835/actjsiebxpl15u8comlk.jpg",
  "Govind J S": "https://cdn.jsdelivr.net/gh/AmanulFarhan/mulearn_images@main/webp/govind.webp",
  "Hanin C K": CLD2 + "v1780430510/ltdhr7by7zuyz8taisas.jpg",
  "Amanul Farhan": CLD + "v1793550435/amanul_ufuaq7.jpg",
  "Pavithra A": CLD2 + "v1780432964/vwzgqokh1xwovxug33yi.jpg",
  "Albin Thomas": CLD2 + "v1780435906/mgj3ua8d0nl84tckwetz.jpg",
  "Melwin Shibu Mathew": CLD2 + "v1780433167/go6lezj2tthikngc5dtc.jpg",
  "Sara Shaji": CLD2 + "v1780433240/zraolggh2kl8ttmvh8ux.jpg",
  "Afsal S": CLD2 + "v1780434705/fsruobasrered4p7is3y.png",
  "Vismaya Gawri Krishnan": CLD + "v1781766717/Vismaya_img_e9nuzo.jpg",
  "Karthika S": CLD + "v1781770029/Karthika_img_gpvjgu.jpg",
  "Sreelakshmi M": CLD + "v1783771656/Sreelakshmi_M..jpg_vxr1ex.jpg",
  "Parvathy Vinayan": CLD2 + "v1780434014/xptbanvr2czx5c8sdrjp.jpg",
  "Brijith K Reji": CLD2 + "v1780434113/usruz9vlrtmgihvjya3r.jpg",
  "Adhi Narayan": CLD2 + "v1780434320/naxj9c3neuzsgwojdomq.jpg",
  "Al Ameen": CLD2 + "v1780434391/zcfztnktvprpwxeansph.jpg",
  "Amal S": CLD2 + "v1780434577/j4kv1hxwremkcpqqp6ok.jpg",
  "Abhiram J": CLD + "v1781770581/Abhiram_img_nmhnad.jpg",
  "Swathy J": CLD + "v1781777411/Swathy_J_bhxuww.jpg",
};

/* Event posters, keyed by title (or title@date when a title repeats) */
export const POSTERS = {
  "Level Up in 30": CLD + "v1781766719/whtsp_level-up_tbnepm.png",
  "Build with AI": CLD + "v1781766717/aihackathon-1_hi4a32.png",
  "Behind the Hack": CLD + "v1781766749/bthwhatsappp_ajgwbu.png",
  "µment 2.0": CLD + "v1781767092/mument_insta_1_zrzods.png",
  "Build-a-Struct": CLD + "v1781766719/Build_a_Struct_img_hdwyy3.jpg",
  "Build a Struct": CLD + "v1781766719/Build_a_Struct_img_hdwyy3.jpg",
  "Postman Student Expert": CLD + "v1781791520/Postman_Student_Expert_wpxkma.jpg",
  "TechForge 2.0": CLD + "v1781794985/TechForge_2.0_ftt9mx.jpg",
  "Salt Mango Tree@2024-10-16": CLD + "v1781794876/Salt_Mango_Tree_duuxa5.jpg",
  "Keyboard Mastery Level 2": CLD + "v1781794761/Keyboard_Mastery_Level_2_pcysox.jpg",
  "Keyboard Mastery 2.0": CLD + "v1781794632/Keyboard_Mastery_2.0_tjqt8n.jpg",
  "Exodia'24": CLD + "v1781799196/Exodia_r3sldl.jpg",
  "Exclusive Weekly Twitch@2024-06-18": CLD + "v1781796937/Exclusive_Weekly_Twitch_2_icomgi.jpg",
  "Exclusive Weekly Twitch@2024-12-17": CLD + "v1781794002/Exclusive_Weekly_Twitch_lnzeh3.jpg",
  "Change the Look": CLD + "v1781809617/Change_the_Look_vgf0t5.jpg",
  "Exodia'25": CLD + "v1781809616/Exodia_25_a4cgdd.jpg",
  "Introduction to Figma": CLD + "v1781809621/Introduction_to_Figma_gpxmsf.jpg",
  "Karma Fest": CLD + "v1781809616/Karma_Fest_wzsgaf.jpg",
  "Make(Me)²": CLD + "v1781809618/Make_Me_2_ogvrzj.jpg",
  "Notion 101": CLD + "v1781809615/Notion_101_iiae8y.jpg",
  "Salt Mango Tree@2025-03-19": CLD + "v1781809616/Salt_Mango_Tree_2_em543t.jpg",
  "Sherlock'D": CLD + "v1781856739/Sherlock_D_bsqpjk.jpg",
  "Verbattle": CLD + "v1781856748/Verbattle_sr0eoa.jpg",
  "Intro to IoT Essentials": CLD + "v1782328440/Intro_to_IOT_Essentials_zbk6r7.jpg",
  "Notion Flow": CLD + "v1782328439/Notion_Flow_sduhbn.jpg",
  "From Campus to Career": CLD + "v1782328439/From_Campus_to_Career_g3nh1x.jpg",
  "Exodia 3.0": CLD + "v1782328438/WhatsApp_Image_2026-06-25_at_00.14.58_qjgekr.jpg",
  "Basics of Wireframing": CLD + "v1782328439/WhatsApp_Image_2026-06-25_at_00.18.50_1_pebjvz.jpg",
  "Keyboard Mastery 3.0": CLD + "v1782328438/WhatsApp_Image_2026-06-25_at_00.16.26_ze0ajs.jpg",
  "Blind Coding": CLD + "v1782328438/WhatsApp_Image_2026-06-25_at_00.17.41_n9v1bk.jpg",
  "Website Redesign": CLD + "v1782328439/WhatsApp_Image_2026-06-25_at_00.18.50_jghinj.jpg",
  "Build with AI: Gemini-powered YouTube Summarizer": CLD + "v1782328439/WhatsApp_Image_2026-06-25_at_00.15.40_zhmzvb.jpg",
};

/* Campus photos ("Memories") */
export const COMMUNITY_PHOTO = CLD + "v1793550439/IMG_5086_tm6kwh.jpg";
export const GALLERY = [
  { src: CLD + "v1793550439/IMG_5086_tm6kwh.jpg", alt: "The µLearn CHN community gathered in front of College of Engineering Chengannur", w: 3, h: 2 },
  { src: CLD + "v1793550438/IMG_9798_mvknx7.jpg", alt: "A speaker presenting to students in a lab session", w: 9, h: 16 },
  { src: CLD + "v1793550439/IMG_7789_qyh10e.jpg", alt: "Students listening to a session in the computer lab", w: 4, h: 3 },
  { src: CLD + "v1793550438/IMG_7834_xrr7b7.jpg", alt: "Students working at their computers during a workshop", w: 4, h: 3 },
  { src: CLD + "v1793550438/IMG_7844_lclzmf.jpg", alt: "A workshop in progress with the presenter at the front of the lab", w: 4, h: 3 },
  { src: CLD + "v1793550438/IMG_9803_ixchge.jpg", alt: "A mentor guiding students through a hands-on session", w: 16, h: 9 },
];
