import { useEffect, useState } from 'react';
import API from '../api/api';

function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = () => {
    API.get('/coupons')
      .then(res => {
        setCoupons(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCoupon) {
      API.put(`/coupons/${editingCoupon.id}`, newCoupon)
        .then(() => {
          setNewCoupon({ code: '', discount: '' });
          setEditingCoupon(null);
          fetchCoupons();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      API.post('/coupons', newCoupon)
        .then(() => {
          setNewCoupon({ code: '', discount: '' });
          fetchCoupons();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setNewCoupon({ code: coupon.code, discount: coupon.discount });
  };

  const handleDelete = (id) => {
    API.delete(`/coupons/${id}`)
      .then(() => {
        fetchCoupons();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Coupons</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={newCoupon.discount}
          onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
        </button>
      </form>

      {coupons.length === 0 ? (
        <p>No coupons found.</p>
      ) : (
        <ul>
          {coupons.map(coupon => (
            <li key={coupon.id} className="border p-2 mb-2 flex justify-between items-center">
              <span>{coupon.code} - {coupon.discount}% off</span>
              <div>
                <button
                  onClick={() => handleEdit(coupon)}
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
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

export default CouponsPage;
