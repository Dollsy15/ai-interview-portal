import React, { useEffect, useState } from "react";
import { getCodingSubmissions } from "../api";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getCodingSubmissions()
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("❌ Error fetching submissions:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📜 Coding Submissions (Admin)</h2>

      <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#efefef" }}>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Code</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s._id}>
              <td>{s.user?.name}</td>
              <td>{s.user?.email}</td>
              <td>
                <pre style={{ whiteSpace: "pre-wrap", maxWidth: "400px", overflowX: "auto" }}>
                  {s.code}
                </pre>
              </td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}