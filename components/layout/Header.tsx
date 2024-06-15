"use client";

import { setIsAuthenticated, setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState, MouseEvent } from "react";
import { Button, CardContent, Menu, MenuItem, Skeleton } from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [collapseMenu, setCollapseMenu] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setCollapseMenu(!collapseMenu);
    document.body.classList.toggle("menu-open", !collapseMenu);
  };

  const navItems = [
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Company", url: "/company" },
    { id: 3, text: "Resources", url: "/resources" },
    { id: 4, text: "About", url: "/about" },
    { id: 5, text: "Contact", url: "/contact" },
  ];

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data, status } = useSession();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data, dispatch]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <header className="flex shadow-md px-4 sm:px-10 bg-[var(--primary-color)] font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <a href="/" className="w-24 p-2">
          <img src="/images/logo.png" alt="logo" className="w-full" />
        </a>

        <div
          id="collapseMenu"
          className={`${
            collapseMenu ? "block" : "hidden"
          } lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          <button
            id="toggleClose"
            onClick={toggleMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="/">
                <img src="/images/logo.png" alt="logo" className="w-36" />
              </a>
            </li>
            {navItems.map((item) => (
              <li
                key={item.id}
                className="max-lg:border-b border-white max-lg:py-3 px-3"
              >
                <Link
                  className="text-white hover:text-orange-600 block font-semibold text-[15px]"
                  href={item.url}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex max-lg:ml-auto space-x-3">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle flex items-center md:gap-1"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-na">
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt="John Doe"
                    className="placeholder-glow rounded-full w-20 h-20"
                  />
                </figure>
                <span className="placeholder-glow ps-1 max-md:hidden">
                  {" "}
                  {user?.name}
                </span>
              </button>

              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <Link href="/user/dashboard" className="dropdown-item">
                  My Products
                </Link>

                <Link href="/purchases/me" className="dropdown-item">
                  my purchases
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              {status === "loading" && (
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={48}
                    height={48}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ width: 120, ml: 1 }}
                  />
                </CardContent>
              )}
              {status !== "loading" && (
                <div className="flex gap-1">
                  <Link
                    className="bg-[var(--primary-color)] hover:bg-orange-600 transition-all text-white font-bold text-sm rounded-full px-4 py-2"
                    href="/login"
                  >
                    Login <span aria-hidden="true">&rarr;</span>
                  </Link>

                  <Link
                    className="bg-orange-600 hover:bg-orange-700 transition-all text-white font-bold text-sm rounded-full px-4 py-2 hidden md:block"
                    href="/register"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </>
          )}

          <button id="toggleOpen" onClick={toggleMenu} className="lg:hidden">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zM3 9h14a1 1 0 010 2H3a1 1 0 010-2zM3 13h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
