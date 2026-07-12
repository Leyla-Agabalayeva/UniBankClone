# UniBankClone

A static front-end clone of the **Unibank** (Azerbaijan) corporate website, built with plain **HTML, CSS, and vanilla JavaScript** — no build tools, frameworks, or backend required.

## Overview

UniBankClone recreates the look and key interactive elements of a bank's marketing website: a hero slider, service navigation, a currency exchange table with a live conversion calculator, promo cards, news section, and a mobile app promotion block. All interface text is in Azerbaijani, matching the original site.

## Tech Stack

- **HTML5** — page markup (`uni.html`)
- **CSS3** — styling and layout (`uni.css`), using Google Fonts (`Nunito`, `Nunito Sans`)
- **Vanilla JavaScript** — all interactivity, no dependencies (`uni.js`)

## Features

- **Top bar & navbar** — language switcher (AZ/RU/EN), segment switch between "Fərdi" (Individual) and "Biznes" (Business), section navigation (Cards, Loans, Deposits, Transfers, Online services, Campaigns)
- **Hero slider** — auto-advancing image slider with dot navigation, keyboard arrow-key control, and touch-swipe support on mobile
- **Quick stats / services / promo cards** — informational sections about the bank's offerings
- **Currency exchange table** — buy/sell rates for USD, EUR, RUB, and GBP across three rate types (cash, non-cash, card), switchable via tabs
- **Currency calculator** — live conversion between AZN and foreign currencies based on the selected rate tab, with a swap button
- **News section** — static news/article cards
- **App promotion section** — call-to-action block for the mobile banking app
- **Mobile menu** — collapsible burger menu with outside-click-to-close behavior
- **Toast notifications** — feedback messages on navigation and segment switching

## Project Structure

```
UniBankClone/
├── uni.html   # Page markup (navbar, hero slider, services, currency, news, footer)
├── uni.css    # All styling
└── uni.js     # Slider, currency calculator, navigation, mobile menu, toasts
```

## Getting Started

No build step or server is required — it's a static site.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Leyla-Agabalayeva/UniBankClone.git
   cd UniBankClone
   ```

2. **Open `uni.html` directly in a browser**, or serve it locally for best results:

   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```

3. Navigate to the served URL (e.g. `http://localhost:8000/uni.html`).

## Notes

- Exchange rates are hardcoded sample data in `uni.js` (`rates` object) — there is no live data source or backend.
- Navigation links show a toast message but do not route to real pages; this is a front-end UI/interaction clone for practice purposes.
- Not affiliated with or endorsed by the real Unibank.

## Author

[Leyla Agabalayeva](https://github.com/Leyla-Agabalayeva)
