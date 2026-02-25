"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare, Building2, Briefcase, Globe } from "lucide-react"
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
      message: "Describe briefly",
      phoneCountry: "Country",
    },
    subtexts: {
      commercialName: "Example Supermarket X",
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
      phoneInvalid: "Please enter a valid phone number",
      whatsappInvalid: "Please enter a valid WhatsApp number",
      messageRequired: "Message is required",
      messageMin: "Message must be at least 10 characters",
    },
    requiredText: "Required",
    submitButton: "Submit Partnership Inquiry",
    submitting: "Sending...",
    successTitle: "Inquiry Sent!",
    successMessage: "Thank you, your partnership request has been sent.",
    sendAnother: "Send Another Inquiry",
    footer: "Your information will remain confidential and will only be used to process your partnership request.",
    messagePrefix: "[Partner Inquiry from",
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
      message: "Décrivez brièvement",
      phoneCountry: "Pays",
    },
    subtexts: {
      commercialName: "Exemple Supermarché X",
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
      phoneInvalid: "Veuillez entrer un numéro de téléphone valide",
      whatsappInvalid: "Veuillez entrer un numéro WhatsApp valide",
      messageRequired: "Le message est obligatoire",
      messageMin: "Le message doit comporter au moins 10 caractères",
    },
    requiredText: "Obligatoire",
    submitButton: "Envoyer ma demande de partenariat",
    submitting: "Envoi en cours...",
    successTitle: "Demande envoyée",
    successMessage: "Merci, votre demande de partenariat a bien été envoyée.",
    sendAnother: "Envoyer une autre demande",
    footer: "Vos informations resteront confidentielles et ne seront utilisées que pour traiter votre demande de partenariat.",
    messagePrefix: "[Demande de partenariat de",
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

  const getCountryName = (iso: string) => {
    const match = countryOptions.find((country) => country.iso === iso)
    if (!match) return iso
    return locale === "fr" ? match.nameFr : match.nameEn
  }

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

    if (formData.phone) {
      const phoneError = validateField("phone", formData.phone)
      if (phoneError) {
        newErrors.phone = phoneError
        isValid = false
      }
    }

    if (formData.whatsapp) {
      const whatsappError = validateField("whatsapp", formData.whatsapp)
      if (whatsappError) {
        newErrors.whatsapp = whatsappError
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
      const details = [
        `Nom commercial: ${formData.commercialName}`,
        `Denomination sociale: ${formData.legalName}`,
        `Nom du contact: ${formData.contactName}`,
        `Fonction: ${formData.role}`,
        `Email: ${formData.email}`,
        `Pays: ${getCountryName(formData.country)}`,
        `Telephone: ${formData.phone ? `${phoneDialCode} ${formData.phone}` : "N/A"}`,
        `WhatsApp: ${formData.whatsapp ? `${whatsappDialCode} ${formData.whatsapp}` : "N/A"}`,
        "",
        formData.message,
      ].join("\n")

      const payload: Record<string, string> = {
        full_name: formData.contactName,
        email: formData.email,
        subject: "partnership",
        message: `${t.messagePrefix} ${formData.commercialName}]\n\n${details}`,
      }

      if (formData.phone) {
        payload.phone = `${phoneDialCode} ${formData.phone}`
      }

      const result = await apiService.sendSupportMessage(payload)

      if (!result.success) {
        throw new Error(result.error || "Failed to submit inquiry.")
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
    bg-gray-50 dark:bg-gray-700
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-200
    ${errors[fieldName] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
  `

  const selectClasses = (fieldName: keyof PartnerFormErrors) => `
    block w-full pl-10 pr-3 py-3 border rounded-lg
    bg-gray-50 dark:bg-gray-700
    text-gray-900 dark:text-white
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-200
    ${errors[fieldName] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
  `

  const renderLabel = (label: string, required = false) => (
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
      {required && (
        <>
          <span className="text-red-500 ml-1">!</span>
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{t.requiredText}</span>
        </>
      )}
    </label>
  )

  if (isSubmitted) {
    return (
      <section
        className="scroll-mt-24 py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
        id="contact-form"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl dark:shadow-gray-900/20 text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 10 }}
            >
              <CheckCircle size={64} className="text-emerald-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.successTitle}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t.successMessage}</p>
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
      className="scroll-mt-24 py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      id="contact-form"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div className="md:sticky md:top-32">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t.title}{" "}
                <span className="handwritten text-sugarcane-green dark:text-emerald-400">{t.titleHighlight}</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl dark:shadow-gray-900/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  {renderLabel(t.labels.commercialName, true)}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtexts.commercialName}</p>
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

                <div className="space-y-2">
                  {renderLabel(t.labels.legalName, true)}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtexts.legalName}</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  {renderLabel(t.labels.contactName, true)}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtexts.contactName}</p>
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

                <div className="space-y-2">
                  {renderLabel(t.labels.role, true)}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtexts.role}</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  {renderLabel(t.labels.email, true)}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.subtexts.email}</p>
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

                <div className="space-y-2">
                  {renderLabel(t.labels.country, true)}
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
                    >
                      <option value="">{t.placeholders.country}</option>
                      {countryOptions.map((country) => (
                        <option key={country.iso} value={country.iso}>
                          {locale === "fr" ? country.nameFr : country.nameEn}
                        </option>
                      ))}
                    </select>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  {renderLabel(t.labels.phone)}
                  <div className="grid grid-cols-5 gap-2">
                    <motion.div className="relative col-span-2" variants={inputVariants} animate={focusedField === "phoneCountry" ? "focused" : "unfocused"}>
                      <select
                        id="phoneCountry"
                        name="phoneCountry"
                        value={formData.phoneCountry}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phoneCountry")}
                        onBlur={handleBlur}
                        className="block w-full px-3 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        {countryOptions.map((country) => (
                          <option key={country.iso} value={country.iso}>
                            {(locale === "fr" ? country.nameFr : country.nameEn) + ` (${country.dialCode})`}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                    <motion.div className="relative col-span-3" variants={inputVariants} animate={focusedField === "phone" ? "focused" : "unfocused"}>
                      <div className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-600 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                        {phoneDialCode}
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        className="block w-full pl-16 pr-3 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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

                <div className="space-y-2">
                  {renderLabel(t.labels.whatsapp)}
                  <div className="grid grid-cols-5 gap-2">
                    <motion.div className="relative col-span-2" variants={inputVariants} animate={focusedField === "whatsappCountry" ? "focused" : "unfocused"}>
                      <select
                        id="whatsappCountry"
                        name="whatsappCountry"
                        value={formData.whatsappCountry}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("whatsappCountry")}
                        onBlur={handleBlur}
                        className="block w-full px-3 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        {countryOptions.map((country) => (
                          <option key={country.iso} value={country.iso}>
                            {(locale === "fr" ? country.nameFr : country.nameEn) + ` (${country.dialCode})`}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                    <motion.div className="relative col-span-3" variants={inputVariants} animate={focusedField === "whatsapp" ? "focused" : "unfocused"}>
                      <div className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-600 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                        {whatsappDialCode}
                      </div>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("whatsapp")}
                        onBlur={handleBlur}
                        className="block w-full pl-16 pr-3 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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

              <div className="space-y-2 mb-8">
                {renderLabel(t.labels.message, true)}
                <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-line">{t.subtexts.message}</p>
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
                      bg-gray-50 dark:bg-gray-700
                      text-gray-900 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                      transition-all duration-200
                      ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
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
                      <span>{t.submitButton}</span>
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
                    className="mt-4 flex items-center space-x-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
                  >
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.footer}</p>
              </div>
            </motion.form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
