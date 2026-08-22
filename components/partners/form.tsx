"use client"

import type React from "react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, Building2, Briefcase, Globe, ChevronDown } from "lucide-react"
import RippleButton from "@/components/micro-interactions/ripple-button"
import AnimatedIcon from "@/components/micro-interactions/animated-icon"
import FadeIn from "@/components/animations/fade-in"
import { apiService } from "@/lib/api"

interface PartnerFormData {
  commercialName: string
  legalName: string
  contactName: string
  role: string
  email: string
  country: string
  phoneCountry: string
  phone: string
  whatsappCountry: string
  whatsapp: string
  subject: string
  message: string
}

interface PartnerFormErrors {
  commercialName?: string
  legalName?: string
  contactName?: string
  role?: string
  email?: string
  country?: string
  phone?: string
  whatsapp?: string
  subject?: string
  message?: string
}

interface PartnersPageFormProps {
  locale?: "en" | "fr"
}

const countryOptions = [
  { iso: "MU", nameEn: "Mauritius", nameFr: "Maurice", dialCode: "+230" },
  { iso: "RE", nameEn: "Reunion", nameFr: "La Réunion", dialCode: "+262" },
  { iso: "FR", nameEn: "France", nameFr: "France", dialCode: "+33" },
  { iso: "IN", nameEn: "India", nameFr: "Inde", dialCode: "+91" },
  { iso: "UK", nameEn: "United Kingdom", nameFr: "Royaume-Uni", dialCode: "+44" },
  { iso: "ZA", nameEn: "South Africa", nameFr: "Afrique du Sud", dialCode: "+27" },
]

const content = {
  en: {
    title: "Let's",
    titleHighlight: "Get Started!",
    subtitle: "Tell us about your business and partnership goals.",
    labels: {
      commercialName: "Commercial name",
      legalName: "Legal business name",
      contactName: "Contact name",
      role: "Role",
      email: "Professional email",
      country: "Country",
      phone: "Phone",
      whatsapp: "WhatsApp number",
      subject: "Subject",
      message: "Describe briefly",
      phoneCountry: "Country",
    },
    subjectOptions: {
      partnership: "Partnership",
      advertising: "Advertising",
      other: "Other",
    },
    subtexts: {
      commercialName: "Example: Supermarket X",
      legalName: "Official legal company name",
      contactName: "Your first and last name",
      role: "Marketing Manager, Director",
      email: "Example: firstname@company.mu",
      message:
        "Describe briefly what partnership you propose, what you expect from PiKSou, and your objective (visibility, sales, customer acquisition, market test, etc.).",
    },
    placeholders: {
      commercialName: "Example Supermarket X",
      legalName: "Official legal company name",
      contactName: "Your first and last name",
      role: "Marketing Manager, Director",
      email: "Example: firstname@company.mu",
      country: "Select country",
      phone: "Phone number",
      whatsapp: "WhatsApp number",
      message: "Your message",
    },
    errors: {
      commercialNameRequired: "Commercial name is required",
      commercialNameMin: "Commercial name must be at least 2 characters",
      legalNameRequired: "Legal business name is required",
      legalNameMin: "Legal business name must be at least 2 characters",
      contactNameRequired: "Contact name is required",
      contactNameMin: "Contact name must be at least 2 characters",
      roleRequired: "Role is required",
      roleMin: "Role must be at least 2 characters",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      countryRequired: "Country is required",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Please enter a valid phone number",
      whatsappRequired: "WhatsApp number is required",
      whatsappInvalid: "Please enter a valid WhatsApp number",
      messageRequired: "Message is required",
      messageMin: "Message must be at least 10 characters",
    },
    submitButton: "Submit Partnership Inquiry",
    submitting: "Sending...",
    successTitle: "Inquiry Sent!",
    successMessage: "Thank you, your partnership request has been sent.",
    sendAnother: "Send Another Inquiry",
    footer: "Your information will remain confidential and will only be used to process your partnership request.",
  },
  fr: {
    title: "C'est",
    titleHighlight: "Parti!",
    subtitle: "Partagez votre demande de partenariat avec notre équipe.",
    labels: {
      commercialName: "Nom commercial",
      legalName: "Dénomination sociale",
      contactName: "Nom du contact",
      role: "Fonction",
      email: "Adresse Email professionnelle",
      country: "Pays",
      phone: "Téléphone",
      whatsapp: "Numéro WhatsApp",
      subject: "Sujet",
      message: "Décrivez brièvement",
      phoneCountry: "Pays",
    },
    subjectOptions: {
      partnership: "Partenariat",
      advertising: "Publicité",
      other: "Autre",
    },
    subtexts: {
      commercialName: "Exemple: Supermarché X",
      legalName: "Nom légal de l'entreprise",
      contactName: "Votre nom et prénom",
      role: "Responsable marketing, Directeur",
      email: "Exemple : prenom@entreprise.mu",
      message:
        "– ce que vous proposez comme partenariat\n– ce que vous attendez de Piksou\n– votre objectif (visibilité, ventes, acquisition de clients, test de marché, etc.)\nPlus votre message est clair, plus nous pourrons vous répondre efficacement.",
    },
    placeholders: {
      commercialName: "Exemple Supermarché X",
      legalName: "Nom légal de l'entreprise",
      contactName: "Votre nom et prénom",
      role: "Responsable marketing, Directeur",
      email: "Exemple : prenom@entreprise.mu",
      country: "Sélectionnez votre pays",
      phone: "Numéro de téléphone",
      whatsapp: "Numéro WhatsApp",
      message: "Votre message",
    },
    errors: {
      commercialNameRequired: "Le nom commercial est obligatoire",
      commercialNameMin: "Le nom commercial doit comporter au moins 2 caractères",
      legalNameRequired: "La dénomination sociale est obligatoire",
      legalNameMin: "La dénomination sociale doit comporter au moins 2 caractères",
      contactNameRequired: "Le nom du contact est obligatoire",
      contactNameMin: "Le nom du contact doit comporter au moins 2 caractères",
      roleRequired: "La fonction est obligatoire",
      roleMin: "La fonction doit comporter au moins 2 caractères",
      emailRequired: "L'email est obligatoire",
      emailInvalid: "Veuillez entrer une adresse email valide",
      countryRequired: "Le pays est obligatoire",
      phoneRequired: "Le numéro de téléphone est obligatoire",
      phoneInvalid: "Veuillez entrer un numéro de téléphone valide",
      whatsappRequired: "Le numéro WhatsApp est obligatoire",
      whatsappInvalid: "Veuillez entrer un numéro WhatsApp valide",
      messageRequired: "Le message est obligatoire",
      messageMin: "Le message doit comporter au moins 10 caractères",
    },
    submitButton: "Envoyer ma demande de partenariat",
    submitting: "Envoi en cours...",
    successTitle: "Demande envoyée",
    successMessage: "Merci, votre demande de partenariat a bien été envoyée.",
    sendAnother: "Envoyer une autre demande",
    footer: "Vos informations resteront confidentielles et ne seront utilisées que pour traiter votre demande de partenariat.",
  },
}

export default function PartnersPageForm({ locale = "en" }: PartnersPageFormProps) {
  const t = content[locale]

  const [formData, setFormData] = useState<PartnerFormData>({
    commercialName: "",
    legalName: "",
    contactName: "",
    role: "",
    email: "",
    country: "",
    phoneCountry: "MU",
    phone: "",
    whatsappCountry: "MU",
    whatsapp: "",
    subject: "partnership",
    message: "",
  })
  const [errors, setErrors] = useState<PartnerFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const phoneDialCode = useMemo(
    () => countryOptions.find((country) => country.iso === formData.phoneCountry)?.dialCode || "+230",
    [formData.phoneCountry],
  )

  const whatsappDialCode = useMemo(
    () => countryOptions.find((country) => country.iso === formData.whatsappCountry)?.dialCode || "+230",
    [formData.whatsappCountry],
  )

  const validateField = (name: string, value: string): string | undefined => {
    const plainPhoneRegex = /^[0-9\s\-()]{7,}$/

    switch (name) {
      case "commercialName":
        if (!value.trim()) return t.errors.commercialNameRequired
        if (value.trim().length < 2) return t.errors.commercialNameMin
        break
      case "legalName":
        if (!value.trim()) return t.errors.legalNameRequired
        if (value.trim().length < 2) return t.errors.legalNameMin
        break
      case "contactName":
        if (!value.trim()) return t.errors.contactNameRequired
        if (value.trim().length < 2) return t.errors.contactNameMin
        break
      case "role":
        if (!value.trim()) return t.errors.roleRequired
        if (value.trim().length < 2) return t.errors.roleMin
        break
      case "email":
        if (!value.trim()) return t.errors.emailRequired
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.errors.emailInvalid
        break
      case "country":
        if (!value) return t.errors.countryRequired
        break
      case "phone":
        if (!value.trim()) return t.errors.phoneRequired
        if (value && !plainPhoneRegex.test(value)) return t.errors.phoneInvalid
        break
      case "whatsapp":
        if (value && !plainPhoneRegex.test(value)) return t.errors.whatsappInvalid
        break
      case "message":
        if (!value.trim()) return t.errors.messageRequired
        if (value.trim().length < 10) return t.errors.messageMin
        break
    }
    return undefined
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof PartnerFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
    setFocusedField(null)
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const validateForm = (): boolean => {
    const newErrors: PartnerFormErrors = {}
    let isValid = true

    const requiredFields: (keyof PartnerFormErrors)[] = [
      "commercialName",
      "legalName",
      "contactName",
      "role",
      "email",
      "country",
      "phone",
      "message",
    ]

    for (const key of requiredFields) {
      const value = formData[key as keyof PartnerFormData] || ""
      const error = validateField(key, value)
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!validateForm()) return

    setIsSubmitting(true)
    setIsSubmitted(false)
    setSubmitError(null)

    try {
      const payload: Record<string, string> = {
        commercial_name: formData.commercialName,
        legal_name: formData.legalName,
        contact_name: formData.contactName,
        role: formData.role,
        email: formData.email,
        country_iso: formData.country,
        locale: locale,
        message: formData.message,
        subject: formData.subject,
        phone_country_iso: formData.phoneCountry,
        phone_dial_code: phoneDialCode,
        phone_e164_like: formData.phone ? `${phoneDialCode} ${formData.phone}` : "",
        phone_number: formData.phone,
        whatsapp_country_iso: formData.whatsappCountry,
        whatsapp_dial_code: whatsappDialCode,
        whatsapp_e164_like: formData.whatsapp ? `${whatsappDialCode} ${formData.whatsapp}` : "",
        whatsapp_number: formData.whatsapp,
      }

      const result = await apiService.sendPartnerContact(payload)
      if (!result.success) {
        throw new Error(result.error || "Failed to submit inquiry")
      }

      setIsSubmitted(true)
      setFormData({
        commercialName: "",
        legalName: "",
        contactName: "",
        role: "",
        email: "",
        country: "",
        phoneCountry: "MU",
        phone: "",
        whatsappCountry: "MU",
        whatsapp: "",
        subject: "partnership",
        message: "",
      })
    } catch (error: any) {
      const errorMessage = error.message || "Failed to submit inquiry. Please try again."
      console.error("Partner form submission error:", errorMessage)
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputVariants: Variants = {
    focused: { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 10 } },
    unfocused: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 10 } },
  }

  const errorVariants: Variants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  const inputClasses = (fieldName: keyof PartnerFormErrors) => `
    block w-full pl-10 pr-3 py-3 border rounded-lg
    bg-gray-50 dark:bg-[var(--surface-soft)]
    text-gray-900 dark:text-[var(--text-body)]
    placeholder-gray-500 dark:placeholder-[var(--text-muted)]
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-200
    ${errors[fieldName] ? "border-red-500" : "border-gray-300 dark:border-[var(--border-soft)]"}
  `

  const selectClasses = (fieldName: keyof PartnerFormErrors) => `
    block w-full pl-10 pr-10 py-3 border rounded-lg
    bg-gray-50 dark:bg-[var(--surface-soft)]
    text-gray-900 dark:text-[var(--text-body)]
    appearance-none [-webkit-appearance:none] [-moz-appearance:none]
    [background-image:none]
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-200
    ${errors[fieldName] ? "border-red-500" : "border-gray-300 dark:border-[var(--border-soft)]"}
  `

  const renderLabel = (label: string, required = false) => (
    <label className="block text-sm font-medium text-gray-700 dark:text-[var(--text-body)]">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )

  if (isSubmitted) {
    return (
      <section
        className="scroll-mt-24 bg-gray-50 py-16 transition-colors duration-300 dark:bg-[var(--section-bg)] md:py-24"
        id="contact-form"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:border dark:border-[var(--border-soft)] dark:bg-[var(--surface-bg)] dark:shadow-emerald-950/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 10 }}
            >
              <CheckCircle size={64} className="text-emerald-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-[var(--text-main)]">{t.successTitle}</h3>
            <p className="mb-6 text-gray-600 dark:text-[var(--text-muted)]">{t.successMessage}</p>
            <RippleButton variant="primary" onClick={() => setIsSubmitted(false)} className="px-6 py-2">
              {t.sendAnother}
            </RippleButton>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative scroll-mt-24 overflow-hidden bg-gray-50 py-12 transition-colors duration-300 dark:bg-[var(--section-bg)] md:py-16"
      id="contact-form"
    >
      <Image
        src="/images/form_decoration.svg"
        alt=""
        width={300}
        height={395}
        className="absolute bottom-0 left-0 opacity-50 pointer-events-none hidden md:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          <FadeIn>
            <div className="md:sticky md:top-32">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-[var(--text-main)] md:text-4xl">
                {t.title}{" "}
                <span className="handwritten text-sugarcane-green dark:text-emerald-400">{t.titleHighlight}</span>
              </h2>
              <p className="text-gray-600 dark:text-[var(--text-muted)]">{t.subtitle}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-xl transition-colors duration-300 dark:border dark:border-[var(--border-soft)] dark:bg-[var(--surface-bg)] dark:shadow-emerald-950/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                <div className="space-y-1">
                  {renderLabel(t.labels.commercialName, true)}
                  <p className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t.subtexts.commercialName}</p>
                  <motion.div className="relative" variants={inputVariants} animate={focusedField === "commercialName" ? "focused" : "unfocused"}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="commercialName"
                      name="commercialName"
                      value={formData.commercialName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("commercialName")}
                      onBlur={handleBlur}
                      className={inputClasses("commercialName")}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.commercialName && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.commercialName}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  {renderLabel(t.labels.legalName, true)}
                  <p className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t.subtexts.legalName}</p>
                  <motion.div className="relative" variants={inputVariants} animate={focusedField === "legalName" ? "focused" : "unfocused"}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="legalName"
                      name="legalName"
                      value={formData.legalName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("legalName")}
                      onBlur={handleBlur}
                      className={inputClasses("legalName")}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.legalName && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.legalName}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                <div className="space-y-1">
                  {renderLabel(t.labels.contactName, true)}
                  <p className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t.subtexts.contactName}</p>
                  <motion.div className="relative" variants={inputVariants} animate={focusedField === "contactName" ? "focused" : "unfocused"}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("contactName")}
                      onBlur={handleBlur}
                      className={inputClasses("contactName")}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.contactName && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.contactName}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  {renderLabel(t.labels.role, true)}
                  <p className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t.subtexts.role}</p>
                  <motion.div className="relative" variants={inputVariants} animate={focusedField === "role" ? "focused" : "unfocused"}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("role")}
                      onBlur={handleBlur}
                      className={inputClasses("role")}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.role && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.role}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                <div className="space-y-1">
                  {renderLabel(t.labels.email, true)}
                  <p className="text-xs text-gray-500 dark:text-[var(--text-muted)]">{t.subtexts.email}</p>
                  <motion.div className="relative" variants={inputVariants} animate={focusedField === "email" ? "focused" : "unfocused"}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      className={inputClasses("email")}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.email}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1 flex flex-col">
                  {renderLabel(t.labels.country, true)}
                  <div className="flex-1" />
                  <motion.div className="relative" variants={inputVariants} animate={focusedField === "country" ? "focused" : "unfocused"}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={20} className="text-gray-400" />
                    </div>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("country")}
                      onBlur={handleBlur}
                      className={selectClasses("country")}
                      style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none", backgroundImage: "none" }}
                    >
                      <option value="">{t.placeholders.country}</option>
                      {countryOptions.map((country) => (
                        <option key={country.iso} value={country.iso}>
                          {locale === "fr" ? country.nameFr : country.nameEn}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown size={18} className="text-gray-400" />
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {errors.country && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.country}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div className="space-y-1">
                  {renderLabel(t.labels.phone, true)}
                  <div className="grid grid-cols-5 gap-2">
                    <motion.div className="relative col-span-2" variants={inputVariants} animate={focusedField === "phoneCountry" ? "focused" : "unfocused"}>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                      <select
                        id="phoneCountry"
                        name="phoneCountry"
                        value={formData.phoneCountry}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phoneCountry")}
                        onBlur={handleBlur}
                        className="block w-full truncate appearance-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 pr-10 text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-[var(--border-soft)] dark:bg-[var(--surface-soft)] dark:text-[var(--text-body)]"
                        style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none", backgroundImage: "none" }}
                      >
                        {countryOptions.map((country) => (
                          <option key={country.iso} value={country.iso}>
                            {(locale === "fr" ? country.nameFr : country.nameEn) + ` (${country.dialCode})`}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                    <motion.div className="relative col-span-3" variants={inputVariants} animate={focusedField === "phone" ? "focused" : "unfocused"}>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-[var(--border-soft)] dark:bg-[var(--surface-soft)] dark:text-[var(--text-body)] dark:placeholder-[var(--text-muted)]"
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.phone}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1">
                  {renderLabel(t.labels.whatsapp)}
                  <div className="grid grid-cols-5 gap-2">
                    <motion.div className="relative col-span-2" variants={inputVariants} animate={focusedField === "whatsappCountry" ? "focused" : "unfocused"}>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                      <select
                        id="whatsappCountry"
                        name="whatsappCountry"
                        value={formData.whatsappCountry}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("whatsappCountry")}
                        onBlur={handleBlur}
                        className="block w-full truncate appearance-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 pr-10 text-gray-900 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-[var(--border-soft)] dark:bg-[var(--surface-soft)] dark:text-[var(--text-body)]"
                        style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none", backgroundImage: "none" }}
                      >
                        {countryOptions.map((country) => (
                          <option key={country.iso} value={country.iso}>
                            {(locale === "fr" ? country.nameFr : country.nameEn) + ` (${country.dialCode})`}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                    <motion.div className="relative col-span-3" variants={inputVariants} animate={focusedField === "whatsapp" ? "focused" : "unfocused"}>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("whatsapp")}
                        onBlur={handleBlur}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-[var(--border-soft)] dark:bg-[var(--surface-soft)] dark:text-[var(--text-body)] dark:placeholder-[var(--text-muted)]"
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {errors.whatsapp && (
                      <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.whatsapp}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-1 mb-4 w-full md:w-1/2">
                {renderLabel(t.labels.subject)}
                <motion.div className="relative" variants={inputVariants} animate={focusedField === "subject" ? "focused" : "unfocused"}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase size={20} className="text-gray-400" />
                  </div>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={handleBlur}
                    className={selectClasses("subject")}
                    style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none", backgroundImage: "none" }}
                  >
                    <option value="partnership">{t.subjectOptions.partnership}</option>
                    <option value="advertising">{t.subjectOptions.advertising}</option>
                    <option value="other">{t.subjectOptions.other}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={18} className="text-gray-400" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-1 mb-6">
                {renderLabel(t.labels.message, true)}
                <p className="whitespace-pre-line text-xs text-gray-500 dark:text-[var(--text-muted)]">{t.subtexts.message}</p>
                <motion.div className="relative" variants={inputVariants} animate={focusedField === "message" ? "focused" : "unfocused"}>
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare size={20} className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    className={`
                      block w-full pl-10 pr-3 py-3 border rounded-lg resize-none
                      bg-gray-50 dark:bg-[var(--surface-soft)]
                      text-gray-900 dark:text-[var(--text-body)]
                      placeholder-gray-500 dark:placeholder-[var(--text-muted)]
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                      transition-all duration-200
                      ${errors.message ? "border-red-500" : "border-gray-300 dark:border-[var(--border-soft)]"}
                    `}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.message && (
                    <motion.div variants={errorVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{errors.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <RippleButton
                variant="primary"
                className={`w-full py-3 px-6 text-lg font-medium bg-none bg-sugarcane-green hover:bg-emerald-700 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      </motion.div>
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <AnimatedIcon animation="bounce" trigger="hover">
                        <Send size={20} />
                      </AnimatedIcon>
                      <span className="handwritten text-2xl">{t.submitButton}</span>
                    </>
                  )}
                </div>
              </RippleButton>

              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-4 flex items-center space-x-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-500 dark:border-red-500/40 dark:bg-red-500/10"
                  >
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="mt-4 text-center text-sm text-gray-600 dark:text-[var(--text-muted)]">{t.footer}</p>
            </motion.form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
