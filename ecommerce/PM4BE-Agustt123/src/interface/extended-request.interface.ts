import { Request } from 'express';
import { Role } from 'src/users/roles.enum';

export interface ExtendedRequest extends Request {
  user?: {
    exp: Date;
    roles: Role[];
    isAdmin: boolean;
  };
}
