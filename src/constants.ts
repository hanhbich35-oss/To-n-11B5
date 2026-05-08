import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'multiple',
    text: "Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a, tâm O, SA ⊥ (ABCD), SA = a√6. Khẳng định nào sau đây là ĐÚNG?",
    customComponent: "PyramidSABCD",
    options: ["(SBC) ⊥ (SAB)", "(SBC) ⊥ (SAD)", "(SBC) ⊥ (ABCD)", "(SBC) ⊥ (SCD)"],
    correctAnswer: 0,
    explanation: "Vì BC ⊥ AB và BC ⊥ SA nên BC ⊥ (SAB). Do đó (SBC) ⊥ (SAB)."
  },
  {
    id: 2,
    type: 'multiple',
    text: "Cho hình lập phương ABCD.A'B'C'D'. Góc giữa hai đường thẳng AB' và CD' bằng bao nhiêu?",
    customComponent: "CubeABCD",
    options: ["30°", "60°", "90°", "45°"],
    correctAnswer: 2,
    explanation: "CD' song song với BA'. AB' và BA' là hai đường chéo của hình vuông mặt bên, nên chúng vuông góc với nhau."
  },
  {
    id: 3,
    type: 'multiple',
    text: "Gieo một con xúc xắc. Gọi A là biến cố 'Số chấm chẵn' và C là biến cố 'Số chấm nhỏ hơn 4'. Biến cố giao A ∩ C là:",
    options: ["{1;2;3;5;6}", "{2}", "{2;4;6}", "{1;2;3}"],
    correctAnswer: 1,
    explanation: "A = {2, 4, 6}, C = {1, 2, 3}. Giao của hai tập hợp là {2}."
  },
  {
    id: 4,
    type: 'multiple',
    text: "Thể tích khối lăng trụ có diện tích đáy B = 6 và có chiều cao h = 2 là:",
    options: ["6", "4", "12", "24"],
    correctAnswer: 2,
    explanation: "V = B.h = 6 . 2 = 12."
  },
  {
    id: 5,
    type: 'multiple',
    text: "Dựa vào bảng tần số ghép nhóm, có bao nhiêu học sinh truy cập Internet từ 18,5 phút đến dưới 21,5 phút?",
    customComponent: "TimeTable",
    options: ["3", "12", "24", "2"],
    correctAnswer: 2,
    explanation: "Theo bảng dữ liệu trên đề bài, nhóm [18,5; 21,5) có số học sinh là 24."
  },
  {
    id: 6,
    type: 'multiple',
    text: "Cho hình chóp S.ABCD có đáy là hình vuông, SA ⊥ (ABCD). Góc giữa đường thẳng SC và mặt đáy (ABCD) là góc nào?",
    options: ["∠SAC", "∠SCB", "∠SCD", "∠SCA"],
    correctAnswer: 3,
    explanation: "Vì SA ⊥ (ABCD) nên hình chiếu của SC trên đáy là AC. Góc cần tìm là ∠SCA."
  },
  {
    id: 7,
    type: 'multiple',
    text: "Gieo súc sắc 2 lần. A: 'Lần 1 được 6', B: 'Lần 2 được 6'. Khẳng định nào sau đây SAI?",
    options: ["A và B là hai biến cố độc lập", "A ∪ B là biến cố 'Ít nhất một lần xuất hiện mặt 6'", "A ∩ B là biến cố 'Tổng số chấm bằng 12'", "A và B là hai biến cố xung khắc"],
    correctAnswer: 3,
    explanation: "A và B không xung khắc vì cả hai lần đều có thể xuất hiện mặt 6 chấm cùng lúc."
  },
  {
    id: 8,
    type: 'multiple',
    text: "Cho hình chóp S.ABCD có đáy là hình vuông, SA ⊥ (ABCD). Khẳng định nào sau đây ĐÚNG?",
    options: ["AD ⊥ (SBC)", "CD ⊥ (SCD)", "AD ⊥ (SAB)", "CD ⊥ (SBC)"],
    correctAnswer: 2,
    explanation: "AD ⊥ AB và AD ⊥ SA nên AD ⊥ (SAB)."
  },
  {
    id: 9,
    type: 'multiple',
    text: "Mẫu số liệu ghép nhóm về chiều cao học sinh (150-154, 154-158, 158-162, 162-166, 166-170) có bao nhiêu nhóm?",
    options: ["5", "6", "7", "12"],
    correctAnswer: 0,
    explanation: "Liệt kê các khoảng ta thấy có đúng 5 nhóm."
  },
  {
    id: 10,
    type: 'multiple',
    text: "Với các số thực dương a, b bất kỳ. Khẳng định nào sau đây ĐÚNG?",
    options: ["log(ab) = log a + log b", "log(a/b) = log a / log b", "log(a/b) = log b - log a", "log(ab) = log a . log b"],
    correctAnswer: 0,
    explanation: "Công thức logarit của một tích bằng tổng các logarit."
  },
  {
    id: 11,
    type: 'multiple',
    text: "Trong các hàm số sau, hàm số nào là hàm số mũ?",
    options: ["y = 5^x", "y = sin x", "y = x^5", "y = log_x 3"],
    correctAnswer: 0,
    explanation: "Hàm số mũ có dạng y = a^x."
  },
  {
    id: 12,
    type: 'multiple',
    text: "Cho chóp S.ABC có đáy vuông tại B, SA ⊥ đáy. Đường vuông góc chung của SA và BC là:",
    customComponent: "PyramidSABC",
    options: ["AB", "SB", "AC", "AH"],
    correctAnswer: 0,
    explanation: "AB ⊥ SA (vì SA ⊥ đáy) và AB ⊥ BC (vì đáy vuông tại B). Vậy AB là đường vuông góc chung."
  },
  {
    id: 13,
    type: 'multiple',
    text: "Cho chóp S.ABCD đáy hình vuông, SA ⊥ đáy. Góc nhị diện [B, SA, D] bằng bao nhiêu độ?",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: 3,
    explanation: "Vì SA ⊥ (ABCD), góc nhị diện này chính là góc ∠BAD của hình vuông đáy, bằng 90°."
  },
  {
    id: 14,
    type: 'multiple',
    text: "Với a là số thực dương tùy ý, √a³ bằng:",
    options: ["a^(2/3)", "a^6", "a^(1/6)", "a^(3/2)"],
    correctAnswer: 3,
    explanation: "Theo định nghĩa lũy thừa với số mũ hữu tỉ: √a³ = a^(3/2)."
  },
  {
    id: 15,
    type: 'multiple',
    text: "Cho tứ diện ABCD có AB ⊥ (BCD). Hình chiếu vuông góc của AC lên mặt phẳng (BCD) là:",
    options: ["AD", "BD", "BC", "AB"],
    correctAnswer: 2,
    explanation: "Vì AB ⊥ (BCD) nên B là hình chiếu của A lên (BCD). Hình chiếu của AC là BC."
  },
  {
    id: 16,
    type: 'multiple',
    text: "Cho hình chóp đều S.ABCD. Khẳng định nào sau đây ĐÚNG?",
    options: ["Đáy ABCD là hình vuông", "Đáy ABCD là hình chữ nhật", "Đáy ABCD là hình thang", "Đáy ABCD là hình bình hành"],
    correctAnswer: 0,
    explanation: "Hình chóp đều có đáy là đa giác đều, ở đây là hình vuông."
  },
  {
    id: 17,
    type: 'boolean',
    context: "Cho hàm số f(x) = -4x³ + (x²/2) - 2x + 3.",
    text: "Đạo hàm cấp hai của hàm số là f''(x) = -24x + 1.",
    correctAnswer: true,
    explanation: "f'(x) = -12x² + x - 2 => f''(x) = -24x + 1. Đúng."
  },
  {
    id: 18,
    type: 'boolean',
    context: "Cho hàm số f(x) = -4x³ + (x²/2) - 2x + 3.",
    text: "Đạo hàm của hàm số tại x = 0 bằng 2.",
    correctAnswer: false,
    explanation: "f'(x) = -12x² + x - 2. Tại x = 0, f'(0) = -2. Sai."
  },
  {
    id: 19,
    type: 'boolean',
    context: "Cho hàm số f(x) = -4x³ + (x²/2) - 2x + 3.",
    text: "Trong biểu thức f'(x) = ax² + bx + c của hàm số trên, ta có a + b + c = -10.",
    correctAnswer: false,
    explanation: "a = -12, b = 1, c = -2. Tổng là -13. Sai."
  },
  {
    id: 20,
    type: 'boolean',
    context: "Cho hàm số f(x) = -4x³ + (x²/2) - 2x + 3.",
    text: "Phương trình tiếp tuyến của đồ thị hàm số trên tại điểm M(0;3) là y = -2x + 3.",
    correctAnswer: true,
    explanation: "y = f'(0)(x-0) + f(0) = -2x + 3. Đúng."
  },
  {
    id: 21,
    type: 'multiple',
    text: "Nghiệm của phương trình √2 . 2^(3x+1) = 8 là:",
    options: ["x = 1/2", "x = 1", "x = 0", "x = 2"],
    correctAnswer: 0,
    explanation: "2^(1/2) * 2^(3x+1) = 2^3 => 3x + 1.5 = 3 => 3x = 1.5 => x = 0.5."
  },
  {
    id: 22,
    type: 'multiple',
    text: "Thể tích của bể cá hình hộp chữ nhật có kích thước 0,6m; 2m; 0,8m là:",
    options: ["0,96 m³", "1,2 m³", "0,48 m³", "1,5 m³"],
    correctAnswer: 0,
    explanation: "V = 0.6 * 2 * 0.8 = 0.96 m³."
  },
  {
    id: 23,
    type: 'multiple',
    text: "Cho chóp S.ABC có SA ⊥ (ABC), AB = a, SA = a√3. Góc phẳng nhị diện [A, BC, S] bằng bao nhiêu độ?",
    imageUrl: "https://placehold.co/600x400/indigo/white?text=Hinh+Chop+S.ABC",
    options: ["30°", "45°", "60°", "90°"],
    correctAnswer: 2,
    explanation: "Góc nhị diện là ∠SBA. tan(SBA) = SA/AB = √3 => góc 60°."
  },
  {
    id: 24,
    type: 'multiple',
    text: "Cho hình chóp cụt tứ giác đều có cạnh đáy nhỏ là 1m, cạnh đáy lớn là 2m và chiều cao là 3m. Độ dài cạnh bên là (làm tròn đến hàng đơn vị):",
    customComponent: "RubberStep",
    options: ["3m", "4m", "5m", "6m"],
    correctAnswer: 0,
    explanation: "Cạnh bên c² = h² + [(a-b)√2/2]². Với h=3, a=2, b=1 => c² = 9 + 0.5 = 9.5 => c ≈ 3.1 => làm tròn 3m."
  },
  {
    id: 25,
    type: 'multiple',
    text: "Đạo hàm của hàm số y = ln²(3x + 2) là:",
    options: ["y' = 6ln(3x+2)/(3x+2)", "y' = 2ln(3x+2)/(3x+2)", "y' = 3ln(3x+2)/(3x+2)", "y' = 1/(3x+2)"],
    correctAnswer: 0,
    explanation: "y' = 2ln(3x+2) * [ln(3x+2)]' = 2ln(3x+2) * 3/(3x+2) = 6ln(3x+2)/(3x+2)."
  },
  {
    id: 26,
    type: 'multiple',
    text: "Kim tự tháp Kheops cạnh đáy 262m, cạnh bên 230m. Khoảng cách hầm lấy sáng từ mặt bên đến tâm đáy là:",
    imageUrl: "https://placehold.co/600x400/indigo/white?text=Kim+Tu+Thap+Kheops",
    options: ["127m", "150m", "180m", "200m"],
    correctAnswer: 0,
    explanation: "Đây là bài toán tính khoảng cách từ tâm đáy đến mặt bên. h² = 230² - (262√2/2)² => h ≈ 127m."
  },
  {
    id: 27,
    type: 'multiple',
    text: "Giới hạn lim (2n + 1)/(n - 3) bằng:",
    options: ["2", "1/2", "-1/3", "0"],
    correctAnswer: 0,
    explanation: "Chia cả tử và mẫu cho n, giới hạn bằng 2/1 = 2."
  },
  {
    id: 28,
    type: 'multiple',
    text: "Một hộp chứa 5 quả cầu đỏ và 3 quả cầu xanh. Lấy ngẫu nhiên 2 quả. Xác suất để được 2 quả đỏ là:",
    options: ["5/14", "10/28", "2/7", "1/4"],
    correctAnswer: 0,
    explanation: "P = C(5,2) / C(8,2) = 10 / 28 = 5/14."
  },
  {
    id: 29,
    type: 'boolean',
    text: "Khoảng cách từ một điểm đến một mặt phẳng là độ dài đoạn vuông góc kẻ từ điểm đó đến mặt phẳng.",
    correctAnswer: true,
    explanation: "Đây là định nghĩa cơ bản về khoảng cách từ điểm đến mặt phẳng."
  },
  {
    id: 30,
    type: 'boolean',
    text: "Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau nằm trong một mặt phẳng thì nó vuông góc với mặt phẳng đó.",
    correctAnswer: true,
    explanation: "Đây là điều kiện để một đường thẳng vuông góc với một mặt phẳng."
  },
  {
    id: 31,
    type: 'multiple',
    text: "Nghiệm của phương trình log_2(x - 5) = 4 là:",
    options: ["x = 21", "x = 13", "x = 11", "x = 9"],
    correctAnswer: 0,
    explanation: "x - 5 = 2^4 = 16 => x = 21."
  },
  {
    id: 32,
    type: 'multiple',
    text: "Đạo hàm của hàm số y = tan(x) là:",
    options: ["y' = 1/cos²x", "y' = -1/sin²x", "y' = 1/sin²x", "y' = -1/cos²x"],
    correctAnswer: 0,
    explanation: "Công thức đạo hàm cơ bản: (tan x)' = 1/cos²x."
  },
  {
    id: 33,
    type: 'multiple',
    text: "Cho hai biến cố độc lập A và B có P(A) = 0,3 và P(B) = 0,4. Xác suất P(AB) là:",
    options: ["0,7", "0,1", "0,12", "0,72"],
    correctAnswer: 2,
    explanation: "Với A, B độc lập: P(AB) = P(A).P(B) = 0,3 * 0,4 = 0,12."
  },
  {
    id: 34,
    type: 'multiple',
    text: "Diện tích xung quanh của hình chóp tứ giác đều có cạnh đáy bằng a và trung đoạn bằng 2a là:",
    options: ["4a²", "2a²", "a²", "8a²"],
    correctAnswer: 0,
    explanation: "Sxq = p.d = (4a/2) * 2a = 4a²."
  },
  {
    id: 35,
    type: 'multiple',
    text: "Tập nghiệm của bất phương trình (1/2)^x > 8 là:",
    options: ["x > 3", "x < -3", "x > -3", "x < 3"],
    correctAnswer: 1,
    explanation: "(1/2)^x > (1/2)^(-3). Vì cơ số 1/2 < 1 nên x < -3."
  }
];
