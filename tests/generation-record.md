# Image generation record

Built-in imagegen, official reference: assets/product/SEVOLRA-01.png. Mode: reference-guided storyboard generation; all delivered images copied from generated output.

- Drive initial: 12 panels, 4×3, consistent navy-shirt driver and wife; preserve integrated seat/lumbar, vertical ribs, tailbone cutout, grey border; no typography. FAIL: first panel medical glow.
- Drive targeted edit: first panel only, remove entire spine/glow, neutral face and resting hand; retain other 11 panels. Output: KB-01-Drive-sheet-v2.png.
- Desk initial: 6 panels, 3×2, same mesh chair and oak desk; exact product shape. FAIL: generated underside/removable-cover panel lacked source evidence.
- Desk targeted edit: panel 4 only, replace underside and cover with exact whole cushion on oak table; do not invent removed cover or non-slip dots. Output: KB-03-Desk-sheet-v2.png.

Per-scene production prompt set is exported in KB-01-Drive.json and KB-03-Desk.json. These records describe calls actually run; per-scene prompts have not all been individually rendered. Sheet previews require full-size per-scene QA before production.
