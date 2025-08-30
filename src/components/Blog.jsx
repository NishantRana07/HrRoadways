import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar, Clock, ThumbsUp, Share2, Bookmark, Search, MapPin, Bus
} from 'lucide-react';
import '../styles/Blog.css';
import Loading from './Loading';
import sampleData from './fallbackData';

const BlogPage = ({ isHindi }) => {
  const [translations, setTranslations] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '', content: '', category: '', tags: '', route: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1336703432563810304'; // <-- Replace with your real URL

  const fetchTranslations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(translationsUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || (!data.hi && !data.en)) {
        throw new Error('Invalid data structure received');
      }

      setTranslations(data);
      const langData = isHindi ? data.hi : data.en;
      setCurrentLanguage(langData);
      setPosts(langData?.posts || []);
    } catch (err) {
      console.error('Error fetching translations:', err);
      setError(err.message);

      // Fallback to local sample data
      const fallback = isHindi ? sampleData.hi : sampleData.en;
      setTranslations(sampleData);
      setCurrentLanguage(fallback);
      setPosts(fallback.posts || []);
    } finally {
      setLoading(false);
    }
  }, [isHindi]);

  useEffect(() => {
    fetchTranslations();
  }, [fetchTranslations]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        likes: 0,
        readTime: `${Math.max(1, Math.ceil(formData.content.length / 1000))} min`,
        author: 'Admin',
      };
      setPosts(prev => [newPost, ...prev]);
      setFormData({ title: '', content: '', category: '', tags: '', route: '' });
    }
  }, [formData]);

  const toggleSave = useCallback((postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  }, []);

  const handleLike = useCallback((postId) => {
    setLikedPosts(prev => {
      if (prev.has(postId)) return prev; // Already liked, do nothing
      setPosts(posts =>
        posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post)
      );
      const newSet = new Set(prev);
      newSet.add(postId);
      return newSet;
    });
  }, []);

  const filteredPosts = React.useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return posts
      .filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          (post.title && post.title.toLowerCase().includes(searchLower)) ||
          (post.content && post.content.toLowerCase().includes(searchLower)) ||
          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'popular') return (b.likes || 0) - (a.likes || 0);
        return 0;
      });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  if (error && !currentLanguage) {
    return (
      <div className="blog-page-container dark:bg-gray-950 dark:text-white">
        <div className="error-message">
          <h2>Error loading content</h2>
          <p>{error}</p>
          <button onClick={fetchTranslations} className="retry-button">Retry</button>
        </div>
      </div>
    );
  }

  if (loading || !currentLanguage) return <Loading />;

  return (
    <div className="blog-page-container text-black dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <header className="blog-header">
        <div className="header-content">
          <div className="header-title-container">
            <div>
              <h1 className="header-title">
                <Bus size={32} />
                {currentLanguage.title}
              </h1>
              <p className="header-subtitle">{currentLanguage.subtitle}</p>
            </div>
            <div className="subscribe-button-container">
              <button className="subscribe-button">
                {currentLanguage.subscribeButton}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content ">
        <div className="content-container dark:bg-gray-950 dark:text-white">
          {/* Left Content */}
          <div className="main-content-left">
            {/* Filters */}
            <div className="search-filters dark:bg-gray-900 darl:text-white">
              <div className="search-bar">
                <div className="search-input-container">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder={currentLanguage.searchPlaceholder}
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">{currentLanguage.sortBy?.latest}</option>
                  <option value="popular">{currentLanguage.sortBy?.popular}</option>
                </select>
              </div>

              <div className="category-filters">
                {currentLanguage.categories?.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-button ${selectedCategory === category ? 'active-category' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            <div className="blog-posts ">
              {filteredPosts.length === 0 ? (
                <div className="no-posts">
                  <p>{isHindi ? 'कोई पोस्ट नहीं मिली' : 'No posts found'}</p>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <article key={post.id} className="blog-post">
                    <div className="post-content dark:bg-gray-900 darl:text-white">
                      <div className="post-meta">
                        <span className="post-meta-item"><Calendar size={16} /> {post.date}</span>
                        <span className="post-meta-item"><Clock size={16} /> {post.readTime}</span>
                        {post.route && <span className="post-meta-item"><MapPin size={16} /> {post.route}</span>}
                      </div>

                      <h2 className="post-title">{post.title}</h2>
                      <p className="post-description">{post.content}</p>

                      {post.tags && (
                        <div className="post-tags">
                          {post.tags.map((tag, i) => (
                            <span key={i} className="post-tag">{tag}</span>
                          ))}
                        </div>
                      )}

                      <div className="post-actions">
                        <div className="post-actions-left">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="post-action-button"
                            disabled={likedPosts.has(post.id)}
                          >
                            <ThumbsUp size={18} /> {post.likes}
                          </button>
                          <button className="post-action-button">
                            <Share2 size={18} /> {currentLanguage.share}
                          </button>
                          <button
                            onClick={() => toggleSave(post.id)}
                            className={`post-action-button ${savedPosts.has(post.id) ? 'saved' : ''}`}
                          >
                            <Bookmark size={18} />
                            {savedPosts.has(post.id) ? currentLanguage.saved : currentLanguage.save}
                          </button>
                        </div>
                        <span className="post-author">{currentLanguage.postBy} {post.author}</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="new-post-form">
              <h3 className="form-title">{currentLanguage.addNewPost}</h3>
              <form onSubmit={handleSubmit}>
                <input name="title" placeholder={currentLanguage.titlePlaceholder} value={formData.title} onChange={handleChange} className="form-input" required />
                <textarea name="content" placeholder={currentLanguage.contentPlaceholder} value={formData.content} onChange={handleChange} className="form-textarea" required />
                <select name="category" value={formData.category} onChange={handleChange} className="form-select" required>
                  <option value="">{currentLanguage.categoryPlaceholder}</option>
                  {currentLanguage.categories?.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input name="tags" placeholder={currentLanguage.tagsPlaceholder} value={formData.tags} onChange={handleChange} className="form-input" />
                <input name="route" placeholder={currentLanguage.routePlaceholder} value={formData.route} onChange={handleChange} className="form-input" />
                <button type="submit" className="form-submit-button">{currentLanguage.publishButton}</button>
              </form>
            </div>

            <div className="popular-routes">
              <h3 className="popular-routes-title">{currentLanguage.popularRoutes}</h3>
              <ul className="popular-routes-list">
                <li className="popular-route-item"><Bus size={16} /> Delhi - Chandigarh</li>
                <li className="popular-route-item"><Bus size={16} /> Gurugram - Panipat</li>
                <li className="popular-route-item"><Bus size={16} /> Faridabad - Hisar</li>
                <li className="popular-route-item"><Bus size={16} /> Ambala - Rohtak</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
