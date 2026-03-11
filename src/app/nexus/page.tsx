import { permanentRedirect } from "next/navigation";

export default function NexusLegacyRedirectPage() {
  permanentRedirect("/NexusHealthKit");
}
