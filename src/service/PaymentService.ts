import Stripe from "stripe"
import { prisma } from "../server"
import { formatAmountForStripe } from "../utils/formatAmountForStripe"
import { stripe } from "../utils/stripe"

type ProductProps = {
  cartItems: {
    quantity: number
    productId: string
    unitPrice: number
    name: string
    description: string
    imageUrl: string
  }[]
  total: number
}

export class PaymentService {
  constructor() {}

  async execute({ cartItems }: ProductProps) {
    const cartItemsIds = cartItems.map((item) => item.productId)

    const products = await prisma.product.findMany({
      where: {
        id: { in: cartItemsIds },
      },
    })

    if (!products.length) {
      return new Error("Product not found")
    }
    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          unit_amount: formatAmountForStripe(item.unitPrice, "brl"),
          currency: "BRL",
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.imageUrl],
            metadata: {
              productId: item.productId,
            },
          },
        },
      }
    })

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.REDIRECT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REDIRECT_URL}/payment/error?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkout: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params)

    return { id: checkout.id }
  }
}
