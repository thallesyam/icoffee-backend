import { NextFunction, Request, Response } from "express"
import { PaymentService } from "../service/PaymentService"

export class PaymentController {
  constructor() {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { cartItems, total, address } = request.body

      if (!cartItems || !total) {
        return next(new Error("Error on process payment"))
      }

      const paymentService = new PaymentService()
      const checkoutId = await paymentService.execute({
        cartItems,
        total,
        address,
      })

      if (checkoutId instanceof Error) {
        response.status(500).json({ message: "Error" })
        return
      }

      response.json({ checkoutId: checkoutId.id })
    } catch (error) {
      console.log("Error on process payment", error)
      return response.status(500).json({ error })
    }
  }
}
