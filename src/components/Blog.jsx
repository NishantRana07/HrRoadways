import React, { useState } from 'react';
import { Calendar, Clock, ThumbsUp, Share2, Bookmark, Search, Filter, Tag, MapPin, Bus } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Why Choose Haryana Roadways for Your Next Journey?",
      content: "Planning a trip? Haryana Roadways offers a safe, reliable, and cost-effective way to travel across the state and beyond. Our buses are equipped with modern amenities like GPS tracking, comfortable seating, and punctual schedules, ensuring you reach your destination on time. Whether you're traveling for work or leisure, we prioritize your safety and comfort. Book your next journey with us and experience the difference!",
      date: "2025-01-18",
      author: "Transport Department",
      category: "Service Updates",
      tags: ["Travel", "Safety", "Comfort"],
      likes: 45,
      route: "Delhi-Chandigarh",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Explore the Best of Haryana: Top 5 Destinations",
      content: "Haryana is home to some incredible destinations that are perfect for weekend getaways or short trips. Here are our top five picks: \n\n1. Sultanpur National Park: A paradise for bird watchers and nature enthusiasts. \n\n2. Kurukshetra: A historical city known for its significance in the Mahabharata.\n\n3. Pinjore Gardens: Beautifully maintained Mughal gardens that are perfect for a day out.\n\n4. Morni Hills: Ideal for adventure lovers and nature seekers.\n\n5. Surajkund: Famous for its annual crafts fair and rich cultural heritage. \n\nPack your bags and hop on a Haryana Roadways bus to explore these amazing destinations!",
      date: "2025-01-17",
      author: "Tourism Department",
      category: "Travel Guide",
      tags: ["Tourism", "Destinations", "Weekend Getaway"],
      likes: 72,
      route: "Multiple Routes",
      readTime: "5 min"
    }
  ]);

  const [formData, setFormData] = useState({ title: '', content: '', category: '', tags: '', route: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    'all',
    'Service Updates',
    'Travel Guide',
    'Safety Tips',
    'News',
    'Route Updates'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      const newPost = {
        id: posts.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()),
        likes: 0,
        readTime: `${Math.max(1, Math.ceil(formData.content.length / 1000))} min`,
        author: 'Admin'
      };
      setPosts([newPost, ...posts]);
      setFormData({ title: '', content: '', category: '', tags: '', route: '' });
    }
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = posts
    .filter(post =>
      (selectedCategory === 'all' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'popular') return b.likes - a.likes;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Bus size={32} />
                Haryana Roadways Blog
              </h1>
              <p className="mt-2 text-blue-100">Your Journey, Our Pride</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.readTime}
                      </span>
                      {post.route && (
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {post.route}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                    <p className="text-gray-600 mb-4 whitespace-pre-line">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        >
                          <ThumbsUp size={18} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                          <Share2 size={18} />
                          Share
                        </button>
                        <button
                          onClick={() => toggleSave(post.id)}
                          className={`flex items-center gap-1 ${
                            savedPosts.has(post.id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          <Bookmark size={18} />
                          {savedPosts.has(post.id) ? 'Saved' : 'Save'}
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">By {post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 shrink-0">
            {/* Add New Post Form */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Add New Post</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
                <select
                  name="category"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma-separated)"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="route"
                  placeholder="Related Route (optional)"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.route}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Publish Post
                </button>
              </form>
            </div>

            {/* Popular Routes */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Delhi - Chandigarh
                </li>
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Gurugram - Panipat
                </li>
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Faridabad - Hisar
                </li>
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Ambala - Rohtak
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;