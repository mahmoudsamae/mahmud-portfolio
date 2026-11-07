import { Inter, Instrument_Sans, Space_Grotesk } from "next/font/google";

// Only used for a few buttons: not preloaded, so it does not compete with the hero image.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const fontVariables = `${inter.variable} ${space.variable} ${instrument.variable}`;
