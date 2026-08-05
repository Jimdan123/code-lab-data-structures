# Code Lab — Kịch bản thuyết trình (6 trạm cấu trúc dữ liệu)

**Cách dùng:**
- **Say** = lớp đơn giản, đọc cho khán giả nói chung.
- **🔧 Kỹ thuật** = lớp chi tiết — cơ chế thật, công thức, độ phức tạp — dùng khi khán giả rành chuyên môn hoặc còn giờ đào sâu.
- **Bấm** = đúng nút cần bấm, theo đúng thứ tự.
- **Chốt** = một câu chốt ý nếu chỉ còn vài giây.
- **Nếu bị hỏi** = câu trả lời dự phòng, không cần đọc trước — chỉ dùng khi có người hỏi đúng câu đó.

⏱ Tổng thời lượng ước tính: **~5 phút** nếu chỉ đọc phần Say · **~10 phút** nếu có thêm phần Kỹ thuật.

---

## 01 · Circular Buffer — Băng chuyền sushi 🍣

**Say**
> "Đây là Circular Buffer — bộ đệm vòng. Tưởng tượng một băng chuyền sushi **6 chỗ cố định**, không bao giờ phình to ra được."
>
> "2 đầu bếp đặt đĩa, 6 khách gắp đĩa, cùng lúc quanh băng chuyền. Chạy hết chỗ cuối, băng **tự quay lại chỗ đầu** — không cần cấp thêm bộ nhớ."

**🔧 Kỹ thuật**
Cấu trúc thật: mảng cố định `buf[N]`, hai chỉ số **w** (ghi tiếp theo), **r** (đọc tiếp theo), và một biến đếm **count**.

- `write(x)`: `buf[w]=x; w=(w+1)%N; count++`
- `read()`: `x=buf[r]; r=(r+1)%N; count--`

Phép `% N` là chia lấy dư — "quay vòng" bằng số học, không dịch chuyển phần tử nào cả, nên cả hai thao tác đều **O(1)** thời gian, **O(N)** không gian, không cấp phát lại bao giờ.

**Bấm**
`🍣 Xem theo chủ đề` (mặc định) → `▶ Tự động` — sâu hơn thì chuyển `🔧 Xem kỹ thuật` và bấm nút Ghi 1 / Đọc 1 để tự tay điều khiển.

**Chốt**
🔑 Ghi và đọc đều **O(1)** — không dịch chuyển gì cả. Đánh đổi: kích thước phải cố định từ đầu.

**Nếu bị hỏi:** *"2 con trỏ trùng nhau thì sao?"*
→ Không thể biết ĐẦY hay RỖNG chỉ từ 2 con trỏ đó — cần thêm một biến đếm số phần tử đang giữ.

---

## 02 · Stack & Call Stack — Chồng đĩa · lời gọi hàm 🥞

**Say**
> "Stack là chồng đĩa LIFO — vào sau, ra trước. Nhưng phần hay nhất: **CPU dùng đúng cấu trúc này để chạy mọi lời gọi hàm**."
>
> "Mỗi lần một hàm được gọi, một **khay mới** — gọi là stack frame — được dựng chồng lên trên. Khay giữ biến cục bộ của hàm, và một **ghi chú đường về** để quay lại đúng chỗ đang gọi khi hàm chạy xong. Hàm nào chạy xong trước thì khay đó **biến mất trước**."
>
> "Biến global thì khác hẳn — nó không nằm trong khay của hàm nào cả, mà sống ở một chỗ riêng suốt từ đầu tới cuối chương trình, nên hàm nào cũng dùng chung được."

**🔧 Kỹ thuật**
Mục 03 mô phỏng đúng cách CPU chạy: mỗi khay chỉ giữ đúng những gì hàm đó cần — **biến cục bộ** của riêng nó, và **địa chỉ để quay lại** đúng chỗ đang gọi. Bấm ▶▶ Tự động, xem khay "sáng lên" khi hàm được gọi và biến mất khi hàm return. Khung "Stack lúc này" hiển thị mỗi lời gọi hàm như một khay riêng, khay đang chạy viền vàng, khay đang chờ mờ hơn — không có thanh ghi hay địa chỉ bộ nhớ nào hiện ra, chỉ có tên hàm + biến cục bộ của nó.

Điểm đáng chỉ ra: khi hàm return, khay **không hề bị xoá** — nó chỉ không dùng nữa, và sẽ bị khay của lần gọi kế tiếp ghi đè lên. Đây là gốc bug kinh điển trong C: trả về địa chỉ của một biến cục bộ, con trỏ đó sẽ trỏ vào vùng đã "bỏ hoang" (dangling pointer).

Góc bảo mật (mục 05): biến cục bộ nằm ngay trước phần "ghi chú đường về" trên khay — code không kiểm tra độ dài dữ liệu ghi vào biến cục bộ có thể khiến dữ liệu tràn ra, ghi đè luôn ghi chú đó và đổi hướng chạy của cả chương trình (buffer overflow).

**Bấm**
Mục 02 (khay chồng lên nhau, có luôn phần biến global) → Mục 03 · Mô phỏng call stack → `▶▶ Tự động` hoặc `Tiến ▶` (dừng đúng lúc giải thích)

**Chốt**
🔑 Khay xếp chồng lên nhau nên hàm gọi sau luôn **kết thúc trước**. Gọi chính mình mãi không dừng → chồng khay tràn ra ngoài — Stack Overflow.

**Nếu bị hỏi:** *"lệnh gọi hàm đẩy cái gì lên stack?"*
→ Chỉ **địa chỉ trả về** thôi. Tham số và "ghi chú đường về" của hàm cha là hai chuyện khác, xảy ra ở hai thời điểm khác trong lúc dựng khay.

---

## 03 · Hash Table — Lễ tân khách sạn 🛎️

**Say**
> "Hash Table tra cứu theo khoá mà **không cần dò từng phần tử** — như lễ tân khách sạn tính thẳng số phòng, không cần tra sổ."
>
> "Khách tới, tay đã cầm sẵn **chìa khoá phòng** — chìa khoá đã ghi rõ số phòng, khách đi thẳng tới đó, khỏi cần hỏi lễ tân. Hai khách tính trùng phòng thì gọi là **va chạm (collision)** — họ ở ghép chung theo danh sách nối."

**🔧 Kỹ thuật**

*Hàm băm kiểu Java* — polynomial rolling hash: `h = h×31 + charCode(c)` cho từng ký tự, tràn số kiểu wraparound 32-bit. Nhanh, **tất định** (cùng input luôn ra cùng output) — tiện cho cache, debug, tái lập kết quả. Nhưng chính vì tất định và công thức công khai, ai cũng **tính ngược** ra được hàng loạt chuỗi khác nhau cùng băm ra 1 giá trị — đây là lỗ hổng **hash-flooding**: gửi một request chứa hàng nghìn khoá cố tình trùng bucket, biến O(1) trung bình thành O(n) mỗi lần chèn. Từng có CVE thật trên PHP/Java/ASP.NET… làm treo cả server chỉ với vài KB dữ liệu độc hại.

*SipHash* — không phải "băm ngẫu nhiên", mà là hàm băm có **khoá bí mật 128-bit** (seed) sinh đúng 1 lần khi chương trình khởi động, rồi trộn input qua nhiều vòng cộng/xoay/xor dùng khoá đó. Không biết khoá thì không đoán trước được kết quả → kẻ tấn công **không thể tính trước** chuỗi nào sẽ va chạm (Python, Rust, Ruby đều đổi sang SipHash làm mặc định vì lý do này). Đánh đổi: chậm hơn phép nhân đơn giản kiểu Java, và **không tất định giữa các lần chạy** — cùng 1 chuỗi, khởi động lại chương trình sẽ ra hash khác.

*Va chạm — vấn đề thật sự* không phải "thỉnh thoảng 2 khoá trùng ô" như chuyện vặt, mà là: đủ va chạm sẽ kéo O(1) trung bình về gần O(n) — và điều đó **có thể bị ép xảy ra**, không chỉ do xui. Chaining: bucket nào dồn nhiều khoá thì list dài ra, ca xấu nhất mọi khoá dồn về 1 bucket → hash table sập về đúng độ phức tạp của cách "dò từng cái" ban đầu. Open addressing (linear probing): khoá dồn cục thành "cụm" liền kề, khoá mới rơi gần cụm phải dò qua cả cụm — nên bảng phải giữ tải dưới ~70% và resize kịp thời.

**Bấm**
`🛎️ Xem theo chủ đề` → `▶ Tự động` — sâu hơn: `🔧 Xem kỹ thuật` → "Băm thử chuỗi này" (từng ký tự thật), "Chaining vs Open Addressing" (từng bước), "SipHash vs hàm băm kiểu Java" (so sánh + đổi seed).

**Chốt**
🔑 Tra cứu trung bình **O(1)** — cực nhanh. Đánh đổi: không giữ thứ tự chèn, cần hàm băm tốt để tránh dồn cục.

**Nếu bị hỏi:** *"va chạm có phải lỗi hàm băm không?"*
→ Không. Với đủ nhiều khách, va chạm **chắc chắn xảy ra** — giống nghịch lý ngày sinh — không liên quan gì tới việc hàm băm viết đúng hay sai.

---

## 04 · AVL Tree — Mobile cân bằng 🎐

**Say**
> "Cây tìm kiếm nhị phân (BST) tìm nhanh **khi cân đối** — nhưng chèn 1,2,3,4,5 theo thứ tự tăng dần thì nó biến thành một đường thẳng, chậm y hệt mảng thường."
>
> "AVL Tree là BST có thêm đúng một luật: tại **mọi node**, hai nhánh con lệch chiều cao tối đa 1 tầng. Lệch quá, nó **tự xoay lại ngay** — có 4 kiểu xoay tuỳ hướng lệch: LL, RR, LR, RL."

**🔧 Kỹ thuật**

*Chiều cao được tính từ dưới lên*, node nào cũng vậy:
```
height(rỗng) = 0
height(node) = 1 + max(height(trái), height(phải))
```
Ví dụ cụ thể (cây chèn 30→20→10, một đường thẳng): lá `10` không con → `h=1`. `20` có con trái `10` (h=1) → `h = 1+max(1,0) = 2`. `30` có con trái `20` (h=2) → `h = 1+max(2,0) = 3`. Không thể tính chiều cao một node trước khi biết chiều cao 2 con của nó — đó là lý do nó luôn được tính **từ lá lên gốc**, ngay trong lúc đệ quy insert quay lui.

*Hệ số cân bằng:* `bf(node) = height(trái) − height(phải)`, hợp lệ khi ∈ {−1, 0, 1}. Sau mỗi lần chèn, đi ngược lên gốc, cập nhật height rồi tính lại bf tại từng node — gặp `|bf| > 1` ở đâu thì xoay ở đó.

*Cơ chế xoay thật* (LL — xoay phải, ví dụ node lệch `z` có con trái `y`): `y` trở thành gốc mới; `z` tụt xuống làm **con phải** của `y`; nhánh con-phải-cũ-của-`y`(nếu có) chuyển thành **con trái mới** của `z`. Chỉ đổi 3 con trỏ, không tính toán lại gì khác — cực rẻ. LR/RL là xoay kép: xoay ở con trước để đưa nó về đúng dạng thẳng (LL hoặc RR), rồi xoay lần 2 ở gốc như bình thường.

Demo "Xem 1 ca xoay thật" (mục 03, ngay dưới 4 thẻ LL/RR/LR/RL) cho chọn ca, thấy chiều cao & bf **thật** trước khi xoay (node lệch viền cam), rồi bấm để xoay thật (dùng đúng hàm `rotR`/`rotL` mà demo insert chính cũng dùng) và xem nó cân bằng lại (viền chuyển xanh dương, bf=0) — không chỉ đọc tên gọi.

*Nếu bị hỏi sâu hơn:* `std::map` (C++) và `TreeMap` (Java) thực ra dùng **Red-Black Tree**, không phải AVL — Red-Black cân bằng lỏng hơn nên xoay ít hơn khi ghi nhiều; AVL cân chặt hơn nên tra cứu nhỉnh hơn khi đọc nhiều.

**Bấm**
`🎐 Xem theo chủ đề` → `▶ Tự động` — sâu hơn: mục 03 → chọn 1 trong 4 nút LL/RR/LR/RL rồi bấm "⏭ Xoay" (2 bước với LR/RL); hoặc mục 05 (`🔧`) → "Cây thường vs AVL".

**Chốt**
🔑 Đảm bảo tìm/chèn/xoá luôn **O(log n)**, không bao giờ rơi vào ca xấu. Đánh đổi: cài đặt phức tạp hơn nhiều — 4 ca xoay.

**Nếu bị hỏi (quiz gốc):** *"chèn 1,2,3,4,5 vào BST thường thì sao?"*
→ Cây **nghiêng hẳn thành đường thẳng** — không hề cân, mất luôn lợi thế O(log n).

---

## 05 · Segment Tree — Doanh thu bán hàng theo ngày 📈

**Say**
> "Segment Tree trả lời 'tổng một khoảng' và 'sửa 1 phần tử' **rất nhiều lần liên tục** — như chủ quán phải hỏi tổng doanh thu một khoảng ngày suốt cả tháng."
>
> "Thay vì cộng lại từ đầu mỗi lần, doanh thu từng ngày được gộp thành **cụm đã tính sẵn tổng**. Hỏi tổng một khoảng ngày chỉ cần cộng vài cụm; sửa doanh thu 1 ngày chỉ cần cập nhật lại các cụm cha phía trên nó."

**🔧 Kỹ thuật**
Mảng `seg[]` cỡ ~4N biểu diễn 1 cây nhị phân đầy đủ: node `v` có 2 con `2v` và `2v+1`; `seg[v]` = tổng đoạn `[l,r]` mà v phụ trách.

Truy vấn `sum(l,r)` chỉ có 3 ca tại mỗi node: **NGOÀI** (không giao → trả 0, dừng), **TRỌN** (nằm hết trong khoảng hỏi → trả thẳng `seg[v]`, dừng), **DÍNH** (giao 1 phần → đệ quy xuống cả 2 con rồi cộng dồn).

`update(idx,val)` chỉ đi đúng 1 đường từ gốc xuống lá, sửa xong đi ngược lên cập nhật các node cha. Vì cây cao O(log n), mọi thao tác chỉ chạm tối đa O(log n) node.

**Bấm**
`📊 Xem theo chủ đề` → `▶ Tự động` — sâu hơn: `🔧` → "Xây cây (build)" rồi tự nhập l/r cho `sum(l..r)`, hoặc idx/val cho `update(idx,val)`.

**Chốt**
🔑 Cả hỏi tổng lẫn sửa 1 ô đều **O(log n)** thay vì O(n). Đánh đổi: tốn bộ nhớ hơn mảng gốc một chút.

**Nếu bị hỏi (quiz gốc):** *"cụm GIAO một phần khoảng đang hỏi thì sao?"*
→ Không bốc thẳng giá trị của cụm — phải **đi tiếp xuống 2 con** rồi cộng dồn kết quả lại (đây là ca DÍNH).

---

## 06 · Quadtree — Bản đồ ghim vị trí 🗺️

**Say**
> "1 triệu ghim trên bản đồ, mỗi khung hình phải hỏi 'ghim nào đang trong khung nhìn' — quét hết từng ghim thì **quá chậm**."
>
> "Quadtree chia bản đồ thành ô; ô nào đông ghim quá sức chứa thì **tự chẻ làm 4**, ô thưa thì giữ nguyên. Khi tìm kiếm, ô nào không chạm vùng cần tìm thì **cắt cả nhánh**, khỏi cần xét bên trong."

**🔧 Kỹ thuật**

*Một node lưu gì?* Chỉ là 1 object nhỏ:
```
node = { cx, cy, half, depth, points: [], nw, ne, sw, se }
```
`cx, cy, half, depth` tả hình vuông node đại diện (cố định sau khi tạo, không đổi). `points` là các ghim **thật sự nằm trong ô này** (tối đa CAP cái, trừ khi đã chạm MAX_DEPTH). `nw/ne/sw/se` là 4 ô con — `null` nghĩa là node này **chưa chẻ**, vẫn còn là lá; code kiểm tra "đã chẻ chưa" chỉ bằng `if (!node.nw)`.

*Chia ô thật sự là chia hình học*, không liên quan gì tới điểm: `subdivide()` lấy nửa cạnh hiện tại, chia đôi, rồi lệch tâm 4 hướng — ra đúng 4 ô con NW/NE/SW/SE khít nhau, không chồng không hở. Một điểm rơi vào ô nào chỉ cần **2 phép so sánh**: so `x` với tâm (trái/phải), so `y` với tâm (trên/dưới).

*Điểm quan trọng dễ hiểu lầm:* khi 1 ô đầy (đủ CAP) và có điểm mới rơi vào, nó **chẻ làm 4 ô con rỗng** — nhưng các điểm cũ đang có trong ô đó **không hề bị chuyển vào 4 ô con**, chúng cứ nằm nguyên ở node cha. Chỉ có điểm MỚI (và mọi điểm chèn sau đó) mới thật sự được đẩy xuống 1 trong 4 ô con. Nói cách khác: một ô đã "chẻ" thì vẫn giữ nguyên các điểm gốc của nó — con của nó chỉ chứa những gì tới sau.

*Tìm gần nhất* (nguồn tăng tốc chính): so khoảng cách từ điểm hỏi tới cạnh gần nhất của bounding box mỗi node — xa hơn bán kính đang tìm thì **cắt cả nhánh** (pruned), khỏi cần xét bên trong.

**Bấm**
`🗺️ Xem theo chủ đề` → `▶ Tự động` — sâu hơn: `🔧` → "Ảnh hưởng của CAP" (đổi CAP, rải lại cùng bộ điểm) hoặc "Tìm gần nhất" (xem nhánh nào bị cắt).

**Chốt**
🔑 Tự thích nghi theo mật độ dữ liệu — vùng đông chia nhỏ, vùng thưa giữ nguyên 1 ô lớn. Đánh đổi: cài đặt và cân bằng bộ nhớ phức tạp hơn.

**Nếu bị hỏi (quiz gốc):** *"đủ CAP nhưng đã chạm MAX_DEPTH thì sao?"*
→ **Không chẻ tiếp** — ô giữ điểm dư lại, chấp nhận vượt CAP một chút thay vì chẻ vô hạn.

---

*6 trạm là 6 cách khác nhau để trả lời cùng một câu hỏi: **lưu dữ liệu ở đâu, để tìm cho nhanh?***
