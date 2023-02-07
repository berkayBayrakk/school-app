import {
  Grid,
  ListItem,
  ListItemText,
  List,
  Slide,
  TextField,
  Button,
} from "@mui/material";
import { display } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { messageType } from "../../app/views/messages/MessageSend";
import {
  GetMessagesTwoStudentDocument,
  MessageSendedDocument,
  SendMessageInput,
  useSendMessageMutation,
} from "../../generated/graphql";
import { dateGenerator } from "../../helpers/dateHelper";
import TextFieldController from "../controllers/TextField";

export default function ChatMsg(
  dataType: messageType[],
  senderId: number,
  receiverId: number
) {
  const [message, setMessage] = useState<string>("");

  const [sendMessageMutation, { data, loading, error }] =
    useSendMessageMutation({
      refetchQueries: [
        {
          query: GetMessagesTwoStudentDocument,
          variables: { id1: senderId, id2: receiverId },
        },
      ],
    });
  const onClickButton = (data: SendMessageInput) => {
    sendMessageMutation({ variables: { data } });
  };
  return (
    <>
      <List>
        {dataType.map((message, index) => {
          return (
            <ListItem
              key={index}
              style={{
                left: message.senderStudentId === senderId ? "30%" : "50%",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={`${message.title}`}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    secondary={dateGenerator(new Date(message.sendTime))}
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
        <div style={{ display: "flex", alignContent: "center" }}>
          <TextField
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() =>
              onClickButton({
                title: message,
                senderStudentId: senderId,
                receiverStudentId: receiverId,
              })
            }
          >
            Send
          </Button>
        </div>
      </List>
    </>
  );
}
