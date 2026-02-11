Tamam 👍 LinkedIn ile ilgili tüm öneri ve referansları kaldırdım.
Aşağıda temizlenmiş ve tamamen genel amaçlı README.md içeriği var:

# 🚀 Node.js Web Push (VAPID) Notification Server

Bu proje, **Node.js** ve **Express** kullanarak tarayıcılara yüksek kaliteli, büyük görselli (Hero Image) bildirimler gönderen modern bir sunucu örneğidir.

Her türlü web uygulaması için anlık bildirim altyapısı sağlar.

---

## ✨ Özellikler

- 🔐 **VAPID Protokolü**  
  Google, Mozilla ve Microsoft push servisleriyle tam uyumlu güvenli kimlik doğrulama.

- 📢 **Bulk Notification**  
  Tek bir API çağrısıyla binlerce aboneye paralel gönderim.

- 📰 **Haber Bülteni Formatı**  
  Büyük manşet resimleri (`image`) ve interaktif eylem butonları desteği.

- ⚠️ **Error Handling**  
  Süresi dolmuş (Expired) veya geçersiz aboneliklerin (`410 Gone`) otomatik tespiti.

---

## 🛠️ Teknik Gereksinimler

- Node.js v16 veya üzeri
- NPM paketleri:
  - `web-push`
  - `express`
  - `body-parser`
  - `cors`

---

## 🚀 Kurulum ve Çalıştırma

### 1️⃣ Bağımlılıkları Yükleyin

``bash
npm install

2️⃣ VAPID Anahtarlarını Oluşturun

Proje dizininde aşağıdaki komutu çalıştırın:

./node_modules/.bin/web-push generate-vapid-keys


Bu komut size:

Public Key

Private Key

üretecektir.

3️⃣ Çevresel Değişkenleri Yapılandırın (.env)

Proje kök dizinine bir .env dosyası oluşturun:

VAPID_SUBJECT=mailto:admin@domain.com

VAPID_PUBLIC_KEY=ÜRETTİĞİNİZ_PUBLIC_KEY

VAPID_PRIVATE_KEY=ÜRETTİĞİNİZ_PRIVATE_KEY

4️⃣ Sunucuyu Başlatın
node server.js

📡 API Kullanımı
POST /send-multiple

Bu uç nokta, abonelere toplu halde "Haber Manşeti" formatında bildirim gönderir.

📦 Örnek JSON Gövdesi
{
  "subscriptions": [
    {
      "endpoint": "https://fcm.googleapis.com/fcm/send/...",
      "keys": {
        "p256dh": "...",
        "auth": "..."
      }
    }
  ],
  "message": "Yeni içerik yayında!",
  "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=600&auto=format"
}

🎨 Bildirim Tasarımı (Haber Bildirimi Etkisi)

Bildirimin büyük ve profesyonel görünmesi için Node.js tarafında oluşturulan payload yapısı:

const payload = JSON.stringify({
    title: "SON DAKİKA: Yeni İçerik Yayında! 🚀",
    body: message,
    icon: "https://your-site.com/icon.png",
    image: image_url, // 1200x600 px (2:1 oran)
    badge: "https://your-site.com/badge-icon.png",
    data: {
        url: "https://your-site.com"
    }
});

⚠️ Önemli Notlar
🖼️ Resim Boyutu

Bildirimin tam genişlikte görünmesi için resim oranı 2:1 (örnek: 1200x600 px) olmalıdır.

📲 Bildirim Genişletme

Android ve Windows'ta resmin büyük hali için bildirim genişletilmelidir.

🔒 HTTPS Zorunluluğu

Web Push API yalnızca:

localhost

veya HTTPS bağlantılarda çalışır.

📝 Lisans

Bu proje eğitim amaçlıdır.
İstediğiniz gibi geliştirebilir ve kendi projelerinizde kullanabilirsiniz.

💡 Geliştirme Önerileri

Veritabanı ile abonelik saklama

Otomatik cron job ile planlı gönderim

Admin panel arayüzü

Segment bazlı bildirim gönderimi

Tıklama istatistikleri (Analytics)
