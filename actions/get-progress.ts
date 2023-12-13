import { db } from "@/lib/db";


export const getProgress = async (
    userId: string,
    courseId: string,      
): Promise<number> => {
    console.log('getProgress courseId inside getprogress:', courseId); // Debugging line
    console.log('getProgress USERID inside getprogress:', userId); // Debugging line
    try {
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
            },
        });
        console.log('publishedChapters:', publishedChapters); // Debugging line

        const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

        console.log('publishedChaptersIds length:', publishedChaptersIds.length); // Debugging line

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChaptersIds,
                    },
                    isCompleted: true,
                },
        });

        const progressPercentage = (validCompletedChapters / publishedChaptersIds.length) * 100;

        return progressPercentage;

    } catch (error) {
        console.error("[GET_PROGRESS]", error);
        return 0;
    }
}

    