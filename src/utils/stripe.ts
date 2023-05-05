import Stripe from "stripe"

export const stripe = new Stripe(process.env.ICOFFEE_SK as string, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "icoffee",
    version: "0.1.0",
  },
})
