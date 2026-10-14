# Cập nhật logic cabin

Bản sửa hiện hành và kiểm tra vị trí người/ghế: [QA-DRIVE-LAYOUT.md](QA-DRIVE-LAYOUT.md). Đánh giá visual bên dưới chỉ kiểm tra text/cast, chưa bắt được lỗi cabin được người dùng chỉ ra; ảnh Drive đã được thay bằng bản layout-v2.

# QA — storyboard 30s và chạy lô

Ngày 14/10/2026. Thay bản 58s/25s theo yêu cầu người dùng.

- PASS: 38 tổ hợp KB/page/CAP đều thành 30s, 4 khung đánh số 1–4, đúng nhân vật Drive/Desk, CTA ở khung 4.
- PASS: số lượng 1–12 và số luồng 1–4; ngoài khoảng hoặc sai KB/page bị từ chối với mã 400.
- PASS: worker thử 5 công việc với 2 luồng không mất việc, số luồng hoạt động cao nhất là 2.
- PASS runtime: lô Drive B-1791975828563-6z9qp tạo 2 PNG đồng thời, peak_active=2, cả hai hoàn tất.
- PASS runtime: lô Desk B-1791975877311-4hppv tạo 1 PNG và hoàn tất.
- PASS visual: cả 3 storyboard có 4 cảnh, số 1–4, timeline 0–7/7–15/15–23/23–30, text và CTA. Không có thẻ cam; khuôn mặt đúng ảnh tham chiếu của page.
- Desk ban đầu: hộp chữ ở khung 2/3 chạm mặt. Đã sửa bằng built-in imagegen, dời chữ khỏi mặt, lưu v2 và cập nhật URL hiển thị.
- PASS tải ảnh: GET ảnh có Content-Type=image/png và Content-Disposition=attachment với đúng tên file.
- PASS khôi phục: tải lại trang và khởi động lại server vẫn lấy được 2 lô đã hoàn tất; page, số lượng, số luồng khôi phục đúng.
- PASS giao diện: chọn lịch sử để xem lại 2 ảnh Drive; ảnh và prompt 30s hiện cạnh nhau, có nút copy và vùng chọn prompt. Công cụ đọc clipboard của host trả trống nên chưa xác thực được việc đọc lại clipboard. Code ưu tiên native copy, rồi Clipboard API, cuối cùng giữ vùng chọn để copy thủ công nếu browser chặn.
- Chưa chạy Flow/MP4: đầu ra yêu cầu ở lượt này là PNG và master prompt 30s. Mỗi renderer có giới hạn clip riêng.

Built-in imagegen đã tạo 2 ảnh nhân vật và sửa vị trí chữ trên ảnh Desk. Runtime app đã tạo 3 storyboard bằng provider OAuth sẵn có của tool cũ. Prompt thực tế và metadata nằm trong generated/batches.
