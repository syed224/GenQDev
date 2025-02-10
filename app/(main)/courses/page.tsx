import { getCourses, getUserProgress } from "@/db/queries";
import { CoursesList } from "./components/CoursesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GenQ | Courses page",
  description: "Select the Course You want to Learn!",
};

const CoursesPage = async () => {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesPromise,
    userProgressPromise,
  ]);

  return (
    <main className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl mt-5 mb-5 font-bold text-[color:var(--foreground)]">
        I want to learn...
      </h1>

      {courses.length === 0 ? (
        <h1 className="mt-10 text-center text-3xl underline">
          Oppss language found !
        </h1>
      ) : (
        <CoursesList
          courses={courses}
          activeCourseId={userProgress?.activeCourseId}
        />
      )}
    </main>
  );
};
export default CoursesPage;
