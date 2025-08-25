import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [stats, setStats] = useState({
    totalNews: 0,
    totalPages: 0,
    activeUsers: 0,
    mediaFiles: 0,
  });

  const [activity, setActivity] = useState([]);

  useEffect(() => {
//database abal abal biar work aja kak
    axios
      .get('http://127.0.0.1:3000/stats')
      .then((response) => setStats(response.data))
      .catch((error) => console.log('Gagal ambil stats:', error));

    axios
      .get('http://127.0.0.1:3000/activity')
      .then((response) => setActivity(response.data))
      .catch((error) => console.log('Gagal ambil aktivitas:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white text-black p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Berita</h2>
          <p className="text-3xl font-bold">{stats.totalNews}</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Halaman</h2>
          <p className="text-3xl font-bold">{stats.totalPages}</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Pengguna Aktif</h2>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-white text-black p-4 rounded-lg">
          <h2 className="text-lg font-semibold">File Media</h2>
          <p className="text-3xl font-bold">{stats.mediaFiles}</p>
        </div>
      </div>
      <div className="mt-6 bg-white text-black p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Aktivitas Terbaru</h2>
        {activity.map((item, index) => (
          <p key={index} className="text-gray-600">
            {item.text} <span className="text-gray-400">{item.time}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
