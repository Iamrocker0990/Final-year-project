// Import the models we defined above
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollement');

exports.getStudentDashboard = async (req, res) => {
    try {
        // 1. Identify the logged-in user
        // (This ID comes from your authentication middleware, usually JWT)
        const userId = req.user.id; 

        // 2. Fetch all "Notebooks" (Enrollments) for this student
        // .populate('course') is magic. It takes the "course ID" in the enrollment
        // and automatically replaces it with the actual Course data (title, thumbnail, etc.)
        const enrollments = await Enrollment.find({ student: userId })
            .populate({
                path: 'course',
                populate: { path: 'modules.lessons' } // We also need lessons to find the "Next Lesson"
            });

        // 3. Calculate Global Stats
        const totalCourses = enrollments.length;
        
        // Count how many lessons exist in the completedLessons array across all enrollments
        const totalCompletedLessons = enrollments.reduce((total, enrollment) => {
            return total + enrollment.completedLessons.length;
        }, 0);

        // 4. Format the "Active Courses" list for your React Dashboard
        // We need to transform the raw database data into the exact format your React component expects.
        const activeCourses = enrollments.map(enrollment => {
            const course = enrollment.course;
            
            // LOGIC: Find the "Next Lesson"
            // We loop through all modules and lessons. The first lesson whose ID
            // is NOT in the "completedLessons" array is the one they need to watch next.
            let nextLessonTitle = "Course Completed";
            let foundNext = false;

            // Loop through chapters (modules)
            for (const module of course.modules) {
                if (foundNext) break; 
                // Loop through pages (lessons)
                for (const lesson of module.lessons) {
                    // check if this lesson ID is inside the completedLessons array
                    const isCompleted = enrollment.completedLessons.includes(lesson._id);
                    if (!isCompleted) {
                        nextLessonTitle = lesson.title;
                        foundNext = true;
                        break; // Stop looking, we found the next one
                    }
                }
            }

            return {
                id: course._id,
                title: course.title,
                image: course.thumbnail,
                progress: enrollment.progress, // e.g. 45
                nextLesson: nextLessonTitle
            };
        });

        // 5. Send the final package to React
        res.json({
            stats: {
                totalCourses,
                totalCompletedLessons,
                // You can add assignments/quizzes here later
            },
            courses: activeCourses
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};