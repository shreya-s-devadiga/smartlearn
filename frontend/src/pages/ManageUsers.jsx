import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullname: '',
    email: '',
    username: '',
    role: ''
  });

  const BASE = "http://localhost:8080";

  const getUsers = async () => {
    try {
      const res = await axios.get(`${BASE}/api/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.log("Error loading users:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE}/api/admin/users/${id}`);
      getUsers();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`${BASE}/api/admin/users/${id}`, editForm);
      getUsers();
      setEditingUser(null);
      setEditForm({ fullname: '', email: '', username: '', role: '' });
    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      role: user.role
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({ fullname: '', email: '', username: '', role: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => { getUsers(); }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-4">👥 Manage Users</h2>

      <div className="card shadow-lg p-4 rounded-4">
        <table className="table table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-muted py-3">No Users Found</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    {editingUser === u.id ? (
                      <input
                        type="text"
                        name="fullname"
                        value={editForm.fullname}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      u.fullname
                    )}
                  </td>
                  <td>
                    {editingUser === u.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td>
                    {editingUser === u.id ? (
                      <input
                        type="text"
                        name="username"
                        value={editForm.username}
                        onChange={handleInputChange}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      u.username
                    )}
                  </td>
                  <td>
                    {editingUser === u.id ? (
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleInputChange}
                        className="form-select form-select-sm"
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    ) : (
                      <span className={`badge ${u.role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingUser === u.id ? (
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => updateUser(u.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : u.role !== "ADMIN" ? (
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(u)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-secondary">Protected</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}