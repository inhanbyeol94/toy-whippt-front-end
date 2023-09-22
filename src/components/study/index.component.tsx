import React, {useEffect, useState} from "react";
import { S } from './study.style'
import {Button, Form, Input, List, message, Select} from "antd";
import {AiOutlineSearch} from "react-icons/ai";
import { ISearchData } from "../../interfaces/api/requests/searchData.interface";
import {BiSolidMessageRounded} from "react-icons/bi";
import {useGlobalStore} from "../../stores/global.store";
import {StudyModalComponent} from "./Study.modal.component";
import {ModalComponent} from "../utils/Modal.component";

const { Search } = Input;


export const IndexComponent = () => {

    /* Antd Message */
    const [messageApi, contextHolder] = message.useMessage();

    /* Form */
    const [form] = Form.useForm<ISearchData>();

    /* State */
    const [isLoading, setIsLoading] = useState(true);

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

    /* Function */
    const submit = (data: ISearchData) => {
        alert("target");
    };

    const showModal = () => {
        setIsLoading(true);
        setModal(true);
        setIsLoading(false);
    };

    const formRules = [
        {
            required: true,
            whitespace: true,
            message: "검색할 내용을 입력해주세요.",
        },
    ];

    return(
        <>
            <S.Content>
                {contextHolder}
                <S.StudyContainer>
                    <Form form={form} onFinish={submit}>
                        <Form.Item name="searchData" required={true} rules={formRules}>
                            <S.SearchInput
                                size={"large"}
                                placeholder={"스터디 주제를 검색해보세요!"}
                                disabled={isLoading}
                                suffix={
                                    <AiOutlineSearch cursor="pointer"
                                                     onClick={() => form.submit()}
                                    />
                                }
                            />
                        </Form.Item>
                        <S.AddRoomButton
                            loading={isLoading}
                            onClick={showModal}
                        >
                            스터디 방 만들기 {<BiSolidMessageRounded />}
                        </S.AddRoomButton>
                    </Form>
                    <S.ContentsContainer>
                        <S.RoomBox>
                            <S.RoomContents>
                            <S.Title>Node.js 취업준비생 모아요</S.Title>
                            <span>방장이름</span>
                            <span>0/10</span>
                            <S.ButtonBox>
                                <Button loading={isLoading}>Node.js</Button>
                                <Button loading={isLoading}>프로그래밍 언어와 기술</Button>
                            </S.ButtonBox>
                            </S.RoomContents>
                        </S.RoomBox>
                        <S.RoomBox>
                            <S.RoomContents>
                                <S.Title>Node.js 취업준비생 모아요</S.Title>
                                <span>방장이름</span>
                                <span>0/10</span>
                                <S.ButtonBox>
                                    <Button loading={isLoading}>Node.js</Button>
                                    <Button loading={isLoading}>프로그래밍 언어와 기술</Button>
                                </S.ButtonBox>
                            </S.RoomContents>
                        </S.RoomBox>
                        <S.RoomBox>
                            <S.RoomContents>
                                <S.Title>Node.js 취업준비생 모아요</S.Title>
                                <span>방장이름</span>
                                <span>0/10</span>
                                <S.ButtonBox>
                                    <Button loading={isLoading}>Node.js</Button>
                                    <Button loading={isLoading}>프로그래밍 언어와 기술</Button>
                                </S.ButtonBox>
                            </S.RoomContents>
                        </S.RoomBox>
                        <S.RoomBox>
                            <S.RoomContents>
                                <S.Title>Node.js 취업준비생 모아요</S.Title>
                                <span>방장이름</span>
                                <span>0/10</span>
                                <S.ButtonBox>
                                    <Button loading={isLoading}>Node.js</Button>
                                    <Button loading={isLoading}>프로그래밍 언어와 기술</Button>
                                </S.ButtonBox>
                            </S.RoomContents>
                        </S.RoomBox>
                    </S.ContentsContainer>
                </S.StudyContainer>
            </S.Content>
        </>
    )
}