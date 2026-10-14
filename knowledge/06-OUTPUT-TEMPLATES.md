# Output templates — 30s

Header: KB, page, CAP, character identity, 30s. Đúng 4 khung, mỗi khung có number/start/end/action/text/CTA. CTA ở khung 4, cùng hành động với caption.

Ảnh: một sheet 2×2, bốn cảnh có số 1–4, timecode, chữ và CTA. Input: ảnh sản phẩm chính thức và portrait đúng page. URL PNG tải được; không dùng placeholder thay ảnh.

Prompt video: một khối đầy đủ 30s, khóa cast/product/set, timeline 0–7/7–15/15–23/23–30, text nguyên văn, CTA cuối. Mỗi panel thành một shot toàn màn hình; không đưa grid/số/timecode vào video. Kèm prompt ảnh riêng khi cần chạy lại.

Giao diện: ảnh và nút tải; prompt video trong textarea nhìn thấy được, có nút copy. Lô chạy có số lượng 1–12, số luồng 1–4, trạng thái từng công việc và lịch sử. CLI xuất package/prompt; app chạy tạo ảnh.
