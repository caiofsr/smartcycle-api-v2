import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Mediators/Client/Donor/Store'

export default class ItemsController {
  public async store ({ request, response, auth }: HttpContextContract) {
    auth.authenticate()

    const userId = auth?.user?.id

    const { status, data } = await Store(request.only(['nome', 'peso']), userId)
    return response.status(status).send(data)
  }
}
