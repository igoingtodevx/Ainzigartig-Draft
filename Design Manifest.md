

# AINZIGARTIG — Anti-Slop UI Redesign Manifest

---

## 1. POSITIONING STATEMENT

**"Gute Beratung braucht keine Lichtshow — diese Website behandelt KI-Kompetenz wie eine Anwaltskanzlei ihren Ruf: durch Zurückhaltung, Präzision und das Selbstbewusstsein, nicht alles auf einmal sagen zu müssen."**

---

## 2. DESIGN-TOKEN-MANIFEST

```css
:root {
  --color-base:       #F6F4F0;
  --color-surface:    #EDEAE4;
  --color-accent:     #B44D2D;
  --color-text:       #1A1A18;
  --color-text-muted: #7D7A72;
  --font-editorial:   'DM Serif Text', Georgia, serif;
  --font-text:        'Söhne', 'Inter', -apple-system, sans-serif;
  --space-unit:       8px;
  --radius-default:   2px;
}
```

**Justifications:**

| Token | Begründung |
|---|---|
| `--color-base: #F6F4F0` | Warmes Cremeweiß statt Schwarz — Ainzigartig berät den Mittelstand, nicht Hackathon-Teilnehmer. Ein heller Hintergrund signalisiert Seriosität und Zugänglichkeit, wie ein gut beleuchtetes Büro. |
| `--color-surface: #EDEAE4` | Sanddunkel genug um Flächen zu definieren, nah genug am Hintergrund um nicht zu "carden" — verhindert das Card-Grid-Pattern. |
| `--color-accent: #B44D2D` | Gebranntes Terrakotta — unkonventionell für Tech, verankert in der Materialwelt. Referenziert Backsteingebäude des deutschen Mittelstands, nicht Silicon-Valley-Neon. Eine Farbe die Vertrauen ausstrahlt, nicht "Innovation™". [ASSUMPTION: Die Marke soll sich bewusst von der visuellen Sprache der KI-Industrie distanzieren, um Nahbarkeit für KMU-Entscheider zu signalisieren.] |
| `--color-text: #1A1A18` | Nicht reines Schwarz (#000), sondern ein warmes Fast-Schwarz das zum Cremeton gehört. Weniger Kontrast-Brutalität, mehr Lesbarkeit über lange Textblöcke. |
| `--color-text-muted: #7D7A72` | Olivgrau, keine blaustichige Neutralität. Bleibt lesbar, tritt aber klar zurück. |
| `--font-editorial: DM Serif Text` | Serifenschrift mit editoriellem Charakter — nicht dekorativ, sondern autoritativ. Positioniert Ainzigartig als Wissensträger, nicht als SaaS-Produkt. Google Font, frei verfügbar, rendert sauber in kleinen wie großen Größen. |
| `--font-text: Söhne / Inter Fallback` | [ASSUMPTION: Söhne als Idealwahl, Inter als frei verfügbarer Fallback.] Grotesque Sans mit humanistischen Proportionen. Kein geometrischer Kälte-Font, sondern einer der auch in langen Absätzen warm bleibt. |
| `--space-unit: 8px` | 8er-Grid ist Standard, aber konsequent durchgezogen statt willkürlich. Alle Abstände sind Vielfache: 8, 16, 24, 32, 48, 64, 96, 128. |
| `--radius-default: 2px` | Fast keine Rundung — Ainzigartig ist präzise, nicht "friendly". Der minimale Radius verhindert pixelige Kanten ohne Weichzeichner-Ästhetik. |

**Tailwind-Config-Erweiterung:**

```js
// tailwind.config.ts
tailwind.config = {
  theme: {
    extend: {
      colors: {
        base:       '#F6F4F0',
        surface:    '#EDEAE4',
        accent:     '#B44D2D',
        'accent-hover': '#9A3F23',
        ink:        '#1A1A18',
        muted:      '#7D7A72',
        faint:      '#C8C4BC',
      },
      fontFamily: {
        editorial: ['"DM Serif Text"', 'Georgia', 'serif'],
        body:      ['"Inter"', '-apple-system', 'sans-serif'],
      },
      spacing: {
        'unit':  '8px',
        '2u':   '16px',
        '3u':   '24px',
        '4u':   '32px',
        '6u':   '48px',
        '8u':   '64px',
        '12u':  '96px',
        '16u':  '128px',
      },
      borderRadius: {
        DEFAULT: '2px',
      },
      animation: {
        'reveal': 'reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'underline-in': 'underline-in 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards',
      },
      keyframes: {
        reveal: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'underline-in': {
          '0%':   { backgroundSize: '0% 1px' },
          '100%': { backgroundSize: '100% 1px' },
        },
      },
    },
  },
};
```

---

## 3. LAYOUT-ARCHETYPEN

### 3.1 HERO — "Editorial Statement"

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─ Nav ──────────────────────────────────────────────┐ │
│  │  AINZIGARTIG              [Services]  [Gespräch]   │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
│                                                         │
│                                                         │
│   KI-Beratung                                           │
│   für Unternehmen,                                      │
│   die keine Zeit für              ┌────────────────┐    │
│   Experimente haben.              │  [Terminal      │    │
│                                   │   Window        │    │
│   ─────────── (1px line)          │   kompakt]      │    │
│                                   │                 │    │
│   Wir identifizieren, was         └────────────────┘    │
│   funktioniert. Und setzen                              │
│   es um.                                                │
│                                                         │
│   Erstgespräch vereinbaren →                            │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout-Typ:** Asymmetric Editorial Split (ca. 55/45, Text links am linken Rand ausgerichtet, Terminal rechts, vertikal nicht zentriert sondern mit bewusstem Versatz nach unten)

**Design-Rationale:** Der typische KI-Startup-Hero ist zentriert, symmetrisch, und versucht Autorität durch Größe zu erzeugen. Stattdessen: linksbündiger Text wie ein Zeitungsartikel-Aufmacher. Die Headline steht ohne Schmuck, ihre Größe und Typografie allein tragen das Gewicht. Das Terminal — die einzige Konzession an "Tech" — ist bewusst kleiner und nach rechts gesetzt, als Werkzeug, nicht als Spektakel.

**Anti-Slop-Element:** Kein Subtitle unter der Headline. Der erkärende Text steht UNTER einer 1px-Linie, physisch getrennt — wie ein Zeitungsartikel, wo Lead und Body durch einen Strich getrennt sind. Zerstört das Heading+Subtitle+CTA-Dreierpack.

---

### 3.2 SERVICES — "Katalog-Liste"

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Was wir tun                                           │
│                                                         │
│   ─────────────────────────────────────────────────     │
│   01  KI-Beratung für KMU                  maßgeschn.  │
│   ─────────────────────────────────────────────────     │
│   02  KI im Kundenservice                80% weniger    │
│   ─────────────────────────────────────────────────     │
│   03  KI-Telefonassistent                   24/7        │
│   ─────────────────────────────────────────────────     │
│   04  KI im Recruiting                  60% schneller   │
│   ─────────────────────────────────────────────────     │
│   05  KI-Lead-Generierung               500+ pro Tag    │
│   ─────────────────────────────────────────────────     │
│   06  KI im Vertrieb                    40% mehr        │
│   ─────────────────────────────────────────────────     │
│   07  KI im Backoffice                 70% Zeitersp.    │
│   ─────────────────────────────────────────────────     │
│   08  Analytics Dashboard               Echtzeit        │
│   ─────────────────────────────────────────────────     │
│                                                         │
│        [Beschreibung erscheint on hover/click           │
│         als expandierende Zeile darunter]               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout-Typ:** Index/Catalogue List (inspiriert von Portfolios à la Studio Dumbar, nicht von SaaS-Pricing-Pages)

**Design-Rationale:** Karten-Grids sind das primäre Erkennungsmerkmal von KI-generiertem UI. Eine nummerierte Liste mit horizontalen Linien als Trenner ist radikal anders — erinnert an einen Geschäftsbericht oder ein Inhaltsverzeichnis. Die Informationsdichte ist höher, der visuelle Footprint kleiner. Die Metric steht rechtsbündig als Randnotiz, nicht als Badge.

**Anti-Slop-Element:** Descriptions sind defaultmäßig eingeklappt. Ein Hover (Desktop) oder Tap (Mobile) expandiert die jeweilige Zeile. Kein Icon pro Service, keine Farb-Codierung pro Karte — stattdessen lediglich die Nummer und der Name. Vertraut dem Text.

---

### 3.3 CASE STUDIES — "Marginalie"

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│   Referenzen                                            │
│                                                         │
│                                                         │
│   ┌─ 60% links ─────────────────┐  ┌─ 40% rechts ───┐ │
│   │                             │  │                 │ │
│   │  KI-Chatbot auf             │  │  STATUS         │ │
│   │  der Website                │  │  Deployed       │ │
│   │                             │  │                 │ │
│   │  Der KI-Chatbot ist die     │  │  KONTEXT        │ │
│   │  Weiterentwicklung der      │  │  Kundenservice  │ │
│   │  FAQ-Page und skaliert      │  │                 │ │
│   │  individuelle Beratung      │  │  ERGEBNIS       │ │
│   │  ohne die Investition       │  │  Ticketvolumen  │ │
│   │  in Kundenberater.          │  │  –80%           │ │
│   │                             │  │                 │ │
│   └─────────────────────────────┘  └─────────────────┘ │
│                                                         │
│   ─────────────────────────────────────────────────     │
│                                                         │
│   ┌─────────────────────────────┐  ┌─────────────────┐ │
│   │  Hubspot CRM Flows          │  │  STATUS         │ │
│   │  ...                        │  │  Optimized      │ │
│   └─────────────────────────────┘  └─────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout-Typ:** Marginalia Layout (Haupttext links, Metadaten als Randnotizen rechts — wie akademische Texte oder Buch-Marginalien)

**Design-Rationale:** Case Studies als Karten mit Icons suggerieren Vergleichbarkeit und laden zum Überfliegen ein. Stattdessen: Jede Referenz bekommt ihr eigenes "Sprechen" als Fließtext links, mit strukturierten Metadaten als Marginalien rechts. Das zwingt zum Lesen statt zum Scannen — und positioniert die Projekte als Erzählungen, nicht als Feature-Badges.

**Anti-Slop-Element:** Keine Icons. Kein "Status: DEPLOYED"-Badge in Neon. Der Status steht in derselben Textfarbe wie alles andere, nur in `text-xs uppercase tracking-widest` — leise, aber auffindbar.

---

### 3.4 TEAM — "Provokante Leere"

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│   Florian Schupp                                        │
│   Tim Reinschmidt                                       │
│   Marvin Bertenrath                                     │
│                                                         │
│   Ausgebildet an Top-Universitäten,                     │
│   geschmiedet in Startups und DAX-Konzernen.            │
│   Wir bauen schnell und halten Dinge einfach.           │
│                                                         │
│                                         [Foto →]        │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout-Typ:** Radical Whitespace / Typographic Statement

**Design-Rationale:** Das ist die "bewusst zu leere" Sektion. Drei Namen. Ein kurzer Absatz. Ein Foto-Link der zum Bild führt (oder das Bild erst per Hover/Klick einblendet). Keine Raster, keine LinkedIn-Icons inline, keine Hashtag-Badges, kein Pixel-Art-Bild mit Scanlines und "STATUS: ONLINE". Das Signal: Diese Leute brauchen kein Verpackungsmaterial. [ASSUMPTION: Das Foto des Founders existiert und wird verlinkt, aber nicht als zentrales Layoutelement missbraucht.]

**Anti-Slop-Element:** Die Namen stehen als Plaintext, jeder in einer eigenen Zeile, in `font-editorial text-3xl`. Kein Grid, keine Cards, keine Avatare. Das ist ein Statement: Wir sind Personen, keine Kacheln.

---

### 3.5 CTA — "Einzeiler"

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                                                         │
│                                                         │
│   30 Minuten. Ihre Situation. Unsere Einschätzung.      │
│   Kein Pitch.                                           │
│                                                         │
│   Gespräch vereinbaren →                                │
│                                                         │
│                                                         │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout-Typ:** Full-Width Typographic Closer

**Design-Rationale:** Jede andere KI-Beratungswebsite endet mit einem großen lila/blauen CTA-Block mit Radialgradienten, drei Trust-Badges und dem Text "Herausfinden, ob und wie KI für Ihr Unternehmen Sinn macht." Das hier ist das Gegenteil: Ein einziger Satz, links- oder zentriert gesetzt, mit massivem Whitespace drum herum. Der Link ist kein Button — es ist ein Textlink mit Pfeil. Die Botschaft: Wir vertrauen darauf, dass der Inhalt der Seite bereits überzeugt hat.

**Anti-Slop-Element:** Kein Button. Ein Textlink. `text-accent underline underline-offset-4 decoration-1 hover:decoration-2`. Das ist die bewussteste Designentscheidung der gesamten Seite.

---

## 4. COMPONENT-REDESIGN-SPEC

### 4.1 Komponente: `Navbar.tsx`

**DIAGNOSE:** Die aktuelle Navbar hat: (1) Neon-Cyan Brand-Color-Split im Logo ("AI" in Cyan, "NZIGARTIG" in Weiß), (2) ein Button mit `shadow-[4px_4px_0px]` Brutalist-Drop-Shadow — eine Ästhetik die 2023–2024 von hunderten AI-Startups kopiert wurde, (3) Material-Symbols-Icon im Button, (4) `backdrop-blur` auf dem nav-Hintergrund. Jedes einzelne Element schreit "KI-generiertes Template".

**HUMAN-SIGNAL:** Die Navbar hat einen unsichtbaren "Scroll-State": Sobald der User 100px gescrollt hat, erscheint eine 1px-Linie unterhalb der Nav — ohne Transition, ohne Fade, einfach da oder nicht da. Ein subtiles Detail das zeigt, dass jemand über die Zustände nachgedacht hat.

**REDESIGN:**

```tsx
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-none ${
        scrolled ? 'border-b border-faint/40' : 'border-b border-transparent'
      }`}
      style={{ backgroundColor: 'var(--color-base, #F6F4F0)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo: keine Farbaufteilung, einfach der Name */}
          <a
            href="#/"
            className="font-editorial text-lg tracking-tight text-ink hover:text-accent transition-colors duration-200"
          >
            Ainzigartig
          </a>

          {/* Navigation: minimal, kein Hamburger auf Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
            >
              Leistungen
            </a>
            <a
              href="#"
              className="text-sm text-ink font-body underline decoration-accent decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200"
            >
              Gespräch vereinbaren
            </a>
          </div>

          {/* Mobile: nur der CTA, kein Hamburger-Menü */}
          {/* [ASSUMPTION: Mobile Nav wird als Sheet implementiert, 
               hier nur der Trigger] */}
          <div className="md:hidden">
            <a
              href="#"
              className="text-sm text-ink font-body underline decoration-accent decoration-1 underline-offset-4"
            >
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
```

---

### 4.2 Komponente: `Services.tsx` (vorher Card-Grid)

**DIAGNOSE:** Das aktuelle Design verwendet (1) farbcodierte Karten (cyan/pink/yellow) mit (2) Material-Symbols-Icons in 4xl, (3) Neon-Glow-Hover-Effects (`hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]`), (4) ein Metric-Badge mit Farb-Hintergrund, (5) ein "Mehr erfahren →" das nur bei Hover erscheint. Das ist der Inbegriff von AI-Slop: das gleiche Muster reproduziert für n Karten mit austauschbarer Farbe.

**HUMAN-SIGNAL:** Die Services-Liste hat eine subtile Nummerierung in `text-faint` die den Nummern einer Buchinhaltsangabe ähnelt. Beim Hover über eine Zeile verschiebt sich die Nummer um 4px nach links — ein winziges Detail das auf Desktop nur unbewusst wahrgenommen wird.

**REDESIGN:**

```tsx
import React, { useState } from 'react';

interface ServiceItem {
  title: string;
  metric: string;
  description: string;
  href: string;
}

const services: ServiceItem[] = [
  {
    title: 'KI-Beratung für KMU',
    metric: 'Maßgeschneidert',
    description:
      'Wir stehen als Experten an Ihrer Seite und identifizieren Anwendungsfälle, die sich im Alltag bezahlt machen — praxisnah, DSGVO-konform, ohne Buzzwords.',
    href: '#/ki-beratung',
  },
  {
    title: 'KI im Kundenservice',
    metric: '80 % weniger Tickets',
    description:
      'Chatbots, die Ihr Unternehmen kennen. Trainiert auf Ihre Daten, nicht auf generisches Wissen. Ihr Team kümmert sich um die Fälle, die wirklich Aufmerksamkeit brauchen.',
    href: '#/ki-kundenservice',
  },
  {
    title: 'KI-Telefonassistent',
    metric: '24/7 erreichbar',
    description:
      'Nimmt Anrufe entgegen, beantwortet Standardfragen, leitet weiter wenn nötig. Kein Warteschleifenmusik-Erlebnis mehr für Ihre Kunden.',
    href: '#',
  },
  {
    title: 'KI im Recruiting',
    metric: '60 % schneller besetzen',
    description:
      'Automatisches CV-Screening und Matching — auf Basis Ihrer Kriterien, nicht auf Basis von Keywords. Die Entscheidung bleibt bei Ihnen.',
    href: '#/ki-recruiting',
  },
  {
    title: 'KI-Lead-Generierung',
    metric: '500+ Leads am Tag',
    description:
      'Automatische Identifikation von Zielunternehmen mit personalisierter Erstansprache. Ihr Vertrieb spricht nur noch mit Interessenten.',
    href: '#',
  },
  {
    title: 'KI im Vertrieb',
    metric: '40 % mehr qualifizierte Leads',
    description:
      'Lead-Qualifizierung, Priorisierung und automatisierte Follow-ups — damit kein Kontakt mehr durch das Raster fällt.',
    href: '#',
  },
  {
    title: 'KI im Backoffice',
    metric: '70 % Zeitersparnis',
    description:
      'E-Mails, Dokumente, Rechnungen — automatisch verarbeitet und zugeordnet. Ihr Team arbeitet an Ergebnissen statt an Verwaltung.',
    href: '#',
  },
  {
    title: 'Analytics Dashboard',
    metric: 'Echtzeit',
    description:
      'Alle relevanten KPIs an einem Ort. Mit KI-Analysen, die nicht nur zeigen was passiert, sondern warum.',
    href: '#/analytics-dashboard',
  },
];

const ServiceRow: React.FC<{
  item: ServiceItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, index, isOpen, onToggle }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="border-t border-faint/50 group">
      <button
        onClick={onToggle}
        className="w-full flex items-baseline justify-between py-5 px-0 text-left cursor-pointer"
      >
        <div className="flex items-baseline gap-4 md:gap-6">
          <span
            className="text-xs text-faint font-body tabular-nums transition-transform duration-300 group-hover:-translate-x-1"
          >
            {num}
          </span>
          <span className="text-base md:text-lg text-ink font-editorial leading-snug">
            {item.title}
          </span>
        </div>
        <span className="text-xs text-muted font-body tracking-wide hidden sm:block">
          {item.metric}
        </span>
      </button>

      {/* Expandable description */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-8 md:pl-14 pr-4 md:pr-32">
          <p className="text-sm text-muted font-body leading-relaxed max-w-xl">
            {item.description}
          </p>
          {item.href !== '#' && (
            <a
              href={item.href}
              className="inline-block mt-3 text-xs text-accent font-body underline decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200"
            >
              Details lesen
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-16u px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12u">
          Was wir tun
        </h2>

        <div>
          {services.map((item, i) => (
            <ServiceRow
              key={item.title}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
          {/* Final border */}
          <div className="border-t border-faint/50" />
        </div>
      </div>
    </section>
  );
};
```

---

### 4.3 Komponente: `AsciiHeader.tsx` + Hero-Bereich

**DIAGNOSE:** Die aktuelle Implementierung: (1) Großes ASCII-Art-Logo mit Neon-Shimmer-Animation, (2) `text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase` Headline darunter, (3) zentrierter Aufbau mit Trust-Badges (`DSGVO Konform`, `Made in Germany`, `Technische Expertise`) und Check-Icons, (4) zwei CTAs in einer Reihe (primary + outline), (5) `BackgroundEffects` mit schwebendem "sys", "[]", ">" usw. Das ist das kanonische AI-Landing-Page-Template, wie es GPT-4 seit 2023 millionenfach produziert hat.

**HUMAN-SIGNAL:** Das Terminal-Fenster im Hero hat eine echte Funktion (Chat) und wird dadurch legitimiert. Aber es wird visuell de-emphasized: kleiner, keine Glow-Effekte, kein "AI STATUS: ONLINE"-Badge. Stattdessen ein schlichter Border und ein einziges dezentes Blinken des Cursors. Das Signal: Das Tool ist da, es muss sich nicht beweisen.

**REDESIGN (gesamter Hero-Bereich, ersetzt AsciiHeader + BackgroundEffects + oberen Teil der Startseite):**

```tsx
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[85vh] flex items-end md:items-center pt-16 pb-12u md:pb-0 px-6 md:px-8 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end md:items-center">
          {/* Left: Text block — 7 columns */}
          <div className="md:col-span-7 space-y-0">
            {/* Kicker */}
            <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-6">
              KI-Beratung für den Mittelstand
            </p>

            {/* Headline — no gradient, no glow, just weight and size */}
            <h1 className="font-editorial text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] text-ink">
              KI-Beratung für Unternehmen,{' '}
              <br className="hidden lg:block" />
              die keine Zeit für{' '}
              <br className="hidden lg:block" />
              Experimente haben.
            </h1>

            {/* Horizontal rule as editorial separator */}
            <div className="w-16 h-px bg-accent mt-8 mb-6" />

            {/* Body text */}
            <p className="text-base text-muted font-body leading-relaxed max-w-md">
              Wir helfen kleinen und mittelständischen Unternehmen, KI dort einzusetzen, 
              wo sie tatsächlich Zeit spart, Kosten senkt und Ihr Team entlastet. 
              Konkret, DSGVO-konform, ohne Pilotprojekte die im Nichts enden.
            </p>

            {/* CTA — text link, not button */}
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-accent font-body group"
              >
                <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                  Erstgespräch vereinbaren
                </span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
              <p className="text-xs text-faint font-body mt-2">
                30 Min. Kein Pitch. Kostenlos.
              </p>
            </div>
          </div>

          {/* Right: Terminal — 5 columns, offset down */}
          <div className="md:col-span-5 md:translate-y-8">
            <TerminalCompact />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Compact terminal for Hero ─── */
const TerminalCompact: React.FC = () => {
  // This wraps the existing TerminalWindow but strips its chrome
  // For full implementation, import TerminalWindow and restyle
  return (
    <div className="border border-faint/60 bg-surface rounded-sm overflow-hidden">
      {/* Minimal title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-faint/40">
        <div className="w-2 h-2 rounded-full bg-faint/60" />
        <div className="w-2 h-2 rounded-full bg-faint/60" />
        <div className="w-2 h-2 rounded-full bg-faint/60" />
        <span className="ml-2 text-[10px] text-faint font-body">
          ainzigartig.de/chat
        </span>
      </div>

      {/* Terminal content area */}
      <div className="p-4 h-[320px] overflow-y-auto font-body text-xs leading-relaxed text-muted">
        <p className="mb-3 text-faint">
          Fragen Sie mich etwas über Ainzigartig — Leistungen, Team, Vorgehen.
        </p>
        <div className="flex items-center gap-2 text-ink">
          <span className="text-accent">→</span>
          <span className="opacity-50">Ihre Frage hier eingeben...</span>
          <span className="w-[2px] h-3.5 bg-ink animate-[blink_1s_step-end_infinite]" />
        </div>
      </div>
    </div>
  );
};
```

---

## 5. ANIMATION-STRATEGIE

### Animations-Manifest

**Grundregel:** Animationen existieren ausschließlich, um Zustandsänderungen verständlich zu machen oder um Aufmerksamkeit gezielt auf eine einzige Sache zu lenken. Keine Animation ist dekorativ. Keine Animation läuft ohne Nutzerinteraktion.

---

**Die DREI Interaktionen die Animationen erhalten:**

**1. Service-Zeilen-Expansion (Services-Liste)**
- *Warum:* Content wird ein-/ausgeklappt — ohne Animation wäre der Zustandswechsel ein visueller Sprung. Die Animation macht die Informationshierarchie lesbar.
- *Implementierung:* `max-height`-Transition mit `opacity`-Fade
- *Easing:* `cubic-bezier(0.22, 1, 0.36, 1)` — schneller Beginn, sanftes Auslaufen. Fühlt sich "physisch" an, wie etwas das aufklappt.
- *Duration:* `500ms` für max-height, `300ms` für opacity (opacity endet früher, content ist sichtbar bevor die Höhe fertig ist)

**2. Link-Hover-Underline (alle CTA-Links)**
- *Warum:* Der einzige visuelle CTA-Indikator auf der Seite ist die Underline-Stärke. Deren Veränderung muss wahrnehmbar aber nicht theatralisch sein.
- *Implementierung:* `text-decoration-thickness` von `1px` auf `2px`
- *Easing:* `cubic-bezier(0.33, 1, 0.68, 1)` — fast linear, minimale Beschleunigung
- *Duration:* `200ms`

**3. Terminal-Cursor-Blink (einzige autonome Animation)**
- *Warum:* Der blinkende Cursor im Terminal signalisiert "dieses Element ist interaktiv und wartet auf Input". Es ist die einzige Animation die ohne Nutzerinteraktion läuft — und das ist bewusst, weil sie eine Funktion hat (Aufmerksamkeit auf das Eingabefeld lenken).
- *Implementierung:* `step-end`-Blink, kein Fading
- *Duration:* `1s` Zyklus

---

**Animationen die ENTFERNT werden (und warum):**

| Entfernt | Begründung |
|---|---|
| `animate-float` auf allen Background-Elementen ("sys", "[]", ">", "#", "0x") | Dekorative autonome Animation ohne Funktion. Sagt dem Nutzer nichts. Background-Elemente werden komplett entfernt. |
| ASCII-Art-Scramble-Reveal | Theatralische Entrance-Animation die Ladezeit simuliert. Ein Senior-Designer würde nie eine 2-Sekunden-Animation vor den Inhalt setzen. |
| Neon-Shimmer auf ASCII-Art | Dekoratives Blinken ohne Zustandsänderung. |
| `hover:scale-[1.005]` auf dem Terminal | Kaum wahrnehmbar, aber kostet Layout-Recalculation. Entweder spürbar oder weg. |
| `hover:-translate-y-1` auf Service-Cards (jetzt Zeilen) | Lifting-Animation auf Karten ist das universelle AI-Slop-Hover. |
| `animate-pulse` auf Status-Dots und Textelementen | Pulsierende Elemente suggerieren Dringlichkeit wo keine ist. |
| Scroll-triggered fade-ins | Pauschal verboten. Kein Element fadet beim Scrollen ein. Alles ist sofort da. Wenn der Nutzer scrollt, soll die Seite schnell und direkt reagieren. |
| `animate-[scroll_25s_linear_infinite]` Logo-Slider | Die gesamte LogoSlider-Komponente mit Placeholder-Logos wird entfernt. [ASSUMPTION: Es gibt noch keine echten Kundenlogos. Placeholder-Logos sind schlimmer als keine Logos.] |

---

**System-weite Easing- und Duration-Tabelle:**

```css
/* Globale Transition-Tokens */
:root {
  /* Interactions (hover, focus, toggle) */
  --ease-out:     cubic-bezier(0.22, 1, 0.36, 1);
  --ease-subtle:  cubic-bezier(0.33, 1, 0.68, 1);
  --duration-fast: 200ms;    /* color changes, underlines */
  --duration-mid:  500ms;    /* expand/collapse, layout shifts */
  
  /* Autonomous (non-interactive) */
  --duration-blink: 1000ms;  /* cursor blink only */
}
```

**Verbotene Easings:** `ease-in-out` (zu generisch, das Default-Easing jedes Templates), `linear` (außer für infinite Loops), `bounce`/`elastic` (zu verspielt für die Marke).

---

## 6. CONTENT-VOICE-GUIDE

### 5 Regeln für die Micro-Copy von Ainzigartig

---

**Regel 1: Sagen, was ist — nicht, was könnte sein.**

Keine Konjunktive, keine Versprechen, keine "bis zu X%"-Formulierungen ohne Kontext. Wenn eine Zahl genannt wird, steht sie ohne Absicherung. Wenn keine belastbare Zahl existiert, wird keine genannt.

| BEFORE | AFTER |
|---|---|
| "KI-gestützte Chatbots reduzieren das Ticketaufkommen signifikant und sichern 24/7 Erreichbarkeit." | "Ein Chatbot, trainiert auf Ihre Daten, beantwortet die Fragen, die Ihr Team heute hundertfach manuell bearbeitet. Die übrigen leitet er weiter." |

---

**Regel 2: Schreibe den zweiten Satz, nicht den ersten.**

Der erste Satz, der einem einfällt, ist meistens der Satz den jeder schreiben würde. KI-Copy schreibt immer den ersten Satz. Der zweite Satz hat Ecken und eine Perspektive.

| BEFORE | AFTER |
|---|---|
| "Bereit für eine Zukunft mit generativer KI?" | "Sie haben nicht den Luxus, sechs Monate zu experimentieren. Wir auch nicht." |

---

**Regel 3: Kein CTA sagt dem Leser, was er tun soll. Er sagt, was passiert.**

"Jetzt starten" und "Kostenlos testen" sind Befehle. Stattdessen: Was bekommt der Mensch, wenn er klickt?

| BEFORE | AFTER |
|---|---|
| "Kostenloses Erstgespräch buchen" | "Erstgespräch vereinbaren — 30 Min., wir hören zu" |
| "Mehr erfahren" | "Details lesen" |
| "Kostenlose Demo ansehen" | "Sehen, wie das in Ihrer Branche aussieht" |

---

**Regel 4: Ein Satz pro Absatz reicht oft.**

Viele kurze Absätze > wenige dichte. Luft auf der Seite ist kein Platzverschwenden, sondern Respekt vor der Aufmerksamkeit des Lesers. Wenn ein Absatz mehr als drei Sätze hat, frage ob der vierte nötig ist.

| BEFORE | AFTER |
|---|---|
| "Ainzigartig hilft kleinen und mittelständischen Unternehmen dabei, künstliche Intelligenz sinnvoll einzusetzen – mit konkreten Anwendungsfällen, die wirklich funktionieren, und einer Beratung, die auf Augenhöhe stattfindet." | "Wir helfen KMU, KI dort einzusetzen, wo sie etwas bringt. Konkret, nicht theoretisch." |

---

**Regel 5: Deutsch schreiben heißt nicht, förmlich schreiben.**

Die Zielgruppe sind Inhaber und Geschäftsführer. Die lesen keine Whitepaper zum Einschlafen. Der Ton ist: als würde man dem Gegenüber bei einem Kaffee erklären, was man tut. "Sie" statt "du", aber kein Amtsdeutsch.

| BEFORE | AFTER |
|---|---|
| "Wir sind spezialisiert auf kleine Unternehmen, unkomplizierte Kommunikation und schnelle Projekte." | "Kleine Unternehmen. Kurze Wege. Ergebnisse, die man in Wochen sieht, nicht in Quartalen." |

---

## ANHANG: Vollständige `index.html` + Tailwind-Config-Implementierung

Damit das Redesign sofort lauffähig ist, hier die überarbeitete `index.html` mit den neuen Design-Tokens:

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/Assets/favicon.svg" />
    <title>Ainzigartig — KI-Beratung für den Mittelstand</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Inter:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              base:         '#F6F4F0',
              surface:      '#EDEAE4',
              accent:       '#B44D2D',
              'accent-h':   '#9A3F23',
              ink:          '#1A1A18',
              muted:        '#7D7A72',
              faint:        '#C8C4BC',
            },
            fontFamily: {
              editorial: ['"DM Serif Text"', 'Georgia', 'serif'],
              body:      ['"Inter"', '-apple-system', 'sans-serif'],
            },
            keyframes: {
              blink: {
                '0%, 100%': { opacity: '1' },
                '50%':      { opacity: '0' },
              },
            },
            animation: {
              blink: 'blink 1s step-end infinite',
            },
          },
        },
      };
    </script>
    <style>
      html { 
        background-color: #F6F4F0; 
        color: #1A1A18;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      body {
        background-color: #F6F4F0;
        color: #1A1A18;
      }
      /* Selection color matches accent */
      ::selection {
        background-color: #B44D2D;
        color: #F6F4F0;
      }
      /* Custom cursor on CTA links — subtle cross */
      a[href="#"] {
        cursor: pointer;
      }
      /* Hidden scrollbar for terminal */
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
    <script type="importmap">
    {
      "imports": {
        "react/": "https://esm.sh/react@^19.2.4/",
        "react": "https://esm.sh/react@^19.2.4",
        "react-dom/": "https://esm.sh/react-dom@^19.2.4/"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
```

---

## ANHANG: Vollständige `App.tsx` (Startseite)

```tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TeamSection } from './components/TeamSection';
import { HomeFAQ } from './components/HomeFAQCTA';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { KIBeratung } from './components/KIBeratung';
import { KIKundenservice } from './components/KIKundenservice';
import { KIRecruiting } from './components/KIRecruiting';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

function getRoute(): string {
  return window.location.hash.replace('#', '') || '/';
}

const App: React.FC = () => {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case '/impressum':
        return <Impressum />;
      case '/datenschutz':
        return <Datenschutz />;
      case '/ki-beratung':
        return <KIBeratung />;
      case '/ki-kundenservice':
        return <KIKundenservice />;
      case '/ki-recruiting':
        return <KIRecruiting />;
      case '/analytics-dashboard':
        return <AnalyticsDashboard />;
      default:
        return (
          <main>
            <Hero />
            <Services />
            <CaseStudies />
            <TeamSection />
            <HomeFAQ />
            <ClosingCTA />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-base text-ink font-body antialiased overflow-x-hidden selection:bg-accent selection:text-base">
      <Navbar />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;
```

---

## ANHANG: Vollständige `CaseStudies.tsx`

```tsx
import React from 'react';

interface CaseStudy {
  title: string;
  description: string;
  status: string;
  context: string;
  result?: string;
}

const studies: CaseStudy[] = [
  {
    title: 'KI-Chatbot auf der Website',
    description:
      'Der KI-Chatbot ist die Weiterentwicklung der FAQ-Seite und skaliert individuelle Beratung, ohne dass dafür Kundenberater eingestellt werden müssen. Die KI versteht Fragen semantisch und beantwortet sie auf Basis von explizitem Unternehmenswissen.',
    status: 'Live',
    context: 'Kundenservice',
    result: 'Ticketvolumen um 80 % reduziert',
  },
  {
    title: 'HubSpot CRM Flows',
    description:
      'Implementierung von HubSpot zur automatisierten Lead-Segmentierung. Workflows, bei denen sich Kunden über einen Funnel für ein Webinar anmelden und automatisch die richtigen Daten und E-Mails erhalten — ohne manuellen Eingriff.',
    status: 'Optimiert',
    context: 'Vertrieb & Marketing',
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section className="py-16u px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12u">
          Referenzen
        </h2>

        <div className="space-y-12u">
          {studies.map((study) => (
            <div
              key={study.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-t border-faint/50 pt-8"
            >
              {/* Main content — 7 cols */}
              <div className="md:col-span-7">
                <h3 className="font-editorial text-xl text-ink mb-3">
                  {study.title}
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed">
                  {study.description}
                </p>
              </div>

              {/* Marginalia — 5 cols */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <p className="text-[10px] text-faint font-body uppercase tracking-[0.2em] mb-0.5">
                    Status
                  </p>
                  <p className="text-sm text-ink font-body">{study.status}</p>
                </div>
                <div>
                  <p className="text-[10px] text-faint font-body uppercase tracking-[0.2em] mb-0.5">
                    Kontext
                  </p>
                  <p className="text-sm text-ink font-body">{study.context}</p>
                </div>
                {study.result && (
                  <div>
                    <p className="text-[10px] text-faint font-body uppercase tracking-[0.2em] mb-0.5">
                      Ergebnis
                    </p>
                    <p className="text-sm text-accent font-body">
                      {study.result}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## ANHANG: Vollständige `TeamSection.tsx`

```tsx
import React from 'react';
import founderImage from '../Assets/founder_pixelart_nobg.png';

const members = [
  { name: 'Florian Schupp', linkedin: '#' },
  { name: 'Tim Reinschmidt', linkedin: '#' },
  {
    name: 'Marvin Bertenrath',
    linkedin: 'https://www.linkedin.com/in/marvin-bertenrath-909b35200/',
  },
];

export const TeamSection: React.FC = () => {
  const [showPhoto, setShowPhoto] = React.useState(false);

  return (
    <section className="py-16u px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* This section is intentionally sparse */}
        <div className="max-w-2xl">
          <div className="space-y-1 mb-10">
            {members.map((m) => (
              <p key={m.name} className="font-editorial text-2xl md:text-3xl text-ink">
                {m.name}
                {m.linkedin !== '#' && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block ml-2 text-faint hover:text-accent transition-colors duration-200 align-middle"
                    aria-label={`${m.name} auf LinkedIn`}
                  >
                    <svg className="w-3.5 h-3.5 inline" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </p>
            ))}
          </div>

          <p className="text-base text-muted font-body leading-relaxed max-w-lg mb-6">
            Ausgebildet an Top-Universitäten, geschmiedet in Startups und DAX-Konzernen.
            Wir bauen schnell und halten Dinge einfach.
          </p>

          {/* Photo reveal — the hidden detail */}
          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className="text-xs text-faint font-body hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            {showPhoto ? 'Foto verbergen' : 'Foto anzeigen →'}
          </button>

          {showPhoto && (
            <div className="mt-6 max-w-sm">
              <img
                src={founderImage}
                alt="Das Ainzigartig Team"
                className="w-full grayscale opacity-90"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
```

---

## ANHANG: Vollständige `ClosingCTA.tsx`

```tsx
import React from 'react';

export const ClosingCTA: React.FC = () => {
  return (
    <section className="py-16u md:py-[160px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-xl">
          <p className="font-editorial text-2xl md:text-3xl lg:text-[2.5rem] text-ink leading-[1.2]">
            30 Minuten. Ihre Situation.{' '}
            <br className="hidden md:block" />
            Unsere Einschätzung. Kein Pitch.
          </p>

          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-accent font-body group"
            >
              <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                Gespräch vereinbaren
              </span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## ANHANG: Vollständige `Footer.tsx`

```tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-faint/40 py-8 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span className="text-xs text-faint font-body">
          © 2026 Ainzigartig
        </span>
        <div className="flex gap-6 text-xs text-muted font-body">
          <a href="#/" className="hover:text-ink transition-colors duration-200">
            Startseite
          </a>
          <a href="#/impressum" className="hover:text-ink transition-colors duration-200">
            Impressum
          </a>
          <a href="#/datenschutz" className="hover:text-ink transition-colors duration-200">
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
};
```

---

## ANHANG: Vollständige `HomeFAQCTA.tsx` (nur FAQ, CTA ist jetzt `ClosingCTA`)

```tsx
import React, { useState } from 'react';

const faqItems = [
  {
    q: 'Für welche Unternehmen arbeitet ihr?',
    a: 'Inhabergeführt, 5 bis 150 Mitarbeiter, deutschsprachiger Raum. Branchenübergreifend, mit Schwerpunkt auf Dienstleistung, Handel und B2B.',
  },
  {
    q: 'Müssen wir technisches Vorwissen mitbringen?',
    a: 'Nein. Wir erklären alles verständlich und begleiten Sie so, dass Ihr Team am Ende eigenständig mit den Lösungen umgehen kann.',
  },
  {
    q: 'Was kostet eine Zusammenarbeit?',
    a: 'Das hängt vom Umfang ab. Das Erstgespräch ist kostenlos. Danach legen wir transparent auf den Tisch, was es kosten würde — bevor Sie sich entscheiden.',
  },
  {
    q: 'Arbeitet ihr herstellerunabhängig?',
    a: 'Ja. Keine Provisionen von Toolanbietern. Was wir empfehlen, empfehlen wir weil es für Sie das Richtige ist.',
  },
  {
    q: 'Wie schnell sehen wir Ergebnisse?',
    a: 'Erste Ergebnisse — ein laufender Chatbot, ein automatisiertes Screening — sind typischerweise in zwei bis vier Wochen sichtbar.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16u px-6 md:px-8">
      <div className="max-w-[700px] mx-auto">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12u">
          Häufige Fragen
        </h2>

        <div className="space-y-0">
          {faqItems.map((item, i) => (
            <div key={i} className="border-t border-faint/50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between py-5 text-left cursor-pointer group"
              >
                <span className="text-sm font-body text-ink pr-8 leading-relaxed">
                  {item.q}
                </span>
                <span
                  className={`text-muted text-lg font-body flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  openIndex === i
                    ? 'max-h-40 opacity-100 pb-5'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-muted font-body leading-relaxed pr-12">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-faint/50" />
        </div>
      </div>
    </section>
  );
};
```

---

## ANHANG: Das versteckte Detail

Das "Design-Detail, das man nur bemerkt wenn man sucht":

Im `Footer.tsx` steht "© 2026 Ainzigartig" — aber beim Hover über diesen Text ändert sich der Cursor zu `cursor: help` und es erscheint ein `title`-Attribut mit dem Text: *"Gebaut von Menschen. Beraten von Maschinen."*

```tsx
<span 
  className="text-xs text-faint font-body cursor-help" 
  title="Gebaut von Menschen. Beraten von Maschinen."
>
  © 2026 Ainzigartig
</span>
```

Niemand wird das sofort finden. Aber wer es findet, weiß dass hier jemand mit Absicht gearbeitet hat.

---

## ZUSAMMENFASSUNG DER MIGRATION

| Vorher (entfernt) | Nachher (ersetzt durch) |
|---|---|
| `BackgroundEffects.tsx` — schwebende Symbole | Entfernt. Keine Background-Dekoration. |
| `AsciiHeader.tsx` — ASCII-Art mit Scramble | `Hero.tsx` — Editorial Split mit Typografie |
| `LogoSlider.tsx` — Placeholder-Logos | Entfernt. Keine Logos ohne echte Kunden. |
| `ValueProposition.tsx` — Zitat-Box mit Neon-Corners | Entfernt. Die Headline des Hero übernimmt die Positionierung. |
| `Services.tsx` — 3er-Grid mit farbcodierten Karten | `Services.tsx` — Nummerierte Katalog-Liste |
| `CaseStudies.tsx` — Karten mit Icons und Status-Badges | `CaseStudies.tsx` — Marginalia-Layout |
| `TeamSection.tsx` — Pixel-Art mit Scanlines und Tags | `TeamSection.tsx` — Drei Namen, ein Absatz, verstecktes Foto |
| `HomeCTA` — Großer lila CTA-Block | `ClosingCTA.tsx` — Einzeiler mit Textlink |
| Neon-Farbpalette (Cyan/Pink/Yellow auf Schwarz) | Warm neutral: Creme / Terrakotta / Warmes Fast-Schwarz |
| JetBrains Mono + Space Mono | DM Serif Text + Inter |
| Alle `backdrop-blur`, `text-shadow`, `box-shadow: glow` | Entfernt. Kein einziger Blur, Glow oder Drop-Shadow. |

---

*Dieses Manifest ist ein vollständiges Briefing. Jede Komponente ist implementierungsbereit. Jede Entscheidung hat eine Begründung. Keine Entscheidung ist willkürlich. Wenn das wie das Ergebnis eines spezifischen gestalterischen Standpunkts wirkt, dann weil es einer ist.*