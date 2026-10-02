# ◉ Beat Studio · Sound Garden

<p align="center">
  <img src="https://img.shields.io/badge/Platform-13_Ecosystems_Native-0071e3?style=for-the-badge&logo=apple&logoColor=white" alt="13 Ecosystems Native" />
  <img src="https://img.shields.io/badge/Design-Apple_HIG_%26_Liquid_Glass-1d1d1f?style=for-the-badge&logo=apple&logoColor=white" alt="Apple HIG" />
  <img src="https://img.shields.io/badge/Zero_Dependency-No_Playgama_Required-34c759?style=for-the-badge" alt="Zero Playgama" />
  <img src="https://img.shields.io/badge/Audio-Web_Audio_API_%2B_WebGL-af52de?style=for-the-badge" alt="Web Audio + WebGL" />
  <img src="https://img.shields.io/badge/Build-Passing-00c853?style=for-the-badge" alt="Build Status" />
</p>

> **An interactive rhythm game & multi-platform sound garden.**  
> Tap the 16-step grid, cultivate evolving loops, and experience continuous multi-harmonic audio visualization powered by Apple Design System aesthetics and native platform lifecycles.

---

## ✦ Overview

**Beat Studio** is a touch-first music game, rhythm playground, and production-ready web game built to run seamlessly across all major gaming platforms with zero intermediate wrapper overhead.

Opening directly into a live playing field, players can sculpt rhythmic soundscapes with Kick, Snare, Hi-Hat, Clap, Bass, and Shaker instruments, modulate swing, velocity, and tempo in real time, and watch the sound garden illuminate with GPU-accelerated WebGL visuals and fluid harmonic waves.

---

##  Apple Design System Architecture

Crafted following the principles of Apple's Human Interface Guidelines (HIG) and the **Liquid Glass** design language:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Apple Liquid Glass Frame                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ In-Game HUD: Loop Counter · Master Audio Toggle · Fullscreen     │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Game Stage: Signal Arena · WebGL Pulse Orb · Harmonic Waveform   │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Studio Console: Tactile Play Button · BPM & Velocity Sliders    │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ 16-Step Rhythm Sequencer: Continuous Squircle Pads (Active Glow)  │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Mixer Deck: Level Sliders · Solo/Mute State · Display P3 Hues    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

- **Liquid Glass Materials**: Translucent surfaces using `backdrop-filter: blur(36px) saturate(200%)` with specular highlights (`rgba(255, 255, 255, 0.16)`) and ambient backdrop absorption.
- **Continuous Squircle Curvature**: 28px continuous corner radiuses on major frames and 14px on interactive controls.
- **Physical Spring Motion**: Micro-interactions tuned to Apple's signature spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with scale compression on press (`:active { transform: scale(0.95) }`).
- **Typography & Layout**: Clean typography utilizing `-apple-system`, San Francisco Pro Display/Text, and tabular figures (`tnum`) for numerical data.
- **Dual Visualizer Engine**:
  1. **WebGL Signal Orb**: Dependency-free fragment shader rendering reactive energy halos, ripples, and frequency sweeps.
  2. **Harmonic Canvas Visualizer**: Real-time sinusoidal waves reacting to BPM, audio status, and active track count with ambient floating particles.

---

## 🌐 13 Native Platform Adapters (Zero Playgama)

Beat Studio implements a direct, zero-dependency platform manager (`src/lib/platform/`) that communicates directly with native browser globals and vendor SDKs without any third-party mediator like Playgama:

| Platform | SDK Global / Contract | Features & Lifecycle Hooks |
| :--- | :--- | :--- |
| **YouTube Playables** | `window.ytgame` (v1) | `firstFrameReady()`, `gameReady()`, audio sync, cloud save/load |
| **Facebook Instant Games** | `window.FBInstant` (v7+) | `initializeAsync()`, `startGameAsync()`, `setSessionData()` |
| **Poki** | `window.PokiSDK` (v2) | `init()`, `gameLoadingFinished()`, `gameplayStart()` |
| **CrazyGames** | `window.CrazyGames.SDK` (v3) | `sdk.game.loadingStop()`, `gameplayStart()`, responsive canvas |
| **Yandex Games** | `window.YaGames` (v2) | `YaGames.init()`, cloud storage sync via `getPlayer()` |
| **GameDistribution** | `window.gdsdk` (v1) | `resumeGame()`, `pauseGame()`, fullscreen support |
| **Discord Activities** | `@discord/embedded-app-sdk` | Activity lifecycle, RPC channel sync, embedded layout |
| **JioGames** | `window.jioGames` Web SDK | Native launch handshake, back button interception |
| **Y8 Games** | Direct HTML5 / Y8 API | Direct embed, responsive canvas scaling, local save |
| **Lagged** | Lagged HTML5 API | Instant boot, sound toggling, responsive layout |
| **Microsoft Store (PWA)**| `manifest.json` / W3C PWA | Windows app packageable, offline storage, window chrome |
| **Huawei & Xiaomi** | `window.qg` Quick Game | Quick game runtime detection, orientation locking |
| **MSN & Reddit Games** | IFrame Sandbox Spec | Cross-origin postMessage sync, safe iframe boundaries |

### Why Zero Playgama?
1. **0 KB Overhead**: Eliminates bloated third-party wrapper bundles.
2. **Instant Certification**: Adheres 100% strictly to official platform certification requirements (e.g., YouTube Playables Test Suite, Poki Quality Guidelines).
3. **No Unwanted Tracking**: Respects player privacy with zero external telemetry or ads.
4. **Resilient Local Fallback**: When run outside a platform sandbox, all save and audio calls cleanly fall back to `localStorage` and browser Web Audio APIs.

---

## 🎹 In-Game Controls

| Input | Action |
| :--- | :--- |
| `Space` | Play / Pause sequence |
| `←` / `→` | Navigate active 16-step columns |
| `1` – `6` | Toggle sound on currently selected step (Kick, Snare, Hi-Hat, Clap, Bass, Shaker) |
| `M` | Master audio toggle (Mute / Unmute) |
| `F` | Toggle fullscreen mode |
| `Click / Tap` | Toggle rhythm pads, adjust sliders, or trigger presets |

---

## 🛠️ Project Structure

```text
random-soundscape-maker/
├── src/
│   ├── components/
│   │   ├── BeatStudio.tsx             # Main rhythm stage, sequencer, mixer & controls
│   │   ├── BeatVisualizer.tsx         # GPU WebGL signal orb shader
│   │   ├── SoundscapeVisualizer.tsx   # Apple fluid multi-harmonic audio visualizer
│   │   └── ui/                        # Reusable shadcn/ui components
│   ├── lib/
│   │   ├── audioContext.ts            # Web Audio API context singleton
│   │   ├── youtubePlayables.ts        # Dedicated YouTube Playables bridge
│   │   └── platform/                  # Unified native platform architecture
│   │       ├── types.ts               # Universal IPlatformAdapter contract
│   │       ├── platformManager.ts     # Platform detector & lifecycle coordinator
│   │       └── adapters/              # 13 dedicated zero-Playgama platform adapters
│   ├── types/
│   │   └── ytgame.d.ts                # Official TypeScript types for YouTube Playables
│   └── index.css                      # Apple Design System & Liquid Glass CSS
├── public/
│   └── manifest.json                  # Web App Manifest for PWA & Microsoft Store
└── .github/
    └── workflows/verify.yml           # CI production verification workflow
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rahul08319/random-soundscape-maker.git

# Enter the directory
cd random-soundscape-maker

# Install dependencies
npm install

# Run the local development server
npm run dev
```

### Production Build & Verification

```bash
# Typecheck and build optimized bundle
npm run build

# Run ESLint validation
npm run lint
```

---

## 📜 YouTube Playables Certification Ready

- **Sandboxed Execution**: Verified to load before game code (`<script src="https://www.youtube.com/game_api/v1"></script>`).
- **Lifecycle Calls**: Calls `ytgame.game.firstFrameReady()` upon initial canvas paint and `ytgame.game.gameReady()` when the audio context and patterns are prepared.
- **Audio Synchronization**: Binds directly to `ytgame.system.isAudioEnabled()` and listens to `onAudioEnabledChange()`.
- **Cloud State Preservation**: Encodes and persists user patterns with `ytgame.game.saveData()` / `loadData()`.

---

<p align="center">
  Crafted with care by <b><a href="https://github.com/Rahul08319">Rahul Kumar</a></b>.
</p>
