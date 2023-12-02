import TicketsComponent from "@/app/components/Tickets";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <TicketsComponent></TicketsComponent>
      </div>
    </main>
  )
}
