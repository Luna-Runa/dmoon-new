import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import setHeaderToken from '../../middleware/setHeaderToken';

const LogInModal = ({ show, onHide }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);
  const [falseAlert, setFalseAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (saveAlert === true) {
      setTimeout(() => {
        setSaveAlert(false);
        onHide(true);
      }, 1000);
    }

    if (falseAlert === true) {
      setTimeout(() => {
        setFalseAlert(false);
      }, 2000);
    }
    return () => {
      mounted = false;
    };
  }, [saveAlert, falseAlert]);

  useEffect(() => {
    setId('');
    setPassword('');
    return () => {};
  }, [show]);

  const loginEvent = async (id, password) => {
    try {
      const res = await axios.post('users/login', { id, password });
      dispatch({ type: 'SET_TOKEN', token: res.data.token });
      setHeaderToken(res.data.token);
      setSaveAlert(true);
    } catch (err) {
      console.log('Login Err ', err);
      setFalseAlert(true);
      setPassword('');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="email" placeholder="Enter id" value={id} onChange={e => setId(e.currentTarget.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 my-3">
            <Button variant="info" type="button" onClick={() => loginEvent(id, password)}>
              로그인
            </Button>
          </div>
        </Form>
        <Alert show={saveAlert} variant="success">
          로그인에 성공했습니다!
        </Alert>

        <Alert show={falseAlert} variant="danger">
          입력 내용을 다시 한번 확인해주세요!
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default LogInModal;
