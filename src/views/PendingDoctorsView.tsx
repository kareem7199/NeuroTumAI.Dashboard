import { Column, DataTable } from "@/components/shared/DataTable";
import doctorService from "@/services/doctor.service";
import PendingDoctor from "@/types/doctor/PendingDoctor";
import { Button, Chip, User } from "@heroui/react";
import { Check, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";

const PendingDoctorsView = () => {
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([]);
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

  const columns: Column<PendingDoctor>[] = [
    {
      key: "doctor",
      label: "DOCTOR",
      render: (doctor) => (
        <User
          name={doctor.fullName}
          avatarProps={{
            src: doctor.profilePicture,
            showFallback: true,
          }}
        />
      ),
    },
    {
      key: "userName",
      label: "USERNAME",
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "gender",
      label: "GENDER",
      render: (doctor) => (
        <Chip
          variant="bordered"
          color={doctor.gender === "Female" ? "danger" : "success"}
        >
          {doctor.gender}
        </Chip>
      ),
    },
    {
      key: "license",
      label: "LICENSE",
      render: (doctor) => (
        <Button
          variant="bordered"
          size="sm"
          onClick={() => {}}
          startContent={<Eye size={16} />}
        >
          View
        </Button>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (doctor) => (
        <div className="flex items-center gap-2">
          <Button
            color="success"
            variant="flat"
            size="sm"
            onClick={() => {}}
            startContent={<Check size={16} />}
          >
            Accept
          </Button>
          <Button
            color="danger"
            variant="flat"
            size="sm"
            onClick={() => {}}
            startContent={<X size={16} />}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const fetchDoctors = async () => {
    setLoading(true);
    const response = await doctorService.getPendingDoctors(
      page,
      rowsPerPage,
      searchTerm
    );
    setPendingDoctors(response.data.data);
    setTotalPages(response.data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, [refetch]);

  return (
    <div className="max-w-screen-2xl w-full mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pending Doctors</h1>
        <p className="text-muted-foreground">
          Review and approve doctor applications
        </p>
      </div>

      <DataTable
        data={pendingDoctors}
        columns={columns}
        rowKey="id"
        page={page}
        totalPages={totalPages}
        isLoading={loading}
        enableSearch
        onSearchChange={handleSearchChange}
        onPageChange={handlePageChange}
        emptyContent="No pending doctors to review"
        classNames={{
          wrapper: "shadow-md",
        }}
      />
    </div>
  );
};

export default PendingDoctorsView;
