"use client";

import { Button, Modal } from "@heroui/react";
import RoleBadge from "./RoleBadge";

const RoleChangeConfirmModal = ({
  isOpen,
  onClose,
  pendingChange,
  onConfirm,
}) => (
  <Modal>
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="bg-black/50 backdrop-blur-sm"
    >
      <Modal.Container>
        <Modal.Dialog className="bg-background border border-border">
          <Modal.CloseTrigger />

          <Modal.Header className="border-b border-border pb-3">
            <Modal.Heading className="text-foreground font-semibold text-base">
              Confirm Role Change
            </Modal.Heading>
          </Modal.Header>

          {/* Body */}
          <Modal.Body className="py-4">
            {pendingChange && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                Are you sure you want to change{" "}
                <span className="font-semibold text-foreground">
                  {pendingChange.userName}
                </span>
                &rsquo;s role to <RoleBadge role={pendingChange.newRole} />?
                <span className="block mt-2 text-xs">
                  This will immediately update their access permissions on
                  Nestrix.
                </span>
              </p>
            )}
          </Modal.Body>

          {/* Footer */}
          <Modal.Footer className="border-t border-border pt-3 flex justify-end gap-2">
            <Button
              onPress={onClose}
              size="sm"
              className="bg-muted text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              onPress={onConfirm}
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              Confirm Change
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export default RoleChangeConfirmModal;
