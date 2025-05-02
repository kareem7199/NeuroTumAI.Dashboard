import MessageBox from "@/components/specific/Message/MessageBox";
import UserInformation from "@/components/specific/Message/UserInformation";
import contactUsService from "@/services/contactUs.service";
import { ContactUsMessage } from "@/types/contactUs/ContactUsMessage";
import { Spinner } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const MessageView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<ContactUsMessage>();

  const fetchMessage = async () => {
    try {
      const response = await contactUsService.getMessage(Number(id));
      setMessage(response.data.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="max-w-screen-2xl w-full mx-auto flex flex-col gap-5">
      <Link to="/messages">
        <div className="flex items-center gap-1 text-muted-foreground ">
          <ArrowLeft size={15} />
          <p>Back to messages</p>
        </div>
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">Message Details</h1>
      <div className="flex md:flex-row flex-col-reverse gap-4">
        <MessageBox message={message!} />
        <UserInformation message={message!} />
      </div>
    </div>
  );
};

export default MessageView;
