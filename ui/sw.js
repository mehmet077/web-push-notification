// 🔔 Push bildirimi geldiğinde tetiklenen event
self.addEventListener("push", (event) => {

  // Server'dan gelen verileri tutmak için boş obje
  let data = {};

  // Eğer push event'i veri içeriyorsa
  if (event.data) {

    // Gelen veriyi JSON formatına çeviriyoruz
    // (Server payload JSON olmalı)
    data = event.data.json();
  }

  // Bildirim başlığı
  // Server'dan title gelmezse varsayılan başlık kullanılır
  const title = data.title || "Varsayılan Başlık";

  // Bildirim ayarları (options)
  const options = {

    // Bildirim açıklama metni
    body: data.body || "",

    // Bildirim ana ikonu
    icon: data.icon || "/images/logo.png",

    // Mobil ve bazı tarayıcılarda görünen küçük ikon
    badge: data.badge || "/images/badge.png",

    // Mobil cihazlarda titreşim ayarı
    vibrate: data.vibrate || [100, 50, 100],

    // Bildirim kullanıcı etkileşimi olana kadar ekranda kalır
    // null veya undefined ise true kabul edilir
    requireInteraction: data.requireInteraction ?? true,

    // Bildirimle birlikte taşınan özel data
    data: {
      // Bildirime tıklanınca açılacak URL
      url: data.url || "/",

      // Bildirimin alındığı zaman (timestamp)
      dateOfArrival: Date.now()
    },

    // Bildirim üzerindeki action butonları
    actions: data.actions || []
  };

  // Bildirimi ekranda göster
  // waitUntil => Service Worker işlemi bitene kadar aktif kalır
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});


// 🖱️ Bildirime tıklandığında tetiklenen event
self.addEventListener("notificationclick", (event) => {

  // Bildirimi kapat
  event.notification.close();

  // Eğer tıklanan buton "close" ise işlem yapma
  if (event.action === "close") return;

  // Açılacak hedef URL
  // Bildirim data içinden alınır
  const targetUrl = event.notification.data?.url || "/";

  // Açık sekmeleri kontrol et veya yeni sekme aç
  event.waitUntil(

    // Tarayıcıda açık olan tüm pencere/sekme client'larını al
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {

        // Açık sekmeler arasında aynı URL var mı kontrol et
        for (const client of clientList) {

          // Aynı URL açık ve focus edilebiliyorsa
          if (client.url === targetUrl && "focus" in client) {

            // O sekmeyi öne getir
            return client.focus();
          }
        }

        // Aynı URL açık değilse yeni sekme aç
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
