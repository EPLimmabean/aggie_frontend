import React, {useState} from 'react';
import {Card, Col, Container, Row, Form} from "react-bootstrap";
import ExportCSVModal from "../../components/configuration/ExportCSVModal";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getEmailSettings, getFetchStatus, putFetchingStatus} from "../api/configuration";

interface IProps {
}

const Configuration = () => {
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [appEmail, setAppEmail] = useState("");
  const emailSettingsQuery = useQuery({queryKey: ["emailSettings"], queryFn: getEmailSettings});
  if (emailSettingsQuery.isSuccess) { console.log(emailSettingsQuery.data) }

  const fetchStatusQuery = useQuery({queryKey: ["fetchStatus"], queryFn: getFetchStatus});
  if (fetchStatusQuery.isSuccess && fetchStatusQuery.data.fetching) {setFetchStatus(fetchStatusQuery.data.fetching)}} }
  const fetchStatusMutation = useMutation({ mutationKey: ["fetchStatus"], mutationFn: async (fetching: boolean) => {return putFetchingStatus(fetching)} }
  if 

  return (
      <div>
        <Container fluid className={"mt-4"}>
          <Row>
            <Col>
            </Col>
            <Col xs={9}>
              <Container fluid>
                <h3 className="mb-3">Configuration</h3>
                <Card>
                  <Card.Body>
                    <Card.Title>Turn fetching on/off</Card.Title>
                    <Form className={"mb-3"}>
                      { fetchStatusQuery.isSuccess && fetchStatusQuery.data &&
                      <Form.Check
                          type="switch"
                          id="custom-switch"
                          checked={fetchStatus}
                          onChange={() => {fetchStatusMutation.mutate(!fetchStatus)}}
                      />
                      }
                    </Form>
                    <h5>Email Settings</h5>
                    <Form>
                      { emailSettingsQuery.isSuccess && emailSettingsQuery.data &&
                      <Form.Group className={"mb-3"}>
                        <Form.Label>App Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="example@domain.com"
                            value={appEmail}
                        />
                        <Form.Text className="text-muted">
                            This email will send account set-up emails and password reset emails.
                        </Form.Text>
                      </Form.Group>
                      }
                      <Form.Group className={"mb-3"}>
                        <Form.Label>Email Transport Configuration</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="First name"
                            readOnly
                        />
                      </Form.Group>
                    </Form>
                    {/* <Row>
                      <Col>
                        <h5>CSV Export</h5>
                        <ExportCSVModal/>
                      </Col>
                    </Row> */}
                  </Card.Body>
                </Card>
              </Container>
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default Configuration;
