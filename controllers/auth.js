const {User} = require("../model/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(!user || err){
            return res.status(400).json({
                erro:"User not found"
            })
        }
        req.profile = user;
        next();
    })
}


exports.signUp = (req, res) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, data: user });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Auth failed, email not found",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email or password is incorrect.",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.status(200).json({
      token,
      user,
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.TOKEN_SECRET,
  userProperty:"auth"
});

exports.isAuth = (req,res,next) => {
    let user = req.profile &&  req.auth && req.profile._id == req.auth._id
    if(!user) { 
      return res.status(403).json({
        error:"Acesso negado"
      })
    } 
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    console.log(req.profile)
    next(); 
  }

  exports.signout = (req,res,next) =>{
      res.clearCookie('t');
      res.json({message:"Deslogado com sucesso"})
  }
