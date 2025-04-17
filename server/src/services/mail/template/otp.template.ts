 const otpTemplate = (otp: string) => {
return `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP - Bharat Farmer</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f2fdf5 url('https://www.transparenttextures.com/patterns/symphony.png');
      font-family: 'Segoe UI', sans-serif;
    }

    .email-container {
      max-width: 520px;
      margin: 40px auto;
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #cdeac0;
      overflow: hidden;
    }

    .email-header {
      background: linear-gradient(135deg, #2e7d32, #388e3c);
      padding: 24px 20px;
      color: #fff;
      text-align: center;
    }

    .email-header h1 {
      font-size: 22px;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .email-body {
      padding: 30px 28px;
      text-align: center;
      color: #333;
    }

    .email-body p {
      font-size: 16px;
      margin: 10px 0;
      line-height: 1.6;
    }

    .otp-box {
      display: inline-block;
      margin: 24px 0;
      padding: 14px 34px;
      font-size: 28px;
      font-weight: bold;
      color: #2e7d32;
      background-color: #f1f8e9;
      border: 2px dashed #aed581;
      border-radius: 10px;
      letter-spacing: 6px;
    }

    .email-footer {
      background-color: #f8f8f8;
      padding: 18px;
      text-align: center;
      font-size: 13px;
      color: #888;
    }

    @media (max-width: 600px) {
      .email-body {
        padding: 22px 16px;
      }

      .otp-box {
        font-size: 24px;
        padding: 12px 24px;
      }

      .email-header h1 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>🌾 Bharat Farmer - आपका OTP कोड</h1>
    </div>
    <div class="email-body">
      <p>नमस्ते किसान मित्र,</p>
      <p>आपका लॉगिन या सत्यापन कोड नीचे दिया गया है:</p>
      <div class="otp-box">${otp}</div>
      <p>यह OTP केवल 10 मिनट तक मान्य है। कृपया इसे किसी के साथ साझा न करें।</p>
    </div>
    <div class="email-footer">
      यह एक स्वचालित ईमेल है, कृपया उत्तर न दें।<br />
      © 2025 Bharat Farmer | सभी अधिकार सुरक्षित
    </div>
  </div>
</body>
</html>
`

}

export default otpTemplate