import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function ManageEnrollment() {
    return (
        <>
            <PageCss href="/css/manage_enrollment.css" />
            <PageShell variant="admin">
                <section className="features">
                    <h2>Manage Student Enrollments</h2>
                    <div id="enrollmentList"></div>
                </section>
            </PageShell>
            <LegacyScript src="/legacy/js/manage_enrollment.js" />
        </>
    );
}

export default ManageEnrollment;