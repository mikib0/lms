export default function (req, res, next) {
    if(!req.user.isAdmin){
      return res.sendStatus(403);
    }

    next();
}
