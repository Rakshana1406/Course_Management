import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function StartCourse() {
    return (
        <>
            <PageCss href="/css/start_course.css" />
            <PageShell variant="student3">
                <div className="learning-container">
                    <h2 id="courseHeading">Course Content</h2>
                    <div id="contentArea"></div>
                    <button id="completeBtn" className="btn">Mark as Completed</button>
                </div>
            </PageShell>
            <LegacyScript src="/legacy/js/start_course.js" />
        </>
    );
}

export default StartCourse;