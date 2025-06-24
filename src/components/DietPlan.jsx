import { useState, useEffect } from 'react';
import api from '../api.js';

export default function DietPlan() {
  const [dietPlans, setDietPlans] = useState([]);
  const [date, setDate] = useState('');
  const [dietType, setDietType] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [nutrition, setNutrition] = useState('');
  const username = localStorage.getItem('username');

  // Fetch diet plans from the API
  const fetchDietPlans = async () => {
    try {
      const res = await api.get(`/dietplan/?username=${username}`);
      setDietPlans(res.data);
    } catch (error) {
      console.error('Error fetching diet plans:', error);
    }
  };

  const addDietPlan = async () => {
    if (!date || !dietType || !description || !calories || !nutrition) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await api.post('/dietplan/add', {
        username,
        dietplan: {
          date,
          dietType,
          description,
          calories,
          nutrition,
        },
      });
      setDate('');
      setDietType('Breakfast');
      setDescription('');
      setCalories('');
      setNutrition('');
      fetchDietPlans();
    } catch (error) {
      console.error('Error adding diet plan:', error);
    }
  };
  const deleteDietPlan = async (id) => {
    try {
      await api.delete(`/dietplan/delete/${id}`);
      fetchDietPlans();
    } catch (error) {
      console.error('Error deleting diet plan:', error);
    }
  };

  useEffect(() => {
    fetchDietPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <h2 className="text-4xl font-bold text-center mb-8">Manage Your Diet Plans</h2>

      {/* Form to Add Diet Plan */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add a New Diet Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="date" className="text-gray-700 text-sm font-medium">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Dinner">Dinner</option>
          </select>
          <input
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <input
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Nutrition Info (e.g., Protein: 20g, Fat: 10g)"
            value={nutrition}
            onChange={(e) => setNutrition(e.target.value)}
          />
        </div>
        <button
          onClick={addDietPlan}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded mt-4 transition duration-300"
        >
          Add Diet Plan
        </button>
      </div>

      {/* List of Diet Plans */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Diet Plans</h3>
        <ul className="space-y-4">
          {dietPlans.length > 0 ? (
            dietPlans.map((d) => (
              <li
                key={d.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 p-4 rounded bg-gray-50 shadow"
              >
                <div>
                  <p className="font-medium text-lg">Date: {d.date}</p>
                  <p className="text-gray-700">Diet Type: {d.dietType}</p>
                  <p className="text-gray-700">Description: {d.description}</p>
                  <p className="text-gray-700">Calories: {d.calories}</p>
                  <p className="text-gray-700">Nutrition: {d.nutrition}</p>
                </div>
                <button
                  onClick={() => deleteDietPlan(d.id)}
                  className="text-red-500 hover:text-red-600 font-semibold mt-4 md:mt-0"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No diet plans found. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
