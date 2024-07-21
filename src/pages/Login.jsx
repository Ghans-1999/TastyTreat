import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";
import { Client, ID, promise, account, databases } from "../lib/appwrite.js";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const setCookie = (name, value, expires) => {
    let cookieString = `${name}=${value};`;
    if (expires) {
      cookieString += `expires=${expires};`;
    }
    console.log(cookieString);
    document.cookie = cookieString;
  };

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const logout = (e) => {
    e.preventDefault();
    const logoutuser = account.deleteSession("current");
    console.log(document.cookie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to authenticate user
    // Set token if authentication is successful
    console.log(`Username: ${username}, Password: ${password}`);
    //console.log(account.get());
    /*if (account.get()) {
      console.log("if");
      navigate("/home", { replace: true });
    } else {*/
    const LoggedIn = account.createEmailPasswordSession(username, password);
    LoggedIn.then(
      function (response) {
        console.log(response); // Success

        const token = response.$id;
        //setCookie("appwrite-session-token", token, response.expire); // expires in 1 hour
        // Redirect to home page
        //console.log(getCookie("appwrite-session-token"));
        navigate("/home", { replace: true });
        account.getSession("current").then(
          (response) => {
            console.log(response); // User information
            const queries = [
              Query.equal("UserId", response.userId),
              Query.equal("IP", response.ip),
            ];
            const fcmToken = databases
              .listDocuments("TastyTreat", "669cfb8f002a4199713a", queries)
              .then((data) => {
                console.log(data.documents); // Array of matching documents
                if (data.documents.length === 0) {
                  const fcmTokenDoc = databases
                    .createDocument(
                      "TastyTreat",
                      "669cfb8f002a4199713a",
                      ID.unique(),
                      {
                        UserId: response.userId,
                        IP: response.ip,
                        FCMtoken:
                          localStorage.getItem("fcmToken") !== null
                            ? localStorage.getItem("fcmToken")
                            : "",
                      },
                    )
                    .then((response) => {
                      console.log(response); // Success
                    });
                }
              })
              .catch((error) => {
                console.error(error);
              });
          },
          (error) => {
            console.log(error);
          },
        );
      },
      function (error) {
        console.log(error); // Failure
      },
    );
    //}
  };

  const [emailValid, setEmailValid] = useState(false);

  return (
    <div style={{ margin: "5%" }}>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">
                <h5>Email</h5>
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                value={username}
                placeholder="with a placeholder"
                type="email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">
                <h5>Password</h5>
              </Label>
              <Input
                id="examplePassword"
                name="password"
                value={password}
                placeholder="password placeholder"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleAddress">Address</Label>
          <Input
            id="exampleAddress"
            name="address"
            placeholder="1234 Main St"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleAddress2">Address 2</Label>
          <Input
            id="exampleAddress2"
            name="address2"
            placeholder="Apartment, studio, or floor"
          />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleCity">City</Label>
              <Input id="exampleCity" name="city" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleState">State</Label>
              <Input id="exampleState" name="state" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleZip">Zip</Label>
              <Input id="exampleZip" name="zip" />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup check>
          <Input id="exampleCheck" name="check" type="checkbox" />
          <Label check for="exampleCheck">
            Check me out
          </Label>
        </FormGroup>
        <button className="add-to-cart" onClick={handleSubmit}>
          Log in
        </button>
        <button className="add-to-cart" onClick={logout}>
          Log Out
        </button>
      </Form>
    </div>
  );
}

export default Login;
