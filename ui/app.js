// Sayfa tamamen yüklendiğinde çalışır
window.addEventListener("load", async () => {

  // Bildirim aboneliği için kullanılan butonu seçiyoruz
  const subscribeButton = document.querySelector("#subscribeButton");

  // 🧩 Service Worker'ı register ediyoruz
  // "./sw.js" => Service Worker dosyasının yolu
  const sW = await navigator.serviceWorker.register("./sw.js");

  // Kayıt edilen Service Worker bilgisini console'a yazdır
  console.log("Service Worker => ", sW);

  // Abone ol butonuna tıklandığında
  subscribeButton.addEventListener("click", async () => {

    // Service Worker'ın tamamen hazır olmasını bekle
    const serviceWorker = await navigator.serviceWorker.ready;

    // Push Notification için tarayıcıdan abonelik oluştur
    const clientID = await serviceWorker.pushManager.subscribe({

      // Tarayıcıya her bildirimin kullanıcıya görünür olacağını garanti eder
      // (Push API için zorunludur)
      userVisibleOnly: true,

      // 🔐 VAPID Public Key
      // Server tarafında oluşturulan public key buraya verilir
      applicationServerKey:
        "BKzZVuQH6nXRCJ5tx_-PQ9UUAKyg-WUyc-Xzl1Rsj4HqT_7IK0TjAkRGLao6rKGsbC2oe67GLlgKliuc0Bkaw0c",
    });

    // Oluşturulan abonelik objesini console'a yazdır
    console.log(clientID);

    // Abonelik objesini JSON formatına çevirip yazdır
    // (Genellikle server'a gönderilir)
    console.log(JSON.stringify(clientID));
  });
});
