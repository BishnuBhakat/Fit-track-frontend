import { useState, useEffect } from 'react';
import api from '../api.js';

export default function Progress() {
  const [progressList, setProgressList] = useState([]);
  const [date, setDate] = useState('');
  const [caloriesIntake, setCaloriesIntake] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');
  const username = localStorage.getItem('username');


  const fetchProgress = async () => {
    try {
      const res = await api.get(`/progress/?username=${username}`);
      setProgressList(res.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };


  const addProgress = async () => {
    if (!date || !caloriesIntake || !caloriesBurnt) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await api.post('/progress/add', {
        username,
        progress: {
          date,
          calories_intake: caloriesIntake,
          calories_burnt: caloriesBurnt,
        },
      });

      setDate('');
      setCaloriesIntake('');
      setCaloriesBurnt('');
      fetchProgress();
    } catch (error) {
      console.error('Error adding progress:', error);
    }
  };

  const deleteProgress = async (id) => {
    try {
      await api.delete(`/progress/delete/${id}`);
      fetchProgress();
    } catch (error) {
      console.error('Error deleting progress:', error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-8">Track Your Daily Progress</h2>

      {/* Form to Add Progress */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <label className="block text-gray-700 mb-2">Select Date</label>
          <input
            type="date"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Calories Intake"
            value={caloriesIntake}
            onChange={(e) => setCaloriesIntake(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Calories Burnt"
            value={caloriesBurnt}
            onChange={(e) => setCaloriesBurnt(e.target.value)}
          />
          <button
            onClick={addProgress}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded transition duration-300"
          >
            Add Progress
          </button>
        </div>
      </div>

      {/* List of Progress */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Progress</h3>
        <ul className="space-y-4">
          {progressList.length > 0 ? (
            progressList.map((p) => (
              <li
                key={p.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 p-4 rounded bg-gray-50 shadow"
              >
                <div>
                  <p className="font-medium text-lg">Date: {p.date}</p>
                  <p className="text-gray-700">Calories Intake: {p.calories_intake}</p>
                  <p className="text-gray-700">Calories Burnt: {p.calories_burnt}</p>
                </div>
                <button
                  onClick={() => deleteProgress(p.id)}
                  className="text-red-500 hover:text-red-600 font-semibold mt-4 md:mt-0"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No progress entries found. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
