import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="stubwrap">
          <div className="wrap stub">
            <span className="stubtag">404</span>
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link className="lk" href="/en">Back to home <span className="ar">{"→"}</span></Link>
          </div>
        </main>
      </body>
    </html>
  );
}
