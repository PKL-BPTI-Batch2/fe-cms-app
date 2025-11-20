import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalNews: 0,
    activeUsers: 0,
    mediaFiles: 0,
  });

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/api/activity/recent");

        setStats(res.data.stats || {});
        setActivity(res.data.recentActivity || []);
      } catch (err) {
        console.log("Gagal ambil data dashboard:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      {/* STATISTICS */}
      <div className="grid grid-cols-4 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Total Berita</h2>
          <p className="text-3xl font-bold">{stats.totalNews}</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Pengguna Aktif</h2>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">File Media</h2>
          <p className="text-3xl font-bold">{stats.mediaFiles}</p>
        </div>
      </div>

      {/* ACTIVITY */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Aktivitas Terbaru</h2>

        {activity.length === 0 && (
          <p className="text-gray-500">Tidak ada aktivitas terbaru.</p>
        )}

        {activity.map((item, index) => (
          <p key={index} className="text-gray-700 mb-1">
            {item.text}{" "}
            <span className="text-gray-400 text-sm">({item.time})</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
