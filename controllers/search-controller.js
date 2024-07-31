const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const { join } = require("@prisma/client/runtime/library");

selectValue = {
  id: true,
  purpose: true,
  story: true,
  total_amount: true,
  businessAddress: {
    select: {
      regions: { select: { region_name: true, id: true } },
      id: true,
      province_name: true,
    },
  },
  borrower: {
    select: {
      firstname: true,
      lastname: true,
      ImgUrl: true,
      id: true,
    },
  },
  categories: {
    select: {
      categorie_name: true,
    },
  },
  businessAddress: {
    include: { regions: true },
  },
};

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

// get by search
module.exports.getLoanUserOnSearch = tryCatch(async (req, res, next) => {
  const { region, province, categorie ,loan} = req.params;

  // search categories
  if (categorie) {
    const getLoanUser = await prisma.loan.findMany({
      where: { categorie_id: +categorie },
      select: selectValue,
    });
    res.json(getLoanUser);
  }

  if (province) {
    const getLoanUser = await prisma.loan.findMany({
      where: { business_address: +province },
      select: selectValue,
    });
    res.json(getLoanUser);
  }

  if (region) {
    const getLoanUser = await prisma.loan.findMany({
      where: { businessAddress: { region_id: +region } },
      select: selectValue,
    });
    res.json(getLoanUser);
  }
  if (loan) {
    const getLoanUser = await prisma.loan.findMany({
      where: { id: +loan },
      select: selectValue,
    });
    res.json(getLoanUser);
  }
});

module.exports.getAmountAllId = tryCatch(async(req,res,next)=> {
  const getAmountAllId = await prisma.lend.groupBy({
    by:['loan_id'],
    where:{status:true},
    _sum:{amount:true},
  })
  res.json(getAmountAllId)
}) 
