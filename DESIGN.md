# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-07-15
- Primary product surfaces: Startseite, Arbeitsproben, Live-Werkzeuge, Leistungsseiten, Kontakt
- Evidence reviewed: `Design Manifest.md`, current live desktop/mobile screenshots, `Hero.tsx`, `Services.tsx`, `Projects.tsx`, tool pages, user feedback in the launch review

## Brand
- Personality: ruhig, präzise, technisch kompetent, hochwertig, direkt
- Trust signals: funktionierende Werkzeuge, konkrete Systembeispiele, nachvollziehbare Grenzen, saubere Sprache
- Avoid: Emojis, Meme-/TikTok-Tonalität, Neon- oder Hacker-Ästhetik, erfundene Kennzahlen, austauschbare KI-Agentur-Floskeln, dominante Disclaimer

## Product goals
- Goals: technische Breite sichtbar machen; Beratung und Engineering gleichwertig positionieren; Besucher innerhalb weniger Sekunden zu echten Systemen führen; qualifizierte Gespräche auslösen
- Non-goals: reine Demo-Sammlung, persönliche Portfolio-Seite, generische Strategieberatung ohne Umsetzungsbezug
- Success signals: Nutzung der Live-Werkzeuge, Besuche der Arbeitsproben, qualifizierte Kontaktanfragen

## Personas and jobs
- Primary personas: mittelständische Geschäftsführung, Operations, Marketing/Vertrieb, Service, Controlling
- User jobs: Chancen erkennen, technische Machbarkeit einschätzen, Beispiele prüfen, kompetenten Umsetzungspartner bewerten
- Key contexts of use: Desktop im Arbeitskontext, Mobile nach Empfehlung oder E-Mail-Kontakt

## Information architecture
- Primary navigation: Leistungen, Systeme/Arbeitsproben, Live-Werkzeuge, Insights, Gespräch
- Core routes/screens: `/`, `/projekte`, `/ki-analyse`, `/live-demo`, `/insights`, ausgewählte Leistungsseiten
- Content hierarchy: konkrete Positionierung -> live nutzbare Systeme -> Leistungsbreite -> Umsetzungserfahrung -> Arbeitsweise -> Kontakt

## Design principles
- Konkretheit vor Abstraktion: zuerst zeigen, was gebaut und genutzt werden kann.
- Editorial, nicht leer: Weißraum schafft Ruhe, darf aber Kompetenz nicht verstecken.
- Ein System, eine Sprache: keine Mischung aus Creme-Editorial und Neon-Hacker-Seiten.
- Sicherheit als Produktdetail: Hinweise klar, kurz und am relevanten Ort; nicht als visuelle Hauptbotschaft.
- Tradeoffs: lieber weniger Effekte und dafür stärkere Inhalte; lieber ehrliche Einordnung als unbelegte Erfolgszahlen.

## Visual language
- Color: warmes Creme, warmes Fast-Schwarz, dunkles Grün als Akzent
- Typography: Serif für Aussagen und Hierarchie, Sans für Bedienung und Fließtext
- Spacing/layout rhythm: 8-Pixel-System; großzügig, aber mit sichtbarer Informationsdichte
- Shape/radius/elevation: feine Linien, kaum Rundung, keine Glow- oder Glassmorphism-Effekte
- Motion: subtil und funktional; Reduced Motion respektieren
- Imagery/iconography: keine Emojis; sparsame systemische Symbole nur aus dem vorhandenen Icon-System

## Components
- Existing components to reuse: Navbar, Footer, RouteMeta, ContactForm, bestehende Editorial-Tokens
- New/changed components: Hero mit konkretem Capability-Statement, Live-System-Showcase, breiter Leistungskatalog, konsistente Service-Seite
- Variants and states: Hover, Fokus, Laden, Fehler, Erfolg und deaktiviert müssen sprachlich und visuell konsistent sein
- Token/component ownership: globale Farben und Typografie in `index.html`; Seiten nutzen ausschließlich die helle Editorial-Sprache

## Accessibility
- Target standard: WCAG 2.2 AA als Ziel
- Keyboard/focus behavior: sichtbare Fokuszustände; alle Tools vollständig per Tastatur bedienbar
- Contrast/readability: kein Weiß auf Creme, keine zu blassen Pflichttexte, Mindestgröße für mobile Hinweise
- Screen-reader semantics: echte Überschriften, Labels, Statusbereiche und Button-Texte
- Reduced motion and sensory considerations: keine flackernden oder rein dekorativen Animationen

## Responsive behavior
- Supported breakpoints/devices: 360px bis große Desktop-Displays
- Layout adaptations: Karten und Spalten werden linear; CTAs bleiben vollständig sichtbar; keine überlappenden Banner
- Touch/hover differences: wichtige Inhalte dürfen nicht nur per Hover erreichbar sein

## Interaction states
- Loading: ruhig, textlich eindeutig, ohne verspielte Animationen
- Empty: erklärt den nächsten sinnvollen Schritt
- Error: konkrete Ursache und Wiederholungsmöglichkeit
- Success: Ergebnis und nächste Aktion klar trennen
- Disabled: begründen, wenn die Ursache nicht offensichtlich ist
- Offline/slow network: bestehende Werkzeuge behalten verständliche Fehlerzustände

## Content voice
- Tone: professionell, selbstbewusst, präzise, zugänglich
- Terminology: Websites, Web-Apps, KI-Agenten, Automatisierung, Integrationen, Decision Intelligence, Beratung
- Microcopy rules: keine Emojis; keine künstliche Lockerheit; keine Großbuchstaben als Lautstärkeersatz; kurze Datenschutzangaben direkt am Eingabepunkt

## Implementation constraints
- Framework/styling system: React, React Router, Tailwind über bestehende CDN-Konfiguration
- Design-token constraints: vorhandene Editorial-Tokens aus `Design Manifest.md` weiterverwenden
- Performance constraints: große Tool-Abhängigkeiten weiterhin lazy laden
- Compatibility constraints: Vercel Serverless, moderne Browser
- Test/screenshot expectations: Desktop und Mobile für Startseite sowie Primärtools; funktionale Browser-Smokes für echte Flows

## Open questions
- [ ] Finale Betreiberangaben / Eigentümer / blockiert ausschließlich die vollständigen Rechtstexte
- [ ] Eigene Domain und endgültige Absenderdomain / beeinflusst Branding und E-Mail-Absender
- [ ] Freigabefähige Kundennamen oder Kennzahlen / würde die Arbeitsproben später zusätzlich stärken
