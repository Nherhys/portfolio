window.appliquerProfil = function (lang) {
  const profil = window.PROFIL || {};
  const lire = chemin => chemin.split(".").reduce((o, k) => (o == null ? undefined : o[k]), profil);
  const traduire = v => (v && typeof v === "object" && ("fr" in v || "en" in v)) ? (v[lang] ?? v.fr) : v;

  document.querySelectorAll("[data-p]").forEach(el => {
    const v = traduire(lire(el.dataset.p));
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-p-href]").forEach(el => {
    const v = traduire(lire(el.dataset.pHref));
    if (v != null) el.setAttribute("href", v === "#" ? "#" : (el.dataset.pPrefix || "") + v);
  });
};
