import React from "react";
import styled from "styled-components";

class Unsupported extends React.Component{
    render(){
        return(
            <_Unsupported>
                <figure><img src="/img/unsupported/logo.png" alt="@"/></figure>
                <h1>SOUGEISAI 2021 "@"</h1>
                <div className="period"><span>Day1</span> 9/18<span>sat</span>&nbsp;&nbsp;<span>Day2</span> 9/19<span>sun</span></div>
                <div className="unsupported">
                    あなたのブラウザも<br className="sp_only"/>対応したかった。<br/>
                    <span>当サイトはGoogleChrome，<br className="sp_only"/>Firefox等のモダンブラウザでの<br className="sp_only"/>使用しか想定できませんでした。</span>
                </div>
                <a rel="noreferrer" target="_blank" href="https://www.scu.ac.jp/"><img src="/img/unsupported/toScu.png" alt="大学ホームページへ"/></a>
            </_Unsupported>
        );
    }
}

export default Unsupported;

const _Unsupported = styled.div`
    overflow-y: hidden;
    background-image: url("/img/unsupported/back.png");
    background-position: center;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr 100px 40px 2rem 2rem 3.5rem 100px 1fr;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    font-family: 'Silom', 
        "Helvetica Neue",
        Arial,
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        Meiryo,
        sans-serif;
    @media screen and (max-width: 750px){
        grid-template-rows: 1fr 100px 40px 2rem 2rem 8rem 100px 1fr;
    }
    .sp_only{
        @media screen and (min-width: 751px){
            display: none;
        }
    }
    figure{
        grid-row: 2/3;
        margin: 0;
        text-align: center;
        height: 100%;
        img{
            height: 100%;
        }
    }
    h1{
        grid-row: 4/5;
        margin: 0;
        text-align: center;
        color: rgb(255,166,45);
        text-shadow: rgb(0,75,128) 3px 3px;
    }
    .period{
        grid-row: 5/6;
        text-align: center;
        background: rgb(255,166,45);
        font-size: 150%;
        span{
            font-size: 60%;
        }
    }
    .unsupported{
        grid-row: 6/7;
        text-align: center;
        width: 100%;
        background: rgb(255,166,45);
        font-size: 150%;
        font-family: 'Noto-sans';
        font-weight: 700;
        span{
            font-size: 75%;
        }
    }
    a{
        grid-row: 7/8;
        display: block;
        height: 100%;
        text-align: center;
        img{
            height: 100%;
        }
    }
`;