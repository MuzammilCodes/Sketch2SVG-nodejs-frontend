import HomeView from "../HomeView";
import { homeMetadata } from "../../lib/homeMetadata";

export const metadata = homeMetadata("es");

export default function SpanishHomePage() {
  return <HomeView locale="es" />;
}
