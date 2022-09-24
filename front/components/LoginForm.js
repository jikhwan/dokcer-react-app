import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Button, Form } from 'antd';
import styled from 'styled-components'
import { checkPropTypes } from 'prop-types';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
    margin-top: 10px
`
const FormWrapper = styled(Form)`
    padding: 10px
`

const LoginForm = ({ setIsLoggedIn }) => {
    const { logInLoading, logInError } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')

    useEffect(() => {
        if (logInError) {
          alert(logInError);
        }
      }, [logInError]);

    const onSubmitForm = useCallback(()=>{
        console.log(email, password)
        dispatch(loginRequestAction({email, password}))
    }, [email, password])

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <input name="user-email" 
                       type="email"
                       value={email} 
                       onChange={onChangeEmail} 
                       required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <input name="user-password" 
                       value={password} 
                       onChange={onChangePassword} 
                       required 
                       type="password"/>
            </div>
            <ButtonWrapper style={{marginTop: 10}}>
                <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
                <Link href="/Signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>            
        </FormWrapper>
    );

}


export default LoginForm;