import React from "react";
import { Container } from "react-bootstrap";

const Copyright = (props: any) => {
  const domain = props.domain?.replace('https://', '') || "www.LawyersEzyFind.co.za"
  return (
    <section className="coppyright">
      <Container fluid>
        <div className="copy-content">
          <p className="mb-0">
            {`© 2021 ${domain} All Rights Reserved.
            Registered under Innovation Evolved (Pty) Ltd `}
            <a href={domain}>{domain}</a>{` is not responsible
            for any loss incurred whatsoever by using this services.`}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Copyright;
