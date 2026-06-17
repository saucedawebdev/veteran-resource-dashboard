function Hero({ darkMode = false }) {
    return (
        <header className={darkMode ? "hero hero--dark" : "hero"}>
            <p className="badge">
                Veteran Support Hub
            </p>

            <h1>Veteran Resource Dashboard</h1>

            <p className="hero-description">
                Quickly find benefits, education, health, housing, and career resources for veterans.
            </p>
        </header>
    )
}

export default Hero;