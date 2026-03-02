import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
    params : Promise<{
        projectId : string;
    }>
}

const page = async ({params} : Props) => {
    const {projectId} = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({ //it is used to prefetch data about the project and store it in queryclient
        projectId,
    }))

    void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
        id : projectId
    }))
    //in hydration boundary , you are sending the prefetched data of queryclient to its children , in this case projectview
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>LOADING...</p>}>
            <ProjectView projectId={projectId} />

            </Suspense>
        </HydrationBoundary>
        
    );
}

export default page;