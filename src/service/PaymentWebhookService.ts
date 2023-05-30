import { prisma } from "../server"
import { stripe } from "../utils/stripe"
import Stripe from "stripe"
import { Address } from "./PaymentService"

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

    const line_items_ids = session.line_items?.data.map(
      (item) => (item.price?.product as Stripe.Product).metadata.productId
    )
    const address = session.line_items?.data.map(
      (item) =>
        (item.price?.product as Stripe.Product).metadata
          .address as unknown as Address
    )
    const customer = session.customer_details

    if (!line_items_ids) {
      return new Error("Items not found")
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: line_items_ids },
      },
    })

    if (!products) {
      return new Error("Product not found")
    }

    const productIds = products.map((product) => ({ id: product.id }))
    const order = await prisma.order.create({
      data: {
        checkoutId: session.id,
        clientEmail: customer?.email ?? "",
        clientName: customer?.name ?? "",
        total: session.amount_total as number,
        address: `${address?.[0]}`,
        products: {
          connect: productIds,
        },
      },
    })

    for (const product of products) {
      await prisma.orderProduct.create({
        data: {
          orderId: order.id,
          checkoutId: session.id,
          productId: product.id,
        },
      })
    }

    return order
  }
}
