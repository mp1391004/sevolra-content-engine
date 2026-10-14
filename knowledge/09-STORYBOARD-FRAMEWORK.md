# Storyboard hiện hành — 30 giây

Đúng 4 ảnh trong một sheet 2×2: số 1 (0–7s), 2 (7–15s), 3 (15–23s), 4 (23–30s). Không thẻ chuyển chương màu cam. Khung 1 hook, 2 cấu trúc/tính năng, 3 bối cảnh sử dụng, 4 payoff + CTA duy nhất đồng nhất caption. KB gốc là ý tưởng tham khảo, timing hiện hành theo draft30 trong engine.mjs.

Mặt cùng một nhân vật hiện rõ trong cả 4 khung; text nền tối trong suốt, không che mặt/gân/rãnh. Nhãn số + timing để đọc sheet, không phải overlay của video cuối. Prompt full30s đọc từng khung tuần tự thành shot fullscreen, không animate cả grid.

Sheet tạo ảnh 1536×2048 request size; output thực tế tùy provider. Video target 1080×1920. Khi gen keyframe riêng có thể cần crop/regenerate từng panel 9:16, không coi toàn sheet là một frame video.
