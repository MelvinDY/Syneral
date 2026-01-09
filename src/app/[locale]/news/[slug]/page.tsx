import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import NewsDetailClient from './NewsDetailClient';
import type { Locale } from '@/lib/types';
import { notFound } from 'next/navigation';

// News articles data
const newsArticles = [
  {
    id: '1',
    slug: 'suzuki-gsx-club-indonesia-visit',
    title: {
      id: 'SyneRal Kedatangan Tamu dari Komunitas Suzuki GSX Club Indonesia',
      en: 'SyneRal Welcomes Visitors from Suzuki GSX Club Indonesia Community',
    },
    date: '2018-11-27',
    summary: {
      id: 'Komunitas pemilik Suzuki GSX yaitu GSX Club Indonesia (GCI) pada 12 November 2018 lalu melakukan kunjungan ke kantor pusat pelumas SyneRal.',
      en: 'The Suzuki GSX owners community, GSX Club Indonesia (GCI), visited SyneRal lubricant headquarters on November 12, 2018.',
    },
    content: {
      id: `Komunitas pemilik Suzuki GSX yaitu GSX Club Indonesia (GCI) pada 12 November 2018 lalu melakukan kunjungan ke kantor pusat pelumas SyneRal.

Kunjungan ini merupakan bagian dari program silaturahmi dan edukasi produk yang diselenggarakan oleh SyneRal Indonesia. Para anggota GCI mendapat kesempatan untuk melihat langsung proses produksi pelumas berkualitas tinggi di fasilitas SyneRal.

Dalam kunjungan tersebut, tim SyneRal memberikan penjelasan mengenai teknologi Full Synthetic Plus Ester yang digunakan dalam produk-produk unggulan mereka. Para peserta juga mendapat pengetahuan tentang pentingnya pemilihan oli yang tepat untuk motor sport seperti Suzuki GSX.

Acara ini semakin mempererat hubungan antara SyneRal dengan komunitas motor di Indonesia, dan menunjukkan komitmen SyneRal dalam mendukung para pecinta motor sport tanah air.`,
      en: `The Suzuki GSX owners community, GSX Club Indonesia (GCI), visited SyneRal lubricant headquarters on November 12, 2018.

This visit was part of a networking and product education program organized by SyneRal Indonesia. GCI members had the opportunity to see firsthand the production process of high-quality lubricants at the SyneRal facility.

During the visit, the SyneRal team provided explanations about the Full Synthetic Plus Ester technology used in their flagship products. Participants also gained knowledge about the importance of choosing the right oil for sport motorcycles like the Suzuki GSX.

This event strengthened the relationship between SyneRal and motorcycle communities in Indonesia, demonstrating SyneRal's commitment to supporting sport motorcycle enthusiasts nationwide.`,
    },
    image: '/images/news/news-1.jpg',
    category: { id: 'Komunitas', en: 'Community' },
  },
  {
    id: '2',
    slug: 'enduro-bandung-bagja-sponsorship',
    title: {
      id: 'SyneRal, Pelumas Indonesia Sponsori Balap Enduro Bandung Bagja',
      en: 'SyneRal, Indonesian Lubricant Sponsors Enduro Racing Bandung Bagja',
    },
    date: '2018-11-15',
    summary: {
      id: 'Pelumas berkualitas buatan Indonesia, SyneRal, mensponsori acara kompetisi balap Enduro Exhibition Bandung Bagja.',
      en: 'Quality Indonesian-made lubricant, SyneRal, sponsored the Enduro Exhibition Bandung Bagja racing competition.',
    },
    content: {
      id: `Pelumas berkualitas buatan Indonesia, SyneRal, mensponsori acara kompetisi balap Enduro Exhibition Bandung Bagja.

Kompetisi balap enduro ini diselenggarakan di Bandung dan diikuti oleh puluhan peserta dari berbagai daerah. SyneRal hadir sebagai sponsor utama untuk mendukung perkembangan olahraga balap motor di Indonesia.

Dalam ajang ini, SyneRal membuktikan kualitas produknya melalui performa motor-motor yang menggunakan pelumas SyneRal Full Synthetic Plus Ester. Para pembalap merasakan perbedaan signifikan dalam hal akselerasi dan perlindungan mesin selama kompetisi berlangsung.

Keikutsertaan SyneRal dalam event balap seperti ini merupakan bagian dari strategi perusahaan untuk terus menguji dan membuktikan kualitas produk di kondisi paling ekstrem.`,
      en: `Quality Indonesian-made lubricant, SyneRal, sponsored the Enduro Exhibition Bandung Bagja racing competition.

This enduro racing competition was held in Bandung and participated by dozens of contestants from various regions. SyneRal was present as the main sponsor to support the development of motorcycle racing sports in Indonesia.

In this event, SyneRal proved the quality of its products through the performance of motorcycles using SyneRal Full Synthetic Plus Ester lubricant. The racers felt a significant difference in terms of acceleration and engine protection during the competition.

SyneRal's participation in racing events like this is part of the company's strategy to continuously test and prove product quality under the most extreme conditions.`,
    },
    image: '/images/news/news-2.jpg',
    category: { id: 'Event', en: 'Event' },
  },
  {
    id: '3',
    slug: 'pengenalan-oli-ester',
    title: {
      id: 'Pengenalan Oli Ester',
      en: 'Introduction to Ester Oil',
    },
    date: '2018-07-25',
    summary: {
      id: 'Oli full synthetic ester adalah pilihan terbaik untuk mesin performa tinggi dan aplikasi balap.',
      en: 'Full synthetic ester oil is the best choice for high-performance engines and racing applications.',
    },
    content: {
      id: `Oli full synthetic ester adalah pilihan terbaik untuk mesin performa tinggi dan aplikasi balap yang membutuhkan operasi RPM tinggi secara berkelanjutan.

Ester adalah senyawa kimia yang terbentuk dari reaksi antara asam dan alkohol. Dalam dunia pelumas, ester sintetis menawarkan beberapa keunggulan dibanding base oil konvensional:

1. Stabilitas Termal Superior - Ester dapat menahan suhu operasi yang sangat tinggi tanpa mengalami degradasi.

2. Kemampuan Pelumasan Lebih Baik - Molekul ester memiliki polaritas yang memungkinkan mereka "menempel" pada permukaan logam, memberikan lapisan pelindung yang lebih efektif.

3. Biodegradable - Ester lebih ramah lingkungan karena dapat terurai secara alami.

4. Interval Ganti Oli Lebih Panjang - Karena stabilitasnya, oli ester dapat bertahan lebih lama dalam kondisi operasi berat.

SyneRal Full Synthetic Plus Ester mengkombinasikan teknologi ester dengan base oil sintetis premium untuk memberikan perlindungan maksimal pada mesin motor Anda.`,
      en: `Full synthetic ester oil is the best choice for high-performance engines and racing applications requiring sustained high RPM operation.

Ester is a chemical compound formed from the reaction between acid and alcohol. In the world of lubricants, synthetic esters offer several advantages over conventional base oils:

1. Superior Thermal Stability - Esters can withstand very high operating temperatures without degradation.

2. Better Lubrication Capability - Ester molecules have polarity that allows them to "stick" to metal surfaces, providing a more effective protective layer.

3. Biodegradable - Esters are more environmentally friendly as they can decompose naturally.

4. Longer Oil Change Intervals - Due to their stability, ester oils can last longer under heavy operating conditions.

SyneRal Full Synthetic Plus Ester combines ester technology with premium synthetic base oil to provide maximum protection for your motorcycle engine.`,
    },
    image: '/images/news/news-3.jpg',
    category: { id: 'Edukasi', en: 'Education' },
  },
  {
    id: '4',
    slug: 'penggunaan-di-arena-balap',
    title: {
      id: 'Penggunaan di Arena Balap',
      en: 'Usage in Racing Arena',
    },
    date: '2018-07-25',
    summary: {
      id: 'Tren konsumsi oli premium di kalangan pengendara motor di kota-kota besar terus meningkat.',
      en: 'Premium oil consumption trends among motorcycle riders in major cities continue to rise.',
    },
    content: {
      id: `Tren konsumsi oli premium di kalangan pengendara motor di kota-kota besar terus meningkat. Pembalap mencari pelumas berperforma tinggi yang mampu menjaga mesin dalam kondisi optimal di arena balap.

Di arena balap, mesin motor bekerja pada kondisi yang sangat ekstrem:
- RPM tinggi secara terus-menerus
- Suhu operasi yang sangat tinggi
- Beban mesin yang maksimal

Dalam kondisi seperti ini, oli biasa tidak mampu memberikan perlindungan yang memadai. Inilah mengapa pembalap profesional memilih oli full synthetic dengan teknologi ester.

SyneRal telah membuktikan kualitasnya di berbagai ajang balap nasional. Para pembalap yang menggunakan SyneRal Full Synthetic Plus Ester melaporkan:
- Akselerasi lebih responsif
- Perpindahan gigi lebih halus
- Suhu mesin lebih terjaga
- Tenaga mesin lebih stabil sepanjang balapan

Pengalaman di arena balap ini kemudian diterapkan dalam pengembangan produk untuk konsumen umum, memastikan setiap pengguna SyneRal mendapatkan performa terbaik.`,
      en: `Premium oil consumption trends among motorcycle riders in major cities continue to rise. Racers seek high-performance lubricants capable of keeping engines in optimal condition on the racing track.

In the racing arena, motorcycle engines work under very extreme conditions:
- Continuously high RPM
- Very high operating temperatures
- Maximum engine load

Under such conditions, regular oil cannot provide adequate protection. This is why professional racers choose full synthetic oil with ester technology.

SyneRal has proven its quality in various national racing events. Racers using SyneRal Full Synthetic Plus Ester report:
- More responsive acceleration
- Smoother gear shifts
- Better maintained engine temperature
- More stable engine power throughout the race

This racing arena experience is then applied in product development for general consumers, ensuring every SyneRal user gets the best performance.`,
    },
    image: '/images/news/news-4.jpg',
    category: { id: 'Balap', en: 'Racing' },
  },
  {
    id: '5',
    slug: 'oli-sintetis-vs-oli-biasa',
    title: {
      id: 'Oli Sintetis vs Oli Biasa',
      en: 'Synthetic Oil vs Regular Oil',
    },
    date: '2018-07-25',
    summary: {
      id: 'Oli sintetis memiliki lima keunggulan utama dibanding oli mineral biasa.',
      en: 'Synthetic oil has five key advantages over regular mineral oil.',
    },
    content: {
      id: `Oli sintetis memiliki lima keunggulan utama dibanding oli mineral biasa:

1. KETAHANAN SUHU LEBIH BAIK
Oli sintetis dapat bekerja optimal pada rentang suhu yang lebih luas, dari suhu dingin saat start pagi hari hingga suhu tinggi saat berkendara di kemacetan.

2. INTERVAL GANTI OLI LEBIH PANJANG
Molekul oli sintetis lebih seragam dan stabil, sehingga tidak mudah terurai. Ini memungkinkan interval ganti oli yang lebih panjang tanpa mengorbankan perlindungan mesin.

3. PERLINDUNGAN MESIN SUPERIOR
Oli sintetis memberikan lapisan pelumas yang lebih konsisten dan tahan lama, mengurangi gesekan dan keausan pada komponen mesin.

4. EFISIENSI BAHAN BAKAR
Karena gesekan yang lebih rendah, mesin dapat bekerja lebih efisien sehingga konsumsi bahan bakar menjadi lebih hemat.

5. PERFORMA OPTIMAL DI SEGALA KONDISI
Baik untuk perjalanan harian di perkotaan maupun touring jarak jauh, oli sintetis mampu menjaga performa mesin secara konsisten.

SyneRal menawarkan rangkaian oli sintetis yang diformulasikan khusus untuk memenuhi kebutuhan pengendara motor Indonesia, dari SyneRal Synthetic untuk penggunaan harian hingga SyneRal Full Synthetic Plus Ester untuk performa maksimal.`,
      en: `Synthetic oil has five key advantages over regular mineral oil:

1. BETTER TEMPERATURE RESISTANCE
Synthetic oil can work optimally across a wider temperature range, from cold temperatures during morning starts to high temperatures when riding in traffic.

2. LONGER OIL CHANGE INTERVALS
Synthetic oil molecules are more uniform and stable, so they don't break down easily. This allows for longer oil change intervals without sacrificing engine protection.

3. SUPERIOR ENGINE PROTECTION
Synthetic oil provides a more consistent and durable lubricating layer, reducing friction and wear on engine components.

4. FUEL EFFICIENCY
Due to lower friction, the engine can work more efficiently, resulting in more economical fuel consumption.

5. OPTIMAL PERFORMANCE IN ALL CONDITIONS
Whether for daily urban commuting or long-distance touring, synthetic oil can maintain consistent engine performance.

SyneRal offers a range of synthetic oils specially formulated to meet the needs of Indonesian motorcycle riders, from SyneRal Synthetic for daily use to SyneRal Full Synthetic Plus Ester for maximum performance.`,
    },
    image: '/images/news/news-5.jpg',
    category: { id: 'Edukasi', en: 'Education' },
  },
];

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale() as Locale;
  const article = newsArticles.find(a => a.slug === slug);

  if (!article) {
    return { title: 'Not Found' };
  }

  return {
    title: article.title[locale],
    description: article.summary[locale],
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale() as Locale;
  const article = newsArticles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <NewsDetailClient article={article} locale={locale} />;
}
