import { useEffect, useState } from 'react';
import API from '../api/api';

function StoresPage() {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({ name: '', location: '' });
  const [editingStore, setEditingStore] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = () => {
    API.get('/stores')
      .then(res => {
        setStores(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStore) {
      API.put(`/stores/${editingStore.id}`, newStore)
        .then(() => {
          setNewStore({ name: '', location: '' });
          setEditingStore(null);
          fetchStores();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      API.post('/stores', newStore)
        .then(() => {
          setNewStore({ name: '', location: '' });
          fetchStores();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setNewStore({ name: store.name, location: store.location });
  };

  const handleDelete = (id) => {
    API.delete(`/stores/${id}`)
      .then(() => {
        fetchStores();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Stores</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Store Name"
          value={newStore.name}
          onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newStore.location}
          onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editingStore ? 'Update Store' : 'Add Store'}
        </button>
      </form>

      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <ul>
          {stores.map(store => (
            <li key={store.id} className="border p-2 mb-2 flex justify-between items-center">
              <span>{store.name} - {store.location}</span>
              <div>
                <button
                  onClick={() => handleEdit(store)}
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(store.id)}
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

export default StoresPage;
