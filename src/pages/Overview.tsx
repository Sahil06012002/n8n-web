import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Workflows from "@/components/Workflows";
import { type Workflow } from "@/types/Workflow";

export default function Overview() {
  const tabTriggerClasses = `text-md border-0 rounded-none border-b-2
          border-transparent hover:text-orange-600
          data-[state=active]:border-orange-600
          data-[state=active]:text-orange-600`;

  // we have to fetch this on click
  const [workflow, setWorkflow] = useState<Workflow[]>([]);
  return (
    <div className="bg-primary h-screen w-full p-4 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-zinc-400">
          All the workflows, credentials and executions you have access to
        </p>
      </div>
      <div className="navigation flex-1">
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
            Change your Credentials here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
