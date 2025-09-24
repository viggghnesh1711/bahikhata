import Sidebar from "@/components/Sidebar"


export default function DashboardLayout({children}){
    return(
        <>
        <main className="bg-stone-200 flex h-screen  w-full">
        <Sidebar />
        <div className="p-4 w-full">
        {children}
        </div>
        </main>
        </>
    )
}