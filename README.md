# 🎯 Fateful Moment

> **An interactive decision-making simulation game** built with React Native & Expo.
> Step into history's most critical moments, make life-or-death decisions, and discover your **Decision DNA** — a psychological profile shaped by your choices.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [App Flow](#app-flow)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [AI-Powered Development](#ai-powered-development)
- [Design Decisions](#design-decisions)
- [Notes & Known Limitations](#notes--known-limitations)
- [Türkçe](#türkçe)

---

## Overview

**Fateful Moment** is a React Native mobile application developed as a case study for a Jr. Frontend Developer position. The app faithfully recreates the Figma design, implementing the complete **Flow v01** — from the Home screen through scenario briefings, simulation/decision screens, and the Decision DNA result screen.

The app works with **dummy data** (no backend required) and runs on both **iOS** and **Android**.

---

## Features

- 🏠 **Home Screen (Landscape)** — Horizontal scrollable 6 scenario cards (Figma auto-layout 1400px width) with intelligent viewability tracking (plays video only on the top 2-3 focused cards, pauses and switches off-screen cards to static posters to preserve mobile performance)
- 📋 **Scenario Briefing** — Immersive briefing card with gradient overlays and a "Start Simulation" glass-morphism button
- 🎬 **Video Simulation** — Full-screen video playback using `expo-video` with multi-stage progression (intro → decision 1 → decision 2)
- 🗳️ **Decision Screens** — Interactive option cards with selection animations, SVG glass-fill effects, progress indicators, and multi-round decision flow
- 🧬 **Decision DNA Result** — Psychological profile with radar chart visualization (SVG), metric bars, pattern detection analysis, and blind spot identification
- 🔐 **Auth Flow (Portrait)** — Sign in, sign up, reset password, and check email confirmation screens with form validation and password strength rules
- 🎵 **Music Player UI** — Decorative floating music player with play/pause toggle
- 📱 **Platform Adaptations** — Android navigation bar management, orientation locking per screen, and cross-platform font handling

---

## App Flow

```
Auth Landing → Sign In / Sign Up → Home (Landscape)
                                      ↓
                              Scenario Briefing
                                      ↓
                             Video Simulation (Intro)
                                      ↓
                            Decision Screen (Round 1)
                                      ↓
                          Video Simulation (Decision 1)
                                      ↓
                            Decision Screen (Round 2)
                                      ↓
                          Video Simulation (Decision 2)
                                      ↓
                              Decision DNA Result
```

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React Native 0.86 + Expo SDK 57 |
| **Routing** | Expo Router (file-based) |
| **Language** | TypeScript (strict mode) |
| **Video** | expo-video |
| **UI Effects** | expo-linear-gradient, expo-blur |
| **SVG** | react-native-svg |
| **Fonts** | @expo-google-fonts/inter (300–900 weights) |
| **Navigation** | expo-navigation-bar, expo-screen-orientation |
| **Lint** | ESLint (expo config) |

---

## Project Structure

```
src/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx               # Root Stack navigator with font loading & platform config
│   ├── index.tsx                 # Auth landing screen (Welcome page)
│   ├── home/
│   │   └── index.tsx             # Scenarios home screen (landscape)
│   ├── scenario/
│   │   └── [id].tsx              # Scenario orchestrator (Briefing → Video → Options → DNA)
│   ├── result/
│   │   └── [id].tsx              # Standalone result screen route
│   └── auth/
│       ├── sign-in.tsx           # Email/password sign in
│       ├── sign-up.tsx           # Registration with password validation rules
│       ├── reset-password.tsx    # Password reset request
│       └── check-email.tsx       # Reset confirmation
│
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx        # Shared layout wrapper for auth screens (DRY)
│   │   └── SocialAuthButtons.tsx # Google/Apple/Email social login buttons
│   ├── cards/
│   │   ├── ScenarioCard.tsx      # Scenario card with optimized video background
│   │   ├── OptionCard.tsx        # Decision option card with selection animation
│   │   ├── StandardCard.tsx      # Generic HUD-style card
│   │   └── InteractiveSelection.tsx # Accessible radio option selector
│   ├── navigation/
│   │   ├── NavigationBar.tsx     # Top navigation bar
│   │   └── MusicPlayer.tsx       # Floating music player HUD UI
│   ├── scenario/
│   │   ├── BriefingView.tsx      # Scenario briefing card & mission overview
│   │   ├── OptionsView.tsx       # Multi-round decision options layout (DRY)
│   │   ├── DNAResultView.tsx     # Decision DNA psychological matrix & radar chart
│   │   └── ScenarioIcons.tsx     # Scenario-specific HUD and metric SVG icons
│   ├── system/
│   │   └── IPhoneChrome.tsx      # iOS status bar chrome for design fidelity
│   └── ui/
│       ├── Button.tsx            # Multi-variant button (primary/secondary/glass/danger)
│       ├── Input.tsx             # Form input with validation states & password toggle
│       ├── EmailIcon.tsx         # SVG email icon
│       └── SuccessIcon.tsx       # SVG success checkmark icon
│
├── constants/
│   └── theme.ts                  # Colors, Typography, Layout design tokens
│
├── services/
│   └── mockData.ts               # Scenario dummy data & TypeScript interfaces
│
└── utils/
    └── validators.ts             # Form validation utilities (email format regex, etc.)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Expo CLI** (included via npx)
- **Expo Go** app on your device, or an iOS Simulator / Android Emulator

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/fateful-moment.git
cd fateful-moment

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

### Running on Device

| Platform | Command |
|---|---|
| **iOS Simulator** | Press `i` in the terminal |
| **Android Emulator** | Press `a` in the terminal |
| **Physical Device** | Scan the QR code with Expo Go |

### Building APK

```bash
# Install EAS CLI globally (if not installed)
npm install -g eas-cli

# Build Android APK
eas build --platform android --profile preview
```

### Linting & Type Checking

```bash
npx expo lint          # ESLint
npx tsc --noEmit       # TypeScript type check
```

Both commands pass with **zero errors** ✅

---

## AI-Powered Development

### Tools Used

| Tool | Purpose |
|---|---|
| **Google Antigravity (Claude Opus 4.6)** | Primary AI coding assistant — architecture planning, component implementation, Figma-to-code translation, code review, debugging, and documentation |
| **Figma** | Design reference and asset extraction |

### How AI Was Used

The development process was a **collaborative pair-programming** approach with AI:

1. **Figma Analysis & Architecture Planning** — AI analyzed the Figma design structure and proposed the file-based routing architecture, component hierarchy, and theme system before any code was written.

2. **Component-by-Component Implementation** — Each UI component was built iteratively:
   - AI translated Figma design tokens (colors, typography, spacing) into a centralized theme system
   - Complex visual elements (glass-morphism buttons, radar charts, SVG icons) were implemented by describing the Figma layer structure to the AI
   - Cross-platform edge cases (Android navigation bar, iOS safe areas, font fallbacks) were identified and resolved collaboratively

3. **Multi-Stage Simulation Flow** — The video playback state machine (briefing → intro video → options round 1 → decision video 1 → options round 2 → decision video 2 → DNA result) was designed and implemented with AI assistance, ensuring proper state transitions and video lifecycle management.

4. **Code Review & Quality Assurance** — AI performed comprehensive code review covering:
   - TypeScript type safety (strict mode enabled)
   - Unused imports and dead code removal
   - Lint error resolution
   - Accessibility improvements
   - Performance considerations (memoization, FlatList optimization)

5. **Documentation** — This README was generated collaboratively.

### AI Development Philosophy

> AI was used as a **force multiplier**, not a replacement for understanding. Every AI-generated code suggestion was reviewed, understood, and validated before integration. The developer maintained ownership of architectural decisions while leveraging AI for implementation speed, cross-platform edge case discovery, and code quality assurance.

---

## Design Decisions

### Why Expo Router (File-Based Routing)?
Expo Router provides type-safe, file-based routing that mirrors the screen hierarchy visible in the Figma design. Each screen is a file, making the project structure immediately understandable.

### Why Centralized Theme System?
`src/constants/theme.ts` contains all design tokens (Colors, Typography, Layout) to ensure consistency with the Figma design and make future design changes trivial.

### Why expo-video Instead of expo-av?
`expo-video` is Expo SDK 57's recommended video solution with better performance, native controls support, and proper lifecycle management compared to the legacy `expo-av` Video component.

### Why SVG for Radar Chart?
The Decision DNA radar chart uses `react-native-svg` directly rather than a charting library to achieve pixel-perfect Figma fidelity without unnecessary bundle size overhead.

### Orientation Strategy
Auth screens use **portrait** orientation (natural for form inputs), while scenario/home screens use **landscape** orientation (matching the cinematic simulation experience shown in the Figma design).

---

## Notes & Known Limitations

- **No Backend** — All data is served from `src/services/mockData.ts`. Auth forms validate but don't persist.
- **Single Scenario Flow** — The full video simulation flow is implemented for the Iraq War scenario. Other scenario cards navigate to the same flow (as specified: dummy data).
- **Music Player** — UI-only; no actual audio playback is implemented (decorative, matching Figma).
- **Decision DNA Metrics** — The radar chart and metric values are hardcoded to match the Figma design. In production, these would be dynamically calculated from user choices.

---

<br>

# Türkçe

## 🎯 Fateful Moment

> Tarihin en kritik anlarına adım atın, hayat-ölüm kararları verin ve seçimlerinizin şekillendirdiği **Karar DNA'nızı** keşfedin.

---

## Genel Bakış

**Fateful Moment**, Jr. Frontend Developer pozisyonu için bir case study olarak geliştirilen React Native mobil uygulamasıdır. Uygulama, Figma tasarımını birebir hayata geçirmekte olup **Flow v01**'in tamamını kapsar — Ana Ekran'dan senaryo brifinglerine, simülasyon/karar ekranlarına ve Karar DNA'sı sonuç ekranına kadar.

Uygulama **dummy verilerle** çalışmaktadır (backend bağlantısı yoktur) ve hem **iOS** hem **Android**'de sorunsuz çalışır.

---

## Özellikler

- 🏠 **Ana Ekran (Yatay)** — Yatay kaydırılabilir 6 senaryo kartı (Figma auto-layout 1400px genişlik) ve akıllı görünürlük takibi (sadece ekranda odaklanan ilk 2-3 kartın videosunu oynatır, ekran dışına çıkanları durdurup durağan poster resmine çevirerek performansı korur)
- 📋 **Senaryo Brifingi** — Gradient kaplama ve glass-morphism buton ile etkileyici brifing kartı
- 🎬 **Video Simülasyon** — `expo-video` ile tam ekran video oynatma, çok aşamalı ilerleme
- 🗳️ **Karar Ekranları** — Seçim animasyonları, SVG cam-dolgu efektleri ve çok turlu karar akışı
- 🧬 **Karar DNA'sı Sonucu** — Radar grafiği (SVG), metrik çubukları, örüntü analizi ve kör nokta tespiti
- 🔐 **Kimlik Doğrulama Akışı (Dikey)** — Giriş, kayıt, şifre sıfırlama ekranları (form doğrulama dahil)
- 🎵 **Müzik Çalar** — Dekoratif yüzen müzik çalar arayüzü
- 📱 **Platform Uyumlaması** — Android navigasyon çubuğu yönetimi, ekran bazlı yön kilitleme

---

## Uygulama Akışı

```
Karşılama → Giriş / Kayıt → Ana Ekran (Yatay)
                                  ↓
                          Senaryo Brifingi
                                  ↓
                       Video Simülasyon (Giriş)
                                  ↓
                        Karar Ekranı (Tur 1)
                                  ↓
                     Video Simülasyon (Karar 1)
                                  ↓
                        Karar Ekranı (Tur 2)
                                  ↓
                     Video Simülasyon (Karar 2)
                                  ↓
                        Karar DNA'sı Sonucu
```

---

## Proje Mimarisi & Dizin Yapısı

```
src/
├── app/                          # Expo Router ekranları (dosya tabanlı yönlendirme)
│   ├── _layout.tsx               # Kök Stack navigator, font yükleme ve platform ayarları
│   ├── index.tsx                 # Karşılama ekranı (Welcome)
│   ├── home/
│   │   └── index.tsx             # Senaryolar ana ekranı (yatay mod)
│   ├── scenario/
│   │   └── [id].tsx              # Senaryo orkestratörü (Brifing → Video → Seçenekler → DNA)
│   ├── result/
│   │   └── [id].tsx              # Bağımsız sonuç ekranı rotası
│   └── auth/
│       ├── sign-in.tsx           # E-posta/şifre ile giriş ekranı
│       ├── sign-up.tsx           # Şifre kuralları doğrulamalı kayıt ekranı
│       ├── reset-password.tsx    # Şifre sıfırlama talep ekranı
│       └── check-email.tsx       # Sıfırlama onay ekranı
│
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx        # Kimlik doğrulama ekranları için ortak şablon (DRY)
│   │   └── SocialAuthButtons.tsx # Google/Apple/Email sosyal giriş butonları
│   ├── cards/
│   │   ├── ScenarioCard.tsx      # Video arkaplanlı optimize senaryo kartı
│   │   ├── OptionCard.tsx        # Cam dolgu animasyonlu karar seçeneği kartı
│   │   ├── StandardCard.tsx      # Genel HUD tarzı kart bileşeni
│   │   └── InteractiveSelection.tsx # Erişilebilir radyo seçim bileşeni
│   ├── navigation/
│   │   ├── NavigationBar.tsx     # Üst navigasyon çubuğu
│   │   └── MusicPlayer.tsx       # Yüzen HUD müzik çalar arayüzü
│   ├── scenario/
│   │   ├── BriefingView.tsx      # Senaryo brifing ve görev kartı
│   │   ├── OptionsView.tsx       # Çok turlu karar seçenekleri grid görünümü
│   │   ├── DNAResultView.tsx     # Karar DNA'sı psikolojik matrisi ve radar grafiği
│   │   └── ScenarioIcons.tsx     # Senaryo HUD ve metrik SVG ikonları
│   ├── system/
│   │   └── IPhoneChrome.tsx      # Tasarım sadakati için iOS durum çubuğu çerçevesi
│   └── ui/
│       ├── Button.tsx            # Çok varyantlı buton (primary/secondary/glass/danger)
│       ├── Input.tsx             # Form girdisi, doğrulama durumları ve şifre görünürlüğü
│       ├── EmailIcon.tsx         # SVG e-posta ikonu
│       └── SuccessIcon.tsx       # SVG onay işareti ikonu
│
├── constants/
│   └── theme.ts                  # Renkler, Tipografi, Boşluk tasarım tokenları
│
├── services/
│   └── mockData.ts               # Senaryo dummy verileri ve TypeScript tipleri
│
└── utils/
    └── validators.ts             # Form doğrulama fonksiyonları (e-posta regex vb.)
```

---

## Kurulum

### Gereksinimler

- **Node.js** ≥ 18
- **Expo CLI** (npx ile dahil)
- Cihazınızda **Expo Go** uygulaması veya iOS Simülatör / Android Emülatör

### Kurulum Adımları

```bash
# 1. Repoyu klonlayın
git clone https://github.com/<kullanici-adi>/fateful-moment.git
cd fateful-moment

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npx expo start
```

### Cihazda Çalıştırma

| Platform | Komut |
|---|---|
| **iOS Simülatör** | Terminalde `i` tuşuna basın |
| **Android Emülatör** | Terminalde `a` tuşuna basın |
| **Fiziksel Cihaz** | Expo Go ile QR kodu okutun |

### APK Oluşturma

```bash
# EAS CLI yükleyin (yüklü değilse)
npm install -g eas-cli

# Android APK oluşturun
eas build --platform android --profile preview
```

---

## Yapay Zeka Destekli Geliştirme

### Kullanılan Araçlar

| Araç | Kullanım Amacı |
|---|---|
| **Google Antigravity (Claude Opus 4.6)** | Birincil AI kodlama asistanı — mimari planlama, komponent geliştirme, Figma'dan koda çeviri, kod inceleme, hata ayıklama ve dokümantasyon |
| **Figma** | Tasarım referansı ve asset çıkarma |

### AI Nasıl Kullanıldı?

Geliştirme süreci, AI ile **işbirlikçi eşli programlama** yaklaşımıyla yürütülmüştür:

1. **Figma Analizi & Mimari Planlama** — AI, Figma tasarım yapısını analiz ederek dosya tabanlı yönlendirme mimarisini, komponent hiyerarşisini ve tema sistemini kod yazmadan önce önerdi.

2. **Komponent Komponent Geliştirme** — Her UI bileşeni iteratif olarak inşa edildi:
   - Figma tasarım tokenları (renkler, tipografi, boşluklar) merkezi tema sistemine çevrildi
   - Karmaşık görsel öğeler (glass-morphism butonlar, radar grafikleri, SVG ikonlar) Figma katman yapısı AI'ya aktarılarak uygulandı
   - Platformlar arası sorunlar (Android navigasyon çubuğu, iOS safe area, font fallback) işbirliğiyle çözüldü

3. **Çok Aşamalı Simülasyon Akışı** — Video oynatma durum makinesi, doğru geçişler ve video yaşam döngüsü yönetimi sağlanarak AI desteğiyle tasarlandı ve uygulandı.

4. **Kod İnceleme & Kalite Güvence** — AI kapsamlı kod incelemesi gerçekleştirdi:
   - TypeScript tip güvenliği (strict mod aktif)
   - Kullanılmayan importlar ve ölü kod temizliği
   - Lint hatalarının çözümü
   - Erişilebilirlik iyileştirmeleri

5. **Dokümantasyon** — Bu README işbirliğiyle oluşturuldu.

### AI Kullanım Felsefesi

> AI, anlayışın yerine değil, **güç çarpanı** olarak kullanıldı. Her AI kod önerisi entegrasyon öncesinde incelendi, anlaşıldı ve doğrulandı. Geliştirici, mimari kararların sahipliğini korurken, uygulama hızı, platformlar arası sorun keşfi ve kod kalite güvencesi için AI'dan yararlandı.

---

## Tasarım Kararları

### Neden Expo Router?
Dosya tabanlı, tip güvenli yönlendirme sağlar ve Figma tasarımındaki ekran hiyerarşisiyle birebir eşleşir.

### Neden Merkezi Tema Sistemi?
`src/constants/theme.ts` tüm tasarım tokenlarını barındırır, Figma ile tutarlılığı ve gelecekteki değişikliklerin kolaylığını sağlar.

### Neden expo-video?
Expo SDK 57'nin önerilen video çözümüdür; eski `expo-av`'ye kıyasla daha iyi performans ve yaşam döngüsü yönetimi sunar.

### Neden SVG ile Radar Grafiği?
Gereksiz paket boyutu olmadan Figma'ya piksel-mükemmel sadakat sağlar.

### Yön Stratejisi
Auth ekranları **dikey** (form girişleri için doğal), senaryo/ana ekranlar **yatay** (sinematik simülasyon deneyimine uygun) kullanır.

---

## Notlar & Bilinen Sınırlamalar

- **Backend Yok** — Tüm veriler `src/services/mockData.ts`'den sunulur. Auth formları doğrulama yapar ancak veri kaydetmez.
- **Tek Senaryo Akışı** — Tam video simülasyon akışı Irak Savaşı senaryosu için uygulanmıştır. Diğer kartlar aynı akışa yönlendirir (dummy data).
- **Müzik Çalar** — Yalnızca arayüz; gerçek ses oynatma uygulanmamıştır (Figma ile uyumlu dekoratif).
- **Karar DNA'sı Metrikleri** — Radar grafiği ve metrik değerleri Figma tasarımına uygun olarak sabitlenmiştir.

---

## 📄 License

This project was created as a case study and is not licensed for commercial use.

---

<p align="center">
  <sub>Built with ❤️ using React Native, Expo & AI-assisted development</sub>
</p>
