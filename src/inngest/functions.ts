import { inngest } from "./client";
import { createAgent, gemini } from '@inngest/agent-kit';
import { Sandbox } from '@e2b/code-interpreter';
import { getSandbox } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    
    const sandboxId = await step.run("get-sandbox-id",async () => {
        const sandbox = await Sandbox.create("zaidnawaz2005/clusmy");
        return sandbox.sandboxId;
    })

    const codeagent = createAgent({
    name: 'code-agent',
    system: 'you are an expert next.js developer. you write readable, maintainable code.write simple next.js and react snippets ',
    model: gemini({model : "gemini-2.5-flash"}),
    });

    const { output } = await codeagent.run(`write the following snippets :  ${event.data.value}`)
    
    const sandboxurl = await step.run("get-sandbox-url", async() => {
        const sandbox = await getSandbox(sandboxId);
        const host = sandbox.getHost(3000);
        return `http://${host}`;

    })



    return { output };
  },
);