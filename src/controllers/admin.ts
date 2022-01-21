import { Request, Response } from "express";
import { Manager } from "@models/index";
import { createToken } from "@utils/jwt";
import { catchAsync } from "@utils/catchAsync";
import { passwordGenerator, passwordHash } from "@utils/password";
import { IManager } from "@interfaces/mongoose.types";
import { mail } from "@utils/mail";

// @route   POST api/admin/login
// @desc    Login admin
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const _email = "test@admin.com";
  const _password = "rYPQTPLYf6AJNi";

  if (email !== _email || password !== _password) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const payload = {
    id: 1,
    email: _email,
    role: "ADMIN",
  };

  const token = createToken(payload, "ADMIN");

  return res.status(200).json({ token });
});

// @route   POST api/admin/create
// @desc    Create new manager
const createManager = catchAsync(async (req: Request, res: Response) => {
  const { email, name } = req.body;
  // generate password
  const password = passwordGenerator();
  const hash = await passwordHash(password);
  const manager: IManager = await Manager.create({ email, name, password: hash }).catch(_ => _);
  const template: any = {
    type: 'loginInfo',
    data: { name, email, password }
  }
  res.json({ manager, password });
  return await mail([email], template);
});

export { login, createManager };