import React, { useState } from "react";
import { Search, Play, Star, Menu, X, BookOpen, LogIn } from "lucide-react";

export default function CourseHomepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = ["All", "Blender", "Maya", "ZBrush", "Photoshop", "Substance 3D"];

  const tags = [
    "#beginner", "#advanced", "#intermediate", "#animation",
    "#modeling", "#rendering", "#rigging", "#texturing", "#vfx", "#sculpting"
  ];

  const courses = [
    { id: 1, title: "Blender Complete Beginner Guide", category: "Blender", instructor: "Alex Chen", students: 2340, tags: ["#beginner", "#modeling"], rating: 4.8, image: "🎬" },
    { id: 2, title: "Advanced Maya Character Rigging", category: "Maya", instructor: "Jordan Lee", students: 1240, tags: ["#advanced", "#rigging"], rating: 4.9, image: "🤖" },
    { id: 3, title: "ZBrush Digital Sculpting Masterclass", category: "ZBrush", instructor: "Sam Martinez", students: 3450, tags: ["#sculpting", "#advanced"], rating: 4.7, image: "🎨" },
    { id: 4, title: "Blender VFX & Particles", category: "Blender", instructor: "Casey Williams", students: 1890, tags: ["#vfx", "#advanced"], rating: 4.6, image: "✨" },
    { id: 5, title: "Photoshop for 3D Artists", category: "Photoshop", instructor: "Morgan Davis", students: 2100, tags: ["#texturing", "#intermediate"], rating: 4.5, image: "🎭" },
    { id: 6, title: "Maya Modeling Fundamentals", category: "Maya", instructor: "Taylor Brown", students: 1560, tags: ["#beginner", "#modeling"], rating: 4.8, image: "🏗️" },
    { id: 7, title: "ZBrush to 3D Print Pipeline", category: "ZBrush", instructor: "Riley Scott", students: 980, tags: ["#intermediate", "#sculpting"], rating: 4.6, image: "🖨️" },
    { id: 8, title: "Substance 3D Texturing Basics", category: "Substance 3D", instructor: "Drew Kim", students: 1320, tags: ["#texturing", "#beginner"], rating: 4.7, image: "🪨" },
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => course.tags.includes(tag));
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTags && matchesSearch;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Sign In</h2>
              <button onClick={() => setShowLogin(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <input type="email" required placeholder="you@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Password</label>
                <input type="password" required placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
              <button type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BookOpen size={26} /> LearnHub
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition">Courses</a>
            <a href="#" className="hover:text-gray-900 transition">Browse</a>
            <a href="#" className="hover:text-gray-900 transition">Community</a>
          </nav>

          {/* Auth */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition">
                Logout
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-800 transition">
                <LogIn size={15} /> Sign In
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 border-t border-gray-100 space-y-3 text-sm text-gray-700">
            <a href="#" className="block pt-3">Courses</a>
            <a href="#" className="block">Browse</a>
            <a href="#" className="block">Community</a>
            <button onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
              className="w-full bg-gray-900 text-white py-2 rounded text-sm mt-2">
              Sign In
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-14 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Free 3D Design Courses</h1>
        <p className="text-gray-300 text-lg mb-6">Learn Blender, Maya, ZBrush and more — completely free</p>

        {/* Hero Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">

        {/* SIDEBAR */}
        <aside className="w-56 flex-shrink-0 hidden md:block">
          <h3 className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wide">Categories</h3>
          <div className="space-y-1 mb-8">
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                {category}
              </button>
            ))}
          </div>

          <h3 className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wide">Tags</h3>
          <div className="space-y-2">
            {tags.map((tag) => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)}
                  className="accent-gray-900 cursor-pointer" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">{tag}</span>
              </label>
            ))}
          </div>

          {selectedTags.length > 0 && (
            <button onClick={() => setSelectedTags([])}
              className="mt-4 text-xs text-blue-500 hover:underline">
              Clear tags
            </button>
          )}
        </aside>

        {/* COURSES GRID */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredCourses.length} Course{filteredCourses.length !== 1 ? "s" : ""}
            </h2>
            {selectedCategory !== "All" && (
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                {selectedCategory}
              </span>
            )}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>No courses found. Try different filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition group cursor-pointer">
                  <div className="h-40 bg-gray-50 flex items-center justify-center text-5xl group-hover:bg-gray-100 transition">
                    {course.image}
                  </div>
                  <div className="p-4">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded mb-2 inline-block">
                      {course.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">By {course.instructor}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star size={13} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-gray-400">({course.students.toLocaleString()} students)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-700 transition">
                      <Play size={14} /> View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-400">
        <p>© 2024 LearnHub — Free 3D Courses for Everyone</p>
      </footer>
    </div>
  );
}