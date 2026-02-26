"use client"
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Input } from "@base-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [value , setValue] = useState("");
  const trpc = useTRPC();
  
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onError : (error) => {
      toast.error(error.message);
    },
    onSuccess : (data) => {
      router.push(`/projects/${data.id}`)
    }
  }));

  // const getmessages = useQuery(trpc.messages.getMany.queryOptions());

  return (
    <div className="p-4 max-w-7xl">
      <Input value={value} onChange={(e) => setValue(e.target.value)}/>
    <Button disabled={createProject.isPending} onClick={() => createProject.mutate({value : value})}>
      Invoke Background Job
    </Button>

    {/* {JSON.stringify(getmessages.data)}   */}
    </div>
  );
}
