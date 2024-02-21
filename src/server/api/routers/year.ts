import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const yearRouter = createTRPCRouter({
  getYears: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.year.findMany({
      where: {
        NOT: {
          year: 5,
        },
      },
    });
  }),
  getYear: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.year.findUnique({
        where: { id: input.id },
      });
    }),
});
