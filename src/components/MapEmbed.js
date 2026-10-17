import { business } from "@/content/site";
import styles from "./MapEmbed.module.css";

// Native lazy loading keeps the Google Maps iframe off the critical path until it nears the viewport.
export default function MapEmbed({ className = "" }) {
  return (
    <div className={`${styles.map} ${className}`}>
      <iframe
        src={business.mapsEmbed}
        title={`Map showing ${business.name}, ${business.address.street}, Ubud`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
