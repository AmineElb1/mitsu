# Mitsu · 三つ · 光

Portfolio-/agency-site voor **Mitsu** — *Drie punten, één licht.* React + Vite, met GSAP (scroll- en intro-animaties), Lenis (smooth scroll, gekoppeld aan ScrollTrigger via de GSAP-ticker) en React Bits (geselecteerde componenten, aangepast op de Mitsu-tokens).

> De makers (Amine, Zayd, Haider) en de vier projecten (Holy Prep, Mediahuis, Easy2Move, ATS) zijn echt. **Voorbeeldcontent** (gemarkeerd) zijn alleen de klantcitaten, de kerncijfers, het e-mailadres en het contactformulier. Alles staat in één bestand: `src/content/site.js`.

## Installeren en starten

```bash
npm install
npm run dev       # ontwikkelserver
npm run build     # productiebuild in dist/
npm run preview   # productiebuild lokaal bekijken
```

Vereist Node 18+.

## Projectstructuur

```
public/
  makers/                  ← portretten van Amine, Zayd en Haider
  projects/                ← projectbeelden (Holy Prep, Mediahuis, Easy2Move, ATS)
  logos/                   ← logo's voor de ronde carrousel
src/
  content/site.js          ← ALLE copy, beeld-URL's, bronvermelding, demo-vlaggen
  styles/
    tokens.css             ← design tokens: reference → semantic → component
    base.css               ← reset, typografie, focus-ring, hulpklassen
  lib/
    motion.js              ← gsap + ScrollTrigger + SplitText + CustomEase, merk-easing uit tokens
    tokens.js              ← leest tokens uit de CSS (JS kent nooit eigen waarden)
    SmoothScroll.jsx       ← Lenis ↔ ScrollTrigger via gsap.ticker, cleanup, reduced motion
    theme.jsx              ← licht/donker via data-theme op <html>
  hooks/
    useMotion.js           ← gsap.matchMedia-wrapper: scope, reduced motion, revert bij unmount
    useReducedMotion.js
  components/
    reactbits/             ← Aurora, SplitText, SpotlightCard, Magnet, LogoLoop (zie hieronder)
    ui/                    ← Logo, Button, Photo, Heading, Counter, SectionLabel, DemoBadge, ThemeToggle, Glow, LightFigure
  sections/                ← Header, Hero, Manifest, Idea, Work, Services, Makers, Stories, Quote, Clients, Contact, Footer
```

## Palet en tokens

Zwart, wit en **één** kleur: lichtblauw (`#8EC5F0`). De vier blauwtinten in `tokens.css` (`--ref-blue-100/300/600/900`) zijn dezelfde tint in andere helderheid: 600 is nodig voor leesbare blauwe tekst op wit (4,7:1), 900 voor het diepblauwe vlak (footer/contact, zoals de referentie) en 100 voor lichte vlakken. Er is geen tweede kleur.

`src/styles/tokens.css` heeft drie lagen:

1. **Reference** — ruwe waarden (`--ref-black`, `--ref-white`, `--ref-blue-*`, `--ref-space-24`, …). De enige plek met hex-waarden.
2. **Semantic** — betekenis per thema op `:root`: `--color-bg`, `--color-text`, `--color-accent`, `--color-accent-text`, `--color-emphasis`, `--color-focus`, … Licht is de standaard; `:root[data-theme='dark']` en `[data-surface='ink']` (zwart vlak) zetten dezelfde namen om; `[data-surface='blue']` is het diepblauwe vlak, `[data-surface='paper']` het omgekeerde van donker.
3. **Component** — `--button-height`, `--card-radius`, `--maker-height`, …

Componenten gebruiken alleen laag 2 en 3 (geen hex, geen pixelwaarden; lengtes zijn tokens of `rem`/`em`/`vw`/`%`). Uitzonderingen: **media queries** (CSS kan daar geen `var()` lezen: breakpoints 600 / 900 / 1200 staan als literal, gespiegeld in `--bp-*`) en de `sizes`-hints van afbeeldingen.

Ongewijzigd uit het design system: spacing 4·8·12·16·24·32·48·72, radius 8·14·20·999, easing `cubic-bezier(.2,.8,.2,1)`, motion 150/300/700 ms, maximaal drie knopvarianten (primair = lichtblauw, outline, solid = zwart/wit), pill-vorm met focus-ring. Lettertypen: Fraunces (300 + italic voor één nadrukwoord), Inter Tight, JetBrains Mono, Shippori Mincho (alleen Japans), zelf gehost via `@fontsource`.

### Contrast (WCAG AA)

- Blauwe tekst/lijnen op wit gebruiken `--color-accent-text` (`#2F78B8`, 4,7:1); op zwart/diepblauw is de tekstkleur het lichtblauw zelf. Knoppen: zwarte tekst op lichtblauw (≈ 10:1).
- Gedimde grote titels gebruiken `--color-text-dim` (≥ 3:1). `--color-text-ghost` is uitsluitend decoratief.
- Lichtblauw is op wit te zwak voor een focus-ring. De ring is daarom lichtblauw **plus** een dunne rand in tekstkleur (zie `base.css`).

## Makers en hero

- **Makers:** drie echte portretten (`public/makers/`), in zwart-wit onder lichtblauw (duotone) zodat ze bij het palet passen. Foto's wisselen: vervang het bestand of pas `photos.amine/zayd/haider` aan.
- **Hero:** blauwe lucht met de enorme "mitsu"-wordmark. Achter de letters staan drie **wazige** lichtfiguren (`ui/LightFigure.jsx`) voor Amine, Zayd en Haider; ze blijven bewust onscherp. Wil je een fotoachtergrond, zet dan `hero.image` op een sleutel uit `photos`.

## Content en beeld vervangen

Alles staat in `src/content/site.js`:

- `photos` — per foto: CDN-id, alt-tekst, fotograaf, profiel- en fotopagina, object-position.
- `imageConfig` — de vaste Unsplash-parameters (breedtes, kwaliteit, formaat `webp`, `fit=crop`).
- Secties (`hero`, `manifest`, `idea`, `work`, `services`, `makers`, `stories`, `quote`, `clients`, `contact`, `footer`) met alle Nederlandse copy. Projecten hebben een `status` (bv. "In ontwikkeling"); items met `demo: true` tonen een "Voorbeeld"-badge.
- Eigen beelden (`src: '/pad.jpg'`) en Unsplash-beelden (`id`) staan in dezelfde `photos`-lijst; bronvermelding verschijnt alleen bij beelden met `by`.
- `contact.endpoint` — leeg = demo-modus (er wordt niets verstuurd); vul een URL in en het formulier doet een JSON-`POST`.

De footer genereert de fotoverantwoording automatisch uit `photos`.

## Beweging, toegankelijkheid en prestaties

- **Lenis** start alleen zonder `prefers-reduced-motion` en wordt bij wisselen of unmount vernietigd (`gsap.ticker.remove` + `lenis.destroy()`).
- **GSAP**: alle animaties lopen via `useMotion` (`gsap.matchMedia` met scope) → bij unmount of bij wisselen van voorkeur wordt alles teruggezet (ScrollTriggers, SplitText, tweens).
  Met reduced motion: geen smooth scroll, geen reveals/parallax/pin, de makerscarrousel wordt een swipebare scroll-snap-rij, cijfers staan direct op hun eindwaarde, Aurora is gepauzeerd.
- Semantische HTML (landmarks, kopniveaus, `figure`/`blockquote`, `dl` voor cijfers), skip-link, zichtbare focus, diensten als accordion (`aria-expanded`), formulier met `aria-invalid`/`aria-describedby` en een `aria-live`-status, mobiel menu sluit met Escape.
- Beelden: `loading="lazy"` (hero `eager` + `fetchpriority=high`), `srcset`/`sizes`, vaste parameters, betekenisvolle alt-teksten; bronvermelding bij hover/focus op elk beeld én in de footer.

## React Bits-componenten

| Component | Waar | Aanpassing |
|---|---|---|
| **Aurora** | Zachte gloed in de hero (via `ui/Glow.jsx`) | Ongewijzigd overgenomen; kleurstops uit tokens (lichtblauw ↔ wit), gepauzeerd bij reduced motion |
| **SplitText** | Alle koppen, citaat | Zelfde API/effecten (`rise`/`blur`/`fade`), maar met `children` (behoud van het ene `<em>`), token-easing/-duur, reduced-motion en opruimen |
| **SpotlightCard** | Werk-beelden, testimonials | Gloed in lichtblauw/wit via tokens, ook bij toetsenbordfocus |
| **Magnet** | Primaire knoppen | GSAP `quickTo` met merk-easing; uit bij reduced motion en op touch |
| **LogoLoop** | Doorlopende rij projectlogo's | Pure CSS-lus, pauzeert bij hover/focus, swipebaar bij reduced motion |

React Bits-licentie: MIT + Commons Clause (https://github.com/DavidHDev/react-bits).

## Foto's en bronnen

Eigen beelden (makers, projecten, logo's) zijn aangeleverd door Mitsu. De volgende foto's komen van Unsplash (Unsplash License); de footer genereert dezelfde lijst automatisch uit `photos`.

| Foto | Fotograaf | Gebruik |
|---|---|---|
| [Fuji onder blauwe lucht](https://unsplash.com/photos/mount-fuji-japan-under-a-bright-blue-sky-IliUebaF7wE) | [sun hung](https://unsplash.com/@sunhung) | Manifest-strook |
| [Torii in de mist](https://unsplash.com/photos/wooden-torii-gate-in-a-foggy-forest-setting-VCqbCEUzIYM) | [Sudhan Chitgopkar](https://unsplash.com/@chitgopkar) | Manifest-strook (duotone) |
| [Atelier met raam](https://unsplash.com/photos/artists-studio-with-desk-chair-and-large-window-fybrevHYvWc) | [Clay Banks](https://unsplash.com/@claybanks) | Manifest-strook (duotone) |
| [Berghelling in Aso](https://unsplash.com/photos/lush-green-hillside-under-a-cloudy-sky-d7aTQFj3qhY) | [Gaku Suyama](https://unsplash.com/@gakusuyama) | Manifest-strook |

| [Mos close-up](https://unsplash.com/photos/a-green-moss-covered-hillside-with-small-rocks-67k6x_Vr2_Y) | [engin akyurt](https://unsplash.com/@enginakyurt) | Contact |

Logo's en projectbeelden zijn eigendom van de betreffende klanten en worden hier getoond als referentie.
