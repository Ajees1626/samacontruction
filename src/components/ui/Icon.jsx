import {
  Award, BadgeCheck, Building2, Circle, ClipboardCheck, ClipboardList, Cog, Compass, DraftingCompass, Eye, Factory, FileText,
  Gauge, GraduationCap, HardHat, Hotel, House, Landmark, Layers, Leaf, MessageSquare, Package, Route, ShieldCheck, Truck, Users, Warehouse,
} from 'lucide-react'

/* Icons referenced by name from data files. Add new names here when data uses them. */
const ICONS = {
  Award, BadgeCheck, Building2, ClipboardCheck, ClipboardList, Cog, Compass, DraftingCompass, Eye, Factory, FileText,
  Gauge, GraduationCap, HardHat, Hotel, House, Landmark, Layers, Leaf, MessageSquare, Package, Route, ShieldCheck, Truck, Users, Warehouse,
}

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Circle
  return <Cmp aria-hidden="true" strokeWidth={1.6} {...props} />
}
