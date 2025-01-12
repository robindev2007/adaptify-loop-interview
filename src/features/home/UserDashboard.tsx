import Container from "@/components/Container";
import React from "react";
import BalanceCard from "./BalanceCard";

function UserDashboard() {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          <BalanceCard mainBalance={320} />
          {/* <PaymentsCounterCard mainBalance={320} /> */}
        </div>
      </Container>
    </div>
  );
}

export default UserDashboard;
