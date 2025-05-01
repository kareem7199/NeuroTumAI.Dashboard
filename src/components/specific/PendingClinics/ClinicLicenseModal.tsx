import { PendingClinic } from "@/types/clinic/PendingClinic";
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

interface ClinicLicenseModalProps {
  selectedClinic: PendingClinic;
  isOpen: boolean;
  onClose: () => void;
  handleAccept: (id: number) => Promise<void>;
  handleReject: (id: number) => Promise<void>;
}

const ClinicLicenseModal: React.FC<ClinicLicenseModalProps> = ({
  selectedClinic,
  isOpen,
  onClose,
  handleAccept,
  handleReject,
}) => {
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const accept = async () => {
    setAccepting(true);
    await handleAccept(selectedClinic.id);
    setAccepting(false);
    onClose();
  };

  const reject = async () => {
    setRejecting(true);
    await handleReject(selectedClinic.id);
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
                <h3 className="text-xl">Clinic License</h3>
                <p className="text-sm text-gray-500">
                  {selectedClinic.doctorName} Clinic - License Verification
                </p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="rounded-2xl overflow-hidden border">
                <Image
                  src={selectedClinic.licenseDocument}
                  alt="Clinic License"
                  width={700}
                  height={700}
                  className="w-full object-contain"
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Doctor:</span>
                  <span>{selectedClinic?.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{selectedClinic?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone Number:</span>
                  <span>{selectedClinic?.phoneNumber}</span>
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

export default ClinicLicenseModal;
