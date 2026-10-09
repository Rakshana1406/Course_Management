import { Link } from "react-router-dom";

function CourseCard({ id, title, description, image, badge }) {
    return (
        <div className="card">
            {badge && <span className="badge">{badge}</span>}
            <img src={image || "https://via.placeholder.com/300x180"} alt={title} />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={`/course-details?id=${id}`} className="btn">View Details</Link>
            </div>
        </div>
    );
}

export default CourseCard;