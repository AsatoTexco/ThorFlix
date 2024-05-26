import { NextApiHandler } from "next";
import NextAuth from "next-auth"; 
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../../config/authOptions';

const handler = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
