import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import InvoicePDF from "./InvoicePDF";
import { useReactToPrint } from "react-to-print";
import formatCurrency from "@/app/utils/formatCurrency";

export default function OrderRow({ order }: { order: any }) {
  const myDate = new Date(order.paidAt);

  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null!);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <>
      <tr>
        <td>{order._id}</td>
        <td>{myDate.toLocaleString()}</td>
        <td>
          {order.address?.fname + " " + order.address?.lname ||
            "Kambekar street"}
        </td>
        <td>{order.method || "UPI"}</td>
        <td>{formatCurrency(order.subtotal + order.shippingPrice)}</td>
        <td>{order.status[order.status.length - 1].name}</td>
        <td>
          <div className="d-flex gap-3">
            <button onClick={handlePrint} className="btn p-0">
              <i className="bi bi-printer text-white" />
            </button>
            <button
              onClick={() => router.push("/order/" + order._id)}
              className="btn p-0"
            >
              <i className="bi bi-search text-white" />
            </button>
          </div>
        </td>
      </tr>
      <div style={{ display: "none" }}>
        <InvoicePDF order={order} invoiceRef={invoiceRef} />
      </div>
    </>
  );
}
