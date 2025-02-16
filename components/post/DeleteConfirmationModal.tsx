import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import type { UseDisclosureReturn } from "@heroui/use-disclosure";

type TDeleteConfirmationModalProps = {
  message?: string,
  disclosure: UseDisclosureReturn,
  action: () => void
}

export default function DeleteConfirmationModal({ disclosure, message, action }: TDeleteConfirmationModalProps) {
  const { isOpen, onOpenChange } = disclosure;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete Confirmation</ModalHeader>
            <ModalBody>
              <p>
                {message || "Are you sure?"}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={
                () => {
                  action();
                  onClose();
                }
              }>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
