import Link from "next/link";
import { nav } from "@/content/site";
import s from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`section ${s.notFound}`} aria-labelledby="nf-title">
      <div className="wrap">
        <h1 id="nf-title">This page can’t be found.</h1>
        <p className="lead">It may have moved, or the address may be mistyped. These pages are a good place to continue:</p>
        <ul className={s.links}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
