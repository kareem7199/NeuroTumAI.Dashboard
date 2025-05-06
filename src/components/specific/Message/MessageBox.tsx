import contactUsService from "@/services/contactUs.service";
import { ContactUsMessage } from "@/types/contactUs/ContactUsMessage";
import { Avatar, Spinner, Textarea } from "@heroui/react";
import { SendHorizontal } from "lucide-react";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface MessageBoxProps {
  message: ContactUsMessage;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  const [text, setText] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleReply = async () => {
    try {
      if (text.trim() === "") return;
      setLoading(true);
      await contactUsService.reply(message.id, text);

      navigate("/messages");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 border p-5 rounded-2xl flex-1">
      {loading && (
        <div className="flex justify-center absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 z-10">
          <Spinner size="lg" />
        </div>
      )}
      <h2 className="text-2xl font-bold tracking-tight">Message</h2>
      <div className="flex gap-5">
        <Avatar />
        <div className="flex flex-col gap-2">
          <div className="bg-muted p-5 rounded-2xl">
            <p>{message.message}</p>
          </div>
          <p className="text-muted-foreground text-sm">
            {moment.utc(message.createdAt).local().format("YYYY-MM-DD hh:mm A")}
          </p>
        </div>
      </div>
      <Textarea
        onChange={(e) => setText(e.target.value)}
        classNames={{
          input: "resize-y min-h-[80px]",
        }}
        placeholder="Type your response here..."
        disableAnimation
        disableAutosize
        endContent={
          <div className="h-full flex items-center">
            <SendHorizontal
              className="text-primary cursor-pointer"
              onClick={handleReply}
            />
          </div>
        }
      />
    </div>
  );
};

export default MessageBox;
