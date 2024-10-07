import { User as PrismaUser } from "@prisma/client";

declare global {
  declare namespace Express {
    export interface User {
      id: number;
      username: string;
      password: string;
      name: string;
      creationDate: Date;
      isAuthor: boolean;
    }
    export interface Request {
      user: User;
    }
  }
}

export {};
