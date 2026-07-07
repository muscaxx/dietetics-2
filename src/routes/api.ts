import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { contactLimiter } from '../middleware/rateLimiter';
import { sendContactEmail, sendAppointmentEmail } from '../utils/emailService';
import { SERVICES, PACKAGES } from './data';

const router = Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Ad Soyad zorunludur.').isLength({ min: 2, max: 100 }),
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi girin.').normalizeEmail(),
  body('phone').optional().trim(),
  body('service').trim().notEmpty().withMessage('Hizmet seçimi zorunludur.'),
  body('message').optional().trim().isLength({ max: 2000 }),
];

const appointmentValidation = [
  body('name').trim().notEmpty().withMessage('Ad Soyad zorunludur.'),
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi girin.').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Telefon numarası zorunludur.'),
  body('service').trim().notEmpty().withMessage('Hizmet seçimi zorunludur.'),
  body('date').trim().notEmpty().withMessage('Tarih seçimi zorunludur.'),
  body('time').trim().notEmpty().withMessage('Saat seçimi zorunludur.'),
  body('notes').optional().trim(),
];

router.post('/contact', contactLimiter, contactValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  try {
    await sendContactEmail(req.body);
    res.json({ success: true, message: 'Mesajınız alındı. En kısa sürede size ulaşacağız.' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ success: false, message: 'E-posta gönderilemedi. Lütfen tekrar deneyin.' });
  }
});

router.post('/appointment', contactLimiter, appointmentValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  try {
    await sendAppointmentEmail(req.body);
    res.json({ success: true, message: 'Randevu talebiniz alındı. Onay için sizi arayacağız.' });
  } catch (err) {
    console.error('Appointment email error:', err);
    res.status(500).json({ success: false, message: 'Randevu talebi gönderilemedi. Lütfen tekrar deneyin.' });
  }
});

router.get('/services', (_req: Request, res: Response) => {
  res.json({ success: true, data: SERVICES });
});

router.get('/packages', (_req: Request, res: Response) => {
  res.json({ success: true, data: PACKAGES });
});

export default router;
