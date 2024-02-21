import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const degreeRouter = createTRPCRouter({
  getDegrees: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.degree.findMany({});
  }),
  getDegree: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.degree.findUnique({
        where: { id: input.id },
      });
    }),
});
