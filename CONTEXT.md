# CONTEXT.md — WSE (Web Site Entreprise)

> Fichier de référence unique pour l'IA. Maintenu à jour par le **CONTINUISTE** après chaque TOURNAGE.

---

## 1. L'ENTREPRISE

| Champ | Valeur |
|-------|--------|
| Nom | WSE — Web Site Entreprise |
| Fondateur | Albéric d'Anselme |
| Email | alberic.wse@gmail.com |
| Téléphone | 07 66 49 30 36 |
| URL cible | (à définir) |
| Zone | France |
| Activité | Création de sites web sur-mesure pour TPE/PME et artisans |
| Différenciateurs | Approche en 5 phases, SEO local, conformité RGPD, formation incluse |

**Offre synthétique :**
1. Audit & Stratégie — analyse marché + UX
2. Design & Développement — site responsive
3. Digitalisation client — devis/RDV automatisés
4. SEO Local — Google My Business + Schema.org
5. Sécurité & Conformité — SSL, WAF, RGPD

---

## 2. STACK TECHNIQUE

| Outil | Version | Usage |
|-------|---------|-------|
| HTML5 | — | Structure |
| CSS3 | — | Styles + animations keyframes |
| JavaScript | ES2022 | Interactivité + orchestration intro |
| Font Awesome | 6.5.1 | Icônes |
| Google Fonts | — | Inter + Cormorant Garamond |
| http-server | npx | Serveur local dev |

**Commandes :**
```powershell
# Démarrer le serveur local
npx http-server "C:\Users\alber\Documents\Cursor\Sites\WSE" -p 3000 -c-1 --cors

# Vérifier que le port est actif
netstat -ano | findstr :3000
```

**URL locale :** `http://127.0.0.1:3000/index.html`

---

## 3. DESIGN SYSTEM

**Concept créatif :** "Premium Sombre" — minimalisme éditorial français, typographie contrastée, animations cinématographiques.

### Palette

| Rôle | Hex | Usage |
|------|-----|-------|
| Background | `#07070f` | Base de toutes les sections |
| Surface 1 | `#0c0c1a` | Sections alternées (services, contact) |
| Surface 2 | `#111126` | Hover léger |
| Accent | `#7c6ef8` | Violet — couleur signature WSE |
| Accent clair | `#b69cf6` | Texte accent, gradients |
| Text 1 | `#f4f2ff` | Titres, texte principal |
| Text 2 | `#9490a8` | Sous-titres, texte secondaire |
| Muted | `#6b6880` | Labels, métadonnées |
| Border | `rgba(255,255,255,0.07)` | Séparateurs |

### Typographie

| Rôle | Police | Poids | Taille max |
|------|--------|-------|------------|
| Corps + UI | Inter | 400–800 | — |
| Accent italic | Cormorant Garamond | italic 500–600 | — |
| Hero | Inter | 900 | clamp(3.2rem, 9vw, 8.5rem) |
| Métadonnées | Monospace (Courier) | — | 1.05rem |

**Serif accent** (`serif-em`) : gradient `#b69cf6 → #e879f9 → #f9a8d4` via `background-clip: text`.

### Règles

- Easing premium : `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out fort)
- Text reveal : `overflow:hidden` + `translateY(105%) → 0` sur l'enfant
- `animation-fill-mode: both` obligatoire pour les animations décalées
- Noise texture hero : SVG `fractalNoise` à 4% d'opacité
- Curseur custom : point 12px `#7c6ef8`, `mix-blend-mode: difference`

---

## 4. STRUCTURE DES FICHIERS

```
WSE/
├── index.html          ← Page unique (SPA-like)
├── styles.css          ← Tous les styles (3 fichiers = 1 seul)
├── script.js           ← Logique JS (intro + nav + scroll + form)
├── CONTEXT.md          ← Ce fichier
└── .cursor/
    └── rules/
        ├── mode-equipe.mdc         ← Workflow cinématographique (agent-decided)
        ├── project-context.mdc     ← Contexte court (alwaysApply)
        ├── web-conventions.mdc     ← Conventions HTML/CSS/JS (glob-scoped)
        ├── prompting-strategy.mdc  ← Discipline de prompting (alwaysApply)
        ├── design-role.mdc         ← Inspiration design obligatoire (alwaysApply)
        └── localhost-preview.mdc   ← Vérification localhost obligatoire (alwaysApply)
```

**Sections actives dans `index.html` (ordre) :**
1. Cinematic Intro (`.ci`) — overlay plein écran 6s
2. Nav (`.nav`) — fixe, scroll-aware
3. Hero (`#hero`) — clip-path reveal, marquee, noise texture
4. Services (`#services`) — liste éditoriale numérotée (01→05)
5. Process (`#processus`) — grille 5 colonnes
6. Réalisations (`#realisations`) — grille filtrable 3 colonnes
7. CTA Full (`.cta-full`) — appel à l'action pleine largeur
8. Contact (`#contact`) — 2 colonnes : coordonnées + formulaire
9. Footer + Back-to-top

---

## 5. DÉCISIONS TECHNIQUES VALIDÉES

| Décision | Raison |
|----------|--------|
| Pas de GSAP / librairie animation | Légèreté, 0 dépendance JS externe |
| CSS `animation-fill-mode: both` | Garantit l'état initial avant délai |
| Intro smooth word reveal (pas de scramble) | Plus élégant, remplace le glitch daté |
| `overflow:hidden` + `translateY` pour reveals | Technique clip-path premium (KUROSEI / Awwwards) |
| Noise texture SVG inline | Profondeur tactile sans image externe |
| Marquee CSS pur | Légèreté, pas de JS pour le défilement |
| Custom cursor `mix-blend-mode:difference` | Premium agence web FR, désactivé mobile |
| Délais hero après intro (5.1s+) | Synchronisation avec fade-out intro (3.6s + 0.9s transition) |
| Playfair Display (remplace Cormorant) | Contraste typographique plus marqué, libre Google Fonts |
| Bento Grid CSS — 3 col, bento-tall (row:span 2), bento-wide (col:span 2) | Layout asymétrique vs liste verticale ennuyeuse |
| Sticky Scroll process — CSS `position:sticky` | Titre figé gauche / étapes défilent droite, 0 JS |
| Glassmorphism wireframes réalisations | Remplace gradients criards, cohérent avec dark premium |
| Mouse-following hero glow via rAF lerp (0.06) | Douceur organique sans lib animation |
| `.ct-icon` pour icônes contact | Évite collision avec namespace `.ci-` (intro) |

---

## 6. POINTS EN ATTENTE

| Item | Statut | Action requise |
|------|--------|----------------|
| URL domaine | ⏳ | Définir et mettre à jour meta OG |
| Liens réseaux sociaux (LinkedIn, Instagram) | ⏳ | Remplacer `href="#"` par vraies URLs |
| Formulaire de contact backend | ⏳ | Brancher sur Formspree, EmailJS ou API custom |
| Photos réelles des réalisations | ⏳ | Remplacer les gradients placeholder |
| Google Analytics / tracking | ⏳ | Décider et intégrer |
| .cursor/mcp.json (mémoire persistante) | ⏳ | Installer `superlocalmemory` si sessions longues |

---

## 7. RÈGLES DE DÉVELOPPEMENT

- Langue contenu : **français**
- Langue code/commentaires : **anglais**
- Aucun `style=""` inline (sauf `--g` variable pour les gradients réalisations)
- Aucun `!important` sauf responsive justifié
- Toute modification → vérification localhost avant de clôturer
- Toute décision visuelle → inspiration en ligne (design-role.mdc)
- Toute création UI → MODE ÉQUIPE (mode-equipe.mdc)

---

## 8. WORKFLOW MODE ÉQUIPE

Voir `.cursor/rules/mode-equipe.mdc` pour le détail complet.

**Déclenchement :** toute création ou modification d'une section, composant, ou animation.

**Séquence automatique :**
`DIRECTEUR ARTISTIQUE → PREMIER RÔLE → CASCADEUR → SCRIPT DOCTOR → CONTINUISTE → CRITIQUE DE CANNES`
