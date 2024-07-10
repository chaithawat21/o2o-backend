const tryCatch = require("../utils/tryCatch");
const prisma = require('../models')


module.exports.getSearch = tryCatch(async(req,res,next) => {
    const getRegions = await prisma.regions.findMany()
    const getProvinces = await prisma.provinces.findMany()
    const getCategories = await prisma.categories.findMany()
    res.json({regions : getRegions, provinces : getProvinces ,categories :getCategories})
})

