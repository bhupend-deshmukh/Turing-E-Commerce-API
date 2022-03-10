const jwt = require("jsonwebtoken")


exports.genratetoken = (data) =>{
    return jwt.sign(data , "bhupend")
}

// exports.verifytoken = (req,res,next) =>{
//     if(req.headers.cookie){
//         const token = req .headers.cookie.split("=")[1]
//         jwt.verify(token,'bhupend',(err,)=>{
//             if(err){
//                 console.log('token expired');
//                 next()
//             }
//             else{
//                 req.id = 
//                 next()
//             }
//         })
//     }
//     else{
//         next()
//     }
// }


exports.verifytoken = (req, res, next) => {
    if (req.headers.cookie == undefined) {
      console.log({ message: 'Token not found' });
      return res.status(403).json({ message: 'TOken not found' })
    }
    const token = req.headers.cookie.split('=')[1]
    jwt.verify(token, "bhupend", (err, data) => {
      if (err) {
        console.log({ message: "JWT expired" });
        return res.status(401).json({ message: err })
      }
      req.data=data
      next()
    });
}
// module.exports = {genratetoken,verifytoken} 