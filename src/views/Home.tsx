import { Column, DataTable } from "@/components/shared/DataTable";
import HomeCard from "@/components/specific/Home/HomeCard";
import { userState } from "@/recoil/userAtom";
import clinicService from "@/services/clinic.service";
import dashboardService from "@/services/dashboard.service";
import doctorService from "@/services/doctor.service";
import { PendingClinic } from "@/types/clinic/PendingClinic";
import PendingDoctor from "@/types/doctor/PendingDoctor";
import { Statstics } from "@/types/statstics/Statstics";
import { Button, Card, CardBody, Chip, Spinner, User } from "@heroui/react";
import { BriefcaseMedical, Clock10, Hospital } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Home = () => {
  const [pendingClinics, setPendingClinics] = useState<PendingClinic[]>([]);
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([]);
  const [statstics, setStatistics] = useState<Statstics>();
  const [isLoading, setIsLoading] = useState(true);

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
  ];
  const pendingDoctorsColumns: Column<PendingDoctor>[] = [
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
  ];
  const user = useRecoilValue(userState);

  useEffect(() => {
    const init = async () => {
      const pendingClinicsResponse = await clinicService.getPendingClinics(
        1,
        5
      );
      setPendingClinics(pendingClinicsResponse.data.data);

      const pendingDoctorsResponse = await doctorService.getPendingDoctors(
        1,
        5
      );
      setPendingDoctors(pendingDoctorsResponse.data.data);

      const statsResponse = await dashboardService.getStatistics();
      setStatistics(statsResponse.data.data);

      setIsLoading(false);
    };

    init();
  }, []);

  if (!user || isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-5 transition-opacity duration-500 opacity-0 animate-fade-in">
      {/* user info */}
      <div>
        <h4 className="font-semibold">Welcome Back,</h4>
        <h1 className="text-3xl font-bold">{user?.userName}</h1>
      </div>

      {/* dashboard content */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {/* stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <HomeCard
              title="Doctors"
              count={statstics?.doctors || 0}
              Icon={BriefcaseMedical}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <HomeCard
              title="Pending Doctors"
              count={statstics?.pendingDoctors || 0}
              Icon={BriefcaseMedical}
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
            <HomeCard
              title="Clinics"
              count={statstics?.clinics || 0}
              Icon={Hospital}
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
            />
            <HomeCard
              title="Pending Clinics"
              count={statstics?.pendingClinics || 0}
              Icon={Hospital}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <HomeCard
              title="Appointments"
              count={statstics?.appointments || 0}
              Icon={Clock10}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
          </div>

          {/* pending doctors */}
          <Card>
            <CardBody>
              <div className="flex flex-col gap-5 flex-1">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Pending Doctors</h1>
                  <Link to={"/doctors/pending"}>
                    <Button color="primary" variant="light" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <DataTable
                  data={pendingDoctors}
                  columns={pendingDoctorsColumns}
                  rowKey="id"
                  emptyContent="No pending doctors to review"
                  classNames={{
                    wrapper: "shadow-none",
                  }}
                />
              </div>
            </CardBody>
          </Card>

          {/* pending clinics */}
          <Card>
            <CardBody>
              <div className="flex flex-col gap-5 flex-1">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Pending Clinics</h1>
                  <Link to={"/clinics/pending"}>
                    <Button color="primary" variant="light" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <DataTable
                  data={pendingClinics}
                  columns={columns}
                  rowKey="id"
                  emptyContent="No pending clinics to review"
                  classNames={{
                    wrapper: "shadow-none",
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </div>
        {/* <Card className="min-w-[300px]">
          <CardHeader>
            <h1 className="text-2xl font-bold">Top Doctors</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-5">
            {pendingDoctors.map((doctor, index) => (
              <div className="flex flex-col gap-5 items-start">
                <User
                  name={doctor.fullName}
                  avatarProps={{
                    src: doctor.profilePicture,
                    showFallback: true,
                  }}
                />
                {index !== pendingDoctors.length - 1 && <Divider />}
              </div>
            ))}
          </CardBody>
        </Card> */}
      </div>
    </div>
  );
};

export default Home;
