import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class App extends React.Component {
    render() {
      return (
          <div>
              <Form>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Org-ID</Form.Label>
                      <Form.Control type="email" placeholder="Enter Org-Id" />
                      <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                      </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Hus Nr</Form.Label>
                      <Form.Control type="email" placeholder="Enter husnummer" />
                      <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                      </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
          </div>
      )
    }
}
export default App;
