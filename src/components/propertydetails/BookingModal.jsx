"use client";

import { CreditCard, House, MapPin } from "@gravity-ui/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiAlertCircle,
  FiFileText,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") return "—";
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return "—";
  return `৳${numeric.toLocaleString()}`;
}

export default function BookingModal({
  isOpen,
  onOpenChange,
  property,
  user,
  onConfirmBooking,
  isSubmitting,
}) {
  const [moveInDate, setMoveInDate] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const minDate = today(getLocalTimeZone());

  const rentAmount = property?.rent;
  const rentType = property?.rentType || "month";
  const bookingFee = property?.bookingFee;
  const totalPayable =
    property?.totalPayable !== undefined && property?.totalPayable !== null
      ? property.totalPayable
      : rentAmount !== undefined
        ? Number(rentAmount) + Number(bookingFee || 0)
        : undefined;

  const propertyImage = property?.image || property?.images?.[0];

  function resetForm() {
    setMoveInDate(null);
    setContactNumber("");
    setNotes("");
    setErrors({});
  }

  function handleOpenChange(open) {
    if (!open && !isSubmitting) {
      resetForm();
    }
    onOpenChange(open);
  }

  function validate() {
    const nextErrors = {};
    if (!moveInDate) {
      nextErrors.moveInDate = "Move-in date is required.";
    }
    if (!contactNumber || contactNumber.trim().length === 0) {
      nextErrors.contactNumber = "Contact number is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleConfirm() {
    if (isSubmitting) return;
    if (!validate()) return;

    onConfirmBooking({
      propertyId: property?._id,
      moveInDate: moveInDate ? moveInDate.toString() : null,
      contactNumber: contactNumber.trim(),
      notes: notes.trim(),
      rentAmount,
      bookingFee,
      totalPayable,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      isDismissable={!isSubmitting}
      hideCloseButton={isSubmitting}
      scrollBehavior="inside"
      size="2xl"
      backdrop="blur"
      classNames={{
        base: "bg-background border border-border",
        body: "py-6",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ModalHeader
              className="flex flex-col gap-1 border-b border-border"
              id="booking-modal-title"
            >
              <span className="text-xl font-semibold text-foreground">
                Booking Property
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                Complete the information below to continue your reservation.
              </span>
            </ModalHeader>

            <ModalBody>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 rounded-xl border border-border bg-secondary p-3"
                aria-label="Property summary"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-accent">
                  {propertyImage ? (
                    <img
                      src={propertyImage}
                      alt={property?.title || "Property"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-secondary-foreground">
                      <House className="h-6 w-6" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate text-base font-medium text-foreground">
                    {property?.title || "Untitled property"}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {property?.location || "Location unavailable"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="text-muted-foreground">
                      {property?.propertyType || "—"}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(rentAmount)}
                      <span className="text-muted-foreground">
                        {" "}
                        / {rentType}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <Input
                  isReadOnly
                  label="Full Name"
                  value={user?.name || ""}
                  startContent={
                    <FiUser
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  }
                  aria-label="Full name"
                  classNames={{
                    inputWrapper: "bg-secondary border-border",
                    input: "text-foreground",
                    label: "text-muted-foreground",
                  }}
                />
                <Input
                  isReadOnly
                  label="Email"
                  value={user?.email || ""}
                  startContent={
                    <FiMail
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  }
                  aria-label="Email address"
                  classNames={{
                    inputWrapper: "bg-secondary border-border",
                    input: "text-foreground",
                    label: "text-muted-foreground",
                  }}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div className="flex flex-col gap-1">
                  <DatePicker
                    label="Move-in Date"
                    value={moveInDate}
                    onChange={setMoveInDate}
                    minValue={minDate}
                    isRequired
                    isDisabled={isSubmitting}
                    isInvalid={!!errors.moveInDate}
                    aria-label="Move-in date"
                    classNames={{
                      base: "w-full",
                      inputWrapper: "bg-background border-border",
                    }}
                  />
                  {errors.moveInDate && (
                    <p
                      className="flex items-center gap-1 text-xs text-foreground"
                      role="alert"
                    >
                      <FiAlertCircle aria-hidden="true" />
                      {errors.moveInDate}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Input
                    label="Contact Number"
                    placeholder="e.g. +880 1XXX-XXXXXX"
                    value={contactNumber}
                    onValueChange={setContactNumber}
                    isRequired
                    isDisabled={isSubmitting}
                    isInvalid={!!errors.contactNumber}
                    startContent={
                      <FiPhone
                        className="text-muted-foreground"
                        aria-hidden="true"
                      />
                    }
                    aria-label="Contact number"
                    classNames={{
                      inputWrapper: "bg-background border-border",
                      input: "text-foreground",
                      label: "text-muted-foreground",
                    }}
                  />
                  {errors.contactNumber && (
                    <p
                      className="flex items-center gap-1 text-xs text-foreground"
                      role="alert"
                    >
                      <FiAlertCircle aria-hidden="true" />
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4">
                <Textarea
                  label="Additional Notes"
                  placeholder="Anything you'd like the host to know? (optional)"
                  value={notes}
                  onValueChange={(value) => {
                    if (value.length <= 300) setNotes(value);
                  }}
                  isDisabled={isSubmitting}
                  maxLength={300}
                  description={`${notes.length}/300 characters`}
                  startContent={
                    <FiFileText
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  }
                  aria-label="Additional notes"
                  classNames={{
                    inputWrapper: "bg-background border-border",
                    input: "text-foreground",
                    label: "text-muted-foreground",
                    description: "text-muted-foreground",
                  }}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-6 rounded-xl border border-border bg-secondary p-4"
                aria-label="Booking summary"
              >
                <div className="mb-3 flex items-center gap-2 text-secondary-foreground">
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-medium">Booking Summary</span>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rent Amount</span>
                    <span className="text-foreground">
                      {formatCurrency(rentAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Booking Fee</span>
                    <span className="text-foreground">
                      {formatCurrency(bookingFee)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between border-t border-border pt-2">
                    <span className="font-medium text-foreground">
                      Total Payable
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(totalPayable)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ModalBody>

            <ModalFooter className="border-t border-border">
              <Button
                variant="ghost"
                className="text-muted-foreground"
                onPress={onClose}
                isDisabled={isSubmitting}
                aria-label="Cancel booking"
              >
                Cancel
              </Button>
              <Button
                className="bg-accent text-accent-foreground"
                onPress={handleConfirm}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                aria-label="Continue to payment"
              >
                {isSubmitting ? "Processing..." : "Continue to Payment"}
              </Button>
            </ModalFooter>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
}
