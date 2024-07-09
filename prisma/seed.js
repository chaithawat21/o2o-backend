const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hashedPassword = bcrypt.hashSync("123456", 10);

const Users = [
    {username: 'andy', password: '$2a$10$/.ba6dICe4.3oZOaGjRtc.uWbMVidKheJ9KF9FdC8C.omhMs9fsam', email: 'andy@gmail.com', firstname: 'Andy', lastname: 'Dyan', date_birth: '1/1/2000', address: 'Bangkok', phone_number: '0868452314'},
  {username: 'bob', password: '$2a$10$F7nt7g2We5k21l/x0wsNOun.LiwGt.6oB4XJd6bbeG/9oFPZN2MZ2', email: 'bob@gmail.com', firstname: 'Bob', lastname: 'Smith', date_birth: '2/2/1995', address: 'Chiang Mai', phone_number: '0868452315'},
  {username: 'charlie', password: '$2a$10$YKyJ8EM.l2kciR0Falz9oe5nU3DLhG/gkG4Synd1joQMjI3qochVO', email: 'charlie@gmail.com', firstname: 'Charlie', lastname: 'Johnson', date_birth: '3/3/1990', address: 'Phuket', phone_number: '0868452316'},
  {username: 'david', password: '$2a$10$PqUV0N6iIJPSra34IK6TSuq/LJ2sFEv1/pqNPLJCf4bFfaCYVY49W', email: 'david@gmail.com', firstname: 'David', lastname: 'Williams', date_birth: '4/4/1985', address: 'Pattaya', phone_number: '0868452317'},
  {username: 'emma', password: '$2a$10$sqZoOThvPCh7Jvlgg7UsHO4Kmdrk8wTvbo.NJOBVwppbTADVWL/de', email: 'emma@gmail.com', firstname: 'Emma', lastname: 'Brown', date_birth: '5/5/1980', address: 'Hua Hin', phone_number: '0868452318'},
  {username: 'frank', password: '$2a$10$GUY0yQos45bda7D0yJI0wO1SGA/dVFzGFOeDdmLnje09gmsscW3pK', email: 'frank@gmail.com', firstname: 'Frank', lastname: 'Davis', date_birth: '6/6/1975', address: 'Rayong', phone_number: '0868452319'}
]

const Carts = [
    {date: '7/7/2024', lender_id: 1},
    {date: '7/7/2024', lender_id: 2},
    {date: '7/6/2024', lender_id: 3},
    {date: '7/5/2024', lender_id: 4},
    {date: '7/4/2024', lender_id: 5},
    {date: '7/3/2024', lender_id: 6},
    {date: '7/2/2024', lender_id: 1},
    {date: '7/1/2024', lender_id: 2},
    {date: '6/30/2024', lender_id: 3},
    {date: '6/29/2024', lender_id: 4},
    {date: '6/28/2024', lender_id: 5},
    {date: '6/27/2024', lender_id: 6}
]

const Loans = [
  {borrower_id: 1, created_date: '1/6/2024', purpose: 'Buy inventory', story: 'I am self-made agriculture', total_amount: 10000, categorie: 'agriculture', business_address: 'Bangkok'},
  {borrower_id: 2, created_date: '2/6/2024', purpose: 'Expand shop', story: 'I want to expand my small retail shop', total_amount: 15000, categorie: 'retail', business_address: 'Chiang Mai'},
  {borrower_id: 3, created_date: '3/6/2024', purpose: 'Purchase equipment', story: 'Need equipment to improve my services', total_amount: 8000, categorie: 'services', business_address: 'Phuket'},
  {borrower_id: 4, created_date: '4/6/2024', purpose: 'Buy seeds', story: 'Starting a small farming business', total_amount: 5000, categorie: 'agriculture', business_address: 'Pattaya'},
  {borrower_id: 5, created_date: '5/6/2024', purpose: 'Open new branch', story: 'Opening a new branch to serve more customers', total_amount: 20000, categorie: 'retail', business_address: 'Hua Hin'},
  {borrower_id: 6, created_date: '6/6/2024', purpose: 'Renovate shop', story: 'Renovating my shop for better customer experience', total_amount: 12000, categorie: 'retail', business_address: 'Rayong'},
  {borrower_id: 1, created_date: '7/6/2024', purpose: 'Marketing campaign', story: 'Launching a marketing campaign to boost sales', total_amount: 6000, categorie: 'services', business_address: 'Bangkok'},
  {borrower_id: 2, created_date: '8/6/2024', purpose: 'Buy livestock', story: 'Starting a small livestock farm', total_amount: 7000, categorie: 'agriculture', business_address: 'Chiang Mai'},
  {borrower_id: 3, created_date: '9/6/2024', purpose: 'Hire employees', story: 'Hiring employees to expand my business', total_amount: 14000, categorie: 'services', business_address: 'Phuket'},
  {borrower_id: 4, created_date: '10/6/2024', purpose: 'Upgrade technology', story: 'Upgrading technology to improve efficiency', total_amount: 11000, categorie: 'services', business_address: 'Pattaya'},
  {borrower_id: 5, created_date: '11/6/2024', purpose: 'Develop website', story: 'Developing a website to reach more customers', total_amount: 9000, categorie: 'retail', business_address: 'Hua Hin'},
  {borrower_id: 6, created_date: '12/6/2024', purpose: 'Purchase materials', story: 'Purchasing materials for my handmade crafts business', total_amount: 4000, categorie: 'crafts', business_address: 'Rayong'}
]

const Lends = [
  {cart_id: 1, loan_id: 1, amount: 100},
  {cart_id: 2, loan_id: 2, amount: 150},
  {cart_id: 3, loan_id: 3, amount: 200},
  {cart_id: 4, loan_id: 4, amount: 250},
  {cart_id: 5, loan_id: 5, amount: 300},
  {cart_id: 6, loan_id: 6, amount: 350},
  {cart_id: 7, loan_id: 7, amount: 400},
  {cart_id: 8, loan_id: 8, amount: 450},
  {cart_id: 9, loan_id: 9, amount: 500},
  {cart_id: 10, loan_id: 10, amount: 550},
  {cart_id: 11, loan_id: 11, amount: 600},
  {cart_id: 12, loan_id: 12, amount: 650},
  {cart_id: 1, loan_id: 2, amount: 700},
  {cart_id: 2, loan_id: 3, amount: 750},
  {cart_id: 3, loan_id: 4, amount: 800},
  {cart_id: 4, loan_id: 5, amount: 850},
  {cart_id: 5, loan_id: 6, amount: 900},
  {cart_id: 6, loan_id: 7, amount: 950},
  {cart_id: 7, loan_id: 8, amount: 1000},
  {cart_id: 8, loan_id: 9, amount: 1050},
  {cart_id: 9, loan_id: 10, amount: 1100},
  {cart_id: 10, loan_id: 11, amount: 1150},
  {cart_id: 11, loan_id: 12, amount: 1200},
  {cart_id: 12, loan_id: 1, amount: 1250},
  {cart_id: 1, loan_id: 3, amount: 1300},
  {cart_id: 2, loan_id: 4, amount: 1350},
  {cart_id: 3, loan_id: 5, amount: 1400},
  {cart_id: 4, loan_id: 6, amount: 1450},
  {cart_id: 5, loan_id: 7, amount: 1500},
  {cart_id: 6, loan_id: 8, amount: 1550},
  {cart_id: 7, loan_id: 9, amount: 1600}
]

async function run() {
  // await prisma.user.createMany({ data: Users });
  // await prisma.cart.createMany({ data: Carts });
  // await prisma.lend.createMany({ data: Lends });
  // await prisma.loan.createMany({ data: Loans });
}
run();