import { useEffect, useState } from 'react';
import API from '../api/api';

function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: '', price: '' });
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    API.get('/plans')
      .then(res => {
        setPlans(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPlan) {
      API.put(`/plans/${editingPlan.id}`, newPlan)
        .then(() => {
          setNewPlan({ name: '', price: '' });
          setEditingPlan(null);
          fetchPlans();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      API.post('/plans', newPlan)
        .then(() => {
          setNewPlan({ name: '', price: '' });
          fetchPlans();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setNewPlan({ name: plan.name, price: plan.price });
  };

  const handleDelete = (id) => {
    API.delete(`/plans/${id}`)
      .then(() => {
        fetchPlans();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Plans</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Plan Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newPlan.price}
          onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editingPlan ? 'Update Plan' : 'Add Plan'}
        </button>
      </form>

      {plans.length === 0 ? (
        <p>No plans found.</p>
      ) : (
        <ul>
          {plans.map(plan => (
            <li key={plan.id} className="border p-2 mb-2 flex justify-between items-center">
              <span>{plan.name} - ₹{plan.price}</span>
              <div>
                <button
                  onClick={() => handleEdit(plan)}
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlansPage;
