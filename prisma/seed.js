const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Users = [
  {
    username: 'andy',
    password: '$2a$10$/.ba6dICe4.3oZOaGjRtc.uWbMVidKheJ9KF9FdC8C.omhMs9fsam',
    email: 'andy@gmail.com',
    firstname: 'Andy',
    lastname: 'Dyan',
    date_birth: new Date('2000-01-01').toISOString(),
    address: 'Bangkok',
    phone_number: '0868452314',
    verified: true,
    ImgUrl: '/uploads/1721061019639-882123812.png'
  },
  {
    username: 'bob',
    password: '$2a$10$F7nt7g2We5k21l/x0wsNOun.LiwGt.6oB4XJd6bbeG/9oFPZN2MZ2',
    email: 'bob@gmail.com',
    firstname: 'Bob',
    lastname: 'Smith',
    date_birth: new Date('1995-02-02').toISOString(),
    address: 'Chiang Mai',
    phone_number: '0868452315',
    verified: true,
    ImgUrl: '/uploads/1721061061829-41182734.png'
  },
  {
    username: 'charlie',
    password: '$2a$10$YKyJ8EM.l2kciR0Falz9oe5nU3DLhG/gkG4Synd1joQMjI3qochVO',
    email: 'charlie@gmail.com',
    firstname: 'Charlie',
    lastname: 'Johnson',
    date_birth: new Date('1990-03-03').toISOString(),
    address: 'Phuket',
    phone_number: '0868452316',
    verified: true,
    ImgUrl: '/uploads/1721061103653-901139623.png'
  },
  {
    username: 'david',
    password: '$2a$10$PqUV0N6iIJPSra34IK6TSuq/LJ2sFEv1/pqNPLJCf4bFfaCYVY49W',
    email: 'david@gmail.com',
    firstname: 'David',
    lastname: 'Williams',
    date_birth: new Date('1985-04-04').toISOString(),
    address: 'Pattaya',
    phone_number: '0868452317',
    verified: true,
    ImgUrl: '/uploads/1721061187070-953318846.png'
  },
  {
    username: 'emma',
    password: '$2a$10$sqZoOThvPCh7Jvlgg7UsHO4Kmdrk8wTvbo.NJOBVwppbTADVWL/de',
    email: 'emma@gmail.com',
    firstname: 'Emma',
    lastname: 'Brown',
    date_birth: new Date('1980-05-05').toISOString(),
    address: 'Hua Hin',
    phone_number: '0868452318',
    verified: true,
    ImgUrl: '/uploads/1721061236207-983333935.png'
  },
  {
    username: 'frank',
    password: '$2a$10$GUY0yQos45bda7D0yJI0wO1SGA/dVFzGFOeDdmLnje09gmsscW3pK',
    email: 'frank@gmail.com',
    firstname: 'Frank',
    lastname: 'Davis',
    date_birth: new Date('1975-06-06').toISOString(),
    address: 'Rayong',
    phone_number: '0868452319',
    verified: true,
    ImgUrl: '/uploads/1721061268231-199146657.png'
  },
  {
    username: 'admin',
    password: '$2a$10$CNUq04Sq4ckpDCG4LlxXJeIPrAW0yf1TA.7ef9H3JHo3MGwJoipdm',
    email: 'admin@o2o.com',
    firstname: 'Adan',
    lastname: 'Loser',
    date_birth: new Date('1999-09-09').toISOString(),
    address: 'Bangkok',
    phone_number: '0999999999',
    verified: true
  },

  {
    username: 'george',
    password: '',
    email: 'george@gmail.com',
    firstname: 'George',
    lastname: 'Miller',
    date_birth: new Date('1998-07-07').toISOString(),
    address: 'Krabi',
    phone_number: '0868452320',
    verified: true
  },
  {
    username: 'hannah',
    password: '',
    email: 'hannah@gmail.com',
    firstname: 'Hannah',
    lastname: 'Martinez',
    date_birth: new Date('1994-08-08').toISOString(),
    address: 'Koh Samui',
    phone_number: '0868452321',
    verified: true
  },
  {
    username: 'ian',
    password: '',
    email: 'ian@gmail.com',
    firstname: 'Ian',
    lastname: 'Garcia',
    date_birth: new Date('1992-09-09').toISOString(),
    address: 'Ayutthaya',
    phone_number: '0868452322',
    verified: true
  },
  {
    username: 'julia',
    password: '',
    email: 'julia@gmail.com',
    firstname: 'Julia',
    lastname: 'Roberts',
    date_birth: new Date('1990-10-10').toISOString(),
    address: 'Hat Yai',
    phone_number: '0868452323',
    verified: true
  },
  {
    username: 'kevin',
    password: '',
    email: 'kevin@gmail.com',
    firstname: 'Kevin',
    lastname: 'Lopez',
    date_birth: new Date('1988-11-11').toISOString(),
    address: 'Nakhon Ratchasima',
    phone_number: '0868452324',
    verified: true
  },
  {
    username: 'lisa',
    password: '',
    email: 'lisa@gmail.com',
    firstname: 'Lisa',
    lastname: 'Clark',
    date_birth: new Date('1986-12-12').toISOString(),
    address: 'Nong Khai',
    phone_number: '0868452325',
    verified: true
  },
  {
    username: 'michael',
    password: '',
    email: 'michael@gmail.com',
    firstname: 'Michael',
    lastname: 'White',
    date_birth: new Date('1984-01-13').toISOString(),
    address: 'Chiang Rai',
    phone_number: '0868452326',
    verified: true
  },
  {
    username: 'nancy',
    password: '',
    email: 'nancy@gmail.com',
    firstname: 'Nancy',
    lastname: 'King',
    date_birth: new Date('1982-02-14').toISOString(),
    address: 'Khon Kaen',
    phone_number: '0868452327',
    verified: true
  },
  {
    username: 'oliver',
    password: '',
    email: 'oliver@gmail.com',
    firstname: 'Oliver',
    lastname: 'Hall',
    date_birth: new Date('1981-03-15').toISOString(),
    address: 'Surat Thani',
    phone_number: '0868452328',
    verified: true
  },
  {
    username: 'pamela',
    password: '',
    email: 'pamela@gmail.com',
    firstname: 'Pamela',
    lastname: 'Young',
    date_birth: new Date('1983-04-16').toISOString(),
    address: 'Trang',
    phone_number: '0868452329',
    verified: true
  },
  {
    username: 'quincy',
    password: '',
    email: 'quincy@gmail.com',
    firstname: 'Quincy',
    lastname: 'Scott',
    date_birth: new Date('1987-05-17').toISOString(),
    address: 'Lampang',
    phone_number: '0868452330',
    verified: true
  }
];

const Loans = [
  {
    borrower_id: 1,
    created_date: new Date('2024-06-01').toISOString(),
    purpose: 'Buy seeds and fertilizers',
    story: `Starting a small agricultural business to uplift the lives of our local community. Our farm aims to provide fresh, organic produce to nearby markets, creating a sustainable food source and boosting local economy. With your help, we can buy high-quality seeds and fertilizers that will significantly increase our crop yield. This will not only improve our livelihood but also support the education of our children and the health of our families. Our commitment to sustainable farming practices ensures that we preserve the environment for future generations. By supporting our loan, you're investing in a community's growth, health, and future. We believe in hard work, dedication, and the power of community support to overcome challenges and create a better tomorrow. Your contribution will make a tangible difference, allowing us to improve our farming techniques, increase productivity, and achieve greater financial stability. Thank you for believing in our vision and helping us achieve our dreams.`,
    total_amount: 10000,
    categorie_id: 1,
    business_address: 30
  },
  {
    borrower_id: 2,
    created_date: new Date('2024-06-02').toISOString(),
    purpose: 'Expand my art studio',
    story: 'Expanding a small art studio to host more students',
    total_amount: 15000,
    categorie_id: 2,
    business_address: 1
  },
  {
    borrower_id: 3,
    created_date: new Date('2024-06-03').toISOString(),
    purpose: 'Buy art supplies',
    story: 'Need art supplies to improve my art services',
    total_amount: 8000,
    categorie_id: 2,
    business_address: 3
  },
  {
    borrower_id: 4,
    created_date: new Date('2024-06-04').toISOString(),
    purpose: 'Buy farming equipment',
    story: 'Starting a small farming business',
    total_amount: 5000,
    categorie_id: 1,
    business_address: 54
  },
  {
    borrower_id: 5,
    created_date: new Date('2024-06-05').toISOString(),
    purpose: 'Open new branch',
    story: 'Opening a new retail branch to serve more customers',
    total_amount: 20000,
    categorie_id: 8,
    business_address: 3
  },
  {
    borrower_id: 6,
    created_date: new Date('2024-06-06').toISOString(),
    purpose: 'Renovate shop',
    story: 'Renovating my shop for better customer experience',
    total_amount: 12000,
    categorie_id: 8,
    business_address: 57
  },
  {
    borrower_id: 16,
    created_date: new Date('2024-06-07').toISOString(),
    purpose: 'Marketing campaign',
    story: 'Launching a marketing campaign to boost sales',
    total_amount: 6000,
    categorie_id: 4,
    business_address: 30
  },
  {
    borrower_id: 8,
    created_date: new Date('2024-06-08').toISOString(),
    purpose: 'Buy livestock',
    story: 'Starting a small livestock farm',
    total_amount: 7000,
    categorie_id: 6,
    business_address: 1
  },
  {
    borrower_id: 9,
    created_date: new Date('2024-06-09').toISOString(),
    purpose: 'Hire employees',
    story: 'Hiring employees to expand my business',
    total_amount: 14000,
    categorie_id: 4,
    business_address: 3
  },
  {
    borrower_id: 10,
    created_date: new Date('2024-06-10').toISOString(),
    purpose: 'Upgrade technology',
    story: 'Upgrading technology to improve efficiency',
    total_amount: 11000,
    categorie_id: 5,
    business_address: 54
  },
  {
    borrower_id: 11,
    created_date: new Date('2024-06-11').toISOString(),
    purpose: 'Develop website',
    story: 'Developing a website to reach more customers',
    total_amount: 9000,
    categorie_id: 8,
    business_address: 3
  },
  {
    borrower_id: 12,
    created_date: new Date('2024-06-12').toISOString(),
    purpose: 'Purchase materials',
    story: 'Purchasing materials for my handmade crafts business',
    total_amount: 4000,
    categorie_id: 7,
    business_address: 57
  },

  {
    borrower_id: 13,
    created_date: new Date('2024-06-16').toISOString(),
    purpose: 'Build a greenhouse',
    story: 'Building a greenhouse to grow organic vegetables',
    total_amount: 15000,
    categorie_id: 1,
    business_address: 10
  },
  {
    borrower_id: 14,
    created_date: new Date('2024-06-17').toISOString(),
    purpose: 'Buy musical instruments',
    story: 'Buying musical instruments for a community music program',
    total_amount: 12000,
    categorie_id: 2,
    business_address: 20
  },
  {
    borrower_id: 15,
    created_date: new Date('2024-06-18').toISOString(),
    purpose: 'Open a health clinic',
    story: 'Opening a small health clinic in my community',
    total_amount: 20000,
    categorie_id: 5,
    business_address: 50
  }
]
const donate = [
  { user_id: 1, history_id: null, amount: 100 },
  { user_id: 2, history_id: null, amount: 150 },
  { user_id: 3, history_id: null, amount: 200 }
]
const Lends = [
  { user_id: 1, history_id: null, loan_id: 1, amount: 100 },
  { user_id: 2, history_id: null, loan_id: 2, amount: 150 },
  { user_id: 3, history_id: null, loan_id: 3, amount: 200 },
  { user_id: 4, history_id: null, loan_id: 4, amount: 250 },
  { user_id: 5, history_id: null, loan_id: 5, amount: 300 },
  { user_id: 6, history_id: null, loan_id: 6, amount: 350 },
  { user_id: 1, history_id: null, loan_id: 2, amount: 700 },
  { user_id: 2, history_id: null, loan_id: 3, amount: 750 },
  { user_id: 3, history_id: null, loan_id: 4, amount: 800 },
  { user_id: 4, history_id: null, loan_id: 5, amount: 850 },
  { user_id: 5, history_id: null, loan_id: 6, amount: 900 },
  { user_id: 6, history_id: null, loan_id: 7, amount: 950 },
  { user_id: 1, history_id: null, loan_id: 3, amount: 1300 },
  { user_id: 2, history_id: null, loan_id: 4, amount: 1350 },
  { user_id: 3, history_id: null, loan_id: 5, amount: 1400 },
  { user_id: 4, history_id: null, loan_id: 6, amount: 1450 },
  { user_id: 5, history_id: null, loan_id: 7, amount: 1500 },
  { user_id: 6, history_id: null, loan_id: 8, amount: 1550 },
  // adjust progress bar part
  { user_id: 7, history_id: null, loan_id: 1, amount: 7000, status: true }, //70%
  { user_id: 7, history_id: null, loan_id: 2, amount: 9000, status: true }, //60%
  { user_id: 7, history_id: null, loan_id: 3, amount: 7200, status: true }, //90%
  { user_id: 7, history_id: null, loan_id: 4, amount: 3000, status: true }, //60%
  { user_id: 7, history_id: null, loan_id: 5, amount: 14000, status: true }, //70%
  { user_id: 7, history_id: null, loan_id: 6, amount: 4800, status: true }, //40%
  { user_id: 7, history_id: null, loan_id: 7, amount: 3000, status: true }, //50%
  { user_id: 7, history_id: null, loan_id: 8, amount: 4200, status: true }, //60%
  { user_id: 7, history_id: null, loan_id: 9, amount: 4200, status: true }, //30%
  { user_id: 7, history_id: null, loan_id: 10, amount: 4400, status: true }, //40%
  { user_id: 7, history_id: null, loan_id: 11, amount: 1800, status: true }, //20%
  { user_id: 7, history_id: null, loan_id: 12, amount: 1200, status: true }, //30%
  { user_id: 7, history_id: null, loan_id: 13, amount: 1500, status: true }, //10%
  { user_id: 7, history_id: null, loan_id: 14, amount: 2400, status: true }, //20%
  { user_id: 7, history_id: null, loan_id: 15, amount: 2000, status: true } //10%
]

const categories = [
  { categorie_name: "Agriculture" },
  { categorie_name: "Arts" },
  { categorie_name: "Education" },
  { categorie_name: "Food" },
  { categorie_name: "Health" },
  { categorie_name: "Livestock" },
  { categorie_name: "Single parents" },
  { categorie_name: "Others" }
]

const regions = [
  { region_name: "Northern" },
  { region_name: "Northeastern" },
  { region_name: "Central" },
  { region_name: "Eastern" },
  { region_name: "Western" },
  { region_name: "Southern" }
];

const provinces = [
  { region_id: 1, province_name: "Chiang Mai" },
  { region_id: 1, province_name: "Chiang Rai" },
  { region_id: 1, province_name: "Lampang" },
  { region_id: 1, province_name: "Lamphun" },
  { region_id: 1, province_name: "Mae Hong Son" },
  { region_id: 1, province_name: "Nan" },
  { region_id: 1, province_name: "Phayao" },
  { region_id: 1, province_name: "Phrae" },
  { region_id: 1, province_name: "Uttaradit" },
  { region_id: 2, province_name: "Kalasin" },
  { region_id: 2, province_name: "Khon Kaen" },
  { region_id: 2, province_name: "Chaiyaphum" },
  { region_id: 2, province_name: "Nakhon Phanom" },
  { region_id: 2, province_name: "Nakhon Ratchasima" },
  { region_id: 2, province_name: "Bueng Kan" },
  { region_id: 2, province_name: "Buriram" },
  { region_id: 2, province_name: "Maha Sarakham" },
  { region_id: 2, province_name: "Mukdahan" },
  { region_id: 2, province_name: "Yasothon" },
  { region_id: 2, province_name: "Roi Et" },
  { region_id: 2, province_name: "Loei" },
  { region_id: 2, province_name: "Sakon Nakhon" },
  { region_id: 2, province_name: "Surin" },
  { region_id: 2, province_name: "Sisaket" },
  { region_id: 2, province_name: "Nong Khai" },
  { region_id: 2, province_name: "Nong Bua Lamphu" },
  { region_id: 2, province_name: "Udon Thani" },
  { region_id: 2, province_name: "Ubon Ratchathani" },
  { region_id: 2, province_name: "Amnat Charoen" },
  { region_id: 3, province_name: "Bangkok" },
  { region_id: 3, province_name: "Kamphaeng Phet" },
  { region_id: 3, province_name: "Chai Nat" },
  { region_id: 3, province_name: "Nakhon Nayok" },
  { region_id: 3, province_name: "Nakhon Pathom" },
  { region_id: 3, province_name: "Nakhon Sawan" },
  { region_id: 3, province_name: "Nonthaburi" },
  { region_id: 3, province_name: "Pathum Thani" },
  { region_id: 3, province_name: "Phra Nakhon Si Ayutthaya" },
  { region_id: 3, province_name: "Phichit" },
  { region_id: 3, province_name: "Phitsanulok" },
  { region_id: 3, province_name: "Phetchabun" },
  { region_id: 3, province_name: "Lopburi" },
  { region_id: 3, province_name: "Samut Prakan" },
  { region_id: 3, province_name: "Samut Songkhram" },
  { region_id: 3, province_name: "Samut Sakhon" },
  { region_id: 3, province_name: "Sing Buri" },
  { region_id: 3, province_name: "Sukhothai" },
  { region_id: 3, province_name: "Suphan Buri" },
  { region_id: 3, province_name: "Saraburi" },
  { region_id: 3, province_name: "Ang Thong" },
  { region_id: 3, province_name: "Uthai Thani" },
  { region_id: 4, province_name: "Chanthaburi" },
  { region_id: 4, province_name: "Chachoengsao" },
  { region_id: 4, province_name: "Chonburi" },
  { region_id: 4, province_name: "Trat" },
  { region_id: 4, province_name: "Prachinburi" },
  { region_id: 4, province_name: "Rayong" },
  { region_id: 4, province_name: "Sa Kaeo" },
  { region_id: 5, province_name: "Kanchanaburi" },
  { region_id: 5, province_name: "Tak" },
  { region_id: 5, province_name: "Prachuap Khiri Khan" },
  { region_id: 5, province_name: "Phetchaburi" },
  { region_id: 5, province_name: "Ratchaburi" },
  { region_id: 6, province_name: "Krabi" },
  { region_id: 6, province_name: "Chumphon" },
  { region_id: 6, province_name: "Trang" },
  { region_id: 6, province_name: "Nakhon Si Thammarat" },
  { region_id: 6, province_name: "Narathiwat" },
  { region_id: 6, province_name: "Pattani" },
  { region_id: 6, province_name: "Phang Nga" },
  { region_id: 6, province_name: "Phatthalung" },
  { region_id: 6, province_name: "Phuket" },
  { region_id: 6, province_name: "Ranong" },
  { region_id: 6, province_name: "Satun" },
  { region_id: 6, province_name: "Songkhla" },
  { region_id: 6, province_name: "Surat Thani" },
  { region_id: 6, province_name: "Yala" }
];

async function run() {
  await prisma.user.createMany({ data: Users });
  await prisma.regions.createMany({ data: regions });
  await prisma.provinces.createMany({ data: provinces });
  await prisma.categories.createMany({ data: categories });
  await prisma.loan.createMany({ data: Loans });
  await prisma.lend.createMany({ data: Lends });
  await prisma.donate.createMany({ data: donate });
}
run();
