---
name: sevolra-content-engine
description: Tạo caption, storyboard, ảnh tham chiếu và prompt video cho Sevolra Orthopedic Cushion, với KB-01 đến KB-08 và hai page Drive/Desk. Dùng khi người dùng yêu cầu nội dung Sevolra; không dùng cho robe Noel.
---

Read [PROJECT-INSTRUCTIONS.md](PROJECT-INSTRUCTIONS.md) then the knowledge files it requires. All resources are relative to this skill. Select KB and compatible CAP from data.json; never substitute Christmas robe context. For image generation use the host image tool with an official asset from assets/product. For deterministic storyboard exports, run `node tool.mjs KB-01 Drive CAP-0103`. Browser UI is index.html. Current output is one 30-second, four-panel numbered sheet with visible text/CTA, exactly two fixed actors, quantity1–12 and concurrency1–10. The app server creates and persists images via the existing authenticated image provider; the CLI exports prompts only. Drafts are not automatically published.


## Prompt video ngắn — bản1.3
Video được chạy thành hai lượt15s riêng, rồi ghép thành30s. Giữ một ảnh storyboard4khung. Lượt1 dùng khung1/2 với local0–7/7–15s; lượt2 dùng khung3/4 với local0–8/8–15s. Mỗi prompt tự nhắc lại ảnh tham chiếu, mặt/trang phục, sản phẩm, tỷ lệ, ghế và bối cảnh/ánh sáng. Đính kèm cùng storyboard ở cả hai lượt; ảnh cuối lượt1 nếu có chỉ bổ sung khóa mặt/ánh sáng, không thay tư thế của khung3. Không trông chờ model nhớ lượt trước. CTA duy nhất ở cuối lượt2. Giao diện có copy riêng từng đoạn và copy cả2; lưu video_clips cùng lô, kể cả các lô có sẵn. Quy định này thay yêu cầu cũ chạy một lượt30s.
