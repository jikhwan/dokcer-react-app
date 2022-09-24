import React, { useCallback, useState, useMemo } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col, Button, Form } from 'antd';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
    const { me } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        })
    })

    return (
        <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}}>
            <Input.Search 
              value={nickname}
              onChange={onChangeNickname}
              addonBefore="닉네임" 
              enterButton="수정"
              onSearch={onSubmit} />
        </Form>
    );

}

export default NicknameEditForm;