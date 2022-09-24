import 'antd/dist/antd.css';
import React from 'react'
import Head from 'next/head'
import propTypes from 'prop-types';

import wrapper from '../store/configureStore';

const App = ({Component}) => {
    return (
        <>
            <Head>
                <meta charSet='utf8' />
                    <title>NodeBird</title>
            </Head>
        <Component />
        </>
    )
}

App.propTypes ={
    Component: propTypes.elementType.isRequired,
}
export default wrapper.withRedux(App);