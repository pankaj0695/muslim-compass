import "./globals.css";
import NavBar from "./components/navbar/navBar";
import { EventProvider } from "./context/eventContext";
import { UserProvider } from "./context/userContext";
import Footer from "./components/footer/footer";

export const metadata = {
  title: "Muslim Compass",
  description:
    "Connecting you with events, opportunities, and resources in your local Muslim community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-black">
        <UserProvider>
          <EventProvider>
            <NavBar />
            {children}

            <Footer />
          </EventProvider>
        </UserProvider>
      </body>
    </html>
  );
}
