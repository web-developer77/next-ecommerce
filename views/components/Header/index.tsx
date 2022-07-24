import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

const Header = (props: any) => {
  return (
    <>
      <HeaderTop {...props} />
      <HeaderBottom {...props} />
    </>
  );
};

export { HeaderTop, HeaderBottom };

export default Header;
