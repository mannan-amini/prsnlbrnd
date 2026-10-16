# Third-Party Software & Font Notices

This project (`MANAN Personal Brand`) uses the following third-party components, libraries, and assets:

---

## 1. Typography
- **Peyda Font Family (پیدا)**:
  - Weights included: Thin (100), ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900).
  - Sourced directly from local system font library `/Users/mannan/Library/Fonts/`.
  - Self-hosted locally within `/public/fonts` for 100% offline access.

---

## 2. Core Libraries & Frameworks
- **Next.js & React 19**: MIT License (Copyright © Vercel, Inc., Meta Platforms, Inc.)
- **Tailwind CSS**: MIT License (Copyright © Tailwind Labs, Inc.)
- **Three.js**: MIT License (Copyright © 2010-2026 Three.js Authors)
- **Lucide Icons**: ISC License (Copyright © 2026 Lucide Contributors)
- **Framer Motion**: MIT License (Copyright © Framer B.V.)

---

## 3. UI Motion & Component Integrations (Specification Sections 11 & 12)
- **3D Card Effect**: Inspired by Aceternity UI (`CardContainer`, `CardBody`, `CardItem`) with custom damped tilt limits (3-5°) and prefers-reduced-motion fallback.
- **Scroll Expand**: React Bits inspired non-hijacking media expand wrapper.
- **Line Waves**: React Bits inspired canvas background with lightweight sinusoidal curves.
- **Waves (Light)**: React Bits inspired ambient interactive canvas background.
- **Animated Content / Reveal**: IntersectionObserver-based reveal with zero-delay reduced-motion support.
- **Crosshair**: Coordinate tracker confined to Hero interactive area on desktop pointers.
- **Star Border**: Animated glowing border button effect.
- **Gradual Blur**: Edge backdrop-filter gradient mask.

---

All assets and code operate fully self-contained offline without third-party CDN tracking or external dependencies.
