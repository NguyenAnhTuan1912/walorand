import React from "react";
import { useSelector } from "react-redux";
import { FaNetworkWired } from "react-icons/fa";

// Import components
import TaskStatus from "../src/components/TaskStatus";
// import SubmitTask from "../src/components/SubmitTask";
// import CompleteTask from "../src/components/CompleteTask";
// import RegisterNode from "../src/components/RegisterNode";
// import WalnetCloud from "../src/components/WalnetCloud";
// import WalnetWorker from "../src/components/WalnetWoker";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/shared/tab-set";
import AccountDetails from "./components/AccountDetails";

// Import hooks
import { useWallet } from "./hooks/useWallet";

import "./App.css";

export default function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#1D2235] to-[#121318] overflow-hidden">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl text-white font-bold flex items-center mb-6 relative z-10">
          <FaNetworkWired className="mr-3" /> GPU Sharing DePIN Network
        </h1>
        <AccountDetails />
      </header>
      <section className="text-white overflow-y-auto">
        <div className="w-full max-w-full p-4">
          <Tabs defaultValue="complete_task" className="w-full">
            <TabsList>
              <TabsTrigger value="query_task">Query Task</TabsTrigger>
              {/* <TabsTrigger value="complete_task">Complete Task</TabsTrigger> */}
              {/* <TabsTrigger value="register_node">Register Node</TabsTrigger> */}
              <TabsTrigger value="submit_task">Submit Task</TabsTrigger>
              <TabsTrigger value="walnet_cloud">Walnet Cloud</TabsTrigger>
              <TabsTrigger value="walnet_worker">Walnet Worker</TabsTrigger>
            </TabsList>
            <TabsContent value="query_task">
              <TaskStatus />
            </TabsContent>
            {/* <TabsContent value="complete_task">
              <CompleteTask />
            </TabsContent> */}
            {/* <TabsContent value="register_node">
              <RegisterNode />
            </TabsContent> */}
            <TabsContent value="submit_task">
              {/* <SubmitTask /> */}
            </TabsContent>
            <TabsContent value="walnet_cloud">
              {/* <WalnetCloud /> */}
            </TabsContent>
            <TabsContent value="walnet_worker">
              {/* <WalnetWorker /> */}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
