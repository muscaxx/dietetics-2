# NutriVita — Dynamic Dietitian Website

Node.js + TypeScript + EJS ile hazırlanmış diyetisyen web sitesi şablonu.

## Özellikler

- Çok sayfalı yapı (Ana Sayfa, Hakkımda, Hizmetler, Blog, İletişim)
- TypeScript + Express.js
- EJS şablonlama sistemi
- İletişim formu (backend doğrulama + e-posta gönderimi)
- Rate limiting ve güvenlik başlıkları (helmet)

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npx ts-node src/app.ts
```

Uygulama `http://localhost:3000` adresinde çalışır.

## Ortam Değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayıp doldurun:

```bash
cp .env.example .env
```

## Özelleştirme

- `src/routes/index.ts` — Site bilgileri (isim, adres, telefon)
- `src/routes/data.ts` — Hizmetler, blog yazıları, yorumlar
- `public/css/style.css` — Renkler (`:root` değişkenleri)
- `views/` — Sayfa şablonları
