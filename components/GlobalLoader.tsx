// "use client";

// import { useIsFetching, useIsMutating } from "@tanstack/react-query";

// export default function GlobalLoader() {
//   const isFetching = useIsFetching();
//   const isMutating = useIsMutating();

//   const isLoading = isFetching + isMutating > 0;

//   if (!isLoading) return null;

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
//       <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
//     </div>
//   );
// }
