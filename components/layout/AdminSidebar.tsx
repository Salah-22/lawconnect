"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItem = [
    {
      name: "Dashboard",
      url: "/user/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "Products",
      url: "/user/products",
      icon: "fas fa-book",
    },
    {
      name: "sales",
      url: "/user/sales",
      icon: "fas fa-dollar-sign",
    },

    {
      name: "Reviews",
      url: "/user/reviews",
      icon: "fas fa-star",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(pathname);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItem.map((menuItem, index) => (
        <Link
          key={index}
          href={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem.includes(menuItem.url) ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem.includes(menuItem.url) ? "true" : "false"
          }
        >
          <i aria-hidden className={`${menuItem.icon} fa-fw pe-2`}></i>{" "}
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
