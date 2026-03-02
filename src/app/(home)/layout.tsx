import { Navbar } from "@/modules/home/ui/components/navbar";

interface Props {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return ( 
    <main className="flex flex-col min-h-screen max-h-screen">
      <Navbar />
<div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-background">
  <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] 
  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
  opacity-20 blur-3xl" />
</div>
      <div className="flex-1 flex flex-col px-4 pb-4">
        {children}
      </div>
    </main>
  );
};
 
export default Layout;