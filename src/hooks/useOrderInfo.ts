// src/hooks/useOrderInfo.ts
import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $loadingOrders, $userOrders } from "@/lib/stores/orderStore";
import { $user } from "@/lib/stores/userStore";
import { actions } from "astro:actions";

export function useOrderInfo() {
  const userOrders = useStore($userOrders);
  const loadingOrders = useStore($loadingOrders);
  const user = useStore($user);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user?.id) return;

      try {
        $loadingOrders.set(true);

        const result = await actions.orderActions.getUserOrders({
          userId: user.id,
        });

        if (result.data) {
          $userOrders.set(result.data.orders);
        } else {
          console.error("Error fetching orders:", result.error);
        }
      } finally {
        $loadingOrders.set(false);
      }
    };

    fetchUserOrders();
  }, [user?.id]);

  return { userOrders, loadingOrders };
}
