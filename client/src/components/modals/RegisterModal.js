import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterModal = ({ show, onHide }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveAlert, setSaveAlert] = useState(false);
  const [falseAlert, setFalseAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    let timer;
    if (saveAlert === true) {
      timer = setTimeout(() => {
        setSaveAlert(false);
        onHide(true);
      }, 1000);
    }

    if (falseAlert === true) {
      timer = setTimeout(() => {
        setFalseAlert(false);
      }, 2000);
    }
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [saveAlert, falseAlert]);

  useEffect(() => {
    setId('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    return () => {};
  }, [show]);

  const registerEvent = async (id, name, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setAlertMessage('비밀번호가 서로 일치하지 않습니다.');
      setFalseAlert(true);
      setPassword('');
      setConfirmPassword('');
    } else {
      try {
        const res = await axios.post('users/register', { id, name, password });
        setAlertMessage('회원가입에 성공했습니다!');
        setSaveAlert(true);
      } catch (err) {
        const message = err.response.data.message; // 서버에서 받은 에러 메시지
        setAlertMessage(message);
        setFalseAlert(true);
        setPassword('');
        setConfirmPassword('');
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>아이디</Form.Label>
            <Form.Control value={id} placeholder="Enter id" onChange={e => setId(e.currentTarget.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              value={name}
              type="email"
              placeholder="Enter name"
              onChange={e => setName(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="passwordConfirm">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
              onChange={e => setConfirmPassword(e.currentTarget.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 my-3">
            <Button variant="info" type="button" onClick={() => registerEvent(id, name, password, confirmPassword)}>
              회원가입
            </Button>
          </div>
        </Form>

        <Alert show={saveAlert} variant="success">
          {alertMessage}
        </Alert>

        <Alert show={falseAlert} variant="danger">
          {alertMessage}
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
