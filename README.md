# Sevolra Content Engine 1.3

Tạo một ảnh storyboard gồm bốn cảnh đánh số cho video 30 giây, có chữ/CTA, ảnh tải được và prompt copy được. Hai nhân vật cố định: Mike (Drive), Alex (Desk). Chọn 1–12 storyboard và 1–10 luồng, tổng tối đa 10 job hoạt động cùng lúc.

## Mở tool trên máy của bạn

1. Tải ZIP Sevolra hoặc tải [repo Sevolra trên GitHub](https://github.com/mp1391004/sevolra-content-engine), giải nén và mở thư mục chứa file `Khoi-dong-Sevolra`. Trong repo tool cũ, bản này nằm ở thư mục `SEVOLRA`.
2. macOS: mở `Khoi-dong-Sevolra.command`. Windows: mở `Khoi-dong-Sevolra.bat`. Linux: dùng file `.command` qua Bash. Bộ khởi động cài Bun từ nguồn chính thức nếu thiếu, cài phiên bản phụ thuộc đã khóa và mở localhost4329. Giữ cửa sổ khởi động khi dùng tool.
3. Bấm **Đăng nhập GPT**, hoàn tất đăng nhập ChatGPT trong cửa sổ OpenAI. Sau khi hiện **GPT OAuth sẵn sàng**, chọn tệp, concept, số lượng và tối đa **10 luồng** rồi tạo ảnh.

Mỗi người dùng tài khoản GPT của mình. Token OAuth do Codex CLI lưu riêng ngoài thư mục dự án; giao diện chỉ nhận trạng thái và URL đăng nhập. Không cần nhập API key hoặc gửi token cho người khác. Tài khoản đã đăng nhập qua tool cũ/Codex có thể được nhận sẵn.

Đăng nhập dùng Codex CLI chính thức. Tạo ảnh tiếp tục dùng adapter `gpt-image@0.1.0` của tool cũ với `--oauth` (adapter bên thứ ba, không phải API OAuth ảnh được OpenAI cam kết hỗ trợ). Quyền truy cập/hạn mức tài khoản quyết định khả năng tạo ảnh; chọn 10 luồng không tăng hạn mức GPT. Không phải website chỉ cần mở GitHub là chạy: bộ tạo ảnh và phiên đăng nhập chạy trên máy localhost của từng người.

Drive: khung1/3/4 cùng ghế lái thẳng, người ngồi ngay ngắn theo góc khung3 dưới trái; chỉ khung2 đứng ngoài cầm đệm. Bỏ cảnh trưng đệm trên ghế trống. Chữ hạ thấp, không che mặt/đệm. Tạo ảnh → kiểm ảnh bằng Codex → sửa một lần khi sai → kiểm lại. Chưa đạt thì giữ ảnh và báo cần chỉnh. Tool không tạo MP4; hai prompt15s dùng trong công cụ video, ghép thành30s.

Training: `PROJECT-INSTRUCTIONS.md`, `knowledge/`, `SKILL.md`. Kiểm: `bun run test`. Gói phụ thuộc khóa bằng `bun.lock`; ảnh/QA thực tế trong `tests/` và `generated/`. Bản gói chia sẻ không bao gồm node_modules hoặc phiên đăng nhập.

[OpenAI: đăng nhập ChatGPT trong Codex](https://learn.chatgpt.com/docs/auth). Đã kiểm macOS, localhost, phiên GPT hiện có và bộ kiểm10 worker. Chưa thử trên máy Windows/Linux hoặc đăng nhập tài khoản mới của người nhận.


## Prompt video ngắn — bản1.3
Video được chạy thành hai lượt15s riêng, rồi ghép thành30s. Giữ một ảnh storyboard4khung. Lượt1 dùng khung1/2 với local0–7/7–15s; lượt2 dùng khung3/4 với local0–8/8–15s. Mỗi prompt tự nhắc lại ảnh tham chiếu, mặt/trang phục, sản phẩm, tỷ lệ, ghế và bối cảnh/ánh sáng. Đính kèm cùng storyboard ở cả hai lượt; ảnh cuối lượt1 nếu có chỉ bổ sung khóa mặt/ánh sáng, không thay tư thế của khung3. Không trông chờ model nhớ lượt trước. CTA duy nhất ở cuối lượt2. Giao diện có copy riêng từng đoạn và copy cả2; lưu video_clips cùng lô, kể cả các lô có sẵn. Quy định này thay yêu cầu cũ chạy một lượt30s.
