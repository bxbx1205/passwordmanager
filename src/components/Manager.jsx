import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api/passwords";

const Manager = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setPasswordArray(data));
  }, []);

  const savePassword = async () => {
    if (editId) {
      const res = await fetch(`${API_BASE}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setPasswordArray((prev) =>
        prev.map((item) => (item._id === editId ? updated : item))
      );
      setEditId(null);
    } else {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newPass = await res.json();
      setPasswordArray((prev) => [...prev, newPass]);
    }
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    setPasswordArray((prev) => prev.filter((item) => item._id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ site: "", username: "", password: "" });
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ site: item.site, username: item.username, password: item.password });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="max-w myContainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700 dark:text-green-400">&lt;</span>
          Pass
          <span className="text-green-700 dark:text-green-400">/&gt;</span>
        </h1>
        <p className="text-green-900 dark:text-green-200 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="mt-2 flex flex-col gap-4 p-4">
          <input
            onChange={handleChange}
            value={form.site}
            className="border border-green-500 w-full px-4 py-2 text-black dark:text-white dark:bg-gray-800 rounded-full bg-white"
            type="text"
            placeholder="Enter URL or Service Name"
            name="site"
          />
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <input
              onChange={handleChange}
              value={form.username}
              className="border border-green-500 w-full px-4 py-2 text-black dark:text-white dark:bg-gray-800 rounded-full bg-white"
              type="text"
              placeholder="Username"
              name="username"
            />
            <div className="relative w-full">
              <input
                onChange={handleChange}
                value={form.password}
                className="border border-green-500 w-full px-4 py-2 text-black dark:text-white dark:bg-gray-800 rounded-full pr-16 bg-white"
                type="password"
                placeholder="Password"
                name="password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Show
              </button>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-white font-semibold px-6 py-2 rounded-full w-fit self-center flex items-center gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            {editId ? "Update Password" : "Add Password"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setForm({ site: "", username: "", password: "" });
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-full w-fit self-center flex items-center gap-2"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="passwords mt-8">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <p className="text-amber-600 dark:text-gray-400">No passwords saved yet.</p>
          ) : (
            <table className="table-auto w-full rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-green-600 dark:bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2">Site</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Password</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 text-black dark:text-white">
                {passwordArray.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{item.site}</td>
                    <td className="px-4 py-2">{item.username}</td>
                    <td className="px-4 py-2">{item.password}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-full"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deletePassword(item._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
