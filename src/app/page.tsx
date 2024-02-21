import { unstable_noStore as noStore } from "next/cache";

import { api } from "@/trpc/server";
import StudentTable from "@/components/tables/StudentTable";

export default async function Home() {
  noStore();

  const students = await api.student.getStudentsAdminTable.query();

  return (
    <div className="p-8">
      <StudentTable data={students} />
    </div>
  );
}
