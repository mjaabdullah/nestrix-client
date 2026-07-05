"use client";

import { CreditCard, House, MapPin } from "@gravity-ui/icons";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  Description,
  FieldError,
  Input,
  InputGroup,
  Label,
  Modal,
  Radio,
  RadioGroup,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
  FiLoader,
  FiMail,
  FiPhone,
  FiSmartphone,
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

const PAYMENT_METHODS = [
  {
    id: "bkash",
    label: "bKash",
    description: "Pay instantly with your bKash wallet",
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Pay instantly with your Nagad wallet",
  },
  {
    id: "card",
    label: "Debit / Credit Card",
    description: "Visa, Mastercard, or local cards",
  },
];

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") return "—";
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return "—";
  return `৳${numeric.toLocaleString()}`;
}

export default function BookingModal({
  state,
  property,
  user,
  onConfirmBooking,
  isSubmitting,
}) {
  // step: "details" -> "payment" -> "success"
  const [step, setStep] = useState("details");
  const [moveInDate, setMoveInDate] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [notes, setNotes] = useState("");
  // Default payment method is "card"
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});

  const minDate = today(getLocalTimeZone());

  const rentAmount = property?.rent;
  const rentType = property?.rentType || "month";
  const bookingFee = property?.bookingFee || 0;
  const totalPayable =
    property?.totalPayable !== undefined && property?.totalPayable !== null
      ? property.totalPayable
      : rentAmount !== undefined
        ? Number(rentAmount) + Number(bookingFee || 0)
        : undefined;

  const propertyImage = property?.image || property?.images?.[0];

  function resetForm() {
    setStep("details");
    setMoveInDate(null);
    setContactNumber("");
    setNotes("");
    setPaymentMethod("card");
    setErrors({});
  }

  function handleClose() {
    if (isSubmitting) return;
    resetForm();
    state.close();
  }

  function validateDetails() {
    const nextErrors = {};
    if (!moveInDate) {
      nextErrors.moveInDate = "Move-in date is required.";
    }
    if (moveInDate && moveInDate < minDate) {
      nextErrors.moveInDate = "Move-in date cannot be in the past.";
    }
    if (!contactNumber || contactNumber.trim().length === 0) {
      nextErrors.contactNumber = "Contact number is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleContinueToPayment() {
    if (!validateDetails()) return;
    setStep("payment");
  }

  async function handlePayNow() {
    if (isSubmitting) return;

    await onConfirmBooking({
      propertyId: property?._id,
      moveInDate: moveInDate ? moveInDate.toString() : null,
      contactNumber: contactNumber.trim(),
      notes: notes.trim(),
      paymentMethod,
      rentAmount,
      bookingFee,
      totalPayable,
      userEmail: user?.email || null,
    });

    setStep("paymentProcessing");
  }

  const headingCopy = {
    details: {
      title: "Booking Property",
      subtitle: "Complete the information below to continue your reservation.",
    },
    payment: {
      title: "Choose Payment Method",
      subtitle: "Select how you'd like to pay the total amount below.",
    },
    paymentProcessing: {
      title: "Processing Payment",
      subtitle: "Please wait while we process your payment.",
    },
    success: {
      title: "Booking Confirmed",
      subtitle: "Your reservation has been received.",
    },
  }[step];

  return (
    <Modal state={state}>
      <Modal.Backdrop
        isDismissable={!isSubmitting}
        variant="blur"
        className="bg-foreground/50"
      >
        {/* Constrain the whole dialog to the viewport height so the body can scroll */}
        <Modal.Container size="2xl" className="max-h-screen">
          <Modal.Dialog className="flex max-w-150 max-h-screen flex-col border border-border bg-background">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex min-h-0 flex-1 flex-col"
            >
              <Modal.Header className="flex flex-col gap-1 border-b border-border pb-2.5 shrink-0">
                <Modal.Heading className="text-xl font-semibold text-foreground">
                  {headingCopy.title}
                </Modal.Heading>
                <span className="text-sm font-normal text-muted-foreground">
                  {headingCopy.subtitle}
                </span>
                {!isSubmitting && step !== "success" && <Modal.CloseTrigger />}
              </Modal.Header>

              {/* min-h-0 + overflow-y-auto is what makes a flex child scrollable */}
              <Modal.Body className="min-h-0 flex-1 overflow-y-auto py-6">
                {/* Property summary always visible */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 rounded-xl border border-border bg-muted p-3"
                  aria-label="Property summary"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    {propertyImage ? (
                      <Image
                        src={propertyImage}
                        width={100}
                        height={100}
                        alt={property?.title || "Property"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
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

                {step === "details" && (
                  <>
                    <motion.div
                      variants={itemVariants}
                      className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      <TextField isReadOnly aria-label="Full name">
                        <Label className="text-muted-foreground">
                          Full Name
                        </Label>
                        <Input
                          value={user?.name || ""}
                          startContent={
                            <FiUser
                              className="text-muted-foreground"
                              aria-hidden="true"
                            />
                          }
                          className="border-border bg-muted text-foreground"
                        />
                      </TextField>
                      <TextField isReadOnly aria-label="Email address">
                        <Label className="text-muted-foreground">Email</Label>
                        <Input
                          value={user?.email || ""}
                          startContent={
                            <FiMail
                              className="text-muted-foreground"
                              aria-hidden="true"
                            />
                          }
                          className="border-border bg-muted text-foreground"
                        />
                      </TextField>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                      <div className="flex flex-col gap-1">
                        <DatePicker
                          value={moveInDate}
                          onChange={(e) => {
                            setMoveInDate(e);
                          }}
                          minValue={minDate}
                          isRequired
                          isDisabled={isSubmitting}
                          isInvalid={!!errors.moveInDate}
                        >
                          <Label className="text-foreground">
                            Move-in Date
                          </Label>
                          <DateField.Group className="border-border bg-background text-foreground">
                            <DateField.Input>
                              {(segment) => (
                                <DateField.Segment
                                  segment={segment}
                                  className="text-foreground"
                                />
                              )}
                            </DateField.Input>
                            <DateField.Suffix>
                              <DatePicker.Trigger>
                                <DatePicker.TriggerIndicator className="text-muted-foreground" />
                              </DatePicker.Trigger>
                            </DateField.Suffix>
                          </DateField.Group>
                          <DatePicker.Popover>
                            <Calendar
                              aria-label="Choose move-in date"
                              className="bg-background text-foreground"
                            >
                              <Calendar.Header>
                                <Calendar.Heading className="text-foreground" />
                                <Calendar.NavButton slot="previous" />
                                <Calendar.NavButton slot="next" />
                              </Calendar.Header>
                              <Calendar.Grid>
                                <Calendar.GridHeader>
                                  {(day) => (
                                    <Calendar.HeaderCell className="text-muted-foreground">
                                      {day}
                                    </Calendar.HeaderCell>
                                  )}
                                </Calendar.GridHeader>
                                <Calendar.GridBody>
                                  {(date) => (
                                    <Calendar.Cell
                                      date={date}
                                      className="text-foreground data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                                    />
                                  )}
                                </Calendar.GridBody>
                              </Calendar.Grid>
                            </Calendar>
                          </DatePicker.Popover>
                        </DatePicker>
                        {errors.moveInDate && (
                          <p
                            className="flex items-center gap-1 text-xs text-red-600"
                            role="alert"
                          >
                            <FiAlertCircle aria-hidden="true" />
                            {errors.moveInDate}
                          </p>
                        )}
                      </div>

                      <TextField
                        isRequired
                        isDisabled={isSubmitting}
                        isInvalid={!!errors.contactNumber}
                        value={contactNumber}
                        onChange={setContactNumber}
                      >
                        <Label className="text-foreground">
                          Contact Number
                        </Label>
                        <InputGroup>
                          <InputGroup.Prefix>
                            <FiPhone
                              className="size-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                          </InputGroup.Prefix>
                          <InputGroup.Input
                            placeholder="e.g. +880 1XXX-XXXXXX"
                            className="placeholder:text-muted-foreground"
                          />
                        </InputGroup>
                        {errors.contactNumber && (
                          <FieldError className="text-xs text-red-600">
                            {errors.contactNumber}
                          </FieldError>
                        )}
                      </TextField>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-4">
                      <TextField
                        isDisabled={isSubmitting}
                        aria-label="Additional notes"
                      >
                        <Label className="flex items-center gap-1.5 text-foreground">
                          <FiFileText
                            className="text-muted-foreground"
                            aria-hidden="true"
                          />
                          Additional Notes
                        </Label>
                        <TextArea
                          placeholder="Anything you'd like the host to know? (optional)"
                          value={notes}
                          onChange={(e) => {
                            if (e.target.value.length <= 300)
                              setNotes(e.target.value);
                          }}
                          maxLength={300}
                          className="placeholder:text-muted-foreground border-border bg-background text-foreground"
                        />
                        <Description className="text-muted-foreground">
                          {notes.length}/300 characters
                        </Description>
                      </TextField>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="mt-6 rounded-xl border border-border bg-muted p-4"
                      aria-label="Booking summary"
                    >
                      <div className="mb-3 flex items-center gap-2 text-foreground">
                        <CreditCard className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm font-medium">
                          Booking Summary
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Rent Amount
                          </span>
                          <span className="text-foreground">
                            {formatCurrency(rentAmount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Booking Fee
                          </span>
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
                  </>
                )}

                {step === "payment" && (
                  <>
                    <motion.div
                      variants={itemVariants}
                      className="mt-6 rounded-xl border border-border bg-muted p-4"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Total Payable
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          {formatCurrency(totalPayable)}
                        </span>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-5">
                      <RadioGroup
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={setPaymentMethod}
                        isDisabled={isSubmitting}
                        className="gap-2"
                      >
                        <Label className="mb-1 text-foreground">
                          Payment Method
                        </Label>
                        {PAYMENT_METHODS.map((method) => (
                          <Radio
                            key={method.id}
                            value={method.id}
                            className="group block w-full"
                          >
                            <Radio.Content className="flex w-full cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-foreground hover:border-accent/50 group-data-[selected=true]:border-accent group-data-[selected=true]:bg-accent/10">
                              <Radio.Control>
                                <Radio.Indicator />
                              </Radio.Control>
                              <FiSmartphone
                                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium text-foreground">
                                  {method.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {method.description}
                                </span>
                              </div>
                            </Radio.Content>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  </>
                )}

                {step === "paymentProcessing" && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-blue-300 bg-blue-50 p-8 text-center"
                  >
                    <FiLoader
                      className="h-10 w-10 animate-spin  text-blue-600"
                      aria-hidden="true"
                      style={{ animationDuration: "3s" }}
                    />

                    <p className="text-base font-medium text-foreground">
                      Processing your payment...
                    </p>

                    <p className="text-sm text-muted-foreground">
                      We're securely processing your payment of{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(totalPayable)}
                      </span>
                      . This usually takes only a few moments.
                    </p>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-green-300 bg-green-50 p-8 text-center"
                  >
                    <FiCheckCircle
                      className="h-10 w-10 text-green-600"
                      aria-hidden="true"
                    />
                    <p className="text-base font-medium text-foreground">
                      Payment of {formatCurrency(totalPayable)} received
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A confirmation has been sent to{" "}
                      {user?.email || "your email"}. The host will reach out to
                      finalize your move-in.
                    </p>
                  </motion.div>
                )}
              </Modal.Body>

              <Modal.Footer className="shrink-0 border-t border-border pt-2.5">
                {step === "details" && (
                  <>
                    <Button
                      variant="ghost"
                      onPress={handleClose}
                      isDisabled={isSubmitting}
                      aria-label="Cancel booking"
                      className="text-primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onPress={handleContinueToPayment}
                      isDisabled={isSubmitting}
                      aria-label="Continue to payment"
                      className="bg-primary text-primary-foreground"
                    >
                      Continue to Payment
                    </Button>
                  </>
                )}

                {step === "payment" && (
                  <>
                    <Button
                      variant="ghost"
                      onPress={() => setStep("details")}
                      isDisabled={isSubmitting}
                      aria-label="Back to details"
                      className="text-primary"
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onPress={handlePayNow}
                      isPending={isSubmitting}
                      aria-label="Confirm and pay"
                      className="bg-primary text-primary-foreground"
                    >
                      {({ isPending }) => (
                        <>
                          {isPending && <Spinner size="sm" color="current" />}
                          {isPending
                            ? "Processing payment..."
                            : `Pay ${formatCurrency(totalPayable)}`}
                        </>
                      )}
                    </Button>
                  </>
                )}
                {step === "paymentProcessing" && (
                  <Button
                    variant="primary"
                    onPress={handleClose}
                    aria-label="Close"
                    className="ml-auto bg-primary text-primary-foreground"
                  >
                    Done
                  </Button>
                )}

                {step === "success" && (
                  <Button
                    variant="primary"
                    onPress={handleClose}
                    aria-label="Close"
                    className="ml-auto bg-primary text-primary-foreground"
                  >
                    Done
                  </Button>
                )}
              </Modal.Footer>
            </motion.div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
