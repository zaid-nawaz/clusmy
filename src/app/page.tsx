
import { useTRPC } from "@/trpc/client";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate , HydrationBoundary, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ClientGreeting } from "./client";
import { Suspense } from "react";

export default function Home() {
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({
      text : "zaid"
    }),
  );

  return (
    <div>
    
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>...</div>
      {/** ... */}
      <Suspense fallback={<p>loading...</p>}>
      <ClientGreeting/>
      </Suspense>
    </HydrationBoundary>
    </div>
  );
}
