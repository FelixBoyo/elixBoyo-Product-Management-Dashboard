import { FaCircle } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { IoBagCheck } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiStoreFill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";


import classes from './NavbarSimple.module.css';
import { AppShell } from '@mantine/core';

const data = [
  { link: '', label: 'Live Orders', icon: IoGrid },
  { link: '', label: 'Order History', icon: IoBagCheck },
  { link: '', label: 'Offers', icon: BiSolidOffer },
  { link: '', label: 'Products', icon: MdOutlineShoppingBag },
  { link: '', label: 'Stock', icon: RiStoreFill },
  { link: '', label: 'Message', icon: MdMessage },
  { link: '', label: 'Settings', icon: IoMdSettings },
];



export function Navbar({ active, setActive }) {

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell.Navbar>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          {links}
        </div>

        <div className={classes.footer}>


          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <span style={{ marginRight: '12px' }}>Busy Mode</span>          <FaCircle size={20} color="black" stroke={1.5} />

          </a>
        </div>
      </nav>
    </AppShell.Navbar>
  );
}

