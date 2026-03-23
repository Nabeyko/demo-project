const SkeletonCard = () => (
  <div className="flex animate-pulse items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
    {/* Circle */}
    <div className="mt-0.5 size-4 shrink-0 rounded-full bg-gray-200" />

    {/* Lines */}
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-3 w-1/4 rounded bg-gray-200" />
    </div>

    {/* ID placeholder */}
    <div className="h-3 w-6 shrink-0 rounded bg-gray-200" />
  </div>
);

interface TaskSkeletonProps {
  count?: number;
}

export const TaskSkeleton = ({ count = 5 }: TaskSkeletonProps) => (
  <div className="flex flex-col gap-3" aria-label="Loading tasks…">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
