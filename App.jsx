import React, { useState, useEffect } from 'react';

// --- PEAK AI LEARNING APP ---
function App() {
  const [topic, setTopic] = useState('');
  const [lesson, setLesson] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Global Rankings on load
  useEffect(() => {
    fetch('/api/rankings')
      .then(res => res.json())
      .then(data => setRankings(data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setLesson(data);
    } catch (err) {
      console.error("Error fetching peak lesson:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      
      {/* 1. SEARCH BAR & HEADER (Tailblocks inspired) */}
      <header className="text-gray-400 bg-gray-900 body-font border-b border-gray-800">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <span className="ml-3 text-xl font-bold tracking-widest text-blue-500">QUANTUM PLAYGROUND</span>
          </span>
          <form onSubmit={handleSearch} className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center w-full md:w-1/2">
            <div className="relative w-full">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What do you want to learn today?" 
                className="w-full bg-gray-800 rounded border border-gray-700 focus:ring-2 focus:ring-blue-900 focus:border-blue-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              />
              <button type="submit" className="absolute right-2 top-2 text-blue-500 hover:text-white">
                {loading ? '...' : '🔍'}
              </button>
            </div>
          </form>
          <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 text-blue-400">
            My Account
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA (AI RESULTS) */}
      <main className="flex-grow container mx-auto px-5 py-24">
        {!lesson ? (
          <div className="text-center">
            <h1 className="sm:text-5xl text-3xl font-black mb-4 text-white">The Future of Learning is Here.</h1>
            <p className="text-gray-400 leading-relaxed text-lg">Enter a topic above to generate a "peak" AI-driven lesson instantly.</p>
          </div>
        ) : (
          <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
            <div className="container px-5 mx-auto bg-gray-800 p-10 rounded-2xl shadow-2xl border border-blue-500/20">
              <h2 className="text-sm title-font text-blue-500 tracking-widest uppercase mb-1">AI Generated Lesson</h2>
              <h1 className="text-white text-3xl title-font font-medium mb-4">{lesson.title}</h1>
              <p className="leading-relaxed mb-6 text-gray-300">{lesson.explanation}</p>
              <ul className="list-disc ml-5 mb-8 text-blue-300">
                {lesson.points.map((p, i) => <li key={i} className="mb-2">{p}</li>)}
              </ul>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-white font-bold mb-4">Quiz: {lesson.quiz}</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition">Submit Answer</button>
              </div>
            </div>
          </section>
        )}

        {/* 3. GLOBAL RANKING (After Result Screen) */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-white tracking-widest">GLOBAL RANKING</h2>
          <div className="w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">Rank</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">User</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">Points</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((user) => (
                  <tr key={user.rank} className="border-b border-gray-800">
                    <td className="px-4 py-3">#{user.rank}</td>
                    <td className="px-4 py-3 text-blue-400">{user.name}</td>
                    <td className="px-4 py-3 text-white font-bold">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 4. FOOTER (Cookies & Privacy) */}
      <footer className="text-gray-400 bg-gray-900 body-font border-t border-gray-800">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
            © 2026 quantumplayground.cc — 
            <a href="#" className="text-gray-600 ml-1 hover:text-blue-500">Cookie Policy</a>
            <a href="#" className="text-gray-600 ml-1 hover:text-blue-500"> | Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
              
