import React, { useState } from "react";
import { Search, Play, Star } from "lucide-react";

export default function CourseHomepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);

  const categories = ["All", "Blender", "Maya", "ZBrush", "Photoshop", "Substance 3D"];

  const tags = [
    "#beginner",
    "#advanced",
    "#intermediate",
    "#animation",
    "#modeling",
    "#rendering",
    "#rigging",
    "#texturing",
    "#vfx",
    "#sculpting"
  ];

  const courses = [
    {
      id: 1,
      title: "Blender Complete Beginner Guide",
      category: "Blender",
      instructor: "Alex Chen",
      students: 2340,
      tags: ["#beginner", "#modeling"],
      rating: 4.8,
      image: "🎬"
    },
    {
      id: 2,
      title: "Advanced Maya Character Rigging",
      category: "Maya",
      instructor: "Jordan Lee",
      students: 1240,
      tags: ["#advanced", "#rigging"],
      rating: 4.9,
      image: "🤖"
    },
    {
      id: 3,
      title: "ZBrush Digital Sculpting Masterclass",
      category: "ZBrush",
      instructor: "Sam Martinez",
      students: 3450,
      tags: ["#sculpting", "#advanced"],
      rating: 4.7,
      image: "🎨"
    },
    {
      id: 4,
      title: "Blender VFX & Particles",
      category: "Blender",
      instructor: "Casey Williams",
      students: 1890,
      tags: ["#vfx", "#advanced"],
      rating: 4.6,
      image: "✨"
    },
    {
      id: 5,
      title: "Photoshop for 3D Artists",
      category: "Photoshop",
      instructor: "Morgan Davis",
      students: 2100,
      tags: ["#texturing", "#intermediate"],
      rating: 4.5,
      image: "🎭"
    },
    {
      id: 6,
      title: "Maya Modeling Fundamentals",
      category: "Maya",
      instructor: "Taylor Brown",
      students: 1560,
      tags: ["#beginner", "#modeling"],
      rating: 4.8,
      image: "🏗️"
    }
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => course.tags.includes(tag));

    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTags && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">LearnHub</div>

          <nav className="hidden md:flex gap-8 text-sm text-gray-600">
            <a href="#">Courses</a>
            <a href="#">Browse</a>
            <a href="#">Community</a>
          </nav>

          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-800">
            Sign In
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase">
              Categories
            </h3>

            <div className="space-y-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase">
              Tags
            </h3>

            <div className="space-y-2">
              {tags.map((tag) => (
                <label key={tag} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />

                  <span className="text-sm text-gray-600">{tag}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Courses */}
          <main className="flex-1">
            <h2 className="text-lg font-semibold mb-6">
              {filteredCourses.length} Courses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl">
                    {course.image}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{course.title}</h3>

                    <p className="text-xs text-gray-500 mb-3">{course.category}</p>

                    <div className="flex items-center gap-1 mb-3">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({course.students} students)
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">
                      By {course.instructor}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gray-900 text-white py-2 rounded text-sm flex items-center justify-center gap-2">
                      <Play size={16} />
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}