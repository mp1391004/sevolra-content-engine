# Visual Bible — 2 nhân vật cố định

DRIVE-01: Mike, male truck driver 48, salt-and-pepper beard, navy work shirt, tan cap. Identity portrait assets/characters/DRIVE-01.png.
DESK-01: Alex, male office/WFH worker 32, wavy dark brown hair, neat stubble, grey T-shirt. Identity portrait assets/characters/DESK-01.png.

Chỉ đúng nhân vật thuộc page; không thêm vợ/chồng/người nhận quà/cast mới. Góc quà kể bằng copy, mug hoặc cảnh product demo. Mọi panel phải nhìn được mặt. Đính portrait trong prompt, giữ mặt/cast/outfit toàn lô.

PRODUCT TOKEN: exact Sevolra cushion from official reference, seat and lumbar molded as one piece, tall curved back with vertical ribs, integrated tailbone cutout, contoured seat, black face and grey outer edge. Never two separate pads. Product reference assets/product/SEVOLRA-01.png.

Sheet hoàn chỉnh: 4 photographic panels 2×2, visible numbers 1–4, timestamps, exact English text and CTA. Không orange cards, không panel trống. QA trực tiếp số khung, spelling, CTA, khuôn mặt, form đệm. Sai thì edit đúng lỗi, giữ phần còn lại.

Motion: một hành động đơn giản hoặc camera move nhẹ mỗi khung. Không ấn foam/kéo khóa/lật đáy giả proof. Không X-ray đau hoặc hiệu ứng khỏi bệnh. Master video prompt target30s; không đưa số/grid vào video.


## Logic người–xe–ghế (bắt buộc)

Drive dùng cùng cabin Mỹ tay lái trái: ghế tài xế trước bên trái, ghế phụ trước bên phải, cả hai hướng về kính trước. Vô-lăng và dashboard nằm phía trước ghế tài xế. Reference: assets/environments/DRIVE-CAB-01.png. Trái/phải là phía của xe, không phải mép trái/phải của ảnh.

Khung 1/3/4: Mike ngồi ngay ngắn trên cùng ghế lái thẳng về dashboard, dùng góc nhìn khung 3 làm chuẩn; bỏ cảnh trưng đệm trên ghế trống ở khung 1/4. Chỉ khung 2 đứng ngoài cầm đệm, có vỏ xe/khung cửa/bậc lên xuống làm mốc. Không đứng giữa hai ghế, không đứng trong cabin trước, không ngồi ghế phụ cạnh ghế lái trống.

Khung 3: hông ngồi trên phần ngồi của đệm tại ghế tài xế; tựa đệm sau lưng, chân trong hốc chân, vô-lăng phía trước ngực. Đệm không đặt trên ghế phụ hoặc xoay sang ngang. Camera giữ ở ngoài cửa lái; không đổi hướng cabin giữa các khung.

Sau gen, kiểm tra ảnh thật từng khung: vị trí người, ghế, vô-lăng, bậc cửa, mặt, text và CTA. Ảnh PNG tồn tại không có nghĩa là đạt QA. Tool chạy kiểm tra ảnh và một lượt sửa khi phát hiện lỗi; nếu chưa đạt hoặc không kiểm tra được thì hiện “cần chỉnh”, không tự đánh dấu sẵn sàng.


## Hướng đệm, tỷ lệ và chữ trong storyboard
- Đệm thật 44 × 40 × 37 cm; cùng một kích thước trong cả bốn cảnh. Ghế dựng mẫu 55 × 50 cm chỉ dùng làm thước tỷ lệ, không phải thông số tất cả xe.
- Lưng đệm áp lưng ghế; đầu đệm hướng về vô lăng/dashboard, cùng trục ghế. Không xoay ra cửa để khoe mặt sản phẩm. Góc ngoài cửa lái thấy đệm nghiêng/ngang hợp lý.
- So sánh diện tích chiếm ghế, mép trước và khoảng vải ghế còn lộ trong khung 1/3/4, có tính đến phối cảnh và che khuất. Không tự phóng lớn khi nhân vật ngồi. Khung cầm đệm giữ gần thân, rộng xấp xỉ vai.
- Chữ chính/CTA không đặt ở 25% trên cùng. Drive: khung ngồi 1/3/4 chọn vùng trống 48–82% chiều cao (khung 3 ưu tiên 48–62%), khung cầm 2 ở 68–82%. Desk giữ khung 1/2/4 ở 68–82%, khung 3 ở 48–62%. Ưu tiên vùng nền/áo trống, tránh mặt, tay, đệm và vô lăng. Chừa 8% hai bên, tối đa 3 dòng; số khung/thời gian nhỏ vẫn góc trên.
- Kiểm ảnh thật từng khung: đúng hướng, đúng tỷ lệ, chữ hạ thấp và không che nội dung. Không đánh dấu đạt chỉ vì prompt có yêu cầu.


Chuẩn ghế mới: dùng assets/environments/DRIVE-SEATED-SHEET-01.png làm ảnh mẫu bố cục (khung 3 dưới trái). Khung 1/3/4 ngồi trên cùng ghế lái thẳng; khung 2 ngoài xe cầm đệm. Các phần trăm vị trí chữ là tâm gần đúng của hộp chữ; không yêu cầu mọi mép hộp nằm trong khoảng cứng. Ưu tiên chữ thấp dễ đọc, không che mặt/đệm và không cắt mép.
