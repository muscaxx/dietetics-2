import { Router, Request, Response, NextFunction } from 'express';
import { SERVICES, BLOG_POSTS, TESTIMONIALS } from './data';

const router = Router();

const site = {
  name: 'NutriVita Diyetisyenlik',
  dietitian: 'Dyt. Zeynep Arslan',
  phone: '+90 (500) 123 45 67',
  email: 'info@nutrivita.com.tr',
  address: 'Bağcılar Mah. Sağlık Cad. No:42, Kadıköy/İstanbul',
};

router.get('/', (_req: Request, res: Response) => {
  res.render('index', {
    title: 'NutriVita Diyetisyenlik | Dyt. Zeynep Arslan',
    description: 'Kişiye özel beslenme programları ve online diyet danışmanlığı ile sağlıklı yaşama ulaşın.',
    page: 'home',
    site,
    services: SERVICES,
    testimonials: TESTIMONIALS,
    blogPosts: BLOG_POSTS.slice(0, 3),
  });
});

router.get('/hakkimda', (_req: Request, res: Response) => {
  res.render('about', {
    title: 'Hakkımda | NutriVita Diyetisyenlik',
    description: 'Dyt. Zeynep Arslan hakkında bilgi edinin. 8+ yıllık deneyim, Hacettepe Üniversitesi mezunu.',
    page: 'about',
    site,
  });
});

router.get('/hizmetler', (_req: Request, res: Response) => {
  res.render('services', {
    title: 'Hizmetler | NutriVita Diyetisyenlik',
    description: 'Kilo yönetimi, sporcu beslenmesi, hastalık yönetimi ve online danışmanlık hizmetleri.',
    page: 'services',
    site,
    services: SERVICES,
  });
});

router.get('/blog', (_req: Request, res: Response) => {
  res.render('blog', {
    title: 'Blog | NutriVita Diyetisyenlik',
    description: 'Beslenme, diyet ve sağlıklı yaşam hakkında uzman yazıları.',
    page: 'blog',
    site,
    posts: BLOG_POSTS,
    categories: [...new Set(BLOG_POSTS.map(p => p.category))],
  });
});

router.get('/blog/:slug', (req: Request, res: Response, next: NextFunction) => {
  const post = BLOG_POSTS.find(p => p.slug === req.params.slug);
  if (!post) { next(); return; }

  res.render('blog-post', {
    title: `${post.title} | NutriVita Blog`,
    description: post.excerpt,
    page: 'blog',
    site,
    post,
    relatedPosts: BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2),
  });
});

router.get('/iletisim', (_req: Request, res: Response) => {
  res.render('contact', {
    title: 'İletişim | NutriVita Diyetisyenlik',
    description: 'Randevu almak veya sorularınız için iletişime geçin.',
    page: 'contact',
    site,
    services: SERVICES,
  });
});

export default router;
