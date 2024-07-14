const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const customError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getloan = tryCatch(async (req, res, next) => {
  const rs = await prisma.loan.findMany({
    select: {
      id: true,
      purpose: true,
      story: true,
      total_amount: true,
      businessAddress:{
        select:{
          regions:{select:{region_name:true,id:true}},
          id:true,
          province_name:true
        }
      },
      borrower: {
        select: {
          firstname: true,
          lastname: true,
          ImgUrl: true,
        },
      },
      categories: {
        select: {
          categorie_name: true,
        },
      },
    },
  });
  res.json(rs);
});

module.exports.getLoanById = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const getLoan = await prisma.loan.findUnique({
     where: { id: +id },
     select: {
      id: true,
      purpose: true,
      story: true,
      total_amount: true,
      businessAddress:{
        select:{
          regions:{select:{region_name:true,id:true}},
          id:true,
          province_name:true
        },},
      borrower: {
        select: {
          firstname: true,
          lastname: true,
          ImgUrl: true,
        },
      },
      categories: {
        select: {
          categorie_name: true,
        },
      },
    },
  });
  res.json(getLoan);
});