import { ProductType } from "@/app/definations";
import UserCartRow from "./UserCartRow";
import formatCurrency from "@/app/utils/formatCurrency";
import usePostReq from "@/app/hooks/usePostReq";
import { toast } from "react-toastify";

export default function UserCart({ cart }: { cart: any }) {
  const { execute, loading } = usePostReq("/send-email-cart");

  async function handleEmail() {
    try {
      const res = await execute({
        email: cart.email,
        fname: cart.fname,
        lname: cart.lname,
        products: cart.products,
        totalPrice: cart.shippingPrice + cart.subTotalPrice,
      });

      if (!res.success) {
        return toast.error(res.message || "Something went wrong");
      }

      return toast.success("Email Send");
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div>
      <button
        type="button"
        key={cart._id}
        className="btn btn-dark w-100 text-white d-flex justify-content-between p-4"
        data-bs-toggle="collapse"
        data-bs-target={`#${cart._id}`}
        aria-expanded="false"
        aria-controls={`#${cart._id}`}
      >
        <div className="d-flex flex-wrap align-items-end gap-3">
          <span className="fs-5">
            {cart.fname} {cart.lname}
          </span>{" "}
          <span className="fs-6">({cart.phone})</span>
          <span className="fs-6">({cart.email})</span>
          <button
            disabled={loading}
            type="button"
            onClick={handleEmail}
            className="btn btn-outline-light"
          >
            {loading ? "..." : "Send Email"}
          </button>
        </div>
        <i className="bi bi-chevron-down" />
      </button>
      <div className="collapse bg-dark text-white p-4" id={`${cart._id}`}>
        <div className="table-responsive">
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
              {cart.products.map((product: ProductType, i: number) => {
                return (
                  <UserCartRow key={product._id} product={product} i={i} />
                );
              })}
            </tbody>
          </table>
          <div className="d-flex flex-column h-100 w-100 align-items-end gap-3">
            <div className="d-flex justify-content-between gap-4">
              <strong>Shipping Price:</strong>
              <strong>
                {cart.shippingPrice === 0 && (
                  <span className="text-uppercase px-3 fs-6 py-1 bg-black text-white rounded">
                    free
                  </span>
                )}
                &nbsp;
                {formatCurrency(cart.shippingPrice)}
              </strong>
            </div>
            <div className="d-flex justify-content-between gap-4">
              <strong>Sub Total:</strong>
              <strong>{formatCurrency(cart.subTotalPrice)}</strong>
            </div>
            <div className="d-flex justify-content-between gap-4">
              <strong>Total Price:</strong>
              <strong>
                {formatCurrency(cart.shippingPrice + cart.subTotalPrice)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
