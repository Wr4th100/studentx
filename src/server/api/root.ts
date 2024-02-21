import { createTRPCRouter } from "@/server/api/trpc";
import { studentRouter } from "./routers/student";
import { yearRouter } from "./routers/year";
import { departmentRouter } from "./routers/department";
import { degreeRouter } from "./routers/degree";
import { collegeRouter } from "./routers/college";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  student: studentRouter,
  year: yearRouter,
  department: departmentRouter,
  degree: degreeRouter,
  college: collegeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
