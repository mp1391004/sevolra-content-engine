# Bản chia sẻ 1.2 — OAuth và10 luồng

- Bộ xử lý nhận1–10 luồng; test12 job đạt peak10, giá trị11 bị chặn. Chưa chạy10 ảnh thật cùng lúc; giới hạn GPT phụ thuộc tài khoản.
- Nút đăng nhập qua Codex CLI: mở OAuth OpenAI, trình duyệt chỉ nhận URL/trạng thái. Không gửi token hoặc raw log ra UI. Test mô phỏng kiểm starting/waiting/ready/error và chỉ khởi động1 tiến trình đăng nhập.
- Trên máy này nút GPT nhận phiên đã có; không đăng xuất hay thay phiên hiện tại để kiểm tài khoản khác. Chưa kiểm đăng nhập mới trên máy người nhận.
- Bộ khởi động cài Bun nếu thiếu, dependencies gpt-image0.1.0/Codex0.154.0 được khóa. Codex có thể chạy bằng Bun, không phụ thuộc Node có sẵn trên máy mới. Đã kiểm bun install frozen, bộ test, API health/auth trên macOS.
- Windows/Linux có bộ khởi động nhưng chưa kiểm trên máy thật. Adapter ảnh OAuth là gpt-image bên thứ ba kế thừa tool cũ; không coi là API ảnh được OpenAI cam kết hỗ trợ.
- Lô Drive đang hiện dùng ghế thẳng: khung1/3/4 ngồi trên cùng ghế lái, khung2 cầm đệm ngoài xe. Hai QA cuối đạt.
