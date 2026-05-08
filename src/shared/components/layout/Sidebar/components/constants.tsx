import {
  LayoutDashboard,
  Package,
  PackageCheck,
  Handshake,
  Route,
  Users,
  MapPin,
} from "lucide-react";

export const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { key: "cargos", href: "/dispatcher/cargo", icon: <Package size={18} /> },
  { key: "myCargos", href: "/my-cargos", icon: <PackageCheck size={18} /> },
  { key: "offers", href: "/offers", icon: <Handshake size={18} /> },
  { key: "trips", href: "/trips", icon: <Route size={18} /> },
  {
    key: "driverManagers",
    href: "/driver-managers",
    icon: <Users size={18} />,
  },
  { key: "gpsTracking", href: "/gps-tracking", icon: <MapPin size={18} /> },
];

export const LANGUAGES = [
  { code: "uz", label: "Uz", flag: "UZ" },
  { code: "ru", label: "Ru", flag: "RU" },
  { code: "en", label: "En", flag: "GB" },
];
