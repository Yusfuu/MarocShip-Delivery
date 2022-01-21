import jwt from "jsonwebtoken";

const keys: any = {
  ADMIN: process.env.ADMIN_SECRET_KEY,
  MANAGER: process.env.MANAGER_SECRET_KEY,
  DELIVERYMANAGER: process.env.DELIVERYMANAGER_SECRET_KEY,
  DRIVER: process.env.DRIVER_SECRET_KEY,
}

// generate tokens :
export const createToken = (payload: any = null, role: string | null = null) => {

  if (!payload) {
    throw new Error("payload is required");
  };

  if (!role) {
    throw new Error("role is required");
  };


  const _key = keys[role];

  if (!_key) {
    throw new Error("role is not found");
  }

  return jwt.sign(payload, _key, { expiresIn: "1h" });
};

// verify tokens
export const verifyToken = (token: string | null = null, role: string | null = null) => {
  if (!token) {
    throw new Error("token is required");
  };

  if (!role) {
    throw new Error("role is required");
  };

  const _key = keys[role];

  try {
    return jwt.verify(token, _key);
  } catch (error) {
    return null;
  }
};