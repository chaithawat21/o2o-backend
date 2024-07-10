const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hashedPassword = bcrypt.hashSync("123456", 10);

const Users = [
  {
    username: 'andy',
    password: '$2a$10$/.ba6dICe4.3oZOaGjRtc.uWbMVidKheJ9KF9FdC8C.omhMs9fsam',
    email: 'andy@gmail.com',
    firstname: 'Andy',
    lastname: 'Dyan',
    date_birth: new Date('2000-01-01').toISOString(),
    address: 'Bangkok',
    phone_number: '0868452314'
  },
  {
    username: 'bob',
    password: '$2a$10$F7nt7g2We5k21l/x0wsNOun.LiwGt.6oB4XJd6bbeG/9oFPZN2MZ2',
    email: 'bob@gmail.com',
    firstname: 'Bob',
    lastname: 'Smith',
    date_birth: new Date('1995-02-02').toISOString(),
    address: 'Chiang Mai',
    phone_number: '0868452315'
  },
  {
    username: 'charlie',
    password: '$2a$10$YKyJ8EM.l2kciR0Falz9oe5nU3DLhG/gkG4Synd1joQMjI3qochVO',
    email: 'charlie@gmail.com',
    firstname: 'Charlie',
    lastname: 'Johnson',
    date_birth: new Date('1990-03-03').toISOString(),
    address: 'Phuket',
    phone_number: '0868452316'
  },
  {
    username: 'david',
    password: '$2a$10$PqUV0N6iIJPSra34IK6TSuq/LJ2sFEv1/pqNPLJCf4bFfaCYVY49W',
    email: 'david@gmail.com',
    firstname: 'David',
    lastname: 'Williams',
    date_birth: new Date('1985-04-04').toISOString(),
    address: 'Pattaya',
    phone_number: '0868452317'
  },
  {
    username: 'emma',
    password: '$2a$10$sqZoOThvPCh7Jvlgg7UsHO4Kmdrk8wTvbo.NJOBVwppbTADVWL/de',
    email: 'emma@gmail.com',
    firstname: 'Emma',
    lastname: 'Brown',
    date_birth: new Date('1980-05-05').toISOString(),
    address: 'Hua Hin',
    phone_number: '0868452318'
  },
  {
    username: 'frank',
    password: '$2a$10$GUY0yQos45bda7D0yJI0wO1SGA/dVFzGFOeDdmLnje09gmsscW3pK',
    email: 'frank@gmail.com',
    firstname: 'Frank',
    lastname: 'Davis',
    date_birth: new Date('1975-06-06').toISOString(),
    address: 'Rayong',
    phone_number: '0868452319'
  }]

const Carts = [
  { date: new Date('2024-07-07').toISOString(), lender_id: 1 },
  { date: new Date('2024-07-07').toISOString(), lender_id: 2 },
  { date: new Date('2024-07-06').toISOString(), lender_id: 3 },
  { date: new Date('2024-07-05').toISOString(), lender_id: 4 },
  { date: new Date('2024-07-04').toISOString(), lender_id: 5 },
  { date: new Date('2024-07-03').toISOString(), lender_id: 6 }
]

const Loans = [
  {
    borrower_id: 1,
    created_date: new Date('2024-06-01').toISOString(),
    purpose: 'Buy seeds and fertilizers',
    story: 'Starting a small agricultural business',
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
    borrower_id: 1,
    created_date: new Date('2024-06-07').toISOString(),
    purpose: 'Marketing campaign',
    story: 'Launching a marketing campaign to boost sales',
    total_amount: 6000,
    categorie_id: 4,
    business_address: 30
  },
  {
    borrower_id: 2,
    created_date: new Date('2024-06-08').toISOString(),
    purpose: 'Buy livestock',
    story: 'Starting a small livestock farm',
    total_amount: 7000,
    categorie_id: 6,
    business_address: 1
  },
  {
    borrower_id: 3,
    created_date: new Date('2024-06-09').toISOString(),
    purpose: 'Hire employees',
    story: 'Hiring employees to expand my business',
    total_amount: 14000,
    categorie_id: 4,
    business_address: 3
  },
  {
    borrower_id: 4,
    created_date: new Date('2024-06-10').toISOString(),
    purpose: 'Upgrade technology',
    story: 'Upgrading technology to improve efficiency',
    total_amount: 11000,
    categorie_id: 5,
    business_address: 54
  },
  {
    borrower_id: 5,
    created_date: new Date('2024-06-11').toISOString(),
    purpose: 'Develop website',
    story: 'Developing a website to reach more customers',
    total_amount: 9000,
    categorie_id: 8,
    business_address: 3
  },
  {
    borrower_id: 6,
    created_date: new Date('2024-06-12').toISOString(),
    purpose: 'Purchase materials',
    story: 'Purchasing materials for my handmade crafts business',
    total_amount: 4000,
    categorie_id: 7,
    business_address: 57
  }
]

const Lends = [
  {user_id: 1, history_id:null, loan_id: 1, amount: 100},
  {user_id: 2, history_id:null, loan_id: 2, amount: 150},
  {user_id: 3, history_id:null, loan_id: 3, amount: 200},
  {user_id: 4, history_id:null, loan_id: 4, amount: 250},
  {user_id: 5, history_id:null, loan_id: 5, amount: 300},
  {user_id: 6, history_id:null, loan_id: 6, amount: 350},
  {user_id: 1, history_id:null, loan_id: 2, amount: 700},
  {user_id: 2, history_id:null, loan_id: 3, amount: 750},
  {user_id: 3, history_id:null, loan_id: 4, amount: 800},
  {user_id: 4, history_id:null, loan_id: 5, amount: 850},
  {user_id: 5, history_id:null, loan_id: 6, amount: 900},
  {user_id: 6, history_id:null, loan_id: 7, amount: 950},
  {user_id: 1, history_id:null, loan_id: 3, amount: 1300},
  {user_id: 2, history_id:null, loan_id: 4, amount: 1350},
  {user_id: 3, history_id:null, loan_id: 5, amount: 1400},
  {user_id: 4, history_id:null, loan_id: 6, amount: 1450},
  {user_id: 5, history_id:null, loan_id: 7, amount: 1500},
  {user_id: 6, history_id:null, loan_id: 8, amount: 1550}
]

const categories = [
  {categorie_name: "Agriculture"},
  {categorie_name: "Arts"},
  {categorie_name: "Education"},
  {categorie_name: "Food"},
  {categorie_name: "Health"},
  {categorie_name: "Livestock"},
  {categorie_name: "Single parents"},
  {categorie_name: "Others"}
]

const regions = [
  {region_name: "Northern"},
  {region_name: "Northeastern"},
  {region_name: "Central"},
  {region_name: "Eastern"},
  {region_name: "Western"},
  {region_name: "Southern"}
];

const provinces = [
  {region_id: 1, province_name: "Chiang Mai"},
  {region_id: 1, province_name: "Chiang Rai"},
  {region_id: 1, province_name: "Lampang"},
  {region_id: 1, province_name: "Lamphun"},
  {region_id: 1, province_name: "Mae Hong Son"},
  {region_id: 1, province_name: "Nan"},
  {region_id: 1, province_name: "Phayao"},
  {region_id: 1, province_name: "Phrae"},
  {region_id: 1, province_name: "Uttaradit"},
  {region_id: 2, province_name: "Kalasin"},
  {region_id: 2, province_name: "Khon Kaen"},
  {region_id: 2, province_name: "Chaiyaphum"},
  {region_id: 2, province_name: "Nakhon Phanom"},
  {region_id: 2, province_name: "Nakhon Ratchasima"},
  {region_id: 2, province_name: "Bueng Kan"},
  {region_id: 2, province_name: "Buriram"},
  {region_id: 2, province_name: "Maha Sarakham"},
  {region_id: 2, province_name: "Mukdahan"},
  {region_id: 2, province_name: "Yasothon"},
  {region_id: 2, province_name: "Roi Et"},
  {region_id: 2, province_name: "Loei"},
  {region_id: 2, province_name: "Sakon Nakhon"},
  {region_id: 2, province_name: "Surin"},
  {region_id: 2, province_name: "Sisaket"},
  {region_id: 2, province_name: "Nong Khai"},
  {region_id: 2, province_name: "Nong Bua Lamphu"},
  {region_id: 2, province_name: "Udon Thani"},
  {region_id: 2, province_name: "Ubon Ratchathani"},
  {region_id: 2, province_name: "Amnat Charoen"},
  {region_id: 3, province_name: "Bangkok"},
  {region_id: 3, province_name: "Kamphaeng Phet"},
  {region_id: 3, province_name: "Chai Nat"},
  {region_id: 3, province_name: "Nakhon Nayok"},
  {region_id: 3, province_name: "Nakhon Pathom"},
  {region_id: 3, province_name: "Nakhon Sawan"},
  {region_id: 3, province_name: "Nonthaburi"},
  {region_id: 3, province_name: "Pathum Thani"},
  {region_id: 3, province_name: "Phra Nakhon Si Ayutthaya"},
  {region_id: 3, province_name: "Phichit"},
  {region_id: 3, province_name: "Phitsanulok"},
  {region_id: 3, province_name: "Phetchabun"},
  {region_id: 3, province_name: "Lopburi"},
  {region_id: 3, province_name: "Samut Prakan"},
  {region_id: 3, province_name: "Samut Songkhram"},
  {region_id: 3, province_name: "Samut Sakhon"},
  {region_id: 3, province_name: "Sing Buri"},
  {region_id: 3, province_name: "Sukhothai"},
  {region_id: 3, province_name: "Suphan Buri"},
  {region_id: 3, province_name: "Saraburi"},
  {region_id: 3, province_name: "Ang Thong"},
  {region_id: 3, province_name: "Uthai Thani"},
  {region_id: 4, province_name: "Chanthaburi"},
  {region_id: 4, province_name: "Chachoengsao"},
  {region_id: 4, province_name: "Chonburi"},
  {region_id: 4, province_name: "Trat"},
  {region_id: 4, province_name: "Prachinburi"},
  {region_id: 4, province_name: "Rayong"},
  {region_id: 4, province_name: "Sa Kaeo"},
  {region_id: 5, province_name: "Kanchanaburi"},
  {region_id: 5, province_name: "Tak"},
  {region_id: 5, province_name: "Prachuap Khiri Khan"},
  {region_id: 5, province_name: "Phetchaburi"},
  {region_id: 5, province_name: "Ratchaburi"},
  {region_id: 6, province_name: "Krabi"},
  {region_id: 6, province_name: "Chumphon"},
  {region_id: 6, province_name: "Trang"},
  {region_id: 6, province_name: "Nakhon Si Thammarat"},
  {region_id: 6, province_name: "Narathiwat"},
  {region_id: 6, province_name: "Pattani"},
  {region_id: 6, province_name: "Phang Nga"},
  {region_id: 6, province_name: "Phatthalung"},
  {region_id: 6, province_name: "Phuket"},
  {region_id: 6, province_name: "Ranong"},
  {region_id: 6, province_name: "Satun"},
  {region_id: 6, province_name: "Songkhla"},
  {region_id: 6, province_name: "Surat Thani"},
  {region_id: 6, province_name: "Yala"}
];

async function run() {
  await prisma.user.createMany({ data: Users });
  await prisma.regions.createMany({ data: regions });
  await prisma.provinces.createMany({ data: provinces });
  await prisma.categories.createMany({ data: categories });
  await prisma.loan.createMany({ data: Loans });
  await prisma.lend.createMany({ data: Lends });
}
run();