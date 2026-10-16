import Link from "next/link";
export function Footer() { return <footer><Link href="/" className="wordmark">ARC</Link><span>Designed for everywhere.</span><span>© {new Date().getFullYear()} ARC</span><a href="#main">Back to the beginning ↑</a></footer>; }
