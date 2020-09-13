import Item from 'App/Models/Item'

const Index = async userId => {
  const items = await Item.query().where('user_id', userId).preload('user')

  if (!items) {
    return { status: 204, error: 'No items' }
  }

  return { status: 200, data: items }
}

export default Index
