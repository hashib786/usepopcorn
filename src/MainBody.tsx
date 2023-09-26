import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainBody = ({ children }: Props) => {
  return <main className="main">{children}</main>;
};

export default MainBody;
