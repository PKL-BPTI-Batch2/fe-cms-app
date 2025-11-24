import { useState, useEffect } from "react";
import API from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalNews: 0,
    activeUsers: 0,
    mediaFiles: 0,
  });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      if (typeof timestamp === 'string' && timestamp.includes('T')) {
        const [datePart, timePart] = timestamp.split('T');
        const cleanTime = timePart.split('.')[0]; 
        return `${datePart} ${cleanTime}`;
      }
      
      const date = new Date(timestamp);
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = date.toTimeString().split(' ')[0];
      return `${formattedDate} ${formattedTime}`;
      
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return timestamp;
    }
  };

  const getDefaultDetails = (actionType) => {
    switch(actionType) {
      case 'LOGIN': return 'User login';
      case 'LOGOUT': return 'User logout';
      case 'REGISTER': return 'User mendaftar';
      case 'CREATE_NEWS': return 'User membuat berita baru';
      case 'UPDATE_NEWS': return 'User memperbarui berita';
      case 'DELETE_NEWS': return 'User menghapus berita';
      case 'UPLOAD_MEDIA': return 'User mengupload file media';
      case 'DELETE_MEDIA': return 'User menghapus file media';
      case 'CREATE_MENU': return 'User membuat menu baru';
      case 'UPDATE_MENU': return 'User memperbarui menu';
      case 'DELETE_MENU': return 'User menghapus menu';
      case 'UPDATE_PROFILE': return 'User memperbarui profil';
      case 'CHANGE_PASSWORD': return 'User mengganti password';
      default: return 'User melakukan aktivitas';
    }
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'LOGIN': return 'bg-green-100 text-green-800';
      case 'REGISTER': return 'bg-blue-100 text-blue-800';
      case 'CREATE_NEWS': return 'bg-purple-100 text-purple-800';
      case 'UPDATE_NEWS': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE_NEWS': return 'bg-red-100 text-red-800';
      case 'CREATE_MENU': return 'bg-indigo-100 text-indigo-800';
      case 'UPDATE_MENU': return 'bg-orange-100 text-orange-800';
      case 'DELETE_MENU': return 'bg-red-100 text-red-800';
      case 'LOGOUT': return 'bg-red-100 text-red-800';
      case 'UPLOAD_MEDIA': return 'bg-teal-100 text-teal-800';
      case 'DELETE_MEDIA': return 'bg-red-100 text-red-800';
      case 'UPDATE_PROFILE': return 'bg-cyan-100 text-cyan-800';
      case 'CHANGE_PASSWORD': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [statsRes, activityRes] = await Promise.all([
          API.get("/totals"),
          API.get("/recent")
        ]);

        console.log("Stats data:", statsRes.data);
        console.log("Activity data:", activityRes.data);

        setStats({
          totalNews: statsRes.data.data?.news ?? 0,
          activeUsers: statsRes.data.data?.users ?? 0,
          mediaFiles: statsRes.data.data?.media ?? 0,
        });

        setActivity(activityRes.data.data ?? []);
        
      } catch (err) {
        console.log("Gagal ambil data dashboard:", err);
        setError("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 text-black p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 text-black p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">Total Berita</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{stats.totalNews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">Total User</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{stats.activeUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">File Media</h2>
          <p className="text-3xl font-bold mt-2 text-gray-600">{stats.mediaFiles}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <p className="text-gray-500 text-sm mt-1">Log aktivitas pengguna</p>
        </div>

        <div className="p-6">
          {activity.length === 0 ? (
            <p className="text-gray-500">Tidak ada aktivitas terbaru.</p>
          ) : (
            <div className="space-y-4">
              {activity.map((item, index) => {
                const userId = item.user_id || item.userId || 'Unknown';
                const action = item.action || item.type || 'LOGIN';
                const details = item.details || item.description || getDefaultDetails(action);
                const createdAt = formatTimestamp(item.created_at || item.timestamp || item.time);

                return (
                  <div key={index} className="flex items-start space-x-4 p-3 border border-gray-200 rounded-lg"> 
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(action)}`}>
                          {action}
                        </span>
                        <span className="text-gray-500 text-sm">User ID: {userId}</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-1">{details}</p>
                      
                      <span className="text-gray-400 text-xs">{createdAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {activity.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-between">
            
              <div className="flex items-center space-x-2">
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;