# Lưu ý phiên bản

Bản hiện hành: [QA-30s.md](QA-30s.md). Nội dung dưới đây là lịch sử trước yêu cầu30s/2nhânvật/chạylô.

# Sevolra — kết quả test 14/10/2026

| Kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| 8 KB, 34 CAP, 47 scene | PASS | data.json |
| Lọc KB/page/CAP | PASS | 38 tổ hợp hợp lệ; sai page/CAP bị từ chối |
| Timeline liên tục | PASS | KB-01 58s/12 cảnh; KB-03 25s/6 cảnh; toàn kho không hở thời gian |
| CTA caption/end card/VO cuối | PASS | CTA lấy từ dòng cuối caption; 1 hành động |
| Không lẫn robe/COZY, bệnh/bác sĩ/urgency giả | PASS bộ text kiểm tra | tests/check.mjs; source nguyên bản vẫn giữ để truy nguồn |
| Giao diện chọn Desk + CAP-0303 | PASS | Browser hiển thị KB-03, 25s, đủ 6 cảnh |
| Xuất Markdown/JSON | PASS | KB-01-Drive.md/json và KB-03-Desk.md/json qua CLI; download UI chưa xác nhận: host không trả event tải file |
| Drive sheet ban đầu | FAIL | Cảnh đầu tự sinh cột sống đỏ; không dùng bản này |
| Drive sheet v2 | PASS bố cục | Edit bỏ X-ray; các cảnh sản phẩm còn đệm liền khối, gân dọc, rãnh và viền xám |
| Desk sheet ban đầu | FAIL | Panel 4 tự bịa hình đáy/vỏ, không dùng |
| Desk sheet v2 | PASS bố cục | Panel 4 đổi về beauty shot đệm liền khối; giữ page/set/cast |
| Chi tiết hình học tuyệt đối & fidelity từng keyframe | CHƯA XÁC NHẬN | Sheet là preview, không phải toàn bộ keyframe sản xuất; số gân/proportion cần QA từng ảnh full-size |
| Chữ trên video | PASS metadata, cần duyệt bản dựng | Text dựng bằng overlay; vị trí x100 y220 w800, font 58px. Sheet không chứa chữ |
| Đáy chống trượt, vỏ tháo giặt | THIẾU ẢNH CẬN THẬT | Bộ 10 ảnh website có claim nhưng không có thao tác/ảnh cận tương ứng. Dùng beauty shot tạm, không AI bịa proof |
| Flow video / MP4 | CHƯA CHẠY | Có prompt + edit spec; chưa tạo clip/video |
| Kết nối tool vào Penny OS remote plugin | CHƯA CÀI | Source tool và bộ GPT/Codex bàn giao; chưa chỉnh plugin đang kết nối |

Đầu ra test dùng CAP-0103 (Drive chuyển đổi) và CAP-0303 (Desk chuyển đổi), cùng CTA Link in bio. Cần bio có link trước đăng. Giá bundle và chính sách từ context 11/10, giá đơn kiểm tra live 14/10. Không dùng Ends Tonight khi chưa có deadline.

Bản v1 chỉ giữ làm bằng chứng lỗi, không dùng sản xuất. Bản v2 là bản review hiện tại. Built-in imagegen đã thực sự chạy 2 generation + 2 edit; prompt và reference lưu trong các tests/generation-record.md. Không có số liệu views/orders thực tế.
