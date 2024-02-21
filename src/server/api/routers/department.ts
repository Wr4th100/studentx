import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getDepartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany({
      include: {
        Degree: true,
      },
    });
  }),

  getDepartmentsAdminTable: publicProcedure.query(async ({ ctx }) => {
    const departments = await ctx.db.department.findMany({
      include: {
        Degree: true,
      },
    });

    return departments.map((department) => ({
      id: department.id,
      branch: department.branch,
      code: department.code,
      degree: department.Degree.degree,
      shortName: department.shortName,
    }));
  }),

  getDepartment: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.department.findUnique({
        where: { id: input.id },
        include: {
          Students: true,

        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.department.delete({
        where: { id: input.id },
      });
    }),
});
