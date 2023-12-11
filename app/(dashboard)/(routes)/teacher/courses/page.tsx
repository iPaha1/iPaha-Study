// Note: This is the page that displays the courses that the teacher has created
import { DataTable } from "./_components/data-table";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";


async function getData(): Promise<any[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ]
  }

export const CoursesPage = async () => {
    
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    
    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
}

export default CoursesPage;