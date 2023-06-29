import React, { useContext, useState } from 'react';
import { Container, Form } from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {login, registration} from "../http/userAPI";

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      // let data;
      if (isLogin) {
        const res = await login();
        // data = await login(email, password);
      } else {
        const res = await registration();
        // data = await registration(email, password);
        console.log(res)
      }
      // user.setUser(user)
      // user.setIsAuth(true)
      // navigate(SHOP_ROUTE)
    } catch (e) {
      console.log(e)
      // alert(e.response.data.message)
    }

  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Authorization' : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter Email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter Password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Button
              variant={"outline-success"}
              onClick={click}
              >
              {isLogin ? 'Log In' : 'Register'}
            </Button>
              {isLogin ? (
                <div>
                  No account? <Link to={REGISTRATION_ROUTE}>Register!</Link>
                </div>
              ) : (
                <div>
                  Already have account? <Link to={LOGIN_ROUTE}>Log In!</Link>
                </div>
              )}
          </Row>
        </Form>

      </Card>

    </Container>
  )
})

export default Auth