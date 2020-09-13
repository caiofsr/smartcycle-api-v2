import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Update from 'App/Mediators/Client/User/Update'

export default class ItemsController {
  public async update ({ request, response, auth }: HttpContextContract) {
    auth.authenticate()

    const userId = auth?.user?.id

    const { status, data } = await Update(request.only(
      ['nome',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'tipo',
      ]), userId)

    return response.status(status).send(data)
  }
}
