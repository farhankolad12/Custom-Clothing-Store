import Link from "next/link";
import React, { useState } from "react";
import formatCurrency from "../utils/formatCurrency";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function NotificationRow({
  notification,
  setNotifications,
}: {
  notification: any;
  setNotifications: Function;
}) {
  const router = useRouter();

  const { error, execute } = usePostReq("/read-notification");
  const {
    error: _error,
    execute: _execute,
    loading,
  } = usePostReq("/delete-notification");

  async function handleRead() {
    try {
      const res = await execute({ id: notification._id });

      if (!res?.success) {
        return toast.error(res.message || error);
      }

      setNotifications((prev: any) =>
        prev.map((n1: any) =>
          n1._id === notification._id ? { ...n1, isRead: true } : n1
        )
      );
    } catch (err: any) {
      console.log(err);
      return toast.error(err || error);
    }
  }

  async function handleDelete() {
    try {
      const res = await _execute({ id: notification._id });

      if (!res?.success) {
        return toast.error(res.message || _error);
      }

      setNotifications((prev: any) =>
        prev.filter((n1: any) => n1._id !== notification._id)
      );
      return toast.success("Notification deleted!");
    } catch (err: any) {
      console.log(err);
      return toast.error(err || _error);
    }
  }

  return (
    <li>
      <Link
        href={`/order/${notification.orderId}`}
        onClick={!notification.isRead ? () => handleRead() : () => {}}
        className="d-flex text-secondary link-underline link-underline-opacity-0 justify-content-between align-items-center gap-3 btn p-0"
      >
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-person fs-3 text-white" />
          <div className="d-flex flex-column gap-1">
            <strong style={{ fontSize: ".8rem" }}>
              {notification.username}, Placed{" "}
              {formatCurrency(notification.orderTotal)} order!
            </strong>
            <div className="d-flex gap-2 align-items-center">
              <span
                style={{ fontSize: ".8rem" }}
                className="rounded-pill text-white px-2 py-0 bg-danger"
              >
                New Order
              </span>
              <span style={{ fontSize: ".7rem" }}>
                {new Date(notification.createdAt).toDateString()}
              </span>
            </div>
          </div>
          {!notification.isRead && (
            <i
              style={{ fontSize: "3rem" }}
              className="bi bi-dot text-success"
            />
          )}
        </div>
        <button
          disabled={loading}
          onClick={handleDelete}
          style={{ zIndex: "9999" }}
          className="btn p-0"
        >
          {loading ? "..." : <i className="bi bi-trash text-danger" />}
        </button>
      </Link>
    </li>
  );
}
