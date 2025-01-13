// app/payment/client.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

type ClientProps = {
  session_id?: string;
  cancel?: boolean;
};

const PaymentClient = ({ session_id, cancel }: ClientProps) => {
  const router = useRouter();
  const upgrade = useMutation(api.users.upgradeToPro);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleSubscription = async () => {
      try {
        if (session_id) {
          // Call the server API to validate the session and get user info
          const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id }),
          });

          const data = await response.json();
          console.log(data)

          if (data.success) {
            const subscribed = await upgrade({
              userId: data.userId,
            });

            if (subscribed && subscribed?.success) {
              router.push("/");
              return;
            }
          }
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    handleSubscription();
  }, [session_id, upgrade, router]);

  if (error || cancel) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Oops! Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h4 className="text-2xl font-bold">Processing...</h4>
    </div>
  );
};

export default PaymentClient;