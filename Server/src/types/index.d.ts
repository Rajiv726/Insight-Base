import { IUser } from "../Models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
