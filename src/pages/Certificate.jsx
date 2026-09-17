import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function Certificate() {
    return (
        <>
            <PageCss href="/css/certificate.css" />
            <PageShell variant="cert">
                <div className="certificate-box">
                    <h1>Certificate of Completion</h1>
                    <p>This is presented to</p>
                    <h2 id="studentName">Student Name</h2>
                    <p>for successfully completing the course</p>
                    <h3 id="certCourseTitle">Course Title</h3>
                </div>
            </PageShell>
            <LegacyScript src="/legacy/js/certificate.js" />
        </>
    );
}

export default Certificate;