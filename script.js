(() => {
  "use strict";

  const EN = {
    "skip": "Skip to content",
    "menu": "Menu",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",

    "hero.eyebrow": "<span data-p=\"ecole\"></span> engineering graduate · <span data-p=\"ville\"></span>",
    "hero.title": "Software Analyst &amp; Developer · IT Project Coordination",
    "hero.lead": "I work on the insurance side of a bancassurance group's IT at <span data-p=\"employeur\"></span>, bridging business stakeholders and engineering teams. I gather requirements, run feasibility studies, build in C# and COBOL, and coordinate multi-team projects — up to 3,000 person-days as deputy project manager.",
    "hero.cta": "Get in touch",
    "hero.cv": "Download my resume",
    "stats.1": "person-days: largest program supported",
    "stats.2": "engineering degree and full-time hire",
    "stats.3": "daily business–IT liaison",

    "skills.title": "Skills",
    "skills.pm.title": "Project management",
    "skills.pm.1": "Cross-team project leadership",
    "skills.pm.2": "Multi-team coordination",
    "skills.pm.3": "Business–IT liaison",
    "skills.pm.4": "Reporting &amp; consolidation",
    "skills.an.title": "Analysis",
    "skills.an.1": "Requirements gathering",
    "skills.an.2": "Feasibility studies",
    "skills.an.3": "Functional &amp; technical analysis",
    "skills.dev.title": "Development",
    "skills.dev.1": "Distributed &amp; mainframe environments",
    "skills.dev.note": "Also used during my studies: Java, C/C++, JavaScript, React, PHP, MySQL.",
    "skills.lang.title": "Languages:",
    "skills.lang.list": "French, English (fluent, TOEIC 930), German (fluent)",

    "projects.title": "Projects",
    "projects.github": "GitHub [À COMPLÉTER]",
    "projects.demo": "Demo [À COMPLÉTER]",
    "projects.tag.bank": "Bancassurance",
    "projects.tag.omni": "Omnichannel",
    "projects.p1.kicker": "Professional project · 2023",
    "projects.p1.title": "Omnichannel insurance sales journey",
    "projects.p1.desc": "An insurance sales journey for phones, tablets and computers, available on intranet, web and customer apps. I owned the distributed (non-mainframe) layer, working alongside the mainframe lead.",
    "projects.p1.note": "Internal project: code and demo are not public.",
    "projects.p2.kicker": "Academic project · <span data-p=\"ecole\"></span>",
    "projects.p2.desc": "An app designed to help people consume more wisely. [À COMPLÉTER: type of consumption, tech stack, your role]",
    "projects.p3.kicker": "Academic project · <span data-p=\"ecole\"></span>",
    "projects.p3.desc": "Programming a sensor-equipped robot. [À COMPLÉTER: robot's purpose, tech stack, your role]",
    "projects.p4.kicker": "Multidisciplinary team project · <span data-p=\"ecole\"></span>",
    "projects.p4.title": "Connected door indicator",
    "projects.p4.desc": "A remote-controlled device that tells someone knocking whether they may come in or should not disturb. [À COMPLÉTER: tech stack, your role]",

    "exp.title": "Experience",
    "exp.1.date": "Oct 2023 – Present",
    "exp.1.role": "Software Analyst &amp; Developer",
    "exp.1.ctx": "Bancassurance IT, insurance division · Delivery side, working with <span data-p=\"client\"></span> as business owner · Full-time",
    "exp.1.b1": "Lead cross-team projects of around 10 person-days involving several teams.",
    "exp.1.b2": "Deputy project manager on programs of up to 3,000 person-days: coordination, stakeholder communication, status consolidation.",
    "exp.1.b3": "Elicit and document requirements with business stakeholders; run feasibility studies.",
    "exp.1.b4": "Build C# and COBOL applications on cloud and web-farm infrastructure, with CI/CD and in-house frameworks.",
    "exp.2.date": "Apr 2023 – Oct 2023",
    "exp.2.role": "Software Development Intern",
    "exp.2.b1": "Owned the distributed layer of an omnichannel insurance sales journey, then joined regular team work and was hired full-time.",
    "exp.3.role": "Web Developer Intern",
    "exp.3.b1": "Built an application on MantisBT, Jira and Confluence to automate user support and monitor service quality (SAFe Agile).",
    "exp.4.role": "IT Intern, then Part-time IT Assistant",
    "exp.4.b1": "Managed an LDAP directory and set up virtual machines.",
    "edu.title": "Education",
    "edu.1": "Master's-level Engineering Degree — <span data-p=\"ecole\"></span>",
    "edu.1.spec": "IoT, Networks &amp; Services · 2020 – 2023",
    "edu.2": "Preparatory Classes for Engineering Schools (PTSI/PT)",

    "contact.title": "Contact",
    "contact.lead": "Open to IT project management opportunities. Feel free to reach out."
  };

  const TITRES = {
    fr: "Analyste développeuse | Pilotage de projets MOE",
    en: "Software Analyst & Developer | IT Project Coordination"
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const FR = {};
  nodes.forEach(el => { FR[el.dataset.i18n] = el.innerHTML; });
  const DICT = { fr: FR, en: EN };

  const storage = {
    get() { try { return localStorage.getItem("lang"); } catch { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch { /* ignore */ } }
  };

  function setLang(lang) {
    if (!DICT[lang]) lang = "fr";
    nodes.forEach(el => {
      const value = DICT[lang][el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.documentElement.lang = lang;
    if (window.appliquerProfil) window.appliquerProfil(lang);
    const profil = window.PROFIL || {};
    document.title = (profil.nom ? profil.nom + " — " : "") + TITRES[lang];
    const cv = document.getElementById("cv-link");
    if (cv && profil.cv) cv.setAttribute("href", profil.cv[lang]);
    document.querySelectorAll(".lang-switch button").forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
    storage.set(lang);
  }

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  const params = new URLSearchParams(location.search);
  const initial = params.get("lang") || storage.get()
    || ((navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en");
  setLang(initial);

  const toggle = document.querySelector(".menu-toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", e => {
    if (e.target.closest("a")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (a && a.getAttribute("href") === "#") e.preventDefault();
  });

  const sections = document.querySelectorAll("main section[id]");
  const navMap = new Map([...links.querySelectorAll("a")].map(a => [a.getAttribute("href").slice(1), a]));

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navMap.forEach(a => a.classList.remove("active"));
        const a = navMap.get(entry.target.id);
        if (a) a.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));

    const revealTargets = document.querySelectorAll(".card, .tl-item, .stats li");
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealTargets.forEach(el => { el.classList.add("reveal"); reveal.observe(el); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
