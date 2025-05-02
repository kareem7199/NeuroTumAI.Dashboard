import { ContactUsMessage } from "@/types/contactUs/ContactUsMessage";
import { Avatar, Textarea } from "@heroui/react";
import { SendHorizontal } from "lucide-react";
import moment from "moment";
import React from "react";

interface MessageBoxProps {
  message : ContactUsMessage;
}

const MessageBox : React.FC<MessageBoxProps> = ({message}) => {
  return (
    <div className="flex flex-col gap-5 border p-5 rounded-2xl flex-1">
      <h2 className="text-2xl font-bold tracking-tight">Message</h2>
      <div className="flex gap-5">
        <Avatar />
        <div className="flex flex-col gap-2">
          <div className="bg-muted p-5 rounded-2xl">
            <p>
              {message.message}
            </p>
          </div>
          <p className="text-muted-foreground text-sm">{moment.utc(message.createdAt).local().format('YYYY-MM-DD hh:mm A')}</p>
        </div>
      </div>
      <Textarea placeholder="Type your response here..." endContent={<SendHorizontal className="text-primary cursor-pointer"/>}/>
    </div>
  );
};

export default MessageBox;
