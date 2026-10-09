import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function AddCourse() {
    return (
        <>
            <PageCss href="/css/add_course.css" />
            <PageShell variant="admin">
                <div className="container">
                    <h2>Add New Course</h2>
                    <form id="addCourseForm">
                        <div className="input-box">
                            <label>Course Title</label>
                            <input type="text" id="courseTitle" placeholder="Enter Course Title" required />
                        </div>
                        <div className="input-box">
                            <label>Description</label>
                            <textarea id="courseDesc" placeholder="Enter Course Description" required></textarea>
                        </div>
                        <div className="input-box">
                            <label>Image URL</label>
                            <input type="text" id="courseImage" placeholder="Enter Image URL" required />
                        </div>
                        <button type="submit" className="btn">Add Course</button>
                    </form>
                </div>
            </PageShell>
            <LegacyScript src="/legacy/js/add_course.js" />
        </>
    );
}

export default AddCourse;