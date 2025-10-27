import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "@xyflow/react";
import ActionPanel from "../components/ActionPanel";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

interface NodeType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function WorkflowPlayground() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const nodeIdRef = useRef(3);
  const reactFlowRef = useRef<HTMLDivElement>(null);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const nodeTypeStr = event.dataTransfer.getData("application/json");
    if (!nodeTypeStr) return;

    const nodeType: NodeType = JSON.parse(nodeTypeStr);
    const reactFlowBounds = reactFlowRef.current?.getBoundingClientRect();

    if (!reactFlowBounds) return;
    const position = {
      x: event.clientX - reactFlowBounds.left - 300,
      y: event.clientY - reactFlowBounds.top - 30,
    };
    const newNode = {
      id: `${nodeType.id}-${nodeIdRef.current++}`,
      position,
      data: {
        label: nodeType.name,
        icon: nodeType.icon,
        color: nodeType.color,
      },
    };

    setNodes((nds) => [...nds, newNode as any]);
  }, []);
  return (
    <div
      ref={reactFlowRef}
      className="w-screen h-screen bg-gray-300"
      style={{ width: "100vw", height: "100vh" }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background
          gap={20} // distance between lines
          size={1} // size of dots
          color="#454343"
        />
      </ReactFlow>
      <ActionPanel />
    </div>
  );
}
