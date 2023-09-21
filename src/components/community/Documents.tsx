
import React, {useEffect, useState} from "react";
import { Button } from "antd";
import { S } from './documents.style'
import {PiPencilLineFill} from "react-icons/pi";

export const Documents = () => {

    /* State */
    const [isLoading, setIsLoading] = useState(true);

    /* Use Effect */
    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <S.Content>
                <S.DocumentsContainer>
                    <S.Title>도와주셈 헬프</S.Title>
                    <S.DocumentBody></S.DocumentBody>
                    <S.CommentContainer>
                        <S.CommentTop>
                        <S.Comment>댓글</S.Comment>
                            <Button
                                loading={isLoading}
                            >
                                댓글 작성하기 <PiPencilLineFill />
                            </Button>
                        </S.CommentTop>
                        <S.CommentBox>
                        <S.UserBox>
                            <S.ImageBox>

                            </S.ImageBox>
                            <span>닉네임</span>
                        </S.UserBox>
                            <S.TextArea></S.TextArea>
                        </S.CommentBox>
                    </S.CommentContainer>
                </S.DocumentsContainer>
            </S.Content>
        </>
    )
}