import React, { useEffect, useState } from "react";
import { useGlobalStore } from "../../stores/global.store";
import { S } from "./detail.style";
import { Button } from "antd";

export const Detail = () => {
    /* State */
    const [isLoading, setIsLoading] = useState(true);

    /* Store */
    const { setHeader, setSpin } = useGlobalStore();

    /* Use Effect */
        useEffect(() => {
        setHeader(true);
        setSpin(false);
    }, []);

        useEffect(() => {
        setIsLoading(false);
    }, []);

    return(
        <>
            <S.Content>
                <S.DetailContainer>
                <S.Title>항해 15기 스터디 하실 분!</S.Title>
                    <S.ContentsContainer>
                        <S.Contents>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Aliquid beatae delectus doloribus ducimus est, eveniet explicabo inventore magnam maiores molestiae odit quia quidem,
                        quisquam quod reiciendis reprehenderit sint tempora totam.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Accusamus accusantium ad impedit incidunt molestiae nihil quibusdam quis!
                        Beatae cupiditate dolores ea eos esse explicabo illum natus nihil numquam unde, ut?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ad ex excepturi fuga illum ipsam magni maxime natus nemo non officia porro quod ratione, reprehenderit sed sunt totam veritatis, vitae, voluptatum!
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab atque aut blanditiis cum, debitis delectus eum iusto minima modi nobis obcaecati possimus sequi temporibus velit voluptatum!
                        Nam ullam vitae voluptas?
                        <S.ButtonBox>
                            <Button loading={isLoading}>스터디 참가하기</Button>
                            <Button loading={isLoading}>탈퇴</Button>
                        </S.ButtonBox>
                        </S.Contents>
                        <S.Participant>
                            <div>
                        <S.Personnel>참여 인원</S.Personnel>
                        <S.NumberOfPersonnel>4/10</S.NumberOfPersonnel>
                            </div>
                            <Button loading={isLoading}>유저 초대하기</Button>
                        </S.Participant>
                        <S.PersonnelContainer>
                            <S.PersonnelBox>
                                <S.ImageBox></S.ImageBox>
                                <S.User>
                                <S.NickName>닉네임</S.NickName>
                                <Button loading={isLoading}>추방</Button>
                                </S.User>
                            </S.PersonnelBox>
                        </S.PersonnelContainer>
                    </S.ContentsContainer>
                </S.DetailContainer>
            </S.Content>
        </>
    )
}