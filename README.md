# Beat Studio

> An interactive rhythm game where you grow a sound garden one beat at a time.

Beat Studio is a touch-first music game and YouTube Playable. Tap the rhythm board to place sounds into a looping world, press play to bring the garden to life, and tune the groove as it moves. The game opens directly into play with a ready-to-edit beat and an animated WebGL scene.

| Play | Shape | Collect |
| :-- | :-- | :-- |
| Tap 16 pads across Kick, Snare, Hi-Hat, Clap, Bass, and Shaker | Tempo, swing, velocity, level, mute, and solo | Named groove presets, favorites, share links, and JSON import/export |

## Highlights

- **A game scene, not a landing screen** — jump straight into the Sound Garden, with a live signal arena, compact in-game HUD, and rhythm board.
- **Native WebGL scene** — GPU-rendered signal art responds to playback, the active step, and velocity.
- **Immediate play** — the game opens with an audible starter groove; tap Play once to unlock browser audio.
- **Creative controls** — shape tempo, swing, velocity, and each instrument's level, mute, or solo state.
- **Keep and share grooves** — save named presets and favorites, share a beat URL, or import/export JSON.
- **No monetization** — no ads, rewarded content, purchases, or score submission.

## Keyboard controls

| Key | Action |
| :-- | :-- |
| `Space` | Play / pause |
| `←` / `→` | Select a step |
| `1`–`6` | Toggle the selected pad for a sound |
| `M` | Toggle master audio |
| `F` | Toggle fullscreen |

## Run locally

```bash
git clone https://github.com/Rahul08319/Soundscape-Studio.git
cd Soundscape-Studio
npm install
npm run dev
```

Create the production bundle with:

```bash
npm run build
```

## Game systems

```text
src/components/BeatStudio.tsx       Rhythm board, sound engine, mixer, and groove saves
src/components/BeatVisualizer.tsx   Native WebGL Sound Garden scene
src/lib/platform/                   YouTube Playables lifecycle, audio, locale, and save adapter
.github/workflows/verify.yml       Deterministic production-build verification
```

Built with React, TypeScript, Vite, Tailwind CSS, Web Audio API, and WebGL.

## YouTube Playables

The YouTube adapter loads before the app bundle, reports first-frame and game readiness, honors host audio and pause/resume signals, uses the host language, and persists the current groove with the Playables save API. Local development falls back to `localStorage`.

Before a submission, upload a production bundle to the official [YouTube Playables Test Suite](https://developers.google.com/youtube/gaming/playables/test_suite). GitHub Actions installs the locked dependencies and verifies the production build on every push and pull request.

---

Made with care by [Rahul Kumar](https://github.com/Rahul08319).
