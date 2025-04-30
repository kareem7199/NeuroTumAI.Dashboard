import PendingDoctor from "@/types/doctor/PendingDoctor";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Image,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

interface DoctorLicenseModalProps {
  selectedDoctor: PendingDoctor;
  isOpen: boolean;
  onClose: () => void;
  handleAccept: (id: number) => Promise<void>;
  handleReject: (id: number) => Promise<void>;
}

const DoctorLicenseModal: React.FC<DoctorLicenseModalProps> = ({
  selectedDoctor,
  isOpen,
  onClose,
  handleAccept,
  handleReject,
}) => {
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const accept = async () => {
    setAccepting(true);
    await handleAccept(selectedDoctor.id);
    setAccepting(false);
    onClose();
  };

  const reject = async () => {
    setRejecting(true);
    await handleReject(selectedDoctor.id);
    setRejecting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <div>
                <h3 className="text-xl">Doctor License</h3>
                <p className="text-sm text-gray-500">
                  {selectedDoctor.fullName} - License Verification
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="rounded-2xl overflow-hidden border">
                <Image
                  src={selectedDoctor.licenseDocumentFront}
                  alt="Doctor License"
                  width={700}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Doctor:</span>
                  <span>{selectedDoctor?.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{selectedDoctor?.email}</span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                onClick={reject}
                isLoading={rejecting}
                isDisabled={accepting || rejecting}
                startContent={<X size={16} />}
              >
                Reject
              </Button>
              <Button
                color="success"
                variant="flat"
                size="sm"
                onClick={accept}
                isLoading={accepting}
                isDisabled={accepting || rejecting}
                startContent={<Check size={16} />}
              >
                Accept
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DoctorLicenseModal;
