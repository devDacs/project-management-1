import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { id: team.productOwnerUserId! },
          select: { username: true, profilePictureUrl: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: { id: team.projectManagerUserId },
          select: { username: true, profilePictureUrl: true },
        });

        return {
          ...team,
          productOwner: {
            username: productOwner?.username,
            profilePictureUrl: productOwner?.profilePictureUrl,
          },
          projectManager: {
            username: projectManager?.username,
            profilePictureUrl: projectManager?.profilePictureUrl,
          },
        };
      }),
    );
    res.json({ success: true, data: teamsWithUsernames });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving teams: ${error.message}` });
  }
};
