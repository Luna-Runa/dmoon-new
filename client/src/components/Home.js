import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import 'moment/locale/ko.js';

const Home = () => {
  const reducer = useSelector(state => state);
  console.log(reducer);

  return (
    <>
      <div>test {reducer.jwt.token}</div>
    </>
  );
};

export default Home;
