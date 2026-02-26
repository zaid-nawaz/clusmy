"use client"
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Input } from "@base-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [value , setValue] = useState("");
  const trpc = useTRPC();
  
  const createmessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess : () => {
      toast.success("background job started.");
    },
  }));

  const getmessages = useQuery(trpc.messages.getMany.queryOptions());

  return (
    <div className="p-4 max-w-7xl">
      <Input value={value} onChange={(e) => setValue(e.target.value)}/>
    <Button disabled={createmessage.isPending} onClick={() => createmessage.mutate({value : value})}>
      Invoke Background Job
    </Button>

    {JSON.stringify(getmessages.data)}  
    </div>
  );
}
