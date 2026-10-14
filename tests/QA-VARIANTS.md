# Khác biến thể trong cùng concept — 1.4

Lỗi cũ: cùng caption/text/action, chỉ đổi ánh sáng nên hai storyboard giống nhau. Sửa: 12recipe/KB, hook/caption khác nhau, 4bộ pose ×3cỡ khung hình; giữ concept, format, mặt, sản phẩm, CTA/mục tiêu và hướng ghế. Chặn caption/hook/recipe trùng trước gen. Lô mới luân phiên vị trí bắt đầu để không luôn chọn lại V01; sau12angle thư viện quay vòng.

Bản1 hiện tại giữ hình gốc và caption quà tặng. Bản2 dựng lại: tay trên đùi, cầm đệm nghiêng, một tay vô-lăng, bàn tay mở; hook “Three seat details to check.”, caption giải thích3chi tiết thiết kế. Hai ảnh được xem so sánh trực tiếp, bản2 đạt vision QA trong distinct-v7-2-qa.json. Metadata ảnh/story/caption/prompt được lưu cùng nhau, bản cũ giữ trong revisions.

Tests: mọi KB/page có12hook/caption/recipe khác nhau; giữ mục tiêu/cast/format/bố cục và hai prompt15s. Chưa render mọi recipe thành ảnh; chất lượng hình vẫn cần kiểm sau mỗi lượt. Kiểm text/recipe không tự bảo đảm renderer tạo ảnh đủ khác.
