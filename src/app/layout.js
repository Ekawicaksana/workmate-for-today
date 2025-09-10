import "../../styles/global.css";
import ClientLayout from "./ClientLayout";

export const metadata = { title: "Workmate for Today" };

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
