const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const { join } = require("@prisma/client/runtime/library");

module.exports.getTypeSearch = tryCatch(async (req, res, next) => {
  const getRegions = await prisma.regions.findMany();
  const getProvinces = await prisma.provinces.findMany();
  const getCategories = await prisma.categories.findMany();
  res.json({
    regions: getRegions,
    provinces: getProvinces,
    categories: getCategories,
  });
});

module.exports.getLoanUserOnSearch = tryCatch(async (req, res, next) => {
  // const { regions, province, categories } = req.body;
  // console.log(province);
  const {province} = req.params
  console.log(province);
  // if (categories) {
  //   const getLoanUser = await prisma.loan.findMany({
  //     where: { categorie_id: categories },
  //     include: {
  //       borrower: true,
  //     },
  //   });
  //   res.json(getLoanUser)
  // }
  if (province) {
    const getLoanUser = await prisma.loan.findMany({
      where: { business_address: +province },
      include: {
        borrower: true,
      },
    });
    res.json(getLoanUser)
  }
});

module.exports.getLoanById = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const getLoan = await prisma.loan.findUnique({
    where: { id: +id },
    include: {
      borrower: true,
    },
  });
  console.log(getLoan);
});
