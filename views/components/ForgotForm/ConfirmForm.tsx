import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Form } from "react-bootstrap";
import style from "./forgotform.module.scss";
import { useRouter } from "next/dist/client/router";
import authService from "@services/authService";

const ConfirmForm = (props: any) => {
  const router = useRouter();
  const GUID: any = router.query.GUID;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitForgot = async (e: any) => {
    e.preventDefault();
    // Login...
    setLoading(true);
    const result = await authService.confirmEmail(GUID);
    setLoading(false);
    if (result) {
      result?.message === "Individual"
        ? window.location.replace("https://individual.ezyfind.co.za")
        : window.location.replace("https://buisness.ezyfind.co.za");
    }
  };

  return (
    <Container className={style.loginform}>
      <Row className={style.formheader}>
        <Col xs={12}>
          <h5>Confirm Password</h5>
        </Col>
      </Row>
      <Row className={style.formcontent}>
        <Col xs={12} md={12} className="px-4 py-2">
          <Form onSubmit={handleSubmitForgot}>
            <Row className="d-flex justify-content-between align-items-center">
              <button
                className="btn-ezy btn-ezy-primary btn-ezy-round btn-ezy-wider"
                type="button"
                disabled={loading}
                onClick={handleSubmitForgot}
              >
                Confirm Password
              </button>
              <Link href="/login">
                <span className="text-danger cursor-pointer">
                  Back to Login
                </span>
              </Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmForm;
