import { Column, DataTable } from "@/components/shared/DataTable";
import contactUsService from "@/services/contactUs.service";
import { ContactUsMessage } from "@/types/contactUs/ContactUsMessage";
import { Button, User } from "@heroui/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MessagesView = () => {
  const [messages, setMessages] = useState<ContactUsMessage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refetch, setRefetch] = useState(false);

  const rowsPerPage = 15;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setRefetch((prev) => !prev);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
    setRefetch((prev) => !prev);
  };

  const fetchMessages = async () => {
    setLoading(true);
    const response = await contactUsService.getMessages(
      page,
      rowsPerPage,
      searchTerm
    );
    setMessages(response.data.data);
    setTotalPages(response.data.totalPages);
    setLoading(false);
  };

  const columns: Column<ContactUsMessage>[] = [
    {
      key: "user",
      label: "USER",
      render: (message) => (
        <User
          name={message.patientName}
          avatarProps={{
            src: message.patientProfilePicture,
            showFallback: true,
          }}
        />
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (message) => message.patientEmail,
    },
    {
      key: "message",
      label: "Message",
      render: (message) => (
        <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-60">
          {message.message}
        </p>
      ),
    },
    {
      key: "date",
      label: "DATE",
      render: (message) => moment.utc(message.createdAt).local().format('YYYY-MM-DD hh:mm A')
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (message) => (
        <div className="flex items-center gap-2">
          <Link to={`/messages/${message.id}`}>
            <Button
              color="success"
              variant="flat"
              size="sm"
              startContent={<Check size={16} />}
            >
              Respond
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchMessages();
  }, [refetch]);

  return (
    <div className="max-w-screen-2xl w-full mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Review and respond to contact messages
        </p>
      </div>

      <DataTable
        data={messages}
        columns={columns}
        rowKey="id"
        page={page}
        totalPages={totalPages}
        isLoading={loading}
        enableSearch
        onSearchChange={handleSearchChange}
        onPageChange={handlePageChange}
        emptyContent="No messages to view"
        classNames={{
          wrapper: "shadow-md",
        }}
      />
    </div>
  );
};

export default MessagesView;
