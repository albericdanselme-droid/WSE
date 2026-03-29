# WSE — Backlog & Tâches en cours

> Maintenu à jour automatiquement. Cocher [x] au fur et à mesure.

---

## Sprint actuel — 28/03/2026

- [x] Fix bug marquee : espace vide avant le loop → restructurer en deux `.marquee-set`
- [x] Supprimer "Lun–Ven 9h–18h" du bloc contact
- [x] Supprimer "Type de projet" du formulaire — champ téléphone passe pleine largeur
- [x] Intro : slogan "Ensemble, définissons votre future présence digitale." en Playfair italic
- [x] Transition crossfade intro→hero : fade-out 1.6s, hero débute à 4.4s (pendant le fade)
- [x] 4 améliorations premium : font-feature-settings, nav underline, CTA shimmer, bento spotlight
- [x] Intégrer workflow Full-Stack Engineer dans `mode-equipe.mdc`
- [x] Créer `docs/lessons.md`

## Sprint — Logo & Animation (28/03/2026)

- [x] Logo SVG géométrique cristallin (13 facettes, viewBox 0 0 40 48, `currentColor`)
- [x] #flyLogo : `position:fixed` centré, animation d'entrée `flyIn`, fly FLIP vers nav
- [x] Retirer `ci-row--wse` de l'intro — logo remplace texte "WSE"
- [x] `#navLogoMark` : opacity:0 → 1 quand le logo atterrit (JS setTimeout 950ms)
- [x] `triggerLogoFly()` : FLIP via `getBoundingClientRect` + translate + scale CSS transition
- [x] Timings CI accélérés : m1=0.38s, m2=0.53s, m3=0.68s, divider=1.0s, slogan=1.2s
- [x] Hero delays resserrés : l1=3.0s, l2=3.15s…l6=3.8s, marquee=4.0s
- [x] Fix texte coupé : `.serif-line { padding-bottom: 0.14em }` (descenders Playfair)
- [x] Ratio hero-sub : 0.8rem → 0.92rem, color: var(--mid) au lieu de var(--muted)
- [x] Contraste textes : --muted #6b6880→#8a85a0 / --mid #9490a8→#b0acbf
- [x] Suppression ancienne règle `.logo-mark` gradient (doublon CSS)

---

## Sprint — Premium Minimaliste (28/03/2026)

- [x] Logo WSE lettermark SVG (W·S·E, stroke-based, fill=none, vector-effect non-scaling)
- [x] Logo injecté dans nav + flyLogo + footer (3 instances cohérentes)
- [x] Retrait `logo-name` "WSE" du nav (SVG est le wordmark complet)
- [x] Animation intro : `ciWordUp` translateY(22px)+opacity, textes blanc #fff
- [x] `.ci-word--by` slogan : rgba(255,255,255,0.85) (était violet-teinté)
- [x] `.ci-mask` overflow:visible (opacity gère l'invisibilité pré-animation)
- [x] slideUp keyframe : opacity:0→1 (empêche ghost avec overflow:visible sur serif-line)
- [x] 'g' de digitale corrigé : `.serif-line { overflow:visible; padding-bottom:0.3em }`
- [x] Suppression totale glow : heroGlow, heroMouseGlow (HTML + CSS + JS lerp loop)
- [x] Fond grain film : body::before feTurbulence 240px, opacity 3.8%, mix-blend-mode overlay
- [x] --black #07070f → #0a0a0c (neutre pur, sans teinte violette)
- [x] hero::before : radial-gradient mask retiré, opacité grille 0.03 (était 0.04)

## En attente / Prochaine itération

- [ ] URL domaine définitive → mettre à jour meta OG
- [ ] Liens réseaux sociaux (LinkedIn, Instagram)
- [ ] Formulaire de contact backend (Formspree ou EmailJS)
- [ ] Photos réelles des réalisations (remplacer wireframes)
- [ ] Menu mobile dédié (panneau slide-in pour < 768px)
