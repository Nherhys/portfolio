# Portfolio

Site personnel bilingue (FR / EN), statique, sans framework ni étape de build : HTML5, CSS3 et JavaScript vanilla.

## Arborescence

```
portfolio/
├── index.html            # Structure et textes français
├── style.css             # Mise en page, responsive, thème
├── script.js             # Bascule FR/EN (textes anglais dans l'objet EN), menu mobile, animations
├── favicon.svg
├── README.md
├── .gitignore
├── donnees/
│   ├── profil.js         # Données personnelles ANONYMES (publiées)
│   └── remplir.js        # Injecte les données du profil dans les pages
├── prive/                # IGNORÉ PAR GIT tant que la ligne « prive/ » est dans .gitignore
│   ├── profil.js         # Données personnelles RÉELLES
│   ├── cv-fr.pdf         # CV réels
│   └── cv-en.pdf
├── cv/
│   ├── cv-fr.html        # Sources des CV (A4, 1 page), remplies avec le même profil
│   └── cv-en.html
└── assets/
    ├── cv-fr.pdf         # CV anonymes (téléchargés sur le site public)
    └── cv-en.pdf
```

## Principe : une seule source pour les données personnelles

Nom, coordonnées, liens, employeur, client, écoles et ville ne sont écrits **nulle part** dans le HTML.
Les pages contiennent des balises `data-p="..."` remplies au chargement par `donnees/remplir.js` :

1. `donnees/profil.js` (anonyme) est toujours chargé ;
2. `prive/profil.js` (réel) est chargé ensuite **s'il existe** et remplace les valeurs anonymes.

| Où                           | `prive/` présent ? | Résultat                 |
| ---------------------------- | ------------------ | ------------------------ |
| Sur ton PC (VS 2026)         | Oui                | Site et CV avec tes vraies données |
| Sur GitHub Pages aujourd'hui | Non (ignoré)       | Site et CV anonymes      |

Sur le site public, la console du navigateur affiche une erreur 404 pour `prive/profil.js` : c'est normal et sans effet.

## Modifier une donnée personnelle

- Valeur réelle : `prive/profil.js`.
- Valeur anonyme : `donnees/profil.js`.
- Garder les **mêmes clés** dans les deux fichiers. Une valeur peut être un texte simple ou un couple `{ fr: "...", en: "..." }`.
- Pour afficher une donnée ailleurs : `<span data-p="cle"></span>` ; pour un lien : `<a href="#" data-p-href="linkedin.url">`.

## Régénérer les PDF des CV

1. Ouvrir `cv/cv-fr.html` (ou `cv-en.html`) dans Chrome **sur ton PC** : il affiche tes vraies données.
2. Imprimer → « Enregistrer au format PDF », format A4, marges « Aucune », « Graphiques d'arrière-plan » coché.
3. Enregistrer dans `prive/` (`cv-fr.pdf`, `cv-en.pdf`).

Pour régénérer les versions anonymes, renommer temporairement `prive/` (ex. `_prive/`), imprimer, enregistrer dans `assets/`, puis remettre le nom.

## Le jour de la mise en ligne « réelle »

1. Ouvrir `.gitignore` et **supprimer la ligne `prive/`**.
2. Commit + push. C'est tout : le site et les boutons de CV basculent automatiquement sur tes vraies données.

Pour revenir en mode anonyme : remettre la ligne, puis `git rm -r --cached prive` et commit + push.
Attention : une fois poussées, les données réelles restent dans l'historique Git du dépôt public.

## Personnaliser le contenu

- Rechercher `[À COMPLÉTER` dans `index.html` et `script.js` (projets, liens de démo).
- Liens de projets : remplacer `href="#"` par l'URL réelle.
- Couleur d'accentuation : variable `--accent` dans `style.css` (`#1e3a5f` bleu marine ; vert sapin : `#1f4d3a`).

## Mise en ligne sur GitHub Pages (gratuit si le dépôt est public)

1. Envoyer les fichiers à la **racine** du dépôt (`index.html` directement visible dans l'onglet Code).
2. **Settings → Pages** → Source : *Deploy from a branch*, branche `main`, dossier `/ (root)` → **Save**.
3. Suivre le déploiement dans l'onglet **Actions** ; le site est à `https://<identifiant>.github.io/<nom-du-depot>/`.

Depuis VS 2026 : commit puis push vers `main` ; le site se met à jour en une à deux minutes.
