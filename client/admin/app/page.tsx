"use client";

import useGetReq from "./hooks/useGetReq";
import LoadingSkeleton from "./loading";
import OrderRow from "./ui/orders/OrderRow";
import withAuth from "./utils/PrivateRoutes";
import formatCurrency from "./utils/formatCurrency";

function Page() {
  const { data, loading } = useGetReq("/dashboard", {
    isAdmin: true,
  });

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <main className="px-5">
      <h1 className="text-white fs-5 mt-4">Dashboard Overview</h1>
      <div className="text-white d-flex justify-content-center align-items-center flex-wrap gap-2 my-4">
        <div
          style={{ backgroundColor: "#0d9488" }}
          className="py-4 px-3 d-flex flex-column gap-1 justify-content-center align-items-center rounded"
        >
          <i className="bi bi-layers fs-4" />
          <span>Today Orders</span>
          <strong className="fs-3">
            {formatCurrency(data.todayOrders.totalTodayOrdersVal)}
          </strong>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Card</span>
              <span>
                {formatCurrency(data.todayOrders.totalTodayOrdersCardVal)}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>UPI</span>
              <span>
                {formatCurrency(data.todayOrders.totalTodayOrdersUpiVal)}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Netbanking</span>
              <span>
                {formatCurrency(data.todayOrders.totalTodayOrdersNetVal)}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Wallets</span>
              <span>
                {formatCurrency(data.todayOrders.totalTodayOrdersWalletVal)}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#3b82f6" }}
          className="py-4 px-3 d-flex flex-column gap-1 justify-content-center align-items-center rounded"
        >
          <i className="bi bi-layers fs-4" />
          <span>This Month Orders</span>
          <strong className="fs-3">
            {formatCurrency(data.thisMonthOrders.totalThisMonthOrdersVal)}
          </strong>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Card</span>
              <span>
                {formatCurrency(
                  data.thisMonthOrders.totalThisMonthOrdersCardVal
                )}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>UPI</span>
              <span>
                {formatCurrency(
                  data.thisMonthOrders.totalThisMonthOrdersUpiVal
                )}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Netbanking</span>
              <span>
                {formatCurrency(
                  data.thisMonthOrders.totalThisMonthOrdersNetVal
                )}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Wallets</span>
              <span>
                {formatCurrency(
                  data.thisMonthOrders.totalThisMonthOrdersWalletVal
                )}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#0891b2" }}
          className="py-4 px-3 d-flex flex-column gap-1 justify-content-center align-items-center rounded"
        >
          <i className="bi bi-credit-card fs-4" />
          <span>Last Month Orders</span>
          <strong className="fs-3">
            {formatCurrency(data.lastMonthOrders.totalLastMonthOrdersVal)}
          </strong>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Card</span>
              <span>
                {formatCurrency(
                  data.lastMonthOrders.totalLastMonthOrdersCardVal
                )}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>UPI</span>
              <span>
                {formatCurrency(
                  data.lastMonthOrders.totalLastMonthOrdersUpiVal
                )}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Netbanking</span>
              <span>
                {formatCurrency(
                  data.lastMonthOrders.totalLastMonthOrdersNetVal
                )}
              </span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Wallets</span>
              <span>
                {formatCurrency(
                  data.lastMonthOrders.totalLastMonthOrdersWalletVal
                )}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#059669" }}
          className="py-4 px-3 d-flex flex-column gap-1 justify-content-center align-items-center rounded"
        >
          <i className="bi bi-credit-card fs-4" />
          <span>All-Time Sales</span>
          <strong className="fs-3">
            {formatCurrency(data.allTime.allTimeTotal)}
          </strong>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Card</span>
              <span>{formatCurrency(data.allTime.allTimeCardTotal)}</span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>UPI</span>
              <span>{formatCurrency(data.allTime.allTimeUpiTotal)}</span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Netbanking</span>
              <span>{formatCurrency(data.allTime.allTimeNetTotal)}</span>
            </div>
            <div className="d-flex flex-column justify-center align-items-center">
              <span>Wallets</span>
              <span>{formatCurrency(data.allTime.allTimeWalletTotal)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white d-flex justify-content-center align-items-center flex-wrap gap-2 my-4 ">
        <div
          className="d-flex gap-3 align-items-center p-3 rounded"
          style={{ backgroundColor: "#1f2937", width: "17.1rem" }}
        >
          <div
            className="d-flex justify-content-center align-items-center bg-success rounded-circle"
            style={{ width: "50px", height: "50px" }}
          >
            <i className="bi bi-cart" />
          </div>
          <div className="d-flex flex-column">
            <span>Total Order</span>
            <span className="fs-4 fw-bold">
              {data.ordersDetail.totalOrders}
            </span>
          </div>
        </div>
        <div
          className="d-flex gap-3 align-items-center p-3 rounded"
          style={{ backgroundColor: "#1f2937", width: "17.1rem" }}
        >
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#3b82f6",
            }}
          >
            <i className="bi bi-arrow-repeat" />
          </div>
          <div className="d-flex flex-column">
            <span>Orders Pending</span>
            <span className="fs-4 fw-bold">
              {data.ordersDetail.pendingOrders.toString()}
            </span>
          </div>
        </div>
        <div
          className="d-flex gap-3 align-items-center p-3 rounded"
          style={{ backgroundColor: "#1f2937", width: "17.1rem" }}
        >
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#14b8a6",
            }}
          >
            <i className="bi bi-journal-bookmark" />
          </div>
          <div className="d-flex flex-column">
            <span>Orders Processing</span>
            <span className="fs-4 fw-bold">
              {data.ordersDetail.processingOrders.toString()}
            </span>
          </div>
        </div>
        <div
          className="d-flex gap-3 align-items-center p-3 rounded"
          style={{ backgroundColor: "#1f2937", width: "17.1rem" }}
        >
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#fb923c",
            }}
          >
            <i className="bi bi-truck" />
          </div>
          <div className="d-flex flex-column">
            <span>Orders Shipped</span>
            <span className="fs-4 fw-bold">
              {data.ordersDetail.shippedOrders.toString()}
            </span>
          </div>
        </div>
        <div
          className="d-flex gap-3 align-items-center p-3 rounded"
          style={{ backgroundColor: "#1f2937", width: "17.1rem" }}
        >
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#10b981",
            }}
          >
            <i className="bi bi-check-lg" />
          </div>
          <div className="d-flex flex-column">
            <span>Orders Delivered</span>
            <span className="fs-4 fw-bold">
              {data.ordersDetail.deliveryOrders.toString()}
            </span>
          </div>
        </div>
      </div>
      <div className="my-4">
        <h1 className="text-white fs-5">Recent Orders</h1>
        <div className="table-responsive mt-4">
          <table
            style={{ backgroundColor: "#1f2937" }}
            className="table border border-secondary table-dark"
          >
            <thead>
              <tr>
                <th className="text-secondary">ID</th>
                <th className="text-secondary">TIME</th>
                <th className="text-secondary">CUSTOMER NAME</th>
                <th className="text-secondary">METHOD</th>
                <th className="text-secondary">AMOUNT</th>
                <th className="text-secondary">STATUS</th>
                <th className="text-secondary">INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                data?.recentOrders?.map((order: any) => {
                  return <OrderRow key={order._id} order={order} />;
                }) || (
                  <tr>
                    <td>No Data Found!</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);
