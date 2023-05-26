import { AiFillHome } from 'react-icons/ai';
import { FaTshirt, FaHistory, FaSearch, FaUser } from 'react-icons/fa';
import { MdOutlineHelp } from 'react-icons/md';
import { IoLogOutSharp } from 'react-icons/io5';
import { BsFillCartFill } from 'react-icons/bs'

export const studNav = [
  {
    name: 'Dashboard',
    Icon: AiFillHome,
    route: '/',
  },
  {
    name: 'Request Order',
    Icon: FaTshirt,
    route: 'order',
  },
  {
    name: 'Order History',
    Icon: FaHistory,
    route: 'history',
  },
  {
    name: 'Lost But Found',
    Icon: FaSearch,
    route: 'lostbutfound',
  },
  {
    name: 'Help and Feedback',
    Icon: MdOutlineHelp,
    route: 'help',
  },
  {
    name: 'Profile',
    Icon: FaUser,
    route: 'profile',
  },
];

export const adminNav = [
  {
    name: 'Dashboard',
    Icon: AiFillHome,
    route: '/',
  },
  {
    name: 'Students',
    Icon: FaUser,
    route: 'students',
  },
  {
    name: 'Orders',
    Icon: BsFillCartFill,
    route: 'orders',
  },
  {
    name: 'Lost But Found',
    Icon: FaSearch,
    route: 'lostbutfound',
  },
  {
    name: 'Feedbacks',
    Icon: MdOutlineHelp,
    route: 'feedbacks',
  },
];