import { ContactUsMessage } from "@/types/contactUs/ContactUsMessage";
import { User } from "@heroui/react";

interface UserInformationProps {
  message: ContactUsMessage;
}

const UserInformation : React.FC<UserInformationProps> = ({message}) => {
  return (
    <div className="flex flex-col items-start gap-5 border p-5 rounded-2xl xl:w-1/5">
      <h2 className="text-2xl font-bold tracking-tight">User Information</h2>
      <User
        name={message.patientName}
        avatarProps={{
          src: message.patientProfilePicture,
          showFallback: true,
        }}
      />
      <div className="space-y-2 ">
        <div className="flex justify-between gap-4">
          <span className="font-medium">Email:</span>
          <span className="text-muted-foreground">{message.patientEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
