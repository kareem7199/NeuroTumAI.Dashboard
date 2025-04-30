import { Column, DataTable } from "@/components/shared/DataTable";
import DoctorLicenseModal from "@/components/specific/PendingDoctors/DoctorLicenseModal";
import doctorService from "@/services/doctor.service";
import PendingDoctor from "@/types/doctor/PendingDoctor";
import { Button, Chip, useDisclosure, User } from "@heroui/react";
import { Check, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PendingDoctorsView = () => {
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<PendingDoctor>();

  const [accepting, setAccepting] = useState<number | null>(null);
  const [rejecting, setRejecting] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleSelectDoctor = (doctor: PendingDoctor) => {
    setSelectedDoctor(doctor);
    onOpen();
  };

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

  const handleAcceptDoctor = async (doctorId: number) => {
    try {
      setAccepting(doctorId);
      await doctorService.acceptDoctor(doctorId);
      toast.success("Doctor accepted successfully");
      setRefetch((prev) => !prev);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setAccepting(null);
    }
  };

  const handleRejectDoctor = async (doctorId: number) => {
    try {
      setRejecting(doctorId);
      await doctorService.rejectDoctor(doctorId);
      toast.success("Doctor rejected successfully");
      setRefetch((prev) => !prev);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setRejecting(null);
    }
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
          onClick={() => handleSelectDoctor(doctor)}
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
            onClick={() => {
              handleAcceptDoctor(doctor.id);
            }}
            isLoading={accepting === doctor.id}
            isDisabled={accepting !== null}
            startContent={<Check size={16} />}
          >
            Accept
          </Button>
          <Button
            color="danger"
            variant="flat"
            size="sm"
            onClick={() => {
              handleRejectDoctor(doctor.id);
            }}
            isLoading={rejecting === doctor.id}
            isDisabled={rejecting !== null}
            startContent={<X size={16} />}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

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

      <DoctorLicenseModal
        selectedDoctor={selectedDoctor!}
        handleAccept={handleAcceptDoctor}
        handleReject={handleRejectDoctor}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default PendingDoctorsView;
