// web-push kütüphanesini projeye dahil ediyoruz
// Web Push Notification göndermek için kullanılır
const webPush = require("web-push");


// 🔐 VAPID anahtarları
// Push servislerinin (Chrome, Edge vb.) sunucu kimliğini doğrulaması için kullanılır
const vapidKeys = {
  // Tarayıcıya gönderilen public key
  publicKey:
    "BKzZVuQH6nXRCJ5tx_-PQ9UUAKyg-WUyc-Xzl1Rsj4HqT_7IK0TjAkRGLao6rKGsbC2oe67GLlgKliuc0Bkaw0c",

  // Sadece sunucuda kalan private key (asla client tarafına gitmez)
  privateKey: "y4sqmuohkw5fRGWZSr8m9pgk69jUVhX9cyCF_bWVrug",
};


// 📌 VAPID bilgilerini web-push'a tanıtıyoruz
// mailto: => Push servisleri hata olursa buraya ulaşabilir
webPush.setVapidDetails(
  "mailto:info@kablosuzkedii.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


// 🧩 CHROME abonelik bilgisi
// Bu bilgiler tarayıcıdan alınır (PushManager.subscribe())
const subscriberChrome = {
  // Google FCM endpoint adresi
  endpoint:
    "https://fcm.googleapis.com/fcm/send/e5x5S2GaiIQ:APA91bE5AL-2gqSFOQg4rYjACTfkAydc44lzpv4KFMwKJ3-xKT4alt9QG0_wmExtN21Ng1xA-cCN7PRFWWT3ln_a8pGaHNd8UYogQShq9UnK1woO_Dv6NZAIYjW0otdehwbYiZsgtTDN",

  // Abonelik süresi (çoğu zaman null gelir)
  expirationTime: null,

  // Şifreleme anahtarları
  keys: {
    // Mesajın şifrelenmesi için kullanılan anahtar
    p256dh:
      "BHt6lAadd2XK3ioAMdLKLwzfp2csQdSm5bZbtxEQ7iuQ6X79yH4jOcnzu1p7VuBIheoZrNkiDmTpfez1mqPbwxk",

    // Kimlik doğrulama anahtarı
    auth: "0yQ7F3lkJC9Wd-1j0dNQSg",
  },
};


// 🧩 EDGE abonelik bilgisi
// Edge, Windows Notification Service (WNS) kullanır
const subscriberEdge = {
  // WNS endpoint adresi
  endpoint:
    "https://wns2-par02p.notify.windows.com/w/?token=BQYAAADGmc10Yh6gytvV5We6noDbuL3a7swM2c35j%2b5Ij1WhOr4nCamtN6iSKAqHK1Jt1FpZdkmHq3%2bwF%2bK319mFAM%2fZ%2baK1WEAXUJDMkG5HoxugI7B4hZMB0gRoMiphjzEm9ZKxM48dE8J%2b5yE%2bzAxgPPEqWuioiLGWv0eeMmPDx%2bNBygw5pd%2f5Gu8bJvfXrWN9V%2fRlYFq1gHQqHNzsBCIl8k5buhDzr0BEK%2f9eh%2b0kCtrDfWghx0Thzpi3ceAJu4LD8sHJjiezVZk%2fyGRhIcp5OxMec%2biwsnedbIfZ3q%2bpwKiGG4NxClAesGhHmVa%2fwEgWk7SabW2tYgypPcLY2aCkrzzcSrc4UKKWkJj7PpD94mfuuw%3d%3d",

  // Abonelik süresi
  expirationTime: null,

  // Edge için şifreleme anahtarları
  keys: {
    p256dh:
      "BJOUkXR6SNURzBMt7cY4gR6N5jDGb6r-7PdxP6Q8v7534yjDlxksN8K9Gw45ZIzG57wMpnY6OprAm9vSag4v7jQ",

    auth: "YNplfopesGYj786z9PbDgA",
  },
};


// 🔔 SERVER'DAN GİDECEK BİLDİRİM İÇERİĞİ
// Service Worker içinde kullanılır
const payload = JSON.stringify({
  // Bildirim başlığı
  title: "🚀 Yeni Bildirim",

  // Bildirim açıklaması
  body: "Server.js üzerinden gelen mesaj",

  // Bildirim ikonu
  icon: "/images/logo.png",

  // Android / bazı tarayıcılarda küçük ikon
  badge: "/images/badge.png",

  // Bildirime tıklanınca açılacak sayfa
  url: "/",

  // Bildirim kapatılana kadar ekranda kalır
  requireInteraction: true,

  // Telefonlarda titreşim deseni
  vibrate: [200, 100, 200],

  // Bildirim üzerindeki aksiyon butonları
  actions: [
    { action: "open", title: "Aç" },
    { action: "close", title: "Kapat" },
  ],
});


// 📤 CHROME için bildirim gönderme
webPush
  .sendNotification(subscriberChrome, payload)
  .then(() => console.log("✅ Bildirim gönderildi ch"))
  .catch(err => console.error("❌ Hata:", err));


// 📤 EDGE için bildirim gönderme
webPush
  .sendNotification(subscriberEdge, payload)
  .then(() => console.log("✅ Bildirim gönderildi edge"))
  .catch(err => console.error("❌ Hata:", err));
