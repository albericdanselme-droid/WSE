# WSE — Lessons Learned

> Format strict : "Quand je fais [X], je ne dois pas faire [Y], je dois implémenter [Z]."

---

## Logo SVG inline — `currentColor` vs fill codé en dur
Quand je crée un logo en plusieurs couleurs (blanc / violet), je ne dois pas dupliquer le SVG avec des `fill` codés. Je dois utiliser `fill="currentColor"` et contrôler via `color` CSS du conteneur. Ex: `.footer-logo .logo-mark .logo-geo { color: var(--accent2) }`.

## FLIP animation — reflow obligatoire entre classe et transform
Quand je fais voler un élément (FLIP), je dois : (1) ajouter la classe avec `transition`, (2) forcer un reflow via `getBoundingClientRect()`, (3) PUIS setter `style.transform`. Sans le reflow forcé, le browser batche les deux opérations et la transition ne s'anime pas.

## SVG overflow:hidden + descenders — la solution correcte
Quand je mets `overflow:hidden` sur un conteneur d'animation de texte (mask reveal), je ne dois pas juste augmenter `padding-bottom`. Je dois AUSSI changer l'animation pour inclure `opacity:0` dans le state `from`. Ainsi je peux ensuite mettre `overflow:visible` sur les éléments serif sans créer de ghost text visible pré-animation.

## vector-effect:non-scaling-stroke — essentiel pour les logos SVG multi-taille
Quand je veux un stroke SVG constant en pixels (ex: 1.5px) quelle que soit la taille d'affichage, je dois utiliser `vector-effect: non-scaling-stroke` sur les éléments (via CSS). Je peux ensuite surcharger le `stroke-width` par contexte CSS (nav: 1.2px, flyLogo: 1.8px). Sans ça, le trait s'écrase à petite taille et devient épais à grande taille.

## Suppression glow — vérifier HTML + CSS + JS
Quand je supprime des effets de glow, je dois cibler les 3 couches : (1) les divs dans le HTML, (2) les règles CSS correspondantes, (3) le JS qui les anime (requestAnimationFrame loops). Si j'oublie le JS, le loop rAF tourne en fond inutilement, même sans l'élément DOM cible.

## Doublon CSS — vérifier les règles existantes avant d'ajouter
Quand j'ajoute une nouvelle règle CSS pour remplacer une ancienne (ex: `.logo-mark`), je dois toujours `Grep` le fichier pour détecter les doublons. La cascade CSS donne la priorité à la règle la plus tardive dans le fichier — une ancienne règle en bas du fichier écrase silencieusement la nouvelle en haut.

---

## Marquee infini

**Quand** je veux un marquee CSS infini,
**je ne dois pas** mettre tous les items en enfants directs du `.marquee-track` et animer `-50%` sans isolation — l'algorithme de calcul de `max-content` peut créer un pixel de désalignement entre les deux moitiés.

**Je dois** envelopper les deux sets identiques dans `.marquee-set { flex-shrink: 0 }` et animer le track parent vers `-50%`. Les deux sets sont garantis de même largeur, le loop est parfait.

---

## Intro cinématique — contenu

**Quand** je prépare le contenu de l'intro,
**je ne dois pas** afficher le nom du fondateur — c'est trop personnel et casse le positionnement "agence".

**Je dois** utiliser le nom de l'entreprise + un slogan fort qui positionne l'offre.

---

## Formulaire de contact — complexité

**Quand** je conçois un formulaire de contact B2B TPE/PME,
**je ne dois pas** multiplier les champs de catégorisation (type de projet, secteur, etc.) — le client ne fait pas la différence et abandonne le formulaire.

**Je dois** garder le minimum viable : Nom, Email, Téléphone (optionnel), Message.

---

## `.ci-` namespace collision

**Quand** j'utilise le préfixe `.ci-` pour la Cinematic Intro,
**je ne dois pas** réutiliser ce préfixe pour d'autres composants (ex: icônes de contact).

**Je dois** nommer les icônes contact `.ct-icon` et documenter ce choix dans CONTEXT.md.
