import { list } from "@keystone-next/keystone/schema";
import {text, password, relationship} from "@keystone-next/fields"

export const Customer = list({
  fields: {
    firstName: text({isRequired: true}),
    lastName: text(),
    email: text({isRequired: true, isUnique: true}),
    password: password(),
    address: text()
    // TODO: add roles, cart and orders
  }
})
