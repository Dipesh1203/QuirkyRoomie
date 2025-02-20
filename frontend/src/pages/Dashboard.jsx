import { useEffect, useState } from "react";
import { getComplaints, voteComplaint, resolveComplaint } from "../utils/api";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getComplaints().then((res) => setComplaints(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Active Complaints</h2>
      {complaints.map((c) => (
        <div key={c._id} className="border p-4 my-2">
          <h3 className="text-lg font-semibold">{c.title}</h3>
          <p>{c.description}</p>
          <button onClick={() => voteComplaint(c._id, "upvote")}>
            ⬆️ {c.upvotes}
          </button>
          <button onClick={() => voteComplaint(c._id, "downvote")}>
            ⬇️ {c.downvotes}
          </button>
          <button
            onClick={() => resolveComplaint(c._id)}
            className="ml-4 bg-green-500 px-2 py-1"
          >
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
