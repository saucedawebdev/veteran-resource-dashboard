import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ResourceCard from './components/ResourceCard';
import SearchBar from './components/SearchBar';


function App() {


  const resources = [
    {
      title: "VA Benefits",
      description: "Learn about disability compensation, healthcare, and benefits.",
      link: "https://www.va.gov/benefits/",
      category: "Benefits"
    },
    {
      title: "Education Benefits",
      description: "Explore GI Bill programs and educational opportunities.",
      link: "https://www.va.gov/education/",
      category: "Education"
    },
    {
      title: "Veteran Crisis Line",
      description: "24/7 confidential support for veterans in crisis.",
      link: "https://www.veterancrisisline.net/",
      category: "Crisis"
    },
    {
      title: "VA Health Care",
      description: "Enroll in VA medical care and manage your health services.",
      link: "https://www.va.gov/health-care/",
      category: "Healthcare"
    },
    {
      title: "Veteran Employment Services",
      description: "Find job training, career counseling, and employment support.",
      link: "https://www.va.gov/careers-employment/",
      category: "Employment"
    },
    {
      title: "VA Home Loans",
      description: "Learn about home loan benefits and housing assistance for veterans.",
      link: "https://www.va.gov/housing-assistance/home-loans/",
      category: "Housing"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [savedResources, setSavedResources] = useState(() => {
    return JSON.parse(localStorage.getItem("savedResources")) || [];
  });

  useEffect(() => {
    localStorage.setItem("savedResources", JSON.stringify(savedResources));
  }, [savedResources]);

  const toggleSave = (title) => {
    if (savedResources.includes(title)) {
      setSavedResources(savedResources.filter((resource) => resource !== title));
    } else {
      setSavedResources([...savedResources, title]);
    }
  }

  const filteredResources = resources.filter((resource) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch = 
      resource.title.toLowerCase().includes(search) ||
      resource.description.toLowerCase().includes(search) ||
      resource.category.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All" || resource.category === selectedCategory;

      return matchesSearch && matchesCategory;
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <Hero darkMode={darkMode} />
      <Stats />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="filters">
        {["All", "Benefits", "Education", "Crisis", "Healthcare", "Employment", "Housing"].map((category) => (
          <button
            type="button"
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="resource-count">
        Showing {filteredResources.length}{" "}
        {filteredResources.length === 1 ? "resource" : "resources"}
      </p>

      <p className="saved-count">
        Saved Resources: {savedResources.length}
      </p>

      {filteredResources.length === 0 ? (
        <p className="no-results">
          No resources found. Try a different category or clear your search.
        </p>
      ) : (
        <section className="resources">
        {filteredResources.map((resource) => (
          <ResourceCard
            key={resource.title}
            title={resource.title}
            description={resource.description}
            link={resource.link}
            isSaved={savedResources.includes(resource.title)}
            onSave={() => toggleSave(resource.title)}
            />
          ))}
            </section>
      )}
    </div>
  );
}

export default App;