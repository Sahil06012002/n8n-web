import type { Workflow } from "@/types/Workflow";
import { StickyNote } from "lucide-react";

function WorkflowList(workflow: Workflow) {
  return (
    <div className="flex gap-5">
      <p>{workflow.title}</p>
      <input type="checkbox" checked={workflow.enabled}></input>
    </div>
  );
}

export default function Workflows({ workflows }: { workflows: Workflow[] }) {
  return (
    <div className="h-full w-full flex justify-center pt-4">
      {workflows.length > 0 ? (
        workflows.map((workflow) => (
          <WorkflowList title={workflow.title} enabled={workflow.enabled} />
        ))
      ) : (
        <div className="">
          <div className="text-center">
            <h2 className="text-3xl">👋 Welcome User</h2>
            <p className="mb-10">Create your first workflow</p>
            <div className=" rounded-md flex flex-col items-center justify-center bg-zinc-700 py-25">
              <StickyNote className="h-12 w-10" />
              <p>Start from Scratch</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
