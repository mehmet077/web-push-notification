self.addEventListener("push", (event) => {
  let data = {};

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (err) {
    console.error("Push data parse error:", err);
  }

  const title = data.title || "Yeni Bildirim 🚀";

  const options = {
    body: data.body + (data.data?.vibrate ? ` - Vibrate: ${data.data.vibrate}` : "") || "Detayları görmek için tıklayın",
    icon: data.icon || "/images/logo.png",
    badge: data.badge || "/images/badge.png",

    // Büyük görsel (Chrome / Edge destekler)
    image: data.image || undefined,

    // Aynı bildirimi tekrar gönderirken eskisini ezmek için
    tag: data.tag || "default-notification",

    // Aynı tag ile yeni bildirim gelirse titreşim vs tekrar etsin mi
    renotify: data.renotify ?? true,

    // Mobil titreşim
    vibrate: data.vibrate || [100, 50, 100],

    // Kullanıcı etkileşimi beklesin mi
    requireInteraction: data.requireInteraction ?? false,

    // Sessiz bildirim desteği
    silent: data.silent ?? false,

    // Tıklama sonrası kullanılacak özel data
    data: {
      url: data.url || "/",
      notificationId: data.id || null,
      dateOfArrival: Date.now(),
    },

    // Action butonları
    actions: data.actions || [
      {
        action: "open",
        title: "Görüntüle  👀"
      },
      {
        action: "close",
        title: "Kapat ❌"
      }
    ]
  };

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
