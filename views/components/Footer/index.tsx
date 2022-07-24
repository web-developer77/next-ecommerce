import React from "react";
import FooterSection from "./Footer";
import Copyright from "./Copyright";

const Footer = (props: any) => {
  return (
    <>
      <FooterSection {...props} />
      <Copyright {...props} />
    </>
  );
};

export default Footer;
