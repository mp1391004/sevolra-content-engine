# Kiểm hướng, tỷ lệ và chữ — 2026-10-14

Hai ảnh Drive đang hiển thị đã được thay: product-v3-1 và product-v4-2. Chữ hạ xuống vùng giữa/dưới, số/thời gian ở góc trên, mặt và đệm thấy rõ. Đệm lắp cùng trục ghế về vô lăng; so tỷ lệ theo dấu chân trên ghế, mép trước, độ dày và phối cảnh giữa khung trống/ngồi.

Vision QA hai ảnh cuối PASS cả bốn khung, xem product-v3-1-qa.json và product-v4-2-qa.json. Regression layout-v2 FAIL hướng/tỷ lệ/chữ cao. Ảnh product-v3-2 FAIL đệm cầm lớn/chữ chạm đệm, đã sửa thành product-v4. QA dùng tỷ lệ thị giác; không đo chính xác cm từ ảnh và không đánh trượt chỉ vì thân người che phần đệm khi ngồi.

38 gói storyboard và kiểm đa luồng/số lượng qua test; lỗi hướng đệm và thay kích thước bị chặn. Chưa tạo lại toàn bộ 38 ảnh; mỗi ảnh mới vẫn qua QA. Đã kiểm giao diện hai URL ảnh/prompt mới, API health hoạt động. Screenshot lowered-text-full-preview.png.

QA-DRIVE-LAYOUT.md trước đây chỉ kiểm cabin/vị trí người, chưa xác nhận hướng/tỷ lệ đệm hoặc vị trí chữ; dùng bản kiểm này cho ba điều kiện bổ sung.
