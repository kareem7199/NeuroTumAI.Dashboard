import { Column, DataTable } from "@/components/shared/DataTable";
import ClinicLicenseModal from "@/components/specific/PendingClinics/ClinicLicenseModal";
import clinicService from "@/services/clinic.service";
import { PendingClinic } from "@/types/clinic/PendingClinic";
import { Button, useDisclosure, User } from "@heroui/react";
import { Check, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PendingClinicsView = () => {
  const [pendingClinics, setPendingClinics] = useState<PendingClinic[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<PendingClinic>();

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

  const handleSelectClinic = (clinic: PendingClinic) => {
    setSelectedClinic(clinic);
    onOpen();
  };

  const fetchClinics = async () => {
    setLoading(true);
    const response = await clinicService.getPendingClinics(
      page,
      rowsPerPage,
      searchTerm
    );
    setPendingClinics(response.data.data);
    setTotalPages(response.data.totalPages);
    setLoading(false);
  };

  const handleAcceptClinic = async (clinicId: number) => {
    try {
      setAccepting(clinicId);
      await clinicService.acceptClinic(clinicId);
      toast.success("Clinic accepted successfully");
      setRefetch((prev) => !prev);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setAccepting(null);
    }
  };

  const handleRejectClinic = async (clinicId: number) => {
    try {
      setRejecting(clinicId);
      await clinicService.rejectClinic(clinicId);
      toast.success("Clinic rejected successfully");
      setRefetch((prev) => !prev);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setRejecting(null);
    }
  };

  const columns: Column<PendingClinic>[] = [
    {
      key: "doctor",
      label: "DOCTOR",
      render: (clinic) => (
        <User
          name={clinic.doctorName}
          avatarProps={{
            src: clinic.doctorProfilePicture,
            showFallback: true,
          }}
        />
      ),
    },
    {
      key: "phoneNumber",
      label: "PHONE NUMBER",
    },
    {
      key: "address",
      label: "ADDRESS",
    },
    {
      key: "license",
      label: "LICENSE",
      render: (clinic) => (
        <Button
          variant="bordered"
          size="sm"
          onClick={() => handleSelectClinic(clinic)}
          startContent={<Eye size={16} />}
        >
          View
        </Button>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (clinic) => (
        <div className="flex items-center gap-2">
          <Button
            color="success"
            variant="flat"
            size="sm"
            onClick={() => {
              handleAcceptClinic(clinic.id);
            }}
            isLoading={accepting === clinic.id}
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
              handleRejectClinic(clinic.id);
            }}
            isLoading={rejecting === clinic.id}
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
    fetchClinics();
  }, [refetch]);

  return (
    <div className="max-w-screen-2xl w-full mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pending Clinics</h1>
        <p className="text-muted-foreground">
          Review and approve clinic registration requests
        </p>
      </div>

      <DataTable
        data={pendingClinics}
        columns={columns}
        rowKey="id"
        page={page}
        totalPages={totalPages}
        isLoading={loading}
        enableSearch
        onSearchChange={handleSearchChange}
        onPageChange={handlePageChange}
        emptyContent="No pending clinics to review"
        classNames={{
          wrapper: "shadow-md",
        }}
      />

      <ClinicLicenseModal
        selectedClinic={selectedClinic!}
        handleAccept={handleAcceptClinic}
        handleReject={handleRejectClinic}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default PendingClinicsView;
