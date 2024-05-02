import { ProductType } from "@/app/definations";
import formatCurrency from "@/app/utils/formatCurrency";
import React, { Ref } from "react";

export default function InvoicePDF({
  order,
  invoiceRef,
}: {
  order: any;
  invoiceRef: Ref<HTMLDivElement>;
}) {
  return (
    <main
      ref={invoiceRef}
      style={{ backgroundColor: "white", padding: "2rem" }}
      id="divToPrint"
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "1rem",
          borderBottom: "1rem ",
          borderColor: "black",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h5
            style={{
              textTransform: "capitalize",
              color: "black",
              fontWeight: "bold",
            }}
          >
            invoice
          </h5>
          <span style={{ color: "black" }}>
            STATUS <span>{order.status[order.status.length - 1].name}</span>
          </span>
        </div>
        <div
          style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: ".5rem",
          }}
        >
          <h3 style={{ color: "black" }}>Logo</h3>
          <span>Kambekar street Original, Mumbai MH, India</span>
          <span>9324288793</span>
          <span>hamzaqadri@gmail.com</span>
          <span>admin website</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            date
          </span>
          <span style={{ color: "black" }}>
            {new Date(order.paidAt).toLocaleString()}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            invoice id
          </span>
          <span
            style={{
              color: "black",
            }}
          >
            {order._id}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            invoice to
          </span>
          <span
            style={{
              color: "black",
            }}
          >
            {order.address.fname + " " + order.address.lname}
          </span>
          <span
            style={{
              color: "black",
            }}
          >
            {order.address.email} +91 {order.address.phone}
          </span>
          <span
            style={{
              color: "black",
            }}
          >
            {order.address.streetAddr1}
          </span>
          {order.address.streetAddr2 && (
            <span
              style={{
                color: "black",
              }}
            >
              {order.address.streetAddr2}
            </span>
          )}
          <span
            style={{
              color: "black",
            }}
          >
            {order.address.city}, {order.address.state}, {order.address.zipCode}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <table
          style={{
            border: "1px solid black",
            width: "100%",
          }}
        >
          <thead
            style={{
              borderBottom: "1px solid black",
              backgroundColor: "lightpink",
            }}
          >
            <tr>
              <th style={{ padding: "1rem" }}>SR</th>
              <th style={{ padding: "1rem" }}>PRODUCT TITLE</th>
              <th style={{ padding: "1rem" }}>QUANTITY</th>
              <th style={{ padding: "1rem" }}>ITEM PRICE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product: ProductType, i: number) => {
              return (
                <tr
                  key={i}
                  style={{ padding: "1rem", borderBottom: "1px solid black" }}
                >
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>{product.name}</span>
                      {product.selectedCombination.combinations.map(
                        (combination) => {
                          return (
                            <span key={combination.variant}>
                              {combination.parentName}: {combination.variant}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>
                    {product.quantity}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>
                    {formatCurrency(product.selectedCombination.salePrice)}
                  </td>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>
                    {formatCurrency(
                      product.selectedCombination.salePrice * product.quantity
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          backgroundColor: "lightgray",
          display: "flex",
          gap: "1.5rem",
          flexDirection: "column",
          padding: "2rem",
          marginTop: "2rem",
          borderRadius: "1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <span
            style={{
              textTransform: "uppercase",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            payment method
          </span>
          <span style={{ color: "black", fontWeight: "bold" }}>
            {order.method}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <span
            style={{
              textTransform: "uppercase",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            shipping price
          </span>
          <span style={{ color: "black", fontWeight: "bold" }}>
            {formatCurrency(order.shippingPrice)}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <span
            style={{
              textTransform: "uppercase",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            discounted
          </span>
          <span style={{ color: "black", fontWeight: "bold" }}>
            {formatCurrency(order.discountedPrice)}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <span
            style={{
              textTransform: "uppercase",
              color: "gray",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            total amount
          </span>
          <span
            style={{
              color: "darkgreen",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {formatCurrency(
              order.subtotal + order.shippingPrice - order.discountedPrice
            )}
          </span>
        </div>
      </div>
    </main>
  );
}
