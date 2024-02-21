import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const collegeRouter = createTRPCRouter({
  getColleges: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.college.findMany({});
  }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.college.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getCollege: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.college.findUnique({
        where: { id: input.id },
        include: {
          Students: true,
        },
      });
    }),
});
