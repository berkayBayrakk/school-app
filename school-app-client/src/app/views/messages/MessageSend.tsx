import { useRouter } from "next/router";
import {
  Message,
  useGetMessagesTwoStudentQuery,
  useGetSendedMessagesToQuery,
  useMessageSendedSubscription,
} from "../../../generated/graphql";
import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChatMsg from "../../../components/chat/ChatMsg";

export interface messageType {
  id: number;
  receiverStudentId: number;
  sendTime: Date;
  senderStudentId: number;
  title: string;
}
export default function MessageSend() {
  ///post/sender?receiver=rId
  const router = useRouter();
  const { id, receiver } = router.query;

  const [messages, setMessages] = useState<messageType[]>([]);

  const { loading, data, error, variables } = useMessageSendedSubscription({
    variables: { receiver: Number(receiver), sender: Number(id) },
    onSubscriptionComplete() {
      setMessages(data?.messageSended);
    },
    PushSubscription:{}
  });
  const args = useGetMessagesTwoStudentQuery({
    variables: { id1: Number(id), id2: Number(receiver) },
    onCompleted(data) {
      setMessages(data.messageTwoStudent);
    },
  });

  useEffect(() => {
    console.log(1);
    setMessages((oldValue) => {
      if (data) {
        oldValue.push(data.messageSended);
      }
      return oldValue;
    });
  }, [data?.messageSended, loading]);
  useEffect(() => {
    if (args.data) {
      setMessages(args.data.messageTwoStudent);
    }
  }, [args.data?.messageTwoStudent]);

  return <div>{ChatMsg(messages, Number(id), Number(receiver))}</div>;
}
