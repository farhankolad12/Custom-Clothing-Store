import { useRouter } from "next/navigation";
import React from "react";

export default function OrderRow({ order }: { order: any }) {
  const myDate = new Date(order.paidAt);

  const router = useRouter();

  return (
    <tr>
      <td>{order._id}</td>
      <td>{myDate.toLocaleString()}</td>
      <td>
        {order.address?.fname + " " + order.address?.lname || "Kambekar street"}
      </td>
      <td>{order.method || "UPI"}</td>
      <td>{order.subtotal + order.shippingPrice - order.discountedPrice}</td>
      <td>{order.status[order.status.length - 1].name}</td>
      <td>
        <select name="status" id="status" className="form-select">
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="cancel">Cancel</option>
        </select>
      </td>
      <td>
        <div className="d-flex gap-3">
          <button className="btn p-0">
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
  );
}
