import React, { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Workflows from "@/components/Workflows";
import { type Workflow } from "@/types/Workflow";
import Credentials from "@/components/Credentials";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Overview() {
  const tabTriggerClasses = `text-md border-0 rounded-none border-b-2
          border-transparent hover:text-orange-600
          data-[state=active]:border-orange-600
          data-[state=active]:text-orange-600`;
  const userid = 12345; //will be fetch from users database after auth.
  const API_URL = "http://localhost:8000"; // will Replace with actual API URL and place it in env
  const [createOption, setCreateOption] = useState("select");
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //create credentials
  const createCredential = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/credentials`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: String(userid),
          title: String(newTitle),
          platform: String(newPlatform),
          data: { apiKey: String(newApiKey) },
        }),
      });
      if (!res.ok) throw new Error("failed to create credential");
      setNewTitle("");
      setNewPlatform("");
      setNewApiKey("");
      setShowModal(false);
      setRefresh((prev) => !prev);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // we have to fetch this on click
  const [workflow, setWorkflow] = useState<Workflow[]>([]);
  return (
    <div className="bg-primary w-full p-4 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-zinc-400">
          All the workflows, credentials and executions you have access to
        </p>
      </div>
      <div className="navigation flex flex-1">
        <Tabs defaultValue="Workflow" className="h-full w-full">
          <TabsList className="">
            <TabsTrigger className={tabTriggerClasses} value="Workflows">
              Workflow
            </TabsTrigger>
            <TabsTrigger className={tabTriggerClasses} value="Credentials">
              Credentials
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Workflows">
            <Workflows workflows={workflow}></Workflows>
          </TabsContent>
          <TabsContent value="Credentials">
            <Credentials refresh={refresh} />
          </TabsContent>
        </Tabs>
        {/* Create Button with Dropdown (matches n8n design) */}
        <div className="flex-shrink-0 relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md flex items-center gap-2 text-white font-medium"
          >
            Create Workflow
            {showDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="py-2">
                <button
                  onClick={() => {
                    setCreateOption("createWorkflow");
                    setShowModal(true);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                >
                  Create Workflow
                </button>
                <button
                  onClick={() => {
                    setCreateOption("createCredential");
                    setShowModal(true);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                >
                  Create Credential
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && createOption === "createCredential" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-white">
              Create Credential
            </h3>
            <form onSubmit={createCredential} className="space-y-4">
              <div>
                <label className="block font-semibold text-white text-sm mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-white text-sm mb-1">
                  Platform:
                </label>
                <input
                  type="text"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-white text-sm mb-1">
                  API Key:
                </label>
                <input
                  type="text"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
