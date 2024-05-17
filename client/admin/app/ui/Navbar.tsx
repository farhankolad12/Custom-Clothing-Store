"use client";

import { useState } from "react";
import SideNav from "./SideNav";
import { useAuth } from "../context/AuthProvider";
import useGetReq from "../hooks/useGetReq";
import formatCurrency from "../utils/formatCurrency";
import Link from "next/link";
import NotificationRow from "./NotificationRow";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  const { currentUser } = useAuth();

  const {
    data: notifications,
    loading,
    setData: setNotifications,
  } = useGetReq("/notifications", {
    isAdmin: true,
  });

  return (
    <>
      <nav style={{ backgroundColor: "#1f2937" }}>
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center py-3 text-success">
          {currentUser && (
            <button
              onClick={() => setOpenNav((prev) => !prev)}
              type="button"
              className="btn p-0"
            >
              <i className="bi bi-list text-success fw-bold fs-5" />
            </button>
          )}
          <div className="d-flex gap-3 align-items-center">
            <button
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="btn p-0 position-relative "
            >
              <i className="bi bi-bell text-success fw-bold fs-5" />
              {notifications ? (
                <span
                  className="position-absolute rounded-circle d-flex justify-content-center align-items-center bg-danger text-white start-0 top-0"
                  style={{ width: "16px", height: "16px", fontSize: ".7rem" }}
                >
                  {notifications?.reduce((total: number, prev: any) => {
                    return !prev.isRead ? total + 1 : total + 0;
                  }, 0)}
                </span>
              ) : (
                ""
              )}
            </button>

            {loading ? (
              ""
            ) : (
              <ul
                className="dropdown-menu p-3 text-secondary"
                style={{ backgroundColor: "#1f2937" }}
              >
                <div className="d-flex flex-column gap-3">
                  {notifications?.length ? (
                    notifications.map((notification: any) => {
                      return (
                        <NotificationRow
                          key={notification._id}
                          setNotifications={setNotifications}
                          notification={notification}
                        />
                      );
                    })
                  ) : (
                    <li>No new Notification</li>
                  )}
                </div>
              </ul>
            )}
            <i className="bi bi-person text-success fw-bold fs-5" />
          </div>
        </div>
      </nav>
      {openNav && <SideNav setOpenNav={setOpenNav} />}
    </>
  );
}
