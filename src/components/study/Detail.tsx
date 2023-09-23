import React, { useEffect, useState } from "react";
import { useGlobalStore } from "../../stores/global.store";
import { S } from "./detail.style";
import { Avatar, Button, List, Skeleton, Tooltip, Typography } from "antd";
import { ParticipationModalComponent } from "./Participation.modal.component";
import { ExpulsionModalComponent } from "./Expulsion.modal.component";
import { SendMessageModalComponent } from "./SendMessage.modal.component";
import { InvitationModalComponent } from "./Invitation.modal.component";
import { QuitModalComponent } from "./Quit.modal.component";
import { useStudyQueries } from "../../queries/study.query";
import { Link, useParams } from "react-router-dom";
import { IUser } from "../../interfaces/api/results/user.interface";
import { IStudyUser } from "../../interfaces/api/results/study.interface";

export const Detail = () => {
  /* Param */
  const param = useParams();

  /* State */
  const [isLoading, setIsLoading] = useState(true);
  const [hostuserInfo, setHostUserInfo] = useState<IStudyUser | undefined>();

  /* Store */
  const { setHeader, setSpin, userInfo } = useGlobalStore();

  /* Query */
  const { getStudyQuery, getStudyQueryIsLoading } = useStudyQueries(
    undefined,
    param.studyId,
  );

  /* Use Effect */
  useEffect(() => {
    if (!getStudyQuery) return;
    if (getStudyQuery.studyUsers?.length === 0) return;

    const host = getStudyQuery.studyUsers?.filter((info) => info.isHost);

    if (!host) return;

    setHostUserInfo(host[0]);
  }, [getStudyQuery]);

  useEffect(() => {
    setHeader(true);
    setSpin(false);
    setIsLoading(false);
  }, []);

  /* Function */
  const kickUser = (userId: string) => {
    console.log(userId);
  };

  if (getStudyQueryIsLoading) return <>Loading</>;
  if (!hostuserInfo) return <>Loading</>;
  return (
    <>
      <S.Content>
        <S.DetailContainer>
          <S.Title>{getStudyQuery?.title}</S.Title>
          <S.ContentsContainer>
            <S.Contents>
              {getStudyQuery?.content}
              <S.ButtonBox></S.ButtonBox>
            </S.Contents>
            <S.Participant>
              <div>
                <S.Personnel>참여 인원</S.Personnel>
                <S.NumberOfPersonnel>
                  {getStudyQuery?.joinCount}/{getStudyQuery?.maxCount}
                </S.NumberOfPersonnel>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {getStudyQuery!.studyUsers?.filter(
                  (studyUser) => studyUser.user?.id == userInfo.id,
                ).length === 0 ? (
                  <Button>참가</Button>
                ) : userInfo.id !== hostuserInfo.user?.id ? (
                  <Button>탈퇴</Button>
                ) : null}
                {userInfo.id === hostuserInfo.user?.id ? (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button>수정</Button>
                    <Tooltip title="클릭 시, 스터디가 폐쇄됩니다.">
                      <Button>폐쇄</Button>
                    </Tooltip>
                  </div>
                ) : null}
              </div>
            </S.Participant>
            <S.PersonnelContainer>
              <List
                itemLayout="horizontal"
                dataSource={getStudyQuery?.studyUsers}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      hostuserInfo!.user?.id !==
                      userInfo.id ? null : item.isHost ? null : (
                        <Typography.Text
                          type="danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => kickUser(item.user?.id!)}
                        >
                          <u>내보내기</u>
                        </Typography.Text>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.user?.profileImgUrl} />}
                      title={item.user?.name}
                      description={item.isHost ? "방장" : "회원"}
                    />
                  </List.Item>
                )}
              />
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
  );
};
