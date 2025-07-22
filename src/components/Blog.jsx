import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ThumbsUp,
  Share2,
  Bookmark,
  Search,
  MapPin,
  Bus,
} from "lucide-react";

import { translationsUrl } from "../constants";
import "../styles/Blog.css";

const BlogPage = ({ isHindi }) => {
  const [translations, setTranslations] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    route: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [savedPosts, setSavedPosts] = useState(new Set());

  useEffect(() => {
    fetch(translationsUrl)
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data);
        const lang = isHindi ? data.hi : data.en;
        setCurrentLanguage(lang);
        setPosts(lang.posts);
      })
      .catch((err) => console.error("Translation fetch error:", err));
  }, [isHindi]);

  useEffect(() => {
    if (translations) {
      const lang = isHindi ? translations.hi : translations.en;
      setCurrentLanguage(lang);
      setPosts(lang.posts);
    }
  }, [isHindi, translations]);

  if (!currentLanguage) return <div>Loading translations...</div>;

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags } = formData;
    if (!title || !content) return;

    const newPost = {
      id: posts.length + 1,
      ...formData,
      date: new Date().toISOString().split("T")[0],
      tags: tags.split(",").map((tag) => tag.trim()),
      likes: 0,
      readTime: `${Math.max(1, Math.ceil(content.length / 1000))} min`,
      author: "Admin",
    };

    setPosts([newPost, ...posts]);
    setFormData({ title: "", content: "", category: "", tags: "", route: "" });
  };

  const toggleSave = (id) =>
    setSavedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleLike = (id) =>
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );

  const filteredPosts = posts
    .filter(
      ({ category, title, content, tags }) =>
        (selectedCategory === "all" || category === selectedCategory) &&
        [title, content, ...tags].some((text) =>
          text.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .sort((a, b) =>
      sortBy === "latest"
        ? new Date(b.date) - new Date(a.date)
        : b.likes - a.likes
    );

  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <div className="header-content">
          <div className="header-title-container">
            <div>
              <h1 className="header-title">
                <Bus size={32} /> {currentLanguage.title}
              </h1>
              <p className="header-subtitle">{currentLanguage.subtitle}</p>
            </div>
            <button className="subscribe-button">
              {currentLanguage.subscribeButton}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-container">
          {/* Left Section */}
          <div className="main-content-left">
            <div className="search-filters">
              <div className="search-bar">
                <div className="search-input-container">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    className="search-input"
                    placeholder={currentLanguage.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">
                    {currentLanguage.sortBy.latest}
                  </option>
                  <option value="popular">
                    {currentLanguage.sortBy.popular}
                  </option>
                </select>
              </div>

              <div className="category-filters">
                {currentLanguage.categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-button ${
                      selectedCategory === cat ? "active-category" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="blog-posts">
              {filteredPosts.map((post) => (
                <article key={post.id} className="blog-post">
                  <div className="post-content">
                    <div className="post-meta">
                      <span>
                        <Calendar size={16} /> {post.date}
                      </span>
                      <span>
                        <Clock size={16} /> {post.readTime}
                      </span>
                      {post.route && (
                        <span>
                          <MapPin size={16} /> {post.route}
                        </span>
                      )}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <div className="post-tags">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="post-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="post-actions">
                      <div>
                        <button onClick={() => handleLike(post.id)}>
                          <ThumbsUp size={18} /> {post.likes}
                        </button>
                        <button>
                          <Share2 size={18} /> {currentLanguage.share}
                        </button>
                        <button
                          onClick={() => toggleSave(post.id)}
                          className={savedPosts.has(post.id) ? "saved" : ""}
                        >
                          <Bookmark size={18} />
                          {savedPosts.has(post.id)
                            ? currentLanguage.saved
                            : currentLanguage.save}
                        </button>
                      </div>
                      <span>
                        {currentLanguage.postBy} {post.author}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="new-post-form">
              <h3>{currentLanguage.addNewPost}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  name="title"
                  placeholder={currentLanguage.titlePlaceholder}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder={currentLanguage.contentPlaceholder}
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    {currentLanguage.categoryPlaceholder}
                  </option>
                  {currentLanguage.categories
                    .filter((cat) => cat !== "all")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
                <input
                  name="tags"
                  placeholder={currentLanguage.tagsPlaceholder}
                  value={formData.tags}
                  onChange={handleChange}
                />
                <input
                  name="route"
                  placeholder={currentLanguage.routePlaceholder}
                  value={formData.route}
                  onChange={handleChange}
                />
                <button type="submit">{currentLanguage.publishButton}</button>
              </form>
            </div>

            <div className="popular-routes">
              <h3>{currentLanguage.popularRoutes}</h3>
              <ul>
                {[
                  "Delhi - Chandigarh",
                  "Gurugram - Panipat",
                  "Faridabad - Hisar",
                  "Ambala - Rohtak",
                ].map((route, i) => (
                  <li key={i}>
                    <Bus size={16} /> {route}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
