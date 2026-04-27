export const roleMiddleware = (rolesPermitted) => {
    return (req, res, next) => {
       if (!req.user || !rolesPermitted.includes(req.user.role)) {
           return res.status(403).json({ error: "Forbidden: insufficient permissions" });
       }
         next();
    };
};