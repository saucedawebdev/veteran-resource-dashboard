function ResourceCard({ title, description, link, isSaved, onSave }) {
    return (
        <div className="resource-card">
            <button className="save-btn" onClick={onSave}>
                {isSaved ? "Saved" : "Save"}
            </button>

            <h3>{title}</h3>
            <p>{description}</p>

            <a href={link} target="_blank" rel="noopener noreferrer">
                Learn More
            </a>
        </div>
    );
}

export default ResourceCard;