---
title: Làm tool Sevolra — tạo tool, test thử
status: to-do
priority: high
due: 2026-10-15
start_time: null
end_time: null
labels: []
people:
  - Khánh
refs:
  - label: Sevolra Playbook full
    path: data/01-work/12-dropship-khanh/02-sevolra-orthopedic-cushion/outputs/sevolra-playbook-full.html
    type: brief
  - label: Kho caption Sevolra
    path: data/01-work/12-dropship-khanh/02-sevolra-orthopedic-cushion/outputs/sevolra-caption-library.md
    type: data
  - label: Tool tham khảo — Content Engine Giáng Sinh (project instructions)
    path: data/01-work/12-dropship-khanh/01-video-organic-giang-sinh/outputs/content-engine/project-instructions.md
    type: reference
  - label: Storyboard Framework (Giáng Sinh)
    path: data/01-work/12-dropship-khanh/01-video-organic-giang-sinh/outputs/content-engine/09-storyboard-framework.md
    type: reference
  - label: Output Templates (Giáng Sinh)
    path: data/01-work/12-dropship-khanh/01-video-organic-giang-sinh/outputs/content-engine/06-output-templates.md
    type: reference
deliverable:
  format: Bộ Content Engine Sevolra (instructions, product bible, format library,
    storyboard framework, output templates) + 2 test output (KB-01, KB-03) +
    checklist pass/fail
  where: data/01-work/12-dropship-khanh/02-sevolra-orthopedic-cushion/outputs/content-engine/
results: []
start_date: 2026-10-14
---

## Yêu cầu
Tạo tool sản xuất video cho Sevolra, **lấy tham khảo tool Content Engine đã làm ở project Giáng Sinh** (ticket "Skill Content Engine cho GPT (format + storyboard)", thư mục `01-video-organic-giang-sinh/outputs/content-engine/`).

## Luồng giữ nguyên
1. Chọn kịch bản trong kho (KB-01 → KB-08).
2. AI gợi ý caption phù hợp trong kho caption (CAP-xxxx cùng KB, đúng page), hoặc người tự chọn.
3. Gen storyboard từng khung cảnh theo bảng cảnh của KB (giây, cảnh, chữ trên video, lời thoại, CTA).
4. GPT tạo ảnh từng khung, dùng ảnh thật Sevolra làm tham chiếu sản phẩm.

## Chỉ đổi 3 thứ
- **Concept:** 8 kịch bản Sevolra thay cho format Giáng Sinh.
- **Sản phẩm:** Sevolra Orthopedic Cushion (Product Bible mới, ảnh thật làm reference).
- **Kiến thức training mới:** `sevolra-playbook-full.html` + `sevolra-caption-library.md` (ticket Phân tích Sevolra).

## Test thử
- Chạy 1 kịch bản cho mỗi page: KB-01 (Drive) và KB-03 (Desk).
- Kiểm tra: ảnh giữ đúng hình đệm (liền khối, gân tựa lưng, rãnh xương cụt), chữ trên video đúng vị trí, caption không vi phạm luật cấm (claim bệnh, danh xưng bác sĩ).

## Nhật ký
