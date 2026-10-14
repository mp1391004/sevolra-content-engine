# Sửa logic người – xe – ghế

Ngày 14/10/2026. Lỗi từ phản hồi ảnh của người dùng: khung 1/2/4 đặt người trong cabin hoặc cạnh ghế lái trống, thiếu quan hệ rõ giữa ghế tài xế và vô-lăng.

## Thay đổi
- Thêm cabin tham chiếu DRIVE-CAB-01: xe Mỹ tay lái trái, đúng hai ghế trước, vô-lăng/dashboard trước ghế lái, cửa trái mở, bậc lên xuống và sàn cabin nâng cao.
- Khóa vị trí nhân vật: ngoài mặt đất ở khung 1/2/4; ngồi ghế tài xế ở khung 3. Đệm ở ghế lái, không ở ghế phụ. Khung 2 cầm đệm bên ngoài xe.
- Cùng cửa lái và hướng cabin xuyên suốt, không đổi camera sang ghế phụ hoặc tự sinh khoảng đứng giữa ghế.
- Tạo lại hai ảnh bằng edit có tham chiếu cabin, sản phẩm và nhân vật; giữ số khung, thời gian, text, CTA, khuôn mặt.
- Cập nhật prompt ảnh và master prompt video của lô Drive đang mở, không chỉ sửa PNG.
- Runtime thêm kiểm tra ảnh sau gen, tối đa một lượt sửa khi fail và kiểm tra lại. Chỉ QA pass mới có nhãn “sẵn sàng”; unverified/fail giữ trạng thái cần chỉnh.

## Kiểm tra thực tế
- Bộ kiểm tra input đã chặn standing_in_cabin, seated_passenger, between_seats và đặt đệm ở ghế phụ. 38 tổ hợp KB/page/caption vẫn qua kiểm tra timeline 30s và CTA.
- Vision review trên ảnh cũ: FAIL, nhận ra vị trí người trong cabin ở khung 1/2/4 và cảnh thiếu điểm neo không gian.
- Vision review trên hai ảnh mới: PASS cả 8 khung. Người đứng ngoài xe ở 1/2/4; ghế lái/vô-lăng/chân trong footwell đúng ở 3; mặt, chữ và CTA còn rõ.
- Tôi cũng kiểm tra trực tiếp hai PNG: cửa trái, bậc lên xuống, sàn nâng cao và vùng ngoài xe nhìn được; ghế và vô-lăng giữ đúng tương quan trước/sau.
- Kết quả review: Drive-layout-1-qa.json và Drive-layout-2-qa.json. Ảnh cũ giữ lại để truy lỗi; URL mặc định trong lô đã thay bằng *-layout-v2.png.

Vision QA là một bước kiểm tra, không phải bảo đảm mọi ảnh tương lai đều đúng. Runtime có thể báo cần chỉnh nếu review không trả kết quả hoặc chưa đạt. Luồng tự sửa một lần đã được triển khai; lượt này hai ảnh được sửa bằng built-in imagegen và kiểm tra bằng cùng module vision QA, chưa cần kích hoạt nhánh sửa tự động qua provider.
