"use client";

import { ProductType } from "@/app/definations";
import useGetReq from "@/app/hooks/useGetReq";
import LoadingSkeleton from "@/app/loading";
import withAuth from "@/app/utils/PrivateRoutes";
import { notFound, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ChangeEvent, useRef } from "react";
import InvoicePDF from "@/app/ui/orders/InvoicePDF";
import html2pdf from "html2pdf.js";
import formatCurrency from "@/app/utils/formatCurrency";
import { useReactToPrint } from "react-to-print";
import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";

function Page() {
  const { id } = useParams();
  const invoiceRef = useRef<HTMLDivElement>(null!);

  const {
    data: order,
    error,
    loading,
    setData: setOrder,
  } = useGetReq("/order", {
    isAdmin: true,
    id,
  });

  const {
    error: _error,
    execute,
    loading: _loading,
  } = usePostReq("/update-status");

  if (error) {
    toast.error(error || "Something went wrong");
  }

  async function handleDownload() {
    html2pdf()
      .set({
        filename: `${order._id}_${order.address.fname}_${order.address.lname}`,
        image: { type: "jpeg", quality: 1, margin: 1 },
      })
      .from(invoiceRef.current)
      .save();
  }

  async function handleStatus(e: ChangeEvent<HTMLSelectElement>) {
    try {
      const res = await execute({ status: e.target.value, orderId: order._id });

      if (res?.success) {
        return toast.success("Status changed to " + e.target.value);
      }

      return toast.error(res.message || _error || "Something went wrong");
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong");
    }
  }

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return loading ? (
    <LoadingSkeleton />
  ) : order ? (
    <>
      <section className="container">
        <div className="d-flex mt-4 align-items-end justify-content-between gap-4 w-100">
          <h3 className="text-white  w-100">Invoice</h3>
          <div className="ms-auto d-flex flex-column gap-2">
            <label className="text-white" htmlFor="status">
              Update status
            </label>
            <select
              onChange={handleStatus}
              style={{ backgroundColor: "#374151", color: "#fff" }}
              name="status"
              disabled={_loading}
              defaultValue={order.status[order.status.length - 1].name}
              id="status"
              className="form-select"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
        </div>
        <main
          // ref={invoiceRef}
          style={{ backgroundColor: "#1f2937" }}
          className="my-4 rounded p-4"
        >
          <div className="d-flex flex-lg-row flex-column gap-3 align-items-center justify-content-between pb-3 border-bottom border-secondary">
            <div className="d-flex flex-column gap-1">
              <h5 className="text-uppercase text-white fw-bold">invoice</h5>
              <span className="fs-6 text-secondary">
                STATUS <span>{order.status[order.status.length - 1].name}</span>
              </span>
            </div>
            <div className="text-secondary d-flex flex-column align-items-end gap-1">
              <Image
                src="https://www.essentialsbyla.com/logo-withbg.png"
                alt="Logo"
                width={100}
                height={100}
              />
              <span>H-A/2 Kailash Puram Mohili Village</span>
              <span>Opp. Peninsula Hotel Sakinak</span>
              <span>Andheri (east), Mumbai-400972 MH, India</span>
              <span>8689913856</span>
              <span>essentialsbyla@gmail.com</span>
              <span>admin.essentialsbyla.com</span>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between mt-4">
            <div className="d-flex flex-column">
              <span className="fw-bold text-uppercase text-secondary">
                date
              </span>
              <span className="text-secondary">
                {new Date(order.paidAt).toLocaleString()}
              </span>
            </div>
            <div className="d-flex flex-column ">
              <span className="fw-bold text-uppercase text-secondary">
                invoice id
              </span>
              <span className="text-secondary">{order._id}</span>
            </div>
            <div className="d-flex align-items-end flex-column gap-1">
              <span className="fw-bold text-uppercase text-secondary">
                invoice to
              </span>
              <span className="text-secondary">
                {order.address.fname + " " + order.address.lname}
              </span>
              <span className="text-secondary">
                {order.address.email} +91 {order.address.phone}
              </span>
              <span className="text-secondary">
                {order.address.streetAddr1}
              </span>
              {order.address.streetAddr2 && (
                <span className="text-secondary">
                  {order.address.streetAddr2}
                </span>
              )}
              <span className="text-secondary">
                {order.address.city}, {order.address.state},{" "}
                {order.address.zipCode}
              </span>
            </div>
          </div>
          <div className="table-responsive mt-4">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>SR</th>
                  <th>PRODUCT TITLE</th>
                  <th>QUANTITY</th>
                  <th>ITEM PRICE</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product: ProductType, i: number) => {
                  return (
                    <tr key={product._id + i}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span>{product.name}</span>
                          {product.selectedCombination.combinations.map(
                            (combination) => {
                              return (
                                <span key={combination.id}>
                                  {combination.parentName}:{" "}
                                  {combination.variant}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        {formatCurrency(product.selectedCombination.salePrice)}
                      </td>
                      <td>
                        {formatCurrency(
                          product.selectedCombination.salePrice *
                            product.quantity
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            style={{ backgroundColor: "#111827" }}
            className="d-flex gap-4 flex-lg-row flex-column justify-content-between p-4 mt-4 rounded"
          >
            <div className="d-flex flex-column gap-1">
              <span className="text-uppercase text-secondary fw-bold">
                payment method
              </span>
              <span className="text-white fw-bold">{order.method}</span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="text-uppercase text-secondary fw-bold">
                shipping price
              </span>
              <span className="text-white fw-bold">
                {formatCurrency(order.shippingPrice)}
              </span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="text-uppercase text-secondary fw-bold">
                discounted
              </span>
              <span className="text-white fw-bold">
                {formatCurrency(order.discountedPrice)}
              </span>
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="text-uppercase text-secondary fw-bold fs-5">
                total amount
              </span>
              <span className="text-success fw-bold fs-5">
                {formatCurrency(
                  order.subtotal + order.shippingPrice - order.discountedPrice
                )}
              </span>
            </div>
          </div>
        </main>
        <div className="d-flex justify-content-between gap-2 mb-3">
          <button onClick={handleDownload} className="btn btn-success">
            Download invoice &nbsp; <i className="bi bi-cloud-download" />
          </button>
          <button onClick={handlePrint} className="btn btn-success">
            Print invoice &nbsp; <i className="bi bi-printer" />
          </button>
        </div>
      </section>
      <div style={{ display: "none" }}>
        <InvoicePDF order={order} invoiceRef={invoiceRef} />
      </div>
    </>
  ) : (
    notFound()
  );
}

export default withAuth(Page);
