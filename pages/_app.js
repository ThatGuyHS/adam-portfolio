import "../styles/globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

// Self-hosted Inter, preloaded, with a size-adjusted fallback so text doesn't
// jump when it arrives. The site never sets italic text, so only the roman
// face ships.
const inter = localFont({
  src: "../fonts/Inter-roman-latin.var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "sans-serif"],
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
