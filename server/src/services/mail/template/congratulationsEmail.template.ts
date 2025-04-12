const congratutionTemplate = (name: string) => {
    return `<!DOCTYPE html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Bharat Farmer</title>
    <!-- Google Font: Roboto for English content -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Header -->
      <div style="background-color: #2e7d32; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 22px; color: white;">🌾 स्वागत है किसान भाई!</h1>
        <p style="margin: 5px; margin-left: 35px; font-size: 16px; color: #f1f1f1; font-family: 'Roboto', Arial, sans-serif;">Welcome to Bharat Farmer</p>
      </div>

      <!-- Body -->
      <div style="padding: 20px;">
        <p>प्रिय ${name} जी,</p>

        <p>
          🎉 आपको ढेरों बधाई! आपने <strong>Bharat Farmer</strong> ऐप में रजिस्टर करके एक समझदारी भरा कदम उठाया है। 
          यह ऐप आपके खेत, फसल और भविष्य को और बेहतर बनाने के लिए ही बनाया गया है।
        </p>

        <p style="font-family: 'Roboto', Arial, sans-serif;">
          🇮🇳 Whether it’s the changing weather, market rates, government schemes, or expert farming tips – now everything is just a tap away!
        </p>

        <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #2e7d32; margin: 20px 0; border-radius: 6px;">
          ✅ <strong>Bharat Farmer ऐप से आपको मिलेगा:</strong><br/>
          🌦️ मौसम की सटीक जानकारी<br/>
          📢 सरकारी योजनाओं की ताज़ा खबरें<br/>
          💰 मंडी रेट और बाजार की चाल<br/>
          📘 खेती के आसान टिप्स<br/>
          📷 फोटो अपलोड और सलाह सुविधा
        </div>

        <p>
          हमारा सपना है – <strong>हर किसान डिजिटल और आत्मनिर्भर बने</strong>।  
          Bharat Farmer ऐप आपके हाथों में ताक़त है – बस अब शुरुआत करें।
        </p>

        <!-- App CTA -->
        <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffca28; margin: 20px 0; border-radius: 6px;">
          📲 <strong>ऐप कैसे खोलें?</strong><br/>
          👉 नीचे दिए गए बटन पर क्लिक करें<br/>
          👉 या अपने मोबाइल में Bharat Farmer ऐप खोलें<br/>
          👉 लॉगिन करें और सुविधाओं का लाभ उठाएं
        </div>

        <!-- App Button -->
        <p style="text-align: center; margin: 30px 0;">
          <a href="https://bharatfarmer.com/app" style="background-color: #2e7d32; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px;">📲 ऐप खोलें / Open App</a>
        </p>

        <p>
          🤝 हमें गर्व है कि आप जैसे मेहनती किसान अब Bharat Farmer परिवार का हिस्सा हैं।  
          अगर आपको कोई दिक्कत हो तो हमसे कभी भी संपर्क करें।
        </p>

        <p>जय जवान, जय किसान 🇮🇳<br/>
<strong style="margin-top:5px; font-size:15px; display: inline-block; font-family: 'Roboto', Arial, sans-serif; color: #555;">– टीम Bharat Farmer</strong>

        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #e9ecef; padding: 10px; text-align: center; font-size: 12px;">
        यह ईमेल आपने Bharat Farmer में साइनअप करने पर प्राप्त किया है।<br>
        <a href="#" style="color: #2e7d32; text-decoration: none;">Unsubscribe</a> | <a href="https://bharatfarmer.com" style="color: #2e7d32; text-decoration: none;">हमारी वेबसाइट पर जाएं</a>
      </div>
    </div>
  </body>
</html>
`

}

export default congratutionTemplate