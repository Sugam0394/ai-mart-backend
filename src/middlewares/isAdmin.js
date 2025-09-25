import ApiError from "../utils/apiError.js";

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new ApiError(403, 'Forbidden: Admins only');
  }
  next();
};

export default isAdmin