import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, data: users });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const getUserByCognitoId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId,
      },
    });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    username,
    cognitoId,
    profilePictureUrl = "i1.jpg",
    teamId = 1,
  } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User Created Successfully",
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a user: ${error.message}` });
  }
};
