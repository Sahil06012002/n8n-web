import { useState } from "react";
import { Plus, ChevronRight, MessageCircle, Send, Mail } from "lucide-react";

interface NodeType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const ActionPanel = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const nodeList: NodeType[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "whatsapp",
      color: "bg-green-500",
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: "telegram",
      color: "bg-blue-500",
    },
    {
      id: "email",
      name: "Email",
      icon: "email",
      color: "bg-red-500",
    },
  ];

  const getIcon = (iconId: string) => {
    switch (iconId) {
      case "whatsapp":
        return <MessageCircle size={24} className="text-white" />;
      case "telegram":
        return <Send size={24} className="text-white" />;
      case "email":
        return <Mail size={24} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed flex gap-2 items-center top-4 right-4 z-50 p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-gray-700"
      >
        {isOpen ? (
          <ChevronRight size={20} />
        ) : (
          <>
            <Plus size={20} />
            <span>Add Node</span>
          </>
        )}
      </button>
      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-zinc-700 text-white border-l border-gray-700 flex flex-col z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-zinc-700 sticky top-0 bg-zinc-700">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Plus size={20} />
            Available Nodes
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {nodeList.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`p-3 rounded cursor-pointer transition-all border mb-2 ${
                selectedNodeId === node.id
                  ? "bg-zinc-600 text-white border-white shadow-lg"
                  : "bg-zinc-700 text-white hover:bg-zinc-600 border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${node.color} `}>
                  {getIcon(node.icon)}
                </div>
                <div>
                  <p className="text-sm font-medium">{node.name}</p>
                  <p className="text-xs text-gray-400">{node.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-700 bg-zinc-700 sticky bottom-0">
          <p className="text-xs text-gray-400">3 available nodes</p>
        </div>
      </div>
    </>
  );
};

export default ActionPanel;
