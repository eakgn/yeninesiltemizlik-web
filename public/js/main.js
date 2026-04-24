document.addEventListener("DOMContentLoaded", () => {
  // Pointer'lar (Bellek Referansları)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Menüyü açıp kapayan State fonksiyonu
  function toggleMenu() {
    if (!mobileMenu) return; // Güvenlik kontrolü
    mobileMenu.classList.toggle("-translate-x-full");
    document.body.classList.toggle("overflow-hidden");
  }

  // Tıklama olaylarını dinleme
  if (mobileMenuBtn && closeMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", toggleMenu);
    });
  }

  // --- SAVUNMACI MİMARİ: Resize Interrupt (Pencere Boyutlandırma Kesmesi) ---
  // Kullanıcı ekranı genişletirse ve menü açıksa, kilitlenmeyi çöz (Garbage Collection)
  window.addEventListener("resize", () => {
    // Tailwind'in 'md' breakpoint'i 768px'dir.
    if (window.innerWidth >= 768) {
      // Eğer body kilitliyse kilidi aç
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      }
      // Eğer menü ekrandaysa onu tekrar ekran dışına it
      if (mobileMenu && !mobileMenu.classList.contains("-translate-x-full")) {
        mobileMenu.classList.add("-translate-x-full");
      }
    }
  });
});
// --- SAVUNMACI MİMARİ: Floating WhatsApp Observer ---
const whatsappBtn = document.getElementById("whatsapp-float");
const heroSection = document.querySelector("section"); // İlk section'ı (Hero) hedef al

if (whatsappBtn && heroSection) {
  const observerOptions = {
    root: null, // Viewport'u baz al
    threshold: 0.1, // Hero'nun %10'u bile görünse butonu gizle
  };

  // --- SAVUNMACI MİMARİ: Akıllı Floating WhatsApp Observer ---
  const whatsappBtn = document.getElementById("whatsapp-float");
  const waText = document.getElementById("wa-text");
  const headerSection = document.querySelector("header"); // Artık incecik Header'ı dinliyoruz
  let textCollapsed = false; // Metnin sadece 1 kere kapanması için bayrak

  if (whatsappBtn && headerSection) {
    // threshold: 0 -> Header ekrandan 1 piksel bile çıksa tetikle
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // 1. Kullanıcı Header'ı geçti: Butonu yukarı doğru fırlat ve göster
            whatsappBtn.classList.remove("opacity-0", "translate-y-24");
            whatsappBtn.classList.add("opacity-100", "translate-y-0");

            // 2. Metni 2.5 saniye sonra içeri çek (Sadece bir kere çalışır)
            if (!textCollapsed && waText) {
              setTimeout(() => {
                // Tailwind sınıflarını değiştirerek CSS transition'ı tetikliyoruz
                waText.classList.replace("max-w-[160px]", "max-w-0");
                waText.classList.replace("opacity-100", "opacity-0");
                waText.classList.replace("ml-3", "ml-0");
                textCollapsed = true; // Görev tamamlandı, belleği yorma
              }, 2500);
            }
          } else {
            // Kullanıcı en tepeye (Header'a) geri döndü: Butonu ekran dışına gizle
            whatsappBtn.classList.add("opacity-0", "translate-y-24");
            whatsappBtn.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      { root: null, threshold: 0 },
    );

    observer.observe(headerSection);
  }
}
