import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";


type CourseWithProgresswithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCourse = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const getCourses = async ({
    userId,
    title,
    categoryId,

}: GetCourse): Promise<CourseWithProgresswithCategory[]> => {

    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,                    
                title: {
                        contains: title,
                    },
                    id: categoryId,
                },

                include: {
                    category: true,
                    chapters: {
                        where: {
                            isPublished: true,
                        },
                        select: {
                            id: true,
                        },

                        },

                        purchases: {
                            where: {
                                userId,
                            },
                        },
                    },

                    orderBy: {
                        createdAt: "desc",
                    },
                },
        );

        const coursesWithProgress: CourseWithProgresswithCategory[] = await Promise.all(
            courses.map(async (course) => {
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    };
                }

                const progressPercentage = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress: progressPercentage,
                };

            })
        );

        return coursesWithProgress;

    } catch (error) {
        console.error("[GET_COURSES]", error);
        return [];
    }
}
