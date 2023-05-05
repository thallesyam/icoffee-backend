import { prisma } from "../server"
import { stripe } from "../utils/stripe"
import Stripe from "stripe"

type PaymentWebhookProps = {
  event: {
    object: {
      id: string
      status: string
      object: string
    }
  }
}

export class PaymentWebhookService {
  constructor() {}

  async execute({ event }: PaymentWebhookProps) {
    const session = await stripe.checkout.sessions.retrieve(event.object.id, {
      expand: ["line_items.data.price.product", "customer"],
    })

    const line_items = session.line_items?.data?.[0]
    const customer = session.customer_details

    if (!line_items) {
      return new Error("Items not found")
    }

    const product = await prisma.product.findUnique({
      where: {
        id: (line_items.price?.product as Stripe.Product).metadata.productId,
      },
    })

    if (!product) {
      return new Error("Product not found")
    }

    const order = await prisma.order.create({
      data: {
        checkoutId: session.id,
        clientEmail: customer?.email ?? "",
        clientName: customer?.name ?? "",
        quantity: line_items.quantity as number,
        total: session.amount_total as number,
        productId: product.id,
      },
    })

    return order
  }
}
