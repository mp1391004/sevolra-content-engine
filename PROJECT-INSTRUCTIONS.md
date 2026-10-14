# Sevolra Content Engine — storyboard 30 giây

Chỉ sản phẩm Sevolra™ Orthopedic Cushion, thị trường Mỹ. Trao đổi tiếng Việt; text và prompt tiếng Anh Mỹ. Các quyết định hiện hành dưới đây thay cấu trúc 58s/25s và checkpoint của bản trước.

## Đầu ra hiện hành
- Người dùng chọn page Drive/Desk, KB, caption, số lượng 1–12 và số luồng 1–4.
- Mỗi video đúng 30 giây, đúng 4 khung: 1 (0–7s), 2 (7–15s), 3 (15–23s), 4 (23–30s).
- Một ảnh storyboard ghép 2×2, ghi số 1–4, timecode, text và CTA ngay trong các khung. Mọi khung là cảnh ảnh, không thẻ màu cam hoặc nền chữ trống.
- Chỉ 2 nhân vật toàn bộ hệ thống: Mike DRIVE-01 và Alex DESK-01. Drive dùng Mike, Desk dùng Alex. Hiện portrait để nhìn rõ mặt. Giữ nguyên mặt, tóc, trang phục trong cả lô; không thêm vợ/người nhận quà hay cast thứ ba. Góc quà được kể bằng text/đạo cụ.
- Đầu ra UI phải hiện ảnh thật đã tạo, link tải PNG, full prompt 30s trong ô đọc được và nút copy. Không thay ảnh bằng bảng text hoặc link ẩn.
- Một master prompt 30s cho toàn bộ storyboard, đọc panel 1→4 thành 4 shot toàn màn hình. Không animate nguyên grid; không đưa số panel/timecode của sheet vào video.

## Nguồn và cách dùng
Đọc knowledge/01-PRODUCT-BIBLE.md, 02-AUDIENCE-PRINCIPLES.md, 09-STORYBOARD-FRAMEWORK.md, 10-VISUAL-BIBLE.md. data.json giữ concept/caption đã sửa; draft30 trong engine.mjs là bản chuyển 30s hiện hành. SOURCE-* chỉ để truy nguồn, không khôi phục claim, timing hay cấu trúc cũ.

App chạy npm start. Runtime dùng lại kết nối GPT Image OAuth đã có của tool cũ; count và parallel được kiểm tra, tối đa 4 image job chạy trên toàn server. Ảnh lỗi hiện trạng thái thật; không gắn ảnh cũ giả làm ảnh mới. Lô và ảnh lưu generated/batches và generated/images để reload không mất kết quả. Đính official product reference + portrait của đúng page cho mọi storyboard.

CLI: node tool.mjs KB-01 Drive CAP-0103 output.md → một package 30s. App mới tạo ảnh; CLI chỉ xuất package/prompt. npm test kiểm tra 38 package hợp lệ và worker song song.

## Hình và copy
Ảnh storyboard hoàn chỉnh phải chứa số/text/CTA theo yêu cầu người dùng. Đây thay luật “không chữ trong ảnh” của bản trước. Clip dùng text đúng như sheet; không đưa grid hoặc số khung vào video. Khóa sản phẩm: seat/lumbar liền khối, gân dọc, rãnh xương cụt, mặt đen viền xám theo reference. Không AI bịa đáy/vỏ/đàn hồi như proof. Không bác sĩ, chữa bệnh, review giả, before/after sức khỏe, deadline giả.

Prompt có tổng timeline 30s. Renderer có giới hạn clip riêng: master prompt vẫn mô tả toàn video; chưa có clip thì không nói đã xuất MP4 30s.

Penny OS project: data/01-work/12-dropship-khanh/02-sevolra-orthopedic-cushion/. Khi connector có, đọc context mới nhất trước lưu; không tự ghi trạng thái done hoặc tạo ticket mới. Source repo: mp1391004/dropship-khanh-content-engine, folder SEVOLRA.


## Kiểm tra logic bố cục sau ảnh
Drive có blocking cố định trong spatial.mjs: ngồi ngay ngắn trên cùng ghế lái ở khung 1/3/4, chỉ khung 2 ngoài mặt đất cầm đệm. Dùng cabin reference cùng portrait và product reference. Trước gen chạy assertSpatialPlan; sau gen chạy visual-qa.mjs trên chính PNG. Nếu fail, sửa đúng lỗi một lượt và kiểm tra lại; nếu chưa pass, giữ ảnh nhưng báo cần chỉnh. Không gọi ảnh “đạt” chỉ vì có đúng mặt, sản phẩm hoặc text. Kết quả QA phải quan sát vị trí người/ghế/vô-lăng thật sự trong ảnh.


## Hướng đệm, tỷ lệ và chữ trong storyboard
- Đệm thật 44 × 40 × 37 cm; cùng một kích thước trong cả bốn cảnh. Ghế dựng mẫu 55 × 50 cm chỉ dùng làm thước tỷ lệ, không phải thông số tất cả xe.
- Lưng đệm áp lưng ghế; đầu đệm hướng về vô lăng/dashboard, cùng trục ghế. Không xoay ra cửa để khoe mặt sản phẩm. Góc ngoài cửa lái thấy đệm nghiêng/ngang hợp lý.
- So sánh diện tích chiếm ghế, mép trước và khoảng vải ghế còn lộ trong khung 1/3/4, có tính đến phối cảnh và che khuất. Không tự phóng lớn khi nhân vật ngồi. Khung cầm đệm giữ gần thân, rộng xấp xỉ vai.
- Chữ chính/CTA không đặt ở 25% trên cùng. Drive: khung ngồi 1/3/4 chọn vùng trống 48–82% chiều cao (khung 3 ưu tiên 48–62%), khung cầm 2 ở 68–82%. Desk giữ khung 1/2/4 ở 68–82%, khung 3 ở 48–62%. Ưu tiên vùng nền/áo trống, tránh mặt, tay, đệm và vô lăng. Chừa 8% hai bên, tối đa 3 dòng; số khung/thời gian nhỏ vẫn góc trên.
- Kiểm ảnh thật từng khung: đúng hướng, đúng tỷ lệ, chữ hạ thấp và không che nội dung. Không đánh dấu đạt chỉ vì prompt có yêu cầu.


Chuẩn ghế mới: dùng assets/environments/DRIVE-SEATED-SHEET-01.png làm ảnh mẫu bố cục (khung 3 dưới trái). Khung 1/3/4 ngồi trên cùng ghế lái thẳng; khung 2 ngoài xe cầm đệm. Các phần trăm vị trí chữ là tâm gần đúng của hộp chữ; không yêu cầu mọi mép hộp nằm trong khoảng cứng. Ưu tiên chữ thấp dễ đọc, không che mặt/đệm và không cắt mép.
