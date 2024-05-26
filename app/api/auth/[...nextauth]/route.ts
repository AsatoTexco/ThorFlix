import { NextApiHandler } from "next";
import NextAuth from "next-auth"; 
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../../config/authOptions';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
