---
name: sevolra-content-engine
description: Tạo caption, storyboard, ảnh tham chiếu và prompt video cho Sevolra Orthopedic Cushion, với KB-01 đến KB-08 và hai page Drive/Desk. Dùng khi người dùng yêu cầu nội dung Sevolra; không dùng cho robe Noel.
---

Read [PROJECT-INSTRUCTIONS.md](PROJECT-INSTRUCTIONS.md) then the knowledge files it requires. All resources are relative to this skill. Select KB and compatible CAP from data.json; never substitute Christmas robe context. For image generation use the host image tool with an official asset from assets/product. For deterministic storyboard exports, run `node tool.mjs KB-01 Drive CAP-0103`. Browser UI is index.html. Current output is one 30-second, four-panel numbered sheet with visible text/CTA, exactly two fixed actors, quantity1–12 and concurrency1–4. The app server creates and persists images via the existing authenticated image provider; the CLI exports prompts only. Drafts are not automatically published.
