import mongoose, { Schema, models } from "mongoose";

const SiteConfigSchema = new Schema(
  {
    brandName: {
      type: String,
      default: "Stream Prime",
    },

    heroTitle: {
      type: String,
      default: "Seus conteúdos favoritos em qualquer dispositivo.",
    },

    heroDescription: {
      type: String,
      default:
        "Compatível com Smart TV, Android, iPhone, TV Box, computador e tablet.",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    bannerImageUrl: {
      type: String,
      default: "",
    },

    whatsappNumber: {
      type: String,
      default: "5511999999999",
    },

    whatsappMessage: {
      type: String,
      default: "Olá! Gostaria de saber mais sobre os planos.",
    },

    trialUrl: {
      type: String,
      default: "",
    },

    primaryColor: {
      type: String,
      default: "#10b981",
    },

    backgroundColor: {
      type: String,
      default: "#020617",
    },

    cardColor: {
      type: String,
      default: "#07111f",
    },
  },
  {
    timestamps: true,
  },
);

const SiteConfig =
  models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);

export default SiteConfig;
