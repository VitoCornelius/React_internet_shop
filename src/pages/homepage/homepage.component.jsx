import React from 'react';

import Directory from "../../components/directory/directory.component";
import {HomePageContainer} from './homepage.styles';

//import './homepage.styles.scss' deprecated, we are using the styled components now ...

const HomePage = () => (
    <HomePageContainer>
        <Directory/>
    </HomePageContainer>
);

export default HomePage;