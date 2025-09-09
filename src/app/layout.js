import "../../styles/global.css";
import Navbar from "../../components/Navbar";

export const metadata = { title: "Workmate for Today" };

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
