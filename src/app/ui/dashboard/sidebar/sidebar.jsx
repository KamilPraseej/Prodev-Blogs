import React from "react";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
} from "react-icons/md";
const menuItems = [
  {
    title: "Pages",
    list: [
     
      {
        title: "Dashboard",
        path: "/admin/dashboard/blogs",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "All Users",
        path: "/admin/dashboard/allUsers",
        icon: <MdShoppingBag />,
      },

      {
        title: "Create Blogs",
        path: "/admin/dashboard/blogs/addBlogs",
        icon: <MdAttachMoney />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image src="/download.png" alt="img" width="50" height="50" />
      </div>
      <div className={styles.userDetail}>
        <span className={styles.userName}>jalagam vinodh</span>
        <span className={styles.title}>devloper</span>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}></span>
            {cat.list.map((items) => (
              <MenuLink items={items} key={items.title}></MenuLink>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
