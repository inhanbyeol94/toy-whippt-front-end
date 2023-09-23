import React, { useEffect, useState } from "react";
import { useGlobalStore } from "../../stores/global.store";
import { S } from "./detail.style";
import { Button } from "antd";
import {ParticipationModalComponent} from "./Participation.modal.component";
import {ExpulsionModalComponent} from "./Expulsion.modal.component";
import {SendMessageModalComponent} from "./SendMessage.modal.component";
import {InvitationModalComponent} from "./Invitation.modal.component";
import {QuitModalComponent} from "./Quit.modal.component";

export const Detail = () => {
    /* State */
    const [isLoading, setIsLoading] = useState(true);
    const [isParticipationModalVisible, setIsParticipationModalVisible] = useState(false);
    const [isExpulsionModalVisible, setIsExpulsionModalVisible] = useState(false);
    const [isSendMessageModalVisible, setIsSendMessageModalVisible] = useState(false);
    const [isInvitationModalVisible, setIsInvitationModalVisible] = useState(false);
    const [isQuitModalVisible, setIsQuitModalVisible] = useState(false);

    /* Store */
    const { setHeader, setSpin, setModal } = useGlobalStore();

    /* Use Effect */
        useEffect(() => {
        setHeader(true);
        setSpin(false);
    }, []);

        useEffect(() => {
        setIsLoading(false);
    }, []);

    const showModal = (modalType: string) => {
        switch (modalType) {
            case "participation":
                setIsParticipationModalVisible(true);
                break;
            case "expulsion":
                setIsExpulsionModalVisible(true);
                break;
            case "sendMessage":
                setIsSendMessageModalVisible(true);
                break;
            case "invitation":
                setIsInvitationModalVisible(true);
                break;
            case "quit":
                setIsQuitModalVisible(true);
                break;
            default:
                break;
        }
    };

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
                            <Button loading={isLoading} onClick={() => showModal("participation")}>스터디 참가하기</Button>
                            <Button loading={isLoading} onClick={() => showModal("expulsion")}>탈퇴</Button>
                        </S.ButtonBox>
                        </S.Contents>
                        <S.Participant>
                            <div>
                        <S.Personnel>참여 인원</S.Personnel>
                        <S.NumberOfPersonnel>4/10</S.NumberOfPersonnel>
                            </div>
                            <Button loading={isLoading} onClick={() => showModal("invitation")}>유저 초대하기</Button>
                        </S.Participant>
                        <S.PersonnelContainer>
                            <S.PersonnelBox>
                                <S.ImageBox>
                                    <S.Img src="https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMyAg/MDAxNjA0MjI5NDA4NDMy.5zGHwAo_UtaQFX8Hd7zrDi1WiV5KrDsPHcRzu3e6b8Eg.IlkR3QN__c3o7Qe9z5_xYyCyr2vcx7L_W1arNFgwAJwg.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%8C%8C%EC%8A%A4%ED%85%94.jpg?type=w800" alt="profileImg" />
                                </S.ImageBox>
                                <S.User>
                                    <S.NickName onClick={()=> showModal("sendMessage")}>닉네임</S.NickName>
                                    <Button loading={isLoading} onClick={()=> showModal("quit")}>추방</Button>
                                </S.User>
                            </S.PersonnelBox>
                        </S.PersonnelContainer>
                    </S.ContentsContainer>
                </S.DetailContainer>
                <ParticipationModalComponent />
                <ExpulsionModalComponent />
                <SendMessageModalComponent />
                <InvitationModalComponent />
                <QuitModalComponent />
            </S.Content>
        </>
    )
}