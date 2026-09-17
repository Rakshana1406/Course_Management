import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import PageShell from "../components/PageShell";

function Home() {
    return (
        <>
            <PageCss href="/css/style.css" />
            <PageShell variant="home">
                <section className="hero">
                    <h1>Learn Without Limits</h1>
                    <p>Manage, track, and complete your courses with ease.</p>
                    <Link to="/courses" className="btn">Browse Courses</Link>
                </section>
            </PageShell>
        </>
    );
}

export default Home;