import nodemailer from 'nodemailer';
import { config } from '../config/config';
import type { ContactFormData, AppointmentData } from '../types';

function createTransporter() {
  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: { user: config.email.user, pass: config.email.pass },
  });
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  if (!config.email.user) {
    console.log('[Dev] E-posta gönderildi (simüle):', data);
    return;
  }

  const transporter = createTransporter();
  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:0;">
      <div style="background:linear-gradient(135deg,#1B5E20,#2E7D32);padding:32px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">NutriVita Diyetisyenlik</h1>
        <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">Yeni İletişim Formu Mesajı</p>
      </div>
      <div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;width:140px;">Ad Soyad</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">E-posta</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.email}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">Telefon</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.phone || 'Belirtilmedi'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">Hizmet</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.service}</td></tr>
          <tr><td style="padding:10px 0;font-weight:600;vertical-align:top;">Mesaj</td><td style="padding:10px 0;">${data.message || 'Mesaj yok'}</td></tr>
        </table>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"NutriVita Web" <${config.email.user}>`,
    to: config.email.contactEmail,
    subject: `Yeni İletişim Mesajı - ${data.name}`,
    html,
    replyTo: data.email,
  });
}

export async function sendAppointmentEmail(data: AppointmentData): Promise<void> {
  if (!config.email.user) {
    console.log('[Dev] Randevu e-postası gönderildi (simüle):', data);
    return;
  }

  const transporter = createTransporter();
  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#1B5E20,#2E7D32);padding:32px;text-align:center;">
        <h1 style="color:#fff;margin:0;">Yeni Randevu Talebi</h1>
      </div>
      <div style="background:#fff;padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;width:140px;">Ad Soyad</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">E-posta</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.email}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">Telefon</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.phone}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">Hizmet</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.service}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">Tarih</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.date}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:600;">Saat</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">${data.time}</td></tr>
          <tr><td style="padding:10px 0;font-weight:600;vertical-align:top;">Notlar</td><td style="padding:10px 0;">${data.notes || 'Yok'}</td></tr>
        </table>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"NutriVita Web" <${config.email.user}>`,
    to: config.email.contactEmail,
    subject: `Randevu Talebi - ${data.name} - ${data.date} ${data.time}`,
    html,
    replyTo: data.email,
  });
}
