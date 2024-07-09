const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");

module.exports.updateProfile = tryCatch(async (req,res) => {
    const {firstname, email} = req.body
    let ImgUrl = req.file 
    ? `/public/${req.file.filename}`
    : req.user.imgUrl
    //  console.log(firstname)
    const replaceData = { firstname, email, ImgUrl}
    
    const rs = await prisma.user.update({
      where : { id : req.user.id },
      data : replaceData
    })
  
    res.json({result : rs})
})