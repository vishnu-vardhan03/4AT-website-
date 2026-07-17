import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="constant-site-background min-h-screen bg-[#04060f] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-5 h-12 w-72 max-w-full" />
        <Skeleton className="mt-3 h-5 w-[420px] max-w-full" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-36 rounded-2xl" />)}
        </div>
        <Skeleton className="mt-6 h-[440px] rounded-2xl" />
        <Skeleton className="mt-6 h-[400px] rounded-2xl" />
      </div>
    </main>
  );
}
