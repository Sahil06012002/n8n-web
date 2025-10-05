import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Credential = {
  _id: string;
  user_id: string;
  title: string;
  platform: string;
  data: Record<string, string>;
};
type Props = {
  refresh?: boolean; // optional if you sometimes don't pass it
};

const API_URL = "http://localhost:8000"; // will Replace with actual API URL

export default function Credentials({ refresh }: Props) {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userid = 12345; //will be fetch from users database after auth.

  //fetch all credentials
  const fetchCredentials = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/credentials/user/${userid}`);
      if (!res.ok) throw new Error("Failed to fetch credentials");
      const data = await res.json();
      const parsed: Credential[] = JSON.parse(
        data["user-credentials"].replace(/'/g, '"') // replace single quotes with double quotes
      );
      setCredentials(parsed);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Delete credential
  const deleteCredential = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/credentials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete credential");
      setCredentials((prev) => prev.filter((cred) => cred._id !== id));
      // await fetchCredentials(); // refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchCredentials();
  }, [refresh]);

  if (loading) return <p>Loading credentials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Your Credentials</h2>
      {credentials.length === 0 ? (
        <p className="text-gray-400">No credentials found.</p>
      ) : (
        <ul className="space-y-4">
          {credentials.map((cred) => (
            <li
              key={cred._id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{cred.title}</p>
                  <p className="text-sm text-gray-400 mt-1">{cred.platform}</p>

                  <div className="mt-3">
                    <strong className="text-sm text-gray-300">Data:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      {Object.entries(cred.data).map(([key, value]) => (
                        <li key={key} className="text-xs text-gray-400">
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => deleteCredential(cred._id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
