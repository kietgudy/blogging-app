import { Button } from 'components/button';
import React from 'react';
import styled from 'styled-components'

const HomeBannerStyles = styled.div`
min-height: 520px;
padding: 40px 0;
background-image: linear-gradient( to right bottom, ${props => props.theme.primary}, ${props => props.theme.secondary});
.banner {
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.banner-content {
    max-width: 500px;
    color: white;
}
.banner-heading {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 20px;
}
.banner-desc {
    line-height: 1.8;
    margin-bottom: 40px;
}
`;

const HomeBanner = () => {
    return (
        <HomeBannerStyles>
            <div className="container">
                <div className="banner">
                    <div className="banner-content">
                        <h1 className="banner-heading">Monkey Blogging</h1>
                        <p className="banner-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perspiciatis non odit assumenda sequi vitae repellendus obcaecati mollitia, perferendis dolores atque nostrum sapiente fugiat totam temporibus nesciunt unde expedita quaerat?</p>
                        <Button to='/sign-up' kind='secondary'>Get started</Button>
                    </div>
                    <div className="banner-image">
                        <img src="./img-banner.png" alt="" />
                    </div>
                </div>
            </div>
        </HomeBannerStyles>
    );
};

export default HomeBanner;