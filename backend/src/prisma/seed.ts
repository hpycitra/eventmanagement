import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // User default: Denta
  const hashedPassword = await bcrypt.hash('24090103', 10);
  await prisma.user.upsert({
    where: { nim: '24090103' },
    update: {},
    create: {
      nim: '24090103',
      name: 'Happy Citra Lestari',
      password: hashedPassword,
    },
  });
  console.log('✅ User: NIM 24090103 / 24090103');

  // Categories
  await prisma.categoryEvent.upsert({ where: { id: 1 }, update: {}, create: { name: 'Seminar', description: 'Event seminar akademik dan profesional', color: '#6366f1' } });
  await prisma.categoryEvent.upsert({ where: { id: 2 }, update: {}, create: { name: 'Workshop', description: 'Pelatihan dan workshop praktis', color: '#0ea5e9' } });
  await prisma.categoryEvent.upsert({ where: { id: 3 }, update: {}, create: { name: 'Webinar', description: 'Seminar online via internet', color: '#10b981' } });
  await prisma.categoryEvent.upsert({ where: { id: 4 }, update: {}, create: { name: 'Hackathon', description: 'Kompetisi inovasi dan pemrograman tim', color: '#10b981' } });
  await prisma.categoryEvent.upsert({ where: { id: 5 }, update: {}, create: { name: 'Talkshow', description: 'Event sharing session', color: '#10b981' } });

  console.log('✅ Categories: 5 data');

  // Pembicara
  await prisma.pembicara.upsert({ where: { id: 1 }, update: {}, create: { name: 'Prof. Dr. Ir. Teguh Wahyono', title: 'Guru Besar & Peneliti AI', expertise: 'Artificial Intelligence & Machine Learning', email: 'teguh@nexaevent.com', phone: '0811-2333-6789', bio: 'Dosen sekaligus peneliti senior yang aktif mempublikasikan jurnal internasional di bidang Computer Vision dan Deep Learning..' } });
  await prisma.pembicara.upsert({ where: { id: 2 }, update: {}, create: { name: 'Rian Kurnia, S.Kom., M.T.', title: 'Lead Frontend Engineer at TechCorp', expertise: 'Full-Stack Web Development', email: 'rian.kurnia@nexaevent.id', phone: '0812-3456-9390', bio: 'Praktisi industri yang fokus pada pengembangan aplikasi web berbasis React, TypeScript, dan optimasi performa modern JavaScript.' } });
   await prisma.pembicara.upsert({ where: { id: 3 }, update: {}, create: { name: 'Citra Lestari, S.Kom., M.T.', title: 'Senior Product Manager & Tech Talent Mentor', expertise: 'Agile Frameworks & Career Development', email: 'tari@nexaevent.id', phone: '0888-3456-9390', bio: 'Berpengalaman menjembatani kebutuhan bisnis dan engineering, serta aktif membantu talenta muda siap kerja menembus industri teknologi..' } });

  console.log('✅ Pembicara: 3 data');

  // Events
  await prisma.event.upsert({ where: { id: 1 }, update: {}, create: { title: 'Seminar Nasional Kecerdasan Buatan 2026', description: 'Membahas perkembangan terkini AI.', date: new Date('2026-06-06'), time: '09:00', location: 'Auditorium Utama', capacity: 250, status: 'upcoming', categoryId: 1, pembicaraId: 1 } });
  await prisma.event.upsert({ where: { id: 2 }, update: {}, create: { title: 'Webinar: UI/UX Design Fundamental untuk Developer Pemulat', description: 'Kupas tuntas dasar-dasar perancangan visual aplikasi, cara menentukan hierarki warna yang pas, hingga trik membuat wireframe dan prototype yang ramah pengguna (user-friendly) sebelum masuk ke tahap coding.', date: new Date('2025-07-20'), time: '08:00', location: 'Lab Komputer D2.15', capacity: 30, status: 'upcoming', categoryId: 2, pembicaraId: 2 } });
  console.log('✅ Events: 2 data');

  console.log('\n🎉 Seeding selesai!');
  console.log('👤 Login: NIM 24090103 / Password: 24090103');
}

main().catch(console.error).finally(() => prisma.$disconnect());
