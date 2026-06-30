import { TrashBin } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

const FavoritesDeleteModal = ({
  state,
  selectedItem,
  isDeleting,
  onConfirm,
}) => {
  return (
    <Modal state={state}>
      <Modal.Backdrop variant="opaque" className="bg-black/50">
        <Modal.Container placement="center" size="sm">
          <Modal.Dialog className="bg-secondary border border-border rounded-xl">
            {({ close }) => (
              <>
                {/* ── Header ── */}
                <Modal.Header className="border-b border-border pb-3">
                  <Modal.Icon>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <TrashBin className="text-accent-foreground text-sm" />
                    </div>
                  </Modal.Icon>
                  <Modal.Heading className="text-foreground font-semibold">
                    Remove Favorite
                  </Modal.Heading>
                </Modal.Header>

                {/* ── Body ── */}
                <Modal.Body>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to remove{" "}
                    <span className="font-semibold text-foreground">
                      &ldquo;{selectedItem?.propertyTitle}&rdquo;
                    </span>{" "}
                    from your favorites? This action cannot be undone.
                  </p>
                </Modal.Body>

                {/* ── Footer ── */}
                <Modal.Footer className="border-t border-border pt-3">
                  <Button
                    variant="flat"
                    onPress={close}
                    isDisabled={isDeleting}
                    className="bg-muted text-muted-foreground"
                    size="sm"
                  >
                    Cancel
                  </Button>

                  {/* Confirm Remove */}
                  <Button
                    onPress={onConfirm}
                    isLoading={isDeleting}
                    isDisabled={isDeleting}
                    className="bg-primary text-primary-foreground"
                    size="sm"
                  >
                    {isDeleting ? "Removing..." : "Yes, Remove"}
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default FavoritesDeleteModal;
