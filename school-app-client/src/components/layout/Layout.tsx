import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar></Navbar>
      <div >{children}</div>
    </div>
  );
}
