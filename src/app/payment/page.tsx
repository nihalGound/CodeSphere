// app/payment/page.tsx
import { Suspense } from "react";
import PaymentClient from "./client";

type Props = {
  searchParams: {
    session_id?: string;
    cancel?: boolean;
  };
};

const Page = async ({ searchParams }: Props) => {
  // In Next.js 14, searchParams is not actually a Promise
  // We just need to access it normally
  const session_id = searchParams.session_id;
  const cancel = searchParams.cancel;

  return (
    <Suspense 
      fallback={
        <div className="flex flex-col justify-center items-center h-screen w-full">
          <h4 className="text-2xl font-bold">Loading...</h4>
        </div>
      }
    >
      <PaymentClient session_id={session_id} cancel={cancel} />
    </Suspense>
  );
};

export default Page;