import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

function StudentDashboard() {
    return (
        <>
            <PageCss href="/css/student_dashboard.css" />
            <PageShell variant="student">
                <section className="dashboard">
                    <h2 id="welcomeMsg">Welcome, Student!</h2>
                    <div className="dashboard-cards">
                        <div className="card">
                            <h3>Enrolled Courses</h3>
                            <p id="enrolledCount">0</p>
                        </div>
                        <div className="card">
                            <h3>Completed Courses</h3>
                            <p id="completedCount">0</p>
                        </div>
                    </div>
                </section>
            </PageShell>
            <LegacyScript src="/legacy/js/student_dashboard.js" />
        </>
    );
}

export default StudentDashboard;