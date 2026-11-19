import HomeView from "./HomeView";
import { homeMetadata } from "../../lib/homeMetadata";

export const metadata = homeMetadata("en");

export default function ImageToSvgConverterPage() {
  return <HomeView locale="en" />;
}
