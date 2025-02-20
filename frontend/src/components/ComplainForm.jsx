import React from "react";

const ComplainForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    complaintType: "Noise",
    severityLevel: "Mild",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/complaints/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Complaint submission failed");
      alert("Complaint submitted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Complaint
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mt-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mt-2"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-600"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplainForm;
