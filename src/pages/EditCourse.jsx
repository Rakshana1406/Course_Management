import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function EditCourse() {
    return (
        <>
            <PageCss href="/css/edit_course.css" />
            <PageShell variant="admin">
                <div className="container">
                    <h2>Edit Course</h2>
                    <form id="editCourseForm">
                        <div className="input-box">
                            <label>Course Title</label>
                            <input type="text" id="editTitle" required />
                        </div>
                        <div className="input-box">
                            <label>Description</label>
                            <textarea id="editDesc" required></textarea>
                        </div>
                        <button type="submit" className="btn">Update Course</button>
                    </form>
                </div>
            </PageShell>
            <LegacyScript src="/legacy/js/edit_course.js" />
        </>
    );
}

export default EditCourse;