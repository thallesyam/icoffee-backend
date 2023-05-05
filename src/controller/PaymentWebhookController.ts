import { NextFunction, Request, Response } from "express"
import { PaymentWebhookService } from "../service/PaymentWebhookService"

export class PaymentWebhookController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const event = request.body

      if (event.type !== "checkout.session.completed") {
        return
      }

      const paymentWebhookService = new PaymentWebhookService()
      const order = await paymentWebhookService.execute({ event: event.data })

      if (order instanceof Error) {
        response.status(500).json({ message: "Error" })
        return
      }

      return response.json({ order })
    } catch (error) {
      console.log("Error on process payment", error)
      return response.status(500).json({ error })
    }
  }
}
