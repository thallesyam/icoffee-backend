import Stripe from "stripe"
import { prisma } from "../server"
import { formatAmountForStripe } from "../utils/formatAmountForStripe"
import { stripe } from "../utils/stripe"

export type Address = {
  cep: number
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  uf: string
}

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
  address: Address
}

export class PaymentService {
  constructor() {}

  async execute({ cartItems, address }: ProductProps) {
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
              address: `${address.street} - ${address.neighborhood} - ${address.number}`,
            },
          },
        },
      }
    })

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: formatAmountForStripe(5, "brl"),
              currency: "brl",
            },
            display_name: "Entrega padrão",
            delivery_estimate: {
              minimum: {
                unit: "hour",
                value: 1,
              },
              maximum: {
                unit: "hour",
                value: 2,
              },
            },
          },
        },
      ],
      success_url: `${process.env.REDIRECT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REDIRECT_URL}/error?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkout: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params)

    return { id: checkout.id }
  }
}
