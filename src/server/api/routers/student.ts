import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { Gender } from "@prisma/client";
import { z } from "zod";

export const studentRouter = createTRPCRouter({
  getStudentsAdminTable: publicProcedure.query(async ({ ctx }) => {
    const students = await ctx.db.student.findMany({
      include: {
        Degree: true,
        Department: true,
        Year: true,
        College: true,
      },
    });

    return students.map((student) => ({
      id: student.id,
      name: student.name,
      registerNumber: student.registerNumber,
      gender: student.gender,
      department: student.Department.shortName,
      year: student.Year.year,
      degree: student.Degree.degree,
      college: student.College.name,
    }));
  }),

  deleteStudent: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const student = await ctx.db.student.delete({
        where: { id: input.id },
      });

      return student;
    }),

  createStudent: publicProcedure
    .input(
      z.object({
        name: z.string(),
        registerNumber: z.string(),
        gender: z.string(),
        department: z.string(),
        degree: z.string(),
        college: z.string(),
        year: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createStudent = await ctx.db.student.create({
        data: {
          name: input.name,
          registerNumber: input.registerNumber,
          Department: {
            connect: {
              branch: input.department,
            },
          },
          Degree: {
            connect: {
              degree: input.degree,
            },
          },
          College: {
            connect: {
              name: input.college,
            },
          },
          Year: {
            connect: {
              year: input.year,
            },
          },

          gender: input.gender as Gender,
        },
      });
      return createStudent;
    }),
});
